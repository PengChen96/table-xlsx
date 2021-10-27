import {flattenColumns} from "../utils/columnsUtils";

describe('flatten columns', () => {

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
  test('default test', () => {

    expect(result.level).toStrictEqual(3);
    expect(result.columns.length).toStrictEqual(6);

  });

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
  test('childrenField test', () => {

    expect(result1.level).toStrictEqual(3);
    expect(result1.columns.length).toStrictEqual(6);

  });

});
