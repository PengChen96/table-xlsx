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
rowHpx | 行高 | number | 25
sheetNames | sheet页 | array | ['sheet1']
useRender | 使用render返回的值 | boolean | true
onTxBodyRow | 设置表格主体行，@return里可设置单元格样式| function(record, index) { return { style } } | -

## columns
参数 | 说明 | 类型 | 默认值
---|---|---|---
dataIndex | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | string/string[] | -
title | 列头显示文字 | string | -
width | 列宽度 | string/number | 100
txHeaderCellStyle | 列头单元格样式 | object | -
render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并 | function(text, record, index) {} | -
onTxBodyCell | 设置表格主体单元格，@return里可设置单元格样式；如果是多级表头，需要设置在末级列 | function(record, index) { return { style } } | -


## cellStyle、headerCellStyle、bodyCellStyle、txHeaderCellStyle、onTxBodyCell().style
参数 | 说明 | 类型 | 默认值
---|---|---|---
fontName | 字体 | string | 'Calibri'
fontColorRgb | 字体颜色（ARGB） | string | '333333'
fontBold | 加粗 | boolean | false
fillFgColorRgb | 背景填充颜色（ARGB） | string | 'ffffff'
borderStyle | 边框风格（thin、medium、thick、dotted、hair、dashed、mediumDashed、dashDot、mediumDashDot、dashDotDot、mediumDashDotDot、slantDashDot） | string | 'thin'
borderColorRgb | 边框颜色（ARGB） | string | 'd1d3d8'
alignmentHorizontal | 水平对齐（left、center、right） | string | 'center'
alignmentVertical | 垂直对齐（top、center、bottom） | string | 'center'
alignmentWrapText | 自动换行（true、false） | boolean | false
alignmentReadingOrder | 阅读顺序 | number | 2
alignmentTextRotation | 文本旋转（0 to 180 or 255） | number | 0

