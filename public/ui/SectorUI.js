import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { World } from "../classes/World.js";
import { buildingOptions, sectorTypes } from "../classes/Sectors.js";
import { ClientActions } from '../client-actions.js';
import { shared_styles } from './ui-common.js';

export class SectorUI extends LitElement {
    static styles = shared_styles;
    static currentIdx = 0;

    constructor() {
        super();
        this.world = new World();

        this._state = "empty";
        this._idx = SectorUI.currentIdx;
        SectorUI.currentIdx++;

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get properties() {
        return {
            world: { type: World },
            _state: { type: String },
            _idx: { type: Number },
        };
    }

    render() {
        if (this._state == "empty") {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="dashed-container text-center">
                    <button type="button" class="btn btn-primary" @click=${this.handleBuild}>Build</button>
                </div>
            `;
        }
        else if (this._state == "building") {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="row">
                    <div class="col-6" style="padding-right: 3px;">
                        <div class="build-building">
                            ${sectorTypes[buildingOptions[0]].resourceChange.toConvString()}
                            <button type="button" class="btn btn-primary" @click=${() => this.handleBuildX(0)}>
                                ${sectorTypes[buildingOptions[0]].displayName}
                            </button>
                        </div>
                        <div class="build-building">
                            ${sectorTypes[buildingOptions[1]].resourceChange.toConvString()}
                            <button type="button" class="btn btn-primary" @click=${() => this.handleBuildX(1)}>
                                ${sectorTypes[buildingOptions[1]].displayName}
                            </button>
                        </div>
                    </div>
                    <div class="col-6" style="padding-left: 3px;">
                        <div class="build-building">
                            ${sectorTypes[buildingOptions[2]].resourceChange.toConvString()}
                            <button type="button" class="btn btn-primary" @click=${() => this.handleBuildX(2)}>
                                ${sectorTypes[buildingOptions[2]].displayName}
                            </button>
                        </div>
                        <div class="build-building">
                            ${sectorTypes[buildingOptions[3]].resourceChange.toConvString()}
                            <button type="button" class="btn btn-primary" @click=${() => this.handleBuildX(3)}>
                                ${sectorTypes[buildingOptions[3]].displayName}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        else if (this._state == "built") {
            var sector = this.world.players[this.world.clientId].sectors[this._idx];
            var uhtml = html``;
            if (sector.upgradeOptions.length > 0) {
                uhtml = html`<div class="d-flex align-items-end justify-content-end">
                    <button type="button" class="btn btn-primary" @click=${() => this.handleUpgrade(0)}>Upgrade</button>
                </div>`;
            }

            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="container">
                    <div class="row">
                        <div class="col-7">
                            <h5>${sector.displayName}</h5>
                            <div>\n${sector.resourceChange.toConvString()}</div>
                            <div>Workers: ${Math.round(sector.workers)} / ${Math.round(sector.workersNeeded)}</div>
                        </div>
                        <div class="col-5 align-items-end justify-content-end" style="height: 100%;">
                            <div class="text-right">
                                Efficiency: ${Math.round(sector.efficiency * 100)}%
                            </div>
                            ${uhtml}
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.log("Invalid state:", this._state);
        }
    }

    // Open Building logic
    handleBuild() {
        this.outsideClickListener = this.handleOutsideMouseDown.bind(this);
        document.addEventListener('mousedown', this.outsideClickListener);

        this._state = "building";
        this.requestUpdate();
    }

    handleOutsideMouseDown(e) {
        if (!this.contains(e.target)) {
            document.removeEventListener('mousedown', this.outsideClickListener);
            this._state = "empty";
            this.requestUpdate();
        }
    }

    // Building Logic
    handleBuildX(buttonIdx = 0) {
        document.removeEventListener('mousedown', this.outsideClickListener);

        ClientActions.clientBuildSector(this._idx, buttonIdx);

        this._state = "built";
        this.requestUpdate();
    }

    // Upgrade Logic
    handleUpgrade(buttonIdx = 0) {
        ClientActions.clientUpgradeSector(this._idx, buttonIdx);
        this.requestUpdate();
    }
}
