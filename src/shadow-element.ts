import { TemplateResult, render } from "lit-html";

export abstract class ShadowElement extends HTMLElement {
    state: Object = {};
    constructor() {
        super();
        if(this.render) {
            this.attachShadow({ mode: 'open' });
            this._renderElm();
        }
    }

    protected setState(fn: Function) {
    }

    private _renderElm() {
        render(this.render(this.state), this.shadowRoot!);
    }

    protected abstract render(state: Object): TemplateResult;
}