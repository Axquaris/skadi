import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { World } from "../classes/World.js";
import { shared_styles } from './ui-common.js';

export class WorldUI extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this.world = new World();

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        return html`
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <div style="height: 30%;">
            <h3>World</h3>
            <div class="container" style="padding: 10px; height: 100%;">
                Day ${this.world.day} Week ${this.world.week} 
            </div>
        </div>
        `;
    }
}
