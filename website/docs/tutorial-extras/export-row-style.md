---
sidebar_position: 3
---

# 设置行样式-导出
目前支持单元格、字体、填充颜色、对齐方式的设置

```jsx live
// import { VTablePro } from 'virtualized-table';
// import { exportFile } from 'table-xlsx';
function MyComponent() {

  const COL_NUM = 4;
  const DATA_NUM = 100;
  const getColumns = (colNum = COL_NUM) => {
    const columns = [];
    for (let i = 0; i < colNum; i++) {
      columns.push({
        title: `标题${i}`,
        dataIndex: `title${i}`,
        key: `title${i}`,
        width: 120
      });
    }
    return columns;
  }
  const getDataSource = (colNum = COL_NUM, dataNum = DATA_NUM) => {
    const dataSource = [];
    for (let r = 0; r < dataNum; r++) {
      let row = {};
      for (let c = 0; c < colNum; c++) {
        row[`title${c}`] = `内容${r}:${c}`;
      }
      dataSource.push(row);
    }
    return dataSource;
  }

  const columns = getColumns();
  const dataSource = getDataSource();
  const onExportFileClick = () => {
    exportFile({
      columns: columns,
      dataSource: dataSource,
      onTxBodyRow: (record, index) => {
        let style;
        if (index % 3 === 1) {
          style = { fillFgColorRgb: 'EEEEE0' }
        } 
        if (index % 3 === 2) {
          style = { fillFgColorRgb: 'FFE4C4' }
        }
        return { style };
      }
    });
  };
  return (
    <div>
      <Button onClick={() => onExportFileClick()}>export</Button>
      <Table
        style={{marginTop: 20}}
        dataSource={dataSource}
        columns={columns}
        bordered
        size={'small'}
        pagination={false}
        scroll={{y: 300, x: true}}
      />
    </div>
  );
}
```
