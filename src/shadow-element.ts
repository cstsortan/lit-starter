import { TemplateResult, render } from "lit-html";

export abstract class ShadowElement<T> extends HTMLElement {
    protected state: T = {} as T;
    constructor() {
        super();
        if(this.render) {
            this.attachShadow({ mode: 'open' });
        }
    }

    connectedCallback() {
        this._renderElm();
    }

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
        render(this.render(this.state), this.shadowRoot!);
    }

    protected abstract render(state: T): TemplateResult;
}