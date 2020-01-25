export * from './aPIRootApi';
import { APIRootApi } from './aPIRootApi';
export * from './analysesApi';
import { AnalysesApi } from './analysesApi';
export * from './codeReviewsApi';
import { CodeReviewsApi } from './codeReviewsApi';
export * from './operationsApi';
import { OperationsApi } from './operationsApi';
export * from './projectsApi';
import { ProjectsApi } from './projectsApi';
export * from './queryJobsApi';
import { QueryJobsApi } from './queryJobsApi';
export * from './snapshotsApi';
import { SnapshotsApi } from './snapshotsApi';
export * from './systemApi';
import { SystemApi } from './systemApi';
import * as fs from 'fs';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.ClientResponse, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;

export const APIS = [APIRootApi, AnalysesApi, CodeReviewsApi, OperationsApi, ProjectsApi, QueryJobsApi, SnapshotsApi, SystemApi];
