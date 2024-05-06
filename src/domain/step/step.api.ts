import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Step } from './step.model'

export class StepApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Step>,
  ): Promise<Step[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/steps${buildOptions}`)
  }

  static findOne(
    stepId: string,
    queryOptions?: ApiHelper.QueryOptions<Step>,
  ): Promise<Step> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/steps/${stepId}${buildOptions}`)
  }

  static createOne(values: Partial<Step>): Promise<Step> {
    return HttpService.api.post(`/v1/steps`, values)
  }

  static updateOne(stepId: string, values: Partial<Step>): Promise<Step> {
    return HttpService.api.patch(`/v1/steps/${stepId}`, values)
  }

  static deleteOne(stepId: string): Promise<void> {
    return HttpService.api.delete(`/v1/steps/${stepId}`)
  }

  static findManyByActivityId(
    activityId: string,
    queryOptions?: ApiHelper.QueryOptions<Step>,
  ): Promise<Step[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/activitys/activity/${activityId}/steps${buildOptions}`,
    )
  }

  static createOneByActivityId(
    activityId: string,
    values: Partial<Step>,
  ): Promise<Step> {
    return HttpService.api.post(
      `/v1/activitys/activity/${activityId}/steps`,
      values,
    )
  }
}
