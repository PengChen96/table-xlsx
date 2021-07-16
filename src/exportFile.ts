
import {blobify} from './utils/xlsxUtils';

const XLSX = require('xlsx');

/**
 * 导出文件
 */
export const exportFile = ({
  fileName = 'table.xlsx',
  sheetNames = [],
  columns = [],
  dataSource = []
}:{
  fileName: string,
  sheetNames: any,
  columns: any,
  dataSource: any
}) => {
  const Sheets: any = {};
  sheetNames.forEach((sheetName: string, sheetIndex: number) => {
    const { sheet } = formatToSheet({columns, dataSource});
    Sheets[sheetName] = sheet;
  });
  const wb = {
    SheetNames: sheetNames,
    Sheets: Sheets,
  };
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
  const wbout = XLSX.write(wb, wopts);
  const url = saveAs(new Blob([blobify(wbout)], {type:'application/octet-stream'}), fileName);
  return url;
};
/**
 * 保存
 */
const saveAs = (blob:any, fileName:any) => {
  if (typeof URL !== 'undefined' && typeof document !== 'undefined' && document.createElement && URL.createObjectURL) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    if (a.download != null) {
      a.download = fileName;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (URL.revokeObjectURL && typeof setTimeout !== 'undefined') {
        setTimeout(function() { URL.revokeObjectURL(url); }, 60000);
      }
      return url;
    }
  }
};
/**
 * 转换成sheet对象
 */
const formatToSheet = ({columns, dataSource}: {
  columns: any,
  dataSource: any
}) => {
  const sheet: any = {};
  const header: any = {};
  const headerKeys: (number|string)[] = [];
  const $cols: { wpx: any }[] = [];
  const $merges: {s: { c:number, r:number }, e: { c:number, r:number }}[] = [];
  columns.forEach((col: any, colIndex: number) => {
    const key = col.dataIndex || col.key;
    const title = col.title; // todo
    header[key] = title;
    headerKeys.push(key);
    $cols.push({wpx: formatToWpx(col.width)});
    const xAxis = XLSX.utils.encode_col(colIndex);
    dataSource.forEach((data: any, rowIndex: number) => {
      const value = data[key];
      sheet[`${xAxis}${rowIndex + 1}`] = {
        t: 's',
        v: value,
        s: {
          font: { name: '宋体' },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
        }
      };
      if (col.render) {
        const result = col.render(value, data, rowIndex);
        const merge = getMerge({result, colIndex, rowIndex});
        if (merge) {
          $merges.push(merge);
        }
      }
    });
  });
  const endRange = XLSX.utils.encode_col(columns.length - 1) + String(dataSource.length + 1);
  sheet['!ref'] = `A1:${endRange}`;
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
const getMerge = ({result, colIndex, rowIndex}:{result:any, colIndex: number, rowIndex: number}) => {
  if (result.props) {
    const {colSpan, rowSpan} = result.props;
    if ((colSpan && colSpan !== 1) || (rowSpan && rowSpan !== 1)) {
      const merge:any = {
        s: { c: colIndex, r: rowIndex},
        e: { c: undefined, r: undefined},
      };
      merge.e.c = colIndex + (colSpan || 1) - 1;
      merge.e.r = rowIndex + (rowSpan || 1) - 1;
      return merge;
    }
  }
  return false;
};
