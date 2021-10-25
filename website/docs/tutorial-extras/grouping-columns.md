---
sidebar_position: 2
---

# 分组表头表格导出

```jsx live
function MyComponent() {
  const [data, setData] = React.useState([]);
  const [cols, setCols] = React.useState([]);
  React.useEffect(() => {
    init();
  }, [])
  const init = () => {
      const columns = [{
          key: 'c1',
          dataIndex: 'c1',
          title: 'title1',
          width: 100,
        }, {
        title: 'title1',
        children: [
          {
            title: 'title1-1',
            children: [{
              title: 'title1-1-1',
              dataIndex: 'c1',
              key: 'c1',
              width: 100,
            }, {
             title: 'title1-1-2',
             dataIndex: 'c2',
             key: 'c2',
             width: 100,
            }],
          },
          {
            title: 'title1-2',
            dataIndex: 'c3',
            key: 'c3',
            width: 100,
          },
        ],
      }, {
        key: 'c2',
        dataIndex: 'c2',
        title: 'title2',
        width: 100,
      }, {
        key: 'c3',
        dataIndex: 'c3',
        title: 'title3',
        width: 100,
        children: [
          {
            key: 'c3',
            dataIndex: 'c3',
            title: 'title3',
            width: 100,
          },
          {
            key: 'c3',
            dataIndex: 'c3',
            title: 'title3',
            width: 100,
          },
        ]
      }, {
        key: 'c4',
        dataIndex: 'c4',
        title: 'title4',
        width: 100,
      }];
      const dataSource = [{
        c1: 'data1',
        c2: 'data2',
        c3: 'data3',
        c4: 'data4',
      }, {
        c1: 11,
        c2: 22,
        c3: 33,
        c4: 44,
      }, {
        c1: 11,
        c2: 22,
        c3: 33,
        c4: 44,
      }];
      setData(dataSource);
      setCols(columns);
    };
  const onExportFileClick = () => {
    exportFile({
     sheetNames: ['a'],
     columns: cols,
     dataSource: data,
    });
  };
  return (
    <div>
      <button onClick={() => onExportFileClick()}>export</button>
      <div>
        <Table
          style={{marginTop: 20}}
          dataSource={data}
          columns={cols}
          bordered
          size={'small'}
          pagination={false}
        />
      </div>
    </div>
  );
}
```
