import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

const client = generateClient<Schema>();

export type IModels = keyof typeof client.models;

const getClient = (type: IModels): any => {
  return client.models[type] as any;
};

const handleErrors = (errors: any, type: IModels, action: string) => {
  if (errors && errors.length) {
    console.error(`Error ${action} ${String(type)}:`, errors);
    throw new Error(errors.map((e: any) => e.message).join('\n'));
  }
};

export const apiSyncService = {
  async getAll(type: IModels, limit?: number, filter?: any): Promise<any> {
    try {
      const params: Record<string, any> = {};
      if (limit) params.limit = limit;
      if (filter) params.filter = filter;

      const { data, errors } = await getClient(type).list({
        ...params,
        authMode: 'apiKey',
      });

      handleErrors(errors, type, 'fetching list');
      return data;
    } catch (error) {
      console.error(`[apiSyncService] Unhandled exception in list(${String(type)}):`, error);
      throw error;
    }
  },

  async getById(type: IModels, id: string): Promise<any> {
    try {
      const { data, errors } = await getClient(type).get(
        { id },
        { authMode: 'apiKey' }
      );

      handleErrors(errors, type, 'fetching by ID');
      return data;
    } catch (error) {
      console.error(`[apiSyncService] Unhandled exception in getById(${String(type)}):`, error);
      throw error;
    }
  },

  async create(type: IModels, body: any): Promise<any> {
    try {
      const { data, errors } = await getClient(type).create(body);
      handleErrors(errors, type, 'creating');
      return data;
    } catch (error) {
      console.error(`[apiSyncService] Unhandled exception in create(${String(type)}):`, error);
      throw error;
    }
  },

  async update(type: IModels, id: string, info: any): Promise<any> {
    try {
      const { data, errors } = await getClient(type).update({ id, ...info });
      handleErrors(errors, type, 'updating');
      return data;
    } catch (error) {
      console.error(`[apiSyncService] Unhandled exception in update(${String(type)}):`, error);
      throw error;
    }
  },

  async delete(type: IModels, id: string): Promise<any> {
    try {
      const { data, errors } = await getClient(type).delete({ id });
      handleErrors(errors, type, 'deleting');
      return data;
    } catch (error) {
      console.error(`[apiSyncService] Unhandled exception in delete(${String(type)}):`, error);
      throw error;
    }
  },

  async query(type: IModels, query: string, variables: any): Promise<any> {
    try {
      const result = await getClient(type)[query](variables, {
        authMode: 'apiKey',
      });
      return result;
    } catch (error) {
      console.error(`Error executing query ${query} on ${String(type)}:`, error);
      throw error;
    }
  },
};