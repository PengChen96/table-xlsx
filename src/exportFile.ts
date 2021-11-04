import {ColumnType, CellStyleType} from './interface';

import {sameType} from './utils/base';
import {flattenColumns, getHeader2dArray, formatToWpx} from './utils/columnsUtils';
import {getPathValue, getRenderValue} from './utils/valueUtils';
import {getStyles} from './utils/cellStylesUtils';

const XLSX = require('@pengchen/xlsx');

const ROW_HPX = 25;
/**
 * 导出
 * @param fileName
 * @param sheetNames
 * @param columns
 * @param dataSource
 * @param showHeader 是否显示表头
 * @param raw 是否格式化值的类型
 * @param cellStyle 单元格样式
 * @param headerCellStyle 单元格样式
 * @param bodyCellStyle 单元格样式
 * @param useRender 是否使用render返回的值
 */
export const exportFile = (
  {
    fileName = 'table.xlsx',
    sheetNames = ['sheet1'],
    columns = [],
    dataSource = [],
    showHeader = true,
    raw = false,
    cellStyle = {},
    headerCellStyle = {},
    bodyCellStyle = {},
    useRender = true,
  }: {
    fileName?: string,
    sheetNames?: (string | number)[],
    columns: ColumnType[][],
    dataSource: any,
    showHeader?: boolean,
    raw?: boolean,
    cellStyle?: CellStyleType,
    headerCellStyle?: CellStyleType,
    bodyCellStyle?: CellStyleType,
    useRender?: boolean,
  }
): {
  SheetNames: (string | number)[],
  Sheets: any
} => {
  const Sheets: any = {};
  sheetNames.forEach((sheetName: string | number, sheetIndex: number) => {
    const _columns = sameType(columns[sheetIndex], 'Array') ? columns[sheetIndex] : columns;
    const _dataSource = sameType(dataSource[sheetIndex], 'Array') ? dataSource[sheetIndex] : dataSource;
    const {sheet} = formatToSheet({
      columns: _columns,
      dataSource: _dataSource,
      showHeader,
      raw,
      cellStyle,
      headerCellStyle,
      bodyCellStyle,
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
const formatToSheet = (
  {
    columns,
    dataSource,
    showHeader,
    raw,
    cellStyle,
    headerCellStyle,
    bodyCellStyle,
    useRender,
  } : {
    columns: ColumnType[],
    dataSource: any,
    showHeader: boolean,
    raw: boolean,
    cellStyle?: CellStyleType,
    headerCellStyle?: CellStyleType,
    bodyCellStyle?: CellStyleType,
    useRender?: boolean,
  }
) => {
  const sheet: any = {};
  const $cols: { wpx: number }[] = [];
  const $rows: { hpx: number }[] = [];
  const $merges: { s: { c: number, r: number }, e: { c: number, r: number } }[] = [];
  //
  const {columns: flatColumns, level: headerLevel} = flattenColumns({columns});
  if (showHeader) {
    for (let i = 0; i < headerLevel; i++) {
      $rows.push({hpx: ROW_HPX});
    }
    // 表头信息
    const headerData = getHeaderData({columns, headerLevel, cellStyle, headerCellStyle});
    Object.assign(sheet, headerData.sheet);
    $merges.push(...headerData.merges);
  }
  //
  flatColumns.forEach((col: any, colIndex: number) => {
    const key = col.dataIndex || col.key;
    $cols.push({wpx: formatToWpx(col.width)});
    const xAxis = XLSX.utils.encode_col(colIndex);
    dataSource.forEach((data: any, rowIndex: number) => {
      if (colIndex === 0) {
        $rows.push({hpx: ROW_HPX});
      }
      let value = getPathValue(data, key);
      if (col.render) {
        const renderResult = col.render(value, data, rowIndex);
        value = useRender ? getRenderValue(renderResult) : value;
        const merge = getMerge({renderResult, colIndex, rowIndex, headerLevel});
        if (merge) {
          $merges.push(merge);
        }
      }
      sheet[`${xAxis}${headerLevel + rowIndex + 1}`] = {
        t: (raw && typeof value === 'number') ? 'n' : 's',
        v: value,
        s: getStyles({
          alignmentHorizontal: 'left',
          ...cellStyle,
          ...bodyCellStyle,
        }),
      };
    });
  });
  const xe = XLSX.utils.encode_col(flatColumns.length - 1);
  const ye = headerLevel + dataSource.length;
  sheet['!ref'] = `A1:${xe}${ye}`;
  sheet['!cols'] = $cols;
  sheet['!rows'] = $rows;
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
  headerLevel,
  cellStyle,
  headerCellStyle
} : {
  columns: ColumnType[],
  headerLevel: number,
  cellStyle?: CellStyleType,
  headerCellStyle?: CellStyleType,
}) => {
  const sheet: any = {};
  const merges: {s: { c:number, r:number }, e: { c:number, r:number }}[] = [];

  const headerArr:any = getHeader2dArray({columns, headerLevel});
  headerArr.forEach((rowsArr:any, rowIndex:number) => {
    rowsArr.forEach((cols:any, colIndex:number) => {
      const xAxis = XLSX.utils.encode_col(colIndex);
      // https://github.com/SheetJS/sheetjs#cell-object
      sheet[`${xAxis}${rowIndex + 1}`] = {
        t: 's',
        v: cols.title,
        s: getStyles({
          fillFgColorRgb: 'e9ebf0',
          fontBold: true,
          ...cellStyle,
          ...headerCellStyle,
        }),
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
 * 获取单个合并信息
 */
const getMerge = ({
  renderResult,
  colIndex,
  rowIndex,
  headerLevel
} : {
  renderResult:any,
  colIndex: number,
  rowIndex: number,
  headerLevel: number
}) => {
  if (renderResult.props) {
    const {colSpan, rowSpan} = renderResult.props;
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
