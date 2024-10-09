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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthenticationResponse
 */
export interface AuthenticationResponse {
    /**
     * 
     * @type {string}
     * @memberof AuthenticationResponse
     */
    token?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof AuthenticationResponse
     */
    roles?: Array<string>;
}

/**
 * Check if a given object implements the AuthenticationResponse interface.
 */
export function instanceOfAuthenticationResponse(value: object): value is AuthenticationResponse {
    return true;
}

export function AuthenticationResponseFromJSON(json: any): AuthenticationResponse {
    return AuthenticationResponseFromJSONTyped(json, false);
}

export function AuthenticationResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthenticationResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'] == null ? undefined : json['token'],
        'roles': json['roles'] == null ? undefined : json['roles'],
    };
}

export function AuthenticationResponseToJSON(value?: AuthenticationResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'token': value['token'],
        'roles': value['roles'],
    };
}

