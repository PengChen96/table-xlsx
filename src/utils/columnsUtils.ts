import {ColumnType} from '../interface';

/**
 * 扁平化列
 */
export const flattenColumns = (
  {
    columns,
    childrenField = 'children'
  } : {
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

/**
 * 获取表头二维数组
 */
export const getHeader2dArray = ({
  columns,
  headerLevel,
  childrenField = 'children'
} : {
  columns: ColumnType[],
  headerLevel: number,
  childrenField?: string
}) => {
  const arr: ColumnType[][] = [];
  const deal = (_columns: ColumnType[], startCol = 0, rowLevel = 0) => {
    _columns.reduce((prevCol: number, currentColumn: ColumnType) => {
      if (!arr[rowLevel]) {
        arr[rowLevel] = [];
      }
      arr[rowLevel][prevCol] = currentColumn;
      let nextCol = prevCol;
      const childColumns = currentColumn[childrenField];
      if (childColumns) {
        deal(childColumns, prevCol, rowLevel + 1);
        const {columns: flatChildColumns} = flattenColumns({columns: childColumns, childrenField});
        nextCol += flatChildColumns.length;
        arr[rowLevel][prevCol].merges = {
          s: {c: prevCol, r: rowLevel},
          e: {c: nextCol - 1, r: rowLevel},
        };
        // 补全值 跨行的值
        for(let c = prevCol + 1; c < nextCol; c++){
          arr[rowLevel][c] = currentColumn;
        }
      } else {
        nextCol += 1;
        // 有跨列
        if (headerLevel - 1 - rowLevel > 0) {
          arr[rowLevel][prevCol].merges = {
            s: {c: prevCol, r: rowLevel},
            e: {c: prevCol, r: headerLevel - 1},
          };
          // 补全值 跨列的值
          for (let r = rowLevel + 1; r < headerLevel; r++) {
            if (!arr[r]) {
              arr[r] = [];
            }
            arr[r][prevCol] = currentColumn;
          }
        }
      }
      return nextCol;
    }, startCol);
  };
  deal(columns);
  return arr;
};
