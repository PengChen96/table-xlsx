import {getSheetCells, getSheetHeaderAndData} from './utils/mergedParse';
const XLSX = require('@pengchen/xlsx');
import {KeyMapType} from './interface';
/**
 * 读取文件
 */
export const parseExcel = ({file, textKeyMap}: { file: File, textKeyMap: KeyMapType }) => new Promise((resolve, reject) => {
  const reader: FileReader = new FileReader();
  const rABS = !!reader.readAsBinaryString;
  reader.onload = e => {
    const sheets: any[] = [];
    const data = e.target && e.target.result;
    const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array', });
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      sheets.push(getSheetCells(worksheet));
    }
    try {
      const { headerColumns, dataList, dataSourceList } = getSheetHeaderAndData(sheets[0], textKeyMap);
      console.log('headerColumns', headerColumns); // table 表头结构
      console.log('dataSourceList', dataSourceList); // table 表格数据
      console.log('dataList', dataList); // 源数据
      const tables = {
        headerColumns, dataSourceList, dataList
      };
      resolve(tables);
    } catch (error) {
      reject(error);
      console.log(error);
      alert(error);
    }
  };
  if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
});
