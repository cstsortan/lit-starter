import { TemplateResult, render } from "lit-html";
import { StoreService } from "./store-service";
import { Unsubscribe } from "redux";
import { Observable } from 'rxjs';

export abstract class ShadowElement<T={}> extends HTMLElement {
    protected state: T = {} as T;

    private _unsub: Unsubscribe|null = null;

    connectedCallback() {
        this.componentWillMount();
        if(this.render) {
            this.attachShadow({ mode: 'open' });
        }
        this._renderElm();

        // Subscribe to the store, if there is one, or if the component cares about it
        let store = StoreService.storeService.store;
        if(store) this._unsub = store.subscribe(() => {
            const storeMapper = this.mapStore();
            if('length' in storeMapper) {
                // User provided array
                let mappedState = {};
                const storeState = store.getState() as any;
                [...(storeMapper) as string[]].forEach(prop => mappedState = {
                    ...mappedState,
                    [prop]: storeState[prop],
                });

                this.setState(mappedState);
            }
        });



        this.componentDidMount();
    }

    disconnectedCallback() {
        this.componentWillUnmount();

        if(this._unsub) {
            this._unsub();
        }

        this.componentDidUnmount();
    }

    protected mapStore() {
        return [];
    }

    // protected get subscriptions(): { [key: string]: Observable<any> } {
    //     return {};
    // }

    protected componentWillMount(): void {}

    protected componentDidMount(): void {}

    protected componentWillUnmount(): void {}

    protected componentDidUnmount(): void {}

    protected setState(patch: Object|((s: T) => T)) {
        if('call' in patch) {
            this.state = {
                ...this.state,
                ...patch(this.state)
            }
        } else {
            this.state = {
                ...this.state,
                ...patch,
            } as T;
        }
        this._renderElm();
    }

    private _renderElm() {
        render(this.render(this.state, StoreService.storeService.store.getState()), this.shadowRoot!);
    }

    protected abstract render(state: T, storeState: any): TemplateResult;
}