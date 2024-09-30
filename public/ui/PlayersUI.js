import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { World } from "../classes/World.js";
import { shared_styles } from './ui-common.js';

export class PlayersUI extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this.world = new World();

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        // TODO: sort players
        const players = Object.values(this.world.players);

        players.sort((a, b) => {
            return b.population - a.population;
        });
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div style="height: 40%; margin-top: 60px;">
                <h3>Players</h3>
                <div class="container" style="padding: 10px; height: 100%;">
                    ${players.map(player => html`
                        <div><span style="color: ${player.color};">${player.username}</span>: ${Math.round(player.resources.pop)} pop</div>
                    `)}
                </div>
            </div>
        `;
    }
}
