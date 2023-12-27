/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/classes/Building.js":
/*!************************************!*\
  !*** ./public/classes/Building.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Agroponics: () => (/* binding */ Agroponics),\n/* harmony export */   Building: () => (/* binding */ Building),\n/* harmony export */   Core: () => (/* binding */ Core),\n/* harmony export */   SupplyManufactories: () => (/* binding */ SupplyManufactories),\n/* harmony export */   WarManufactories: () => (/* binding */ WarManufactories),\n/* harmony export */   WellnessCenter: () => (/* binding */ WellnessCenter),\n/* harmony export */   buildingClasses: () => (/* binding */ buildingClasses)\n/* harmony export */ });\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esserializer */ \"esserializer\");\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(esserializer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResourceVec.js */ \"./public/classes/ResourceVec.js\");\n\n\n\n\n\nclass Building {\n    static displayName = \"Building\";\n    static workersNeeded = 0;\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec();\n\n    constructor() {\n        this.workers = 0.;\n        this.efficiency = 0.;\n    }\n\n    dailyUpdate(currentResources) {\n        // Amount (0-1) of workers fulfilled\n        var workerFulfilment = Math.max(Math.min(this.workers / this.constructor.workersNeeded, 1), 0);\n\n        // Hypothetical resource change given current workers\n        var resourceChange = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec.multiply(this.constructor.resourceChange, workerFulfilment);\n        if (resourceChange.energy > 0) {\n            // Energy consumption scales to a minumum of 25%\n            resourceChange.energy = this.constructor.resourceChange.energy * (1 + 3 * workerFulfilment) / 4;\n        }\n\n        // Amount (0-1) of resource needs fulfilled\n        var resourceFulfillment = 1;\n        var newResources = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec.add(currentResources, resourceChange);\n        newResources.forEach((val, idx) => {\n            if (val < 0) {\n                resourceChange.set(idx, 0);\n                resourceFulfillment = Math.min(resourceFulfillment, -currentResources.get(idx) / resourceChange.get(idx));\n                console.log(\"Resource Fulfillment\", val, idx,currentResources, resourceChange );\n            }\n        });\n\n        // Percent (0-1) efficiency of production\n        var newEfficiency = workerFulfilment * resourceFulfillment;\n        if (newEfficiency != this.efficiency) {\n            this.efficiency = newEfficiency;\n            // TODO: make sure listeners are notified of this change\n        }\n\n        // Resource change given calculated efficiency\n        resourceChange = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec.multiply(this.constructor.resourceChange, this.efficiency);\n        if (resourceChange.energy > 0) {\n            // Energy consumption scales to a minumum of 25%\n            resourceChange.energy = this.constructor.resourceChange.energy * (1 + 3 * this.efficiency) / 4;\n        }\n        newResources = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec.add(currentResources, resourceChange);\n        return newResources;\n    }\n}\n\n\nclass Agroponics extends Building {\n    static displayName = \"Agroponics\";\n    static workersNeeded = 1800;\n\n    // pop, energy, food, material, supplies, weapons\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec(-0.03, -35, 30, -10, -10, 0);\n}\n\n\nclass SupplyManufactories extends Building {\n    static displayName = \"Supply Manufactories\";\n    static workersNeeded = 2200;\n\n    // pop, energy, food, material, supplies, weapons\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec(-0.06, -40, 0, -10, 40, 0);\n}\n\n\nclass WarManufactories extends Building {\n    static displayName = \"War Manufactories\";\n    static workersNeeded = 2200;\n\n    // pop, energy, food, material, supplies, weapons\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec(-0.06, -40, 0, -10, 0, 10);\n}\n\n\nclass WellnessCenter extends Building {\n    static displayName = \"Wellness Center\";\n    static workersNeeded = 600;\n\n    // pop, energy, food, material, supplies, weapons\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec(2, -40, -8, 0, -5, 0);\n}\n\n\nclass Core extends Building {\n    static displayName = \"Core\";\n    static workersNeeded = 1200;\n\n    // pop, energy, food, material, supplies, weapons\n    static resourceChange = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_1__.ResourceVec(-0.06, 80, 0, 0, -5, 0);\n}\n\n\n// Class Registry for construction\nvar buildingClasses = [Agroponics, WellnessCenter, SupplyManufactories, WarManufactories];\n\n\n// var classes = {\n//     \"Building\": Building,\n//     \"Agroponics\": Agroponics,\n//     \"SupplyManufactories\": SupplyManufactories,\n//     \"WarManufactories\": WarManufactories,\n//     \"WellnessCenter\": WellnessCenter,\n//     \"Core\": Core,\n// }\n\nesserializer__WEBPACK_IMPORTED_MODULE_0___default().registerClasses(Building, Agroponics, SupplyManufactories, WarManufactories, WellnessCenter, Core);\n\n\n//# sourceURL=webpack:///./public/classes/Building.js?");

/***/ }),

/***/ "./public/classes/Player.js":
/*!**********************************!*\
  !*** ./public/classes/Player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esserializer */ \"esserializer\");\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(esserializer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Building_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Building.js */ \"./public/classes/Building.js\");\n/* harmony import */ var _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResourceVec.js */ \"./public/classes/ResourceVec.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Player {\r\n    // Weekly growth of population\r\n    static birthRate = .00035\r\n\r\n    // Pop consumption\r\n    // pop, energy, food, material, supplies, weapons\r\n    static resourcePerPop = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec(0, -.0035, -.002, 0, -.001, 0)\r\n    // energy per pop: Scaled down by 10 from 13 kwh per year per person\r\n\r\n    constructor(id, username) {\r\n        this.id = id\r\n        this.username = username\r\n        // pop, energy, food, material, supplies, weapons\r\n        this.resources = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec(4000, 6000, 8000, 5000, 5000, 10)\r\n        this.dResources = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec()\r\n        this.maxResources = new _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec(10000, 10000, 10000, 5000, 5000, 1000)\r\n\r\n        this.core = new _Building_js__WEBPACK_IMPORTED_MODULE_1__.Core()\r\n        this.buildings = []\r\n        this.outposts = []\r\n    }\r\n    \r\n    allocateWorkers() {\r\n        // Determine total workers needed\r\n        var totalWorkersNeeded = this.core.constructor.workersNeeded;\r\n        this.buildings.forEach(building => {\r\n            totalWorkersNeeded += building.constructor.workersNeeded;\r\n        });\r\n        \r\n        // Determine how much of the needed amt each building will be allocated (0-1)\r\n        var allocationRatio = Math.min(this.resources.pop / totalWorkersNeeded, 1);\r\n\r\n        // Allocate workers\r\n        this.core.workers = this.core.constructor.workersNeeded * allocationRatio;\r\n        this.buildings.forEach(building => {\r\n            building.workers = building.constructor.workersNeeded * allocationRatio;\r\n        });\r\n    }\r\n\r\n    dailyUpdate() {\r\n        // console.log(\"Starting Daily Resources\", this.resources)\r\n        // Population Updates\r\n        var prevResources = this.resources.clone()\r\n\r\n        // Population Growth\r\n        this.resources.pop *= (1 + Player.birthRate)\r\n\r\n        // Allocate Workers\r\n        this.allocateWorkers()\r\n\r\n        // Building Updates\r\n        this.resources = this.core.dailyUpdate(this.resources)\r\n        this.buildings.forEach(building => {\r\n            this.resources = building.dailyUpdate(this.resources)\r\n        })\r\n\r\n        // Population Consumption\r\n        var popConsumption = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec.multiply(Player.resourcePerPop, this.resources.pop)\r\n        this.resources = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec.add(this.resources, popConsumption)\r\n        \r\n        // console.log(\"Ending Daily Resources\", this.resources)\r\n        self.dResources = _ResourceVec_js__WEBPACK_IMPORTED_MODULE_2__.ResourceVec.subtract(this.resources, prevResources)\r\n    }\r\n\r\n    weeklyUpdate() {\r\n        // console.log(this.resources)\r\n        // this.resources.set(0, this.resources.get(0) * (1 + Player.birthRate))\r\n    }\r\n}\r\n\r\n\r\nesserializer__WEBPACK_IMPORTED_MODULE_0___default().registerClass(Player)\r\n\n\n//# sourceURL=webpack:///./public/classes/Player.js?");

/***/ }),

/***/ "./public/classes/ResourceVec.js":
/*!***************************************!*\
  !*** ./public/classes/ResourceVec.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ResourceVec: () => (/* binding */ ResourceVec)\n/* harmony export */ });\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esserializer */ \"esserializer\");\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(esserializer__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n\r\nclass ResourceVec{\r\n    constructor(pop = 0, energy = 0, food = 0, materials = 0, supplies = 0, weapons = 0) {\r\n        this.pop = pop;\r\n        this.energy = energy;\r\n        this.food = food;\r\n        this.materials = materials;\r\n        this.supplies = supplies;\r\n        this.weapons = weapons;\r\n    }\r\n\r\n    static multiply(vec, scalar) {\r\n        return new ResourceVec(\r\n            vec.pop * scalar,\r\n            vec.energy * scalar,\r\n            vec.food * scalar,\r\n            vec.materials * scalar,\r\n            vec.supplies * scalar,\r\n            vec.weapons * scalar\r\n        );\r\n    }\r\n\r\n    static add(vec, other) {\r\n        return new ResourceVec(\r\n            vec.pop + other.pop,\r\n            vec.energy + other.energy,\r\n            vec.food + other.food,\r\n            vec.materials + other.materials,\r\n            vec.supplies + other.supplies,\r\n            vec.weapons + other.weapons\r\n        );\r\n    }\r\n\r\n    static subtract(vec, other) {\r\n        return new ResourceVec(\r\n            vec.pop - other.pop,\r\n            vec.energy - other.energy,\r\n            vec.food - other.food,\r\n            vec.materials - other.materials,\r\n            vec.supplies - other.supplies,\r\n            vec.weapons - other.weapons\r\n        );\r\n    }\r\n\r\n    clone() {\r\n        return new ResourceVec(\r\n            this.pop,\r\n            this.energy,\r\n            this.food,\r\n            this.materials,\r\n            this.supplies,\r\n            this.weapons\r\n        );\r\n    }\r\n\r\n    roundToInt() {\r\n        return new ResourceVec(\r\n            Math.round(this.pop),\r\n            Math.round(this.energy),\r\n            Math.round(this.food),\r\n            Math.round(this.materials),\r\n            Math.round(this.supplies),\r\n            Math.round(this.weapons)\r\n        );\r\n    }\r\n\r\n    /**\r\n     * Executes a provided callback function once for each element in the array.\r\n     *\r\n     * @param {Function} callback - A function to execute on each element.\r\n     *                             It accepts three arguments: the current element, the index of the current element, and the array itself.\r\n     * @returns {undefined}\r\n     */\r\n    forEach(callback) {\r\n        for (let i = 0; i < this.length; i++) {\r\n            callback(this[i], i, this);\r\n        }\r\n    }\r\n\r\n    /**\r\n     * Calculates the resource fulfillment based on the given consumption.\r\n     * \r\n     * @param {ResourceVec} consumption - The consumption of resources.\r\n     * @returns {number} The resource fulfillment value.\r\n     */\r\n    fulfilment(consumption) {\r\n        var resourceFulfillment = 1;\r\n\r\n        var newResources = ResourceVec.add(this, consumption);\r\n        newResources.forEach((val, idx) => {\r\n            if (val < 0) {\r\n                resourceChange.set(idx, 0);\r\n                resourceFulfillment = Math.min(resourceFulfillment, -this.get(idx) / resourceChange.get(idx));\r\n            }\r\n        });\r\n\r\n        return resourceFulfillment;\r\n    }\r\n}\r\n\r\n\r\nesserializer__WEBPACK_IMPORTED_MODULE_0___default().registerClass(ResourceVec);\r\n\n\n//# sourceURL=webpack:///./public/classes/ResourceVec.js?");

/***/ }),

/***/ "./public/classes/World.js":
/*!*********************************!*\
  !*** ./public/classes/World.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   World: () => (/* binding */ World)\n/* harmony export */ });\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! esserializer */ \"esserializer\");\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(esserializer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ \"./public/classes/Player.js\");\n/* harmony import */ var esbuild_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esbuild-loader */ \"esbuild-loader\");\n/* harmony import */ var esbuild_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(esbuild_loader__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\n\nclass World {\n    static instance;\n    // static clientId; // ID of the player running this client\n\n    constructor(clientId = null) {\n        // World state variables\n        this.day = 1;\n        this.week = 1;\n        this.players = {};\n\n        this.clientId = clientId;\n    }\n\n    // Full world sync\n    sync(backEndWorld) {\n        this.day = backEndWorld.day\n        this.week = backEndWorld.week\n\n        for (let id in backEndWorld.players) {\n            this.players[id] = _Player_js__WEBPACK_IMPORTED_MODULE_1__.Player.fromJSON(backEndWorld.players[id])\n            console.log()\n        }\n    }\n\n    // World tick functions\n    dailyUpdate() {\n        this.day++\n    }\n\n    weeklyUpdate() {\n        this.day = 1\n        this.week++\n    }    \n}\n\n\nesserializer__WEBPACK_IMPORTED_MODULE_0___default().registerClass(World)\n\n\n//# sourceURL=webpack:///./public/classes/World.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esserializer */ \"esserializer\");\n/* harmony import */ var esserializer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(esserializer__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _public_classes_World_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./public/classes/World.js */ \"./public/classes/World.js\");\n/* harmony import */ var _public_classes_Player_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./public/classes/Player.js */ \"./public/classes/Player.js\");\n/* harmony import */ var worker_threads__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! worker_threads */ \"worker_threads\");\n/* harmony import */ var worker_threads__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(worker_threads__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// const express = require('express')\r\n// const Player = require('./public/js/classes/Player.js')\r\n// const http = require('http')\r\n// const { Server } = require('socket.io')\r\n\r\n\r\n// ===================== //\r\n// Game Config Variables //\r\n// ===================== //\r\nlet cfg = {\r\n    \"port\": 3000,\r\n    \"ms_per_tick\": 15,\r\n    \"ticks_per_day\": 50,\r\n    \"days_per_week\": 7\r\n}\r\nconsole.log(`Time for one year: ${cfg.ms_per_tick * cfg.ticks_per_day * cfg.days_per_week * 55 / 1000 / 60}`)\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()()\r\n\r\n// socket.io setup\r\nconst server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(app)\r\nconst io = new socket_io__WEBPACK_IMPORTED_MODULE_2__.Server(server, { pingInterval: 2000, pingTimeout: 5000 })\r\nconst port = 3000\r\n\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"]('public'))\r\napp.get('/', (req, res) => {\r\n    res.sendFile(__dirname + '/index.html')\r\n})\r\n\r\n\r\n// =============== //\r\n// Game state vars //\r\n// =============== //\r\nlet backEndWorld;\r\n\r\nlet tick = 0\r\nlet gameRunning = false\r\n\r\nfunction initGame() {\r\n//   backEndPlayers = {}\r\n    tick = 0\r\n    backEndWorld = new _public_classes_World_js__WEBPACK_IMPORTED_MODULE_4__.World()\r\n}\r\n\r\ninitGame()\r\n\r\n\r\n// ==================================== //\r\n// Player connection & action callbacks //\r\n// ==================================== //\r\n\r\n// Handle new connection, given socket to that player\r\nio.on('connection', (socket) => {\r\n    // console.log('a user connected')\r\n\r\n    // io.emit('updatePlayers', backEndWorld.players) // Tell all players about joiner\r\n\r\n    socket.on('initGame', (username) => {\r\n        backEndWorld.players[socket.id] = new _public_classes_Player_js__WEBPACK_IMPORTED_MODULE_5__.Player(socket.id, username)\r\n        console.log(username, \"connected\", socket.id)\r\n\r\n        gameRunning = true\r\n        socket.emit('gameStart', esserializer__WEBPACK_IMPORTED_MODULE_3___default().serialize(backEndWorld))  // Tell player about game start\r\n    })\r\n\r\n    // Player action event listener: disconnecting\r\n    socket.on('disconnect', (reason) => {\r\n        console.log(reason)\r\n        delete backEndWorld.players[socket.id]\r\n    })\r\n})\r\n\r\n\r\n// ============== //\r\n// CORE GAME LOOP //\r\n// ============== //\r\n\r\nsetInterval(() => {\r\n    if (gameRunning) {\r\n        if (backEndWorld.players.length < 1) {\r\n            initGame()\r\n            gameRunning = false\r\n            tick = 0\r\n        }\r\n        gameTick()\r\n    }\r\n}, cfg.ms_per_tick)\r\n\r\n\r\nfunction gameTick() {\r\n    if ((tick + 1) % cfg.ticks_per_day === 0) {\r\n        backEndWorld.dailyUpdate()\r\n    }\r\n    if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) === 0) {\r\n        // Weekly updateconsole.log(`t${tick} d${day}`)\r\n        console.log(`Weekly update at t${tick}`)\r\n        backEndWorld.weeklyUpdate()\r\n\r\n        io.emit('updateWorld', esserializer__WEBPACK_IMPORTED_MODULE_3___default().serialize(backEndWorld))\r\n    }\r\n    // io.emit('updatePlayers', backEndPlayers)\r\n    tick++\r\n}\r\n\r\n\r\n// Start server listening to port\r\nserver.listen(port, () => {\r\n})\r\n\r\nconsole.log(`Server listening on port ${port}`)\r\n\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "esbuild-loader":
/*!*********************************!*\
  !*** external "esbuild-loader" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("esbuild-loader");

/***/ }),

/***/ "esserializer":
/*!*******************************!*\
  !*** external "esserializer" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("esserializer");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;