---
sidebar_position: 4
---

# 多sheet页-导出
通过设置sheetNames、columns和dataSource为二维数组，可以导出多sheet页excel文件

```jsx live
// import { Button, Table } from 'antd';
// import { exportFile } from 'table-xlsx';
function MyComponent() {

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const onExportFileClick = () => {
    exportFile({
      sheetNames: ['sheet1', 'sheet2', 'sheet3'],
      columns: [columns, columns, columns],
      dataSource: [dataSource, dataSource, dataSource],
    });
  };
  return (
    <div>
      <Button onClick={() => onExportFileClick()}>export</Button>
      <div>
        <Table
          style={{marginTop: 20}}
          dataSource={dataSource}
          columns={columns}
          bordered
          size={'small'}
          pagination={false}
        />
      </div>
    </div>
  );
}
```
