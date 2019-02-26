import {DatoCmsMetaData} from "./dato-cms-meta-data";

export interface ExampleRecord {
    id: string;
    meta: DatoCmsMetaData;
    title: string;
    searchable: boolean;
}