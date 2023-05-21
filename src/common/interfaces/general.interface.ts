export type MysqlDatabaseType = 'mysql' | 'mariadb'

export interface IMetadata {
  [key: string]: any
}

export interface IResponse {
  statusCode: number
  data: Record<string, any> | Record<string, any>[]
  meta: IMetadata
}
