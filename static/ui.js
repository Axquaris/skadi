
var dynamicVariable = 0;

// Define a new custom HTML element called "my-element"
class MyElement extends HTMLElement {
    constructor() {
        super();
        this._myVariable = 'default value';
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    static get observedAttributes() {
        return ['my-variable'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._myVariable = newValue;
        this.render();
    }

    connectedCallback() {
        
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Define styles for the custom element */
                :host {
                    display: block;
                    padding: 16px;
                    background-color: lightblue;
                }
            </style>
            <div>
                <h1>Welcome to My Element!</h1>
                <p>${dynamicVariable}</p>
            </div>
            <button id="myButton">Click Me</button>
        `;

        const handleClick = () => {
            // Function to be called on button click
            console.log('Button clicked!');
            dynamicVariable += 1;
            this.render();
        };

        const button = this.shadowRoot.getElementById('myButton');
        button.addEventListener('click', handleClick);
    }
}

// Register custom elements
customElements.define('resource-indicator', MyElement);
customElements.define('resource-indicator', BuildingSlot);
