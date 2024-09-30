
import { Sector } from "../classes/Sectors.js";

import { SectorUI } from './SectorUI.js';
import { OutpostSlot } from './OutpostSlot.js';
import { PlayersUI } from './PlayersUI.js';
import { WorldUI } from './WorldUI.js';
import { TradeUI } from './TradeUI.js';
import { HeaderUI } from './HeaderUI.js';


export function buildUI() {
    customElements.define('header-ui', HeaderUI);
    customElements.define('sector-slot', SectorUI);
    customElements.define('outpost-slot', OutpostSlot);

    customElements.define('trade-ui', TradeUI);

    customElements.define('world-ui', WorldUI);
    customElements.define('players-ui', PlayersUI);
}
