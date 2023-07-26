import React, {useState} from 'react';
import {Table, Upload, Button} from 'antd';
import {parseExcel, exportFile} from '../dist/table-xlsx.development';
import 'antd/dist/antd.css';
const {Dragger} = Upload;
const textKeyMap =  {
  姓名: 'baseInfo.name',
  '基础信息.年龄': 'baseInfo.age',
  '基础信息.性别': 'baseInfo.gender',
  '基础信息.身高': 'baseInfo.height',
  '基础信息.体重': 'baseInfo.weight',
  手机号: 'contact.phone',
  邮箱: 'contact.email',
  '地址信息.所在省': 'address.province',
  '地址信息.所在市': 'address.city',
};
export default () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const handleChange = (file) => {
    parseExcel({file, textKeyMap}).then(({ headerColumns, dataSourceList, dataList }) => {
      setColumns(headerColumns);
      setDataSource(dataSourceList);
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
    <Button ></Button>
    <a href="https://ngw.lanzout.com/iimto13jei1c" target='_blank'>下载分组表头 测试文件</a>
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
    <Table columns={columns} dataSource={dataSource}/>
  </div>;
};
