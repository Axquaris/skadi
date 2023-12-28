import { World } from './classes/World.js';
import { buildingOptions, sectorTypes } from './classes/Sectors.js';


export class ClientActions {
    static socket;
    static world = new World();

    static bindServerCallbacks(socket) {
        socket.on('buildSector', (sectorIdx, buildIdx) => this._buildSector(socket.id, sectorIdx, buildIdx))
        socket.on('upgradeSector', (sectorIdx, upgradeIdx) => this._upgradeSector(socket.id, sectorIdx, upgradeIdx))
    }

    static clientBuildSector(sectorIdx, buildIdx) {
        this.socket.emit('buildSector', sectorIdx, buildIdx);
        return this._buildSector(this.world.clientId, sectorIdx, buildIdx);
    }

    static _buildSector(clientId, sectorIdx, buildIdx) {
        console.log("action: _buildSector", this.world.players[clientId].username, sectorIdx, buildIdx);
        this.world.players[clientId].sectors[sectorIdx].build(buildIdx);
    }

    static clientUpgradeSector(sectorIdx, upgradeIdx) {
        this.socket.emit('upgradeSector', sectorIdx, upgradeIdx);
        return this._upgradeSector(this.world.clientId, sectorIdx, upgradeIdx);
    }

    static _upgradeSector(clientId, sectorIdx, upgradeIdx) {
        console.log("action: _upgradeSector", this.world.players[clientId].username, sectorIdx, upgradeIdx);
        this.world.players[clientId].sectors[sectorIdx].upgrade(upgradeIdx);
    }
}
