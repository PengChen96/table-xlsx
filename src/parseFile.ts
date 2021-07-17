
import {Tables, Columns} from './interface';

const XLSX = require('xlsx');

/**
 * 读取文件
 */
export const parseFile = ({file}: { file: any }) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onload = (e) => {
    /* Parse data */
    const bstr = e.target && e.target.result;
    const wb = XLSX.read(bstr, {
      type:rABS ? 'binary' : 'array',
      cellStyles: true
    });
    /* Get Tables */
    const tables: Tables[] = [];
    wb.SheetNames.forEach((sheetName: string) => {
      const ws = wb.Sheets[sheetName];
      const dataSource = XLSX.utils.sheet_to_json(ws, {header:'A'});
      const columns = getColumns({
        refStr: ws['!ref'],
        mergesArr: ws['!merges'],
      });
      tables.push({
        sheetName,
        dataSource,
        columns,
      });
    });
    resolve({
      wb,
      tables,
    });
  };
  reader.onerror = (e) => {
    reject(e);
  };
  if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
});

/**
 * 生成列
 */
const getColumns = ({refStr, mergesArr}:{refStr:string, mergesArr:any}) => {
  const columns: Columns[] = [];
  if (!refStr) {
    return columns;
  }
  const mergesObj = getMergesObj(mergesArr);
  const columnsLen = XLSX.utils.decode_range(refStr).e.c + 1;
  for (let colIndex = 0; colIndex < columnsLen; ++colIndex) {
    columns[colIndex] = {
      key: XLSX.utils.encode_col(colIndex),
      title: XLSX.utils.encode_col(colIndex),
      dataIndex: XLSX.utils.encode_col(colIndex),
      mergesObj,
      render: (value: any, row: any, rowIndex: number) => {
        return {
          children: value,
          props: mergesObj[`${colIndex}:${rowIndex}`],
        };
      },
    };
  }
  return columns;
};
/**
 * 获取合并项
 */
const getMergesObj = (mergesArr: any = []) => {
  const mergesObj:{[key: string]: any} = {};
  mergesArr.forEach((m: { s: { c: number; r: number; }; e: { c: number; r: number; }; }) => {
    const msc = m.s.c;
    const msr = m.s.r;
    const mec = m.e.c;
    const mer = m.e.r;
    for (let sc = msc; sc <= mec; sc++) {
      for(let sr = msr; sr <= mer; sr++) {
        mergesObj[`${sc}:${sr}`] = {
          colSpan: 0,
          rowSpan: 0,
        };
      }
    }
    mergesObj[`${msc}:${msr}`] = {
      colSpan: mec - msc + 1,
      rowSpan: mer - msr + 1,
    };
  });
  return mergesObj;
};