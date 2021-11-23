---
sidebar_position: 6
---

# Large Data

```jsx live
function MyComponent() {

  const COL_NUM = 25;
  const DATA_NUM = 1000;
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
    });
  };
  return (
    <div>
      <button onClick={() => onExportFileClick()}>export</button>
      <div style={{marginTop: 20}}>
        <VTablePro
          dataSource={dataSource}
          columns={columns}
          bordered
          scroll={{x: COL_NUM*120, y: 300}}
        />
      </div>
    </div>
  );
}
```
