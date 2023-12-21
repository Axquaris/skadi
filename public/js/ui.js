import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.2?module';

var dynamicVariable = 0;

const shared_styles = css`
    :host {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        margin: 0px;
        padding: 0px;
    }

    .container {
        background-color: #1c232c;
        border-radius: 5px;
        padding-left: 5px;
        margin-top: 5px;
        height: 160px;
    }
`

// Define a new custom HTML element called "building-slot"
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
            <div class="container">
                <div class="row">
                    <div class="col-6">
                        <h3>Supply Plant</h3>
                        ${dynamicVariable}
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
    static styles = shared_styles;

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
                        ${dynamicVariable}
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

export { dynamicVariable }