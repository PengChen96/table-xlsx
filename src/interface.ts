export type DefaultValueType = Record<string, any>
export type DataIndex = string | number | undefined | readonly (string | number)[];

export interface MergesArrType {
    s: {
        c: number,
        r: number
    },
    e: {
        c: number,
        r: number
    }
}

export interface MergesObjType {
    [key: string]: {
        colSpan?: number,
        rowSpan?: number,
    }
}

export interface ColumnType {
    key?: string,
    title?: string,
    dataIndex?: string,
    mergesObj?: MergesObjType,
    render?: (value: any, row: DefaultValueType, rowIndex: number) => any,
    onTxBodyCell?: (row: DefaultValueType, rowIndex: number) => { style: CellStyleType },
    children?: ColumnType[],

    [key: string]: any,
}

export interface DataType {
    [key: string]: any,
}

export interface TableType {
    sheetName?: string,
    dataSource?: DataType[],
    columns?: ColumnType[],
}

export interface CellStyleType {
    fontBold?: boolean,
    fontName?: string,
    fontColorRgb?: string,
    fillFgColorRgb?: string,
    borderStyle?: string,
    borderColorRgb?: string,
    alignmentHorizontal?: string,
    alignmentVertical?: string,
}

export interface SheetType {
    '!ref'?: string,
    '!cols'?: { wpx?: number }[],
    '!rows'?: { hpx?: number }[],
    '!merges'?: MergesArrType[],

    [key: string]: {
        t?: string,
        v?: string | number,
        s?: DefaultValueType
    } | undefined | string
        | { wpx?: number }[]
        | { hpx?: number }[]
        | MergesArrType[],

}

export interface HeaderCellType {
    title?: string,
    merges?: MergesArrType,
    txHeaderCellStyle?: CellStyleType,
}

export interface ExportFilePropsType {
    fileName?: string,
    sheetNames?: (string | number)[],
    columns: ColumnType[][],
    dataSource: DataType[][],
    showHeader?: boolean,
    raw?: boolean,
    rowHpx?: number,
    cellStyle?: CellStyleType,
    headerCellStyle?: CellStyleType,
    bodyCellStyle?: CellStyleType,
    useRender?: boolean,
    onTxBodyRow?: (row: DefaultValueType, rowIndex: number) => { style: CellStyleType },
}
