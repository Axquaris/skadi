import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { World } from "../classes/World.js";
import { shared_styles } from './ui-common.js';

// class TradeUI extends LitElement {
//     static styles = shared_styles;
//     constructor() {
//         super();
//         this.world = new World();
//         this._price = 0;
//         this._quantity = 0;
//         this.attachShadow({ mode: 'open' });
//         this.render();
//     }
//     updated() {
//         this.updateD3();
//     }
//     updateD3() {
//         // Declare the chart dimensions and margins.
//         const width = 300;
//         const height = 200;
//         const marginTop = 20;
//         const marginRight = 20;
//         const marginBottom = 40;
//         const marginLeft = 40;
//         const minPrice = 0;
//         const maxPrice = 20;
//         const minQuantity = 0;
//         const maxQuantity = 500;
//         // Select the SVG container.
//         const svg = d3.select(this.shadowRoot).select('svg')
//             .attr('width', width)
//             .attr('height', height);
//         // Declare the x (horizontal position) scale.
//         const x = d3.scaleLinear()
//             .domain([minPrice, maxPrice])
//             .range([marginLeft, width - marginRight]);
//         // Declare the y (vertical position) scale.
//         const y = d3.scaleLinear()
//             .domain([minQuantity, maxQuantity])
//             .range([height - marginBottom, marginTop]);
//         // Add the x-axis.
//         svg.append("g")
//             .attr("transform", `translate(0,${height - marginBottom})`)
//             .call(d3.axisBottom(x));
//         // Add the y-axis.
//         svg.append("g")
//             .attr("transform", `translate(${marginLeft},0)`)
//             .call(d3.axisLeft(y));
//         // Add the x-axis label.
//         svg.append("text")
//             .attr("x", width / 2)
//             .attr("y", height - marginBottom * .2)
//             .attr("text-anchor", "middle")
//             .text("Price")
//             .style("fill", "rgb(149, 211, 255)");
//         // Add the y-axis label.
//         svg.append("text")
//             .attr("x", -height / 2)
//             .attr("y", marginLeft * .3)
//             .attr("transform", "rotate(-90)")
//             .attr("text-anchor", "middle")
//             .text("Quantity")
//             .style("fill", "rgb(149, 211, 255)");
//     }
//     render() {
//         var playerId = this.world.clientId;
//         var pricetxt = `${this._price} energy per unit`;
//         var quantitytxt = `Trade inactive`;
//         if (this._quantity > 0) {
//             pricetxt = `${this._price} energy per unit`;
//             quantitytxt = `buying ${this._quantity} units`;
//         } else if (this._quantity < 0) {
//             pricetxt = `${this._price} energy per unit`;
//             quantitytxt = `selling ${-this._quantity} units`;
//         }
//         return html`
//             <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
//             Food Market
//             <div style="display: flex; justify-content: center; align-items: center;">
//                 <svg></svg>
//             </div>
//             <div style="display: flex; flex-direction: row;">
//                 <div style="margin-right: 10px;">
//                     <input type="range" min="0" max="10" value="0" @input=${this.handlePrice}>
//                     <p>${pricetxt}</p>
//                 </div>
//                 <div>
//                     <input type="range" min="-10" max="10" value="0" @input=${this.handleQuantity}>
//                     <p>${quantitytxt}</p>
//                 </div>
//             </div>
//         `
//     }
//     handlePrice(e) {
//         this._price = e.target.value;
//         this.update();
//     }
//     handleQuantity(e) {
//         this._quantity = e.target.value * 10;
//         this.update();
//     }
// }
export class TradeUI extends LitElement {
    static styles = shared_styles;

    constructor() {
        super();
        this.world = new World();
        this._price = 0;
        this._quantity = 0;

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    updated() {
        this.updateD3();
    }

    updateD3() {
        // Declare the chart dimensions and margins.
        const width = 300;
        const height = 200;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 40;
        const marginLeft = 40;

        const minPrice = 0;
        const maxPrice = 20;
        const minQuantity = 0;
        const maxQuantity = 500;

        // Select the SVG container.
        const svg = d3.select(this.shadowRoot).select('svg')
            .attr('width', width)
            .attr('height', height);

        // Declare the x (horizontal position) scale.
        const x = d3.scaleLinear()
            .domain([minPrice, maxPrice])
            .range([marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([minQuantity, maxQuantity])
            .range([height - marginBottom, marginTop]);

        // Add the x-axis.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x));

        // Add the y-axis.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y));

        // Add the x-axis label.
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - marginBottom * 0.2)
            .attr("text-anchor", "middle")
            .text("Price")
            .style("fill", "rgb(149, 211, 255)");

        // Add the y-axis label.
        svg.append("text")
            .attr("x", -height / 2)
            .attr("y", marginLeft * 0.3)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text("Quantity")
            .style("fill", "rgb(149, 211, 255)");


    }

    render() {
        var playerId = this.world.clientId;
        var pricetxt = `${this._price} energy per unit`;
        var quantitytxt = `Trade inactive`;

        if (this._quantity > 0) {
            pricetxt = `${this._price} energy per unit`;
            quantitytxt = `buying ${this._quantity} units`;
        } else if (this._quantity < 0) {
            pricetxt = `${this._price} energy per unit`;
            quantitytxt = `selling ${-this._quantity} units`;
        }

        return html`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
            Food Market
            <div style="display: flex; justify-content: center; align-items: center;">
                <svg></svg>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div style="margin-right: 10px;">
                    <input type="range" min="0" max="10" value="0" @input=${this.handlePrice}>
                    <p>${pricetxt}</p>
                </div>
                <div>
                    <input type="range" min="-10" max="10" value="0" @input=${this.handleQuantity}>
                    <p>${quantitytxt}</p>
                </div>
            </div>
        `;
    }

    handlePrice(e) {
        this._price = e.target.value;
        this.update();
    }

    handleQuantity(e) {
        this._quantity = e.target.value * 10;
        this.update();
    }
}
