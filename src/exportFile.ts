
const XLSX = require('@pengchen/xlsx');

/**
 *
 * @param fileName
 * @param sheetNames
 * @param columns
 * @param dataSource
 * @param hideHeader 是否显示表头
 * @param raw 是否格式化值的类型
 */
export const exportFile = ({
  fileName = 'table.xlsx',
  sheetNames = [],
  columns = [],
  dataSource = [],
  hideHeader = false,
  raw = false
}:{
  fileName: string,
  sheetNames: any,
  columns: any,
  dataSource: any,
  hideHeader: boolean,
  raw: boolean
}) => {
  const Sheets: any = {};
  sheetNames.forEach((sheetName: string, sheetIndex: number) => {
    const { sheet } = formatToSheet({columns, dataSource, hideHeader, raw});
    Sheets[sheetName] = sheet;
  });
  const wb = {
    SheetNames: sheetNames,
    Sheets: Sheets,
  };
  XLSX.writeFile(wb, fileName);
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
  let headerRowsPlaceholder = 1; // 表头行占的行数
  columns.forEach((col: any, colIndex: number) => {
    const key = col.dataIndex || col.key;
    const title = col.title; // todo
    header[key] = title;
    headerKeys.push(key);
    $cols.push({wpx: formatToWpx(col.width)});
    const xAxis = XLSX.utils.encode_col(colIndex);
    const headerData = hideHeader ? [] : [{
      [key]: title,
    }];
    // todo 多级表头
    headerRowsPlaceholder = headerData.length;
    [...headerData, ...dataSource].forEach((data: any, rowIndex: number) => {
      const value = data[key];
      if (col.render) {
        const result = col.render(value, data, rowIndex);
        const merge = getMerge({result, colIndex, rowIndex, headerRowsPlaceholder});
        if (merge) {
          $merges.push(merge);
        }
      }
      const style = rowIndex < headerRowsPlaceholder ? headerStyle : {};
      sheet[`${xAxis}${rowIndex + 1}`] = {
        t: (raw && typeof value === 'number') ? 'n' : 's',
        v: value,
        s: {
          font: {
            name: '宋体',
            color: { rgb: '333' },
          },
          border: defaultBorder,
          ...style
        }
      };
    });
  });
  const xe = XLSX.utils.encode_col(columns.length - 1);
  const ye = headerRowsPlaceholder + dataSource.length;
  sheet['!ref'] = `A1:${xe}${ye}`;
  sheet['!cols'] = $cols;
  sheet['!merges'] = $merges;
  return {
    sheet
  };
};
/**
 * 获取列宽
 */
const formatToWpx = (width: number|string) => {
  let wpx = width;
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
  headerRowsPlaceholder
}:{
  result:any,
  colIndex: number,
  rowIndex: number,
  headerRowsPlaceholder: number
}) => {
  if (result.props) {
    const {colSpan, rowSpan} = result.props;
    if ((colSpan && colSpan !== 1) || (rowSpan && rowSpan !== 1)) {
      const realRowIndex = rowIndex + headerRowsPlaceholder;
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
