/* tslint:disable */
/* eslint-disable */
/**
 * Task Tracker API
 * Task Tracker API
 *
 * The version of the OpenAPI document: 1.0
 * Contact: trnka.roman13@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PageResponseProjectResponse,
  ParticipantIdsRequest,
  ProjectRequest,
  ProjectResponse,
} from '../models/index';
import {
    PageResponseProjectResponseFromJSON,
    PageResponseProjectResponseToJSON,
    ParticipantIdsRequestFromJSON,
    ParticipantIdsRequestToJSON,
    ProjectRequestFromJSON,
    ProjectRequestToJSON,
    ProjectResponseFromJSON,
    ProjectResponseToJSON,
} from '../models/index';

export interface AddParticipantsRequest {
    id: string;
    participantIdsRequest: ParticipantIdsRequest;
}

export interface AddProjectRequest {
    projectRequest: ProjectRequest;
}

export interface FindAllProjectsRequest {
    pageNum?: number;
    pageSize?: number;
    isOpen?: boolean;
}

export interface FindProjectsByOwnerRequest {
    pageNum?: number;
    pageSize?: number;
}

export interface GetProjectRequest {
    id: string;
}

export interface RemoveParticipantRequest {
    id: string;
    participantId: string;
}

export interface UpdateProjectRequest {
    id: string;
    projectRequest: ProjectRequest;
}

/**
 * 
 */
export class ProjectApi extends runtime.BaseAPI {

    /**
     */
    async addParticipantsRaw(requestParameters: AddParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling addParticipants().'
            );
        }

        if (requestParameters['participantIdsRequest'] == null) {
            throw new runtime.RequiredError(
                'participantIdsRequest',
                'Required parameter "participantIdsRequest" was null or undefined when calling addParticipants().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project/{id}/participants`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ParticipantIdsRequestToJSON(requestParameters['participantIdsRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async addParticipants(requestParameters: AddParticipantsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.addParticipantsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async addProjectRaw(requestParameters: AddProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['projectRequest'] == null) {
            throw new runtime.RequiredError(
                'projectRequest',
                'Required parameter "projectRequest" was null or undefined when calling addProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectRequestToJSON(requestParameters['projectRequest']),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async addProject(requestParameters: AddProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.addProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async findAllProjectsRaw(requestParameters: FindAllProjectsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageResponseProjectResponse>> {
        const queryParameters: any = {};

        if (requestParameters['pageNum'] != null) {
            queryParameters['pageNum'] = requestParameters['pageNum'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        if (requestParameters['isOpen'] != null) {
            queryParameters['isOpen'] = requestParameters['isOpen'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageResponseProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async findAllProjects(requestParameters: FindAllProjectsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageResponseProjectResponse> {
        const response = await this.findAllProjectsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async findProjectsByOwnerRaw(requestParameters: FindProjectsByOwnerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageResponseProjectResponse>> {
        const queryParameters: any = {};

        if (requestParameters['pageNum'] != null) {
            queryParameters['pageNum'] = requestParameters['pageNum'];
        }

        if (requestParameters['pageSize'] != null) {
            queryParameters['pageSize'] = requestParameters['pageSize'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project/owner`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageResponseProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async findProjectsByOwner(requestParameters: FindProjectsByOwnerRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageResponseProjectResponse> {
        const response = await this.findProjectsByOwnerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getProjectRaw(requestParameters: GetProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async getProject(requestParameters: GetProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.getProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async removeParticipantRaw(requestParameters: RemoveParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling removeParticipant().'
            );
        }

        if (requestParameters['participantId'] == null) {
            throw new runtime.RequiredError(
                'participantId',
                'Required parameter "participantId" was null or undefined when calling removeParticipant().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project/{id}/participants/{participantId}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))).replace(`{${"participantId"}}`, encodeURIComponent(String(requestParameters['participantId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async removeParticipant(requestParameters: RemoveParticipantRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.removeParticipantRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateProjectRaw(requestParameters: UpdateProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ProjectResponse>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateProject().'
            );
        }

        if (requestParameters['projectRequest'] == null) {
            throw new runtime.RequiredError(
                'projectRequest',
                'Required parameter "projectRequest" was null or undefined when calling updateProject().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer-key", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/project/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ProjectRequestToJSON(requestParameters['projectRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProjectResponseFromJSON(jsonValue));
    }

    /**
     */
    async updateProject(requestParameters: UpdateProjectRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ProjectResponse> {
        const response = await this.updateProjectRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
