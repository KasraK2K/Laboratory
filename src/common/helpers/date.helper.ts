export const toSqlDate = (date: Date) => new Date(date).toISOString().slice(0, 19).replace('T', ' ')
