/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Table, Upload} from 'antd';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {InboxOutlined} from '@ant-design/icons';
import {exportFile, parseFile} from '../../../../index';
import 'antd/dist/antd.css';

function MyLibComponentBrowserOnly(props) {
  return (
    <BrowserOnly fallback={<div>...</div>}>
      {() => {
        const {VTablePro} = require('virtualized-table');
        return <VTablePro {...props} />;
      }}
    </BrowserOnly>
  );
}

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Table,
  Upload,
  InboxOutlined,
  VTablePro: MyLibComponentBrowserOnly,
  exportFile,
  parseFile,
};

export default ReactLiveScope;
