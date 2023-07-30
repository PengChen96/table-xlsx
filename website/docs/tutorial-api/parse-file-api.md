---
sidebar_position: 2
---

# parseFile
解析文件的方法

 参数          | 说明     | 类型     | 默认值 
-------------|--------|--------|-----
 file        | 文件     | binary | -   
 textKeyMaps | 文件头的映射 | array  | -

**输出内容**
```
{
    tables: [
        {
            dataList: [], // 解析后的目标数据结构数组
            dataSourceList: [], // antd的dataSource
            headerColumns: [], // antd的columns
            sheetName: '', // 文件名
        },
      ...
    ],
    workBook: {}
}
```

