import axiosInstance from '@web/libraries/axios/axios';
import { ApiHelper } from '../helpers/api.helper';
import { Activity } from './activity.model';

export class ActivityApi {
  static async findMany(queryOptions?: ApiHelper.QueryOptions<Activity>): Promise<Activity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/activitys${buildOptions}`);
    return response.data;
  }

  static async findOne(activityId: string, queryOptions?: ApiHelper.QueryOptions<Activity>): Promise<Activity> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/activitys/${activityId}${buildOptions}`);
    return response.data;
  }

  static async createOne(values: Partial<Activity>): Promise<Activity> {
    const response = await axiosInstance.post(`/v1/activities/add`, values);
    return response.data;
  }

  static async updateOne(activityId: string, values: Partial<Activity>): Promise<Activity> {
    const response = await axiosInstance.patch(`/v1/activitys/${activityId}`, values);
    return response.data;
  }

  static async deleteOne(activityId: string): Promise<void> {
    await axiosInstance.delete(`/v1/activitys/${activityId}`);
  }

  static async findManyByUserId(userId: string, queryOptions?: ApiHelper.QueryOptions<Activity>): Promise<Activity[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/users/user/${userId}/activitys${buildOptions}`);
    return response.data;
  }

  static async createOneByUserId(userId: string, values: Partial<Activity>): Promise<Activity> {
    const response = await axiosInstance.post(`/v1/users/user/${userId}/activitys`, values);
    return response.data;
  }
}
