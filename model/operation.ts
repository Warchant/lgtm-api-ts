/**
 * LGTM API specification
 * The REST API for LGTM provides data so that you can customize how you integrate LGTM analysis into your workflow. It includes the following resources:   * `/` ([API root](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-API-root))&mdash;get version information or download the specification in OpenAPI format.   * `/projects` ([Projects](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Projects))&mdash;list projects, get a summary of the current status for a project, or add new projects.   * `/analyses` ([Analyses](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Analyses))&mdash;get a summary of results, download all the alerts, or trigger analysis for a specific commit.   * `/codereviews` ([Code reviews](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Code-reviews))&mdash;trigger code review for a patch, and view the results.   * `/operations` ([Operations](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Operations))&mdash;get information about long-running tasks, for example, analyses or code reviews that you\'ve requested.   * `/snapshots` ([Snapshots](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Snapshots))&mdash;download and upload databases representing a snapshot of a codebase.   * `/queryjobs` ([Query jobs](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-Query-jobs))&mdash;submit queries to evaluate against existing projects, and download their results.   * `/system` ([System](https://lgtm.com/help/lgtm/api/api-v1#LGTM-API-specification-System))&mdash;get information on the health or usage of the system.  For an overview and getting started topics, see [API for LGTM](https://lgtm.com/help/lgtm/api/api-for-lgtm). 
 *
 * The version of the OpenAPI document: v1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Analysis } from './analysis';
import { CodeReview } from './codeReview';
import { Queryjob } from './queryjob';
import { UploadSession } from './uploadSession';

export class Operation {
    /**
    * The identifier for the operation.
    */
    'id'?: number;
    'uploads'?: { [key: string]: UploadSession; };
    /**
    * Status of the operation.
    */
    'status'?: Operation.StatusEnum;
    'taskType': Operation.TaskTypeEnum;
    'taskResult'?: Analysis | CodeReview | Queryjob;
    /**
    * The URL for the result of the task. For some operations, included only on completion.
    */
    'taskResultUrl'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "uploads",
            "baseName": "uploads",
            "type": "{ [key: string]: UploadSession; }"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "Operation.StatusEnum"
        },
        {
            "name": "taskType",
            "baseName": "task-type",
            "type": "Operation.TaskTypeEnum"
        },
        {
            "name": "taskResult",
            "baseName": "task-result",
            "type": "Analysis | CodeReview | Queryjob"
        },
        {
            "name": "taskResultUrl",
            "baseName": "task-result-url",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Operation.attributeTypeMap;
    }
}

export namespace Operation {
    export enum StatusEnum {
        Pending = <any> 'pending',
        Done = <any> 'done'
    }
    export enum TaskTypeEnum {
        Analysis = <any> 'analysis',
        Codereview = <any> 'codereview',
        Queryjob = <any> 'queryjob'
    }
}
