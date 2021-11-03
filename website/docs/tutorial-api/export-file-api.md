---
sidebar_position: 1
title: exportFile
---

# exportFile
导出文件的方法

参数 | 说明 | 类型 | 默认值
---|---|---|---
columns | 表格列 | array | []
cellStyle | 单元格样式 | object | {}
headerCellStyle | 表头单元格样式 | object | {}
bodyCellStyle | 主体单元格样式 | object | {}
dataSource | 表格数据 | array | []
fileName | 文件名 | string | 'table.xlsx'
showHeader | 显示表头 | bool | true
raw | 是否格式化值的类型 | bool | false
sheetNames | sheet页 | array | ['sheet1']

## columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string/string[] | -
render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并 | function(text, record, index) {} | -
title | 列头显示文字 | string | -
width | 列宽度 | string/number | 100


## cellStyle、headerCellStyle、bodyCellStyle
参数 | 说明 | 类型 | 默认值
---|---|---|---
fontName | 字体 | string | 'Calibri'
fontColorRgb | 字体颜色（ARGB） | string | '333333'
fontBold | 加粗 | boolean | false
fillFgColorRgb | 背景填充颜色（ARGB） | string | 'ffffff'
borderStyle | 边框风格（thin、medium、thick、dotted、hair、dashed、mediumDashed、dashDot、mediumDashDot、dashDotDot、mediumDashDotDot、slantDashDot） | string | 'thin'
borderColorRgb | 边框颜色（ARGB） | string | 'd1d3d8'
alignmentHorizontal | 水平对齐（left、center、right） | string | 'center'
alignmentHorizontal | 垂直对齐（top、center、bottom） | string | 'center'

