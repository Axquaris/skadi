import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.2?module';
import { ResourceVec } from './classes/Player.js';

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
    }

    .resources {
        display: flex;
        justify-content: space-around;
        background-color: #212a35;
        color: #181f27;
        /* Darker background color */
        padding: 2px;
    }
    
    .resource {
        flex: 1;
        text-align: left;
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
        this._myResources = new ResourceVec(0, 0, 0, 0, 0, 0);
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        const pop = parseInt(this._myResources.pop);
        const food = parseInt(this._myResources.food);
        const energy = parseInt(this._myResources.energy);
        const materials = parseInt(this._myResources.materials);
        const supplies = parseInt(this._myResources.supplies);
        const weapons = parseInt(this._myResources.weapons);

        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="resources">
                <div id="population-ui" class="resource" style="background-color: rgb(186, 108, 84);">
                    Population: ${pop}
                </div>
                <div id="food-ui" class="resource" style="background-color: #125d31;">
                    Food: ${food}
                </div>
                <div id="energy-ui" class="resource" style="background-color: #d3bc08;">
                    Energy: ${energy}
                </div>
                <div id="materials-ui" class="resource" style="background-color: #6c3833;">
                    Materials: ${materials}
                </div>
                <div id="supplies-ui" class="resource" style="background-color: #4e3b7e;">
                    Supplies: ${supplies}
                </div>
                <div id="weapons-ui" class="resource" style="background-color: #c21319;">
                    Weapons: ${weapons}
                </div>
                <div class="resource">Time</div>
            </div>
        `;
    }

    handleClick() {
        console.log('Button clicked!', dynamicVariable);
        dynamicVariable += 1;
        this.requestUpdate();
    }

    updateVariables(myResources) {
        this._myResources = myResources;
        this.requestUpdate();
    }
}


class BuildingSlot extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._myVariable = 'default value';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h5>Supply Plant</h5>
                        ${dynamicVariable}
                    </div>
                    <div class="col-6 d-flex align-items-end justify-content-end">
                        <button id="myButton" @click=${this.handleClick}>Upgrade</button>
                    </div>
                </div>
            </div>
        `;
    }

    handleClick() {
        console.log('Button clicked!', dynamicVariable);
        dynamicVariable += 1;
        this.requestUpdate();
    }
}


class OutpostSlot extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._myVariable = 'default value';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h5>Supply Plant</h5>
                        ${dynamicVariable}
                    </div>
                    <div class="col-6">
                        <button id="myButton" @click=${this.handleClick}>Upgrade</button>
                    </div>
                </div>
            </div>
        `;
    }

    handleClick() {
        console.log('Button clicked!', dynamicVariable);
        dynamicVariable += 1;
        this.requestUpdate();
    }
}

customElements.define('ui-header', UIHeader);
customElements.define('building-slot', BuildingSlot);
customElements.define('outpost-slot', OutpostSlot);

export { dynamicVariable }