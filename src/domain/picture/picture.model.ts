import { Activity } from '../activity'

export class Picture {
  id: string

  imageUrl?: string

  activityId: string

  activity?: Activity

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
