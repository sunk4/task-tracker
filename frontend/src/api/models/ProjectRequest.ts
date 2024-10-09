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
 * @interface ProjectRequest
 */
export interface ProjectRequest {
    /**
     * 
     * @type {string}
     * @memberof ProjectRequest
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectRequest
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof ProjectRequest
     */
    startDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ProjectRequest
     */
    endDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof ProjectRequest
     */
    projectCover?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ProjectRequest
     */
    isOpen?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ProjectRequest
     */
    ownerId: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProjectRequest
     */
    userProjectIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProjectRequest
     */
    taskIds?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProjectRequest
     */
    participantIds?: Array<string>;
}

/**
 * Check if a given object implements the ProjectRequest interface.
 */
export function instanceOfProjectRequest(value: object): value is ProjectRequest {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('ownerId' in value) || value['ownerId'] === undefined) return false;
    return true;
}

export function ProjectRequestFromJSON(json: any): ProjectRequest {
    return ProjectRequestFromJSONTyped(json, false);
}

export function ProjectRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'name': json['name'],
        'description': json['description'],
        'startDate': json['startDate'] == null ? undefined : (new Date(json['startDate'])),
        'endDate': json['endDate'] == null ? undefined : (new Date(json['endDate'])),
        'projectCover': json['projectCover'] == null ? undefined : json['projectCover'],
        'isOpen': json['isOpen'] == null ? undefined : json['isOpen'],
        'ownerId': json['ownerId'],
        'userProjectIds': json['userProjectIds'] == null ? undefined : json['userProjectIds'],
        'taskIds': json['taskIds'] == null ? undefined : json['taskIds'],
        'participantIds': json['participantIds'] == null ? undefined : json['participantIds'],
    };
}

export function ProjectRequestToJSON(value?: ProjectRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'name': value['name'],
        'description': value['description'],
        'startDate': value['startDate'] == null ? undefined : ((value['startDate']).toISOString()),
        'endDate': value['endDate'] == null ? undefined : ((value['endDate']).toISOString()),
        'projectCover': value['projectCover'],
        'isOpen': value['isOpen'],
        'ownerId': value['ownerId'],
        'userProjectIds': value['userProjectIds'],
        'taskIds': value['taskIds'],
        'participantIds': value['participantIds'],
    };
}

