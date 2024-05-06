import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Picture } from './picture.model'

export class PictureApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Picture>,
  ): Promise<Picture[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/pictures${buildOptions}`)
  }

  static findOne(
    pictureId: string,
    queryOptions?: ApiHelper.QueryOptions<Picture>,
  ): Promise<Picture> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/pictures/${pictureId}${buildOptions}`)
  }

  static createOne(values: Partial<Picture>): Promise<Picture> {
    return HttpService.api.post(`/v1/pictures`, values)
  }

  static updateOne(
    pictureId: string,
    values: Partial<Picture>,
  ): Promise<Picture> {
    return HttpService.api.patch(`/v1/pictures/${pictureId}`, values)
  }

  static deleteOne(pictureId: string): Promise<void> {
    return HttpService.api.delete(`/v1/pictures/${pictureId}`)
  }

  static findManyByActivityId(
    activityId: string,
    queryOptions?: ApiHelper.QueryOptions<Picture>,
  ): Promise<Picture[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/activitys/activity/${activityId}/pictures${buildOptions}`,
    )
  }

  static createOneByActivityId(
    activityId: string,
    values: Partial<Picture>,
  ): Promise<Picture> {
    return HttpService.api.post(
      `/v1/activitys/activity/${activityId}/pictures`,
      values,
    )
  }
}
