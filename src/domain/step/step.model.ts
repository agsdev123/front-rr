import { Activity } from '../activity'

export class Step {
  id: string

  stepCount?: number

  activityId: string

  activity?: Activity

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
