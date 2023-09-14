
## CHANGELOG
### 0.1.10
修复：
    - 使用useRender时getRenderValue函数中的传参可能为空的情况
    
### 0.1.9
修复：
    - 导出文件使用useRender，获取['xx1', 'xx2']值为空的情况
    - parseFile函数中ws['!merges']为空的情况

### 0.1.8
修复：
    - 导出文件使用useRender，获取`<div><span><div>{text}</div></span></div>`值为空的情况

### 0.1.7
新增：
    - 新增样式alignmentWrapText、alignmentTextRotation
修复：
    - useRender参数不生效
    - 导出的excel内容会显示null

### 0.1.6
新增：
    - 新增txHeaderCellStyle、onTxBodyCell设置单个单元格样式
    - 新增onTxBodyRow设置行样式

### 0.1.5
修复：
    - @pengchen/xlsx0.0.5版本样式失效问题
    
### 0.1.2
修复：
    - 表头分组合并单元格，传了多个merges信息，造成Microsoft Excel会显示文件损坏
