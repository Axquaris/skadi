import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.2?module';
import { Building, buildingClasses } from './classes/Player.js';
import { ResourceVec } from "./classes/ResourceVec.js";

var dynamicVariable = 0;


const shared_styles = css`
    :host {
        margin: 0px;
        padding: 0px;
    }

    .container {
        background-color: #1c232c;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        height: 160px;
        border: 1px solid #2c3e50;
    }

    .dashed-container {
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        height: 160px;
        border: 1px dotted #2c3e50;

        display: flex;
        justify-content: center; /* Center all elements horizontally */
        align-items: center; /* Center all elements vertically */
    }

    .resources {
        display: flex;
        justify-content: space-around;
        background-color: #212a35;
        color: #181f27;
        /* Darker background color */
        padding: 2px;
        font-size: 18px;
    }
    
    .resource {
        flex: 1;
        padding: 2px;
        padding-left: 8px;
        border: 1px solid #2c3e50;
        /* Background color of body */
        border-radius: 10px;
        margin: 2px;
    }
`


// Define a new custom HTML element called "building-slot"
class UIHeader extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._currentResources = new ResourceVec(0, 0, 0, 0, 0, 0);
        this._maxResources = new ResourceVec(0, 0, 0, 0, 0, 0);
        this._dResources = new ResourceVec(0, 0, 0, 0, 0, 0);
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
                <div id="population-ui" class="resource" style="background-color: rgb(186, 108, 84);">
                    Pop: ${c.pop} / ${m.pop}
                    <span style="text-align: right; justify-content: flex-end;">${d.pop.toFixed(2)}</span>
                </div>
                <div id="food-ui" class="resource" style="background-color: #125d31;">
                    Food: ${c.food} / ${m.food}
                    <span style="text-align: right;">${d.food.toFixed(2)}</span>
                </div>
                <div id="energy-ui" class="resource" style="background-color: #d3bc08;">
                    Energy: ${c.energy} / ${m.energy}
                    <span style="text-align: right;">${d.energy.toFixed(2)}</span>
                </div>
                <div id="materials-ui" class="resource" style="background-color: #6c3833;">
                    Materials: ${c.materials} / ${m.materials}
                    <span style="text-align: right;">${d.materials.toFixed(2)}</span>
                </div>
                <div id="supplies-ui" class="resource" style="background-color: #4e3b7e;">
                    Supplies: ${c.supplies} / ${m.supplies}
                    <span style="text-align: right;">${d.supplies.toFixed(2)}</span>
                </div>
                <div id="weapons-ui" class="resource" style="background-color: #c21319;">
                    Weapons: ${c.weapons} / ${m.weapons}
                    <span style="text-align: right;">${d.weapons.toFixed(2)}</span>
                </div>
                <div class="resource" style="width: 60px; background-color: #ffffff;">Time</div>
            </div>
        `;
    }

    handleClick() {
        dynamicVariable += 1;
        this.requestUpdate();
    }

    updateVariables(resources = null, maxResources = null, dResources = null) {
        if (resources !== null)  this._currentResources = resources;
        if (maxResources !== null)  this._maxResources = maxResources;
        if (dResources !== null)  this._dResources = dResources;
        this.requestUpdate();
    }
}


class BuildingSlot extends LitElement {
    static styles = shared_styles;
    static currentIdx = 0;

    constructor() {
        super();
        this._building = new Building();
        this._state = "empty"
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        if (this._state == "empty") {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="dashed-container text-center">
                    <button id="myButton" @click=${this.handleBuild}>Build</button>
                </div>
            `;
        }
        else if (this._state == "building") {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="row">
                    <div class="col-4  dashed-container text-center">
                        <button @click=${() => this.handleBuildX(0)}>
                            Build ${buildingClasses[0].displayName}
                        </button>
                    </div>
                    <div class="col-4  dashed-container text-center">
                        <button @click=${() => this.handleBuildX(1)}>
                            Build ${buildingClasses[1].displayName}
                        </button>
                    </div>
                    <div class="col-4  dashed-container text-center">
                        <button @click=${() => this.handleBuildX(2)}>
                            Build ${buildingClasses[2].displayName}
                        </button>
                    </div>
                </div>
            `;
        }
        else {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <h5>${this._building.constructor.displayName}</h5>
                            <div>Consumes:</div>
                            <div>Produces:</div>
                            <div>Workers: ${this._building.workers} / ${this._building.constructor.workersNeeded}</div>
                        </div>
                        <div class="col-5 d-flex align-items-end justify-content-end">
                            <button id="myButton" @click=${this.handleUpgrade}>Upgrade</button>
                        </div>
                    </div>
                </div>
            `;
        }   
    }

    // Open Building logic
    handleBuild() {
        this._state = "building";
        this.requestUpdate();

        this.outsideClickListener = this.handleOutsideMouseDown.bind(this);
        document.addEventListener('mousedown', this.outsideClickListener);
    }

    handleOutsideMouseDown(e) {
        if (!this.contains(e.target)) {
            document.removeEventListener('mousedown', this.outsideClickListener);
            this._state = "empty";
            this.requestUpdate();
        }
    }

    // Building Logic
    handleBuildX(button_idx) {
        document.removeEventListener('mousedown', this.outsideClickListener);
        this._state = "built";

        this._building = new buildingClasses[button_idx]();
        this.requestUpdate();
    }

    // Upgrade Logic
    handleUpgrade() {
        dynamicVariable += 1;
        this.requestUpdate();
    }
}


class OutpostSlot extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._state = 'empty';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        if (this._state == "empty") {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="dashed-container text-center">
                    <button id="myButton" @click=${this.handleBuild}>Build</button>
                </div>
            `;
        }
        else {
            return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h5>Supply Plant</h5>
                        ${dynamicVariable}
                    </div>
                    <div class="col-6">
                        <button id="myButton" @click=${this.handleUpgrade}>Upgrade</button>
                    </div>
                </div>
            </div>
        `;
        }
    }

    handleBuild() {
        this._state = "built"
        this.requestUpdate();
    }

    handleUpgrade() {
        dynamicVariable += 1;
        this.requestUpdate();
    }
}

export function buildUI() {
    customElements.define('ui-header', UIHeader);
    customElements.define('building-slot', BuildingSlot);
    customElements.define('outpost-slot', OutpostSlot);
}
