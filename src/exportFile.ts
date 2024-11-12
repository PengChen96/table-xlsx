import {
  CellStyleType,
  ColumnType,
  DataType,
  DefaultValueType,
  HeaderCellType,
  MergesArrType,
  SheetType,
  ExportFilePropsType,
} from './interface';

import {sameType} from './utils/base';
import {flattenColumns, formatToWpx, getHeader2dArray} from './utils/columnsUtils';
import {getPathValue, getRenderValue} from './utils/valueUtils';
import {getStyles} from './utils/cellStylesUtils';
import { getSheetRawTypeFn, getSheetRawValueFn, getSheetRawNumberFormattingFn } from './utils/rawUntiles.ts'

const XLSX = require('@pengchen/xlsx');

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
 * @param rowHpx
 * @param onTxBodyRow
 */
export const handleExport = (
  {
    fileName = 'table.xlsx',
    sheetNames = ['sheet1'],
    columns = [],
    dataSource = [],
    showHeader = true,
    raw = false,
    rowHpx = 25,
    cellStyle = {},
    headerCellStyle = {},
    bodyCellStyle = {},
    useRender = true,
    onTxBodyRow,
  }: ExportFilePropsType
): {
  SheetNames: (string | number)[],
  Sheets: { [key: string]: SheetType }
} => {
  const wb = getWorkbook({
    sheetNames,
    columns,
    dataSource,
    showHeader,
    raw,
    rowHpx,
    cellStyle,
    headerCellStyle,
    bodyCellStyle,
    useRender,
    onTxBodyRow,
  });
  XLSX.writeFile(wb, fileName);
  return wb;
};
/**
 * 获取wb对象
 */
export const getWorkbook = (
  {
    sheetNames = ['sheet1'],
    columns = [],
    dataSource = [],
    showHeader = true,
    raw = false,
    rowHpx = 25,
    cellStyle = {},
    headerCellStyle = {},
    bodyCellStyle = {},
    useRender = true,
    onTxBodyRow,
  }: ExportFilePropsType
): {
  SheetNames: (string | number)[],
  Sheets: { [key: string]: SheetType }
} => {
  const Sheets: { [key: string]: SheetType } = {};
  sheetNames.forEach((sheetName: string | number, sheetIndex: number) => {
    const _columns = sameType(columns[sheetIndex], 'Array') ? columns[sheetIndex] : columns;
    const _dataSource = sameType(dataSource[sheetIndex], 'Array') ? dataSource[sheetIndex] : dataSource;
    const {sheet} = formatToSheet({
      columns: _columns,
      dataSource: _dataSource,
      useRender,
      showHeader,
      raw,
      rowHpx,
      cellStyle,
      headerCellStyle,
      bodyCellStyle,
      onTxBodyRow,
    });
    Sheets[sheetName] = sheet;
  });
  return {
    SheetNames: sheetNames,
    Sheets: Sheets,
  };
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
    rowHpx,
    cellStyle,
    headerCellStyle,
    bodyCellStyle,
    useRender,
    onTxBodyRow,
  } : {
    columns: ColumnType[],
    dataSource: DataType[],
    showHeader: boolean,
    raw: boolean,
    rowHpx: number,
    cellStyle?: CellStyleType,
    headerCellStyle?: CellStyleType,
    bodyCellStyle?: CellStyleType,
    useRender?: boolean,
    onTxBodyRow?: (row: DefaultValueType, rowIndex: number) => { style: CellStyleType },
  }
) => {
  const sheet: SheetType = {};
  const $cols: { wpx: number }[] = [];
  const $rows: { hpx: number }[] = [];
  const $merges: MergesArrType[] = [];
  //
  const {columns: flatColumns, level} = flattenColumns({columns});
  let headerLevel = level;
  if (showHeader) {
    for (let i = 0; i < headerLevel; i++) {
      $rows.push({hpx: rowHpx});
    }
    // 表头信息
    const headerData = getHeaderData({columns, headerLevel, cellStyle, headerCellStyle});
    Object.assign(sheet, headerData.sheet);
    $merges.push(...headerData.merges);
  } else {
    headerLevel = 0;
  }
  //
  flatColumns.forEach((col: ColumnType, colIndex: number) => {
    const key = col.dataIndex || col.key;
    $cols.push({wpx: formatToWpx(col.width)});
    const xAxis = XLSX.utils.encode_col(colIndex);
    dataSource.forEach((data: DataType, rowIndex: number) => {
      if (colIndex === 0) {
        $rows.push({hpx: rowHpx});
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
      if (col.xlsxRender) {
        value = col.xlsxRender(value, data, rowIndex);
      }
      let txBodyRowStyle = {};
      let txBodyCellStyle = {};
      if (onTxBodyRow) {
        const result = onTxBodyRow(data, rowIndex);
        txBodyRowStyle = result?.style || {};
      }
      if (col.onTxBodyCell) {
        const result = col.onTxBodyCell(data, rowIndex);
        txBodyCellStyle = result?.style || {};
      }
      sheet[`${xAxis}${headerLevel + rowIndex + 1}`] = {
        t: getSheetRawTypeFn(raw, value),
        v: getSheetRawValueFn(value) ?? '',
        z: getSheetRawNumberFormattingFn(value),
        s: getStyles({
          alignmentHorizontal: 'left',
          ...cellStyle,
          ...bodyCellStyle,
          ...txBodyRowStyle,
          ...txBodyCellStyle,
        }),
      };
    });
  });
  const xe = XLSX.utils.encode_col(Math.max(flatColumns.length - 1, 0));
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
  const sheet: SheetType = {};
  const merges: { s: { c: number, r: number }, e: { c: number, r: number } }[] = [];

  const headerArr: HeaderCellType[][] = getHeader2dArray({columns, headerLevel});
  const mergesWeakMap = new WeakMap();
  headerArr.forEach((rowsArr: HeaderCellType[], rowIndex: number) => {
    rowsArr.forEach((cols: HeaderCellType, colIndex: number) => {
      const xAxis = XLSX.utils.encode_col(colIndex);
      const style = cols?.txHeaderCellStyle || {};
      // https://github.com/SheetJS/sheetjs#cell-object
      sheet[`${xAxis}${rowIndex + 1}`] = {
        t: 's',
        v: cols.title,
        s: getStyles({
          fillFgColorRgb: 'e9ebf0',
          fontBold: true,
          ...cellStyle,
          ...headerCellStyle,
          ...style,
        }),
      };
      if (cols.merges && !mergesWeakMap.get(cols.merges)) {
        mergesWeakMap.set(cols.merges, true); // Microsoft Excel 如果传了相同的merges信息，文件会损坏，做个去重
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
  renderResult: {
    props: { colSpan: number, rowSpan: number }
  },
  colIndex: number,
  rowIndex: number,
  headerLevel: number
}) => {
  if (renderResult?.props) {
    const {colSpan, rowSpan} = renderResult.props;
    if ((colSpan && colSpan !== 1) || (rowSpan && rowSpan !== 1)) {
      const realRowIndex = rowIndex + headerLevel;
      const merge: MergesArrType = {
        s: {c: colIndex, r: realRowIndex},
        e: {
          c: colIndex + (colSpan || 1) - 1,
          r: realRowIndex + (rowSpan || 1) - 1
        },
      };
      return merge;
    }
  }
  return false;
};

const handTenderTrendFn = (columns: any) => {
  for (const item of columns) {
    if (item.renderTrend) {
      Object.assign(item, {
        onTxBodyCell: (record: any) => {
          if (!isNaN(parseFloat(record[item.key]))) {
            if (parseFloat(record[item.key]) > 0) {
              return {
                style: { fontColorRgb: '4BBD5E' }
              }
            }
            if (parseFloat(record[item.key]) < 0) {
              return {
                style: { fontColorRgb: 'E34935' }
              }
            }
          }
        }
      })
    }
    if (item.children?.length) {
      handTenderTrendFn(item.children)
    }
  }
  return columns
}

export const exportFile = ({
  fileName = 'table.xlsx',
  data = [],
  showHeader = true,
  raw = false,
  rowHpx = 25,
  cellStyle = {},
  headerCellStyle = {},
  bodyCellStyle = {},
  useRender = true,
  onTxBodyRow,
  }) => {
  if (!data.length) return console.log('暂无数据')
  const dataSource = []
  const columns = []
  const sheetNames = []
  for (const [index, item] of Object.entries(data)) {
    dataSource.push(item.dataSource)
    columns.push(handTenderTrendFn(item.columns))
    if (!item.sheetNames) {
      sheetNames.push(`sheet${index + 1}.xlsx`)
    } else {
      sheetNames.push(item.sheetNames)
    }
  }
  handleExport({
    fileName,
    sheetNames,
    columns,
    dataSource,
    showHeader,
    raw,
    rowHpx,
    cellStyle,
    headerCellStyle,
    bodyCellStyle,
    useRender,
    onTxBodyRow,
  })
}
