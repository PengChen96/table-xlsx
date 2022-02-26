---
sidebar_position: 6
---

# 大数据量-导出
导出数据速度由运行的电脑性能决定，经本人电脑测试，该示例25列10000行的数据量导出大概要4～5秒左右的时间

电脑配置  
处理器：2 GHz 四核Intel Core i5  
内存：16 GB 3733 MHz LPDDR4X

```jsx live
// import { VTablePro } from 'virtualized-table';
// import { exportFile } from 'table-xlsx';
function MyComponent() {

  const COL_NUM = 25;
  const DATA_NUM = 10000;
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
      <Button onClick={() => onExportFileClick()}>export</Button>
      <div style={{marginTop: 20}}>
        <VTablePro
          bordered
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
}
```
