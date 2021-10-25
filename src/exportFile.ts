import {sameType} from './utils/base';

const XLSX = require('@pengchen/xlsx');

/**
 * 导出
 * @param fileName
 * @param sheetNames
 * @param columns
 * @param dataSource
 * @param hideHeader 是否显示表头
 * @param raw 是否格式化值的类型
 */
export const exportFile = ({
  fileName = 'table.xlsx',
  sheetNames = ['sheet1'],
  columns = [],
  dataSource = [],
  hideHeader = false,
  raw = false
}: {
  fileName: string,
  sheetNames: any,
  columns: any,
  dataSource: any,
  hideHeader: boolean,
  raw: boolean
}) => {
  const Sheets: any = {};
  sheetNames.forEach((sheetName: string, sheetIndex: number) => {
    const _columns = sameType(columns[sheetIndex], 'Array') ? columns[sheetIndex] : columns;
    const _dataSource = sameType(dataSource[sheetIndex], 'Array') ? dataSource[sheetIndex] : dataSource;
    const {sheet} = formatToSheet({
      columns: _columns,
      dataSource: _dataSource,
      hideHeader,
      raw,
    });
    Sheets[sheetName] = sheet;
  });
  const wb = {
    SheetNames: sheetNames,
    Sheets: Sheets,
  };
  XLSX.writeFile(wb, fileName);
  return wb;
};
/**
 * 转换成sheet对象
 */
const formatToSheet = ({columns, dataSource, hideHeader, raw}: {
  columns: any,
  dataSource: any,
  hideHeader: boolean,
  raw: boolean
}) => {
  const sheet: any = {};
  const header: any = {};
  const headerKeys: (number|string)[] = [];
  const $cols: { wpx: any }[] = [];
  const $merges: {s: { c:number, r:number }, e: { c:number, r:number }}[] = [];
  //
  const {columns: flatColumns, level: headerLevel} = flattenColumns(columns);
  // 表头信息
  const headerData = getHeaderData({columns, headerLevel});
  Object.assign(sheet, headerData.sheet);
  $merges.push(...headerData.merges);
  //
  flatColumns.forEach((col: any, colIndex: number) => {
    const key = col.dataIndex || col.key;
    const title = col.title; // todo
    header[key] = title;
    headerKeys.push(key);
    $cols.push({wpx: formatToWpx(col.width)});
    const xAxis = XLSX.utils.encode_col(colIndex);
    dataSource.forEach((data: any, rowIndex: number) => {
      const value = data[key];
      if (col.render) {
        const result = col.render(value, data, rowIndex);
        const merge = getMerge({result, colIndex, rowIndex, headerLevel});
        if (merge) {
          $merges.push(merge);
        }
      }
      sheet[`${xAxis}${headerLevel + rowIndex + 1}`] = {
        t: (raw && typeof value === 'number') ? 'n' : 's',
        v: value,
        s: {
          font: {
            name: '宋体',
            color: { rgb: '333' },
          },
          border: defaultBorder,
        }
      };
    });
  });
  const xe = XLSX.utils.encode_col(flatColumns.length - 1);
  const ye = headerLevel + dataSource.length;
  sheet['!ref'] = `A1:${xe}${ye}`;
  sheet['!cols'] = $cols;
  sheet['!merges'] = $merges;
  return {
    sheet
  };
};

/**
 * 获取表头数据
 */
const getHeaderData = ({
  columns,
  headerLevel
} : {
  columns:any,
  headerLevel:number
}) => {
  const sheet: any = {};
  const merges: {s: { c:number, r:number }, e: { c:number, r:number }}[] = [];

  const headerArr:any = getHeader2dArray({columns, headerLevel});
  headerArr.forEach((rowsArr:any, rowIndex:number) => {
    rowsArr.forEach((cols:any, colIndex:number) => {
      const xAxis = XLSX.utils.encode_col(colIndex);
      sheet[`${xAxis}${rowIndex + 1}`] = {
        t: 's',
        v: cols.title,
        s: {
          ...headerStyle
        }
      };
      if (cols.merges) {
        merges.push(cols.merges);
      }
    });
  });
  return {
    sheet,
    merges
  };
};
/**
 * 获取表头二维数组
 */
const getHeader2dArray = ({
  columns,
  headerLevel
} : {
  columns:any,
  headerLevel:number
}) => {
  const arr: any[][] = [];
  const deal = (_columns:any, startCol = 0, rowLevel = 0) => {
    _columns.reduce((prevCol:any, currentValue:any) => {
      if (!arr[rowLevel]) {
        arr[rowLevel] = [];
      }
      arr[rowLevel][prevCol] = {
        title: currentValue.title,
        children: currentValue.children,
      };
      let nextCol = prevCol;
      if (currentValue.children) {
        const childrenLen = flattenColumns(currentValue.children).columns.length;
        deal(currentValue.children, prevCol, rowLevel + 1);
        nextCol += childrenLen;
        arr[rowLevel][prevCol].merges = {
          s: {c: prevCol, r: rowLevel},
          e: {c: nextCol - 1, r: rowLevel},
        };
        // 补全值 跨行的值
        for(let c = prevCol + 1; c < nextCol; c++){
          arr[rowLevel][c] = {
            title: currentValue.title,
            children: currentValue.children,
          };
        }
      } else {
        nextCol += 1;
        // 有跨列
        if (headerLevel - 1 - rowLevel > 0) {
          arr[rowLevel][prevCol].merges = {
            s: {c: prevCol, r: rowLevel},
            e: {c: prevCol, r: headerLevel - 1},
          };
          // 补全值 跨列的值
          for (let r = rowLevel + 1; r < headerLevel; r++) {
            if (!arr[r]) {
              arr[r] = [];
            }
            arr[r][prevCol] = {
              title: currentValue.title,
              children: currentValue.children,
            };
          }
        }
      }
      return nextCol;
    }, startCol);
  };
  deal(columns);
  return arr;
};
/**
 * 扁平化列
 */
const flattenColumns = (columns: any) => {
  const newColumns: any[] = [];
  const level: boolean[] = [];
  const flatten = (_columns:any, index = 0) => {
    level[index] = true;
    index += 1;
    _columns.forEach((v: any) => {
      if (v.children && v.children.length > 0) {
        flatten(v.children, index);
      } else {
        newColumns.push(v);
      }
    });
  };
  flatten(columns);
  return {
    level: level.length,
    columns: newColumns
  };
};
/**
 * 获取列宽
 */
const formatToWpx = (width: number|string) => {
  let wpx = width || 100;
  if (typeof width !== 'number') {
    wpx = Number(width.replace(/[^0-9]/ig, ''));
  }
  return wpx;
};
/**
 * 获取单个合并信息
 */
const getMerge = ({
  result,
  colIndex,
  rowIndex,
  headerLevel
}:{
  result:any,
  colIndex: number,
  rowIndex: number,
  headerLevel: number
}) => {
  if (result.props) {
    const {colSpan, rowSpan} = result.props;
    if ((colSpan && colSpan !== 1) || (rowSpan && rowSpan !== 1)) {
      const realRowIndex = rowIndex + headerLevel;
      const merge:any = {
        s: { c: colIndex, r: realRowIndex},
        e: { c: undefined, r: undefined},
      };
      merge.e.c = colIndex + (colSpan || 1) - 1;
      merge.e.r = realRowIndex + (rowSpan || 1) - 1;
      return merge;
    }
  }
  return false;
};

/**
 *
 */
const defaultBorder = {
  top: {
    style: 'thin',
    color: { rgb: 'd1d3d8' }
  },
  left: {
    style: 'thin',
    color: { rgb: 'd1d3d8' }
  },
  bottom: {
    style: 'thin',
    color: { rgb: 'd1d3d8' }
  },
  right: {
    style: 'thin',
    color: { rgb: 'd1d3d8' }
  }
};
/**
 * 表头样式
 */
const headerStyle = {
  font: {
    name: '宋体',
    color: { rgb: '333' },
    bold: true,
  },
  border: defaultBorder,
  fill: {
    fgColor: { rgb: 'e9ebf0' }
  },
  alignment: {
    horizontal: 'center',
    vertical: 'center',
  },
};
