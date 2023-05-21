import { RoleName, TokenType } from '../../common/enums/general.enum'

export interface IPayload {
  role: RoleName
  type: TokenType
  id: number
}
