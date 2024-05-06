import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Sleep } from './sleep.model'

export class SleepApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Sleep>,
  ): Promise<Sleep[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/sleeps${buildOptions}`)
  }

  static findOne(
    sleepId: string,
    queryOptions?: ApiHelper.QueryOptions<Sleep>,
  ): Promise<Sleep> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/sleeps/${sleepId}${buildOptions}`)
  }

  static createOne(values: Partial<Sleep>): Promise<Sleep> {
    return HttpService.api.post(`/v1/sleeps`, values)
  }

  static updateOne(sleepId: string, values: Partial<Sleep>): Promise<Sleep> {
    return HttpService.api.patch(`/v1/sleeps/${sleepId}`, values)
  }

  static deleteOne(sleepId: string): Promise<void> {
    return HttpService.api.delete(`/v1/sleeps/${sleepId}`)
  }

  static findManyByActivityId(
    activityId: string,
    queryOptions?: ApiHelper.QueryOptions<Sleep>,
  ): Promise<Sleep[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/activitys/activity/${activityId}/sleeps${buildOptions}`,
    )
  }

  static createOneByActivityId(
    activityId: string,
    values: Partial<Sleep>,
  ): Promise<Sleep> {
    return HttpService.api.post(
      `/v1/activitys/activity/${activityId}/sleeps`,
      values,
    )
  }
}
