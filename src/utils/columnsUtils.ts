import {ColumnType} from '../interface';

/**
 * 扁平化列
 */
export const flattenColumns = (
    {
      columns,
      childrenField = 'children'
    }: {
      columns: ColumnType[],
      childrenField?: string
    }
): {
  level: number,
  columns: ColumnType[]
} => {
  const newColumns: ColumnType[] = [];
  const level: boolean[] = [];
  const flatten = (_columns: ColumnType[], index = 0) => {
    level[index] = true;
    index += 1;
    _columns.forEach((column: ColumnType) => {
      const childColumns = column[childrenField];
      if (childColumns && childColumns.length > 0) {
        flatten(childColumns, index);
      } else {
        newColumns.push(column);
      }
    });
  };
  flatten(columns);
  return {
    level: level.length,
    columns: newColumns
  };
};
