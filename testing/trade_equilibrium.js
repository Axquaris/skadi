const plotWidth = 400
const plotHeight = 300

// Create the plot
var svg_plot = d3.select('#plot')
    .attr('width', plotWidth)
    .attr('height', plotHeight);


function calculateEquilibrium(trades) {
    trades = Array.from(trades);
    trades.sort((a, b) => (a.price > b.price) ? 1 : -1); // Sort ascending

    var supply = 0;
    var demand = trades.reduce(
        (demand, trade) => demand + Math.max(trade.amt, 0), 0
    );
    // Scanning graph from left to ight,
    //     looking for nash equilibrium (intersection of supply and demand curves)
    for (let trade of trades) {
        if (trade.amt > 0) {
            // Buyer
            demand -= trade.amt;
            if (supply >= demand) {
                // Demand curve has jumped below supply curve
                return { price: trade.price, amt: supply };
            }
        } else if (trade.amt < 0) {
            // Seller
            supply -= trade.amt;
            if (supply >= demand) {
                // Supply curve has jumped above demand curve
                return { price: trade.price, amt: demand };
            }
        }
    }
    return { price: 0, amt: 0 };
}


export function updatePlot(trades) {
    // Clear the plot
    svg_plot.selectAll('*').remove();

    var buyers = [];
    var sellers = [];
    for (let trade of trades) {
        if (trade.amt > 0) {
            buyers.push(trade);
        }
        else if (trade.amt < 0) {
            sellers.push(trade);
        }
    }
    buyers.sort((a, b) => (a.price > b.price) ? -1 : 1); // Sort descending
    sellers.sort((a, b) => (a.price > b.price) ? 1 : -1); // Sort ascending

    var equilibrium = calculateEquilibrium(trades);

    // Draw supply and demand curves
    var bottom = plotHeight;
    var boxes = [];
    for (let buyer of buyers) {
        var height = buyer.amt / 100 * plotHeight;
        var width = buyer.price / 100 * plotWidth;
        bottom -= height;
        var x = 0;
        var y = bottom;
        boxes.push({ x, y, width, height, color: buyer.color });

    }
    bottom = plotHeight;
    for (let seller of sellers) {
        var height = -seller.amt / 100 * plotHeight;
        var width = (100 - seller.price) / 100 * plotWidth;
        bottom -= height;
        var x = seller.price / 100 * plotWidth;
        var y = bottom;
        boxes.push({ x, y, width, height, color: seller.color });
    }

    // Plot the slider values
    svg_plot.selectAll('rect')
        .data(boxes)
        .enter()
        .append('rect')
        .attr('x', function (d) { return d.x; })
        .attr('y', function (d) { return d.y; })
        .attr('width', function (d) { return d.width; })
        .attr('height', function (d) { return d.height; })
        .attr('fill', function (d) { return d.color; })
        .attr('stroke', 'black')
        .attr('stroke-width', 4)
        .attr('opacity', 0.5);

    // Add an X for the equilibrium point
    let eqX = equilibrium.price / 100 * plotWidth;
    let eqY = plotHeight - equilibrium.amt / 100 * plotHeight;
    svg_plot.append('line')
        .attr('x1', eqX - 5)
        .attr('y1', eqY - 5)
        .attr('x2', eqX + 5)
        .attr('y2', eqY + 5)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

    svg_plot.append('line')
        .attr('x1', eqX - 5)
        .attr('y1', eqY + 5)
        .attr('x2', eqX + 5)
        .attr('y2', eqY - 5)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

    /// Define the scales
    var xScale = d3.scaleLinear()
        .domain([0, 100]) // Use the actual data range here
        .range([0, plotWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, 100]) // Use the actual data range here
        .range([plotHeight, 0]); // Note the range is reversed for the y-axis

    // Add x and y axes
    svg_plot.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${plotHeight})`)
        .call(d3.axisBottom(xScale));

    svg_plot.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));
}