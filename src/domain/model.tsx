import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Activity as ActivityModel } from './activity/activity.model'

import { Step as StepModel } from './step/step.model'

import { Sleep as SleepModel } from './sleep/sleep.model'

import { Picture as PictureModel } from './picture/picture.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Activity extends ActivityModel {}

  export class Step extends StepModel {}

  export class Sleep extends SleepModel {}

  export class Picture extends PictureModel {}
}
