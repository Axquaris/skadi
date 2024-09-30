import { css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';



export const shared_styles = css`
    :host {
        margin: 0px;
        padding: 0px;
    }

    .container {
        background-color: #1c232c;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        height: 200px;
        border: 1px solid #2c3e50;
    }

    .dashed-container {
        border-radius: 5px;
        padding: 5px;
        margin-top: 10px;
        height: 200px;
        border: 1px dotted #2c3e50;

        display: flex;
        justify-content: center; /* Center all elements horizontally */
        align-items: center; /* Center all elements vertically */
    }

    .build-building {
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        height: 95px;
        border: 1px dotted #2c3e50;

        display: flex;
        justify-content: center; /* Center all elements horizontally */
        align-items: center; /* Center all elements vertically */
    }

    .resources {
        display: flex;
        justify-content: space-around;
        background-color: #212a35;
        /* Darker background color */
        padding: 2px;
        font-size: 18px;
    }
    
    .resource {
        flex: 1;
        padding: 2px;
        padding-left: 8px;
        border: 1px solid #2c3e50;
        border-radius: 10px;
        margin: 2px;
    }

    .btn {
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px; /* Add horizontal padding */
    }

    .progress {
        background-color: #181f27;
        // border: 1px solid #000000;
    }
`;


export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function addSign(number) {
    if (number > 0) {
        return "+" + number;
    } else {
        return number;
    }
}
