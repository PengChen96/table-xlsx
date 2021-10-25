import React from 'react';
import {exportFile} from '../index';
import {columns, dataSource, multiHeadColumns} from '../__mock__/default';

describe('export file', () => {

  const params = {
    sheetNames: ['Sheet1'],
    columns: columns,
    dataSource: dataSource,
  };
  const result = exportFile(params);
  test('default test', () => {

    expect(result.SheetNames).toStrictEqual(params.sheetNames);

  });

});

describe('export file grouping columns', () => {

  const params = {
    sheetNames: ['Sheet1'],
    columns: multiHeadColumns,
    dataSource: dataSource,
  };
  const result = exportFile(params);
  test('default test', () => {

    expect(result.SheetNames).toStrictEqual(params.sheetNames);

  });

});

describe('internal functions of export file', () => {


});
