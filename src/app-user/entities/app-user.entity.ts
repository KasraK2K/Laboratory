import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Unique
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { PermissionName } from '../../common/enums/general.enum'
import { toSqlDate } from '../../common/helpers/date.helper'
import { uid } from 'uid'

@Entity({ name: 'app_users' })
@Unique(['email', 'id_number'])
export default class AppUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  id_number: string

  @Column({ default: '' })
  first_name: string

  @Column({ default: '' })
  surname: string

  @Column({ default: false })
  is_blocked: boolean

  @Column({ nullable: true })
  email: string

  @Column()
  contact_number: string

  @Column({ default: PermissionName.NORMAL })
  permission: number

  @Column()
  otp: string

  @Column()
  otp_time: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  archive_at: Date

  constructor(partial: Partial<AppUser>) {
    Object.assign(this, partial)
  }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: F U N C T I O N S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  @BeforeInsert()
  otpAndHash() {
    this.otp = this.hash(uid(6))
    this.otp_time = new Date()
  }

  @BeforeUpdate()
  newOtpAndHash() {
    if (this.otp && this.otp.length === 6) {
      this.otp = this.hash(this.otp)
      this.otp_time = new Date()
    }
  }

  hash(argument: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(argument, salt)
  }

  compareOtp(otp: string) {
    return bcrypt.compareSync(otp, this.otp)
  }
}
