

function calculateEquilibrium(trades) {
    let tradesAsc = Object.keys(trades)
    tradesAsc.sort((a, b) => (trades[a].price > trades[b].price) ? 1 : -1); // Sort ascending

    executedTrades = {}
    var supply = 0;
    // Sum demand at 0 price, and put in executed trades
    var demand = tradesAsc.reduce(
        function(demand, tradeId) {
            demand + Math.max(trades[tradeId].amt, 0);
            executedTrades[tradeId] = {...trades[tradeId]};
        }, 0
    );

    // Scanning graph from left to right,
    // looking for intersection of supply and demand curves
    for (let tradeId of tradesAsc) {
        let trade = trades[tradeId];

        if (trade.amt > 0) {
            // Buyer
            demand -= trade.amt;
            if (supply >= demand) {
                // Demand curve has jumped below supply curve

                return {
                    executedTrades,
                    price: trade.price,
                    amt: supply
                };
            }
            delete executedTrades[tradeId];
        } else if (trade.amt < 0) {
            // Seller
            supply -= trade.amt;
            if (supply >= demand) {
                // Supply curve has jumped above demand curve

                trade.quantity = trade.amt - (supply - demand);
                executedTrades.push(trade); // Add partial sell trade

                return {
                    executedTrades,
                    price: trade.price,
                    amt: demand
                };
            }
            executedTrades[tradeId] = {...trade};
        }
    }
    return { executedTrades: [], price: 0, amt: 0 };
}   


export class Market {
    constructor() {
        this.resources = {}
        
        for (let resource in ["food", "ore", "supplies", "weapons"]) {
            this.resources[resource] = {
                // Trades for resource
                desiredTrades: {}, // playerId: {price, quantity }, ...
                executedTrades: {}, // playerId: { quantity }, ...

                // Equilibrium values
                price: 0,
                quantity: 0,
            };
        }
    }

    getPlayerTrades(playerId) {
        var trades = {}
        for (let res_name in this.resources) {
            res = this.resources[res_name]

            if (res.desiredTrades[playerId]) {
                dt = res.desiredTrades[playerId];
                et = res.executedTrades[playerId];

                trades[resource] = {
                    desiredPrice: dt.price,
                    executedPrice: res.price,
                    desiredQuantity: dt.quantity,
                    executedQuantity: et.quantity,
                    totalQuantity: res.quantity,
                }
            }
        }
        return trades
    }

    addTrade(resource, playerId, price, quantity) {
        this.resources[resource].desiredTrades[playerId] = {
            price, quantity
        }
        this.updateExecutedTrades(resource);
    }

    removeTrade(resource, playerId) {
        delete this.resources[resource].desiredTrades[playerId];
        this.updateExecutedTrades(resource);
    }

    updateExecutedTrades(resource) {
        Object.assign(
            this.resources[resource],
            calculateEquilibrium(this.resources[resource].desiredTrades)
        );
    }

    toJSON() {
        return {
            resources: this.resources
        }
    }

    static fromJSON(json) {
        var market = new Market()
        market.resources = json.resources
        return market
    }
}