import React from 'react';
import {Button, Table, Upload, Divider, Space} from 'antd';
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
  const singKeyMap = {
    '姓名': 'baseInfo.name',
    '年龄': 'baseInfo.age',
    '性别': 'baseInfo.gender',
    '身高': 'baseInfo.height',
    '体重': 'baseInfo.weight',
    '手机号': 'contact.phone',
    '邮箱': 'contact.email',
    '所在省': 'address.province',
    '所在市': 'address.city'
  };

  const moreKeyMap =  {
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
  return <div style={{padding: 20}}>
    <Space>
      <a href="https://ngw.lanzout.com/is9fT13qhkve" target='_blank'>下载分组表头-多sheets-测试文件.xlsx</a>
      <a href="https://ngw.lanzout.com/i2W1n13qhr2h" target='_blank'>下载分组表头-单sheets-测试文件.xlsx</a>
      <a href="https://ngw.lanzout.com/ihgCA13qmr9e" target='_blank'>下载普通表头-单sheets-测试文件.xlsx</a>
      <a href="https://ngw.lanzout.com/iONrR13qmraf" target='_blank'>下载普通表头-单sheets-测试文件.xlsx</a>
    </Space>
    <DemoFroParseExcel keyMaps={[moreKeyMap]} title={'分组表头-单sheets'} />
    <DemoFroParseExcel keyMaps={[moreKeyMap, moreKeyMap, moreKeyMap]} title={'分组表头-多sheets'} />
    <Divider style={{ background: '#000' }} />
    <DemoFroParseExcel keyMaps={[singKeyMap]} title={'普通表头-单sheets'} />
    <DemoFroParseExcel keyMaps={[singKeyMap, singKeyMap]} title={'普通表头-多sheets'} />
  </div>;
};
