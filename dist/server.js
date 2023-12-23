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

/***/ "./public/classes/World.js":
/*!*********************************!*\
  !*** ./public/classes/World.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   World: () => (/* binding */ World)\n/* harmony export */ });\n\nclass World {\n    constructor() {\n        this.day = 1\n        this.week = 1\n\n        this.players = {}\n    }\n\n    addPlayer(player) {\n        this.players[player.id] = player\n    }\n\n    removePlayer(id) {\n        delete this.players[id]\n    }\n\n    dailyUpdate() {\n        this.day++\n    }\n\n    weeklyUpdate() {\n        this.day = 1\n        this.week++\n    }\n\n    updatePlayers(backEndPlayers) {\n        for (const id in backEndPlayers) {\n            const backEndPlayer = backEndPlayers[id]\n        \n            this.players = backEndPlayers\n            if (!this.players[id]) {\n                // New player\n                // frontEndPlayers[id] = backEndPlayer;\n            \n            } else {\n            // Update existing player\n        \n        \n            // Resync logic\n            // if (id === socket.id) {\n            //   const lastBackendInputIndex = playerInputs.findIndex((input) => {\n            //     return backEndPlayer.sequenceNumber === input.sequenceNumber\n            //   })\n        \n            //   if (lastBackendInputIndex > -1)\n            //     playerInputs.splice(0, lastBackendInputIndex + 1)\n        \n            //   playerInputs.forEach((input) => {\n            //     frontEndPlayers[id].target.x += input.dx\n            //     frontEndPlayers[id].target.y += input.dy\n            //   })\n            // }\n            }\n        \n        \n        }\n        \n        // this is where we delete frontend players\n        // for (const id in frontEndPlayers) {\n        //   if (!backEndPlayers[id]) {\n        //     if (id === socket.id) {\n        //       document.querySelector('#usernameForm').style.display = 'block'\n        //     }\n        //   }\n        // }\n    }\n\n    sync(backEndWorld) {\n        this.day = backEndWorld.day\n        this.week = backEndWorld.week\n\n        this.players = backEndWorld.players\n    }\n}\n\n//# sourceURL=webpack:///./public/classes/World.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _public_classes_World_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./public/classes/World.js */ \"./public/classes/World.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n// const express = require('express')\r\n// const Player = require('./public/js/classes/Player.js')\r\n// const http = require('http')\r\n// const { Server } = require('socket.io')\r\n\r\n\r\n// ===================== //\r\n// Game Config Variables //\r\n// ===================== //\r\nlet cfg = {\r\n    \"port\": 3000,\r\n    \"ms_per_tick\": 15,\r\n    \"ticks_per_day\": 50,\r\n    \"days_per_week\": 7\r\n}\r\nconsole.log(`Time for one year: ${cfg.ms_per_tick * cfg.ticks_per_day * cfg.days_per_week * 55 / 1000 / 60}`)\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()()\r\n\r\n// socket.io setup\r\nconst server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(app)\r\nconst io = new socket_io__WEBPACK_IMPORTED_MODULE_2__.Server(server, { pingInterval: 2000, pingTimeout: 5000 })\r\nconst port = 3000\r\n\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default()[\"static\"]('public'))\r\napp.get('/', (req, res) => {\r\n    res.sendFile(__dirname + '/index.html')\r\n})\r\n\r\n\r\n// =============== //\r\n// Game state vars //\r\n// =============== //\r\nlet backEndWorld;\r\n\r\nfunction initGame() {\r\n//   backEndPlayers = {}\r\n  backEndWorld = new _public_classes_World_js__WEBPACK_IMPORTED_MODULE_3__.World()\r\n}\r\n\r\ninitGame()\r\n\r\n\r\n// ==================================== //\r\n// Player connection & action callbacks //\r\n// ==================================== //\r\n\r\n// Handle new connection, given socket to that player\r\nio.on('connection', (socket) => {\r\n    // console.log('a user connected')\r\n\r\n    // io.emit('updatePlayers', backEndWorld.players) // Tell all players about joiner\r\n\r\n    socket.on('initGame', (player) => {\r\n        backEndWorld.addPlayer(player)\r\n        console.log(player.username, \"connected\")\r\n    })\r\n\r\n    // Player action event listener: discnnecting\r\n    socket.on('disconnect', (reason) => {\r\n        // console.log(reason)\r\n        // delete backEndPlayers[socket.id]\r\n        // io.emit('updatePlayers', backEndPlayers)\r\n    })\r\n})\r\n\r\n\r\n// ============== //\r\n// CORE GAME LOOP //\r\n// ============== //\r\nlet tick = 0\r\nsetInterval(() => {\r\n\r\n    if ((tick + 1) % cfg.ticks_per_day === 0) {\r\n        backEndWorld.dailyUpdate()\r\n    }\r\n    if ((tick + 1) % (cfg.ticks_per_day * cfg.days_per_week) === 0) {\r\n        // Weekly updateconsole.log(`t${tick} d${day}`)\r\n        console.log(`Weekly update at t${tick}`)\r\n        backEndWorld.weeklyUpdate()\r\n\r\n        io.emit('updateWorld', backEndWorld)\r\n    }\r\n\r\n    // io.emit('updatePlayers', backEndPlayers)\r\n\r\n    tick++\r\n}, cfg.ms_per_tick)\r\n\r\n\r\n// Start server listening to port\r\nserver.listen(port, () => {\r\n})\r\n\r\nconsole.log(`Server listening on port ${port}`)\r\n\n\n//# sourceURL=webpack:///./server.js?");

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