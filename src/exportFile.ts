
const XLSX = require('xlsx');

/**
 * 导出文件
 */
export const exportFile = ({
    sheetNames=['a', 'b'],
    columns,
    dataSource
}:{
    sheetNames: any,
    columns: any,
    dataSource: any
}) => {
    const wb = {
        SheetNames: sheetNames,
        Sheets: {
            a: {
                '!ref': "A1:A2",
                A1: {
                    t: 's',
                    v: 'A1哈哈'
                },
                A2: {
                    t: 's',
                    v: 'A2哈哈'
                }
            },
            b: {
                '!ref': "A1:A2",
                A1: {
                    t: 'n',
                    v: 'A1嘻嘻'
                }
            }
        },
    }
    XLSX.writeFile(wb, 'out.xlsx');
}
