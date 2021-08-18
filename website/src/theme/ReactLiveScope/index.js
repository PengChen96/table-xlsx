/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {exportFile, parseFile} from '../../../../dist';
import {Table, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Table,
  Upload,
  InboxOutlined,
  exportFile,
  parseFile,
};

export default ReactLiveScope;
