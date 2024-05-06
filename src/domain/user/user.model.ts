import { Notification } from '../notification'

import { Activity } from '../activity'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  _id: string
  email: string
  status: UserStatus
  name: string
  phoneNumber:number
  pictureUrl: string
  subscription:any
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  activitys?: Activity[]
}
