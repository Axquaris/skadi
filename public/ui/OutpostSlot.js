import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { shared_styles } from './ui-common.js';

export class OutpostSlot extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this._outpost = 'empty';
        this.attachShadow({ mode: 'open' });

        this.render();
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
        else {
            return html`
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <h5>Supply Plant</h5>
                        </div>
                        <div class="col-6">
                            <button type="button" class="btn btn-primary" @click=${this.handleUpgrade}>Upgrade</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    handleBuild() {
        this._state = "built";
        this.requestUpdate();
    }

    handleUpgrade() {
        dynamicVariable += 1;
        this.requestUpdate();
    }
}
