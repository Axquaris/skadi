import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { ResourceVec } from "../classes/ResourceVec.js";
import { resourceTypes } from '../classes/ResourceVec.js';
import { shared_styles, capitalizeFirstLetter, addSign } from './ui-common.js';

// Define a new custom HTML element called "building-slot"
export class HeaderUI extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._currentResources = new ResourceVec();
        this._maxResources = new ResourceVec();
        this._dResources = new ResourceVec();

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        var c = this._currentResources.roundToInt();
        var m = this._maxResources;
        var d = this._dResources;

        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="resources">
                ${Object.keys(resourceTypes).map((resource) => html`
                    <div id="${resource}-ui" class="resource">
                        ${capitalizeFirstLetter(resource)}:
                        <span style="text-align: right; ">${addSign(d[resource].toFixed(2))}</span>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" aria-valuenow="${c[resource]}" aria-valuemin="0" aria-valuemax="${m[resource]}" style="width: ${c[resource] / m[resource] * 100}%; background-color: ${resourceTypes[resource]};">${c[resource]} / ${m[resource] / 1000}k</div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }


    updateVariables(player) {
        this._currentResources = player.resources.clone();
        this._maxResources = player.maxResources.clone();
        this._dResources = player.dResources.clone();
        this.requestUpdate();
    }
}
