/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ \"./src/scripts/game.js\");\n\nconsole.log(\"Webpack init check\");\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  var canvas = document.getElementById(\"moon_game\");\n  var ctx = canvas.getContext('2d');\n  var game = new _scripts_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUVBQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxvQkFBWjtBQUVBQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFXO0FBQ3ZELE1BQU1DLE1BQU0sR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLFdBQXhCLENBQWY7QUFDQSxNQUFNQyxHQUFHLEdBQUdGLE1BQU0sQ0FBQ0csVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsTUFBTUMsSUFBSSxHQUFHLElBQUlULHFEQUFKLENBQVNPLEdBQVQsQ0FBYjtBQUVELENBTEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9SaXNrLW9mLU1vb24vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZSBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIlxuXG5jb25zb2xlLmxvZyhcIldlYnBhY2sgaW5pdCBjaGVja1wiKTsgXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25fZ2FtZVwiKTtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjdHgpOyBcblxufSk7Il0sIm5hbWVzIjpbIkdhbWUiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJjdHgiLCJnZXRDb250ZXh0IiwiZ2FtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Game; }\n/* harmony export */ });\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./level */ \"./src/scripts/level.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Game = /*#__PURE__*/function () {\n  function Game(ctx) {\n    _classCallCheck(this, Game);\n\n    this.ctx = ctx;\n    this.DIM_X = ctx.canvas.width;\n    this.DIM_Y = ctx.canvas.height; //1 tick per roughly 16ms.\n\n    this.TICK = 1000 / 16;\n    this.drawBackground();\n    var level = new _level__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n    this.level = level;\n    this.gameStart(this.TICK, this.DIM_Y, ctx);\n  }\n\n  _createClass(Game, [{\n    key: \"drawBackground\",\n    value: function drawBackground() {\n      this.ctx.globalCompositeOperation = 'destination-over';\n      this.ctx.fillStyle = \"white\";\n      this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);\n    } // Game, 60 ticks per second (roughly, not timing accurate). Put all necessary functions/logic per tick in here.\n\n  }, {\n    key: \"gameStart\",\n    value: function gameStart(TICK, game, ctx) {\n      //Do necessary functions to set up objects for next frame(ie updating positions, check collisions,etc)\n      setInterval(function () {\n        game.gameTick();\n      }, TICK); //Draw current frame\n\n      setInterval(function () {\n        game.draw(ctx);\n      }, TICK);\n    }\n  }, {\n    key: \"gameTick\",\n    value: function gameTick() {\n      this.moveObjects(); //Do checks\n\n      this.checkCollisions();\n    }\n  }, {\n    key: \"draw\",\n    value: function draw() {}\n  }, {\n    key: \"moveObjects\",\n    value: function moveObjects() {}\n  }, {\n    key: \"checkCollisions\",\n    value: function checkCollisions() {}\n  }]);\n\n  return Game;\n}();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9nYW1lLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQztBQUNqQixnQkFBWUMsR0FBWixFQUFnQjtBQUFBOztBQUNaLFNBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLEtBQUwsR0FBYUQsR0FBRyxDQUFDRSxNQUFKLENBQVdDLEtBQXhCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhSixHQUFHLENBQUNFLE1BQUosQ0FBV0csTUFBeEIsQ0FIWSxDQUlaOztBQUNBLFNBQUtDLElBQUwsR0FBWSxPQUFLLEVBQWpCO0FBQ0EsU0FBS0MsY0FBTDtBQUNBLFFBQU1DLEtBQUssR0FBRyxJQUFJViw4Q0FBSixDQUFVRSxHQUFWLENBQWQ7QUFDQSxTQUFLUSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxTQUFMLENBQWUsS0FBS0gsSUFBcEIsRUFBMEIsS0FBS0YsS0FBL0IsRUFBc0NKLEdBQXRDO0FBQ0g7Ozs7V0FFRCwwQkFBZ0I7QUFDWixXQUFLQSxHQUFMLENBQVNVLHdCQUFULEdBQW9DLGtCQUFwQztBQUNBLFdBQUtWLEdBQUwsQ0FBU1csU0FBVCxHQUFxQixPQUFyQjtBQUNBLFdBQUtYLEdBQUwsQ0FBU1ksUUFBVCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixLQUFLWCxLQUE3QixFQUFvQyxLQUFLRyxLQUF6QztBQUNILE1BRUQ7Ozs7V0FDQSxtQkFBVUUsSUFBVixFQUFnQk8sSUFBaEIsRUFBc0JiLEdBQXRCLEVBQTBCO0FBRXRCO0FBQ0FjLE1BQUFBLFdBQVcsQ0FBQyxZQUFVO0FBQ2xCRCxRQUFBQSxJQUFJLENBQUNFLFFBQUw7QUFDSCxPQUZVLEVBRVJULElBRlEsQ0FBWCxDQUhzQixDQU90Qjs7QUFDQVEsTUFBQUEsV0FBVyxDQUFDLFlBQVU7QUFDbEJELFFBQUFBLElBQUksQ0FBQ0csSUFBTCxDQUFVaEIsR0FBVjtBQUNILE9BRlUsRUFFUk0sSUFGUSxDQUFYO0FBR0g7OztXQUVELG9CQUFVO0FBQ04sV0FBS1csV0FBTCxHQURNLENBRU47O0FBQ0EsV0FBS0MsZUFBTDtBQUNIOzs7V0FFRCxnQkFBTSxDQUNMOzs7V0FFRCx1QkFBYSxDQUNaOzs7V0FFRCwyQkFBaUIsQ0FDaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9SaXNrLW9mLU1vb24vLi9zcmMvc2NyaXB0cy9nYW1lLmpzP2NkYzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExldmVsIGZyb20gXCIuL2xldmVsXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZXtcbiAgICBjb25zdHJ1Y3RvcihjdHgpe1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDsgXG4gICAgICAgIHRoaXMuRElNX1ggPSBjdHguY2FudmFzLndpZHRoO1xuICAgICAgICB0aGlzLkRJTV9ZID0gY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIC8vMSB0aWNrIHBlciByb3VnaGx5IDE2bXMuXG4gICAgICAgIHRoaXMuVElDSyA9IDEwMDAvMTY7XG4gICAgICAgIHRoaXMuZHJhd0JhY2tncm91bmQoKTtcbiAgICAgICAgY29uc3QgbGV2ZWwgPSBuZXcgTGV2ZWwoY3R4KTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB0aGlzLmdhbWVTdGFydCh0aGlzLlRJQ0ssIHRoaXMuRElNX1ksIGN0eCk7XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoKXtcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW92ZXInXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5ESU1fWCwgdGhpcy5ESU1fWSk7XG4gICAgfVxuXG4gICAgLy8gR2FtZSwgNjAgdGlja3MgcGVyIHNlY29uZCAocm91Z2hseSwgbm90IHRpbWluZyBhY2N1cmF0ZSkuIFB1dCBhbGwgbmVjZXNzYXJ5IGZ1bmN0aW9ucy9sb2dpYyBwZXIgdGljayBpbiBoZXJlLlxuICAgIGdhbWVTdGFydChUSUNLLCBnYW1lLCBjdHgpe1xuXG4gICAgICAgIC8vRG8gbmVjZXNzYXJ5IGZ1bmN0aW9ucyB0byBzZXQgdXAgb2JqZWN0cyBmb3IgbmV4dCBmcmFtZShpZSB1cGRhdGluZyBwb3NpdGlvbnMsIGNoZWNrIGNvbGxpc2lvbnMsZXRjKVxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZ2FtZS5nYW1lVGljaygpO1xuICAgICAgICB9LCBUSUNLKTtcbiAgICAgICAgXG4gICAgICAgIC8vRHJhdyBjdXJyZW50IGZyYW1lXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBnYW1lLmRyYXcoY3R4KTtcbiAgICAgICAgfSwgVElDSyk7XG4gICAgfVxuXG4gICAgZ2FtZVRpY2soKXtcbiAgICAgICAgdGhpcy5tb3ZlT2JqZWN0cygpO1xuICAgICAgICAvL0RvIGNoZWNrc1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9ucygpO1xuICAgIH1cblxuICAgIGRyYXcoKXtcbiAgICB9XG5cbiAgICBtb3ZlT2JqZWN0cygpe1xuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9ucygpe1xuICAgIH1cbn0iXSwibmFtZXMiOlsiTGV2ZWwiLCJHYW1lIiwiY3R4IiwiRElNX1giLCJjYW52YXMiLCJ3aWR0aCIsIkRJTV9ZIiwiaGVpZ2h0IiwiVElDSyIsImRyYXdCYWNrZ3JvdW5kIiwibGV2ZWwiLCJnYW1lU3RhcnQiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImdhbWUiLCJzZXRJbnRlcnZhbCIsImdhbWVUaWNrIiwiZHJhdyIsIm1vdmVPYmplY3RzIiwiY2hlY2tDb2xsaXNpb25zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/game.js\n");

/***/ }),

/***/ "./src/scripts/level.js":
/*!******************************!*\
  !*** ./src/scripts/level.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Level; }\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//Handle drawing specific level layout/backgrounds, enemy spawning, and level related events.\nvar Level = /*#__PURE__*/function () {\n  function Level(ctx) {\n    _classCallCheck(this, Level);\n\n    this.ctx = ctx;\n    this.DIM_X = ctx.canvas.width;\n    this.DIM_Y = ctx.canvas.height;\n    this.loadLevel();\n  }\n\n  _createClass(Level, [{\n    key: \"loadLevel\",\n    value: function loadLevel() {}\n  }]);\n\n  return Level;\n}();\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9sZXZlbC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFFcUJBO0FBQ2pCLGlCQUFZQyxHQUFaLEVBQWdCO0FBQUE7O0FBQ1osU0FBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhRCxHQUFHLENBQUNFLE1BQUosQ0FBV0MsS0FBeEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLEdBQUcsQ0FBQ0UsTUFBSixDQUFXRyxNQUF4QjtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7OztXQUVELHFCQUFXLENBRVYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9SaXNrLW9mLU1vb24vLi9zcmMvc2NyaXB0cy9sZXZlbC5qcz8wMWFhIl0sInNvdXJjZXNDb250ZW50IjpbIi8vSGFuZGxlIGRyYXdpbmcgc3BlY2lmaWMgbGV2ZWwgbGF5b3V0L2JhY2tncm91bmRzLCBlbmVteSBzcGF3bmluZywgYW5kIGxldmVsIHJlbGF0ZWQgZXZlbnRzLlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbCB7XG4gICAgY29uc3RydWN0b3IoY3R4KXtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7IFxuICAgICAgICB0aGlzLkRJTV9YID0gY3R4LmNhbnZhcy53aWR0aDtcbiAgICAgICAgdGhpcy5ESU1fWSA9IGN0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLmxvYWRMZXZlbCgpO1xuICAgIH1cblxuICAgIGxvYWRMZXZlbCgpe1xuICAgICAgICBcbiAgICB9XG59Il0sIm5hbWVzIjpbIkxldmVsIiwiY3R4IiwiRElNX1giLCJjYW52YXMiLCJ3aWR0aCIsIkRJTV9ZIiwiaGVpZ2h0IiwibG9hZExldmVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/level.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9SaXNrLW9mLU1vb24vLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;