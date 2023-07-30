import {ColumnType, SheetType} from '../interface';

const XLSX = require('@pengchen/xlsx');
/**
 * 将以点拼接的扁平字符串对象，解析为具有深度的对象
 * @param dotStrObj 点拼接的扁平化字符串对象
 * @returns 具有深度的对象
 */
function parseDotStrObjToObj(dotStrObj: { [x: string]: never; }) {
  const resultObj = {};
  Object.keys(dotStrObj).forEach(key => {
    const keys = key.split('.');
    keys.reduce((resultObj: { [x: string]: never; }, curValue: string, currentIndex: number) => {
      resultObj[curValue] = currentIndex === keys.length - 1 ? dotStrObj[key] : resultObj[curValue] || {};
      return resultObj[curValue];
    }, resultObj);
  });
  return resultObj;
}

/**
 * 将具有深度的对象扁平化，变成以点拼接的扁平字符串对象
 * @param targetObj 具有深度的对象
 * @returns 扁平化后，由点操作符拼接的对象
 */

function transformObjToDotStrObj(targetObj: { [x: string]: never; }) {
  const resultObj = {};
  function transform(currentObj: { [x: string]: never; }, preKeys: string[]) {
    Object.keys(currentObj).forEach(key => {
      if (Object.prototype.toString.call(currentObj[key]) !== '[object Object]') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resultObj[[...preKeys, key].join('.')] = currentObj[key];
      } else {
        transform(currentObj[key], [...preKeys, key]);
      }
    });
  }
  transform(targetObj, []);
  return resultObj;
}

/**
 * 获取所有单元格数据
 * @param sheet sheet 对象
 * @returns 该 sheet 所有单元格数据
 */
function getSheetCells(sheet: { [x: string]: any; }) {
  if (!sheet || !sheet['!ref']) {
    return [];
  }
  const range = XLSX.utils.decode_range(sheet['!ref']);

  const allCells = [];
  for (let rowIndex = range.s.r; rowIndex <= range.e.r; ++rowIndex) {
    const newRow: string[] = [];
    allCells.push(newRow);
    for (let colIndex = range.s.c; colIndex <= range.e.c; ++colIndex) {
      const cell = sheet[XLSX.utils.encode_cell({
        c: colIndex,
        r: rowIndex
      })];
      let cellContent = '';
      if (cell && cell.t) {
        cellContent = XLSX.utils.format_cell(cell);
      }
      newRow.push(cellContent);
    }
  }
  return allCells;
}

/**
 * 获取表头任意层级单元格合并后的表格内容解析
 * @param sheet 一个 sheet 中所有单元格内容
 * @param textKeyMap 表头中文与对应英文 key 之间的映射表
 * @returns antdv 中的表格 column，dataSource，以及转化后的，直接传输给后端的 json 对象数组
 */
function getSheetHeaderAndData(sheet: SheetType[], textKeyMap: { [x: string]: any; }) {
  // 获取菜单项在 Excel 中所占行数
  function getHeaderRowNum(textKeyMap: { [x: string]: any; }) {
    let maxLevel = 1; // 最高层级
    if (textKeyMap && Object.keys(textKeyMap).length !== 0) {
      Object.keys(textKeyMap).forEach(textStr => {
        maxLevel = Math.max(maxLevel, textStr.split('.').length);
      });
    }

    return maxLevel;
  }
  const headerRowNum = getHeaderRowNum(textKeyMap);

  const headerRows: any[] = sheet.slice(0, headerRowNum);
  const dataRows: any[] = sheet.slice(headerRowNum);

  let headerColumns: ColumnType = []; // 收集 table 组件中，表头 columns 的对象数组结构
  const lastHeaderLevelColumns: { children: { title: string; }[]; }[] = []; // 最近一个 columns，用于收集单元格子表头的内容
  const textValueMaps: any[] = []; // 以中文字符串为 key 的对象数组，用于收集表格中的数据
  const columnIndexObjMap: { title: string; }[] = []; // 表的列索引，对应在对象中的位置，用于后续获取表格数据时，快速定位每一个单元格

  for (let colIndex = 0; colIndex < headerRows[0].length; colIndex++) {
    const headerCellList = headerRows.map((item: any[]) => item[colIndex]);
    // eslint-disable-next-line no-loop-func
    headerCellList.forEach((headerCell: any, headerCellIndex: number) => {
      // 如果当前单元格没数据，这证明是合并后的单元格，跳过其处理
      if (!headerCell) {
        return;
      }
      const tempColumn = { title: headerCell };

      columnIndexObjMap[colIndex] = tempColumn; // 通过 columnIndexObjMap 记录每一列数据，对应到那个对象中，实现一个映射表

      // 如果表头数据第一轮就有值，这证明这是新起的一个表头项目，往 headerColumns 中，新加入一条数据
      if (headerCellIndex === 0) {
        headerColumns.push(tempColumn);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lastHeaderLevelColumns[headerCellIndex] = tempColumn; // 记录当前层级，最新的一个表格容器，可能在下一列数据时合并单元格，下一个层级需要往该容器中添加数据
      } else { // 不是第一列数据，这证明是子项目，需要加入到上一层表头的 children 项，作为其子项目
        lastHeaderLevelColumns[headerCellIndex - 1].children = lastHeaderLevelColumns[headerCellIndex - 1].children || [];
        lastHeaderLevelColumns[headerCellIndex - 1].children.push(tempColumn);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        lastHeaderLevelColumns[headerCellIndex] = tempColumn; // 记录当前层级的容器索引，可能再下一层级中使用到
      }
    });
  }

  // 运行以上代码，得到 headerColumns，以及 headerColumns 中，每个对象对应在表格中的哪一行索引

  // 将以数组形式记录的对象信息，转化为正常的对象结构
  function transformListToObj(listObjs: any) {
    const resultObj = {};
    listObjs.forEach((item: { value: any; title: string | number; children: string | any[]; }) => {
      if (item.value) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resultObj[item.title] = item.value;
        return;
      }

      if (item.children && item.children.length > 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        resultObj[item.title] = transformListToObj(item.children);
      }
    });
    return resultObj;
  }

  // 以 headerColumns 为对象结构模板，遍历 excel 表数据中的所有数据，并利用 columnIndexObjMap 的映射，快速填充每一项数据
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dataRows.forEach((dataRow: any[]) => {
    dataRow.forEach((value, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columnIndexObjMap[index].value = value;
    });
    const titleObj = Object.create(headerColumns); // columnIndexObjMap 的指针索引，仅指向 headerColumns，以 headerColumns 为数据模板，复制一份数据，获得数据填充后的效果对象
    textValueMaps.push(transformListToObj(titleObj)); // 将 listObj 对象转化化普通的对象
  });


  // 根据表头的 title 值，从 textKeyMap 中寻找映射关系，设置 headerColumn 对应的 dataIndex
  function setHeaderColumnDataIndex(headerColumns: ColumnType, preTitle: any[]) {
    headerColumns.forEach((headerObj: { children: ColumnType; title: any; dataIndex: any; }) => {
      if (headerObj.children) {
        headerObj.children = setHeaderColumnDataIndex(headerObj.children, [...preTitle, headerObj.title]);
      } else {
        const titleStr = [...preTitle, headerObj.title].join('.');
        headerObj.dataIndex = textKeyMap[titleStr];
      }
    });
    return headerColumns;
  }

  // 将以中文为 key 的对象，通过 textKeyMap 映射，找到对应的 key，转化为以 key 对键的对象，转化为后端对应的 json 对象
  function transformTextToKey(textDataList: any[], textKeyMap: { [x: string]: any; }) {
    const textDotStrDataList = textDataList.map(obj => transformObjToDotStrObj(obj));
    let textDotStrDataListStr: any = JSON.stringify(textDotStrDataList);
    if (textKeyMap && Object.keys(textKeyMap).length !== 0) {
      Object.keys(textKeyMap).forEach(text => {
        const key = textKeyMap[text];
        textDotStrDataListStr = textDotStrDataListStr.replaceAll(`"${text}"`, `"${key}"`); // 在这里，通过字符串的替换，实现表头数据层级结构，与实际对象将数据结构的转换
      });
    }
    const keyDotStrDataList = JSON.parse(textDotStrDataListStr);
    const keyDataList = keyDotStrDataList.map((keyDotStrData: { [x: string]: never; }) => parseDotStrObjToObj(keyDotStrData));
    return keyDataList;
  }

  headerColumns = setHeaderColumnDataIndex(headerColumns, []);
  const dataList = transformTextToKey(textValueMaps, textKeyMap);
  const dataSource = dataList.map((row: { [x: string]: never; }) => transformObjToDotStrObj(row)); // 将 JSON 对象转化为 “点.” 拼接的扁平对象，使得数据与 headerColumn 中的 dataIndex 相对应。实现 table 的数据填充

  return {
    headerColumns,
    dataList,
    dataSourceList: dataSource,
  };
}
/*
// 修改对象的key
function transKey(data, keyMap) {
  if (Object.keys(data).length === 0) return data;
  return Object.keys(data).reduce((newData, key) => {
    const newKey = keyMap[key] || key;
    newData[newKey] = data[key];
    return newData;
  }, {});
}
/!**
 * 解析excel
 * @param {File} fileStream 文件对象
 * @param {Array} keyMaps 键值对替换数组，有几个sheet数组长度就是几 [{ '名称': name1 }, { '名称': name2 }]
 * @returns {Promise<object>} 返回Promise对象， resolve的结果为 { sheetName1: data1, sheetName2: data2 }
 *!/
export const parseExcelFile = (fileStream, keyMaps = []) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
        const { result } = event.target;
        const workbook = XLSX.read(result, { type: 'binary' }); // 读取文件
        const configSheet = {}; // 返回对象
        let index = 0;
        // 循环文件中的每个表
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            const dataSource = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            configSheet[sheet] =
                keyMaps.length > 0
                    ? dataSource.map((ele) => {
                      return transKey(ele, keyMaps[index]); // 替换key，sheet_to_json返回的是中文表头名
                    })
                    : dataSource;
            index++;
          }
        }
        resolve(configSheet);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsBinaryString(fileStream);
  });
};*/

export {
  parseDotStrObjToObj, transformObjToDotStrObj, getSheetCells, getSheetHeaderAndData
};