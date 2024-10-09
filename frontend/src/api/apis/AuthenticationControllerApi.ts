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
  AuthenticationResponse,
  LoginRequest,
  RegistrationRequest,
} from '../models/index';
import {
    AuthenticationResponseFromJSON,
    AuthenticationResponseToJSON,
    LoginRequestFromJSON,
    LoginRequestToJSON,
    RegistrationRequestFromJSON,
    RegistrationRequestToJSON,
} from '../models/index';

export interface ConfirmAccountRequest {
    token: string;
}

export interface IsTokenValidRequest {
    token: string;
}

export interface LoginOperationRequest {
    loginRequest: LoginRequest;
}

export interface RegisterRequest {
    registrationRequest: RegistrationRequest;
}

/**
 * 
 */
export class AuthenticationControllerApi extends runtime.BaseAPI {

    /**
     */
    async confirmAccountRaw(requestParameters: ConfirmAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['token'] == null) {
            throw new runtime.RequiredError(
                'token',
                'Required parameter "token" was null or undefined when calling confirmAccount().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['token'] != null) {
            queryParameters['token'] = requestParameters['token'];
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
            path: `/auth/activate-account`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async confirmAccount(requestParameters: ConfirmAccountRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.confirmAccountRaw(requestParameters, initOverrides);
    }

    /**
     */
    async isTokenValidRaw(requestParameters: IsTokenValidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters['token'] == null) {
            throw new runtime.RequiredError(
                'token',
                'Required parameter "token" was null or undefined when calling isTokenValid().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['token'] != null) {
            queryParameters['token'] = requestParameters['token'];
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
            path: `/auth/is-token-exparied`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<boolean>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async isTokenValid(requestParameters: IsTokenValidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<boolean> {
        const response = await this.isTokenValidRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async loginRaw(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AuthenticationResponse>> {
        if (requestParameters['loginRequest'] == null) {
            throw new runtime.RequiredError(
                'loginRequest',
                'Required parameter "loginRequest" was null or undefined when calling login().'
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
            path: `/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginRequestToJSON(requestParameters['loginRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AuthenticationResponseFromJSON(jsonValue));
    }

    /**
     */
    async login(requestParameters: LoginOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AuthenticationResponse> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async registerRaw(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        if (requestParameters['registrationRequest'] == null) {
            throw new runtime.RequiredError(
                'registrationRequest',
                'Required parameter "registrationRequest" was null or undefined when calling register().'
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
            path: `/auth/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RegistrationRequestToJSON(requestParameters['registrationRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async register(requestParameters: RegisterRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.registerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
