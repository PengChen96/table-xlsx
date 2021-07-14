
const XLSX = require('xlsx');

/**
 * 导出文件
 */
export const exportFile = ({
  sheetNames = [],
  columns = [],
  dataSource = []
}:{
    sheetNames: any,
    columns: any,
    dataSource: any
}) => {

  const { sheet } = formatToSheet({columns, dataSource});
  const wb = {
    SheetNames: ['sheetNames'],
    Sheets: {
      'sheetNames': sheet,
      b: {
        '!ref': 'A1:A2',
        A1: {
          t: 'n',
          v: 'A1嘻嘻'
        }
      }
    },
  }
  XLSX.writeFile(wb, 'out.xlsx');
}
/**
 * 转换成sheet对象
 */
const formatToSheet = ({columns, dataSource}: {
  columns: any,
  dataSource: any
}) => {
  const headerKeys:any = [];
  const header:any = {};
  columns.forEach((col: any, colIndex: number) => {
    const key = col.dataIndex || col.key;
    const title = col.title;
    header[key] = title;
    headerKeys.push(key);
  })
  const data = dataSource.map((da: any, daIndex: number) => {
    const row:any = {};
    headerKeys.forEach((key: string | number) => {
      row[key] = da[key];
    })
    return row;
  });
  data.unshift(header);
  const sheet = XLSX.utils.json_to_sheet(data, {header: headerKeys, skipHeader: true});
  return {
    sheet
  };
}
