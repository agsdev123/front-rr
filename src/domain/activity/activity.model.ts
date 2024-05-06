import { User } from '../user'

import { Step } from '../step'

import { Sleep } from '../sleep'

import { Picture } from '../picture'

export class Activity {
  id: string

  type?: string

  date?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  steps?: Step[]

  sleeps?: Sleep[]

  pictures?: Picture[]
}
