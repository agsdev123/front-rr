import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ActivityApi } from './activity/activity.api'

import { StepApi } from './step/step.api'

import { SleepApi } from './sleep/sleep.api'

import { PictureApi } from './picture/picture.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Activity extends ActivityApi {}

  export class Step extends StepApi {}

  export class Sleep extends SleepApi {}

  export class Picture extends PictureApi {}
}
