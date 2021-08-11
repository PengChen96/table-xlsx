import React from 'react';

export const columns = [{
  key: 'c1',
  dataIndex: 'c1',
  title: 'title1',
  width: 100,
  render: (text, row, index) => {
    return {
      children: <a>{text}</a>,
      props: {
        colSpan: index === 1 ? 2 : 1,
      },
    };
  }
}, {
  key: 'c2',
  dataIndex: 'c2',
  title: 'title2',
  width: 100,
  render: (text, row, index) => {
    return {
      children: <a>{text}</a>,
      props: {
        colSpan: index === 1 ? 0 : 1,
      },
    };
  }
}, {
  key: 'c3',
  dataIndex: 'c3',
  title: 'title3',
  width: 100,
  render: (text, row, index) => {
    let rowSpan = 1;
    if (index === 1) {
      rowSpan = 2;
    }
    if (index === 2) {
      rowSpan = 0;
    }
    return {
      children: <a>{text}</a>,
      props: {
        rowSpan,
      },
    };
  }
}, {
  key: 'c4',
  dataIndex: 'c4',
  title: 'title4',
  width: 100,
  render: (text, row, index) => {
    return <a>{text}</a>;
  }
}];

export const dataSource = [{
  c3: 'data3',
  c1: 'data1',
  c2: 'data2',
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
