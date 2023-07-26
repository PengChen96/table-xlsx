import React from 'react';
import {Button, Table, Upload, Divider} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {exportFile, parseFile} from '../dist/table-xlsx.development';
import 'antd/dist/antd.css';
import DemoFroParseExcel from './eg.parseDemo';

const dataSource = [
  {key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号', },
  {key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号', },
];

const columns = [
  {title: '姓名', dataIndex: 'name', key: 'name', },
  {title: '年龄', dataIndex: 'age', key: 'age', },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    render: (text) => {
      return <div>
        <span>
          <div>{text}AAAAA</div>
        </span>
      </div>;
    }
  },
];

export default () => {
  const {Dragger} = Upload;
  const [data, setData] = React.useState(dataSource);
  const [cols, setCols] = React.useState(columns);
  const handleFile = (file) => {
    parseFile({file}).then((result) => {
      const columns = result.tables[0].columns.map((col) => {
        col.ellipsis = true;
        return col;
      });
      setData(result.tables[0].dataSource);
      setCols(columns);
    });
  };

  const handleExport = () => {
    exportFile({
      columns: cols,
      dataSource: data,
      useRender: true,
    });
  };

  const SheetJSFT = [
    'xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*', 'html', 'htm'
  ].map(x => `.${x}`).join(',');
  const props = {
    name: 'file',
    accept: SheetJSFT,
    showUploadList: false,
    beforeUpload: (file) => {
      handleFile(file);
    }
  };
  return <div style={{padding: 20}}>
    <DemoFroParseExcel />
    <Divider style={{ background: 'pink' }} />
    <Dragger
      {...props}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined/>
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
    <Table
      dataSource={data}
      columns={cols}
      scroll={{x: true}}
      bordered
      size={'small'}
      pagination={false}
      style={{marginTop: 20}}
    />
    <Button
      onClick={handleExport}
      style={{marginTop: 20}}
    >
      导出文件
    </Button>
  </div>;
};
