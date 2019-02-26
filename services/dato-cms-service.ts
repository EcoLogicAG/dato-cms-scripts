import {SiteClient} from 'datocms-client';
import {DatoCmsItemType} from "../models/dato-cms-item-type";
import {DatoCmsUploadItem} from "../models/dato-cms-upload-item";

export class DatoCmsService {

    constructor(private client: SiteClient) {
    }

    loadItemTypes(): Promise<DatoCmsItemType[]> {
        return this.client.itemTypes.all();
    }

    createItem<T>(body: {}): Promise<T> {
        return this.client.items.create(body);
    }

    updateItem<T>(itemId: string, body: {}): Promise<T> {
        return this.client.items.update(itemId, body);
    }

    publishItem<T>(itemId: string): Promise<T> {
        return this.client.items.publish(itemId);
    }

    loadItemsForType<T>(typeString: string, numberOfItems: number = 5000): Promise<T[]> {
        return this.client.items.all({
            'filter[type]': typeString,
            'page[offset]': 0,
            'page[limit]': numberOfItems
        });
    }

    loadItemForId<T>(id: string): Promise<T> {
        return this.client.items.find(id);
    }


    updateUpload(uploadId: string, body: {}): Promise<DatoCmsUploadItem> {
        return this.client.uploads.update(uploadId, body);
    }

    uploadImage(imagePath: string): Promise<string> {
        return this.client.uploadImage(imagePath);
    }

    loadUploadItemForId(id: string): Promise<DatoCmsUploadItem> {
        return this.client.uploads.find(id);
    }

}
