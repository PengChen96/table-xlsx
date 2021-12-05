---
sidebar_position: 1
---

# 安装

**使用npm或yarn**
```shell
npm install --save table-xlsx @pengchen/xlsx
# or
yarn add table-xlsx @pengchen/xlsx
```
:::note
⚡️ [**SheetJS/js-xlsx**](https://github.com/SheetJS/sheetjs)社区版本不支持样式，您可以使用[**@pengchen/xlsx**](https://github.com/PengChen96/sheetjs)(基于js-xlsx@0.17.0修改)  
💸 当然，您也可以直接使用[SheetJS Pro](https://sheetjs.com/pro)版本
:::
**使用CDN**
```html
<!-- 注意: 部署时，将 "development.umd.js" 替换为 "production.umd.js"-->
<script crossorigin src="https://unpkg.com/table-xlsx/dist/table-xlsx.development.umd.js"></script>
```
如果使用CDN的方式引入table-xlsx，建议设置[crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)属性
<details>
  <summary><b>CDN Availability</b> (click to show)</summary>

|    CDN     | URL                                        |
|-----------:|:-------------------------------------------|
|    `unpkg` | <https://unpkg.com/xlsx/>                  |
| `jsDelivr` | <https://jsdelivr.com/package/npm/xlsx>    |
</details>

## 使用
### 导出xlsx
```javascript
import { exportFile } from 'table-xlsx';

const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号', },
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号', },
];

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', },
  { title: '年龄', dataIndex: 'age', key: 'age', },
  { title: '住址', dataIndex: 'address', key: 'address', },
];

exportFile({
  columns: columns,
  dataSource: dataSource,
});
```

### 解析xlsx
```javascript
import { parseFile } from 'table-xlsx';

parseFile({file}).then((result) => {
  const { columns, dataSource } = result.tables[0];
  setDataSource(dataSource);
  setColumns(columns);
});

<Table
  dataSource={dataSource}
  columns={columns}
/>
```
