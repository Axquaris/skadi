const path = require('path');
const nodeExternals = require('webpack-node-externals');


const clientConfig = {
    target: ['web', 'es6'],
    entry: './public/client.js',
    output: {
        filename: 'client.js',
        path: path.resolve(__dirname, 'dist'),
        module: true,
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],
    },
    experiments: {
        outputModule: true,
    },
};


const serverConfig = {
    target: 'node',
    entry: './server.js',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
        environment: {
            module: true, // This tells webpack to output a bundle that uses ES6 modules
        },
    },
    mode: 'development',
    resolve: {
        extensions: ['.js']
    },
    externals: [nodeExternals()],
};


module.exports = [
    clientConfig,
    serverConfig,
];
