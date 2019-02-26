import {SiteClient} from 'datocms-client';
import {Bar, Presets} from 'cli-progress';
import {DatoCmsService} from "../services/dato-cms-service";
import {StatsService} from "../services/stats-service";
import * as fs from 'fs';
import moment = require("moment");

const client = new SiteClient('<API_KEY>');
const service = new DatoCmsService(client);
const statsService = new StatsService();


async function backupItems(basePath: string, type: any) {
    const items = await service.loadItemsForType(type.id);
    fs.writeFileSync(`${basePath}/${type.name}.json`, JSON.stringify(items));
}

async function backupAll(types: { name, id }[]) {

    const bar = new Bar({stopOnComplete: true}, Presets.shades_classic);
    bar.start(types.length, 0);

    const basePath = `backup/${moment().format('YYYYMMDD')}`;
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
    }

    let index = 0;
    for (let type of types) {
        await backupItems(basePath, type);
        index++;
        bar.update(index);
    }
}

async function loadItemTypes() {
    const types = (await service.loadItemTypes()).map(type => {
        return {name: type.apiKey, id: type.id}
    });
    backupAll(types);
}

loadItemTypes();
