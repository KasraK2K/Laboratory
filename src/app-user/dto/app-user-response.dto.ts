import { Exclude } from 'class-transformer'

export class AppUserResponseDto {
  id: number
  id_number: string
  first_name: string
  surname: string
  is_blocked: boolean
  email: string
  contact_number: string
  permission: number
  otp: string
  otp_time: Date
  created_at: Date
  updated_at: Date
  archive_at: Date
}
