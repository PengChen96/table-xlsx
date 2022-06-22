---
sidebar_position: 3
---

# 设置整体样式-导出
目前支持单元格、字体、填充颜色、对齐方式的设置

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
      columns: columns,
      dataSource: dataSource,
      cellStyle: {
        borderColorRgb: '333'
      },
      headerCellStyle: {
        fontColorRgb: 'FF8040'
      },
      bodyCellStyle: {
        fillFgColorRgb: 'EEEEE0'
      },
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
