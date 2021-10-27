import {sameType} from "../utils/base";

describe('sameType', () => {

  test('default test', () => {

    expect(sameType('1', 'String')).toStrictEqual(true);
    expect(sameType(1, 'Number')).toStrictEqual(true);
    expect(sameType(Symbol(1), 'Symbol')).toStrictEqual(true);
    expect(sameType(null, 'Null')).toStrictEqual(true);
    expect(sameType(undefined, 'Undefined')).toStrictEqual(true);
    expect(sameType(() => {
    }, 'Function')).toStrictEqual(true);

    expect(sameType({}, 'Object')).toStrictEqual(true);
    expect(sameType([], 'Object')).toStrictEqual(false);

    expect(sameType([], 'Array')).toStrictEqual(true);
    expect(sameType({}, 'Array')).toStrictEqual(false);

    expect(sameType(true, 'Boolean')).toStrictEqual(true);
    expect(sameType(false, 'Boolean')).toStrictEqual(true);
    expect(sameType(1, 'Boolean')).toStrictEqual(false);

  });

});
