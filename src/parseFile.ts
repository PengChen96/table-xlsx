import {getSheetCells, getSheetHeaderAndData} from './utils/mergedParse';
import {KeyMapType} from './interface';
const XLSX = require('@pengchen/xlsx');

/**
 * 读取文件
 */
export const parseFile = ({file, textKeyMaps = []}: { file: File, textKeyMaps: KeyMapType[] }) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onload = (e) => {
    /* Parse data */
    const sheets: any[] = [];
    const sheetsName: string[] = [];
    const data = e.target && e.target.result;
    const workBook = XLSX.read(data, { type: rABS ? 'binary' : 'array', });
    for (const sheetName of workBook.SheetNames) {
      sheetsName.push(sheetName);
      const worksheet = workBook.Sheets[sheetName];
      sheets.push(getSheetCells(worksheet));
    }
    try {
      const tables = [];
      for (let i = 0; i < sheets.length; i++) {
        tables.push({...getSheetHeaderAndData(sheets[i], textKeyMaps[i]), sheetName: sheetsName[i]});
      }
      // const { headerColumns, dataList, dataSourceList } = getSheetHeaderAndData(sheets[0], textKeyMaps[0]);
      // 表头结构 表格数据 源数据
      resolve({
        tables, workBook
      });
    } catch (error) {
      reject(error);
    }
  };
  reader.onerror = (e) => {
    reject(e);
  };
  if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
});

