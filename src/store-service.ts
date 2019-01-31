import { Store } from 'redux';

export class StoreService<T={}> {

    static storeService: StoreService;

    constructor(public store: Store<T>) {

    }
}

export const initializeStoreService = <T={}>(store: Store<T>) => {
    StoreService.storeService = new StoreService<T>(store);
}