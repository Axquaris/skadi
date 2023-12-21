// import { html, css, LitElement } from 'https://unpkg.com/lit@2.0.2?module';
import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.2?module';

var dynamicVariable = 0;

// Define a new custom HTML element called "building-slot"
class BuildingSlot extends LitElement {
    static styles = css`
        .container {
            background-color: #1c232c;
            border-radius: 5px;
            padding: 5px;
            margin-top: 5px;
            height: 160px;
        }
    `;

    constructor() {
        super();
        this._myVariable = 'default value';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        return html`
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h3>Supply Plant</h3>
                        <p>${dynamicVariable}</p>
                    </div>
                    <div class="col-6">
                        <button id="myButton" @click=${this.handleClick}>Click Me</button>
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


// Define a new custom HTML element called "building-slot"
class OutpostSlot extends LitElement {
    static styles = css`
        .container {
            text-align: left;
            background-color: #1c232c;
            border-radius: 5px;
            padding: 5px;
            margin-top: 5px;
            height: 160px;
        }
    `;

    constructor() {
        super();
        this._myVariable = 'default value';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        return html`
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h3>Supply Plant</h3>
                        <p>${dynamicVariable}</p>
                    </div>
                    <div class="col-6">
                        <button id="myButton" @click=${this.handleClick}>Click Me</button>
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


customElements.define('building-slot', BuildingSlot);
customElements.define('outpost-slot', OutpostSlot);

export {dynamicVariable}