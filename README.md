# table-xlsx
[![npm version](https://badge.fury.io/js/table-xlsx.svg)](http://badge.fury.io/js/table-xlsx)
[![Build Status](https://www.travis-ci.com/PengChen96/table-xlsx.svg?branch=master)](https://travis-ci.com/github/PengChen96/table-xlsx)
[![codecov](https://codecov.io/gh/PengChen96/table-xlsx/branch/master/graph/badge.svg?token=D75YLE0DLW)](https://codecov.io/gh/PengChen96/table-xlsx)

基于SheetJS封装，实现导出文件和解析文件生成表数据功能

## 安装
```shell
npm install --save table-xlsx @pengchen/xlsx
# or
yarn add table-xlsx @pengchen/xlsx
```

## API
### exportFile
参数 | 说明 | 类型 | 默认值
---|---|---|---
columns | 表格列 | array | []
dataSource | 表格数据 | array | []
fileName | 文件名 | string | 'table.xlsx'
hideHeader | 是否显示表头 | bool | false
raw | 是否格式化值的类型 | bool | false
sheetNames | sheet页 | array | ['sheet1']

### parseFile
参数 | 说明 | 类型 | 默认值
---|---|---|---
file | 文件 | binary | -

**输出内容**
```
    [
      {
        columns: [],
        dataSource: [],
        sheetName: ''
      },
      ...
    ]
```

## License
table-xlsx is available under the MIT License.
