---
sidebar_position: 4
---

# Multi Sheet

```jsx live
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
      <button onClick={() => onExportFileClick()}>export</button>
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
