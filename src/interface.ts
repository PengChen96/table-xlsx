
export interface Columns {
    key?: string,
    title?: string,
    dataIndex?: string,
    mergesObj?: any,
    render?: (value: any, row: any, rowIndex: number) => void
}
export interface Tables {
    sheetName?: string,
    dataSource?: any,
    columns?: Columns[]
}
