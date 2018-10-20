import {Kinesis} from 'aws-sdk';

declare module 'aws-kinesis-agg-fix' {
    export interface UserRecord {
        partitionKey: String;
        explicitPartitionKey: String;
        sequenceNumber: String;
        subSequenceNumber: Number;
        data: Buffer;
    }

    export interface EncodedRecord {
        partitionKey: String,
        data: Buffer;
    }

    export function deaggregate(kinesisRecord: Kinesis.Types.Record, 
        computeChecksums: boolean,
        perRecordCallback: (err: Error, userRecords?: UserRecord) => void,
        afterRecordCallback: (err?: Error, errorUserRecord?: UserRecord) => void
    ): void;

    export function deaggregateSync(kinesisRecord: Kinesis.Types.Record, 
        computeChecksums: boolean,
        afterRecordCallback: (err: Error, userRecords?: UserRecord[]) => void
    ): void;

    export function aggregate(records: any[], 
        encodedRecordHandler: (encodedRecord: EncodedRecord, callback: (err?: Error, data?: Kinesis.Types.PutRecordOutput) => void) => void,
        afterPutAggregatedRecords: () => void, 
        errorCallback: (error: Error, data?: EncodedRecord) => void,
        queueSize: Number = 1
    ): void;
}