export interface ColumnType {
    key?: string,
    title?: string,
    dataIndex?: string,
    mergesObj?: any,
    render?: (value: any, row: any, rowIndex: number) => void
}

export interface TableType {
    sheetName?: string,
    dataSource?: any,
    columns?: ColumnType[]
}
