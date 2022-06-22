---
sidebar_position: 3
---

# 设置单元格样式-导出
目前支持单元格、字体、填充颜色、对齐方式的设置

```jsx live
// import { Button, Table } from 'antd';
// import { exportFile } from 'table-xlsx';
function MyComponent() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      txHeaderCellStyle: { fillFgColorRgb: 'FF8040' },
      onTxBodyCell: () => {
        return {
          style: { fillFgColorRgb: 'EEEEE0' }
        }
      } 
    },
    {
      title: 'Other',
      txHeaderCellStyle: { 
        fillFgColorRgb: 'EEEEE0',
        fontColorRgb: 'FF8040',
      },
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 100,
          txHeaderCellStyle: { fillFgColorRgb: 'FF8040' },
        },
        {
          title: 'Address',
          txHeaderCellStyle: { fontColorRgb: 'FF8040' },
          children: [
            {
              title: 'Street',
              dataIndex: 'street',
              key: 'street',
              width: 100,
              txHeaderCellStyle: { fillFgColorRgb: 'FF8040' },
              onTxBodyCell: (record, index) => {
                let style;
                if (index === 2) {
                  style = { fontColorRgb: 'FF0000', fontBold: true };
                }
                return { style }
              },
            },
            {
              title: 'Block',
              txHeaderCellStyle: { fontColorRgb: 'FF8040' },
              children: [
                {
                  title: 'Building',
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                  txHeaderCellStyle: { fillFgColorRgb: 'FF8040' },
                  onTxBodyCell: (record, index) => {
                    let style;
                    if (index === 1 || index === 2) {
                      style = { fontColorRgb: 'FF0000', fontBold: true };
                    }
                    return { style }
                  },
                },
                {
                  title: 'Door No.',
                  dataIndex: 'number',
                  key: 'number',
                  width: 100,
                  txHeaderCellStyle: { 
                    borderColorRgb: 'FF0000',
                    fontColorRgb: 'FF8040'
                  },
                  onTxBodyCell: () => {
                    return { 
                      style : { fontColorRgb: 'FF0000', fontBold: true }
                    }
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
    
  const dataSource = [];
  for (let i = 0; i < 3; i++) {
    dataSource.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }

  const onExportFileClick = () => {
    exportFile({
      columns: columns,
      dataSource: dataSource,
      bodyCellStyle: {
        alignmentHorizontal: 'center',
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
