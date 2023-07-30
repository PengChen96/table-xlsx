import React, {useState} from 'react';
import {Table, Upload} from 'antd';
import {parseFile} from '../dist/table-xlsx.development';
import 'antd/dist/antd.css';
const {Dragger} = Upload;

export default function MyComponent({keyMaps, title}) {
  const [tableData, setTableData] = useState([]);
  const handleChange = (file) => {
    parseFile({file, textKeyMaps: keyMaps}).then(({ tables, workBook }) => {
      setTableData(tables);
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
      handleChange(file);
    }
  };
  return <div style={{padding: 20}}>
    <div style={{fontWeight: 600}}> {title}  </div>
    <Dragger
      {...props}
    >
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
    <br/>
    {
      tableData.map((item, index) => {
        return <div key={index}><Table columns={item.headerColumns} dataSource={item.dataSourceList} rowKey={'baseInfo.name'}/></div>;
      })
    }
  </div>;
};
