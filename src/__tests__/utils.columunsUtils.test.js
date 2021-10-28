import {flattenColumns, getHeader2dArray} from "../utils/columnsUtils";




describe('columns utils default', () => {

  const columns = [
    {
      title: 'A'
    }, {
      title: 'B',
      children: [
        {
          title: 'B-1'
        }, {
          title: 'B-2',
          children: [{
            title: 'B-2-1'
          }, {
            title: 'B-2-2'
          }]
        }, {
          title: 'B-3'
        }
      ]
    }, {
      title: "C"
    }
  ];
  const result = flattenColumns({columns});
  const headerArray = getHeader2dArray({columns, headerLevel: result.level});

  test('flattenColumns', () => {

    expect(result.level).toStrictEqual(3);
    expect(result.columns.length).toStrictEqual(6);

  });
  test('getHeader2dArray', () => {

    expect(headerArray.length).toStrictEqual(3);
    expect(headerArray[0].length).toStrictEqual(6);

  });


});

describe('columns utils childrenField', () => {

  const columns1 = [
    {
      title: 'A'
    }, {
      title: 'B',
      subColumns: [
        {
          title: 'B-1'
        }, {
          title: 'B-2',
          subColumns: [{
            title: 'B-2-1'
          }, {
            title: 'B-2-2'
          }]
        }, {
          title: 'B-3'
        }
      ]
    }, {
      title: "C"
    }
  ];
  const result1 = flattenColumns({columns: columns1, childrenField: 'subColumns'});
  const headerArray = getHeader2dArray({columns: columns1, headerLevel: result1.level, childrenField: 'subColumns'});

  test('childrenField test', () => {

    expect(result1.level).toStrictEqual(3);
    expect(result1.columns.length).toStrictEqual(6);

  });
  test('getHeader2dArray', () => {

    expect(headerArray.length).toStrictEqual(3);
    expect(headerArray[0].length).toStrictEqual(6);

  });
});
