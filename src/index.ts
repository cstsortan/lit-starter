import { html, render } from 'lit-html';
import { ShadowElement } from './shadow-element';
class MyApp extends ShadowElement {
    render() {
        return html`
            <h1>Hello ${name}</h1>
        `;
    }
}

customElements.define('my-app', MyApp);

