import { html } from 'lit-html';
import { ShadowElement } from './shadow-element';
interface AppState {
    name: string;
    counter: number;
}
class MyApp extends ShadowElement<AppState> {
    state = {
        name: "Christos",
        counter: 0,
    };
    
    increment = () => {
        this.setState(prev => ({
            counter:prev.counter + 1,
        }));
    }

    render(state: AppState) {
        return html`
            <p>${state.counter}</p>
            <button @click="${this.increment}">Increment</button>
            <h1>Hello ${state.name}</h1>
        `;
    }
}

customElements.define('my-app', MyApp);

