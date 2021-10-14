import React from 'react';
import {getMergesObj} from '../parseFile';

describe('parse file', () => {

  test('function getColumns', () => {

    // expect(getMergesObj(mergesArr)).toEqual(result);

  });
  test('function getMergesObj', () => {
    const mergesArr = [
      {
        s: {c: 0, r: 2},
        e: {c: 1, r: 2},
      },
      {
        s: {c: 2, r: 2},
        e: {c: 2, r: 3},
      }
    ];
    const result = {
      '0:2': {colSpan: 2, rowSpan: 1},
      '1:2': {colSpan: 0, rowSpan: 0},
      '2:2': {colSpan: 1, rowSpan: 2},
      '2:3': {colSpan: 0, rowSpan: 0},
    }
    expect(getMergesObj(mergesArr)).toEqual(result);

  });

});
