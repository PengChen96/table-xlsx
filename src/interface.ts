export interface ColumnType {
    key?: string,
    title?: string,
    dataIndex?: string,
    mergesObj?: any,
    render?: (value: any, row: any, rowIndex: number) => void,
    children?: ColumnType[],
    [key: string]: any,
}

export interface TableType {
    sheetName?: string,
    dataSource?: any,
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

export interface ColorSpecType {
    rgb?: string, // specifying a hex ARGB value
    auto: 1, // specifying automatic values
    theme: '1', // specifying an integer index to a theme color and a tint value (default 0)
    tint: '-0.25', // specifying an integer index to a theme color and a tint value (default 0)
    index: 64, // default value for fill.bgColor
}
