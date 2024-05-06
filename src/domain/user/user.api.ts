import axiosInstance from '@web/libraries/axios/axios'
import { ApiHelper } from '../helpers/api.helper';
import { User } from './user.model';

export class UserApi {
  static async findMany(queryOptions?: ApiHelper.QueryOptions<User>): Promise<User[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/users${buildOptions}`);
    return response.data;
  }

  static async findOne(userId: string, queryOptions?: ApiHelper.QueryOptions<User>): Promise<User> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/users/${userId}${buildOptions}`);
    return response.data;
  }

  static async findMe(queryOptions?: ApiHelper.QueryOptions<User>): Promise<any> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/user/profile`);
    return response.data;
  }
  
  static async userAnalysis(queryOptions?: ApiHelper.QueryOptions<User>): Promise<any> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions);
    const response = await axiosInstance.get(`/v1/user/analysis`);
    return response.data;
  }

  static async createOne(user: Partial<User>): Promise<User> {
    const response = await axiosInstance.post('/v1/users', user);
    return response.data;
  }

  static async updateOne(userId: string, values: Partial<User>): Promise<User> {
    const response = await axiosInstance.patch(`/v1/users/${userId}`, values);
    return response.data;
  }

  static async deleteOne(userId: string): Promise<void> {
    await axiosInstance.delete(`/v1/users/${userId}`);
  }
}