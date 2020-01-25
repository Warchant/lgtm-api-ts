export * from './analysis';
export * from './codeReview';
export * from './codereviewAlerts';
export * from './codereviewLanguages';
export * from './health';
export * from './languageStats';
export * from './measurement';
export * from './metric';
export * from './metricName';
export * from './metricsList';
export * from './operation';
export * from './project';
export * from './projectDetails';
export * from './projectDetailsAllOf';
export * from './projectLanguageStats';
export * from './projectLanguageStatsAllOf';
export * from './projectList';
export * from './query';
export * from './queryProperties';
export * from './queryResultEntry';
export * from './queryjob';
export * from './queryjobProjectResults';
export * from './queryjobResultsOverview';
export * from './queryjobResultsOverviewEntry';
export * from './queryjobStats';
export * from './uploadSession';
export * from './version';

import localVarRequest = require('request');

import { Analysis } from './analysis';
import { CodeReview } from './codeReview';
import { CodereviewAlerts } from './codereviewAlerts';
import { CodereviewLanguages } from './codereviewLanguages';
import { Health } from './health';
import { LanguageStats } from './languageStats';
import { Measurement } from './measurement';
import { Metric } from './metric';
import { MetricName } from './metricName';
import { MetricsList } from './metricsList';
import { Operation } from './operation';
import { Project } from './project';
import { ProjectDetails } from './projectDetails';
import { ProjectDetailsAllOf } from './projectDetailsAllOf';
import { ProjectLanguageStats } from './projectLanguageStats';
import { ProjectLanguageStatsAllOf } from './projectLanguageStatsAllOf';
import { ProjectList } from './projectList';
import { Query } from './query';
import { QueryProperties } from './queryProperties';
import { QueryResultEntry } from './queryResultEntry';
import { Queryjob } from './queryjob';
import { QueryjobProjectResults } from './queryjobProjectResults';
import { QueryjobResultsOverview } from './queryjobResultsOverview';
import { QueryjobResultsOverviewEntry } from './queryjobResultsOverviewEntry';
import { QueryjobStats } from './queryjobStats';
import { UploadSession } from './uploadSession';
import { Version } from './version';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
        "CodeReview.StatusEnum": CodeReview.StatusEnum,
        "CodereviewLanguages.StatusEnum": CodereviewLanguages.StatusEnum,
        "Health.StatusEnum": Health.StatusEnum,
        "LanguageStats.StatusEnum": LanguageStats.StatusEnum,
        "Operation.StatusEnum": Operation.StatusEnum,
        "Operation.TaskTypeEnum": Operation.TaskTypeEnum,
        "ProjectLanguageStats.StatusEnum": ProjectLanguageStats.StatusEnum,
        "ProjectLanguageStats.GradeEnum": ProjectLanguageStats.GradeEnum,
        "ProjectLanguageStatsAllOf.GradeEnum": ProjectLanguageStatsAllOf.GradeEnum,
        "QueryjobResultsOverviewEntry.StatusEnum": QueryjobResultsOverviewEntry.StatusEnum,
}

let typeMap: {[index: string]: any} = {
    "Analysis": Analysis,
    "CodeReview": CodeReview,
    "CodereviewAlerts": CodereviewAlerts,
    "CodereviewLanguages": CodereviewLanguages,
    "Health": Health,
    "LanguageStats": LanguageStats,
    "Measurement": Measurement,
    "Metric": Metric,
    "MetricName": MetricName,
    "MetricsList": MetricsList,
    "Operation": Operation,
    "Project": Project,
    "ProjectDetails": ProjectDetails,
    "ProjectDetailsAllOf": ProjectDetailsAllOf,
    "ProjectLanguageStats": ProjectLanguageStats,
    "ProjectLanguageStatsAllOf": ProjectLanguageStatsAllOf,
    "ProjectList": ProjectList,
    "Query": Query,
    "QueryProperties": QueryProperties,
    "QueryResultEntry": QueryResultEntry,
    "Queryjob": Queryjob,
    "QueryjobProjectResults": QueryjobProjectResults,
    "QueryjobResultsOverview": QueryjobResultsOverview,
    "QueryjobResultsOverviewEntry": QueryjobResultsOverviewEntry,
    "QueryjobStats": QueryjobStats,
    "UploadSession": UploadSession,
    "Version": Version,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
