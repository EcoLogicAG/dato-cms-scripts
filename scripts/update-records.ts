import {SiteClient} from 'datocms-client';
import {DatoCmsService} from "../services/dato-cms-service";
import {ExampleRecord} from "../models/example-record.interface";
import {StatsService} from "../services/stats-service";
import {Bar, Presets} from 'cli-progress';

const client = new SiteClient('<API_KEY>');
const service = new DatoCmsService(client);
const statsService = new StatsService();
const exampleRecordTypeId = '<RECORD_TYPE_ID>';

async function updateBoolean(exampleRecords: ExampleRecord[]) {
    return new Promise((resolve, reject) => {

        const bar = new Bar({stopOnComplete: true}, Presets.shades_classic);
        bar.start(exampleRecords.length, 0);

        let i = 0;

        const intervalId = setInterval(async () => {
            if (i >= (exampleRecords.length - 1)) {
                clearInterval(intervalId);
                resolve();
            }
            const exampleRecord = exampleRecords[i];

            let needsUpdate = false;

            if (!exampleRecord.searchable) {
                exampleRecord.searchable = true;
                needsUpdate = true;
            }
            if (needsUpdate) {
                statsService.addUpdated(`ExampleRecord: ${exampleRecord.title}`);
                await service.updateItem(exampleRecord.id, exampleRecord);
                if (exampleRecord['meta']['status'] === 'published') {
                    // publish changes again if the record was publihsed before
                    await service.publishItem<ExampleRecord>(exampleRecord.id);
                }
            } else {
                statsService.addNothingToDo(`ExampleRecord: ${exampleRecord.title}`);
            }

            i++;
            bar.update(i);
        }, 1500);
    });
}

async function process() {
    let records = await service.loadItemsForType<ExampleRecord>(exampleRecordTypeId);

    updateBoolean(records).then(() => {
        statsService.printStats();
    });
}

process();