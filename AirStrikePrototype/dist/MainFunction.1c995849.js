// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"Textures/floor.jpg":[function(require,module,exports) {
module.exports = "/floor.33debc88.jpg";
},{}],"Textures/LowerCannons.jpg":[function(require,module,exports) {
module.exports = "/LowerCannons.0d735e87.jpg";
},{}],"Textures/UpperCannons.jpg":[function(require,module,exports) {
module.exports = "/UpperCannons.054e3754.jpg";
},{}],"Textures/reside.jpg":[function(require,module,exports) {
module.exports = "/reside.1d2ccc9a.jpg";
},{}],"Textures/Track.jpg":[function(require,module,exports) {
module.exports = "/Track.dfdf929c.jpg";
},{}],"Textures/RotatingItem.jpg":[function(require,module,exports) {
module.exports = "/RotatingItem.4536e9f3.jpg";
},{}],"ModelsManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModelBufferCollection = getModelBufferCollection;
exports.GetTextureCollection = GetTextureCollection;

var _MainFunction = require("./MainFunction.js");

var _floor = _interopRequireDefault(require("./Textures/floor.jpg"));

var _LowerCannons = _interopRequireDefault(require("./Textures/LowerCannons.jpg"));

var _UpperCannons = _interopRequireDefault(require("./Textures/UpperCannons.jpg"));

var _reside = _interopRequireDefault(require("./Textures/reside.jpg"));

var _Track = _interopRequireDefault(require("./Textures/Track.jpg"));

var _RotatingItem = _interopRequireDefault(require("./Textures/RotatingItem.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Models Manager
//////////// - 模 型 管 理 器 - //////////////
//////////// - 模 型 管 理 器 - //////////////
//////////// - 模 型 管 理 器 - //////////////

/***
 * 模型管理器
 * 本管理器负责Parse OBJ文件/读取JSON文件（取决于是否提前将OBJ转化为JSON）
 * 本管理器还负责整理纹理，并提供创建纹理的函数
 * 本管理器输出的对象为模型Buffer的全体的对象（可以理解成一个指针吧）+ 纹理全体的对象，这个对象可以在CreateGenericObjects中绘制泛型模型的过程中，
 *      通过直接访问对象的字段名来访问模型的Buffer和Texture对象，并将其赋到模型的物体上。
 */
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// 读取模型 返回Buffers ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/***
 * 模型集
 * 返回一个对象，通过属性名来访问 / 通过数组来访问
 * 整合convert_obj_to_json.js
 * @param gl
 * @returns {{ExampleModel: {VertexBuffer: (AudioBuffer|WebGLBuffer), TextureBuffer: (AudioBuffer|WebGLBuffer), NormalBuffer: (AudioBuffer|WebGLBuffer), NumVertices: number}}}
 */
// Define OBJ path
console.log(_MainFunction.track); // Define Texture path

function getModelBufferCollection(gl) {
  var envModel = getModelFromOBJ(_MainFunction.env);
  var loCannonsModel = getModelFromOBJ(_MainFunction.loCannons);
  var upCannonsModel = getModelFromOBJ(_MainFunction.upCannons);
  var resideModel = getModelFromOBJ(_MainFunction.reside);
  var trackModel = getModelFromOBJ(_MainFunction.track);
  var rotatingItemModel = getModelFromOBJ(_MainFunction.rotatingItem);
  var loCannonsBuffer = getModelBuffer(gl, loCannonsModel);
  var upCannonsBuffer = getModelBuffer(gl, upCannonsModel);
  var resideBuffer = getModelBuffer(gl, resideModel);
  var trackBuffer = getModelBuffer(gl, trackModel);
  var rotatingItemBuffer = getModelBuffer(gl, rotatingItemModel); // console.log(envModel)

  var env_buffer = getModelBuffer(gl, envModel);
  return {
    envModelbuffer: env_buffer,
    loCannonsBuffer: loCannonsBuffer,
    upCannonsBuffer: upCannonsBuffer,
    resideBuffer: resideBuffer,
    trackBuffer: trackBuffer,
    rotatingItemBuffer: rotatingItemBuffer
  };
}
/***
 * 根据模型数组对象建立Buffer
 * @param gl
 * @param Model     Model对象是由`function getModelFromOBJ(path)`生成的
 * @returns {{VertexBuffer: AudioBuffer | WebGLBuffer, TextureBuffer: AudioBuffer | WebGLBuffer, NormalBuffer: AudioBuffer | WebGLBuffer, NumVertices: number}}
 * 返回的是Buffer对象
 */


function getModelBuffer(gl, Model) {
  var VertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.vertexPos), gl.STATIC_DRAW);
  var TextureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, TextureBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.textureUV), gl.STATIC_DRAW); // console.log(Model.textureUV)

  var NormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, NormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Model.normalVec), gl.STATIC_DRAW);
  return {
    VertexBuffer: VertexBuffer,
    TextureBuffer: TextureBuffer,
    NormalBuffer: NormalBuffer,
    NumVertices: Model.numVertices
  };
} // 此函数是生成数组并提取 而非生成buffer


function getModelFromOBJ(Model) {
  // console.log(Model);
  return {
    vertexPos: Model.vertex,
    textureUV: Model.uv,
    normalVec: Model.normal,
    numVertices: Model.vertex.length
  };
} /////////////////////////////////////////////////////////////////////////////////////
//////////////////// 纹理管理器：读取纹理贴图 生成Texture对象 ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


function GetTextureCollection(gl) {
  // 手动添加需要用到的纹理贴图
  var textureEnv = initTexture(gl, _floor.default);
  var textureLoCannons = initTexture(gl, _LowerCannons.default);
  var textureUpCannons = initTexture(gl, _UpperCannons.default);
  var textureReside = initTexture(gl, _reside.default);
  var textureTrack = initTexture(gl, _Track.default);
  var textureRotatingItem = initTexture(gl, _RotatingItem.default);
  return {
    envTextureBuffer: textureEnv,
    LoCannons: textureLoCannons,
    UpCannons: textureUpCannons,
    Reside: textureReside,
    Track: textureTrack,
    RotatingItem: textureRotatingItem
  };
} // 初始化图片为texture对象
// 返会texture


function initTexture(gl, url) {
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  var level = 0;
  var internalFormat = gl.RGBA;
  var width = 1;
  var height = 1;
  var border = 0;
  var srcFormat = gl.RGBA;
  var srcType = gl.UNSIGNED_BYTE;
  var pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue

  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
  var image = new Image();

  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);

    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn of mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };

  image.src = url;
  return texture;
}

function isPowerOf2(value) {
  return (value & value - 1) == 0;
}
},{"./MainFunction.js":"MainFunction.js","./Textures/floor.jpg":"Textures/floor.jpg","./Textures/LowerCannons.jpg":"Textures/LowerCannons.jpg","./Textures/UpperCannons.jpg":"Textures/UpperCannons.jpg","./Textures/reside.jpg":"Textures/reside.jpg","./Textures/Track.jpg":"Textures/Track.jpg","./Textures/RotatingItem.jpg":"Textures/RotatingItem.jpg"}],"gl-matrix.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.0.0-0

Copyright (c) 2015-2019, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : factory(global.glMatrix = {});
})(this, function (exports) {
  'use strict';
  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants

  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  var RANDOM = Math.random;
  /**
   * Sets the type of array used when creating new vectors and matrices
   *
   * @param {Type} type Array type, such as Float32Array or Array
   */

  function setMatrixArrayType(type) {
    ARRAY_TYPE = type;
  }

  var degree = Math.PI / 180;
  /**
   * Convert Degree To Radian
   *
   * @param {Number} a Angle in Degrees
   */

  function toRadian(a) {
    return a * degree;
  }
  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   *
   * @param {Number} a The first number to test.
   * @param {Number} b The second number to test.
   * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
   */


  function equals(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
  }

  var common =
  /*#__PURE__*/
  Object.freeze({
    EPSILON: EPSILON,

    get ARRAY_TYPE() {
      return ARRAY_TYPE;
    },

    RANDOM: RANDOM,
    setMatrixArrayType: setMatrixArrayType,
    toRadian: toRadian,
    equals: equals
  });
  /**
   * 2x2 Matrix
   * @module mat2
   */

  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */

  function create() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {mat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */


  function clone(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Copy the values from one mat2 to another
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */


  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} out the receiving matrix
   * @returns {mat2} out
   */


  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Create a new mat2 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out A new 2x2 matrix
   */


  function fromValues(m00, m01, m10, m11) {
    var out = new ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Set the components of a mat2 to the given values
   *
   * @param {mat2} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out
   */


  function set(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Transpose the values of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */


  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
      var a1 = a[1];
      out[1] = a[2];
      out[2] = a1;
    } else {
      out[0] = a[0];
      out[1] = a[2];
      out[2] = a[1];
      out[3] = a[3];
    }

    return out;
  }
  /**
   * Inverts a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */


  function invert(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3]; // Calculate the determinant

    var det = a0 * a3 - a2 * a1;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the source matrix
   * @returns {mat2} out
   */


  function adjoint(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
  }
  /**
   * Calculates the determinant of a mat2
   *
   * @param {mat2} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant(a) {
    return a[0] * a[3] - a[2] * a[1];
  }
  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */


  function multiply(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
  }
  /**
   * Rotates a mat2 by the given angle
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */


  function rotate(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
  }
  /**
   * Scales the mat2 by the dimensions in the given vec2
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2} out
   **/


  function scale(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */


  function fromRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, vec);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2} out
   */


  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2
   *
   * @param {mat2} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str(a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }
  /**
   * Returns Frobenius norm of a mat2
   *
   * @param {mat2} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
  }
  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {mat2} L the lower triangular matrix
   * @param {mat2} D the diagonal matrix
   * @param {mat2} U the upper triangular matrix
   * @param {mat2} a the input matrix to factorize
   */


  function LDU(L, D, U, a) {
    L[2] = a[2] / a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
  }
  /**
   * Adds two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */


  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @returns {mat2} out
   */


  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2} a The first matrix.
   * @param {mat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals$1(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2} out the receiving matrix
   * @param {mat2} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2} out
   */


  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two mat2's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2} out the receiving vector
   * @param {mat2} a the first operand
   * @param {mat2} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2} out
   */


  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Alias for {@link mat2.multiply}
   * @function
   */


  var mul = multiply;
  /**
   * Alias for {@link mat2.subtract}
   * @function
   */

  var sub = subtract;
  var mat2 =
  /*#__PURE__*/
  Object.freeze({
    create: create,
    clone: clone,
    copy: copy,
    identity: identity,
    fromValues: fromValues,
    set: set,
    transpose: transpose,
    invert: invert,
    adjoint: adjoint,
    determinant: determinant,
    multiply: multiply,
    rotate: rotate,
    scale: scale,
    fromRotation: fromRotation,
    fromScaling: fromScaling,
    str: str,
    frob: frob,
    LDU: LDU,
    add: add,
    subtract: subtract,
    exactEquals: exactEquals,
    equals: equals$1,
    multiplyScalar: multiplyScalar,
    multiplyScalarAndAdd: multiplyScalarAndAdd,
    mul: mul,
    sub: sub
  });
  /**
   * 2x3 Matrix
   * @module mat2d
   *
   * @description
   * A mat2d contains six elements defined as:
   * <pre>
   * [a, c, tx,
   *  b, d, ty]
   * </pre>
   * This is a short form for the 3x3 matrix:
   * <pre>
   * [a, c, tx,
   *  b, d, ty,
   *  0, 0, 1]
   * </pre>
   * The last row is ignored so the array is shorter and operations are faster.
   */

  /**
   * Creates a new identity mat2d
   *
   * @returns {mat2d} a new 2x3 matrix
   */

  function create$1() {
    var out = new ARRAY_TYPE(6);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[4] = 0;
      out[5] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2d initialized with values from an existing matrix
   *
   * @param {mat2d} a matrix to clone
   * @returns {mat2d} a new 2x3 matrix
   */


  function clone$1(a) {
    var out = new ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Copy the values from one mat2d to another
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */


  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Set a mat2d to the identity matrix
   *
   * @param {mat2d} out the receiving matrix
   * @returns {mat2d} out
   */


  function identity$1(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Create a new mat2d with the given values
   *
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} A new mat2d
   */


  function fromValues$1(a, b, c, d, tx, ty) {
    var out = new ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Set the components of a mat2d to the given values
   *
   * @param {mat2d} out the receiving matrix
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} out
   */


  function set$1(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Inverts a mat2d
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the source matrix
   * @returns {mat2d} out
   */


  function invert$1(out, a) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3];
    var atx = a[4],
        aty = a[5];
    var det = aa * ad - ab * ac;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
  }
  /**
   * Calculates the determinant of a mat2d
   *
   * @param {mat2d} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant$1(a) {
    return a[0] * a[3] - a[1] * a[2];
  }
  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */


  function multiply$1(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }
  /**
   * Rotates a mat2d by the given angle
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */


  function rotate$1(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Scales the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat2d} out
   **/


  function scale$1(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Translates the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to translate
   * @param {vec2} v the vec2 to translate the matrix by
   * @returns {mat2d} out
   **/


  function translate(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.rotate(dest, dest, rad);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */


  function fromRotation$1(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.scale(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat2d} out
   */


  function fromScaling$1(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.translate(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat2d} out
   */


  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2d
   *
   * @param {mat2d} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str$1(a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
  }
  /**
   * Returns Frobenius norm of a mat2d
   *
   * @param {mat2d} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob$1(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
  }
  /**
   * Adds two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */


  function add$1(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @returns {mat2d} out
   */


  function subtract$1(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2d} out the receiving matrix
   * @param {mat2d} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2d} out
   */


  function multiplyScalar$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
  }
  /**
   * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2d} out the receiving vector
   * @param {mat2d} a the first operand
   * @param {mat2d} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2d} out
   */


  function multiplyScalarAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals$1(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat2d} a The first matrix.
   * @param {mat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals$2(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
  }
  /**
   * Alias for {@link mat2d.multiply}
   * @function
   */


  var mul$1 = multiply$1;
  /**
   * Alias for {@link mat2d.subtract}
   * @function
   */

  var sub$1 = subtract$1;
  var mat2d =
  /*#__PURE__*/
  Object.freeze({
    create: create$1,
    clone: clone$1,
    copy: copy$1,
    identity: identity$1,
    fromValues: fromValues$1,
    set: set$1,
    invert: invert$1,
    determinant: determinant$1,
    multiply: multiply$1,
    rotate: rotate$1,
    scale: scale$1,
    translate: translate,
    fromRotation: fromRotation$1,
    fromScaling: fromScaling$1,
    fromTranslation: fromTranslation,
    str: str$1,
    frob: frob$1,
    add: add$1,
    subtract: subtract$1,
    multiplyScalar: multiplyScalar$1,
    multiplyScalarAndAdd: multiplyScalarAndAdd$1,
    exactEquals: exactEquals$1,
    equals: equals$2,
    mul: mul$1,
    sub: sub$1
  });
  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create$2() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {mat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */


  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @param {mat3} a matrix to clone
   * @returns {mat3} a new 3x3 matrix
   */


  function clone$2(a) {
    var out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */


  function copy$2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Create a new mat3 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} A new mat3
   */


  function fromValues$2(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} out
   */


  function set$2(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */


  function identity$2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */


  function transpose$1(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }

    return out;
  }
  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */


  function invert$2(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the source matrix
   * @returns {mat3} out
   */


  function adjoint$1(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  /**
   * Calculates the determinant of a mat3
   *
   * @param {mat3} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant$2(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */


  function multiply$2(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    var b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    var b20 = b[6],
        b21 = b[7],
        b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to translate
   * @param {vec2} v vector to translate by
   * @returns {mat3} out
   */


  function translate$1(out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */


  function rotate$2(out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to rotate
   * @param {vec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/


  function scale$2(out, a, v) {
    var x = v[0],
        y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Translation vector
   * @returns {mat3} out
   */


  function fromTranslation$1(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */


  function fromRotation$2(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {vec2} v Scaling vector
   * @returns {mat3} out
   */


  function fromScaling$2(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the values from a mat2d into a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {mat2d} a the matrix to copy
   * @returns {mat3} out
   **/


  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  /**
  * Calculates a 3x3 matrix from the given quaternion
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {quat} q Quaternion to create matrix from
  *
  * @returns {mat3} out
  */


  function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  /**
  * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
  *
  * @param {mat3} out mat3 receiving operation result
  * @param {mat4} a Mat4 to derive the normal matrix from
  *
  * @returns {mat3} out
  */


  function normalFromMat4(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  /**
   * Generates a 2D projection matrix with the given bounds
   *
   * @param {mat3} out mat3 frustum matrix will be written into
   * @param {number} width Width of your gl context
   * @param {number} height Height of gl context
   * @returns {mat3} out
   */


  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat3
   *
   * @param {mat3} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str$2(a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
  }
  /**
   * Returns Frobenius norm of a mat3
   *
   * @param {mat3} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob$2(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
  }
  /**
   * Adds two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */


  function add$2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @returns {mat3} out
   */


  function subtract$2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat3} out the receiving matrix
   * @param {mat3} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat3} out
   */


  function multiplyScalar$2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  /**
   * Adds two mat3's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat3} out the receiving vector
   * @param {mat3} a the first operand
   * @param {mat3} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat3} out
   */


  function multiplyScalarAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat3} a The first matrix.
   * @param {mat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals$2(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat3} a The first matrix.
   * @param {mat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals$3(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
  }
  /**
   * Alias for {@link mat3.multiply}
   * @function
   */


  var mul$2 = multiply$2;
  /**
   * Alias for {@link mat3.subtract}
   * @function
   */

  var sub$2 = subtract$2;
  var mat3 =
  /*#__PURE__*/
  Object.freeze({
    create: create$2,
    fromMat4: fromMat4,
    clone: clone$2,
    copy: copy$2,
    fromValues: fromValues$2,
    set: set$2,
    identity: identity$2,
    transpose: transpose$1,
    invert: invert$2,
    adjoint: adjoint$1,
    determinant: determinant$2,
    multiply: multiply$2,
    translate: translate$1,
    rotate: rotate$2,
    scale: scale$2,
    fromTranslation: fromTranslation$1,
    fromRotation: fromRotation$2,
    fromScaling: fromScaling$2,
    fromMat2d: fromMat2d,
    fromQuat: fromQuat,
    normalFromMat4: normalFromMat4,
    projection: projection,
    str: str$2,
    frob: frob$2,
    add: add$2,
    subtract: subtract$2,
    multiplyScalar: multiplyScalar$2,
    multiplyScalarAndAdd: multiplyScalarAndAdd$2,
    exactEquals: exactEquals$2,
    equals: equals$3,
    mul: mul$2,
    sub: sub$2
  });
  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$3() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {mat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */


  function clone$3(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */


  function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */


  function fromValues$3(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */


  function set$3(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */


  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */


  function transpose$2(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a12 = a[6],
          a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */


  function invert$3(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */


  function adjoint$2(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  /**
   * Calculates the determinant of a mat4
   *
   * @param {mat4} a the source matrix
   * @returns {Number} determinant of a
   */


  function determinant$3(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */


  function multiply$3(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */


  function translate$2(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/


  function scale$3(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */


  function rotate$3(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateX(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateY(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function rotateZ(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */


  function fromTranslation$2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {vec3} v Scaling vector
   * @returns {mat4} out
   */


  function fromScaling$3(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */


  function fromRotation$3(out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    var s, c, t;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */


  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @returns {mat4} out
   */


  function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 from a dual quat.
   *
   * @param {mat4} out Matrix
   * @param {quat2} a Dual Quaternion
   * @returns {mat4} mat4 receiving operation result
   */


  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }

    fromRotationTranslation(out, a, translation);
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */


  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {mat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */


  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
    out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
    out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {mat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */


  function getRotation(out, mat) {
    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    var trace = mat[0] + mat[5] + mat[10];
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (mat[6] - mat[9]) / S;
      out[1] = (mat[8] - mat[2]) / S;
      out[2] = (mat[1] - mat[4]) / S;
    } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
      S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
      out[3] = (mat[6] - mat[9]) / S;
      out[0] = 0.25 * S;
      out[1] = (mat[1] + mat[4]) / S;
      out[2] = (mat[8] + mat[2]) / S;
    } else if (mat[5] > mat[10]) {
      S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
      out[3] = (mat[8] - mat[2]) / S;
      out[0] = (mat[1] + mat[4]) / S;
      out[1] = 0.25 * S;
      out[2] = (mat[6] + mat[9]) / S;
    } else {
      S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
      out[3] = (mat[1] - mat[4]) / S;
      out[0] = (mat[8] + mat[2]) / S;
      out[1] = (mat[6] + mat[9]) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @returns {mat4} out
   */


  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {vec3} v Translation vector
   * @param {vec3} s Scaling vector
   * @param {vec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */


  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */


  function fromQuat$1(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */


  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */


  function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */


  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity$3(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */


  function targetTo(out, eye, target, up) {
    var eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];
    var z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];
    var len = z0 * z0 + z1 * z1 + z2 * z2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    var x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat4
   *
   * @param {mat4} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */


  function str$3(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
  }
  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {mat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */


  function frob$3(a) {
    return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
  }
  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */


  function add$3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */


  function subtract$3(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */


  function multiplyScalar$3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */


  function multiplyScalarAndAdd$3(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function exactEquals$3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {mat4} a The first matrix.
   * @param {mat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */


  function equals$4(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11];
    var a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    var b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    var b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11];
    var b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
  }
  /**
   * Alias for {@link mat4.multiply}
   * @function
   */


  var mul$3 = multiply$3;
  /**
   * Alias for {@link mat4.subtract}
   * @function
   */

  var sub$3 = subtract$3;
  var mat4 =
  /*#__PURE__*/
  Object.freeze({
    create: create$3,
    clone: clone$3,
    copy: copy$3,
    fromValues: fromValues$3,
    set: set$3,
    identity: identity$3,
    transpose: transpose$2,
    invert: invert$3,
    adjoint: adjoint$2,
    determinant: determinant$3,
    multiply: multiply$3,
    translate: translate$2,
    scale: scale$3,
    rotate: rotate$3,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    fromTranslation: fromTranslation$2,
    fromScaling: fromScaling$3,
    fromRotation: fromRotation$3,
    fromXRotation: fromXRotation,
    fromYRotation: fromYRotation,
    fromZRotation: fromZRotation,
    fromRotationTranslation: fromRotationTranslation,
    fromQuat2: fromQuat2,
    getTranslation: getTranslation,
    getScaling: getScaling,
    getRotation: getRotation,
    fromRotationTranslationScale: fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
    fromQuat: fromQuat$1,
    frustum: frustum,
    perspective: perspective,
    perspectiveFromFieldOfView: perspectiveFromFieldOfView,
    ortho: ortho,
    lookAt: lookAt,
    targetTo: targetTo,
    str: str$3,
    frob: frob$3,
    add: add$3,
    subtract: subtract$3,
    multiplyScalar: multiplyScalar$3,
    multiplyScalarAndAdd: multiplyScalarAndAdd$3,
    exactEquals: exactEquals$3,
    equals: equals$4,
    mul: mul$3,
    sub: sub$3
  });
  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$4() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {vec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */


  function clone$4(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */


  function fromValues$4(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the source vector
   * @returns {vec3} out
   */


  function copy$4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */


  function set$4(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function add$4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function subtract$4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function multiply$4(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  /**
   * Math.ceil the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to ceil
   * @returns {vec3} out
   */


  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  /**
   * Math.floor the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to floor
   * @returns {vec3} out
   */


  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  /**
   * Returns the minimum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  /**
   * Returns the maximum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  /**
   * Math.round the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to round
   * @returns {vec3} out
   */


  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */


  function scale$4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */


  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Calculates the squared length of a vec3
   *
   * @param {vec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to negate
   * @returns {vec3} out
   */


  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to invert
   * @returns {vec3} out
   */


  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */


  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */


  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  /**
   * Performs a hermite interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Performs a bezier interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {vec3} c the third operand
   * @param {vec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */


  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec3} out
   */


  function random(out, scale) {
    scale = scale || 1.0;
    var r = RANDOM() * 2.0 * Math.PI;
    var z = RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
  }
  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec3} out
   */


  function transformMat4(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {mat3} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */


  function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */


  function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */


  function rotateX$1(out, a, b, c) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0];
    r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
    r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */


  function rotateY$1(out, a, b, c) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {vec3} a The vec3 point to rotate
   * @param {vec3} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec3} out
   */


  function rotateZ$1(out, a, b, c) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
    r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
    r[2] = p[2]; //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Get the angle between two 3D vectors
   * @param {vec3} a The first operand
   * @param {vec3} b The second operand
   * @returns {Number} The angle in radians
   */


  function angle(a, b) {
    var tempA = fromValues$4(a[0], a[1], a[2]);
    var tempB = fromValues$4(b[0], b[1], b[2]);
    normalize(tempA, tempA);
    normalize(tempB, tempB);
    var cosine = dot(tempA, tempB);

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }
  /**
   * Set the components of a vec3 to zero
   *
   * @param {vec3} out the receiving vector
   * @returns {vec3} out
   */


  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {vec3} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str$4(a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals$4(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec3} a The first vector.
   * @param {vec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals$5(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
  }
  /**
   * Alias for {@link vec3.subtract}
   * @function
   */


  var sub$4 = subtract$4;
  /**
   * Alias for {@link vec3.multiply}
   * @function
   */

  var mul$4 = multiply$4;
  /**
   * Alias for {@link vec3.divide}
   * @function
   */

  var div = divide;
  /**
   * Alias for {@link vec3.distance}
   * @function
   */

  var dist = distance;
  /**
   * Alias for {@link vec3.squaredDistance}
   * @function
   */

  var sqrDist = squaredDistance;
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  var len = length;
  /**
   * Alias for {@link vec3.squaredLength}
   * @function
   */

  var sqrLen = squaredLength;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create$4();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  var vec3 =
  /*#__PURE__*/
  Object.freeze({
    create: create$4,
    clone: clone$4,
    length: length,
    fromValues: fromValues$4,
    copy: copy$4,
    set: set$4,
    add: add$4,
    subtract: subtract$4,
    multiply: multiply$4,
    divide: divide,
    ceil: ceil,
    floor: floor,
    min: min,
    max: max,
    round: round,
    scale: scale$4,
    scaleAndAdd: scaleAndAdd,
    distance: distance,
    squaredDistance: squaredDistance,
    squaredLength: squaredLength,
    negate: negate,
    inverse: inverse,
    normalize: normalize,
    dot: dot,
    cross: cross,
    lerp: lerp,
    hermite: hermite,
    bezier: bezier,
    random: random,
    transformMat4: transformMat4,
    transformMat3: transformMat3,
    transformQuat: transformQuat,
    rotateX: rotateX$1,
    rotateY: rotateY$1,
    rotateZ: rotateZ$1,
    angle: angle,
    zero: zero,
    str: str$4,
    exactEquals: exactEquals$4,
    equals: equals$5,
    sub: sub$4,
    mul: mul$4,
    div: div,
    dist: dist,
    sqrDist: sqrDist,
    len: len,
    sqrLen: sqrLen,
    forEach: forEach
  });
  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$5() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */


  function clone$5(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */


  function fromValues$5(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */


  function copy$5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */


  function set$5(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function add$5(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function subtract$5(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function multiply$5(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
  }
  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function divide$1(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
  }
  /**
   * Math.ceil the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to ceil
   * @returns {vec4} out
   */


  function ceil$1(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
  }
  /**
   * Math.floor the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to floor
   * @returns {vec4} out
   */


  function floor$1(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
  }
  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function min$1(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
  }
  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {vec4} out
   */


  function max$1(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
  }
  /**
   * Math.round the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to round
   * @returns {vec4} out
   */


  function round$1(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
  }
  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */


  function scale$5(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */


  function scaleAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance$1(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance$1(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Calculates the length of a vec4
   *
   * @param {vec4} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length$1(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * Calculates the squared length of a vec4
   *
   * @param {vec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength$1(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to negate
   * @returns {vec4} out
   */


  function negate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to invert
   * @returns {vec4} out
   */


  function inverse$1(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */


  function normalize$1(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec4's
   *
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot$1(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  /**
   * Returns the cross-product of three vectors in a 4-dimensional space
   *
   * @param {vec4} result the receiving vector
   * @param {vec4} U the first vector
   * @param {vec4} V the second vector
   * @param {vec4} W the third vector
   * @returns {vec4} result
   */


  function cross$1(out, u, v, w) {
    var A = v[0] * w[1] - v[1] * w[0],
        B = v[0] * w[2] - v[2] * w[0],
        C = v[0] * w[3] - v[3] * w[0],
        D = v[1] * w[2] - v[2] * w[1],
        E = v[1] * w[3] - v[3] * w[1],
        F = v[2] * w[3] - v[3] * w[2];
    var G = u[0];
    var H = u[1];
    var I = u[2];
    var J = u[3];
    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */


  function lerp$1(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec4} out
   */


  function random$1(out, scale) {
    scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;

    var v1, v2, v3, v4;
    var s1, s2;

    do {
      v1 = RANDOM() * 2 - 1;
      v2 = RANDOM() * 2 - 1;
      s1 = v1 * v1 + v2 * v2;
    } while (s1 >= 1);

    do {
      v3 = RANDOM() * 2 - 1;
      v4 = RANDOM() * 2 - 1;
      s2 = v3 * v3 + v4 * v4;
    } while (s2 >= 1);

    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale * v1;
    out[1] = scale * v2;
    out[2] = scale * v3 * d;
    out[3] = scale * v4 * d;
    return out;
  }
  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec4} out
   */


  function transformMat4$1(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec4} out
   */


  function transformQuat$1(out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3]; // calculate quat * vec

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to zero
   *
   * @param {vec4} out the receiving vector
   * @returns {vec4} out
   */


  function zero$1(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {vec4} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str$5(a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals$5(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec4} a The first vector.
   * @param {vec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals$6(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Alias for {@link vec4.subtract}
   * @function
   */


  var sub$5 = subtract$5;
  /**
   * Alias for {@link vec4.multiply}
   * @function
   */

  var mul$5 = multiply$5;
  /**
   * Alias for {@link vec4.divide}
   * @function
   */

  var div$1 = divide$1;
  /**
   * Alias for {@link vec4.distance}
   * @function
   */

  var dist$1 = distance$1;
  /**
   * Alias for {@link vec4.squaredDistance}
   * @function
   */

  var sqrDist$1 = squaredDistance$1;
  /**
   * Alias for {@link vec4.length}
   * @function
   */

  var len$1 = length$1;
  /**
   * Alias for {@link vec4.squaredLength}
   * @function
   */

  var sqrLen$1 = squaredLength$1;
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$5();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  var vec4 =
  /*#__PURE__*/
  Object.freeze({
    create: create$5,
    clone: clone$5,
    fromValues: fromValues$5,
    copy: copy$5,
    set: set$5,
    add: add$5,
    subtract: subtract$5,
    multiply: multiply$5,
    divide: divide$1,
    ceil: ceil$1,
    floor: floor$1,
    min: min$1,
    max: max$1,
    round: round$1,
    scale: scale$5,
    scaleAndAdd: scaleAndAdd$1,
    distance: distance$1,
    squaredDistance: squaredDistance$1,
    length: length$1,
    squaredLength: squaredLength$1,
    negate: negate$1,
    inverse: inverse$1,
    normalize: normalize$1,
    dot: dot$1,
    cross: cross$1,
    lerp: lerp$1,
    random: random$1,
    transformMat4: transformMat4$1,
    transformQuat: transformQuat$1,
    zero: zero$1,
    str: str$5,
    exactEquals: exactEquals$5,
    equals: equals$6,
    sub: sub$5,
    mul: mul$5,
    div: div$1,
    dist: dist$1,
    sqrDist: sqrDist$1,
    len: len$1,
    sqrLen: sqrLen$1,
    forEach: forEach$1
  });
  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$6() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */


  function identity$4(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/


  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Gets the rotation axis and angle for a given
   *  quaternion. If a quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @param  {vec3} out_axis  Vector receiving the axis of rotation
   * @param  {quat} q     Quaternion to be decomposed
   * @return {Number}     Angle, in radians, of the rotation
   */


  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);

    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }

    return rad;
  }
  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   */


  function multiply$6(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateX$2(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateY$2(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var by = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {quat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */


  function rotateZ$2(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bz = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate W component of
   * @returns {quat} out
   */


  function calculateW(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */


  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Generates a random quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */


  function random$2(out) {
    // Implementation of http://planning.cs.uiuc.edu/node198.html
    // TODO: Calling random 3 times is probably not the fastest solution
    var u1 = RANDOM();
    var u2 = RANDOM();
    var u3 = RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
    return out;
  }
  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate inverse of
   * @returns {quat} out
   */


  function invert$4(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var dot$$1 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot$$1 ? 1.0 / dot$$1 : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quat to calculate conjugate of
   * @returns {quat} out
   */


  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */


  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a quaternion from the given euler angle x, y, z.
   *
   * @param {quat} out the receiving quaternion
   * @param {x} Angle to rotate around X axis in degrees.
   * @param {y} Angle to rotate around Y axis in degrees.
   * @param {z} Angle to rotate around Z axis in degrees.
   * @returns {quat} out
   * @function
   */


  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  /**
   * Returns a string representation of a quatenion
   *
   * @param {quat} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str$6(a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */


  var clone$6 = clone$5;
  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */

  var fromValues$6 = fromValues$5;
  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the source quaternion
   * @returns {quat} out
   * @function
   */

  var copy$6 = copy$5;
  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */

  var set$6 = set$5;
  /**
   * Adds two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {quat} out
   * @function
   */

  var add$6 = add$5;
  /**
   * Alias for {@link quat.multiply}
   * @function
   */

  var mul$6 = multiply$6;
  /**
   * Scales a quat by a scalar number
   *
   * @param {quat} out the receiving vector
   * @param {quat} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {quat} out
   * @function
   */

  var scale$6 = scale$5;
  /**
   * Calculates the dot product of two quat's
   *
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */

  var dot$2 = dot$1;
  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   * @function
   */

  var lerp$2 = lerp$1;
  /**
   * Calculates the length of a quat
   *
   * @param {quat} a vector to calculate length of
   * @returns {Number} length of a
   */

  var length$2 = length$1;
  /**
   * Alias for {@link quat.length}
   * @function
   */

  var len$2 = length$2;
  /**
   * Calculates the squared length of a quat
   *
   * @param {quat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  var squaredLength$2 = squaredLength$1;
  /**
   * Alias for {@link quat.squaredLength}
   * @function
   */

  var sqrLen$2 = squaredLength$2;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  var normalize$2 = normalize$1;
  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat} a The first quaternion.
   * @param {quat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  var exactEquals$6 = exactEquals$5;
  /**
   * Returns whether or not the quaternions have approximately the same elements in the same position.
   *
   * @param {quat} a The first vector.
   * @param {quat} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  var equals$7 = equals$6;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */

  var rotationTo = function () {
    var tmpvec3 = create$4();
    var xUnitVec3 = fromValues$4(1, 0, 0);
    var yUnitVec3 = fromValues$4(0, 1, 0);
    return function (out, a, b) {
      var dot$$1 = dot(a, b);

      if (dot$$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$$1;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */


  var sqlerp = function () {
    var temp1 = create$6();
    var temp2 = create$6();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */


  var setAxes = function () {
    var matr = create$2();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  var quat =
  /*#__PURE__*/
  Object.freeze({
    create: create$6,
    identity: identity$4,
    setAxisAngle: setAxisAngle,
    getAxisAngle: getAxisAngle,
    multiply: multiply$6,
    rotateX: rotateX$2,
    rotateY: rotateY$2,
    rotateZ: rotateZ$2,
    calculateW: calculateW,
    slerp: slerp,
    random: random$2,
    invert: invert$4,
    conjugate: conjugate,
    fromMat3: fromMat3,
    fromEuler: fromEuler,
    str: str$6,
    clone: clone$6,
    fromValues: fromValues$6,
    copy: copy$6,
    set: set$6,
    add: add$6,
    mul: mul$6,
    scale: scale$6,
    dot: dot$2,
    lerp: lerp$2,
    length: length$2,
    len: len$2,
    squaredLength: squaredLength$2,
    sqrLen: sqrLen$2,
    normalize: normalize$2,
    exactEquals: exactEquals$6,
    equals: equals$7,
    rotationTo: rotationTo,
    sqlerp: sqlerp,
    setAxes: setAxes
  });
  /**
   * Dual Quaternion<br>
   * Format: [real, dual]<br>
   * Quaternion format: XYZW<br>
   * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
   * @module quat2
   */

  /**
   * Creates a new identity dual quat
   *
   * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
   */

  function create$7() {
    var dq = new ARRAY_TYPE(8);

    if (ARRAY_TYPE != Float32Array) {
      dq[0] = 0;
      dq[1] = 0;
      dq[2] = 0;
      dq[4] = 0;
      dq[5] = 0;
      dq[6] = 0;
      dq[7] = 0;
    }

    dq[3] = 1;
    return dq;
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {quat2} a dual quaternion to clone
   * @returns {quat2} new dual quaternion
   * @function
   */


  function clone$7(a) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = a[0];
    dq[1] = a[1];
    dq[2] = a[2];
    dq[3] = a[3];
    dq[4] = a[4];
    dq[5] = a[5];
    dq[6] = a[6];
    dq[7] = a[7];
    return dq;
  }
  /**
   * Creates a new dual quat initialized with the given values
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} new dual quaternion
   * @function
   */


  function fromValues$7(x1, y1, z1, w1, x2, y2, z2, w2) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    dq[4] = x2;
    dq[5] = y2;
    dq[6] = z2;
    dq[7] = w2;
    return dq;
  }
  /**
   * Creates a new dual quat from the given values (quat and translation)
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component (translation)
   * @param {Number} y2 Y component (translation)
   * @param {Number} z2 Z component (translation)
   * @returns {quat2} new dual quaternion
   * @function
   */


  function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    var ax = x2 * 0.5,
        ay = y2 * 0.5,
        az = z2 * 0.5;
    dq[4] = ax * w1 + ay * z1 - az * y1;
    dq[5] = ay * w1 + az * x1 - ax * z1;
    dq[6] = az * w1 + ax * y1 - ay * x1;
    dq[7] = -ax * x1 - ay * y1 - az * z1;
    return dq;
  }
  /**
   * Creates a dual quat from a quaternion and a translation
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {quat} q quaternion
   * @param {vec3} t tranlation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromRotationTranslation$1(out, q, t) {
    var ax = t[0] * 0.5,
        ay = t[1] * 0.5,
        az = t[2] * 0.5,
        bx = q[0],
        by = q[1],
        bz = q[2],
        bw = q[3];
    out[0] = bx;
    out[1] = by;
    out[2] = bz;
    out[3] = bw;
    out[4] = ax * bw + ay * bz - az * by;
    out[5] = ay * bw + az * bx - ax * bz;
    out[6] = az * bw + ax * by - ay * bx;
    out[7] = -ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Creates a dual quat from a translation
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {vec3} t translation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromTranslation$3(out, t) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = t[0] * 0.5;
    out[5] = t[1] * 0.5;
    out[6] = t[2] * 0.5;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a dual quat from a quaternion
   *
   * @param {quat2} dual quaternion receiving operation result
   * @param {quat} q the quaternion
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */


  function fromRotation$4(out, q) {
    out[0] = q[0];
    out[1] = q[1];
    out[2] = q[2];
    out[3] = q[3];
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a new dual quat from a matrix (4x4)
   *
   * @param {quat2} out the dual quaternion
   * @param {mat4} a the matrix
   * @returns {quat2} dual quat receiving operation result
   * @function
   */


  function fromMat4$1(out, a) {
    //TODO Optimize this
    var outer = create$6();
    getRotation(outer, a);
    var t = new ARRAY_TYPE(3);
    getTranslation(t, a);
    fromRotationTranslation$1(out, outer, t);
    return out;
  }
  /**
   * Copy the values from one dual quat to another
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the source dual quaternion
   * @returns {quat2} out
   * @function
   */


  function copy$7(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Set a dual quat to the identity dual quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @returns {quat2} out
   */


  function identity$5(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Set the components of a dual quat to the given values
   *
   * @param {quat2} out the receiving quaternion
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} out
   * @function
   */


  function set$7(out, x1, y1, z1, w1, x2, y2, z2, w2) {
    out[0] = x1;
    out[1] = y1;
    out[2] = z1;
    out[3] = w1;
    out[4] = x2;
    out[5] = y2;
    out[6] = z2;
    out[7] = w2;
    return out;
  }
  /**
   * Gets the real part of a dual quat
   * @param  {quat} out real part
   * @param  {quat2} a Dual Quaternion
   * @return {quat} real part
   */


  var getReal = copy$6;
  /**
   * Gets the dual part of a dual quat
   * @param  {quat} out dual part
   * @param  {quat2} a Dual Quaternion
   * @return {quat} dual part
   */

  function getDual(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    out[2] = a[6];
    out[3] = a[7];
    return out;
  }
  /**
   * Set the real component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat} q a quaternion representing the real part
   * @returns {quat2} out
   * @function
   */


  var setReal = copy$6;
  /**
   * Set the dual component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat} q a quaternion representing the dual part
   * @returns {quat2} out
   * @function
   */

  function setDual(out, q) {
    out[4] = q[0];
    out[5] = q[1];
    out[6] = q[2];
    out[7] = q[3];
    return out;
  }
  /**
   * Gets the translation of a normalized dual quat
   * @param  {vec3} out translation
   * @param  {quat2} a Dual Quaternion to be decomposed
   * @return {vec3} translation
   */


  function getTranslation$1(out, a) {
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3];
    out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    return out;
  }
  /**
   * Translates a dual quat by the given vector
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to translate
   * @param {vec3} v vector to translate by
   * @returns {quat2} out
   */


  function translate$3(out, a, v) {
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3],
        bx1 = v[0] * 0.5,
        by1 = v[1] * 0.5,
        bz1 = v[2] * 0.5,
        ax2 = a[4],
        ay2 = a[5],
        az2 = a[6],
        aw2 = a[7];
    out[0] = ax1;
    out[1] = ay1;
    out[2] = az1;
    out[3] = aw1;
    out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
    out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
    out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
    out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
    return out;
  }
  /**
   * Rotates a dual quat around the X axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateX$3(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateX$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Y axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateY$3(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateY$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Z axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */


  function rotateZ$3(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateZ$2(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (a * q)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {quat} q quaternion to rotate by
   * @returns {quat2} out
   */


  function rotateByQuatAppend(out, a, q) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax * qw + aw * qx + ay * qz - az * qy;
    out[1] = ay * qw + aw * qy + az * qx - ax * qz;
    out[2] = az * qw + aw * qz + ax * qy - ay * qx;
    out[3] = aw * qw - ax * qx - ay * qy - az * qz;
    ax = a[4];
    ay = a[5];
    az = a[6];
    aw = a[7];
    out[4] = ax * qw + aw * qx + ay * qz - az * qy;
    out[5] = ay * qw + aw * qy + az * qx - ax * qz;
    out[6] = az * qw + aw * qz + ax * qy - ay * qx;
    out[7] = aw * qw - ax * qx - ay * qy - az * qz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (q * a)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat} q quaternion to rotate by
   * @param {quat2} a the dual quaternion to rotate
   * @returns {quat2} out
   */


  function rotateByQuatPrepend(out, q, a) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        bx = a[0],
        by = a[1],
        bz = a[2],
        bw = a[3];
    out[0] = qx * bw + qw * bx + qy * bz - qz * by;
    out[1] = qy * bw + qw * by + qz * bx - qx * bz;
    out[2] = qz * bw + qw * bz + qx * by - qy * bx;
    out[3] = qw * bw - qx * bx - qy * by - qz * bz;
    bx = a[4];
    by = a[5];
    bz = a[6];
    bw = a[7];
    out[4] = qx * bw + qw * bx + qy * bz - qz * by;
    out[5] = qy * bw + qw * by + qz * bx - qx * bz;
    out[6] = qz * bw + qw * bz + qx * by - qy * bx;
    out[7] = qw * bw - qx * bx - qy * by - qz * bz;
    return out;
  }
  /**
   * Rotates a dual quat around a given axis. Does the normalisation automatically
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the dual quaternion to rotate
   * @param {vec3} axis the axis to rotate around
   * @param {Number} rad how far the rotation should be
   * @returns {quat2} out
   */


  function rotateAroundAxis(out, a, axis, rad) {
    //Special case for rad = 0
    if (Math.abs(rad) < EPSILON) {
      return copy$7(out, a);
    }

    var axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
    rad = rad * 0.5;
    var s = Math.sin(rad);
    var bx = s * axis[0] / axisLength;
    var by = s * axis[1] / axisLength;
    var bz = s * axis[2] / axisLength;
    var bw = Math.cos(rad);
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3];
    out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    out[4] = ax * bw + aw * bx + ay * bz - az * by;
    out[5] = ay * bw + aw * by + az * bx - ax * bz;
    out[6] = az * bw + aw * bz + ax * by - ay * bx;
    out[7] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Adds two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {quat2} out
   * @function
   */


  function add$7(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    return out;
  }
  /**
   * Multiplies two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {quat2} out
   */


  function multiply$7(out, a, b) {
    var ax0 = a[0],
        ay0 = a[1],
        az0 = a[2],
        aw0 = a[3],
        bx1 = b[4],
        by1 = b[5],
        bz1 = b[6],
        bw1 = b[7],
        ax1 = a[4],
        ay1 = a[5],
        az1 = a[6],
        aw1 = a[7],
        bx0 = b[0],
        by0 = b[1],
        bz0 = b[2],
        bw0 = b[3];
    out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
    out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
    out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
    out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
    out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
    out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
    out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
    out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
    return out;
  }
  /**
   * Alias for {@link quat2.multiply}
   * @function
   */


  var mul$7 = multiply$7;
  /**
   * Scales a dual quat by a scalar number
   *
   * @param {quat2} out the receiving dual quat
   * @param {quat2} a the dual quat to scale
   * @param {Number} b amount to scale the dual quat by
   * @returns {quat2} out
   * @function
   */

  function scale$7(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    return out;
  }
  /**
   * Calculates the dot product of two dual quat's (The dot product of the real parts)
   *
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */


  var dot$3 = dot$2;
  /**
   * Performs a linear interpolation between two dual quats's
   * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
   *
   * @param {quat2} out the receiving dual quat
   * @param {quat2} a the first operand
   * @param {quat2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat2} out
   */

  function lerp$3(out, a, b, t) {
    var mt = 1 - t;
    if (dot$3(a, b) < 0) t = -t;
    out[0] = a[0] * mt + b[0] * t;
    out[1] = a[1] * mt + b[1] * t;
    out[2] = a[2] * mt + b[2] * t;
    out[3] = a[3] * mt + b[3] * t;
    out[4] = a[4] * mt + b[4] * t;
    out[5] = a[5] * mt + b[5] * t;
    out[6] = a[6] * mt + b[6] * t;
    out[7] = a[7] * mt + b[7] * t;
    return out;
  }
  /**
   * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a dual quat to calculate inverse of
   * @returns {quat2} out
   */


  function invert$5(out, a) {
    var sqlen = squaredLength$3(a);
    out[0] = -a[0] / sqlen;
    out[1] = -a[1] / sqlen;
    out[2] = -a[2] / sqlen;
    out[3] = a[3] / sqlen;
    out[4] = -a[4] / sqlen;
    out[5] = -a[5] / sqlen;
    out[6] = -a[6] / sqlen;
    out[7] = a[7] / sqlen;
    return out;
  }
  /**
   * Calculates the conjugate of a dual quat
   * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
   *
   * @param {quat2} out the receiving quaternion
   * @param {quat2} a quat to calculate conjugate of
   * @returns {quat2} out
   */


  function conjugate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    out[4] = -a[4];
    out[5] = -a[5];
    out[6] = -a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Calculates the length of a dual quat
   *
   * @param {quat2} a dual quat to calculate length of
   * @returns {Number} length of a
   * @function
   */


  var length$3 = length$2;
  /**
   * Alias for {@link quat2.length}
   * @function
   */

  var len$3 = length$3;
  /**
   * Calculates the squared length of a dual quat
   *
   * @param {quat2} a dual quat to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  var squaredLength$3 = squaredLength$2;
  /**
   * Alias for {@link quat2.squaredLength}
   * @function
   */

  var sqrLen$3 = squaredLength$3;
  /**
   * Normalize a dual quat
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {quat2} a dual quaternion to normalize
   * @returns {quat2} out
   * @function
   */

  function normalize$3(out, a) {
    var magnitude = squaredLength$3(a);

    if (magnitude > 0) {
      magnitude = Math.sqrt(magnitude);
      var a0 = a[0] / magnitude;
      var a1 = a[1] / magnitude;
      var a2 = a[2] / magnitude;
      var a3 = a[3] / magnitude;
      var b0 = a[4];
      var b1 = a[5];
      var b2 = a[6];
      var b3 = a[7];
      var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = (b0 - a0 * a_dot_b) / magnitude;
      out[5] = (b1 - a1 * a_dot_b) / magnitude;
      out[6] = (b2 - a2 * a_dot_b) / magnitude;
      out[7] = (b3 - a3 * a_dot_b) / magnitude;
    }

    return out;
  }
  /**
   * Returns a string representation of a dual quatenion
   *
   * @param {quat2} a dual quaternion to represent as a string
   * @returns {String} string representation of the dual quat
   */


  function str$7(a) {
    return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
  }
  /**
   * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {quat2} a the first dual quaternion.
   * @param {quat2} b the second dual quaternion.
   * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
   */


  function exactEquals$7(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
  }
  /**
   * Returns whether or not the dual quaternions have approximately the same elements in the same position.
   *
   * @param {quat2} a the first dual quat.
   * @param {quat2} b the second dual quat.
   * @returns {Boolean} true if the dual quats are equal, false otherwise.
   */


  function equals$8(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7));
  }

  var quat2 =
  /*#__PURE__*/
  Object.freeze({
    create: create$7,
    clone: clone$7,
    fromValues: fromValues$7,
    fromRotationTranslationValues: fromRotationTranslationValues,
    fromRotationTranslation: fromRotationTranslation$1,
    fromTranslation: fromTranslation$3,
    fromRotation: fromRotation$4,
    fromMat4: fromMat4$1,
    copy: copy$7,
    identity: identity$5,
    set: set$7,
    getReal: getReal,
    getDual: getDual,
    setReal: setReal,
    setDual: setDual,
    getTranslation: getTranslation$1,
    translate: translate$3,
    rotateX: rotateX$3,
    rotateY: rotateY$3,
    rotateZ: rotateZ$3,
    rotateByQuatAppend: rotateByQuatAppend,
    rotateByQuatPrepend: rotateByQuatPrepend,
    rotateAroundAxis: rotateAroundAxis,
    add: add$7,
    multiply: multiply$7,
    mul: mul$7,
    scale: scale$7,
    dot: dot$3,
    lerp: lerp$3,
    invert: invert$5,
    conjugate: conjugate$1,
    length: length$3,
    len: len$3,
    squaredLength: squaredLength$3,
    sqrLen: sqrLen$3,
    normalize: normalize$3,
    str: str$7,
    exactEquals: exactEquals$7,
    equals: equals$8
  });
  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create$8() {
    var out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @param {vec2} a vector to clone
   * @returns {vec2} a new 2D vector
   */


  function clone$8(a) {
    var out = new ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */


  function fromValues$8(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the source vector
   * @returns {vec2} out
   */


  function copy$8(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */


  function set$8(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function add$8(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function subtract$6(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function multiply$8(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }
  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function divide$2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }
  /**
   * Math.ceil the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to ceil
   * @returns {vec2} out
   */


  function ceil$2(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
  }
  /**
   * Math.floor the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to floor
   * @returns {vec2} out
   */


  function floor$2(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
  }
  /**
   * Returns the minimum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function min$2(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  }
  /**
   * Returns the maximum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec2} out
   */


  function max$2(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  }
  /**
   * Math.round the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to round
   * @returns {vec2} out
   */


  function round$2(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
  }
  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */


  function scale$8(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  /**
   * Adds two vec2's after scaling the second operand by a scalar value
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec2} out
   */


  function scaleAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */


  function distance$2(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} squared distance between a and b
   */


  function squaredDistance$2(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
  }
  /**
   * Calculates the length of a vec2
   *
   * @param {vec2} a vector to calculate length of
   * @returns {Number} length of a
   */


  function length$4(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * Calculates the squared length of a vec2
   *
   * @param {vec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */


  function squaredLength$4(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
  }
  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to negate
   * @returns {vec2} out
   */


  function negate$2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to invert
   * @returns {vec2} out
   */


  function inverse$2(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
  }
  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a vector to normalize
   * @returns {vec2} out
   */


  function normalize$4(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} dot product of a and b
   */


  function dot$4(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   *
   * @param {vec3} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {vec3} out
   */


  function cross$2(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec2} out
   */


  function lerp$4(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec2} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
   * @returns {vec2} out
   */


  function random$3(out, scale) {
    scale = scale || 1.0;
    var r = RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2d
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat2d} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat3} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat3$1(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {vec2} a the vector to transform
   * @param {mat4} m matrix to transform with
   * @returns {vec2} out
   */


  function transformMat4$2(out, a, m) {
    var x = a[0];
    var y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }
  /**
   * Rotate a 2D vector
   * @param {vec2} out The receiving vec2
   * @param {vec2} a The vec2 point to rotate
   * @param {vec2} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec2} out
   */


  function rotate$4(out, a, b, c) {
    //Translate point to the origin
    var p0 = a[0] - b[0],
        p1 = a[1] - b[1],
        sinC = Math.sin(c),
        cosC = Math.cos(c); //perform rotation and translate to correct position

    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
  }
  /**
   * Get the angle between two 2D vectors
   * @param {vec2} a The first operand
   * @param {vec2} b The second operand
   * @returns {Number} The angle in radians
   */


  function angle$1(a, b) {
    var x1 = a[0],
        y1 = a[1],
        x2 = b[0],
        y2 = b[1];
    var len1 = x1 * x1 + y1 * y1;

    if (len1 > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len1 = 1 / Math.sqrt(len1);
    }

    var len2 = x2 * x2 + y2 * y2;

    if (len2 > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len2 = 1 / Math.sqrt(len2);
    }

    var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

    if (cosine > 1.0) {
      return 0;
    } else if (cosine < -1.0) {
      return Math.PI;
    } else {
      return Math.acos(cosine);
    }
  }
  /**
   * Set the components of a vec2 to zero
   *
   * @param {vec2} out the receiving vector
   * @returns {vec2} out
   */


  function zero$2(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {vec2} a vector to represent as a string
   * @returns {String} string representation of the vector
   */


  function str$8(a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
  }
  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function exactEquals$8(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {vec2} a The first vector.
   * @param {vec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */


  function equals$9(a, b) {
    var a0 = a[0],
        a1 = a[1];
    var b0 = b[0],
        b1 = b[1];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
  }
  /**
   * Alias for {@link vec2.length}
   * @function
   */


  var len$4 = length$4;
  /**
   * Alias for {@link vec2.subtract}
   * @function
   */

  var sub$6 = subtract$6;
  /**
   * Alias for {@link vec2.multiply}
   * @function
   */

  var mul$8 = multiply$8;
  /**
   * Alias for {@link vec2.divide}
   * @function
   */

  var div$2 = divide$2;
  /**
   * Alias for {@link vec2.distance}
   * @function
   */

  var dist$2 = distance$2;
  /**
   * Alias for {@link vec2.squaredDistance}
   * @function
   */

  var sqrDist$2 = squaredDistance$2;
  /**
   * Alias for {@link vec2.squaredLength}
   * @function
   */

  var sqrLen$4 = squaredLength$4;
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$2 = function () {
    var vec = create$8();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  var vec2 =
  /*#__PURE__*/
  Object.freeze({
    create: create$8,
    clone: clone$8,
    fromValues: fromValues$8,
    copy: copy$8,
    set: set$8,
    add: add$8,
    subtract: subtract$6,
    multiply: multiply$8,
    divide: divide$2,
    ceil: ceil$2,
    floor: floor$2,
    min: min$2,
    max: max$2,
    round: round$2,
    scale: scale$8,
    scaleAndAdd: scaleAndAdd$2,
    distance: distance$2,
    squaredDistance: squaredDistance$2,
    length: length$4,
    squaredLength: squaredLength$4,
    negate: negate$2,
    inverse: inverse$2,
    normalize: normalize$4,
    dot: dot$4,
    cross: cross$2,
    lerp: lerp$4,
    random: random$3,
    transformMat2: transformMat2,
    transformMat2d: transformMat2d,
    transformMat3: transformMat3$1,
    transformMat4: transformMat4$2,
    rotate: rotate$4,
    angle: angle$1,
    zero: zero$2,
    str: str$8,
    exactEquals: exactEquals$8,
    equals: equals$9,
    len: len$4,
    sub: sub$6,
    mul: mul$8,
    div: div$2,
    dist: dist$2,
    sqrDist: sqrDist$2,
    sqrLen: sqrLen$4,
    forEach: forEach$2
  });
  exports.glMatrix = common;
  exports.mat2 = mat2;
  exports.mat2d = mat2d;
  exports.mat3 = mat3;
  exports.mat4 = mat4;
  exports.quat = quat;
  exports.quat2 = quat2;
  exports.vec2 = vec2;
  exports.vec3 = vec3;
  exports.vec4 = vec4;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{}],"operations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cameraUP = exports.eye = exports.lookAt = void 0;

var _glMatrix = require("./gl-matrix.js");

/// Operations.js
/// This file is about the mechanism that operates th
var lookAt = [0, 0, -1];
exports.lookAt = lookAt;
var eye = [0, 2, 3];
exports.eye = eye;
var cameraUP = [0, 1, 0];
exports.cameraUP = cameraUP;

var test = _glMatrix.vec3.create(); //作为接受vec3.multiply的结果的一个向量而已


var test2 = _glMatrix.vec3.create();

var test3 = _glMatrix.vec3.create();

var CameraSpeed = [0.2, 0.2, 0.2];
var pitch = 0,
    yaw = 0; //设置视角的角度，水平面一个，垂直一个
// const radin = 10; //随便设一个半径

document.addEventListener('keydown', function (event) {
  var keyName = event.key;

  if (keyName === 'a') {
    _glMatrix.vec3.cross(test2, eye, cameraUP);

    _glMatrix.vec3.add(eye, eye, _glMatrix.vec3.multiply(test3, test2, CameraSpeed));

    return;
  }

  if (keyName === 'd') {
    _glMatrix.vec3.cross(test2, eye, cameraUP);

    _glMatrix.vec3.sub(eye, eye, _glMatrix.vec3.multiply(test3, test2, CameraSpeed));

    return;
  }

  if (keyName === 'w') {
    _glMatrix.vec3.add(eye, eye, _glMatrix.vec3.multiply(test, lookAt, CameraSpeed));

    return;
  }

  if (keyName === 's') {
    _glMatrix.vec3.sub(eye, eye, _glMatrix.vec3.multiply(test, lookAt, CameraSpeed));

    return;
  }
}, false);
var last_position = {};
document.addEventListener('mousemove', function (event) {
  if (typeof last_position.x != "undefined") {
    var deltaX = -last_position.x + event.clientX,
        deltaY = -last_position.y + event.clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
      yaw += 0.1;
    } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
      yaw -= 0.1;
    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
      pitch -= 0.1;
    } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
      pitch += 0.1;
    }

    if (pitch > Math.PI / 2 - 0.01) pitch = Math.PI / 2 - 0.01;
    if (pitch < -Math.PI / 2 + 0.01) pitch = -Math.PI / 2 + 0.01;
  }

  last_position = {
    x: event.clientX,
    y: event.clientY
  };
  lookAt[0] = Math.cos(pitch) * Math.cos(yaw);
  lookAt[1] = Math.sin(pitch);
  lookAt[2] = Math.cos(pitch) * Math.sin(yaw); // console.log(pitch);
}, false);
},{"./gl-matrix.js":"gl-matrix.js"}],"DrawGenericObjects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Draw = Draw;

var _glMatrix = require("./gl-matrix.js");

var _operations = require("./operations.js");

var final_lookAt = _glMatrix.vec3.create();

function Draw(gl, programInfo, Objects) {
  // Initialize Projection and View Matrix
  var fieldOfView = 100 * Math.PI / 180; // in radians

  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var zNear = 0.0001; // 可能得设为这个值不然效果太诡异了

  var zFar = 120.0;

  var ProjectionMatrix = _glMatrix.mat4.create();

  _glMatrix.mat4.perspective(ProjectionMatrix, fieldOfView, aspect, zNear, zFar);

  _glMatrix.vec3.add(final_lookAt, _operations.eye, _operations.lookAt);

  var ViewMatrix = _glMatrix.mat4.create();

  _glMatrix.mat4.lookAt(ViewMatrix, _operations.eye, final_lookAt, _operations.cameraUP); // console.log(lookAt);


  var StackModelMatrix = [_glMatrix.mat4.create()];
  DrawGenericObject(gl, programInfo, Objects.Robot, ProjectionMatrix, ViewMatrix, StackModelMatrix);
  DrawGenericObject(gl, programInfo, Objects.EnvSystem, ProjectionMatrix, ViewMatrix, StackModelMatrix); // DrawEnv(gl, programInfo, Objects.Robot, ProjectionMatrix, ViewMatrix);
  // DrawEnv(gl, programInfo, Objects.EnvSystem, ProjectionMatrix, ViewMatrix);
}

function DrawGenericObject(gl, programInfo, Objects, ProjectionMatrix, ViewMatrix, StackModelMatrix) {
  var lastMatrix = StackModelMatrix.pop();
  var currentModelMatrix = Objects.ModelMatrix;

  var multipliedModelMatrices = _glMatrix.mat4.create();

  multipliedModelMatrices = _glMatrix.mat4.multiply(multipliedModelMatrices, lastMatrix, currentModelMatrix);
  StackModelMatrix.push(lastMatrix);
  StackModelMatrix.push(multipliedModelMatrices);
  DrawBasic(Objects.Buffer, multipliedModelMatrices, Objects.Texture);
  var CountAdjObj = Objects.AdjObj.length;

  for (var i = 0; i < CountAdjObj; i++) {
    DrawGenericObject(gl, programInfo, Objects.AdjObj[i], ProjectionMatrix, ViewMatrix, StackModelMatrix);
  }

  StackModelMatrix.pop();
  return;

  function DrawBasic(buffer, ModelMatrix, Texture) {
    {
      var numComponents = 3;
      var type = gl.FLOAT;
      var normalize = false;
      var stride = 0;
      var offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.VertexBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }
    {
      var _numComponents = 3;
      var _type = gl.FLOAT;
      var _normalize = false;
      var _stride = 0;
      var _offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.NormalBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.normalPosition, _numComponents, _type, _normalize, _stride, _offset);
      gl.enableVertexAttribArray(programInfo.attribLocations.normalPosition);
    }
    {
      var _numComponents2 = 2;
      var _type2 = gl.FLOAT;
      var _normalize2 = false;
      var _stride2 = 0;
      var _offset2 = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.TextureBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.textureCoordPosition, _numComponents2, _type2, _normalize2, _stride2, _offset2);
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoordPosition);
    }
    gl.useProgram(programInfo.program);
    gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, ProjectionMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.ViewMatrix, false, ViewMatrix);
    gl.uniformMatrix4fv(programInfo.uniformLocations.ModelMatrix, false, ModelMatrix);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    {
      var vertexcount = buffer.NumVertices / 3;
      var _offset3 = 0;
      gl.drawArrays(gl.TRIANGLES, _offset3, vertexcount);
    }
  }
}
},{"./gl-matrix.js":"gl-matrix.js","./operations.js":"operations.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"ObjectTrees.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectTrees = ObjectTrees;

var _glMatrix = require("./gl-matrix.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericObject = function GenericObject(Buffer, AdjObj, TextureBuffer) {
  _classCallCheck(this, GenericObject);

  this.Buffer = Buffer;
  this.MotionParameters = new MotionParameters();
  this.ModelMatrix = _glMatrix.mat4.create();
  this.AdjObj = AdjObj; // Adjacent Objects (Array)

  this.Texture = TextureBuffer;
};

var MotionParameters = function MotionParameters() {
  _classCallCheck(this, MotionParameters);

  this.xP = 0;
  this.yP = 0;
  this.zP = 0;
  this.Speed = 0;
  this.Size = [1, 1, 1];
  this.Pivot = [0, 0, 0]; // 旋转轴

  this.MaxSpeed = 1;
}; // Project Specific Object Creation.
// Objects should be created from branch to stem


function ObjectTrees(buffersCollection, texturesCollection) {
  // 在这里可以建设多个太阳系
  // 每个太阳系有独特的建系方程
  // let ObjectsSystems = CreateObjectsSystem(buffersCollection, texturesCollection);                // 太阳系1（机器人1）
  var EnvSystem = new GenericObject(buffersCollection.envModelbuffer, [], texturesCollection.envTextureBuffer); // 场景

  _glMatrix.mat4.scale(EnvSystem.ModelMatrix, EnvSystem.ModelMatrix, _glMatrix.vec3.fromValues(3, 3, 3)); // Robot Main


  var rotatingPart = new GenericObject(buffersCollection.rotatingItemBuffer, [], texturesCollection.RotatingItem);
  var upCannons = new GenericObject(buffersCollection.upCannonsBuffer, [], texturesCollection.UpCannons);
  var loCannons = new GenericObject(buffersCollection.loCannonsBuffer, [], texturesCollection.LoCannons);
  var reside = new GenericObject(buffersCollection.resideBuffer, [rotatingPart], texturesCollection.Reside);
  var Robot = new GenericObject(buffersCollection.trackBuffer, [reside, upCannons, loCannons], texturesCollection.Track); // console.log(EnvSystem)

  return {
    // ObjectsSystems:ObjectsSystems,
    EnvSystem: EnvSystem,
    Robot: Robot
  };
}
},{"./gl-matrix.js":"gl-matrix.js","buffer":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"MainFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotatingItem = exports.track = exports.reside = exports.upCannons = exports.loCannons = exports.env = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ModelsManager = require("./ModelsManager.js");

var _DrawGenericObjects = require("./DrawGenericObjects.js");

var _ObjectTrees = require("./ObjectTrees");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the main function
var vsSource = "attribute vec4 aVertexPosition;\nattribute vec3 aNormal;\n\nuniform mat4 uViewMatrix;\nuniform mat4 uModelMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying mediump vec3 Normal;\n\nattribute vec2 aTextureCoord;\nvarying highp vec2 vTextureCoord;\n\nvarying mediump vec3 FragPos2;\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix* aVertexPosition;\n    vec4 modelPos = uModelMatrix * aVertexPosition;\n    FragPos2 = modelPos.xyz / modelPos.w;\n    Normal = vec3(uModelMatrix * vec4(aNormal,0.0));\n    vTextureCoord = aTextureCoord;\n}";
var fsSource = "precision mediump float;\nvarying mediump vec3 Normal;\nvarying highp vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvarying mediump vec3 FragPos2;\n\nvec4 ambient = vec4(0.4,0.4,0.4,1.0);\nvec4 lightColor = vec4(1.0,1.0,1.0,0.0);\nvec4 diffuse;\n\nvoid main(void) {\n    vec3 norm = normalize(Normal);\n    vec3 lightDir = normalize(vec3(-0.5,-0.5,-0.5));\n    float diff = max(dot(norm, lightDir), 0.0);\n    diffuse = lightColor * diff;\n\n    vec4 Texturecolor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor =Texturecolor * (vec4(diff) + ambient);\n}";
var env = JSON.parse("{\"vertex\":[0.330913,0.000001,0.488915,0.330913,0.000001,-0.011085,2.343276,0.000001,-0.011085,0.330913,0.000001,0.488915,2.343276,0.000001,-0.011085,2.343276,0.000001,0.488915,-0.669086,0.000001,-1.511085,-0.669086,0.000001,-2.011085,2.843276,0.000001,-2.011085,-0.669086,0.000001,-1.511085,2.843276,0.000001,-2.011085,2.843276,0.000001,-1.511085,-0.669086,0.000001,2.488915,-0.669086,0.000001,1.988915,1.343276,0.000001,1.988915,-0.669086,0.000001,2.488915,1.343276,0.000001,1.988915,1.343276,0.000001,2.488915,-0.169087,0.000001,2.488915,-0.169087,0.000001,1.988915,0.343276,0.000001,1.988915,-0.169087,0.000001,2.488915,0.343276,0.000001,1.988915,0.343276,0.000001,2.488915,2.830913,0.000001,4.488915,2.830913,0.000001,3.988915,4.343276,0.000001,3.988915,2.830913,0.000001,4.488915,4.343276,0.000001,3.988915,4.343276,0.000001,4.488915,-4.669086,0.000001,4.488915,-4.669086,0.000001,3.988915,-2.656724,0.000001,3.988915,-4.669086,0.000001,4.488915,-2.656724,0.000001,3.988915,-2.656724,0.000001,4.488915,3.830913,0.000001,3.988915,3.830913,0.000001,-4.011085,4.343276,0.000001,-4.011085,3.830913,0.000001,3.988915,4.343276,0.000001,-4.011085,4.343276,0.000001,3.988915,-4.669086,0.000001,-4.011085,-4.669086,0.000001,-4.511085,4.343276,0.000001,-4.511085,-4.669086,0.000001,-4.011085,4.343276,0.000001,-4.511085,4.343276,0.000001,-4.011085,-4.669086,0.000001,3.988915,-4.669086,0.000001,-4.011085,-4.156724,0.000001,-4.011085,-4.669086,0.000001,3.988915,-4.156724,0.000001,-4.011085,-4.156724,0.000001,3.988915,-1.169086,0.000001,2.488915,-1.169086,0.000001,-0.011085,-0.656724,0.000001,-0.011085,-1.169086,0.000001,2.488915,-0.656724,0.000001,-0.011085,-0.656724,0.000001,2.488915,-1.169086,0.000001,2.488915,-1.169086,0.000001,1.988915,-0.656724,0.000001,1.988915,-1.169086,0.000001,2.488915,-0.656724,0.000001,1.988915,-0.656724,0.000001,2.488915,2.849869,0,4.5,2.349869,0,4.5,2.349869,0,0,2.849869,0,4.5,2.349869,0,0,2.412369,0,0,-2.15013,0,2,-2.65013,0,2,-2.65013,0,-2.5,-2.15013,0,2,-2.65013,0,-2.5,-2.58763,0,-2.5,-2.15013,0,4.5,-2.65013,0,4.5,-2.65013,0,0,-2.15013,0,4.5,-2.65013,0,0,-2.58763,0,0,-2.15013,0,4.5,-2.15013,0,4,2.349869,0,4,-2.15013,0,4.5,2.349869,0,4,2.349869,0,4.0625,0.330913,1.000001,0.488915,2.343276,1.000001,0.488915,2.343276,1.000001,-0.011085,0.330913,1.000001,0.488915,2.343276,1.000001,-0.011085,0.330913,1.000001,-0.011085,-0.669086,1.000001,-1.511085,2.843276,1.000001,-1.511085,2.843276,1.000001,-2.011085,-0.669086,1.000001,-1.511085,2.843276,1.000001,-2.011085,-0.669086,1.000001,-2.011085,-0.669086,1.000001,2.488915,1.343276,1.000001,2.488915,1.343276,1.000001,1.988915,-0.669086,1.000001,2.488915,1.343276,1.000001,1.988915,-0.669086,1.000001,1.988915,-0.169087,1.000001,2.488915,0.343276,1.000001,2.488915,0.343276,1.000001,1.988915,-0.169087,1.000001,2.488915,0.343276,1.000001,1.988915,-0.169087,1.000001,1.988915,2.830913,1.000001,4.488915,4.343276,1.000001,4.488915,4.343276,1.000001,3.988915,2.830913,1.000001,4.488915,4.343276,1.000001,3.988915,2.830913,1.000001,3.988915,-4.669086,1.000001,4.488915,-2.656724,1.000001,4.488915,-2.656724,1.000001,3.988915,-4.669086,1.000001,4.488915,-2.656724,1.000001,3.988915,-4.669086,1.000001,3.988915,3.830913,1.000001,3.988915,4.343276,1.000001,3.988915,4.343276,1.000001,-4.011085,3.830913,1.000001,3.988915,4.343276,1.000001,-4.011085,3.830913,1.000001,-4.011085,-4.669086,1.000001,-4.011085,4.343276,1.000001,-4.011085,4.343276,1.000001,-4.511085,-4.669086,1.000001,-4.011085,4.343276,1.000001,-4.511085,-4.669086,1.000001,-4.511085,-4.669086,1.000001,3.988915,-4.156724,1.000001,3.988915,-4.156724,1.000001,-4.011085,-4.669086,1.000001,3.988915,-4.156724,1.000001,-4.011085,-4.669086,1.000001,-4.011085,-1.169086,1.000001,2.488915,-0.656724,1.000001,2.488915,-0.656724,1.000001,-0.011085,-1.169086,1.000001,2.488915,-0.656724,1.000001,-0.011085,-1.169086,1.000001,-0.011085,-1.169086,1.000001,2.488915,-0.656724,1.000001,2.488915,-0.656724,1.000001,1.988915,-1.169086,1.000001,2.488915,-0.656724,1.000001,1.988915,-1.169086,1.000001,1.988915,2.849869,1,4.5,2.849869,1,0,2.787369,1,0,2.849869,1,4.5,2.787369,1,0,2.724869,1,0,-2.15013,1,2,-2.15013,1,-2.5,-2.21263,1,-2.5,-2.15013,1,2,-2.21263,1,-2.5,-2.27513,1,-2.5,-2.15013,1,4.5,-2.15013,1,0,-2.21263,1,0,-2.15013,1,4.5,-2.21263,1,0,-2.27513,1,0,-2.15013,1,4.5,2.349869,1,4.5,2.349869,1,4.4375,-2.15013,1,4.5,2.349869,1,4.4375,2.349869,1,4.375,-2.65013,0,0,-2.65013,0,4.5,-2.65013,1,4.5,-2.65013,0,0,-2.65013,1,4.5,-2.65013,1,0,2.849869,0,4.5,2.849869,0,0,2.849869,1,0,2.849869,0,4.5,2.849869,1,0,2.849869,1,4.5,-4.669086,0.000001,4.488915,-2.656724,0.000001,4.488915,-2.656724,1.000001,4.488915,-4.669086,0.000001,4.488915,-2.656724,1.000001,4.488915,-4.669086,1.000001,4.488915,-2.33763,0,0,-2.40013,0,0,-2.40013,1,0,-2.33763,0,0,-2.40013,1,0,-2.33763,1,0,2.412369,0,0,2.349869,0,0,2.349869,1,0,2.412369,0,0,2.349869,1,0,2.412369,1,0,-2.656724,0.000001,4.488915,-2.656724,0.000001,3.988915,-2.656724,1.000001,3.988915,-2.656724,0.000001,4.488915,-2.656724,1.000001,3.988915,-2.656724,1.000001,4.488915,-2.46263,0,0,-2.52513,0,0,-2.52513,1,0,-2.46263,0,0,-2.52513,1,0,-2.46263,1,0,2.349869,0,0,2.349869,0,4.5,2.349869,1,4.5,2.349869,0,0,2.349869,1,4.5,2.349869,1,0,-2.656724,0.000001,3.988915,-4.669086,0.000001,3.988915,-4.669086,1.000001,3.988915,-2.656724,0.000001,3.988915,-4.669086,1.000001,3.988915,-2.656724,1.000001,3.988915,-2.21263,0,0,-2.27513,0,0,-2.27513,1,0,-2.21263,0,0,-2.27513,1,0,-2.21263,1,0,2.662369,0,0,2.599869,0,0,2.599869,1,0,2.662369,0,0,2.599869,1,0,2.662369,1,0,3.830913,0.000001,-4.011085,3.830913,0.000001,3.988915,3.830913,1.000001,3.988915,3.830913,0.000001,-4.011085,3.830913,1.000001,3.988915,3.830913,1.000001,-4.011085,-2.52513,0,0,-2.58763,0,0,-2.58763,1,0,-2.52513,0,0,-2.58763,1,0,-2.52513,1,0,2.537369,0,0,2.474869,0,0,2.474869,1,0,2.537369,0,0,2.474869,1,0,2.537369,1,0,3.830913,0.000001,3.988915,4.343276,0.000001,3.988915,4.343276,1.000001,3.988915,3.830913,0.000001,3.988915,4.343276,1.000001,3.988915,3.830913,1.000001,3.988915,-2.27513,0,0,-2.33763,0,0,-2.33763,1,0,-2.27513,0,0,-2.33763,1,0,-2.27513,1,0,2.787369,0,0,2.724869,0,0,2.724869,1,0,2.787369,0,0,2.724869,1,0,2.787369,1,0,4.343276,0.000001,3.988915,4.343276,0.000001,-4.011085,4.343276,1.000001,-4.011085,4.343276,0.000001,3.988915,4.343276,1.000001,-4.011085,4.343276,1.000001,3.988915,0.330913,0.000001,-0.011085,0.330913,0.000001,0.488915,0.330913,1.000001,0.488915,0.330913,0.000001,-0.011085,0.330913,1.000001,0.488915,0.330913,1.000001,-0.011085,-2.40013,0,0,-2.46263,0,0,-2.46263,1,0,-2.40013,0,0,-2.46263,1,0,-2.40013,1,0,2.474869,0,0,2.412369,0,0,2.412369,1,0,2.474869,0,0,2.412369,1,0,2.474869,1,0,4.343276,0.000001,-4.011085,3.830913,0.000001,-4.011085,3.830913,1.000001,-4.011085,4.343276,0.000001,-4.011085,3.830913,1.000001,-4.011085,4.343276,1.000001,-4.011085,0.330913,0.000001,0.488915,2.343276,0.000001,0.488915,2.343276,1.000001,0.488915,0.330913,0.000001,0.488915,2.343276,1.000001,0.488915,0.330913,1.000001,0.488915,-2.15013,0,0,-2.21263,0,0,-2.21263,1,0,-2.15013,0,0,-2.21263,1,0,-2.15013,1,0,2.724869,0,0,2.662369,0,0,2.662369,1,0,2.724869,0,0,2.662369,1,0,2.724869,1,0,2.343276,0.000001,0.488915,2.343276,0.000001,-0.011085,2.343276,1.000001,-0.011085,2.343276,0.000001,0.488915,2.343276,1.000001,-0.011085,2.343276,1.000001,0.488915,2.599869,0,0,2.537369,0,0,2.537369,1,0,2.599869,0,0,2.537369,1,0,2.599869,1,0,2.343276,0.000001,-0.011085,0.330913,0.000001,-0.011085,0.330913,1.000001,-0.011085,2.343276,0.000001,-0.011085,0.330913,1.000001,-0.011085,2.343276,1.000001,-0.011085,-2.15013,0,4,-2.15013,0,4.5,-2.15013,1,4.5,-2.15013,0,4,-2.15013,1,4.5,-2.15013,1,4,2.849869,0,0,2.787369,0,0,2.787369,1,0,2.849869,0,0,2.787369,1,0,2.849869,1,0,-4.669086,0.000001,-4.511085,-4.669086,0.000001,-4.011085,-4.669086,1.000001,-4.011085,-4.669086,0.000001,-4.511085,-4.669086,1.000001,-4.011085,-4.669086,1.000001,-4.511085,-0.669086,0.000001,-2.011085,-0.669086,0.000001,-1.511085,-0.669086,1.000001,-1.511085,-0.669086,0.000001,-2.011085,-0.669086,1.000001,-1.511085,-0.669086,1.000001,-2.011085,-2.15013,0,4.5,2.349869,0,4.5,2.349869,1,4.5,-2.15013,0,4.5,2.349869,1,4.5,-2.15013,1,4.5,-4.669086,0.000001,-4.011085,4.343276,0.000001,-4.011085,4.343276,1.000001,-4.011085,-4.669086,0.000001,-4.011085,4.343276,1.000001,-4.011085,-4.669086,1.000001,-4.011085,-0.669086,0.000001,-1.511085,2.843276,0.000001,-1.511085,2.843276,1.000001,-1.511085,-0.669086,0.000001,-1.511085,2.843276,1.000001,-1.511085,-0.669086,1.000001,-1.511085,2.349869,0,4.0625,2.349869,0,4,2.349869,1,4,2.349869,0,4.0625,2.349869,1,4,2.349869,1,4.0625,-2.65013,0,2,-2.15013,0,2,-2.15013,1,2,-2.65013,0,2,-2.15013,1,2,-2.65013,1,2,4.343276,0.000001,-4.011085,4.343276,0.000001,-4.511085,4.343276,1.000001,-4.511085,4.343276,0.000001,-4.011085,4.343276,1.000001,-4.511085,4.343276,1.000001,-4.011085,2.843276,0.000001,-1.511085,2.843276,0.000001,-2.011085,2.843276,1.000001,-2.011085,2.843276,0.000001,-1.511085,2.843276,1.000001,-2.011085,2.843276,1.000001,-1.511085,2.349869,0,4,-2.15013,0,4,-2.15013,1,4,2.349869,0,4,-2.15013,1,4,2.349869,1,4,-2.15013,0,2,-2.15013,0,-2.5,-2.15013,1,-2.5,-2.15013,0,2,-2.15013,1,-2.5,-2.15013,1,2,4.343276,0.000001,-4.511085,-4.669086,0.000001,-4.511085,-4.669086,1.000001,-4.511085,4.343276,0.000001,-4.511085,-4.669086,1.000001,-4.511085,4.343276,1.000001,-4.511085,2.843276,0.000001,-2.011085,-0.669086,0.000001,-2.011085,-0.669086,1.000001,-2.011085,2.843276,0.000001,-2.011085,-0.669086,1.000001,-2.011085,2.843276,1.000001,-2.011085,2.349869,0,4.3125,2.349869,0,4.25,2.349869,1,4.25,2.349869,0,4.3125,2.349869,1,4.25,2.349869,1,4.3125,-2.58763,0,-2.5,-2.65013,0,-2.5,-2.65013,1,-2.5,-2.58763,0,-2.5,-2.65013,1,-2.5,-2.58763,1,-2.5,-4.669086,0.000001,-4.011085,-4.669086,0.000001,3.988915,-4.669086,1.000001,3.988915,-4.669086,0.000001,-4.011085,-4.669086,1.000001,3.988915,-4.669086,1.000001,-4.011085,-0.669086,0.000001,1.988915,-0.669086,0.000001,2.488915,-0.669086,1.000001,2.488915,-0.669086,0.000001,1.988915,-0.669086,1.000001,2.488915,-0.669086,1.000001,1.988915,2.349869,0,4.1875,2.349869,0,4.125,2.349869,1,4.125,2.349869,0,4.1875,2.349869,1,4.125,2.349869,1,4.1875,-2.65013,0,-2.5,-2.65013,0,2,-2.65013,1,2,-2.65013,0,-2.5,-2.65013,1,2,-2.65013,1,-2.5,-4.669086,0.000001,3.988915,-4.156724,0.000001,3.988915,-4.156724,1.000001,3.988915,-4.669086,0.000001,3.988915,-4.156724,1.000001,3.988915,-4.669086,1.000001,3.988915,-0.669086,0.000001,2.488915,1.343276,0.000001,2.488915,1.343276,1.000001,2.488915,-0.669086,0.000001,2.488915,1.343276,1.000001,2.488915,-0.669086,1.000001,2.488915,2.349869,0,4.4375,2.349869,0,4.375,2.349869,1,4.375,2.349869,0,4.4375,2.349869,1,4.375,2.349869,1,4.4375,-2.33763,0,-2.5,-2.40013,0,-2.5,-2.40013,1,-2.5,-2.33763,0,-2.5,-2.40013,1,-2.5,-2.33763,1,-2.5,-4.156724,0.000001,3.988915,-4.156724,0.000001,-4.011085,-4.156724,1.000001,-4.011085,-4.156724,0.000001,3.988915,-4.156724,1.000001,-4.011085,-4.156724,1.000001,3.988915,1.343276,0.000001,2.488915,1.343276,0.000001,1.988915,1.343276,1.000001,1.988915,1.343276,0.000001,2.488915,1.343276,1.000001,1.988915,1.343276,1.000001,2.488915,2.349869,0,4.125,2.349869,0,4.0625,2.349869,1,4.0625,2.349869,0,4.125,2.349869,1,4.0625,2.349869,1,4.125,-2.46263,0,-2.5,-2.52513,0,-2.5,-2.52513,1,-2.5,-2.46263,0,-2.5,-2.52513,1,-2.5,-2.46263,1,-2.5,-4.156724,0.000001,-4.011085,-4.669086,0.000001,-4.011085,-4.669086,1.000001,-4.011085,-4.156724,0.000001,-4.011085,-4.669086,1.000001,-4.011085,-4.156724,1.000001,-4.011085,1.343276,0.000001,1.988915,-0.669086,0.000001,1.988915,-0.669086,1.000001,1.988915,1.343276,0.000001,1.988915,-0.669086,1.000001,1.988915,1.343276,1.000001,1.988915,2.349869,0,4.375,2.349869,0,4.3125,2.349869,1,4.3125,2.349869,0,4.375,2.349869,1,4.3125,2.349869,1,4.375,-2.21263,0,-2.5,-2.27513,0,-2.5,-2.27513,1,-2.5,-2.21263,0,-2.5,-2.27513,1,-2.5,-2.21263,1,-2.5,-1.169086,0.000001,-0.011085,-1.169086,0.000001,2.488915,-1.169086,1.000001,2.488915,-1.169086,0.000001,-0.011085,-1.169086,1.000001,2.488915,-1.169086,1.000001,-0.011085,-0.169087,0.000001,1.988915,-0.169087,0.000001,2.488915,-0.169087,1.000001,2.488915,-0.169087,0.000001,1.988915,-0.169087,1.000001,2.488915,-0.169087,1.000001,1.988915,2.349869,0,4.25,2.349869,0,4.1875,2.349869,1,4.1875,2.349869,0,4.25,2.349869,1,4.1875,2.349869,1,4.25,-2.52513,0,-2.5,-2.58763,0,-2.5,-2.58763,1,-2.5,-2.52513,0,-2.5,-2.58763,1,-2.5,-2.52513,1,-2.5,-1.169086,0.000001,2.488915,-0.656724,0.000001,2.488915,-0.656724,1.000001,2.488915,-1.169086,0.000001,2.488915,-0.656724,1.000001,2.488915,-1.169086,1.000001,2.488915,-0.169087,0.000001,2.488915,0.343276,0.000001,2.488915,0.343276,1.000001,2.488915,-0.169087,0.000001,2.488915,0.343276,1.000001,2.488915,-0.169087,1.000001,2.488915,2.349869,0,4.5,2.349869,0,4.4375,2.349869,1,4.4375,2.349869,0,4.5,2.349869,1,4.4375,2.349869,1,4.5,-2.27513,0,-2.5,-2.33763,0,-2.5,-2.33763,1,-2.5,-2.27513,0,-2.5,-2.33763,1,-2.5,-2.27513,1,-2.5,-0.656724,0.000001,2.488915,-0.656724,0.000001,-0.011085,-0.656724,1.000001,-0.011085,-0.656724,0.000001,2.488915,-0.656724,1.000001,-0.011085,-0.656724,1.000001,2.488915,0.343276,0.000001,2.488915,0.343276,0.000001,1.988915,0.343276,1.000001,1.988915,0.343276,0.000001,2.488915,0.343276,1.000001,1.988915,0.343276,1.000001,2.488915,-2.40013,0,-2.5,-2.46263,0,-2.5,-2.46263,1,-2.5,-2.40013,0,-2.5,-2.46263,1,-2.5,-2.40013,1,-2.5,-0.656724,0.000001,-0.011085,-1.169086,0.000001,-0.011085,-1.169086,1.000001,-0.011085,-0.656724,0.000001,-0.011085,-1.169086,1.000001,-0.011085,-0.656724,1.000001,-0.011085,0.343276,0.000001,1.988915,-0.169087,0.000001,1.988915,-0.169087,1.000001,1.988915,0.343276,0.000001,1.988915,-0.169087,1.000001,1.988915,0.343276,1.000001,1.988915,-2.15013,0,-2.5,-2.21263,0,-2.5,-2.21263,1,-2.5,-2.15013,0,-2.5,-2.21263,1,-2.5,-2.15013,1,-2.5,-1.169086,0.000001,1.988915,-1.169086,0.000001,2.488915,-1.169086,1.000001,2.488915,-1.169086,0.000001,1.988915,-1.169086,1.000001,2.488915,-1.169086,1.000001,1.988915,2.830913,0.000001,3.988915,2.830913,0.000001,4.488915,2.830913,1.000001,4.488915,2.830913,0.000001,3.988915,2.830913,1.000001,4.488915,2.830913,1.000001,3.988915,-1.169086,0.000001,2.488915,-0.656724,0.000001,2.488915,-0.656724,1.000001,2.488915,-1.169086,0.000001,2.488915,-0.656724,1.000001,2.488915,-1.169086,1.000001,2.488915,2.830913,0.000001,4.488915,4.343276,0.000001,4.488915,4.343276,1.000001,4.488915,2.830913,0.000001,4.488915,4.343276,1.000001,4.488915,2.830913,1.000001,4.488915,-2.65013,0,4.5,-2.15013,0,4.5,-2.15013,1,4.5,-2.65013,0,4.5,-2.15013,1,4.5,-2.65013,1,4.5,-0.656724,0.000001,2.488915,-0.656724,0.000001,1.988915,-0.656724,1.000001,1.988915,-0.656724,0.000001,2.488915,-0.656724,1.000001,1.988915,-0.656724,1.000001,2.488915,4.343276,0.000001,4.488915,4.343276,0.000001,3.988915,4.343276,1.000001,3.988915,4.343276,0.000001,4.488915,4.343276,1.000001,3.988915,4.343276,1.000001,4.488915,-2.15013,0,4.5,-2.15013,0,0,-2.15013,1,0,-2.15013,0,4.5,-2.15013,1,0,-2.15013,1,4.5,-0.656724,0.000001,1.988915,-1.169086,0.000001,1.988915,-1.169086,1.000001,1.988915,-0.656724,0.000001,1.988915,-1.169086,1.000001,1.988915,-0.656724,1.000001,1.988915,4.343276,0.000001,3.988915,2.830913,0.000001,3.988915,2.830913,1.000001,3.988915,4.343276,0.000001,3.988915,2.830913,1.000001,3.988915,4.343276,1.000001,3.988915,-2.58763,0,0,-2.65013,0,0,-2.65013,1,0,-2.58763,0,0,-2.65013,1,0,-2.58763,1,0,2.349869,0,4.5,2.849869,0,4.5,2.849869,1,4.5,2.349869,0,4.5,2.849869,1,4.5,2.349869,1,4.5,-4.669086,0.000001,3.988915,-4.669086,0.000001,4.488915,-4.669086,1.000001,4.488915,-4.669086,0.000001,3.988915,-4.669086,1.000001,4.488915,-4.669086,1.000001,3.988915,-4.65013,0,4.5,4.349869,0,4.5,4.349869,0,-4.5,-4.65013,0,4.5,4.349869,0,-4.5,-4.65013,0,-4.5],\"uv\":[0.705369,0.971336,0.675979,0.971336,0.675979,0.853048,0.705369,0.971336,0.675979,0.853048,0.705369,0.853048,0.999273,0.676706,0.969883,0.676706,0.969883,0.470246,0.999273,0.676706,0.969883,0.470246,0.999273,0.470246,0.322568,0.911829,0.293177,0.911829,0.293177,0.793541,0.322568,0.911829,0.293177,0.793541,0.322568,0.793541,0.617198,0.941219,0.646588,0.941219,0.646588,0.971336,0.617198,0.941219,0.646588,0.971336,0.617198,0.971336,0.73476,0.853048,0.76415,0.853048,0.76415,0.941946,0.73476,0.853048,0.76415,0.941946,0.73476,0.941946,0.911102,0.794267,0.940492,0.794267,0.940492,0.912556,0.911102,0.794267,0.940492,0.912556,0.911102,0.912556,0.76415,0.940493,0.76415,0.470246,0.794267,0.470246,0.76415,0.940493,0.794267,0.470246,0.794267,0.940493,0.940493,0.529754,0.911102,0.529754,0.911102,0,0.940493,0.529754,0.911102,0,0.940493,0,0.794267,0.940493,0.794267,0.470246,0.824384,0.470246,0.794267,0.940493,0.824384,0.470246,0.824385,0.940493,0.235123,0.940493,0.235123,0.793541,0.26524,0.793541,0.235123,0.940493,0.26524,0.793541,0.26524,0.940493,0.558417,0.941219,0.587807,0.941219,0.587807,0.971336,0.558417,0.941219,0.587807,0.971336,0.558417,0.971336,0.911102,0.529754,0.940493,0.529754,0.940493,0.794267,0.911102,0.529754,0.940493,0.794267,0.936819,0.794267,0.617198,0.941219,0.587807,0.941219,0.587807,0.676706,0.617198,0.941219,0.587807,0.676706,0.591481,0.676706,0.911102,0.794267,0.881712,0.794267,0.881712,0.529754,0.911102,0.794267,0.881712,0.529754,0.885385,0.529754,0.940493,0.470246,0.969883,0.470246,0.969883,0.73476,0.940493,0.470246,0.969883,0.73476,0.966209,0.73476,0.881712,0.912556,0.881712,0.794267,0.911102,0.794267,0.881712,0.912556,0.911102,0.794267,0.911102,0.912556,0.940493,0.941219,0.940493,0.73476,0.969883,0.73476,0.940493,0.941219,0.969883,0.73476,0.969883,0.941219,0.499637,0.793541,0.499637,0.911829,0.470246,0.911829,0.499637,0.793541,0.470246,0.911829,0.470246,0.793541,0.617198,0.941219,0.617198,0.971336,0.587807,0.971336,0.617198,0.941219,0.587807,0.971336,0.587807,0.941219,0.73476,0.853048,0.73476,0.941946,0.705369,0.941946,0.73476,0.853048,0.705369,0.941946,0.705369,0.853048,0.675979,0.853048,0.675979,0.971336,0.646588,0.971336,0.675979,0.853048,0.646588,0.971336,0.646588,0.853048,0.940493,0,0.97061,0,0.97061,0.470246,0.940493,0,0.97061,0.470246,0.940493,0.470246,0.881712,0.529754,0.881712,0,0.911102,0,0.881712,0.529754,0.911102,0,0.911102,0.529754,0.824385,0.470246,0.854502,0.470246,0.854502,0.940493,0.824385,0.470246,0.854502,0.940493,0.824385,0.940493,0.352685,0.940493,0.322568,0.940493,0.322568,0.793541,0.352685,0.940493,0.322568,0.793541,0.352685,0.793541,0.558417,0.941219,0.558417,0.971336,0.529027,0.971336,0.558417,0.941219,0.529027,0.971336,0.529027,0.941219,0.529027,0.941219,0.529027,0.676706,0.532701,0.676706,0.529027,0.941219,0.532701,0.676706,0.536374,0.676706,0.587807,0.676706,0.587807,0.941219,0.584134,0.941219,0.587807,0.676706,0.584134,0.941219,0.58046,0.941219,0.617198,0.941219,0.617198,0.676706,0.620872,0.676706,0.617198,0.941219,0.620872,0.676706,0.624545,0.676706,0.470246,0.793541,0.470246,0.529027,0.47392,0.529027,0.470246,0.793541,0.47392,0.529027,0.477594,0.529027,0.176342,0.529027,0.176342,0.793541,0.117562,0.793541,0.176342,0.529027,0.117562,0.793541,0.117562,0.529027,0.705369,0.470246,0.705369,0.73476,0.646589,0.73476,0.705369,0.470246,0.646589,0.73476,0.646588,0.470246,0.646588,0.853048,0.646588,0.73476,0.705369,0.73476,0.646588,0.853048,0.705369,0.73476,0.705369,0.853048,0.988979,0.058781,0.985305,0.058781,0.985305,0,0.988979,0.058781,0.985305,0,0.988979,0,0.356359,0.971336,0.352685,0.971336,0.352685,0.912556,0.356359,0.971336,0.352685,0.912556,0.356359,0.912556,0.911102,0.971336,0.881712,0.971336,0.881712,0.912556,0.911102,0.971336,0.881712,0.912556,0.911102,0.912556,0.981631,0.058781,0.977957,0.058781,0.977957,0,0.981631,0.058781,0.977957,0,0.981631,0,0.293904,0.529027,0.293904,0.793541,0.235123,0.793541,0.293904,0.529027,0.235123,0.793541,0.235123,0.529027,0,0.911829,0,0.793541,0.058781,0.793541,0,0.911829,0.058781,0.793541,0.058781,0.911829,0.996326,0.058781,0.992652,0.058781,0.992652,0,0.996326,0.058781,0.992652,0,0.996326,0,0.371054,0.971336,0.36738,0.971336,0.36738,0.912556,0.371054,0.971336,0.36738,0.912556,0.371054,0.912556,0.76415,0,0.76415,0.470246,0.705369,0.470246,0.76415,0,0.705369,0.470246,0.705369,0,0.977957,0.058781,0.974283,0.058781,0.974283,0,0.977957,0.058781,0.974283,0,0.977957,0,0.363706,0.971336,0.360032,0.971336,0.360032,0.912556,0.363706,0.971336,0.360032,0.912556,0.363706,0.912556,0.147679,0.941219,0.117562,0.941219,0.117562,0.882438,0.147679,0.941219,0.117562,0.882438,0.147679,0.882438,0.992652,0.058781,0.988979,0.058781,0.988979,0,0.992652,0.058781,0.988979,0,0.992652,0,0.378401,0.971336,0.374728,0.971336,0.374728,0.912556,0.378401,0.971336,0.374728,0.912556,0.378401,0.912556,0.705369,0,0.705369,0.470246,0.646589,0.470246,0.705369,0,0.646589,0.470246,0.646588,0,0.999273,0.97061,0.969883,0.97061,0.969883,0.911829,0.999273,0.97061,0.969883,0.911829,0.999273,0.911829,0.985305,0.058781,0.981631,0.058781,0.981631,0,0.985305,0.058781,0.981631,0,0.985305,0,0.360032,0.971336,0.356359,0.971336,0.356359,0.912556,0.360032,0.971336,0.356359,0.912556,0.360032,0.912556,0.412919,0.912556,0.382802,0.912556,0.382802,0.853775,0.412919,0.912556,0.382802,0.853775,0.412919,0.853775,0.352685,0.853775,0.352685,0.735487,0.411465,0.735487,0.352685,0.853775,0.411465,0.735487,0.411465,0.853775,1,0.058781,0.996326,0.058781,0.996326,0,1,0.058781,0.996326,0,1,0,0.374728,0.971336,0.371054,0.971336,0.371054,0.912556,0.374728,0.971336,0.371054,0.912556,0.374728,0.912556,0.176342,0.941219,0.205733,0.941219,0.205733,1,0.176342,0.941219,0.205733,1,0.176342,1,0.36738,0.971336,0.363706,0.971336,0.363706,0.912556,0.36738,0.971336,0.363706,0.912556,0.36738,0.912556,0.117562,0.793541,0.117562,0.911829,0.058781,0.911829,0.117562,0.793541,0.058781,0.911829,0.058781,0.793541,0.999273,0.911829,0.969883,0.911829,0.969883,0.853048,0.999273,0.911829,0.969883,0.853048,0.999273,0.853048,0.382075,0.971336,0.378401,0.971336,0.378401,0.912556,0.382075,0.971336,0.378401,0.912556,0.382075,0.912556,1,0.235123,0.97061,0.235123,0.97061,0.176342,1,0.235123,0.97061,0.176342,1,0.176342,0.999273,0.735486,0.969883,0.735486,0.969883,0.676706,0.999273,0.735486,0.969883,0.676706,0.999273,0.676706,0.058781,0.793541,0.058781,0.529027,0.117562,0.529027,0.058781,0.793541,0.117562,0.529027,0.117562,0.793541,0.529027,0.529754,0.529027,0,0.587807,0,0.529027,0.529754,0.587807,0,0.587808,0.529754,0.411466,0.735486,0.411466,0.529027,0.470246,0.529027,0.411466,0.735486,0.470246,0.529027,0.470246,0.735486,0.26084,0.940493,0.264514,0.940493,0.264514,0.999273,0.26084,0.940493,0.264514,0.999273,0.26084,0.999273,1,0.117562,0.97061,0.117562,0.97061,0.058781,1,0.117562,0.97061,0.058781,1,0.058781,0.412192,0.971336,0.382802,0.971336,0.382802,0.912556,0.412192,0.971336,0.382802,0.912556,0.412192,0.912556,0.940492,0.971336,0.911102,0.971336,0.911102,0.912556,0.940492,0.971336,0.911102,0.912556,0.940492,0.912556,0.058781,0.529027,0.058781,0.793541,0,0.793541,0.058781,0.529027,0,0.793541,0,0.529027,0.352685,0.529027,0.352685,0.793541,0.293904,0.793541,0.352685,0.529027,0.293904,0.793541,0.293904,0.529027,0.646588,0,0.646588,0.529754,0.587808,0.529754,0.646588,0,0.587808,0.529754,0.587808,0,0.411465,0.529027,0.411466,0.735486,0.352685,0.735486,0.411465,0.529027,0.352685,0.735486,0.352685,0.529027,0.246145,0.940493,0.249818,0.940493,0.249818,0.999273,0.246145,0.940493,0.249818,0.999273,0.246145,0.999273,0.798668,0.999274,0.794994,0.999274,0.794994,0.940493,0.798668,0.999274,0.794994,0.940493,0.798668,0.940493,0.881712,0,0.881712,0.470246,0.822931,0.470246,0.881712,0,0.822931,0.470246,0.822931,0,0.793541,0.999273,0.76415,0.999273,0.76415,0.940493,0.793541,0.999273,0.76415,0.940493,0.793541,0.940493,0.253492,0.940493,0.257166,0.940493,0.257166,0.999273,0.253492,0.940493,0.257166,0.999273,0.253492,0.999273,0.235123,0.529027,0.235123,0.793541,0.176342,0.793541,0.235123,0.529027,0.176342,0.793541,0.176342,0.529027,0.090351,0.97061,0.060234,0.97061,0.060234,0.911829,0.090351,0.97061,0.060234,0.911829,0.090351,0.911829,0.705369,0.853048,0.705369,0.73476,0.76415,0.73476,0.705369,0.853048,0.76415,0.73476,0.76415,0.853048,0.238797,0.940493,0.242471,0.940493,0.242471,0.999273,0.238797,0.940493,0.242471,0.999273,0.238797,0.999273,0.813363,0.999274,0.809689,0.999274,0.809689,0.940493,0.813363,0.999274,0.809689,0.940493,0.813363,0.940493,0.822931,0,0.822931,0.470246,0.76415,0.470246,0.822931,0,0.76415,0.470246,0.76415,0,0.969883,0.794267,0.999273,0.794267,0.999273,0.853048,0.969883,0.794267,0.999273,0.853048,0.969883,0.853048,0.257166,0.940493,0.26084,0.940493,0.26084,0.999273,0.257166,0.940493,0.26084,0.999273,0.257166,0.999273,0.806015,0.999274,0.802342,0.999274,0.802342,0.940493,0.806015,0.999274,0.802342,0.940493,0.806015,0.940493,0.322568,0.97061,0.292451,0.97061,0.292451,0.911829,0.322568,0.97061,0.292451,0.911829,0.322568,0.911829,0.470246,0.735487,0.470246,0.853775,0.411466,0.853775,0.470246,0.735487,0.411466,0.853775,0.411466,0.735487,0.242471,0.940493,0.246145,0.940493,0.246145,0.999273,0.242471,0.940493,0.246145,0.999273,0.242471,0.999273,0.820711,0.999273,0.817037,0.999273,0.817037,0.940493,0.820711,0.999273,0.817037,0.940493,0.820711,0.940493,0.646588,0.529754,0.646588,0.676706,0.587808,0.676706,0.646588,0.529754,0.587808,0.676706,0.587808,0.529754,0.853775,0.999273,0.824385,0.999273,0.824385,0.940493,0.853775,0.999273,0.824385,0.940493,0.853775,0.940493,0.249818,0.940493,0.253492,0.940493,0.253492,0.999273,0.249818,0.940493,0.253492,0.999273,0.249818,0.999273,0.802342,0.999274,0.798668,0.999274,0.798668,0.940493,0.802342,0.999274,0.798668,0.940493,0.802342,0.940493,0.060234,0.97061,0.030117,0.97061,0.030117,0.911829,0.060234,0.97061,0.030117,0.911829,0.060234,0.911829,0.382802,0.912556,0.352685,0.912556,0.352685,0.853775,0.382802,0.912556,0.352685,0.853775,0.382802,0.853775,0.235123,0.940493,0.238797,0.940493,0.238797,0.999273,0.235123,0.940493,0.238797,0.999273,0.235123,0.999273,0.817037,0.999273,0.813363,0.999274,0.813363,0.940493,0.817037,0.999273,0.813363,0.940493,0.817037,0.940493,0.587807,0.529754,0.587807,0.676706,0.529027,0.676706,0.587807,0.529754,0.529027,0.676706,0.529027,0.529754,0.351958,0.999273,0.322568,0.999273,0.322568,0.940493,0.351958,0.999273,0.322568,0.940493,0.351958,0.940493,0.809689,0.999274,0.806015,0.999274,0.806015,0.940493,0.809689,0.999274,0.806015,0.940493,0.809689,0.940493,0.207913,0.941219,0.177796,0.941219,0.177796,0.882438,0.207913,0.941219,0.177796,0.882438,0.207913,0.882438,0.443036,0.912556,0.412919,0.912556,0.412919,0.853775,0.443036,0.912556,0.412919,0.853775,0.443036,0.853775,0.824385,0.999273,0.820711,0.999273,0.820711,0.940493,0.824385,0.999273,0.820711,0.940493,0.824385,0.940493,0.441583,0.971336,0.412192,0.971336,0.412192,0.912556,0.441583,0.971336,0.412192,0.912556,0.441583,0.912556,0.146952,1,0.117562,1,0.117562,0.941219,0.146952,1,0.117562,0.941219,0.146952,0.941219,0.030117,0.97061,0,0.97061,0,0.911829,0.030117,0.97061,0,0.911829,0.030117,0.911829,0.117562,0.882438,0.117562,0.793541,0.176342,0.793541,0.117562,0.882438,0.176342,0.793541,0.176342,0.882438,0.176342,1,0.146952,1,0.146952,0.941219,0.176342,1,0.146952,0.941219,0.176342,0.941219,0.499637,0.97061,0.470246,0.97061,0.470246,0.911829,0.499637,0.97061,0.470246,0.911829,0.499637,0.911829,1,0.176342,0.97061,0.176342,0.97061,0.117562,1,0.176342,0.97061,0.117562,1,0.117562,0.76415,0.470246,0.76415,0.73476,0.705369,0.73476,0.76415,0.470246,0.705369,0.73476,0.705369,0.470246,0.177796,0.941219,0.147679,0.941219,0.147679,0.882438,0.177796,0.941219,0.147679,0.882438,0.177796,0.882438,0.235123,0.793541,0.235123,0.882438,0.176342,0.882438,0.235123,0.793541,0.176342,0.882438,0.176342,0.793541,0.974283,0.058781,0.97061,0.058781,0.97061,0,0.974283,0.058781,0.97061,0,0.974283,0,0.999273,0.794267,0.969883,0.794267,0.969883,0.735486,0.999273,0.794267,0.969883,0.735486,0.999273,0.735486,0.235123,1,0.205733,1,0.205733,0.941219,0.235123,1,0.205733,0.941219,0.235123,0.941219,0.529027,0,0.529027,0.529027,0,0.529027,0.529027,0,0,0.529027,0,0],\"normal\":[0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]}"); // !! 必须通过主文件来读取文本，所以，我只能把读好的env对象传进来

exports.env = env;
var loCannons = JSON.parse("{\"vertex\":[0.844948,1.122218,0.166475,0.861774,1.115276,0.16585,0.828121,1.115276,0.16585,0.861774,1.115276,0.16585,0.868744,1.098517,0.164341,0.828121,1.115276,0.16585,0.868744,1.098517,0.164341,0.861774,1.081758,0.162833,0.828121,1.115276,0.16585,0.861774,1.081758,0.162833,0.844948,1.074817,0.162208,0.828121,1.115276,0.16585,0.844948,1.074817,0.162208,0.828121,1.081758,0.162833,0.828121,1.115276,0.16585,0.828121,1.081758,0.162833,0.821151,1.098517,0.164341,0.828121,1.115276,0.16585,0.894262,0.949508,1.026681,0.894262,0.9461,1.091441,0.877436,0.95645,1.027306,0.877436,0.95645,1.027306,0.894262,0.9461,1.091441,0.875623,0.953789,1.092133,0.811252,0.982413,1.189936,0.792614,0.990102,1.190628,0.811252,0.977028,1.249768,0.811252,0.977028,1.249768,0.792614,0.990102,1.190628,0.792614,0.984717,1.250461,0.766255,0.963849,1.188265,0.773975,0.945286,1.186594,0.766255,0.958464,1.248097,0.766255,0.958464,1.248097,0.773975,0.945286,1.186594,0.773975,0.9399,1.246427,0.894262,0.937597,1.185902,0.912901,0.945286,1.186594,0.894262,0.932211,1.245734,0.894262,0.932211,1.245734,0.912901,0.945286,1.186594,0.912901,0.9399,1.246427,0.818973,0.963849,1.188265,0.811252,0.982413,1.189936,0.818973,0.958464,1.248097,0.818973,0.958464,1.248097,0.811252,0.982413,1.189936,0.811252,0.977028,1.249768,0.773975,0.982413,1.189936,0.766255,0.963849,1.188265,0.773975,0.977028,1.249768,0.773975,0.977028,1.249768,0.766255,0.963849,1.188265,0.766255,0.958464,1.248097,0.828121,1.081758,0.162833,0.844948,1.074817,0.162208,0.828121,1.00356,1.031546,0.828121,1.00356,1.031546,0.844948,1.074817,0.162208,0.844948,0.996619,1.030922,0.920621,0.972352,1.093804,0.912901,0.990916,1.095475,0.920621,0.963849,1.188265,0.920621,0.963849,1.188265,0.912901,0.990916,1.095475,0.912901,0.982413,1.189936,0.894262,0.976174,1.242912,0.882118,0.971164,1.242462,0.894262,0.983818,1.158,0.894262,0.983818,1.158,0.882118,0.971164,1.242462,0.882118,0.978808,1.15755,0.844948,1.122218,0.166475,0.828121,1.115276,0.16585,0.844948,1.04402,1.035188,0.844948,1.04402,1.035188,0.828121,1.115276,0.16585,0.828121,1.037078,1.034564,0.811252,0.945286,1.186594,0.818973,0.963849,1.188265,0.811252,0.9399,1.246427,0.811252,0.9399,1.246427,0.818973,0.963849,1.188265,0.818973,0.958464,1.248097,0.867903,0.972352,1.093804,0.875623,0.953789,1.092133,0.867903,0.963849,1.188265,0.867903,0.963849,1.188265,0.875623,0.953789,1.092133,0.875623,0.945286,1.186594,0.894262,1.075107,0.162234,0.911089,1.068165,0.161609,0.877436,1.068165,0.161609,0.911089,1.068165,0.161609,0.918059,1.051406,0.160101,0.877436,1.068165,0.161609,0.918059,1.051406,0.160101,0.911089,1.034647,0.158592,0.877436,1.068165,0.161609,0.911089,1.034647,0.158592,0.894262,1.027706,0.157967,0.877436,1.068165,0.161609,0.894262,1.027706,0.157967,0.877436,1.034647,0.158592,0.877436,1.068165,0.161609,0.877436,1.034647,0.158592,0.870466,1.051406,0.160101,0.877436,1.068165,0.161609,0.912901,0.990916,1.095475,0.894262,0.998605,1.096167,0.912901,0.982413,1.189936,0.912901,0.982413,1.189936,0.894262,0.998605,1.096167,0.894262,0.990102,1.190628,0.861774,1.081758,0.162833,0.868744,1.098517,0.164341,0.861774,1.00356,1.031546,0.861774,1.00356,1.031546,0.868744,1.098517,0.164341,0.868744,1.02032,1.033055,0.792614,0.990102,1.190628,0.773975,0.982413,1.189936,0.792614,0.984717,1.250461,0.792614,0.984717,1.250461,0.773975,0.982413,1.189936,0.773975,0.977028,1.249768,0.894262,0.9461,1.091441,0.912901,0.953789,1.092133,0.894262,0.937597,1.185902,0.894262,0.937597,1.185902,0.912901,0.953789,1.092133,0.912901,0.945286,1.186594,0.875623,0.953789,1.092133,0.894262,0.9461,1.091441,0.875623,0.945286,1.186594,0.875623,0.945286,1.186594,0.894262,0.9461,1.091441,0.894262,0.937597,1.185902,0.828121,1.115276,0.16585,0.821151,1.098517,0.164341,0.828121,1.037078,1.034564,0.828121,1.037078,1.034564,0.821151,1.098517,0.164341,0.821151,1.02032,1.033055,0.894262,0.932211,1.245734,0.912901,0.9399,1.246427,0.894262,0.941964,1.239833,0.894262,0.941964,1.239833,0.912901,0.9399,1.246427,0.906406,0.946974,1.240284,0.773975,0.945286,1.186594,0.792614,0.937597,1.185902,0.773975,0.9399,1.246427,0.773975,0.9399,1.246427,0.792614,0.937597,1.185902,0.792614,0.932211,1.245734,0.894262,0.998605,1.096167,0.875623,0.990916,1.095475,0.894262,0.990102,1.190628,0.894262,0.990102,1.190628,0.875623,0.990916,1.095475,0.875623,0.982413,1.189936,0.868744,1.098517,0.164341,0.861774,1.115276,0.16585,0.868744,1.02032,1.033055,0.868744,1.02032,1.033055,0.861774,1.115276,0.16585,0.861774,1.037078,1.034564,0.792614,0.984717,1.250461,0.773975,0.977028,1.249768,0.792614,0.976174,1.242912,0.792614,0.976174,1.242912,0.773975,0.977028,1.249768,0.78047,0.971164,1.242462,0.877436,1.034647,0.158592,0.894262,1.027706,0.157967,0.877436,0.95645,1.027306,0.877436,0.95645,1.027306,0.894262,1.027706,0.157967,0.894262,0.949508,1.026681,0.894262,1.075107,0.162234,0.877436,1.068165,0.161609,0.894262,0.996909,1.030948,0.894262,0.996909,1.030948,0.877436,1.068165,0.161609,0.877436,0.989967,1.030323,0.773975,0.990916,1.095475,0.766255,0.972352,1.093804,0.773975,0.982413,1.189936,0.773975,0.982413,1.189936,0.766255,0.972352,1.093804,0.766255,0.963849,1.188265,0.811252,0.953789,1.092133,0.818973,0.972352,1.093804,0.811252,0.945286,1.186594,0.811252,0.945286,1.186594,0.818973,0.972352,1.093804,0.818973,0.963849,1.188265,0.821151,1.098517,0.164341,0.828121,1.081758,0.162833,0.821151,1.02032,1.033055,0.821151,1.02032,1.033055,0.828121,1.081758,0.162833,0.828121,1.00356,1.031546,0.875623,0.9399,1.246427,0.894262,0.932211,1.245734,0.882118,0.946974,1.240284,0.882118,0.946974,1.240284,0.894262,0.932211,1.245734,0.894262,0.941964,1.239833,0.912901,0.953789,1.092133,0.920621,0.972352,1.093804,0.912901,0.945286,1.186594,0.912901,0.945286,1.186594,0.920621,0.972352,1.093804,0.920621,0.963849,1.188265,0.911089,1.034647,0.158592,0.918059,1.051406,0.160101,0.911089,0.95645,1.027306,0.911089,0.95645,1.027306,0.918059,1.051406,0.160101,0.918059,0.973209,1.028814,0.861774,1.115276,0.16585,0.844948,1.122218,0.166475,0.861774,1.037078,1.034564,0.861774,1.037078,1.034564,0.844948,1.122218,0.166475,0.844948,1.04402,1.035188,0.792614,0.998605,1.096167,0.773975,0.990916,1.095475,0.792614,0.990102,1.190628,0.792614,0.990102,1.190628,0.773975,0.990916,1.095475,0.773975,0.982413,1.189936,0.875623,0.990916,1.095475,0.867903,0.972352,1.093804,0.875623,0.982413,1.189936,0.875623,0.982413,1.189936,0.867903,0.972352,1.093804,0.867903,0.963849,1.188265,0.877436,1.068165,0.161609,0.870466,1.051406,0.160101,0.877436,0.989967,1.030323,0.877436,0.989967,1.030323,0.870466,1.051406,0.160101,0.870466,0.973209,1.028814,0.844948,1.074817,0.162208,0.861774,1.081758,0.162833,0.844948,0.996619,1.030922,0.844948,0.996619,1.030922,0.861774,1.081758,0.162833,0.861774,1.00356,1.031546,0.894262,0.984717,1.250461,0.875623,0.977028,1.249768,0.894262,0.976174,1.242912,0.894262,0.976174,1.242912,0.875623,0.977028,1.249768,0.882118,0.971164,1.242462,0.912901,0.977028,1.249768,0.894262,0.984717,1.250461,0.906406,0.971164,1.242462,0.906406,0.971164,1.242462,0.894262,0.984717,1.250461,0.894262,0.976174,1.242912,0.773975,0.953789,1.092133,0.792614,0.9461,1.091441,0.773975,0.945286,1.186594,0.773975,0.945286,1.186594,0.792614,0.9461,1.091441,0.792614,0.937597,1.185902,0.792614,0.9461,1.091441,0.811252,0.953789,1.092133,0.792614,0.937597,1.185902,0.792614,0.937597,1.185902,0.811252,0.953789,1.092133,0.811252,0.945286,1.186594,0.875623,0.945286,1.186594,0.894262,0.937597,1.185902,0.875623,0.9399,1.246427,0.875623,0.9399,1.246427,0.894262,0.937597,1.185902,0.894262,0.932211,1.245734,0.867903,0.958464,1.248097,0.875623,0.9399,1.246427,0.877088,0.959069,1.241373,0.877088,0.959069,1.241373,0.875623,0.9399,1.246427,0.882118,0.946974,1.240284,0.811252,0.990916,1.095475,0.792614,0.998605,1.096167,0.811252,0.982413,1.189936,0.811252,0.982413,1.189936,0.792614,0.998605,1.096167,0.792614,0.990102,1.190628,0.766255,0.972352,1.093804,0.773975,0.953789,1.092133,0.766255,0.963849,1.188265,0.766255,0.963849,1.188265,0.773975,0.953789,1.092133,0.773975,0.945286,1.186594,0.918059,1.051406,0.160101,0.911089,1.068165,0.161609,0.918059,0.973209,1.028814,0.918059,0.973209,1.028814,0.911089,1.068165,0.161609,0.911089,0.989967,1.030323,0.894262,0.990102,1.190628,0.875623,0.982413,1.189936,0.894262,0.984717,1.250461,0.894262,0.984717,1.250461,0.875623,0.982413,1.189936,0.875623,0.977028,1.249768,0.844948,0.996619,1.030922,0.861774,1.00356,1.031546,0.844948,0.993211,1.095682,0.844948,0.993211,1.095682,0.861774,1.00356,1.031546,0.863586,1.0009,1.096374,0.920621,0.958464,1.248097,0.912901,0.977028,1.249768,0.911437,0.959069,1.241373,0.911437,0.959069,1.241373,0.912901,0.977028,1.249768,0.906406,0.971164,1.242462,0.818973,0.972352,1.093804,0.811252,0.990916,1.095475,0.818973,0.963849,1.188265,0.818973,0.963849,1.188265,0.811252,0.990916,1.095475,0.811252,0.982413,1.189936,0.792614,0.937597,1.185902,0.811252,0.945286,1.186594,0.792614,0.932211,1.245734,0.792614,0.932211,1.245734,0.811252,0.945286,1.186594,0.811252,0.9399,1.246427,0.828121,1.037078,1.034564,0.826309,1.038027,1.099716,0.844948,1.04402,1.035188,0.844948,1.04402,1.035188,0.826309,1.038027,1.099716,0.844948,1.045716,1.100408,0.870466,1.051406,0.160101,0.877436,1.034647,0.158592,0.870466,0.973209,1.028814,0.870466,0.973209,1.028814,0.877436,1.034647,0.158592,0.877436,0.95645,1.027306,0.868744,1.02032,1.033055,0.861774,1.037078,1.034564,0.871307,1.019463,1.098045,0.871307,1.019463,1.098045,0.861774,1.037078,1.034564,0.863586,1.038027,1.099716,0.875623,0.977028,1.249768,0.867903,0.958464,1.248097,0.882118,0.971164,1.242462,0.882118,0.971164,1.242462,0.867903,0.958464,1.248097,0.877088,0.959069,1.241373,0.792614,0.949508,1.026681,0.792614,0.9461,1.091441,0.775787,0.95645,1.027306,0.775787,0.95645,1.027306,0.792614,0.9461,1.091441,0.773975,0.953789,1.092133,0.912901,0.945286,1.186594,0.920621,0.963849,1.188265,0.912901,0.9399,1.246427,0.912901,0.9399,1.246427,0.920621,0.963849,1.188265,0.920621,0.958464,1.248097,0.861774,1.00356,1.031546,0.868744,1.02032,1.033055,0.863586,1.0009,1.096374,0.863586,1.0009,1.096374,0.868744,1.02032,1.033055,0.871307,1.019463,1.098045,0.828121,1.00356,1.031546,0.826309,1.0009,1.096374,0.821151,1.02032,1.033055,0.821151,1.02032,1.033055,0.826309,1.0009,1.096374,0.818588,1.019463,1.098045,0.911089,1.068165,0.161609,0.894262,1.075107,0.162234,0.911089,0.989967,1.030323,0.911089,0.989967,1.030323,0.894262,1.075107,0.162234,0.894262,0.996909,1.030948,0.821151,1.02032,1.033055,0.818588,1.019463,1.098045,0.828121,1.037078,1.034564,0.828121,1.037078,1.034564,0.818588,1.019463,1.098045,0.826309,1.038027,1.099716,0.875623,0.982413,1.189936,0.867903,0.963849,1.188265,0.875623,0.977028,1.249768,0.875623,0.977028,1.249768,0.867903,0.963849,1.188265,0.867903,0.958464,1.248097,0.861774,1.037078,1.034564,0.844948,1.04402,1.035188,0.863586,1.038027,1.099716,0.863586,1.038027,1.099716,0.844948,1.04402,1.035188,0.844948,1.045716,1.100408,0.920621,0.963849,1.188265,0.912901,0.982413,1.189936,0.920621,0.958464,1.248097,0.920621,0.958464,1.248097,0.912901,0.982413,1.189936,0.912901,0.977028,1.249768,0.809441,0.989967,1.030323,0.792614,0.996909,1.030948,0.811252,0.990916,1.095475,0.811252,0.990916,1.095475,0.792614,0.996909,1.030948,0.792614,0.998605,1.096167,0.867903,0.963849,1.188265,0.875623,0.945286,1.186594,0.867903,0.958464,1.248097,0.867903,0.958464,1.248097,0.875623,0.945286,1.186594,0.875623,0.9399,1.246427,0.844948,0.996619,1.030922,0.844948,0.993211,1.095682,0.828121,1.00356,1.031546,0.828121,1.00356,1.031546,0.844948,0.993211,1.095682,0.826309,1.0009,1.096374,0.912901,0.9399,1.246427,0.920621,0.958464,1.248097,0.906406,0.946974,1.240284,0.906406,0.946974,1.240284,0.920621,0.958464,1.248097,0.911437,0.959069,1.241373,0.912901,0.982413,1.189936,0.894262,0.990102,1.190628,0.912901,0.977028,1.249768,0.912901,0.977028,1.249768,0.894262,0.990102,1.190628,0.894262,0.984717,1.250461,0.804758,0.946974,1.240284,0.809789,0.959069,1.241372,0.804758,0.954617,1.155372,0.804758,0.954617,1.155372,0.809789,0.959069,1.241372,0.809789,0.966713,1.156461,0.768817,0.973209,1.028814,0.766255,0.972352,1.093804,0.775787,0.989967,1.030323,0.775787,0.989967,1.030323,0.766255,0.972352,1.093804,0.773975,0.990916,1.095475,0.894262,0.983818,1.158,0.882118,0.978808,1.15755,0.906406,0.978808,1.15755,0.882118,0.978808,1.15755,0.877088,0.966713,1.156461,0.906406,0.978808,1.15755,0.877088,0.966713,1.156461,0.882118,0.954617,1.155372,0.906406,0.978808,1.15755,0.882118,0.954617,1.155372,0.894262,0.949607,1.154921,0.906406,0.978808,1.15755,0.894262,0.949607,1.154921,0.906406,0.954617,1.155372,0.906406,0.978808,1.15755,0.906406,0.954617,1.155372,0.911437,0.966713,1.156461,0.906406,0.978808,1.15755,0.844948,0.984708,1.190142,0.863586,0.992397,1.190835,0.844948,0.979322,1.249975,0.844948,0.979322,1.249975,0.863586,0.992397,1.190835,0.863586,0.987011,1.250667,0.871307,1.019463,1.098045,0.863586,1.038027,1.099716,0.871307,1.01096,1.192506,0.871307,1.01096,1.192506,0.863586,1.038027,1.099716,0.863586,1.029524,1.194177,0.894262,0.941964,1.239833,0.906406,0.946974,1.240284,0.894262,0.949607,1.154921,0.894262,0.949607,1.154921,0.906406,0.946974,1.240284,0.906406,0.954617,1.155372,0.775787,0.95645,1.027306,0.773975,0.953789,1.092133,0.768817,0.973209,1.028814,0.768817,0.973209,1.028814,0.773975,0.953789,1.092133,0.766255,0.972352,1.093804,0.809441,0.95645,1.027306,0.816411,0.973209,1.028814,0.811252,0.953789,1.092133,0.811252,0.953789,1.092133,0.816411,0.973209,1.028814,0.818973,0.972352,1.093804,0.894262,1.027706,0.157967,0.911089,1.034647,0.158592,0.894262,0.949508,1.026681,0.894262,0.949508,1.026681,0.911089,1.034647,0.158592,0.911089,0.95645,1.027306,0.78047,0.971164,1.242462,0.775439,0.959069,1.241372,0.78047,0.978808,1.15755,0.78047,0.978808,1.15755,0.775439,0.959069,1.241372,0.775439,0.966713,1.156461,0.818588,1.019463,1.098045,0.826309,1.0009,1.096374,0.818588,1.01096,1.192506,0.818588,1.01096,1.192506,0.826309,1.0009,1.096374,0.826309,0.992397,1.190835,0.882118,0.946974,1.240284,0.894262,0.941964,1.239833,0.882118,0.954617,1.155372,0.882118,0.954617,1.155372,0.894262,0.941964,1.239833,0.894262,0.949607,1.154921,0.809789,0.959069,1.241372,0.804758,0.971164,1.242462,0.809789,0.966713,1.156461,0.809789,0.966713,1.156461,0.804758,0.971164,1.242462,0.804758,0.978808,1.15755,0.863586,1.038027,1.099716,0.844948,1.045716,1.100408,0.863586,1.029524,1.194177,0.863586,1.029524,1.194177,0.844948,1.045716,1.100408,0.844948,1.037213,1.194869,0.816411,0.973209,1.028814,0.809441,0.989967,1.030323,0.818973,0.972352,1.093804,0.818973,0.972352,1.093804,0.809441,0.989967,1.030323,0.811252,0.990916,1.095475,0.844948,0.993211,1.095682,0.863586,1.0009,1.096374,0.844948,0.984708,1.190142,0.844948,0.984708,1.190142,0.863586,1.0009,1.096374,0.863586,0.992397,1.190835,0.894262,0.949508,1.026681,0.911089,0.95645,1.027306,0.894262,0.9461,1.091441,0.894262,0.9461,1.091441,0.911089,0.95645,1.027306,0.912901,0.953789,1.092133,0.775787,0.989967,1.030323,0.773975,0.990916,1.095475,0.792614,0.996909,1.030948,0.792614,0.996909,1.030948,0.773975,0.990916,1.095475,0.792614,0.998605,1.096167,0.775439,0.959069,1.241372,0.78047,0.946974,1.240284,0.775439,0.966713,1.156461,0.775439,0.966713,1.156461,0.78047,0.946974,1.240284,0.78047,0.954617,1.155372,0.826309,1.0009,1.096374,0.844948,0.993211,1.095682,0.826309,0.992397,1.190835,0.826309,0.992397,1.190835,0.844948,0.993211,1.095682,0.844948,0.984708,1.190142,0.844948,1.045716,1.100408,0.826309,1.038027,1.099716,0.844948,1.037213,1.194869,0.844948,1.037213,1.194869,0.826309,1.038027,1.099716,0.826309,1.029524,1.194177,0.906406,0.971164,1.242462,0.894262,0.976174,1.242912,0.906406,0.978808,1.15755,0.906406,0.978808,1.15755,0.894262,0.976174,1.242912,0.894262,0.983818,1.158,0.804758,0.971164,1.242462,0.792614,0.976174,1.242912,0.804758,0.978808,1.15755,0.804758,0.978808,1.15755,0.792614,0.976174,1.242912,0.792614,0.983818,1.158,0.792614,0.949508,1.026681,0.809441,0.95645,1.027306,0.792614,0.9461,1.091441,0.792614,0.9461,1.091441,0.809441,0.95645,1.027306,0.811252,0.953789,1.092133,0.863586,1.0009,1.096374,0.871307,1.019463,1.098045,0.863586,0.992397,1.190835,0.863586,0.992397,1.190835,0.871307,1.019463,1.098045,0.871307,1.01096,1.192506,0.877088,0.959069,1.241373,0.882118,0.946974,1.240284,0.877088,0.966713,1.156461,0.877088,0.966713,1.156461,0.882118,0.946974,1.240284,0.882118,0.954617,1.155372,0.78047,0.946974,1.240284,0.792614,0.941964,1.239833,0.78047,0.954617,1.155372,0.78047,0.954617,1.155372,0.792614,0.941964,1.239833,0.792614,0.949607,1.154921,0.792614,1.027706,0.157967,0.809441,1.034647,0.158592,0.792614,0.949508,1.026681,0.792614,0.949508,1.026681,0.809441,1.034647,0.158592,0.809441,0.95645,1.027306,0.792614,0.941964,1.239833,0.804758,0.946974,1.240284,0.792614,0.949607,1.154921,0.792614,0.949607,1.154921,0.804758,0.946974,1.240284,0.804758,0.954617,1.155372,0.877436,0.989967,1.030323,0.875623,0.990916,1.095475,0.894262,0.996909,1.030948,0.894262,0.996909,1.030948,0.875623,0.990916,1.095475,0.894262,0.998605,1.096167,0.792614,0.983818,1.158,0.78047,0.978808,1.15755,0.804758,0.978808,1.15755,0.78047,0.978808,1.15755,0.775439,0.966713,1.156461,0.804758,0.978808,1.15755,0.804758,0.978808,1.15755,0.775439,0.966713,1.156461,0.809789,0.966713,1.156461,0.775439,0.966713,1.156461,0.78047,0.954617,1.155372,0.809789,0.966713,1.156461,0.78047,0.954617,1.155372,0.792614,0.949607,1.154921,0.809789,0.966713,1.156461,0.792614,0.949607,1.154921,0.804758,0.954617,1.155372,0.809789,0.966713,1.156461,0.826309,1.038027,1.099716,0.818588,1.019463,1.098045,0.826309,1.029524,1.194177,0.826309,1.029524,1.194177,0.818588,1.019463,1.098045,0.818588,1.01096,1.192506,0.918059,0.973209,1.028814,0.911089,0.989967,1.030323,0.920621,0.972352,1.093804,0.920621,0.972352,1.093804,0.911089,0.989967,1.030323,0.912901,0.990916,1.095475,0.844948,1.031828,1.254701,0.826309,1.024138,1.254009,0.844948,1.023286,1.247153,0.844948,1.023286,1.247153,0.826309,1.024138,1.254009,0.832803,1.018275,1.246702,0.811252,0.9399,1.246427,0.818973,0.958464,1.248097,0.804758,0.946974,1.240284,0.804758,0.946974,1.240284,0.818973,0.958464,1.248097,0.809789,0.959069,1.241372,0.809441,1.068165,0.161609,0.792614,1.075107,0.162234,0.809441,0.989967,1.030323,0.809441,0.989967,1.030323,0.792614,1.075107,0.162234,0.792614,0.996909,1.030948,0.826309,0.992397,1.190835,0.844948,0.984708,1.190142,0.826309,0.987011,1.250667,0.826309,0.987011,1.250667,0.844948,0.984708,1.190142,0.844948,0.979322,1.249975,0.844948,1.037213,1.194869,0.826309,1.029524,1.194177,0.844948,1.031828,1.254701,0.844948,1.031828,1.254701,0.826309,1.029524,1.194177,0.826309,1.024138,1.254009,0.911437,0.959069,1.241373,0.906406,0.971164,1.242462,0.911437,0.966713,1.156461,0.911437,0.966713,1.156461,0.906406,0.971164,1.242462,0.906406,0.978808,1.15755,0.773975,0.977028,1.249768,0.766255,0.958464,1.248097,0.78047,0.971164,1.242462,0.78047,0.971164,1.242462,0.766255,0.958464,1.248097,0.775439,0.959069,1.241372,0.768817,1.051406,0.160101,0.775787,1.034647,0.158592,0.768817,0.973209,1.028814,0.768817,0.973209,1.028814,0.775787,1.034647,0.158592,0.775787,0.95645,1.027306,0.818973,0.958464,1.248097,0.811252,0.977028,1.249768,0.809789,0.959069,1.241372,0.809789,0.959069,1.241372,0.811252,0.977028,1.249768,0.804758,0.971164,1.242462,0.863586,0.992397,1.190835,0.871307,1.01096,1.192506,0.863586,0.987011,1.250667,0.863586,0.987011,1.250667,0.871307,1.01096,1.192506,0.871307,1.005575,1.252338,0.882118,0.971164,1.242462,0.877088,0.959069,1.241373,0.882118,0.978808,1.15755,0.882118,0.978808,1.15755,0.877088,0.959069,1.241373,0.877088,0.966713,1.156461,0.816411,1.051406,0.160101,0.809441,1.068165,0.161609,0.816411,0.973209,1.028814,0.816411,0.973209,1.028814,0.809441,1.068165,0.161609,0.809441,0.989967,1.030323,0.766255,0.958464,1.248097,0.773975,0.9399,1.246427,0.775439,0.959069,1.241372,0.775439,0.959069,1.241372,0.773975,0.9399,1.246427,0.78047,0.946974,1.240284,0.826309,1.029524,1.194177,0.818588,1.01096,1.192506,0.826309,1.024138,1.254009,0.826309,1.024138,1.254009,0.818588,1.01096,1.192506,0.818588,1.005575,1.252338,0.911089,0.95645,1.027306,0.918059,0.973209,1.028814,0.912901,0.953789,1.092133,0.912901,0.953789,1.092133,0.918059,0.973209,1.028814,0.920621,0.972352,1.093804,0.811252,0.977028,1.249768,0.792614,0.984717,1.250461,0.804758,0.971164,1.242462,0.804758,0.971164,1.242462,0.792614,0.984717,1.250461,0.792614,0.976174,1.242912,0.775787,1.068165,0.161609,0.768817,1.051406,0.160101,0.775787,0.989967,1.030323,0.775787,0.989967,1.030323,0.768817,1.051406,0.160101,0.768817,0.973209,1.028814,0.871307,1.01096,1.192506,0.863586,1.029524,1.194177,0.871307,1.005575,1.252338,0.871307,1.005575,1.252338,0.863586,1.029524,1.194177,0.863586,1.024138,1.254009,0.809441,1.034647,0.158592,0.816411,1.051406,0.160101,0.809441,0.95645,1.027306,0.809441,0.95645,1.027306,0.816411,1.051406,0.160101,0.816411,0.973209,1.028814,0.877436,0.95645,1.027306,0.875623,0.953789,1.092133,0.870466,0.973209,1.028814,0.870466,0.973209,1.028814,0.875623,0.953789,1.092133,0.867903,0.972352,1.093804,0.773975,0.9399,1.246427,0.792614,0.932211,1.245734,0.78047,0.946974,1.240284,0.78047,0.946974,1.240284,0.792614,0.932211,1.245734,0.792614,0.941964,1.239833,0.870466,0.973209,1.028814,0.867903,0.972352,1.093804,0.877436,0.989967,1.030323,0.877436,0.989967,1.030323,0.867903,0.972352,1.093804,0.875623,0.990916,1.095475,0.792614,1.075107,0.162234,0.775787,1.068165,0.161609,0.792614,0.996909,1.030948,0.792614,0.996909,1.030948,0.775787,1.068165,0.161609,0.775787,0.989967,1.030323,0.775787,1.034647,0.158592,0.792614,1.027706,0.157967,0.775787,0.95645,1.027306,0.775787,0.95645,1.027306,0.792614,1.027706,0.157967,0.792614,0.949508,1.026681,0.906406,0.946974,1.240284,0.911437,0.959069,1.241373,0.906406,0.954617,1.155372,0.906406,0.954617,1.155372,0.911437,0.959069,1.241373,0.911437,0.966713,1.156461,0.792614,0.932211,1.245734,0.811252,0.9399,1.246427,0.792614,0.941964,1.239833,0.792614,0.941964,1.239833,0.811252,0.9399,1.246427,0.804758,0.946974,1.240284,0.818588,1.01096,1.192506,0.826309,0.992397,1.190835,0.818588,1.005575,1.252338,0.818588,1.005575,1.252338,0.826309,0.992397,1.190835,0.826309,0.987011,1.250667,0.911089,0.989967,1.030323,0.894262,0.996909,1.030948,0.912901,0.990916,1.095475,0.912901,0.990916,1.095475,0.894262,0.996909,1.030948,0.894262,0.998605,1.096167,0.792614,1.075107,0.162234,0.809441,1.068165,0.161609,0.775787,1.068165,0.161609,0.809441,1.068165,0.161609,0.816411,1.051406,0.160101,0.775787,1.068165,0.161609,0.816411,1.051406,0.160101,0.809441,1.034647,0.158592,0.775787,1.068165,0.161609,0.809441,1.034647,0.158592,0.792614,1.027706,0.157967,0.775787,1.068165,0.161609,0.792614,1.027706,0.157967,0.775787,1.034647,0.158592,0.775787,1.068165,0.161609,0.775787,1.034647,0.158592,0.768817,1.051406,0.160101,0.775787,1.068165,0.161609,0.792614,0.976174,1.242912,0.78047,0.971164,1.242462,0.792614,0.983818,1.158,0.792614,0.983818,1.158,0.78047,0.971164,1.242462,0.78047,0.978808,1.15755,0.863586,1.029524,1.194177,0.844948,1.037213,1.194869,0.863586,1.024138,1.254009,0.863586,1.024138,1.254009,0.844948,1.037213,1.194869,0.844948,1.031828,1.254701,0.844948,1.023286,1.247153,0.832803,1.018275,1.246702,0.844948,1.030929,1.162241,0.844948,1.030929,1.162241,0.832803,1.018275,1.246702,0.832803,1.025919,1.16179,0.844948,0.979322,1.249975,0.863586,0.987011,1.250667,0.844948,0.989075,1.244073,0.844948,0.989075,1.244073,0.863586,0.987011,1.250667,0.857092,0.994085,1.244525,0.826309,0.987011,1.250667,0.844948,0.979322,1.249975,0.832803,0.994085,1.244525,0.832803,0.994085,1.244525,0.844948,0.979322,1.249975,0.844948,0.989075,1.244073,0.863586,1.024138,1.254009,0.844948,1.031828,1.254701,0.857092,1.018275,1.246702,0.857092,1.018275,1.246702,0.844948,1.031828,1.254701,0.844948,1.023286,1.247153,0.818588,1.005575,1.252338,0.826309,0.987011,1.250667,0.827773,1.00618,1.245613,0.827773,1.00618,1.245613,0.826309,0.987011,1.250667,0.832803,0.994085,1.244525,0.871307,1.005575,1.252338,0.863586,1.024138,1.254009,0.862122,1.00618,1.245613,0.862122,1.00618,1.245613,0.863586,1.024138,1.254009,0.857092,1.018275,1.246702,0.826309,1.024138,1.254009,0.818588,1.005575,1.252338,0.832803,1.018275,1.246702,0.832803,1.018275,1.246702,0.818588,1.005575,1.252338,0.827773,1.00618,1.245613,0.863586,0.987011,1.250667,0.871307,1.005575,1.252338,0.857092,0.994085,1.244525,0.857092,0.994085,1.244525,0.871307,1.005575,1.252338,0.862122,1.00618,1.245613,0.844948,1.030929,1.162241,0.832803,1.025919,1.16179,0.857092,1.025919,1.16179,0.832803,1.025919,1.16179,0.827773,1.013824,1.160701,0.857092,1.025919,1.16179,0.827773,1.013824,1.160701,0.832803,1.001728,1.159613,0.857092,1.025919,1.16179,0.832803,1.001728,1.159613,0.844948,0.996718,1.159162,0.857092,1.025919,1.16179,0.844948,0.996718,1.159162,0.857092,1.001728,1.159613,0.857092,1.025919,1.16179,0.857092,1.001728,1.159613,0.862122,1.013824,1.160701,0.857092,1.025919,1.16179,0.844948,0.989075,1.244073,0.857092,0.994085,1.244525,0.844948,0.996718,1.159162,0.844948,0.996718,1.159162,0.857092,0.994085,1.244525,0.857092,1.001728,1.159613,0.832803,0.994085,1.244525,0.844948,0.989075,1.244073,0.832803,1.001728,1.159613,0.832803,1.001728,1.159613,0.844948,0.989075,1.244073,0.844948,0.996718,1.159162,0.857092,1.018275,1.246702,0.844948,1.023286,1.247153,0.857092,1.025919,1.16179,0.857092,1.025919,1.16179,0.844948,1.023286,1.247153,0.844948,1.030929,1.162241,0.827773,1.00618,1.245613,0.832803,0.994085,1.244525,0.827773,1.013824,1.160701,0.827773,1.013824,1.160701,0.832803,0.994085,1.244525,0.832803,1.001728,1.159613,0.862122,1.00618,1.245613,0.857092,1.018275,1.246702,0.862122,1.013824,1.160701,0.862122,1.013824,1.160701,0.857092,1.018275,1.246702,0.857092,1.025919,1.16179,0.832803,1.018275,1.246702,0.827773,1.00618,1.245613,0.832803,1.025919,1.16179,0.832803,1.025919,1.16179,0.827773,1.00618,1.245613,0.827773,1.013824,1.160701,0.857092,0.994085,1.244525,0.862122,1.00618,1.245613,0.857092,1.001728,1.159613,0.857092,1.001728,1.159613,0.862122,1.00618,1.245613,0.862122,1.013824,1.160701,0.811515,1.120514,-0.56401,0.820897,1.143074,-0.561979,0.808692,1.1594,-0.996005,0.808692,1.1594,-0.996005,0.820897,1.143074,-0.561979,0.818901,1.183948,-0.993795,0.818901,1.134853,-0.998215,0.808692,1.1594,-0.996005,0.827107,1.147329,-1.045285,0.827107,1.147329,-1.045285,0.808692,1.1594,-0.996005,0.820296,1.163704,-1.043811,0.875581,1.120514,-0.56401,0.866199,1.097955,-0.566041,0.878404,1.1594,-0.996005,0.878404,1.1594,-0.996005,0.866199,1.097955,-0.566041,0.868195,1.134853,-0.998215,0.820897,1.143074,-0.561979,0.843548,1.152418,-0.561138,0.818901,1.183948,-0.993795,0.818901,1.183948,-0.993795,0.843548,1.152418,-0.561138,0.843548,1.194116,-0.99288,0.866199,1.097955,-0.566041,0.843548,1.088611,-0.566881,0.868195,1.134853,-0.998215,0.868195,1.134853,-0.998215,0.843548,1.088611,-0.566881,0.843548,1.124684,-0.99913,0.843548,1.088611,-0.566881,0.820897,1.097955,-0.566041,0.843548,1.124684,-0.99913,0.843548,1.124684,-0.99913,0.820897,1.097955,-0.566041,0.818901,1.134853,-0.998215,0.843548,1.152418,-0.561138,0.866199,1.143074,-0.561979,0.843548,1.194116,-0.99288,0.843548,1.194116,-0.99288,0.866199,1.143074,-0.561979,0.868195,1.183948,-0.993795,0.820897,1.097955,-0.566041,0.811515,1.120514,-0.56401,0.818901,1.134853,-0.998215,0.818901,1.134853,-0.998215,0.811515,1.120514,-0.56401,0.808692,1.1594,-0.996005,0.866199,1.143074,-0.561979,0.875581,1.120514,-0.56401,0.868195,1.183948,-0.993795,0.868195,1.183948,-0.993795,0.875581,1.120514,-0.56401,0.878404,1.1594,-0.996005,0.868195,1.183948,-0.993795,0.878404,1.1594,-0.996005,0.859989,1.180079,-1.042337,0.859989,1.180079,-1.042337,0.878404,1.1594,-0.996005,0.8668,1.163704,-1.043811,0.808692,1.1594,-0.996005,0.818901,1.183948,-0.993795,0.820296,1.163704,-1.043811,0.820296,1.163704,-1.043811,0.818901,1.183948,-0.993795,0.827107,1.180079,-1.042337,0.878404,1.1594,-0.996005,0.868195,1.134853,-0.998215,0.8668,1.163704,-1.043811,0.8668,1.163704,-1.043811,0.868195,1.134853,-0.998215,0.859989,1.147329,-1.045285,0.818901,1.183948,-0.993795,0.843548,1.194116,-0.99288,0.827107,1.180079,-1.042337,0.827107,1.180079,-1.042337,0.843548,1.194116,-0.99288,0.843548,1.186862,-1.041726,0.868195,1.134853,-0.998215,0.843548,1.124684,-0.99913,0.859989,1.147329,-1.045285,0.859989,1.147329,-1.045285,0.843548,1.124684,-0.99913,0.843548,1.140546,-1.045895,0.843548,1.124684,-0.99913,0.818901,1.134853,-0.998215,0.843548,1.140546,-1.045895,0.843548,1.140546,-1.045895,0.818901,1.134853,-0.998215,0.827107,1.147329,-1.045285,0.843548,1.194116,-0.99288,0.868195,1.183948,-0.993795,0.843548,1.186862,-1.041726,0.843548,1.186862,-1.041726,0.868195,1.183948,-0.993795,0.859989,1.180079,-1.042337,-0.842947,0.886168,1.181311,-0.842948,0.880812,1.241147,-0.861586,0.893858,1.182,-0.861586,0.893858,1.182,-0.842948,0.880812,1.241147,-0.861586,0.888501,1.241835,-0.844951,1.122415,0.166459,-0.828124,1.115473,0.165838,-0.861777,1.115473,0.165838,-0.828124,1.115473,0.165838,-0.821154,1.098713,0.164338,-0.861777,1.115473,0.165838,-0.821154,1.098713,0.164338,-0.828124,1.081954,0.162837,-0.861777,1.115473,0.165838,-0.828124,1.081954,0.162837,-0.844951,1.075012,0.162216,-0.861777,1.115473,0.165838,-0.844951,1.075012,0.162216,-0.861777,1.081954,0.162837,-0.861777,1.115473,0.165838,-0.861777,1.081954,0.162837,-0.868748,1.098713,0.164338,-0.861777,1.115473,0.165838,-0.875635,0.95444,1.092201,-0.894274,0.94675,1.091513,-0.877447,0.957068,1.027372,-0.877447,0.957068,1.027372,-0.894274,0.94675,1.091513,-0.894273,0.950127,1.02675,-0.811265,0.983112,1.18999,-0.811265,0.977755,1.249826,-0.792626,0.990801,1.190679,-0.792626,0.990801,1.190679,-0.811265,0.977755,1.249826,-0.792627,0.985445,1.250514,-0.766267,0.964547,1.188329,-0.766268,0.959191,1.248164,-0.773988,0.945983,1.186667,-0.773988,0.945983,1.186667,-0.766268,0.959191,1.248164,-0.773988,0.940626,1.246502,-0.824308,0.902315,1.087535,-0.842947,0.894625,1.086846,-0.826119,0.904943,1.022706,-0.826119,0.904943,1.022706,-0.842947,0.894625,1.086846,-0.842946,0.898001,1.022085,-0.894274,0.938293,1.185977,-0.894275,0.932937,1.245813,-0.912913,0.945983,1.186666,-0.912913,0.945983,1.186666,-0.894275,0.932937,1.245813,-0.912913,0.940626,1.246501,-0.818985,0.964547,1.188328,-0.818986,0.959191,1.248164,-0.811265,0.983112,1.18999,-0.811265,0.983112,1.18999,-0.818986,0.959191,1.248164,-0.811265,0.977755,1.249826,-0.773988,0.983112,1.18999,-0.773988,0.977755,1.249826,-0.766267,0.964547,1.188329,-0.766267,0.964547,1.188329,-0.773988,0.977755,1.249826,-0.766268,0.959191,1.248164,-0.828124,1.081954,0.162837,-0.828132,1.004182,1.03159,-0.844951,1.075012,0.162216,-0.844951,1.075012,0.162216,-0.828132,1.004182,1.03159,-0.844959,0.99724,1.030969,-0.920633,0.973004,1.093863,-0.920633,0.964547,1.188327,-0.912912,0.991568,1.095524,-0.912912,0.991568,1.095524,-0.920633,0.964547,1.188327,-0.912913,0.983112,1.18999,-0.894275,0.976899,1.242969,-0.894274,0.984501,1.158053,-0.882131,0.971888,1.242521,-0.882131,0.971888,1.242521,-0.894274,0.984501,1.158053,-0.88213,0.979491,1.157605,-0.844951,1.122415,0.166459,-0.844959,1.044643,1.035212,-0.828124,1.115473,0.165838,-0.828124,1.115473,0.165838,-0.844959,1.044643,1.035212,-0.828132,1.037701,1.034591,-0.811265,0.945983,1.186666,-0.811265,0.940626,1.246502,-0.818985,0.964547,1.188328,-0.818985,0.964547,1.188328,-0.811265,0.940626,1.246502,-0.818986,0.959191,1.248164,-0.867915,0.973004,1.093863,-0.867915,0.964547,1.188328,-0.875635,0.95444,1.092201,-0.875635,0.95444,1.092201,-0.867915,0.964547,1.188328,-0.875636,0.945983,1.186666,-0.894265,1.075302,0.162241,-0.877439,1.06836,0.16162,-0.911092,1.06836,0.16162,-0.877439,1.06836,0.16162,-0.870469,1.0516,0.16012,-0.911092,1.06836,0.16162,-0.870469,1.0516,0.16012,-0.877439,1.03484,0.158619,-0.911092,1.06836,0.16162,-0.877439,1.03484,0.158619,-0.894265,1.027899,0.157997,-0.911092,1.06836,0.16162,-0.894265,1.027899,0.157997,-0.911092,1.03484,0.158619,-0.911092,1.06836,0.16162,-0.911092,1.03484,0.158619,-0.918062,1.0516,0.160119,-0.911092,1.06836,0.16162,-0.912912,0.991568,1.095524,-0.912913,0.983112,1.18999,-0.894274,0.999258,1.096213,-0.894274,0.999258,1.096213,-0.912913,0.983112,1.18999,-0.894274,0.990801,1.190678,-0.861777,1.081954,0.162837,-0.861785,1.004182,1.03159,-0.868748,1.098713,0.164338,-0.868748,1.098713,0.164338,-0.861785,1.004182,1.03159,-0.868755,1.020941,1.03309,-0.792626,0.990801,1.190679,-0.792627,0.985445,1.250514,-0.773988,0.983112,1.18999,-0.773988,0.983112,1.18999,-0.792627,0.985445,1.250514,-0.773988,0.977755,1.249826,-0.894274,0.94675,1.091513,-0.894274,0.938293,1.185977,-0.912912,0.95444,1.092201,-0.912912,0.95444,1.092201,-0.894274,0.938293,1.185977,-0.912913,0.945983,1.186666,-0.875635,0.95444,1.092201,-0.875636,0.945983,1.186666,-0.894274,0.94675,1.091513,-0.894274,0.94675,1.091513,-0.875636,0.945983,1.186666,-0.894274,0.938293,1.185977,-0.828124,1.115473,0.165838,-0.828132,1.037701,1.034591,-0.821154,1.098713,0.164338,-0.821154,1.098713,0.164338,-0.828132,1.037701,1.034591,-0.821162,1.020941,1.033091,-0.894275,0.932937,1.245813,-0.894275,0.942687,1.239907,-0.912913,0.940626,1.246501,-0.912913,0.940626,1.246501,-0.894275,0.942687,1.239907,-0.906419,0.947697,1.240355,-0.773988,0.945983,1.186667,-0.773988,0.940626,1.246502,-0.792626,0.938293,1.185978,-0.792626,0.938293,1.185978,-0.773988,0.940626,1.246502,-0.792627,0.932937,1.245814,-0.894274,0.999258,1.096213,-0.894274,0.990801,1.190678,-0.875635,0.991568,1.095524,-0.875635,0.991568,1.095524,-0.894274,0.990801,1.190678,-0.875636,0.983112,1.18999,-0.868748,1.098713,0.164338,-0.868755,1.020941,1.03309,-0.861777,1.115473,0.165838,-0.861777,1.115473,0.165838,-0.868755,1.020941,1.03309,-0.861785,1.037701,1.034591,-0.792627,0.985445,1.250514,-0.792627,0.976899,1.24297,-0.773988,0.977755,1.249826,-0.773988,0.977755,1.249826,-0.792627,0.976899,1.24297,-0.780483,0.971888,1.242522,-0.877439,1.03484,0.158619,-0.877447,0.957068,1.027372,-0.894265,1.027899,0.157997,-0.894265,1.027899,0.157997,-0.877447,0.957068,1.027372,-0.894273,0.950127,1.02675,-0.894265,1.075302,0.162241,-0.894273,0.99753,1.030994,-0.877439,1.06836,0.16162,-0.877439,1.06836,0.16162,-0.894273,0.99753,1.030994,-0.877447,0.990588,1.030373,-0.773987,0.991568,1.095526,-0.773988,0.983112,1.18999,-0.766267,0.973004,1.093864,-0.766267,0.973004,1.093864,-0.773988,0.983112,1.18999,-0.766267,0.964547,1.188329,-0.811264,0.95444,1.092202,-0.811265,0.945983,1.186666,-0.818984,0.973004,1.093863,-0.818984,0.973004,1.093863,-0.811265,0.945983,1.186666,-0.818985,0.964547,1.188328,-0.821154,1.098713,0.164338,-0.821162,1.020941,1.033091,-0.828124,1.081954,0.162837,-0.828124,1.081954,0.162837,-0.821162,1.020941,1.033091,-0.828132,1.004182,1.03159,-0.875636,0.940626,1.246501,-0.882131,0.947697,1.240355,-0.894275,0.932937,1.245813,-0.894275,0.932937,1.245813,-0.882131,0.947697,1.240355,-0.894275,0.942687,1.239907,-0.912912,0.95444,1.092201,-0.912913,0.945983,1.186666,-0.920633,0.973004,1.093863,-0.920633,0.973004,1.093863,-0.912913,0.945983,1.186666,-0.920633,0.964547,1.188327,-0.911092,1.03484,0.158619,-0.9111,0.957068,1.027372,-0.918062,1.0516,0.160119,-0.918062,1.0516,0.160119,-0.9111,0.957068,1.027372,-0.91807,0.973828,1.028872,-0.861777,1.115473,0.165838,-0.861785,1.037701,1.034591,-0.844951,1.122415,0.166459,-0.844951,1.122415,0.166459,-0.861785,1.037701,1.034591,-0.844959,1.044643,1.035212,-0.792626,0.999258,1.096214,-0.792626,0.990801,1.190679,-0.773987,0.991568,1.095526,-0.773987,0.991568,1.095526,-0.792626,0.990801,1.190679,-0.773988,0.983112,1.18999,-0.875635,0.991568,1.095524,-0.875636,0.983112,1.18999,-0.867915,0.973004,1.093863,-0.867915,0.973004,1.093863,-0.875636,0.983112,1.18999,-0.867915,0.964547,1.188328,-0.877439,1.06836,0.16162,-0.877447,0.990588,1.030373,-0.870469,1.0516,0.16012,-0.870469,1.0516,0.16012,-0.877447,0.990588,1.030373,-0.870476,0.973828,1.028873,-0.844951,1.075012,0.162216,-0.844959,0.99724,1.030969,-0.861777,1.081954,0.162837,-0.861777,1.081954,0.162837,-0.844959,0.99724,1.030969,-0.861785,1.004182,1.03159,-0.894275,0.985445,1.250514,-0.894275,0.976899,1.242969,-0.875637,0.977756,1.249825,-0.875637,0.977756,1.249825,-0.894275,0.976899,1.242969,-0.882131,0.971888,1.242521,-0.912913,0.977756,1.249825,-0.906419,0.971888,1.242521,-0.894275,0.985445,1.250514,-0.894275,0.985445,1.250514,-0.906419,0.971888,1.242521,-0.894275,0.976899,1.242969,-0.773987,0.95444,1.092202,-0.773988,0.945983,1.186667,-0.792626,0.94675,1.091513,-0.792626,0.94675,1.091513,-0.773988,0.945983,1.186667,-0.792626,0.938293,1.185978,-0.792626,0.94675,1.091513,-0.792626,0.938293,1.185978,-0.811264,0.95444,1.092202,-0.811264,0.95444,1.092202,-0.792626,0.938293,1.185978,-0.811265,0.945983,1.186666,-0.875636,0.945983,1.186666,-0.875636,0.940626,1.246501,-0.894274,0.938293,1.185977,-0.894274,0.938293,1.185977,-0.875636,0.940626,1.246501,-0.894275,0.932937,1.245813,-0.867916,0.959191,1.248164,-0.8771,0.959793,1.241438,-0.875636,0.940626,1.246501,-0.875636,0.940626,1.246501,-0.8771,0.959793,1.241438,-0.882131,0.947697,1.240355,-0.811264,0.991568,1.095525,-0.811265,0.983112,1.18999,-0.792626,0.999258,1.096214,-0.792626,0.999258,1.096214,-0.811265,0.983112,1.18999,-0.792626,0.990801,1.190679,-0.766267,0.973004,1.093864,-0.766267,0.964547,1.188329,-0.773987,0.95444,1.092202,-0.773987,0.95444,1.092202,-0.766267,0.964547,1.188329,-0.773988,0.945983,1.186667,-0.918062,1.0516,0.160119,-0.91807,0.973828,1.028872,-0.911092,1.06836,0.16162,-0.911092,1.06836,0.16162,-0.91807,0.973828,1.028872,-0.9111,0.990588,1.030373,-0.894274,0.990801,1.190678,-0.894275,0.985445,1.250514,-0.875636,0.983112,1.18999,-0.875636,0.983112,1.18999,-0.894275,0.985445,1.250514,-0.875637,0.977756,1.249825,-0.844959,0.99724,1.030969,-0.844959,0.993863,1.095731,-0.861785,1.004182,1.03159,-0.861785,1.004182,1.03159,-0.844959,0.993863,1.095731,-0.863598,1.001553,1.096418,-0.920634,0.959191,1.248163,-0.91145,0.959793,1.241438,-0.912913,0.977756,1.249825,-0.912913,0.977756,1.249825,-0.91145,0.959793,1.241438,-0.906419,0.971888,1.242521,-0.818984,0.973004,1.093863,-0.818985,0.964547,1.188328,-0.811264,0.991568,1.095525,-0.811264,0.991568,1.095525,-0.818985,0.964547,1.188328,-0.811265,0.983112,1.18999,-0.792626,0.938293,1.185978,-0.792627,0.932937,1.245814,-0.811265,0.945983,1.186666,-0.811265,0.945983,1.186666,-0.792627,0.932937,1.245814,-0.811265,0.940626,1.246502,-0.844959,1.046371,1.100431,-0.82632,1.038682,1.099743,-0.844959,1.044643,1.035212,-0.844959,1.044643,1.035212,-0.82632,1.038682,1.099743,-0.828132,1.037701,1.034591,-0.870469,1.0516,0.16012,-0.870476,0.973828,1.028873,-0.877439,1.03484,0.158619,-0.877439,1.03484,0.158619,-0.870476,0.973828,1.028873,-0.877447,0.957068,1.027372,-0.868755,1.020941,1.03309,-0.871318,1.020117,1.098081,-0.861785,1.037701,1.034591,-0.861785,1.037701,1.034591,-0.871318,1.020117,1.098081,-0.863598,1.038682,1.099743,-0.875637,0.977756,1.249825,-0.882131,0.971888,1.242521,-0.867916,0.959191,1.248164,-0.867916,0.959191,1.248164,-0.882131,0.971888,1.242521,-0.8771,0.959793,1.241438,-0.773987,0.95444,1.092202,-0.792626,0.94675,1.091513,-0.775798,0.957068,1.027373,-0.775798,0.957068,1.027373,-0.792626,0.94675,1.091513,-0.792625,0.950127,1.026751,-0.912913,0.945983,1.186666,-0.912913,0.940626,1.246501,-0.920633,0.964547,1.188327,-0.920633,0.964547,1.188327,-0.912913,0.940626,1.246501,-0.920634,0.959191,1.248163,-0.861785,1.004182,1.03159,-0.863598,1.001553,1.096418,-0.868755,1.020941,1.03309,-0.868755,1.020941,1.03309,-0.863598,1.001553,1.096418,-0.871318,1.020117,1.098081,-0.8186,1.020117,1.098081,-0.82632,1.001553,1.096419,-0.821162,1.020941,1.033091,-0.821162,1.020941,1.033091,-0.82632,1.001553,1.096419,-0.828132,1.004182,1.03159,-0.911092,1.06836,0.16162,-0.9111,0.990588,1.030373,-0.894265,1.075302,0.162241,-0.894265,1.075302,0.162241,-0.9111,0.990588,1.030373,-0.894273,0.99753,1.030994,-0.82632,1.038682,1.099743,-0.8186,1.020117,1.098081,-0.828132,1.037701,1.034591,-0.828132,1.037701,1.034591,-0.8186,1.020117,1.098081,-0.821162,1.020941,1.033091,-0.875636,0.983112,1.18999,-0.875637,0.977756,1.249825,-0.867915,0.964547,1.188328,-0.867915,0.964547,1.188328,-0.875637,0.977756,1.249825,-0.867916,0.959191,1.248164,-0.861785,1.037701,1.034591,-0.863598,1.038682,1.099743,-0.844959,1.044643,1.035212,-0.844959,1.044643,1.035212,-0.863598,1.038682,1.099743,-0.844959,1.046371,1.100431,-0.920633,0.964547,1.188327,-0.920634,0.959191,1.248163,-0.912913,0.983112,1.18999,-0.912913,0.983112,1.18999,-0.920634,0.959191,1.248163,-0.912913,0.977756,1.249825,-0.809452,0.990588,1.030374,-0.811264,0.991568,1.095525,-0.792625,0.99753,1.030995,-0.792625,0.99753,1.030995,-0.811264,0.991568,1.095525,-0.792626,0.999258,1.096214,-0.867915,0.964547,1.188328,-0.867916,0.959191,1.248164,-0.875636,0.945983,1.186666,-0.875636,0.945983,1.186666,-0.867916,0.959191,1.248164,-0.875636,0.940626,1.246501,-0.82632,1.001553,1.096419,-0.844959,0.993863,1.095731,-0.828132,1.004182,1.03159,-0.828132,1.004182,1.03159,-0.844959,0.993863,1.095731,-0.844959,0.99724,1.030969,-0.912913,0.940626,1.246501,-0.906419,0.947697,1.240355,-0.920634,0.959191,1.248163,-0.920634,0.959191,1.248163,-0.906419,0.947697,1.240355,-0.91145,0.959793,1.241438,-0.912913,0.983112,1.18999,-0.912913,0.977756,1.249825,-0.894274,0.990801,1.190678,-0.894274,0.990801,1.190678,-0.912913,0.977756,1.249825,-0.894275,0.985445,1.250514,-0.804771,0.947697,1.240356,-0.80477,0.955299,1.15544,-0.809801,0.959793,1.241439,-0.809801,0.959793,1.241439,-0.80477,0.955299,1.15544,-0.809801,0.967395,1.156523,-0.773987,0.991568,1.095526,-0.766267,0.973004,1.093864,-0.775798,0.990588,1.030374,-0.775798,0.990588,1.030374,-0.766267,0.973004,1.093864,-0.768828,0.973828,1.028873,-0.894274,0.984501,1.158053,-0.906418,0.979491,1.157605,-0.88213,0.979491,1.157605,-0.906418,0.979491,1.157605,-0.911449,0.967395,1.156522,-0.88213,0.979491,1.157605,-0.911449,0.967395,1.156522,-0.906418,0.955299,1.155439,-0.88213,0.979491,1.157605,-0.906418,0.955299,1.155439,-0.894274,0.950289,1.154991,-0.88213,0.979491,1.157605,-0.894274,0.950289,1.154991,-0.88213,0.955299,1.15544,-0.88213,0.979491,1.157605,-0.88213,0.955299,1.15544,-0.8771,0.967395,1.156522,-0.88213,0.979491,1.157605,-0.84496,0.985406,1.190196,-0.844961,0.98005,1.250031,-0.863599,0.993096,1.190884,-0.863599,0.993096,1.190884,-0.844961,0.98005,1.250031,-0.863599,0.98774,1.250719,-0.871318,1.020117,1.098081,-0.871319,1.01166,1.192546,-0.863598,1.038682,1.099743,-0.863598,1.038682,1.099743,-0.871319,1.01166,1.192546,-0.863599,1.030225,1.194207,-0.894275,0.942687,1.239907,-0.894274,0.950289,1.154991,-0.906419,0.947697,1.240355,-0.906419,0.947697,1.240355,-0.894274,0.950289,1.154991,-0.906418,0.955299,1.155439,-0.766267,0.973004,1.093864,-0.773987,0.95444,1.092202,-0.768828,0.973828,1.028873,-0.768828,0.973828,1.028873,-0.773987,0.95444,1.092202,-0.775798,0.957068,1.027373,-0.809452,0.957068,1.027373,-0.811264,0.95444,1.092202,-0.816422,0.973828,1.028873,-0.816422,0.973828,1.028873,-0.811264,0.95444,1.092202,-0.818984,0.973004,1.093863,-0.894265,1.027899,0.157997,-0.894273,0.950127,1.02675,-0.911092,1.03484,0.158619,-0.911092,1.03484,0.158619,-0.894273,0.950127,1.02675,-0.9111,0.957068,1.027372,-0.780483,0.971888,1.242522,-0.780482,0.979491,1.157606,-0.775452,0.959793,1.241439,-0.775452,0.959793,1.241439,-0.780482,0.979491,1.157606,-0.775451,0.967395,1.156523,-0.8186,1.020117,1.098081,-0.818601,1.01166,1.192546,-0.82632,1.001553,1.096419,-0.82632,1.001553,1.096419,-0.818601,1.01166,1.192546,-0.826321,0.993096,1.190884,-0.882131,0.947697,1.240355,-0.88213,0.955299,1.15544,-0.894275,0.942687,1.239907,-0.894275,0.942687,1.239907,-0.88213,0.955299,1.15544,-0.894274,0.950289,1.154991,-0.809801,0.959793,1.241439,-0.809801,0.967395,1.156523,-0.804771,0.971888,1.242522,-0.804771,0.971888,1.242522,-0.809801,0.967395,1.156523,-0.80477,0.979491,1.157606,-0.863598,1.038682,1.099743,-0.863599,1.030225,1.194207,-0.844959,1.046371,1.100431,-0.844959,1.046371,1.100431,-0.863599,1.030225,1.194207,-0.84496,1.037914,1.194896,-0.816422,0.973828,1.028873,-0.818984,0.973004,1.093863,-0.809452,0.990588,1.030374,-0.809452,0.990588,1.030374,-0.818984,0.973004,1.093863,-0.811264,0.991568,1.095525,-0.844959,0.993863,1.095731,-0.84496,0.985406,1.190196,-0.863598,1.001553,1.096418,-0.863598,1.001553,1.096418,-0.84496,0.985406,1.190196,-0.863599,0.993096,1.190884,-0.894273,0.950127,1.02675,-0.894274,0.94675,1.091513,-0.9111,0.957068,1.027372,-0.9111,0.957068,1.027372,-0.894274,0.94675,1.091513,-0.912912,0.95444,1.092201,-0.792626,0.999258,1.096214,-0.773987,0.991568,1.095526,-0.792625,0.99753,1.030995,-0.792625,0.99753,1.030995,-0.773987,0.991568,1.095526,-0.775798,0.990588,1.030374,-0.775452,0.959793,1.241439,-0.775451,0.967395,1.156523,-0.780482,0.947697,1.240356,-0.780482,0.947697,1.240356,-0.775451,0.967395,1.156523,-0.780482,0.955299,1.155441,-0.82632,1.001553,1.096419,-0.826321,0.993096,1.190884,-0.844959,0.993863,1.095731,-0.844959,0.993863,1.095731,-0.826321,0.993096,1.190884,-0.84496,0.985406,1.190196,-0.844959,1.046371,1.100431,-0.84496,1.037914,1.194896,-0.82632,1.038682,1.099743,-0.82632,1.038682,1.099743,-0.84496,1.037914,1.194896,-0.826321,1.030225,1.194208,-0.906419,0.971888,1.242521,-0.906418,0.979491,1.157605,-0.894275,0.976899,1.242969,-0.894275,0.976899,1.242969,-0.906418,0.979491,1.157605,-0.894274,0.984501,1.158053,-0.804771,0.971888,1.242522,-0.80477,0.979491,1.157606,-0.792627,0.976899,1.24297,-0.792627,0.976899,1.24297,-0.80477,0.979491,1.157606,-0.792626,0.984501,1.158055,-0.792625,0.950127,1.026751,-0.792626,0.94675,1.091513,-0.809452,0.957068,1.027373,-0.809452,0.957068,1.027373,-0.792626,0.94675,1.091513,-0.811264,0.95444,1.092202,-0.863598,1.001553,1.096418,-0.863599,0.993096,1.190884,-0.871318,1.020117,1.098081,-0.871318,1.020117,1.098081,-0.863599,0.993096,1.190884,-0.871319,1.01166,1.192546,-0.8771,0.959793,1.241438,-0.8771,0.967395,1.156522,-0.882131,0.947697,1.240355,-0.882131,0.947697,1.240355,-0.8771,0.967395,1.156522,-0.88213,0.955299,1.15544,-0.780482,0.947697,1.240356,-0.780482,0.955299,1.155441,-0.792627,0.942687,1.239908,-0.792627,0.942687,1.239908,-0.780482,0.955299,1.155441,-0.792626,0.950289,1.154992,-0.792617,1.027899,0.157999,-0.792625,0.950127,1.026751,-0.809444,1.03484,0.15862,-0.809444,1.03484,0.15862,-0.792625,0.950127,1.026751,-0.809452,0.957068,1.027373,-0.792627,0.942687,1.239908,-0.792626,0.950289,1.154992,-0.804771,0.947697,1.240356,-0.804771,0.947697,1.240356,-0.792626,0.950289,1.154992,-0.80477,0.955299,1.15544,-0.894274,0.999258,1.096213,-0.875635,0.991568,1.095524,-0.894273,0.99753,1.030994,-0.894273,0.99753,1.030994,-0.875635,0.991568,1.095524,-0.877447,0.990588,1.030373,-0.792626,0.984501,1.158055,-0.80477,0.979491,1.157606,-0.780482,0.979491,1.157606,-0.80477,0.979491,1.157606,-0.809801,0.967395,1.156523,-0.780482,0.979491,1.157606,-0.809801,0.967395,1.156523,-0.80477,0.955299,1.15544,-0.780482,0.979491,1.157606,-0.80477,0.955299,1.15544,-0.792626,0.950289,1.154992,-0.780482,0.979491,1.157606,-0.792626,0.950289,1.154992,-0.780482,0.955299,1.155441,-0.780482,0.979491,1.157606,-0.780482,0.955299,1.155441,-0.775451,0.967395,1.156523,-0.780482,0.979491,1.157606,-0.82632,1.038682,1.099743,-0.826321,1.030225,1.194208,-0.8186,1.020117,1.098081,-0.8186,1.020117,1.098081,-0.826321,1.030225,1.194208,-0.818601,1.01166,1.192546,-0.91807,0.973828,1.028872,-0.920633,0.973004,1.093863,-0.9111,0.990588,1.030373,-0.9111,0.990588,1.030373,-0.920633,0.973004,1.093863,-0.912912,0.991568,1.095524,-0.844961,1.032558,1.254731,-0.84496,1.024012,1.247187,-0.826322,1.024868,1.254043,-0.826322,1.024868,1.254043,-0.84496,1.024012,1.247187,-0.832816,1.019002,1.246739,-0.811265,0.940626,1.246502,-0.804771,0.947697,1.240356,-0.818986,0.959191,1.248164,-0.818986,0.959191,1.248164,-0.804771,0.947697,1.240356,-0.809801,0.959793,1.241439,-0.809444,1.06836,0.161621,-0.809452,0.990588,1.030374,-0.792617,1.075302,0.162242,-0.792617,1.075302,0.162242,-0.809452,0.990588,1.030374,-0.792625,0.99753,1.030995,-0.826321,0.993096,1.190884,-0.826322,0.98774,1.250719,-0.84496,0.985406,1.190196,-0.84496,0.985406,1.190196,-0.826322,0.98774,1.250719,-0.844961,0.98005,1.250031,-0.84496,1.037914,1.194896,-0.844961,1.032558,1.254731,-0.826321,1.030225,1.194208,-0.826321,1.030225,1.194208,-0.844961,1.032558,1.254731,-0.826322,1.024868,1.254043,-0.91145,0.959793,1.241438,-0.911449,0.967395,1.156522,-0.906419,0.971888,1.242521,-0.906419,0.971888,1.242521,-0.911449,0.967395,1.156522,-0.906418,0.979491,1.157605,-0.773988,0.977755,1.249826,-0.780483,0.971888,1.242522,-0.766268,0.959191,1.248164,-0.766268,0.959191,1.248164,-0.780483,0.971888,1.242522,-0.775452,0.959793,1.241439,-0.768821,1.0516,0.160121,-0.768828,0.973828,1.028873,-0.77579,1.03484,0.15862,-0.77579,1.03484,0.15862,-0.768828,0.973828,1.028873,-0.775798,0.957068,1.027373,-0.818986,0.959191,1.248164,-0.809801,0.959793,1.241439,-0.811265,0.977755,1.249826,-0.811265,0.977755,1.249826,-0.809801,0.959793,1.241439,-0.804771,0.971888,1.242522,-0.863599,0.993096,1.190884,-0.863599,0.98774,1.250719,-0.871319,1.01166,1.192546,-0.871319,1.01166,1.192546,-0.863599,0.98774,1.250719,-0.87132,1.006304,1.252381,-0.882131,0.971888,1.242521,-0.88213,0.979491,1.157605,-0.8771,0.959793,1.241438,-0.8771,0.959793,1.241438,-0.88213,0.979491,1.157605,-0.8771,0.967395,1.156522,-0.816414,1.0516,0.16012,-0.816422,0.973828,1.028873,-0.809444,1.06836,0.161621,-0.809444,1.06836,0.161621,-0.816422,0.973828,1.028873,-0.809452,0.990588,1.030374,-0.766268,0.959191,1.248164,-0.775452,0.959793,1.241439,-0.773988,0.940626,1.246502,-0.773988,0.940626,1.246502,-0.775452,0.959793,1.241439,-0.780482,0.947697,1.240356,-0.826321,1.030225,1.194208,-0.826322,1.024868,1.254043,-0.818601,1.01166,1.192546,-0.818601,1.01166,1.192546,-0.826322,1.024868,1.254043,-0.818601,1.006304,1.252381,-0.9111,0.957068,1.027372,-0.912912,0.95444,1.092201,-0.91807,0.973828,1.028872,-0.91807,0.973828,1.028872,-0.912912,0.95444,1.092201,-0.920633,0.973004,1.093863,-0.811265,0.977755,1.249826,-0.804771,0.971888,1.242522,-0.792627,0.985445,1.250514,-0.792627,0.985445,1.250514,-0.804771,0.971888,1.242522,-0.792627,0.976899,1.24297,-0.77579,1.06836,0.161621,-0.775798,0.990588,1.030374,-0.768821,1.0516,0.160121,-0.768821,1.0516,0.160121,-0.775798,0.990588,1.030374,-0.768828,0.973828,1.028873,-0.871319,1.01166,1.192546,-0.87132,1.006304,1.252381,-0.863599,1.030225,1.194207,-0.863599,1.030225,1.194207,-0.87132,1.006304,1.252381,-0.863599,1.024868,1.254043,-0.809444,1.03484,0.15862,-0.809452,0.957068,1.027373,-0.816414,1.0516,0.16012,-0.816414,1.0516,0.16012,-0.809452,0.957068,1.027373,-0.816422,0.973828,1.028873,-0.867915,0.973004,1.093863,-0.875635,0.95444,1.092201,-0.870476,0.973828,1.028873,-0.870476,0.973828,1.028873,-0.875635,0.95444,1.092201,-0.877447,0.957068,1.027372,-0.773988,0.940626,1.246502,-0.780482,0.947697,1.240356,-0.792627,0.932937,1.245814,-0.792627,0.932937,1.245814,-0.780482,0.947697,1.240356,-0.792627,0.942687,1.239908,-0.875635,0.991568,1.095524,-0.867915,0.973004,1.093863,-0.877447,0.990588,1.030373,-0.877447,0.990588,1.030373,-0.867915,0.973004,1.093863,-0.870476,0.973828,1.028873,-0.792617,1.075302,0.162242,-0.792625,0.99753,1.030995,-0.77579,1.06836,0.161621,-0.77579,1.06836,0.161621,-0.792625,0.99753,1.030995,-0.775798,0.990588,1.030374,-0.77579,1.03484,0.15862,-0.775798,0.957068,1.027373,-0.792617,1.027899,0.157999,-0.792617,1.027899,0.157999,-0.775798,0.957068,1.027373,-0.792625,0.950127,1.026751,-0.906419,0.947697,1.240355,-0.906418,0.955299,1.155439,-0.91145,0.959793,1.241438,-0.91145,0.959793,1.241438,-0.906418,0.955299,1.155439,-0.911449,0.967395,1.156522,-0.792627,0.932937,1.245814,-0.792627,0.942687,1.239908,-0.811265,0.940626,1.246502,-0.811265,0.940626,1.246502,-0.792627,0.942687,1.239908,-0.804771,0.947697,1.240356,-0.818601,1.01166,1.192546,-0.818601,1.006304,1.252381,-0.826321,0.993096,1.190884,-0.826321,0.993096,1.190884,-0.818601,1.006304,1.252381,-0.826322,0.98774,1.250719,-0.9111,0.990588,1.030373,-0.912912,0.991568,1.095524,-0.894273,0.99753,1.030994,-0.894273,0.99753,1.030994,-0.912912,0.991568,1.095524,-0.894274,0.999258,1.096213,-0.792617,1.075302,0.162242,-0.77579,1.06836,0.161621,-0.809444,1.06836,0.161621,-0.77579,1.06836,0.161621,-0.768821,1.0516,0.160121,-0.809444,1.06836,0.161621,-0.809444,1.06836,0.161621,-0.768821,1.0516,0.160121,-0.816414,1.0516,0.16012,-0.768821,1.0516,0.160121,-0.77579,1.03484,0.15862,-0.816414,1.0516,0.16012,-0.77579,1.03484,0.15862,-0.792617,1.027899,0.157999,-0.816414,1.0516,0.16012,-0.792617,1.027899,0.157999,-0.809444,1.03484,0.15862,-0.816414,1.0516,0.16012,-0.792627,0.976899,1.24297,-0.792626,0.984501,1.158055,-0.780483,0.971888,1.242522,-0.780483,0.971888,1.242522,-0.792626,0.984501,1.158055,-0.780482,0.979491,1.157606,-0.863599,1.030225,1.194207,-0.863599,1.024868,1.254043,-0.84496,1.037914,1.194896,-0.84496,1.037914,1.194896,-0.863599,1.024868,1.254043,-0.844961,1.032558,1.254731,-0.84496,1.024012,1.247187,-0.84496,1.031614,1.162272,-0.832816,1.019002,1.246739,-0.832816,1.019002,1.246739,-0.84496,1.031614,1.162272,-0.832816,1.026604,1.161824,-0.844961,0.98005,1.250031,-0.84496,0.9898,1.244125,-0.863599,0.98774,1.250719,-0.863599,0.98774,1.250719,-0.84496,0.9898,1.244125,-0.857105,0.99481,1.244573,-0.826322,0.98774,1.250719,-0.832816,0.99481,1.244573,-0.844961,0.98005,1.250031,-0.844961,0.98005,1.250031,-0.832816,0.99481,1.244573,-0.84496,0.9898,1.244125,-0.863599,1.024868,1.254043,-0.857105,1.019002,1.246739,-0.844961,1.032558,1.254731,-0.844961,1.032558,1.254731,-0.857105,1.019002,1.246739,-0.84496,1.024012,1.247187,-0.818601,1.006304,1.252381,-0.827786,1.006906,1.245656,-0.826322,0.98774,1.250719,-0.826322,0.98774,1.250719,-0.827786,1.006906,1.245656,-0.832816,0.99481,1.244573,-0.87132,1.006304,1.252381,-0.862135,1.006906,1.245656,-0.863599,1.024868,1.254043,-0.863599,1.024868,1.254043,-0.862135,1.006906,1.245656,-0.857105,1.019002,1.246739,-0.826322,1.024868,1.254043,-0.832816,1.019002,1.246739,-0.818601,1.006304,1.252381,-0.818601,1.006304,1.252381,-0.832816,1.019002,1.246739,-0.827786,1.006906,1.245656,-0.863599,0.98774,1.250719,-0.857105,0.99481,1.244573,-0.87132,1.006304,1.252381,-0.87132,1.006304,1.252381,-0.857105,0.99481,1.244573,-0.862135,1.006906,1.245656,-0.84496,1.031614,1.162272,-0.857104,1.026604,1.161823,-0.832816,1.026604,1.161824,-0.857104,1.026604,1.161823,-0.862134,1.014508,1.16074,-0.832816,1.026604,1.161824,-0.862134,1.014508,1.16074,-0.857104,1.002412,1.159658,-0.832816,1.026604,1.161824,-0.857104,1.002412,1.159658,-0.84496,0.997402,1.159209,-0.832816,1.026604,1.161824,-0.84496,0.997402,1.159209,-0.832816,1.002412,1.159658,-0.832816,1.026604,1.161824,-0.832816,1.002412,1.159658,-0.827785,1.014508,1.160741,-0.832816,1.026604,1.161824,-0.84496,0.9898,1.244125,-0.84496,0.997402,1.159209,-0.857105,0.99481,1.244573,-0.857105,0.99481,1.244573,-0.84496,0.997402,1.159209,-0.857104,1.002412,1.159658,-0.832816,0.99481,1.244573,-0.832816,1.002412,1.159658,-0.84496,0.9898,1.244125,-0.84496,0.9898,1.244125,-0.832816,1.002412,1.159658,-0.84496,0.997402,1.159209,-0.857105,1.019002,1.246739,-0.857104,1.026604,1.161823,-0.84496,1.024012,1.247187,-0.84496,1.024012,1.247187,-0.857104,1.026604,1.161823,-0.84496,1.031614,1.162272,-0.827786,1.006906,1.245656,-0.827785,1.014508,1.160741,-0.832816,0.99481,1.244573,-0.832816,0.99481,1.244573,-0.827785,1.014508,1.160741,-0.832816,1.002412,1.159658,-0.862135,1.006906,1.245656,-0.862134,1.014508,1.16074,-0.857105,1.019002,1.246739,-0.857105,1.019002,1.246739,-0.862134,1.014508,1.16074,-0.857104,1.026604,1.161823,-0.832816,1.019002,1.246739,-0.832816,1.026604,1.161824,-0.827786,1.006906,1.245656,-0.827786,1.006906,1.245656,-0.832816,1.026604,1.161824,-0.827785,1.014508,1.160741,-0.857105,0.99481,1.244573,-0.857104,1.002412,1.159658,-0.862135,1.006906,1.245656,-0.862135,1.006906,1.245656,-0.857104,1.002412,1.159658,-0.862134,1.014508,1.16074,-0.869306,0.920879,1.089197,-0.869306,0.912422,1.183661,-0.861585,0.939443,1.090859,-0.861585,0.939443,1.090859,-0.869306,0.912422,1.183661,-0.861586,0.930987,1.185324,-0.842948,0.924774,1.238303,-0.842947,0.932376,1.153388,-0.830803,0.919763,1.237855,-0.830803,0.919763,1.237855,-0.842947,0.932376,1.153388,-0.830803,0.927366,1.152939,-0.816587,0.920879,1.089197,-0.816588,0.912422,1.183662,-0.824308,0.902315,1.087535,-0.824308,0.902315,1.087535,-0.816588,0.912422,1.183662,-0.824308,0.893858,1.182,-0.842938,1.023177,0.157575,-0.826112,1.016235,0.156954,-0.859765,1.016235,0.156954,-0.826112,1.016235,0.156954,-0.819142,0.999475,0.155454,-0.859765,1.016235,0.156954,-0.859765,1.016235,0.156954,-0.819142,0.999475,0.155454,-0.866735,0.999475,0.155453,-0.819142,0.999475,0.155454,-0.826112,0.982715,0.153954,-0.866735,0.999475,0.155453,-0.826112,0.982715,0.153954,-0.842938,0.975773,0.153332,-0.866735,0.999475,0.155453,-0.842938,0.975773,0.153332,-0.859765,0.982715,0.153953,-0.866735,0.999475,0.155453,-0.861585,0.939443,1.090859,-0.861586,0.930987,1.185324,-0.842947,0.947133,1.091547,-0.842947,0.947133,1.091547,-0.861586,0.930987,1.185324,-0.842947,0.938676,1.186012,-0.842947,0.894625,1.086846,-0.842947,0.886168,1.181311,-0.861585,0.902315,1.087535,-0.861585,0.902315,1.087535,-0.842947,0.886168,1.181311,-0.861586,0.893858,1.182,-0.824308,0.902315,1.087535,-0.824308,0.893858,1.182,-0.842947,0.894625,1.086846,-0.842947,0.894625,1.086846,-0.824308,0.893858,1.182,-0.842947,0.886168,1.181311,-0.842948,0.880812,1.241147,-0.842948,0.890562,1.235241,-0.861586,0.888501,1.241835,-0.861586,0.888501,1.241835,-0.842948,0.890562,1.235241,-0.855092,0.895572,1.235689,-0.842947,0.947133,1.091547,-0.842947,0.938676,1.186012,-0.824308,0.939443,1.090859,-0.824308,0.939443,1.090859,-0.842947,0.938676,1.186012,-0.824308,0.930987,1.185324,-0.826112,0.982715,0.153954,-0.826119,0.904943,1.022706,-0.842938,0.975773,0.153332,-0.842938,0.975773,0.153332,-0.826119,0.904943,1.022706,-0.842946,0.898001,1.022085,-0.842938,1.023177,0.157575,-0.842946,0.945405,1.026329,-0.826112,1.016235,0.156954,-0.826112,1.016235,0.156954,-0.842946,0.945405,1.026329,-0.826119,0.938463,1.025707,-0.824309,0.888501,1.241836,-0.830803,0.895572,1.235689,-0.842948,0.880812,1.241147,-0.842948,0.880812,1.241147,-0.830803,0.895572,1.235689,-0.842948,0.890562,1.235241,-0.861585,0.902315,1.087535,-0.861586,0.893858,1.182,-0.869306,0.920879,1.089197,-0.869306,0.920879,1.089197,-0.861586,0.893858,1.182,-0.869306,0.912422,1.183661,-0.859765,0.982715,0.153953,-0.859773,0.904943,1.022706,-0.866735,0.999475,0.155453,-0.866735,0.999475,0.155453,-0.859773,0.904943,1.022706,-0.866743,0.921703,1.024206,-0.824308,0.939443,1.090859,-0.824308,0.930987,1.185324,-0.816587,0.920879,1.089197,-0.816587,0.920879,1.089197,-0.824308,0.930987,1.185324,-0.816588,0.912422,1.183662,-0.826112,1.016235,0.156954,-0.826119,0.938463,1.025707,-0.819142,0.999475,0.155454,-0.819142,0.999475,0.155454,-0.826119,0.938463,1.025707,-0.819149,0.921703,1.024207,-0.842948,0.93332,1.245847,-0.842948,0.924774,1.238303,-0.824309,0.92563,1.245159,-0.824309,0.92563,1.245159,-0.842948,0.924774,1.238303,-0.830803,0.919763,1.237855,-0.861586,0.92563,1.245159,-0.855092,0.919763,1.237855,-0.842948,0.93332,1.245847,-0.842948,0.93332,1.245847,-0.855092,0.919763,1.237855,-0.842948,0.924774,1.238303,-0.824308,0.893858,1.182,-0.824309,0.888501,1.241836,-0.842947,0.886168,1.181311,-0.842947,0.886168,1.181311,-0.824309,0.888501,1.241836,-0.842948,0.880812,1.241147,-0.816589,0.907066,1.243497,-0.825773,0.907668,1.236772,-0.824309,0.888501,1.241836,-0.824309,0.888501,1.241836,-0.825773,0.907668,1.236772,-0.830803,0.895572,1.235689,-0.866735,0.999475,0.155453,-0.866743,0.921703,1.024206,-0.859765,1.016235,0.156954,-0.859765,1.016235,0.156954,-0.866743,0.921703,1.024206,-0.859773,0.938463,1.025707,-0.842947,0.938676,1.186012,-0.842948,0.93332,1.245847,-0.824308,0.930987,1.185324,-0.824308,0.930987,1.185324,-0.842948,0.93332,1.245847,-0.824309,0.92563,1.245159,-0.869307,0.907066,1.243497,-0.860122,0.907668,1.236772,-0.861586,0.92563,1.245159,-0.861586,0.92563,1.245159,-0.860122,0.907668,1.236772,-0.855092,0.919763,1.237855,-0.819142,0.999475,0.155454,-0.819149,0.921703,1.024207,-0.826112,0.982715,0.153954,-0.826112,0.982715,0.153954,-0.819149,0.921703,1.024207,-0.826119,0.904943,1.022706,-0.824309,0.92563,1.245159,-0.830803,0.919763,1.237855,-0.816589,0.907066,1.243497,-0.816589,0.907066,1.243497,-0.830803,0.919763,1.237855,-0.825773,0.907668,1.236772,-0.861586,0.893858,1.182,-0.861586,0.888501,1.241835,-0.869306,0.912422,1.183661,-0.869306,0.912422,1.183661,-0.861586,0.888501,1.241835,-0.869307,0.907066,1.243497,-0.859765,1.016235,0.156954,-0.859773,0.938463,1.025707,-0.842938,1.023177,0.157575,-0.842938,1.023177,0.157575,-0.859773,0.938463,1.025707,-0.842946,0.945405,1.026329,-0.824308,0.930987,1.185324,-0.824309,0.92563,1.245159,-0.816588,0.912422,1.183662,-0.816588,0.912422,1.183662,-0.824309,0.92563,1.245159,-0.816589,0.907066,1.243497,-0.869306,0.912422,1.183661,-0.869307,0.907066,1.243497,-0.861586,0.930987,1.185324,-0.861586,0.930987,1.185324,-0.869307,0.907066,1.243497,-0.861586,0.92563,1.245159,-0.816588,0.912422,1.183662,-0.816589,0.907066,1.243497,-0.824308,0.893858,1.182,-0.824308,0.893858,1.182,-0.816589,0.907066,1.243497,-0.824309,0.888501,1.241836,-0.861586,0.888501,1.241835,-0.855092,0.895572,1.235689,-0.869307,0.907066,1.243497,-0.869307,0.907066,1.243497,-0.855092,0.895572,1.235689,-0.860122,0.907668,1.236772,-0.861586,0.930987,1.185324,-0.861586,0.92563,1.245159,-0.842947,0.938676,1.186012,-0.842947,0.938676,1.186012,-0.861586,0.92563,1.245159,-0.842948,0.93332,1.245847,-0.842947,0.932376,1.153388,-0.855091,0.927366,1.152939,-0.830803,0.927366,1.152939,-0.855091,0.927366,1.152939,-0.860122,0.91527,1.151856,-0.830803,0.927366,1.152939,-0.860122,0.91527,1.151856,-0.855091,0.903174,1.150773,-0.830803,0.927366,1.152939,-0.855091,0.903174,1.150773,-0.842947,0.898164,1.150325,-0.830803,0.927366,1.152939,-0.842947,0.898164,1.150325,-0.830803,0.903174,1.150774,-0.830803,0.927366,1.152939,-0.830803,0.903174,1.150774,-0.825772,0.91527,1.151857,-0.830803,0.927366,1.152939,-0.842948,0.890562,1.235241,-0.842947,0.898164,1.150325,-0.855092,0.895572,1.235689,-0.855092,0.895572,1.235689,-0.842947,0.898164,1.150325,-0.855091,0.903174,1.150773,-0.842938,0.975773,0.153332,-0.842946,0.898001,1.022085,-0.859765,0.982715,0.153953,-0.859765,0.982715,0.153953,-0.842946,0.898001,1.022085,-0.859773,0.904943,1.022706,-0.830803,0.895572,1.235689,-0.830803,0.903174,1.150774,-0.842948,0.890562,1.235241,-0.842948,0.890562,1.235241,-0.830803,0.903174,1.150774,-0.842947,0.898164,1.150325,-0.842946,0.898001,1.022085,-0.842947,0.894625,1.086846,-0.859773,0.904943,1.022706,-0.859773,0.904943,1.022706,-0.842947,0.894625,1.086846,-0.861585,0.902315,1.087535,-0.855092,0.919763,1.237855,-0.855091,0.927366,1.152939,-0.842948,0.924774,1.238303,-0.842948,0.924774,1.238303,-0.855091,0.927366,1.152939,-0.842947,0.932376,1.153388,-0.825773,0.907668,1.236772,-0.825772,0.91527,1.151857,-0.830803,0.895572,1.235689,-0.830803,0.895572,1.235689,-0.825772,0.91527,1.151857,-0.830803,0.903174,1.150774,-0.842947,0.947133,1.091547,-0.824308,0.939443,1.090859,-0.842946,0.945405,1.026329,-0.842946,0.945405,1.026329,-0.824308,0.939443,1.090859,-0.826119,0.938463,1.025707,-0.866743,0.921703,1.024206,-0.869306,0.920879,1.089197,-0.859773,0.938463,1.025707,-0.859773,0.938463,1.025707,-0.869306,0.920879,1.089197,-0.861585,0.939443,1.090859,-0.860122,0.907668,1.236772,-0.860122,0.91527,1.151856,-0.855092,0.919763,1.237855,-0.855092,0.919763,1.237855,-0.860122,0.91527,1.151856,-0.855091,0.927366,1.152939,-0.830803,0.919763,1.237855,-0.830803,0.927366,1.152939,-0.825773,0.907668,1.236772,-0.825773,0.907668,1.236772,-0.830803,0.927366,1.152939,-0.825772,0.91527,1.151857,-0.859773,0.904943,1.022706,-0.861585,0.902315,1.087535,-0.866743,0.921703,1.024206,-0.866743,0.921703,1.024206,-0.861585,0.902315,1.087535,-0.869306,0.920879,1.089197,-0.816587,0.920879,1.089197,-0.824308,0.902315,1.087535,-0.819149,0.921703,1.024207,-0.819149,0.921703,1.024207,-0.824308,0.902315,1.087535,-0.826119,0.904943,1.022706,-0.824308,0.939443,1.090859,-0.816587,0.920879,1.089197,-0.826119,0.938463,1.025707,-0.826119,0.938463,1.025707,-0.816587,0.920879,1.089197,-0.819149,0.921703,1.024207,-0.855092,0.895572,1.235689,-0.855091,0.903174,1.150773,-0.860122,0.907668,1.236772,-0.860122,0.907668,1.236772,-0.855091,0.903174,1.150773,-0.860122,0.91527,1.151856,-0.859773,0.938463,1.025707,-0.861585,0.939443,1.090859,-0.842946,0.945405,1.026329,-0.842946,0.945405,1.026329,-0.861585,0.939443,1.090859,-0.842947,0.947133,1.091547,-0.811512,1.120353,-0.564025,-0.808685,1.159028,-0.99604,-0.820894,1.142914,-0.562006,-0.820894,1.142914,-0.562006,-0.808685,1.159028,-0.99604,-0.818894,1.183577,-0.993842,-0.818894,1.134479,-0.998238,-0.827099,1.146932,-1.045314,-0.808685,1.159028,-0.99604,-0.808685,1.159028,-0.99604,-0.827099,1.146932,-1.045314,-0.820289,1.163308,-1.043848,-0.875578,1.120353,-0.564026,-0.878398,1.159028,-0.996041,-0.866195,1.097794,-0.566045,-0.866195,1.097794,-0.566045,-0.878398,1.159028,-0.996041,-0.868188,1.13448,-0.998238,-0.820894,1.142914,-0.562006,-0.818894,1.183577,-0.993842,-0.843545,1.152259,-0.561169,-0.843545,1.152259,-0.561169,-0.818894,1.183577,-0.993842,-0.843541,1.193746,-0.992932,-0.866195,1.097794,-0.566045,-0.868188,1.13448,-0.998238,-0.843545,1.088448,-0.566881,-0.843545,1.088448,-0.566881,-0.868188,1.13448,-0.998238,-0.843541,1.124311,-0.999148,-0.843545,1.088448,-0.566881,-0.843541,1.124311,-0.999148,-0.820894,1.097793,-0.566045,-0.820894,1.097793,-0.566045,-0.843541,1.124311,-0.999148,-0.818894,1.134479,-0.998238,-0.843545,1.152259,-0.561169,-0.843541,1.193746,-0.992932,-0.866195,1.142914,-0.562006,-0.866195,1.142914,-0.562006,-0.843541,1.193746,-0.992932,-0.868188,1.183577,-0.993843,-0.820894,1.097793,-0.566045,-0.818894,1.134479,-0.998238,-0.811512,1.120353,-0.564025,-0.811512,1.120353,-0.564025,-0.818894,1.134479,-0.998238,-0.808685,1.159028,-0.99604,-0.866195,1.142914,-0.562006,-0.868188,1.183577,-0.993843,-0.875578,1.120353,-0.564026,-0.875578,1.120353,-0.564026,-0.868188,1.183577,-0.993843,-0.878398,1.159028,-0.996041,-0.868188,1.183577,-0.993843,-0.859982,1.179684,-1.042382,-0.878398,1.159028,-0.996041,-0.878398,1.159028,-0.996041,-0.859982,1.179684,-1.042382,-0.866792,1.163308,-1.043848,-0.808685,1.159028,-0.99604,-0.820289,1.163308,-1.043848,-0.818894,1.183577,-0.993842,-0.818894,1.183577,-0.993842,-0.820289,1.163308,-1.043848,-0.827099,1.179684,-1.042382,-0.878398,1.159028,-0.996041,-0.866792,1.163308,-1.043848,-0.868188,1.13448,-0.998238,-0.868188,1.13448,-0.998238,-0.866792,1.163308,-1.043848,-0.859982,1.146932,-1.045314,-0.818894,1.183577,-0.993842,-0.827099,1.179684,-1.042382,-0.843541,1.193746,-0.992932,-0.843541,1.193746,-0.992932,-0.827099,1.179684,-1.042382,-0.843541,1.186467,-1.041775,-0.868188,1.13448,-0.998238,-0.859982,1.146932,-1.045314,-0.843541,1.124311,-0.999148,-0.843541,1.124311,-0.999148,-0.859982,1.146932,-1.045314,-0.843541,1.140149,-1.045922,-0.843541,1.124311,-0.999148,-0.843541,1.140149,-1.045922,-0.818894,1.134479,-0.998238,-0.818894,1.134479,-0.998238,-0.843541,1.140149,-1.045922,-0.827099,1.146932,-1.045314,-0.843541,1.193746,-0.992932,-0.843541,1.186467,-1.041775,-0.868188,1.183577,-0.993843,-0.868188,1.183577,-0.993843,-0.843541,1.186467,-1.041775,-0.859982,1.179684,-1.042382,0.852992,0.939938,-0.327721,0.852992,0.939283,-0.320445,0.880535,0.939938,-0.327721,0.880535,0.939938,-0.327721,0.852992,0.939283,-0.320445,0.880535,0.939283,-0.320445,0.852992,0.941903,-0.349548,0.852992,0.941248,-0.342273,0.852992,0.874968,-0.355573,0.852992,0.874968,-0.355573,0.852992,0.941248,-0.342273,0.852992,0.874313,-0.348298,0.852992,0.923565,-0.145826,0.852992,0.856631,-0.151851,0.880535,0.923565,-0.145826,0.880535,0.923565,-0.145826,0.852992,0.856631,-0.151851,0.880535,0.856631,-0.151851,0.852992,0.940593,-0.334996,0.852992,0.939938,-0.327721,0.852992,0.873659,-0.341022,0.852992,0.873659,-0.341022,0.852992,0.939938,-0.327721,0.852992,0.873004,-0.333746,0.852992,0.938628,-0.313169,0.852992,0.937973,-0.305893,0.880535,0.938628,-0.313169,0.880535,0.938628,-0.313169,0.852992,0.937973,-0.305893,0.880535,0.937973,-0.305893,0.852992,0.939283,-0.320445,0.852992,0.938628,-0.313169,0.852992,0.872349,-0.32647,0.852992,0.872349,-0.32647,0.852992,0.938628,-0.313169,0.852992,0.871694,-0.319194,0.852992,0.874313,-0.348298,0.852992,0.941248,-0.342273,0.880535,0.874313,-0.348298,0.880535,0.874313,-0.348298,0.852992,0.941248,-0.342273,0.880535,0.941248,-0.342272,0.852992,0.937973,-0.305893,0.852992,0.937318,-0.298617,0.852992,0.871039,-0.311919,0.852992,0.871039,-0.311919,0.852992,0.937318,-0.298617,0.852992,0.870384,-0.304643,0.852992,0.873004,-0.333746,0.852992,0.939938,-0.327721,0.880535,0.873004,-0.333746,0.880535,0.873004,-0.333746,0.852992,0.939938,-0.327721,0.880535,0.939938,-0.327721,0.852992,0.936663,-0.291342,0.852992,0.936008,-0.284066,0.852992,0.869729,-0.297367,0.852992,0.869729,-0.297367,0.852992,0.936008,-0.284066,0.852992,0.869074,-0.290091,0.852992,0.927494,-0.189481,0.852992,0.86056,-0.195505,0.880535,0.927494,-0.189481,0.880535,0.927494,-0.189481,0.852992,0.86056,-0.195505,0.880535,0.86056,-0.195505,0.852992,0.935353,-0.27679,0.852992,0.934699,-0.269514,0.852992,0.868419,-0.282815,0.852992,0.868419,-0.282815,0.852992,0.934699,-0.269514,0.852992,0.867764,-0.275539,0.852992,0.926184,-0.174929,0.852992,0.85925,-0.180954,0.880535,0.926184,-0.174929,0.880535,0.926184,-0.174929,0.852992,0.85925,-0.180954,0.880535,0.85925,-0.180954,0.852992,0.934044,-0.262239,0.852992,0.933389,-0.254963,0.852992,0.86711,-0.268264,0.852992,0.86711,-0.268264,0.852992,0.933389,-0.254963,0.852992,0.866455,-0.260988,0.852992,0.941248,-0.342273,0.852992,0.940593,-0.334996,0.880535,0.941248,-0.342272,0.880535,0.941248,-0.342272,0.852992,0.940593,-0.334996,0.880535,0.940593,-0.334996,0.852992,0.932734,-0.247687,0.852992,0.932079,-0.240411,0.852992,0.8658,-0.253712,0.852992,0.8658,-0.253712,0.852992,0.932079,-0.240411,0.852992,0.865145,-0.246436,0.852992,0.852701,-0.108196,0.852992,0.853356,-0.115472,0.880535,0.852701,-0.108196,0.880535,0.852701,-0.108196,0.852992,0.853356,-0.115472,0.880535,0.853356,-0.115472,0.852992,0.931424,-0.233135,0.852992,0.930769,-0.225859,0.852992,0.86449,-0.23916,0.852992,0.86449,-0.23916,0.852992,0.930769,-0.225859,0.852992,0.863835,-0.231884,0.852992,0.851391,-0.093644,0.852992,0.852046,-0.10092,0.880535,0.851391,-0.093644,0.880535,0.851391,-0.093644,0.852992,0.852046,-0.10092,0.880535,0.852046,-0.10092,0.852992,0.930114,-0.218584,0.852992,0.929459,-0.211308,0.852992,0.86318,-0.224609,0.852992,0.86318,-0.224609,0.852992,0.929459,-0.211308,0.852992,0.862525,-0.217333,0.852992,0.930114,-0.218584,0.852992,0.86318,-0.224609,0.880535,0.930114,-0.218584,0.880535,0.930114,-0.218584,0.852992,0.86318,-0.224609,0.880535,0.86318,-0.224609,0.852992,0.928804,-0.204032,0.852992,0.928149,-0.196756,0.852992,0.86187,-0.210057,0.852992,0.86187,-0.210057,0.852992,0.928149,-0.196756,0.852992,0.861215,-0.202781,0.852992,0.928804,-0.204032,0.852992,0.86187,-0.210057,0.880535,0.928804,-0.204032,0.880535,0.928804,-0.204032,0.852992,0.86187,-0.210057,0.880535,0.86187,-0.210057,0.852992,0.927494,-0.189481,0.852992,0.926839,-0.182205,0.852992,0.86056,-0.195505,0.852992,0.86056,-0.195505,0.852992,0.926839,-0.182205,0.852992,0.859906,-0.18823,0.852992,0.850081,-0.079093,0.852992,0.850736,-0.086369,0.880535,0.850081,-0.079093,0.880535,0.850081,-0.079093,0.852992,0.850736,-0.086369,0.880535,0.850736,-0.086369,0.852992,0.926184,-0.174929,0.852992,0.925529,-0.167653,0.852992,0.85925,-0.180954,0.852992,0.85925,-0.180954,0.852992,0.925529,-0.167653,0.852992,0.858595,-0.173678,0.852992,0.855321,-0.137299,0.852992,0.855976,-0.144575,0.880535,0.855321,-0.137299,0.880535,0.855321,-0.137299,0.852992,0.855976,-0.144575,0.880535,0.855976,-0.144575,0.852992,0.924874,-0.160377,0.852992,0.92422,-0.153102,0.852992,0.85794,-0.166402,0.852992,0.85794,-0.166402,0.852992,0.92422,-0.153102,0.852992,0.857286,-0.159126,0.852992,0.854011,-0.122748,0.852992,0.854666,-0.130023,0.880535,0.854011,-0.122748,0.880535,0.854011,-0.122748,0.852992,0.854666,-0.130023,0.880535,0.854666,-0.130023,0.852992,0.923565,-0.145826,0.852992,0.92291,-0.13855,0.852992,0.856631,-0.151851,0.852992,0.856631,-0.151851,0.852992,0.92291,-0.13855,0.852992,0.855976,-0.144575,0.852992,0.932734,-0.247687,0.852992,0.8658,-0.253712,0.880535,0.932734,-0.247687,0.880535,0.932734,-0.247687,0.852992,0.8658,-0.253712,0.880535,0.8658,-0.253712,0.852992,0.922255,-0.131274,0.852992,0.9216,-0.123998,0.852992,0.855321,-0.137299,0.852992,0.855321,-0.137299,0.852992,0.9216,-0.123998,0.852992,0.854666,-0.130023,0.852992,0.931424,-0.233135,0.852992,0.86449,-0.23916,0.880535,0.931424,-0.233135,0.880535,0.931424,-0.233135,0.852992,0.86449,-0.23916,0.880535,0.86449,-0.23916,0.852992,0.920945,-0.116722,0.852992,0.92029,-0.109446,0.852992,0.854011,-0.122748,0.852992,0.854011,-0.122748,0.852992,0.92029,-0.109446,0.852992,0.853356,-0.115472,0.852992,0.850736,-0.086369,0.852992,0.91767,-0.080343,0.880535,0.850736,-0.086369,0.880535,0.850736,-0.086369,0.852992,0.91767,-0.080343,0.880535,0.91767,-0.080343,0.852992,0.919635,-0.102171,0.852992,0.91898,-0.094895,0.852992,0.852701,-0.108196,0.852992,0.852701,-0.108196,0.852992,0.91898,-0.094895,0.852992,0.852046,-0.10092,0.852992,0.85794,-0.166402,0.852992,0.858595,-0.173678,0.880535,0.85794,-0.166402,0.880535,0.85794,-0.166402,0.852992,0.858595,-0.173678,0.880535,0.858595,-0.173678,0.852992,0.918325,-0.087619,0.852992,0.91767,-0.080343,0.852992,0.851391,-0.093644,0.852992,0.851391,-0.093644,0.852992,0.91767,-0.080343,0.852992,0.850736,-0.086369,0.880535,0.91767,-0.080343,0.880535,0.917015,-0.073067,0.880535,0.850736,-0.086369,0.880535,0.850736,-0.086369,0.880535,0.917015,-0.073067,0.880535,0.850081,-0.079093,0.880535,0.941248,-0.342272,0.880535,0.940593,-0.334996,0.880535,0.874313,-0.348298,0.880535,0.874313,-0.348298,0.880535,0.940593,-0.334996,0.880535,0.873659,-0.341022,0.880535,0.939938,-0.327721,0.880535,0.939283,-0.320445,0.880535,0.873004,-0.333746,0.880535,0.873004,-0.333746,0.880535,0.939283,-0.320445,0.880535,0.872349,-0.32647,0.880535,0.938628,-0.313169,0.880535,0.937973,-0.305893,0.880535,0.871694,-0.319194,0.880535,0.871694,-0.319194,0.880535,0.937973,-0.305893,0.880535,0.871039,-0.311919,0.880535,0.937318,-0.298617,0.880535,0.936663,-0.291342,0.880535,0.870384,-0.304643,0.880535,0.870384,-0.304643,0.880535,0.936663,-0.291342,0.880535,0.869729,-0.297367,0.880535,0.936008,-0.284066,0.880535,0.935353,-0.27679,0.880535,0.869074,-0.290091,0.880535,0.869074,-0.290091,0.880535,0.935353,-0.27679,0.880535,0.868419,-0.282815,0.880535,0.934699,-0.269514,0.880535,0.934044,-0.262239,0.880535,0.867764,-0.275539,0.880535,0.867764,-0.275539,0.880535,0.934044,-0.262239,0.880535,0.86711,-0.268264,0.880535,0.933389,-0.254963,0.880535,0.932734,-0.247687,0.880535,0.866455,-0.260988,0.880535,0.866455,-0.260988,0.880535,0.932734,-0.247687,0.880535,0.8658,-0.253712,0.880535,0.932079,-0.240411,0.880535,0.931424,-0.233135,0.880535,0.865145,-0.246436,0.880535,0.865145,-0.246436,0.880535,0.931424,-0.233135,0.880535,0.86449,-0.23916,0.880535,0.930769,-0.225859,0.880535,0.930114,-0.218584,0.880535,0.863835,-0.231884,0.880535,0.863835,-0.231884,0.880535,0.930114,-0.218584,0.880535,0.86318,-0.224609,0.880535,0.929459,-0.211308,0.880535,0.928804,-0.204032,0.880535,0.862525,-0.217333,0.880535,0.862525,-0.217333,0.880535,0.928804,-0.204032,0.880535,0.86187,-0.210057,0.880535,0.928149,-0.196756,0.880535,0.927494,-0.189481,0.880535,0.861215,-0.202781,0.880535,0.861215,-0.202781,0.880535,0.927494,-0.189481,0.880535,0.86056,-0.195505,0.880535,0.926839,-0.182205,0.880535,0.926184,-0.174929,0.880535,0.859906,-0.18823,0.880535,0.859906,-0.18823,0.880535,0.926184,-0.174929,0.880535,0.85925,-0.180954,0.880535,0.925529,-0.167653,0.880535,0.924874,-0.160377,0.880535,0.858595,-0.173678,0.880535,0.858595,-0.173678,0.880535,0.924874,-0.160377,0.880535,0.85794,-0.166402,0.880535,0.92422,-0.153102,0.880535,0.923565,-0.145826,0.880535,0.857286,-0.159126,0.880535,0.857286,-0.159126,0.880535,0.923565,-0.145826,0.880535,0.856631,-0.151851,0.880535,0.92291,-0.13855,0.880535,0.922255,-0.131274,0.880535,0.855976,-0.144575,0.880535,0.855976,-0.144575,0.880535,0.922255,-0.131274,0.880535,0.855321,-0.137299,0.880535,0.9216,-0.123998,0.880535,0.920945,-0.116722,0.880535,0.854666,-0.130023,0.880535,0.854666,-0.130023,0.880535,0.920945,-0.116722,0.880535,0.854011,-0.122748,0.880535,0.92029,-0.109446,0.880535,0.919635,-0.102171,0.880535,0.853356,-0.115472,0.880535,0.853356,-0.115472,0.880535,0.919635,-0.102171,0.880535,0.852701,-0.108196,0.880535,0.91898,-0.094895,0.880535,0.918325,-0.087619,0.880535,0.852046,-0.10092,0.880535,0.852046,-0.10092,0.880535,0.918325,-0.087619,0.880535,0.851391,-0.093644,0.852992,0.924874,-0.160377,0.852992,0.85794,-0.166402,0.880535,0.924874,-0.160377,0.880535,0.924874,-0.160377,0.852992,0.85794,-0.166402,0.880535,0.85794,-0.166402,0.852992,0.870384,-0.304643,0.852992,0.937318,-0.298617,0.880535,0.870384,-0.304643,0.880535,0.870384,-0.304643,0.852992,0.937318,-0.298617,0.880535,0.937318,-0.298617,0.852992,0.871694,-0.319194,0.852992,0.938628,-0.313169,0.880535,0.871694,-0.319194,0.880535,0.871694,-0.319194,0.852992,0.938628,-0.313169,0.880535,0.938628,-0.313169,0.852992,0.936008,-0.284066,0.852992,0.935353,-0.27679,0.880535,0.936008,-0.284066,0.880535,0.936008,-0.284066,0.852992,0.935353,-0.27679,0.880535,0.935353,-0.27679,0.852992,0.920945,-0.116722,0.852992,0.854011,-0.122748,0.880535,0.920945,-0.116722,0.880535,0.920945,-0.116722,0.852992,0.854011,-0.122748,0.880535,0.854011,-0.122748,0.852992,0.937318,-0.298617,0.852992,0.936663,-0.291342,0.880535,0.937318,-0.298617,0.880535,0.937318,-0.298617,0.852992,0.936663,-0.291342,0.880535,0.936663,-0.291342,0.852992,0.922255,-0.131274,0.852992,0.855321,-0.137299,0.880535,0.922255,-0.131274,0.880535,0.922255,-0.131274,0.852992,0.855321,-0.137299,0.880535,0.855321,-0.137299,0.852992,0.867764,-0.275539,0.852992,0.934699,-0.269514,0.880535,0.867764,-0.275539,0.880535,0.867764,-0.275539,0.852992,0.934699,-0.269514,0.880535,0.934699,-0.269514,0.852992,0.869074,-0.290091,0.852992,0.936008,-0.284066,0.880535,0.869074,-0.290091,0.880535,0.869074,-0.290091,0.852992,0.936008,-0.284066,0.880535,0.936008,-0.284066,0.852992,0.933389,-0.254963,0.852992,0.932734,-0.247687,0.880535,0.933389,-0.254963,0.880535,0.933389,-0.254963,0.852992,0.932734,-0.247687,0.880535,0.932734,-0.247687,0.852992,0.918325,-0.087619,0.852992,0.851391,-0.093644,0.880535,0.918325,-0.087619,0.880535,0.918325,-0.087619,0.852992,0.851391,-0.093644,0.880535,0.851391,-0.093644,0.852992,0.934699,-0.269514,0.852992,0.934044,-0.262239,0.880535,0.934699,-0.269514,0.880535,0.934699,-0.269514,0.852992,0.934044,-0.262239,0.880535,0.934044,-0.262239,0.852992,0.919635,-0.102171,0.852992,0.852701,-0.108196,0.880535,0.919635,-0.102171,0.880535,0.919635,-0.102171,0.852992,0.852701,-0.108196,0.880535,0.852701,-0.108196,0.852992,0.865145,-0.246436,0.852992,0.932079,-0.240411,0.880535,0.865145,-0.246436,0.880535,0.865145,-0.246436,0.852992,0.932079,-0.240411,0.880535,0.932079,-0.240411,0.852992,0.866455,-0.260988,0.852992,0.933389,-0.254963,0.880535,0.866455,-0.260988,0.880535,0.866455,-0.260988,0.852992,0.933389,-0.254963,0.880535,0.933389,-0.254963,0.852992,0.930769,-0.225859,0.852992,0.930114,-0.218584,0.880535,0.930769,-0.225859,0.880535,0.930769,-0.225859,0.852992,0.930114,-0.218584,0.880535,0.930114,-0.218584,0.852992,0.932079,-0.240411,0.852992,0.931424,-0.233135,0.880535,0.932079,-0.240411,0.880535,0.932079,-0.240411,0.852992,0.931424,-0.233135,0.880535,0.931424,-0.233135,0.852992,0.91767,-0.080343,0.852992,0.917015,-0.073067,0.880535,0.91767,-0.080343,0.880535,0.91767,-0.080343,0.852992,0.917015,-0.073067,0.880535,0.917015,-0.073067,0.852992,0.862525,-0.217333,0.852992,0.929459,-0.211308,0.880535,0.862525,-0.217333,0.880535,0.862525,-0.217333,0.852992,0.929459,-0.211308,0.880535,0.929459,-0.211308,0.852992,0.863835,-0.231884,0.852992,0.930769,-0.225859,0.880535,0.863835,-0.231884,0.880535,0.863835,-0.231884,0.852992,0.930769,-0.225859,0.880535,0.930769,-0.225859,0.852992,0.928149,-0.196756,0.852992,0.927494,-0.189481,0.880535,0.928149,-0.196756,0.880535,0.928149,-0.196756,0.852992,0.927494,-0.189481,0.880535,0.927494,-0.189481,0.852992,0.929459,-0.211308,0.852992,0.928804,-0.204032,0.880535,0.929459,-0.211308,0.880535,0.929459,-0.211308,0.852992,0.928804,-0.204032,0.880535,0.928804,-0.204032,0.852992,0.859906,-0.18823,0.852992,0.926839,-0.182205,0.880535,0.859906,-0.18823,0.880535,0.859906,-0.18823,0.852992,0.926839,-0.182205,0.880535,0.926839,-0.182205,0.852992,0.917015,-0.073067,0.852992,0.850081,-0.079093,0.880535,0.917015,-0.073067,0.880535,0.917015,-0.073067,0.852992,0.850081,-0.079093,0.880535,0.850081,-0.079093,0.852992,0.861215,-0.202781,0.852992,0.928149,-0.196756,0.880535,0.861215,-0.202781,0.880535,0.861215,-0.202781,0.852992,0.928149,-0.196756,0.880535,0.928149,-0.196756,0.852992,0.925529,-0.167653,0.852992,0.924874,-0.160377,0.880535,0.925529,-0.167653,0.880535,0.925529,-0.167653,0.852992,0.924874,-0.160377,0.880535,0.924874,-0.160377,0.852992,0.926839,-0.182205,0.852992,0.926184,-0.174929,0.880535,0.926839,-0.182205,0.880535,0.926839,-0.182205,0.852992,0.926184,-0.174929,0.880535,0.926184,-0.174929,0.852992,0.86449,-0.23916,0.852992,0.865145,-0.246436,0.880535,0.86449,-0.23916,0.852992,0.857286,-0.159126,0.852992,0.92422,-0.153102,0.880535,0.857286,-0.159126,0.880535,0.857286,-0.159126,0.852992,0.92422,-0.153102,0.880535,0.92422,-0.153102,0.852992,0.858595,-0.173678,0.852992,0.925529,-0.167653,0.880535,0.858595,-0.173678,0.880535,0.858595,-0.173678,0.852992,0.925529,-0.167653,0.880535,0.925529,-0.167653,0.852992,0.92291,-0.13855,0.852992,0.922255,-0.131274,0.880535,0.92291,-0.13855,0.880535,0.92291,-0.13855,0.852992,0.922255,-0.131274,0.880535,0.922255,-0.131274,0.852992,0.939283,-0.320445,0.852992,0.872349,-0.32647,0.880535,0.939283,-0.320445,0.880535,0.939283,-0.320445,0.852992,0.872349,-0.32647,0.880535,0.872349,-0.32647,0.852992,0.92422,-0.153102,0.852992,0.923565,-0.145826,0.880535,0.92422,-0.153102,0.880535,0.92422,-0.153102,0.852992,0.923565,-0.145826,0.880535,0.923565,-0.145826,0.852992,0.940593,-0.334996,0.852992,0.873659,-0.341022,0.880535,0.940593,-0.334996,0.880535,0.940593,-0.334996,0.852992,0.873659,-0.341022,0.880535,0.873659,-0.341022,0.852992,0.86187,-0.210057,0.852992,0.862525,-0.217333,0.880535,0.86187,-0.210057,0.880535,0.86187,-0.210057,0.852992,0.862525,-0.217333,0.880535,0.862525,-0.217333,0.852992,0.854666,-0.130023,0.852992,0.9216,-0.123998,0.880535,0.854666,-0.130023,0.880535,0.854666,-0.130023,0.852992,0.9216,-0.123998,0.880535,0.9216,-0.123998,0.852992,0.86318,-0.224609,0.852992,0.863835,-0.231884,0.880535,0.86318,-0.224609,0.880535,0.86318,-0.224609,0.852992,0.863835,-0.231884,0.880535,0.863835,-0.231884,0.852992,0.855976,-0.144575,0.852992,0.92291,-0.13855,0.880535,0.855976,-0.144575,0.880535,0.855976,-0.144575,0.852992,0.92291,-0.13855,0.880535,0.92291,-0.13855,0.852992,0.92029,-0.109446,0.852992,0.919635,-0.102171,0.880535,0.92029,-0.109446,0.880535,0.92029,-0.109446,0.852992,0.919635,-0.102171,0.880535,0.919635,-0.102171,0.852992,0.936663,-0.291342,0.852992,0.869729,-0.297367,0.880535,0.936663,-0.291342,0.880535,0.936663,-0.291342,0.852992,0.869729,-0.297367,0.880535,0.869729,-0.297367,0.852992,0.9216,-0.123998,0.852992,0.920945,-0.116722,0.880535,0.9216,-0.123998,0.880535,0.9216,-0.123998,0.852992,0.920945,-0.116722,0.880535,0.920945,-0.116722,0.852992,0.937973,-0.305893,0.852992,0.871039,-0.311919,0.880535,0.937973,-0.305893,0.880535,0.937973,-0.305893,0.852992,0.871039,-0.311919,0.880535,0.871039,-0.311919,0.852992,0.85925,-0.180954,0.852992,0.859906,-0.18823,0.880535,0.85925,-0.180954,0.880535,0.85925,-0.180954,0.852992,0.859906,-0.18823,0.880535,0.859906,-0.18823,0.852992,0.852046,-0.10092,0.852992,0.91898,-0.094895,0.880535,0.852046,-0.10092,0.880535,0.852046,-0.10092,0.852992,0.91898,-0.094895,0.880535,0.91898,-0.094895,0.852992,0.86056,-0.195505,0.852992,0.861215,-0.202781,0.880535,0.86056,-0.195505,0.880535,0.86056,-0.195505,0.852992,0.861215,-0.202781,0.880535,0.861215,-0.202781,0.852992,0.853356,-0.115472,0.852992,0.92029,-0.109446,0.880535,0.853356,-0.115472,0.880535,0.853356,-0.115472,0.852992,0.92029,-0.109446,0.880535,0.92029,-0.109446,0.852992,0.934044,-0.262239,0.852992,0.86711,-0.268264,0.880535,0.934044,-0.262239,0.880535,0.934044,-0.262239,0.852992,0.86711,-0.268264,0.880535,0.86711,-0.268264,0.852992,0.91898,-0.094895,0.852992,0.918325,-0.087619,0.880535,0.91898,-0.094895,0.880535,0.91898,-0.094895,0.852992,0.918325,-0.087619,0.880535,0.918325,-0.087619,0.852992,0.935353,-0.27679,0.852992,0.868419,-0.282815,0.880535,0.935353,-0.27679,0.880535,0.935353,-0.27679,0.852992,0.868419,-0.282815,0.880535,0.868419,-0.282815,0.852992,0.856631,-0.151851,0.852992,0.857286,-0.159126,0.880535,0.856631,-0.151851,0.880535,0.856631,-0.151851,0.852992,0.857286,-0.159126,0.880535,0.857286,-0.159126,0.83787,0.940004,-0.335257,0.83787,0.940862,-0.344788,0.83787,0.874285,-0.341173,0.83787,0.874285,-0.341173,0.83787,0.940862,-0.344788,0.83787,0.875142,-0.350703,0.83787,0.923705,-0.15418,0.83787,0.924563,-0.163711,0.808753,0.923705,-0.15418,0.808753,0.923705,-0.15418,0.83787,0.924563,-0.163711,0.808753,0.924563,-0.163711,0.83787,0.9177,-0.087468,0.83787,0.918557,-0.096998,0.83787,0.85198,-0.093384,0.83787,0.85198,-0.093384,0.83787,0.918557,-0.096998,0.83787,0.852837,-0.102914,0.83787,0.864848,-0.236339,0.83787,0.930568,-0.230423,0.808753,0.864848,-0.236339,0.808753,0.864848,-0.236339,0.83787,0.930568,-0.230423,0.808753,0.930568,-0.230423,0.83787,0.919415,-0.106528,0.83787,0.920273,-0.116059,0.83787,0.853695,-0.112444,0.83787,0.853695,-0.112444,0.83787,0.920273,-0.116059,0.83787,0.854553,-0.121975,0.83787,0.921989,-0.13512,0.83787,0.922847,-0.14465,0.808753,0.921989,-0.13512,0.808753,0.921989,-0.13512,0.83787,0.922847,-0.14465,0.808753,0.922847,-0.14465,0.83787,0.921131,-0.125589,0.83787,0.921989,-0.13512,0.83787,0.855411,-0.131505,0.83787,0.855411,-0.131505,0.83787,0.921989,-0.13512,0.83787,0.856269,-0.141035,0.83787,0.862274,-0.207748,0.83787,0.861416,-0.198218,0.808753,0.862274,-0.207748,0.808753,0.862274,-0.207748,0.83787,0.861416,-0.198218,0.808753,0.861416,-0.198218,0.83787,0.922847,-0.14465,0.83787,0.923705,-0.15418,0.83787,0.857127,-0.150566,0.83787,0.857127,-0.150566,0.83787,0.923705,-0.15418,0.83787,0.857985,-0.160096,0.83787,0.860558,-0.188687,0.83787,0.859701,-0.179157,0.808753,0.860558,-0.188687,0.808753,0.860558,-0.188687,0.83787,0.859701,-0.179157,0.808753,0.859701,-0.179157,0.83787,0.924563,-0.163711,0.83787,0.92542,-0.173241,0.83787,0.858843,-0.169626,0.83787,0.858843,-0.169626,0.83787,0.92542,-0.173241,0.83787,0.859701,-0.179157,0.83787,0.851122,-0.083854,0.83787,0.916842,-0.077938,0.808753,0.851122,-0.083854,0.808753,0.851122,-0.083854,0.83787,0.916842,-0.077938,0.808753,0.916842,-0.077938,0.83787,0.926278,-0.182771,0.83787,0.927136,-0.192302,0.83787,0.860558,-0.188687,0.83787,0.860558,-0.188687,0.83787,0.927136,-0.192302,0.83787,0.861416,-0.198218,0.83787,0.859701,-0.179157,0.83787,0.92542,-0.173241,0.808753,0.859701,-0.179157,0.808753,0.859701,-0.179157,0.83787,0.92542,-0.173241,0.808753,0.92542,-0.173241,0.83787,0.927994,-0.201832,0.83787,0.928852,-0.211362,0.83787,0.862274,-0.207748,0.83787,0.862274,-0.207748,0.83787,0.928852,-0.211362,0.83787,0.863132,-0.217278,0.83787,0.927136,-0.192302,0.83787,0.927994,-0.201832,0.808753,0.927136,-0.192302,0.808753,0.927136,-0.192302,0.83787,0.927994,-0.201832,0.808753,0.927994,-0.201832,0.83787,0.92971,-0.220893,0.83787,0.930568,-0.230423,0.83787,0.86399,-0.226809,0.83787,0.86399,-0.226809,0.83787,0.930568,-0.230423,0.83787,0.864848,-0.236339,0.83787,0.861416,-0.198218,0.83787,0.927136,-0.192302,0.808753,0.861416,-0.198218,0.808753,0.861416,-0.198218,0.83787,0.927136,-0.192302,0.808753,0.927136,-0.192302,0.83787,0.931426,-0.239954,0.83787,0.932283,-0.249484,0.83787,0.865706,-0.245869,0.83787,0.865706,-0.245869,0.83787,0.932283,-0.249484,0.83787,0.866564,-0.2554,0.83787,0.92542,-0.173241,0.83787,0.926278,-0.182771,0.808753,0.92542,-0.173241,0.808753,0.92542,-0.173241,0.83787,0.926278,-0.182771,0.808753,0.926278,-0.182771,0.83787,0.933142,-0.259014,0.83787,0.933999,-0.268545,0.83787,0.867422,-0.26493,0.83787,0.867422,-0.26493,0.83787,0.933999,-0.268545,0.83787,0.86828,-0.274461,0.83787,0.865706,-0.245869,0.83787,0.864848,-0.236339,0.808753,0.865706,-0.245869,0.808753,0.865706,-0.245869,0.83787,0.864848,-0.236339,0.808753,0.864848,-0.236339,0.83787,0.934857,-0.278075,0.83787,0.935715,-0.287605,0.83787,0.869137,-0.283991,0.83787,0.869137,-0.283991,0.83787,0.935715,-0.287605,0.83787,0.869995,-0.293521,0.83787,0.86399,-0.226809,0.83787,0.863132,-0.217278,0.808753,0.86399,-0.226809,0.808753,0.86399,-0.226809,0.83787,0.863132,-0.217278,0.808753,0.863132,-0.217278,0.83787,0.936573,-0.297136,0.83787,0.937431,-0.306666,0.83787,0.870853,-0.303052,0.83787,0.870853,-0.303052,0.83787,0.937431,-0.306666,0.83787,0.871711,-0.312582,0.83787,0.856269,-0.141035,0.83787,0.921989,-0.13512,0.808753,0.856269,-0.141035,0.808753,0.856269,-0.141035,0.83787,0.921989,-0.13512,0.808753,0.921989,-0.13512,0.83787,0.938288,-0.316197,0.83787,0.939146,-0.325727,0.83787,0.872569,-0.322112,0.83787,0.872569,-0.322112,0.83787,0.939146,-0.325727,0.83787,0.873427,-0.331643,0.83787,0.930568,-0.230423,0.83787,0.931426,-0.239954,0.808753,0.930568,-0.230423,0.808753,0.930568,-0.230423,0.83787,0.931426,-0.239954,0.808753,0.931426,-0.239954,0.808753,0.916842,-0.077938,0.808753,0.9177,-0.087468,0.808753,0.851122,-0.083854,0.808753,0.851122,-0.083854,0.808753,0.9177,-0.087468,0.808753,0.85198,-0.093384,0.808753,0.918557,-0.096998,0.808753,0.919415,-0.106528,0.808753,0.852837,-0.102914,0.808753,0.852837,-0.102914,0.808753,0.919415,-0.106528,0.808753,0.853695,-0.112444,0.808753,0.920273,-0.116059,0.808753,0.921131,-0.125589,0.808753,0.854553,-0.121975,0.808753,0.854553,-0.121975,0.808753,0.921131,-0.125589,0.808753,0.855411,-0.131505,0.808753,0.921989,-0.13512,0.808753,0.922847,-0.14465,0.808753,0.856269,-0.141035,0.808753,0.856269,-0.141035,0.808753,0.922847,-0.14465,0.808753,0.857127,-0.150566,0.808753,0.923705,-0.15418,0.808753,0.924563,-0.163711,0.808753,0.857985,-0.160096,0.808753,0.857985,-0.160096,0.808753,0.924563,-0.163711,0.808753,0.858843,-0.169626,0.808753,0.92542,-0.173241,0.808753,0.926278,-0.182771,0.808753,0.859701,-0.179157,0.808753,0.859701,-0.179157,0.808753,0.926278,-0.182771,0.808753,0.860558,-0.188687,0.808753,0.927136,-0.192302,0.808753,0.927994,-0.201832,0.808753,0.861416,-0.198218,0.808753,0.861416,-0.198218,0.808753,0.927994,-0.201832,0.808753,0.862274,-0.207748,0.808753,0.928852,-0.211362,0.808753,0.92971,-0.220893,0.808753,0.863132,-0.217278,0.808753,0.863132,-0.217278,0.808753,0.92971,-0.220893,0.808753,0.86399,-0.226809,0.808753,0.930568,-0.230423,0.808753,0.931426,-0.239954,0.808753,0.864848,-0.236339,0.808753,0.864848,-0.236339,0.808753,0.931426,-0.239954,0.808753,0.865706,-0.245869,0.808753,0.932283,-0.249484,0.808753,0.933142,-0.259014,0.808753,0.866564,-0.2554,0.808753,0.866564,-0.2554,0.808753,0.933142,-0.259014,0.808753,0.867422,-0.26493,0.808753,0.933999,-0.268545,0.808753,0.934857,-0.278075,0.808753,0.86828,-0.274461,0.808753,0.86828,-0.274461,0.808753,0.934857,-0.278075,0.808753,0.869137,-0.283991,0.808753,0.935715,-0.287605,0.808753,0.936573,-0.297136,0.808753,0.869995,-0.293521,0.808753,0.869995,-0.293521,0.808753,0.936573,-0.297136,0.808753,0.870853,-0.303052,0.808753,0.937431,-0.306666,0.808753,0.938288,-0.316197,0.808753,0.871711,-0.312582,0.808753,0.871711,-0.312582,0.808753,0.938288,-0.316197,0.808753,0.872569,-0.322112,0.808753,0.939146,-0.325727,0.808753,0.940004,-0.335257,0.808753,0.873427,-0.331643,0.808753,0.873427,-0.331643,0.808753,0.940004,-0.335257,0.808753,0.874285,-0.341173,0.83787,0.863132,-0.217278,0.83787,0.928852,-0.211362,0.808753,0.863132,-0.217278,0.808753,0.863132,-0.217278,0.83787,0.928852,-0.211362,0.808753,0.928852,-0.211362,0.83787,0.857127,-0.150566,0.83787,0.856269,-0.141035,0.808753,0.857127,-0.150566,0.808753,0.857127,-0.150566,0.83787,0.856269,-0.141035,0.808753,0.856269,-0.141035,0.83787,0.85198,-0.093384,0.83787,0.851122,-0.083854,0.808753,0.85198,-0.093384,0.808753,0.85198,-0.093384,0.83787,0.851122,-0.083854,0.808753,0.851122,-0.083854,0.83787,0.858843,-0.169626,0.83787,0.857985,-0.160096,0.808753,0.858843,-0.169626,0.808753,0.858843,-0.169626,0.83787,0.857985,-0.160096,0.808753,0.857985,-0.160096,0.83787,0.918557,-0.096998,0.83787,0.919415,-0.106528,0.808753,0.918557,-0.096998,0.808753,0.918557,-0.096998,0.83787,0.919415,-0.106528,0.808753,0.919415,-0.106528,0.83787,0.86828,-0.274461,0.83787,0.933999,-0.268545,0.808753,0.86828,-0.274461,0.808753,0.86828,-0.274461,0.83787,0.933999,-0.268545,0.808753,0.933999,-0.268545,0.83787,0.920273,-0.116059,0.83787,0.921131,-0.125589,0.808753,0.920273,-0.116059,0.808753,0.920273,-0.116059,0.83787,0.921131,-0.125589,0.808753,0.921131,-0.125589,0.83787,0.866564,-0.2554,0.83787,0.932283,-0.249484,0.808753,0.866564,-0.2554,0.808753,0.866564,-0.2554,0.83787,0.932283,-0.249484,0.808753,0.932283,-0.249484,0.83787,0.853695,-0.112444,0.83787,0.852837,-0.102914,0.808753,0.853695,-0.112444,0.808753,0.853695,-0.112444,0.83787,0.852837,-0.102914,0.808753,0.852837,-0.102914,0.83787,0.855411,-0.131505,0.83787,0.854553,-0.121975,0.808753,0.855411,-0.131505,0.808753,0.855411,-0.131505,0.83787,0.854553,-0.121975,0.808753,0.854553,-0.121975,0.83787,0.871711,-0.312582,0.83787,0.937431,-0.306666,0.808753,0.871711,-0.312582,0.808753,0.871711,-0.312582,0.83787,0.937431,-0.306666,0.808753,0.937431,-0.306666,0.83787,0.869995,-0.293521,0.83787,0.935715,-0.287605,0.808753,0.869995,-0.293521,0.808753,0.869995,-0.293521,0.83787,0.935715,-0.287605,0.808753,0.935715,-0.287605,0.83787,0.919415,-0.106528,0.83787,0.853695,-0.112444,0.808753,0.919415,-0.106528,0.808753,0.919415,-0.106528,0.83787,0.853695,-0.112444,0.808753,0.853695,-0.112444,0.83787,0.9177,-0.087468,0.83787,0.85198,-0.093384,0.808753,0.9177,-0.087468,0.808753,0.9177,-0.087468,0.83787,0.85198,-0.093384,0.808753,0.85198,-0.093384,0.83787,0.873427,-0.331643,0.83787,0.939146,-0.325727,0.808753,0.873427,-0.331643,0.808753,0.873427,-0.331643,0.83787,0.939146,-0.325727,0.808753,0.939146,-0.325727,0.83787,0.922847,-0.14465,0.83787,0.857127,-0.150566,0.808753,0.922847,-0.14465,0.808753,0.922847,-0.14465,0.83787,0.857127,-0.150566,0.808753,0.857127,-0.150566,0.83787,0.921131,-0.125589,0.83787,0.855411,-0.131505,0.808753,0.921131,-0.125589,0.808753,0.921131,-0.125589,0.83787,0.855411,-0.131505,0.808753,0.855411,-0.131505,0.83787,0.926278,-0.182771,0.83787,0.860558,-0.188687,0.808753,0.926278,-0.182771,0.808753,0.926278,-0.182771,0.83787,0.860558,-0.188687,0.808753,0.860558,-0.188687,0.83787,0.924563,-0.163711,0.83787,0.858843,-0.169626,0.808753,0.924563,-0.163711,0.808753,0.924563,-0.163711,0.83787,0.858843,-0.169626,0.808753,0.858843,-0.169626,0.83787,0.92971,-0.220893,0.83787,0.86399,-0.226809,0.808753,0.92971,-0.220893,0.808753,0.92971,-0.220893,0.83787,0.86399,-0.226809,0.808753,0.86399,-0.226809,0.83787,0.927994,-0.201832,0.83787,0.862274,-0.207748,0.808753,0.927994,-0.201832,0.808753,0.927994,-0.201832,0.83787,0.862274,-0.207748,0.808753,0.862274,-0.207748,0.83787,0.916842,-0.077938,0.83787,0.9177,-0.087468,0.808753,0.916842,-0.077938,0.808753,0.916842,-0.077938,0.83787,0.9177,-0.087468,0.808753,0.9177,-0.087468,0.83787,0.933142,-0.259014,0.83787,0.867422,-0.26493,0.808753,0.933142,-0.259014,0.808753,0.933142,-0.259014,0.83787,0.867422,-0.26493,0.808753,0.867422,-0.26493,0.83787,0.931426,-0.239954,0.83787,0.865706,-0.245869,0.808753,0.931426,-0.239954,0.808753,0.931426,-0.239954,0.83787,0.865706,-0.245869,0.808753,0.865706,-0.245869,0.83787,0.939146,-0.325727,0.83787,0.940004,-0.335257,0.808753,0.939146,-0.325727,0.808753,0.939146,-0.325727,0.83787,0.940004,-0.335257,0.808753,0.940004,-0.335257,0.83787,0.936573,-0.297136,0.83787,0.870853,-0.303052,0.808753,0.936573,-0.297136,0.808753,0.936573,-0.297136,0.83787,0.870853,-0.303052,0.808753,0.870853,-0.303052,0.83787,0.934857,-0.278075,0.83787,0.869137,-0.283991,0.808753,0.934857,-0.278075,0.808753,0.934857,-0.278075,0.83787,0.869137,-0.283991,0.808753,0.869137,-0.283991,0.83787,0.935715,-0.287605,0.83787,0.936573,-0.297136,0.808753,0.935715,-0.287605,0.808753,0.935715,-0.287605,0.83787,0.936573,-0.297136,0.808753,0.936573,-0.297136,0.83787,0.937431,-0.306666,0.83787,0.938288,-0.316197,0.808753,0.937431,-0.306666,0.808753,0.937431,-0.306666,0.83787,0.938288,-0.316197,0.808753,0.938288,-0.316197,0.83787,0.940004,-0.335257,0.83787,0.874285,-0.341173,0.808753,0.940004,-0.335257,0.808753,0.940004,-0.335257,0.83787,0.874285,-0.341173,0.808753,0.874285,-0.341173,0.83787,0.938288,-0.316197,0.83787,0.872569,-0.322112,0.808753,0.938288,-0.316197,0.808753,0.938288,-0.316197,0.83787,0.872569,-0.322112,0.808753,0.872569,-0.322112,0.83787,0.932283,-0.249484,0.83787,0.933142,-0.259014,0.808753,0.932283,-0.249484,0.808753,0.932283,-0.249484,0.83787,0.933142,-0.259014,0.808753,0.933142,-0.259014,0.83787,0.854553,-0.121975,0.83787,0.920273,-0.116059,0.808753,0.854553,-0.121975,0.808753,0.854553,-0.121975,0.83787,0.920273,-0.116059,0.808753,0.920273,-0.116059,0.83787,0.933999,-0.268545,0.83787,0.934857,-0.278075,0.808753,0.933999,-0.268545,0.808753,0.933999,-0.268545,0.83787,0.934857,-0.278075,0.808753,0.934857,-0.278075,0.83787,0.852837,-0.102914,0.83787,0.918557,-0.096998,0.808753,0.852837,-0.102914,0.808753,0.852837,-0.102914,0.83787,0.918557,-0.096998,0.808753,0.918557,-0.096998,0.83787,0.867422,-0.26493,0.83787,0.866564,-0.2554,0.808753,0.867422,-0.26493,0.808753,0.867422,-0.26493,0.83787,0.866564,-0.2554,0.808753,0.866564,-0.2554,0.808753,0.869137,-0.283991,0.83787,0.86828,-0.274461,0.808753,0.86828,-0.274461,0.83787,0.928852,-0.211362,0.83787,0.92971,-0.220893,0.808753,0.928852,-0.211362,0.808753,0.928852,-0.211362,0.83787,0.92971,-0.220893,0.808753,0.92971,-0.220893,0.83787,0.857985,-0.160096,0.83787,0.923705,-0.15418,0.808753,0.857985,-0.160096,0.808753,0.857985,-0.160096,0.83787,0.923705,-0.15418,0.808753,0.923705,-0.15418,-0.852992,0.939893,-0.327648,-0.880534,0.939893,-0.327648,-0.852992,0.939241,-0.320371,-0.852992,0.939241,-0.320371,-0.880534,0.939893,-0.327648,-0.880534,0.939242,-0.320372,-0.852992,0.941847,-0.349476,-0.852992,0.87491,-0.355468,-0.852992,0.941196,-0.3422,-0.852992,0.941196,-0.3422,-0.852992,0.87491,-0.355468,-0.852992,0.874258,-0.348192,-0.852993,0.923609,-0.145744,-0.880536,0.923609,-0.145744,-0.852993,0.856672,-0.151737,-0.852993,0.856672,-0.151737,-0.880536,0.923609,-0.145744,-0.880536,0.856672,-0.151737,-0.852992,0.940544,-0.334924,-0.852992,0.873607,-0.340916,-0.852992,0.939893,-0.327648,-0.852992,0.939893,-0.327648,-0.852992,0.873607,-0.340916,-0.852992,0.872956,-0.33364,-0.852992,0.93859,-0.313095,-0.880534,0.93859,-0.313095,-0.852992,0.937939,-0.305819,-0.852992,0.937939,-0.305819,-0.880534,0.93859,-0.313095,-0.880534,0.937939,-0.30582,-0.852992,0.939241,-0.320371,-0.852992,0.872304,-0.326364,-0.852992,0.93859,-0.313095,-0.852992,0.93859,-0.313095,-0.852992,0.872304,-0.326364,-0.852992,0.871653,-0.319088,-0.852992,0.874258,-0.348192,-0.880534,0.874258,-0.348193,-0.852992,0.941196,-0.3422,-0.852992,0.941196,-0.3422,-0.880534,0.874258,-0.348193,-0.880534,0.941196,-0.3422,-0.852992,0.937939,-0.305819,-0.852992,0.871002,-0.311812,-0.852992,0.937287,-0.298543,-0.852992,0.937287,-0.298543,-0.852992,0.871002,-0.311812,-0.852992,0.87035,-0.304535,-0.852992,0.872956,-0.33364,-0.880534,0.872956,-0.33364,-0.852992,0.939893,-0.327648,-0.852992,0.939893,-0.327648,-0.880534,0.872956,-0.33364,-0.880534,0.939893,-0.327648,-0.852992,0.936636,-0.291267,-0.852992,0.869699,-0.297259,-0.852992,0.935985,-0.283991,-0.852992,0.935985,-0.283991,-0.852992,0.869699,-0.297259,-0.852992,0.869048,-0.289983,-0.852993,0.927517,-0.189401,-0.880535,0.927517,-0.189401,-0.852993,0.86058,-0.195393,-0.852993,0.86058,-0.195393,-0.880535,0.927517,-0.189401,-0.880535,0.86058,-0.195394,-0.852992,0.935333,-0.276715,-0.852992,0.868396,-0.282707,-0.852992,0.934682,-0.269439,-0.852992,0.934682,-0.269439,-0.852992,0.868396,-0.282707,-0.852992,0.867745,-0.275431,-0.852993,0.926214,-0.174849,-0.880536,0.926214,-0.174849,-0.852993,0.859277,-0.180841,-0.852993,0.859277,-0.180841,-0.880536,0.926214,-0.174849,-0.880536,0.859277,-0.180841,-0.852992,0.93403,-0.262162,-0.852992,0.867094,-0.268155,-0.852992,0.933379,-0.254886,-0.852992,0.933379,-0.254886,-0.852992,0.867094,-0.268155,-0.852992,0.866442,-0.260879,-0.852992,0.941196,-0.3422,-0.880534,0.941196,-0.3422,-0.852992,0.940544,-0.334924,-0.852992,0.940544,-0.334924,-0.880534,0.941196,-0.3422,-0.880534,0.940544,-0.334924,-0.852992,0.932728,-0.24761,-0.852992,0.865791,-0.253603,-0.852992,0.932076,-0.240334,-0.852992,0.932076,-0.240334,-0.852992,0.865791,-0.253603,-0.852992,0.865139,-0.246326,-0.852994,0.852763,-0.10808,-0.880536,0.852763,-0.10808,-0.852994,0.853415,-0.115356,-0.852994,0.853415,-0.115356,-0.880536,0.852763,-0.10808,-0.880536,0.853415,-0.115356,-0.852992,0.931425,-0.233058,-0.852992,0.864488,-0.23905,-0.852992,0.930774,-0.225782,-0.852992,0.930774,-0.225782,-0.852992,0.864488,-0.23905,-0.852992,0.863837,-0.231774,-0.852994,0.85146,-0.093528,-0.880536,0.85146,-0.093528,-0.852994,0.852112,-0.100804,-0.852994,0.852112,-0.100804,-0.880536,0.85146,-0.093528,-0.880536,0.852112,-0.100804,-0.852992,0.930122,-0.218506,-0.852992,0.863185,-0.224498,-0.852993,0.929471,-0.21123,-0.852993,0.929471,-0.21123,-0.852992,0.863185,-0.224498,-0.852993,0.862534,-0.217222,-0.852992,0.930122,-0.218506,-0.880535,0.930122,-0.218506,-0.852992,0.863185,-0.224498,-0.852992,0.863185,-0.224498,-0.880535,0.930122,-0.218506,-0.880535,0.863185,-0.224498,-0.852993,0.92882,-0.203953,-0.852993,0.861882,-0.209945,-0.852993,0.928168,-0.196677,-0.852993,0.928168,-0.196677,-0.852993,0.861882,-0.209945,-0.852993,0.861231,-0.20267,-0.852993,0.92882,-0.203953,-0.880535,0.92882,-0.203953,-0.852993,0.861882,-0.209945,-0.852993,0.861882,-0.209945,-0.880535,0.92882,-0.203953,-0.880535,0.861882,-0.209946,-0.852993,0.927517,-0.189401,-0.852993,0.86058,-0.195393,-0.852993,0.926866,-0.182125,-0.852993,0.926866,-0.182125,-0.852993,0.86058,-0.195393,-0.852993,0.859929,-0.188117,-0.852994,0.850158,-0.078975,-0.880536,0.850158,-0.078976,-0.852994,0.850809,-0.086251,-0.852994,0.850809,-0.086251,-0.880536,0.850158,-0.078976,-0.880536,0.850809,-0.086252,-0.852993,0.926214,-0.174849,-0.852993,0.859277,-0.180841,-0.852993,0.925563,-0.167573,-0.852993,0.925563,-0.167573,-0.852993,0.859277,-0.180841,-0.852993,0.858626,-0.173565,-0.852993,0.855369,-0.137184,-0.880536,0.855369,-0.137184,-0.852993,0.85602,-0.144461,-0.852993,0.85602,-0.144461,-0.880536,0.855369,-0.137184,-0.880536,0.85602,-0.144461,-0.852993,0.924912,-0.160297,-0.852993,0.857974,-0.166289,-0.852993,0.92426,-0.15302,-0.852993,0.92426,-0.15302,-0.852993,0.857974,-0.166289,-0.852993,0.857323,-0.159013,-0.852994,0.854066,-0.122632,-0.880536,0.854066,-0.122632,-0.852994,0.854718,-0.129908,-0.852994,0.854718,-0.129908,-0.880536,0.854066,-0.122632,-0.880536,0.854718,-0.129909,-0.852993,0.923609,-0.145744,-0.852993,0.856672,-0.151737,-0.852993,0.922957,-0.138468,-0.852993,0.922957,-0.138468,-0.852993,0.856672,-0.151737,-0.852993,0.85602,-0.144461,-0.852992,0.932728,-0.24761,-0.880535,0.932728,-0.24761,-0.852992,0.865791,-0.253603,-0.852992,0.865791,-0.253603,-0.880535,0.932728,-0.24761,-0.880535,0.865791,-0.253603,-0.852993,0.922306,-0.131192,-0.852993,0.855369,-0.137184,-0.852994,0.921655,-0.123916,-0.852994,0.921655,-0.123916,-0.852993,0.855369,-0.137184,-0.852994,0.854718,-0.129908,-0.852992,0.931425,-0.233058,-0.880535,0.931425,-0.233058,-0.852992,0.864488,-0.23905,-0.852992,0.864488,-0.23905,-0.880535,0.931425,-0.233058,-0.880535,0.864488,-0.239051,-0.852994,0.921003,-0.116639,-0.852994,0.854066,-0.122632,-0.852994,0.920352,-0.109364,-0.852994,0.920352,-0.109364,-0.852994,0.854066,-0.122632,-0.852994,0.853415,-0.115356,-0.852994,0.850809,-0.086251,-0.880536,0.850809,-0.086252,-0.852994,0.917746,-0.080259,-0.852994,0.917746,-0.080259,-0.880536,0.850809,-0.086252,-0.880536,0.917747,-0.080259,-0.852994,0.919701,-0.102087,-0.852994,0.852763,-0.10808,-0.852994,0.919049,-0.094811,-0.852994,0.919049,-0.094811,-0.852994,0.852763,-0.10808,-0.852994,0.852112,-0.100804,-0.852993,0.857974,-0.166289,-0.880536,0.857974,-0.166289,-0.852993,0.858626,-0.173565,-0.852993,0.858626,-0.173565,-0.880536,0.857974,-0.166289,-0.880536,0.858626,-0.173565,-0.852994,0.918398,-0.087535,-0.852994,0.85146,-0.093528,-0.852994,0.917746,-0.080259,-0.852994,0.917746,-0.080259,-0.852994,0.85146,-0.093528,-0.852994,0.850809,-0.086251,-0.880536,0.917747,-0.080259,-0.880536,0.850809,-0.086252,-0.880536,0.917095,-0.072983,-0.880536,0.917095,-0.072983,-0.880536,0.850809,-0.086252,-0.880536,0.850158,-0.078976,-0.880534,0.941196,-0.3422,-0.880534,0.874258,-0.348193,-0.880534,0.940544,-0.334924,-0.880534,0.940544,-0.334924,-0.880534,0.874258,-0.348193,-0.880534,0.873607,-0.340916,-0.880534,0.939893,-0.327648,-0.880534,0.872956,-0.33364,-0.880534,0.939242,-0.320372,-0.880534,0.939242,-0.320372,-0.880534,0.872956,-0.33364,-0.880534,0.872304,-0.326364,-0.880534,0.93859,-0.313095,-0.880534,0.871653,-0.319088,-0.880534,0.937939,-0.30582,-0.880534,0.937939,-0.30582,-0.880534,0.871653,-0.319088,-0.880534,0.871002,-0.311812,-0.880534,0.937287,-0.298543,-0.880534,0.87035,-0.304536,-0.880534,0.936636,-0.291267,-0.880534,0.936636,-0.291267,-0.880534,0.87035,-0.304536,-0.880534,0.869699,-0.297259,-0.880534,0.935985,-0.283991,-0.880534,0.869048,-0.289984,-0.880534,0.935333,-0.276715,-0.880534,0.935333,-0.276715,-0.880534,0.869048,-0.289984,-0.880534,0.868396,-0.282707,-0.880534,0.934682,-0.269439,-0.880535,0.867745,-0.275431,-0.880535,0.93403,-0.262163,-0.880535,0.93403,-0.262163,-0.880535,0.867745,-0.275431,-0.880535,0.867094,-0.268155,-0.880535,0.933379,-0.254886,-0.880535,0.866442,-0.260879,-0.880535,0.932728,-0.24761,-0.880535,0.932728,-0.24761,-0.880535,0.866442,-0.260879,-0.880535,0.865791,-0.253603,-0.880535,0.932076,-0.240334,-0.880535,0.865139,-0.246326,-0.880535,0.931425,-0.233058,-0.880535,0.931425,-0.233058,-0.880535,0.865139,-0.246326,-0.880535,0.864488,-0.239051,-0.880535,0.930774,-0.225782,-0.880535,0.863837,-0.231774,-0.880535,0.930122,-0.218506,-0.880535,0.930122,-0.218506,-0.880535,0.863837,-0.231774,-0.880535,0.863185,-0.224498,-0.880535,0.929471,-0.21123,-0.880535,0.862534,-0.217222,-0.880535,0.92882,-0.203953,-0.880535,0.92882,-0.203953,-0.880535,0.862534,-0.217222,-0.880535,0.861882,-0.209946,-0.880535,0.928168,-0.196678,-0.880535,0.861231,-0.20267,-0.880535,0.927517,-0.189401,-0.880535,0.927517,-0.189401,-0.880535,0.861231,-0.20267,-0.880535,0.86058,-0.195394,-0.880536,0.926866,-0.182125,-0.880536,0.859929,-0.188117,-0.880536,0.926214,-0.174849,-0.880536,0.926214,-0.174849,-0.880536,0.859929,-0.188117,-0.880536,0.859277,-0.180841,-0.880536,0.925563,-0.167573,-0.880536,0.858626,-0.173565,-0.880536,0.924912,-0.160297,-0.880536,0.924912,-0.160297,-0.880536,0.858626,-0.173565,-0.880536,0.857974,-0.166289,-0.880536,0.92426,-0.153021,-0.880536,0.857323,-0.159013,-0.880536,0.923609,-0.145744,-0.880536,0.923609,-0.145744,-0.880536,0.857323,-0.159013,-0.880536,0.856672,-0.151737,-0.880536,0.922957,-0.138468,-0.880536,0.85602,-0.144461,-0.880536,0.922306,-0.131192,-0.880536,0.922306,-0.131192,-0.880536,0.85602,-0.144461,-0.880536,0.855369,-0.137184,-0.880536,0.921655,-0.123916,-0.880536,0.854718,-0.129909,-0.880536,0.921003,-0.11664,-0.880536,0.921003,-0.11664,-0.880536,0.854718,-0.129909,-0.880536,0.854066,-0.122632,-0.880536,0.920352,-0.109364,-0.880536,0.853415,-0.115356,-0.880536,0.919701,-0.102088,-0.880536,0.919701,-0.102088,-0.880536,0.853415,-0.115356,-0.880536,0.852763,-0.10808,-0.880536,0.919049,-0.094811,-0.880536,0.852112,-0.100804,-0.880536,0.918398,-0.087536,-0.880536,0.918398,-0.087536,-0.880536,0.852112,-0.100804,-0.880536,0.85146,-0.093528,-0.852993,0.924912,-0.160297,-0.880536,0.924912,-0.160297,-0.852993,0.857974,-0.166289,-0.852993,0.857974,-0.166289,-0.880536,0.924912,-0.160297,-0.880536,0.857974,-0.166289,-0.852992,0.87035,-0.304535,-0.880534,0.87035,-0.304536,-0.852992,0.937287,-0.298543,-0.852992,0.937287,-0.298543,-0.880534,0.87035,-0.304536,-0.880534,0.937287,-0.298543,-0.852992,0.871653,-0.319088,-0.880534,0.871653,-0.319088,-0.852992,0.93859,-0.313095,-0.852992,0.93859,-0.313095,-0.880534,0.871653,-0.319088,-0.880534,0.93859,-0.313095,-0.852992,0.935985,-0.283991,-0.880534,0.935985,-0.283991,-0.852992,0.935333,-0.276715,-0.852992,0.935333,-0.276715,-0.880534,0.935985,-0.283991,-0.880534,0.935333,-0.276715,-0.852994,0.921003,-0.116639,-0.880536,0.921003,-0.11664,-0.852994,0.854066,-0.122632,-0.852994,0.854066,-0.122632,-0.880536,0.921003,-0.11664,-0.880536,0.854066,-0.122632,-0.852992,0.937287,-0.298543,-0.880534,0.937287,-0.298543,-0.852992,0.936636,-0.291267,-0.852992,0.936636,-0.291267,-0.880534,0.937287,-0.298543,-0.880534,0.936636,-0.291267,-0.852993,0.922306,-0.131192,-0.880536,0.922306,-0.131192,-0.852993,0.855369,-0.137184,-0.852993,0.855369,-0.137184,-0.880536,0.922306,-0.131192,-0.880536,0.855369,-0.137184,-0.852992,0.867745,-0.275431,-0.880535,0.867745,-0.275431,-0.852992,0.934682,-0.269439,-0.852992,0.934682,-0.269439,-0.880535,0.867745,-0.275431,-0.880534,0.934682,-0.269439,-0.852992,0.869048,-0.289983,-0.880534,0.869048,-0.289984,-0.852992,0.935985,-0.283991,-0.852992,0.935985,-0.283991,-0.880534,0.869048,-0.289984,-0.880534,0.935985,-0.283991,-0.852992,0.933379,-0.254886,-0.880535,0.933379,-0.254886,-0.852992,0.932728,-0.24761,-0.852992,0.932728,-0.24761,-0.880535,0.933379,-0.254886,-0.880535,0.932728,-0.24761,-0.852994,0.918398,-0.087535,-0.880536,0.918398,-0.087536,-0.852994,0.85146,-0.093528,-0.852994,0.85146,-0.093528,-0.880536,0.918398,-0.087536,-0.880536,0.85146,-0.093528,-0.852992,0.934682,-0.269439,-0.880534,0.934682,-0.269439,-0.852992,0.93403,-0.262162,-0.852992,0.93403,-0.262162,-0.880534,0.934682,-0.269439,-0.880535,0.93403,-0.262163,-0.852994,0.919701,-0.102087,-0.880536,0.919701,-0.102088,-0.852994,0.852763,-0.10808,-0.852994,0.852763,-0.10808,-0.880536,0.919701,-0.102088,-0.880536,0.852763,-0.10808,-0.852992,0.872304,-0.326364,-0.880534,0.872304,-0.326364,-0.852992,0.872956,-0.33364,-0.852992,0.872956,-0.33364,-0.880534,0.872304,-0.326364,-0.880534,0.872956,-0.33364,-0.852992,0.865139,-0.246326,-0.880535,0.865139,-0.246326,-0.852992,0.932076,-0.240334,-0.852992,0.932076,-0.240334,-0.880535,0.865139,-0.246326,-0.880535,0.932076,-0.240334,-0.852992,0.873607,-0.340916,-0.880534,0.873607,-0.340916,-0.852992,0.874258,-0.348192,-0.852992,0.874258,-0.348192,-0.880534,0.873607,-0.340916,-0.880534,0.874258,-0.348193,-0.852992,0.866442,-0.260879,-0.880535,0.866442,-0.260879,-0.852992,0.933379,-0.254886,-0.852992,0.933379,-0.254886,-0.880535,0.866442,-0.260879,-0.880535,0.933379,-0.254886,-0.852992,0.930774,-0.225782,-0.880535,0.930774,-0.225782,-0.852992,0.930122,-0.218506,-0.852992,0.930122,-0.218506,-0.880535,0.930774,-0.225782,-0.880535,0.930122,-0.218506,-0.852992,0.932076,-0.240334,-0.880535,0.932076,-0.240334,-0.852992,0.931425,-0.233058,-0.852992,0.931425,-0.233058,-0.880535,0.932076,-0.240334,-0.880535,0.931425,-0.233058,-0.852994,0.917746,-0.080259,-0.880536,0.917747,-0.080259,-0.852994,0.917095,-0.072983,-0.852994,0.917095,-0.072983,-0.880536,0.917747,-0.080259,-0.880536,0.917095,-0.072983,-0.852992,0.869699,-0.297259,-0.880534,0.869699,-0.297259,-0.852992,0.87035,-0.304535,-0.852992,0.87035,-0.304535,-0.880534,0.869699,-0.297259,-0.880534,0.87035,-0.304536,-0.852993,0.862534,-0.217222,-0.880535,0.862534,-0.217222,-0.852993,0.929471,-0.21123,-0.852993,0.929471,-0.21123,-0.880535,0.862534,-0.217222,-0.880535,0.929471,-0.21123,-0.852992,0.871002,-0.311812,-0.880534,0.871002,-0.311812,-0.852992,0.871653,-0.319088,-0.852992,0.871653,-0.319088,-0.880534,0.871002,-0.311812,-0.880534,0.871653,-0.319088,-0.852992,0.863837,-0.231774,-0.880535,0.863837,-0.231774,-0.852992,0.930774,-0.225782,-0.852992,0.930774,-0.225782,-0.880535,0.863837,-0.231774,-0.880535,0.930774,-0.225782,-0.852993,0.928168,-0.196677,-0.880535,0.928168,-0.196678,-0.852993,0.927517,-0.189401,-0.852993,0.927517,-0.189401,-0.880535,0.928168,-0.196678,-0.880535,0.927517,-0.189401,-0.852993,0.929471,-0.21123,-0.880535,0.929471,-0.21123,-0.852993,0.92882,-0.203953,-0.852993,0.92882,-0.203953,-0.880535,0.929471,-0.21123,-0.880535,0.92882,-0.203953,-0.852992,0.867094,-0.268155,-0.880535,0.867094,-0.268155,-0.852992,0.867745,-0.275431,-0.852992,0.867745,-0.275431,-0.880535,0.867094,-0.268155,-0.880535,0.867745,-0.275431,-0.852993,0.859929,-0.188117,-0.880536,0.859929,-0.188117,-0.852993,0.926866,-0.182125,-0.852993,0.926866,-0.182125,-0.880536,0.859929,-0.188117,-0.880536,0.926866,-0.182125,-0.852994,0.917095,-0.072983,-0.880536,0.917095,-0.072983,-0.852994,0.850158,-0.078975,-0.852994,0.850158,-0.078975,-0.880536,0.917095,-0.072983,-0.880536,0.850158,-0.078976,-0.852992,0.868396,-0.282707,-0.880534,0.868396,-0.282707,-0.852992,0.869048,-0.289983,-0.852992,0.869048,-0.289983,-0.880534,0.868396,-0.282707,-0.880534,0.869048,-0.289984,-0.852993,0.861231,-0.20267,-0.880535,0.861231,-0.20267,-0.852993,0.928168,-0.196677,-0.852993,0.928168,-0.196677,-0.880535,0.861231,-0.20267,-0.880535,0.928168,-0.196678,-0.852993,0.925563,-0.167573,-0.880536,0.925563,-0.167573,-0.852993,0.924912,-0.160297,-0.852993,0.924912,-0.160297,-0.880536,0.925563,-0.167573,-0.880536,0.924912,-0.160297,-0.852993,0.926866,-0.182125,-0.880536,0.926866,-0.182125,-0.852993,0.926214,-0.174849,-0.852993,0.926214,-0.174849,-0.880536,0.926866,-0.182125,-0.880536,0.926214,-0.174849,-0.852992,0.864488,-0.23905,-0.880535,0.864488,-0.239051,-0.852992,0.865139,-0.246326,-0.852992,0.865139,-0.246326,-0.880535,0.864488,-0.239051,-0.880535,0.865139,-0.246326,-0.852993,0.857323,-0.159013,-0.880536,0.857323,-0.159013,-0.852993,0.92426,-0.15302,-0.852993,0.92426,-0.15302,-0.880536,0.857323,-0.159013,-0.880536,0.92426,-0.153021,-0.852992,0.865791,-0.253603,-0.880535,0.865791,-0.253603,-0.852992,0.866442,-0.260879,-0.852992,0.866442,-0.260879,-0.880535,0.865791,-0.253603,-0.880535,0.866442,-0.260879,-0.852993,0.858626,-0.173565,-0.880536,0.858626,-0.173565,-0.852993,0.925563,-0.167573,-0.852993,0.925563,-0.167573,-0.880536,0.858626,-0.173565,-0.880536,0.925563,-0.167573,-0.852993,0.922957,-0.138468,-0.880536,0.922957,-0.138468,-0.852993,0.922306,-0.131192,-0.852993,0.922306,-0.131192,-0.880536,0.922957,-0.138468,-0.880536,0.922306,-0.131192,-0.852992,0.939241,-0.320371,-0.880534,0.939242,-0.320372,-0.852992,0.872304,-0.326364,-0.852992,0.872304,-0.326364,-0.880534,0.939242,-0.320372,-0.880534,0.872304,-0.326364,-0.852993,0.92426,-0.15302,-0.880536,0.92426,-0.153021,-0.852993,0.923609,-0.145744,-0.852993,0.923609,-0.145744,-0.880536,0.92426,-0.153021,-0.880536,0.923609,-0.145744,-0.852992,0.940544,-0.334924,-0.880534,0.940544,-0.334924,-0.852992,0.873607,-0.340916,-0.852992,0.873607,-0.340916,-0.880534,0.940544,-0.334924,-0.880534,0.873607,-0.340916,-0.852993,0.861882,-0.209945,-0.880535,0.861882,-0.209946,-0.852993,0.862534,-0.217222,-0.852993,0.862534,-0.217222,-0.880535,0.861882,-0.209946,-0.880535,0.862534,-0.217222,-0.852994,0.854718,-0.129908,-0.880536,0.854718,-0.129909,-0.852994,0.921655,-0.123916,-0.852994,0.921655,-0.123916,-0.880536,0.854718,-0.129909,-0.880536,0.921655,-0.123916,-0.852992,0.863185,-0.224498,-0.880535,0.863185,-0.224498,-0.852992,0.863837,-0.231774,-0.852992,0.863837,-0.231774,-0.880535,0.863185,-0.224498,-0.880535,0.863837,-0.231774,-0.852993,0.85602,-0.144461,-0.880536,0.85602,-0.144461,-0.852993,0.922957,-0.138468,-0.852993,0.922957,-0.138468,-0.880536,0.85602,-0.144461,-0.880536,0.922957,-0.138468,-0.852994,0.920352,-0.109364,-0.880536,0.920352,-0.109364,-0.852994,0.919701,-0.102087,-0.852994,0.919701,-0.102087,-0.880536,0.920352,-0.109364,-0.880536,0.919701,-0.102088,-0.852992,0.936636,-0.291267,-0.880534,0.936636,-0.291267,-0.852992,0.869699,-0.297259,-0.852992,0.869699,-0.297259,-0.880534,0.936636,-0.291267,-0.880534,0.869699,-0.297259,-0.852994,0.921655,-0.123916,-0.880536,0.921655,-0.123916,-0.852994,0.921003,-0.116639,-0.852994,0.921003,-0.116639,-0.880536,0.921655,-0.123916,-0.880536,0.921003,-0.11664,-0.852992,0.937939,-0.305819,-0.880534,0.937939,-0.30582,-0.852992,0.871002,-0.311812,-0.852992,0.871002,-0.311812,-0.880534,0.937939,-0.30582,-0.880534,0.871002,-0.311812,-0.852993,0.859277,-0.180841,-0.880536,0.859277,-0.180841,-0.852993,0.859929,-0.188117,-0.852993,0.859929,-0.188117,-0.880536,0.859277,-0.180841,-0.880536,0.859929,-0.188117,-0.852994,0.852112,-0.100804,-0.880536,0.852112,-0.100804,-0.852994,0.919049,-0.094811,-0.852994,0.919049,-0.094811,-0.880536,0.852112,-0.100804,-0.880536,0.919049,-0.094811,-0.852993,0.86058,-0.195393,-0.880535,0.86058,-0.195394,-0.852993,0.861231,-0.20267,-0.852993,0.861231,-0.20267,-0.880535,0.86058,-0.195394,-0.880535,0.861231,-0.20267,-0.852994,0.853415,-0.115356,-0.880536,0.853415,-0.115356,-0.852994,0.920352,-0.109364,-0.852994,0.920352,-0.109364,-0.880536,0.853415,-0.115356,-0.880536,0.920352,-0.109364,-0.852992,0.93403,-0.262162,-0.880535,0.93403,-0.262163,-0.852992,0.867094,-0.268155,-0.852992,0.867094,-0.268155,-0.880535,0.93403,-0.262163,-0.880535,0.867094,-0.268155,-0.852994,0.919049,-0.094811,-0.880536,0.919049,-0.094811,-0.852994,0.918398,-0.087535,-0.852994,0.918398,-0.087535,-0.880536,0.919049,-0.094811,-0.880536,0.918398,-0.087536,-0.852992,0.935333,-0.276715,-0.880534,0.935333,-0.276715,-0.852992,0.868396,-0.282707,-0.852992,0.868396,-0.282707,-0.880534,0.935333,-0.276715,-0.880534,0.868396,-0.282707,-0.852993,0.856672,-0.151737,-0.880536,0.856672,-0.151737,-0.852993,0.857323,-0.159013,-0.852993,0.857323,-0.159013,-0.880536,0.856672,-0.151737,-0.880536,0.857323,-0.159013,-0.83787,0.939956,-0.335184,-0.83787,0.940809,-0.344715,-0.83787,0.874233,-0.341067,-0.83787,0.874233,-0.341067,-0.83787,0.940809,-0.344715,-0.83787,0.875086,-0.350598,-0.837871,0.923745,-0.154099,-0.837871,0.924598,-0.16363,-0.808754,0.923745,-0.154099,-0.808754,0.923745,-0.154099,-0.837871,0.924598,-0.16363,-0.808754,0.924598,-0.163629,-0.837872,0.917772,-0.087384,-0.837872,0.918625,-0.096914,-0.837872,0.852049,-0.093267,-0.837872,0.852049,-0.093267,-0.837872,0.918625,-0.096914,-0.837872,0.852903,-0.102798,-0.83787,0.864848,-0.236229,-0.83787,0.93057,-0.230345,-0.808753,0.864848,-0.236229,-0.808753,0.864848,-0.236229,-0.83787,0.93057,-0.230345,-0.808753,0.93057,-0.230345,-0.837872,0.919479,-0.106445,-0.837872,0.920332,-0.115976,-0.837872,0.853756,-0.112329,-0.837872,0.853756,-0.112329,-0.837872,0.920332,-0.115976,-0.837872,0.854609,-0.12186,-0.837872,0.922038,-0.135037,-0.837871,0.922891,-0.144568,-0.808754,0.922038,-0.135037,-0.808754,0.922038,-0.135037,-0.837871,0.922891,-0.144568,-0.808754,0.922891,-0.144568,-0.837872,0.921185,-0.125506,-0.837872,0.922038,-0.135037,-0.837872,0.855462,-0.13139,-0.837872,0.855462,-0.13139,-0.837872,0.922038,-0.135037,-0.837871,0.856315,-0.140921,-0.837871,0.862288,-0.207636,-0.837871,0.861435,-0.198106,-0.808753,0.862288,-0.207636,-0.808753,0.862288,-0.207636,-0.837871,0.861435,-0.198106,-0.808753,0.861435,-0.198105,-0.837871,0.922891,-0.144568,-0.837871,0.923745,-0.154099,-0.837871,0.857169,-0.150452,-0.837871,0.857169,-0.150452,-0.837871,0.923745,-0.154099,-0.837871,0.858022,-0.159983,-0.837871,0.860582,-0.188575,-0.837871,0.859728,-0.179044,-0.808753,0.860582,-0.188575,-0.808753,0.860582,-0.188575,-0.837871,0.859728,-0.179044,-0.808754,0.859728,-0.179044,-0.837871,0.924598,-0.16363,-0.837871,0.925451,-0.173161,-0.837871,0.858875,-0.169514,-0.837871,0.858875,-0.169514,-0.837871,0.925451,-0.173161,-0.837871,0.859728,-0.179044,-0.837872,0.851196,-0.083737,-0.837872,0.916919,-0.077853,-0.808754,0.851196,-0.083736,-0.808754,0.851196,-0.083736,-0.837872,0.916919,-0.077853,-0.808754,0.916919,-0.077853,-0.837871,0.926304,-0.182691,-0.837871,0.927158,-0.192222,-0.837871,0.860582,-0.188575,-0.837871,0.860582,-0.188575,-0.837871,0.927158,-0.192222,-0.837871,0.861435,-0.198106,-0.837871,0.859728,-0.179044,-0.837871,0.925451,-0.173161,-0.808754,0.859728,-0.179044,-0.808754,0.859728,-0.179044,-0.837871,0.925451,-0.173161,-0.808754,0.925451,-0.17316,-0.837871,0.928011,-0.201753,-0.837871,0.928864,-0.211284,-0.837871,0.862288,-0.207636,-0.837871,0.862288,-0.207636,-0.837871,0.928864,-0.211284,-0.837871,0.863141,-0.217167,-0.837871,0.927158,-0.192222,-0.837871,0.928011,-0.201753,-0.808753,0.927158,-0.192222,-0.808753,0.927158,-0.192222,-0.837871,0.928011,-0.201753,-0.808753,0.928011,-0.201753,-0.837871,0.929717,-0.220814,-0.83787,0.93057,-0.230345,-0.83787,0.863994,-0.226698,-0.83787,0.863994,-0.226698,-0.83787,0.93057,-0.230345,-0.83787,0.864848,-0.236229,-0.837871,0.861435,-0.198106,-0.837871,0.927158,-0.192222,-0.808753,0.861435,-0.198105,-0.808753,0.861435,-0.198105,-0.837871,0.927158,-0.192222,-0.808753,0.927158,-0.192222,-0.83787,0.931423,-0.239876,-0.83787,0.932277,-0.249407,-0.83787,0.865701,-0.24576,-0.83787,0.865701,-0.24576,-0.83787,0.932277,-0.249407,-0.83787,0.866554,-0.25529,-0.837871,0.925451,-0.173161,-0.837871,0.926304,-0.182691,-0.808754,0.925451,-0.17316,-0.808754,0.925451,-0.17316,-0.837871,0.926304,-0.182691,-0.808753,0.926304,-0.182691,-0.83787,0.93313,-0.258937,-0.83787,0.933983,-0.268468,-0.83787,0.867408,-0.264821,-0.83787,0.867408,-0.264821,-0.83787,0.933983,-0.268468,-0.83787,0.868261,-0.274352,-0.83787,0.865701,-0.24576,-0.83787,0.864848,-0.236229,-0.808753,0.865701,-0.245759,-0.808753,0.865701,-0.245759,-0.83787,0.864848,-0.236229,-0.808753,0.864848,-0.236229,-0.83787,0.934837,-0.277999,-0.83787,0.93569,-0.28753,-0.83787,0.869114,-0.283883,-0.83787,0.869114,-0.283883,-0.83787,0.93569,-0.28753,-0.83787,0.869967,-0.293414,-0.83787,0.863994,-0.226698,-0.837871,0.863141,-0.217167,-0.808753,0.863994,-0.226698,-0.808753,0.863994,-0.226698,-0.837871,0.863141,-0.217167,-0.808753,0.863141,-0.217167,-0.83787,0.936543,-0.297061,-0.83787,0.937396,-0.306592,-0.83787,0.87082,-0.302945,-0.83787,0.87082,-0.302945,-0.83787,0.937396,-0.306592,-0.83787,0.871673,-0.312475,-0.837871,0.856315,-0.140921,-0.837872,0.922038,-0.135037,-0.808754,0.856315,-0.140921,-0.808754,0.856315,-0.140921,-0.837872,0.922038,-0.135037,-0.808754,0.922038,-0.135037,-0.83787,0.938249,-0.316122,-0.83787,0.939102,-0.325653,-0.83787,0.872527,-0.322006,-0.83787,0.872527,-0.322006,-0.83787,0.939102,-0.325653,-0.83787,0.87338,-0.331537,-0.83787,0.93057,-0.230345,-0.83787,0.931423,-0.239876,-0.808753,0.93057,-0.230345,-0.808753,0.93057,-0.230345,-0.83787,0.931423,-0.239876,-0.808753,0.931423,-0.239876,-0.808754,0.916919,-0.077853,-0.808754,0.917772,-0.087383,-0.808754,0.851196,-0.083736,-0.808754,0.851196,-0.083736,-0.808754,0.917772,-0.087383,-0.808754,0.852049,-0.093267,-0.808754,0.918625,-0.096914,-0.808754,0.919479,-0.106445,-0.808754,0.852903,-0.102798,-0.808754,0.852903,-0.102798,-0.808754,0.919479,-0.106445,-0.808754,0.853756,-0.112328,-0.808754,0.920332,-0.115975,-0.808754,0.921185,-0.125506,-0.808754,0.854609,-0.121859,-0.808754,0.854609,-0.121859,-0.808754,0.921185,-0.125506,-0.808754,0.855462,-0.13139,-0.808754,0.922038,-0.135037,-0.808754,0.922891,-0.144568,-0.808754,0.856315,-0.140921,-0.808754,0.856315,-0.140921,-0.808754,0.922891,-0.144568,-0.808754,0.857169,-0.150452,-0.808754,0.923745,-0.154099,-0.808754,0.924598,-0.163629,-0.808754,0.858022,-0.159983,-0.808754,0.858022,-0.159983,-0.808754,0.924598,-0.163629,-0.808754,0.858875,-0.169513,-0.808754,0.925451,-0.17316,-0.808753,0.926304,-0.182691,-0.808754,0.859728,-0.179044,-0.808754,0.859728,-0.179044,-0.808753,0.926304,-0.182691,-0.808753,0.860582,-0.188575,-0.808753,0.927158,-0.192222,-0.808753,0.928011,-0.201753,-0.808753,0.861435,-0.198105,-0.808753,0.861435,-0.198105,-0.808753,0.928011,-0.201753,-0.808753,0.862288,-0.207636,-0.808753,0.928864,-0.211284,-0.808753,0.929717,-0.220814,-0.808753,0.863141,-0.217167,-0.808753,0.863141,-0.217167,-0.808753,0.929717,-0.220814,-0.808753,0.863994,-0.226698,-0.808753,0.93057,-0.230345,-0.808753,0.931423,-0.239876,-0.808753,0.864848,-0.236229,-0.808753,0.864848,-0.236229,-0.808753,0.931423,-0.239876,-0.808753,0.865701,-0.245759,-0.808753,0.932277,-0.249406,-0.808752,0.93313,-0.258937,-0.808753,0.866554,-0.25529,-0.808753,0.866554,-0.25529,-0.808752,0.93313,-0.258937,-0.808753,0.867407,-0.264821,-0.808752,0.933983,-0.268468,-0.808752,0.934837,-0.277999,-0.808752,0.868261,-0.274352,-0.808752,0.868261,-0.274352,-0.808752,0.934837,-0.277999,-0.808752,0.869114,-0.283883,-0.808752,0.93569,-0.28753,-0.808752,0.936543,-0.297061,-0.808752,0.869967,-0.293413,-0.808752,0.869967,-0.293413,-0.808752,0.936543,-0.297061,-0.808752,0.87082,-0.302944,-0.808752,0.937396,-0.306591,-0.808752,0.938249,-0.316122,-0.808752,0.871673,-0.312475,-0.808752,0.871673,-0.312475,-0.808752,0.938249,-0.316122,-0.808752,0.872527,-0.322006,-0.808752,0.939102,-0.325653,-0.808752,0.939956,-0.335184,-0.808752,0.87338,-0.331536,-0.808752,0.87338,-0.331536,-0.808752,0.939956,-0.335184,-0.808752,0.874233,-0.341067,-0.837871,0.863141,-0.217167,-0.837871,0.928864,-0.211284,-0.808753,0.863141,-0.217167,-0.808753,0.863141,-0.217167,-0.837871,0.928864,-0.211284,-0.808753,0.928864,-0.211284,-0.837871,0.857169,-0.150452,-0.837871,0.856315,-0.140921,-0.808754,0.857169,-0.150452,-0.808754,0.857169,-0.150452,-0.837871,0.856315,-0.140921,-0.808754,0.856315,-0.140921,-0.837872,0.852049,-0.093267,-0.837872,0.851196,-0.083737,-0.808754,0.852049,-0.093267,-0.808754,0.852049,-0.093267,-0.837872,0.851196,-0.083737,-0.808754,0.851196,-0.083736,-0.837871,0.858875,-0.169514,-0.837871,0.858022,-0.159983,-0.808754,0.858875,-0.169513,-0.808754,0.858875,-0.169513,-0.837871,0.858022,-0.159983,-0.808754,0.858022,-0.159983,-0.837872,0.918625,-0.096914,-0.837872,0.919479,-0.106445,-0.808754,0.918625,-0.096914,-0.808754,0.918625,-0.096914,-0.837872,0.919479,-0.106445,-0.808754,0.919479,-0.106445,-0.83787,0.868261,-0.274352,-0.83787,0.933983,-0.268468,-0.808752,0.868261,-0.274352,-0.808752,0.868261,-0.274352,-0.83787,0.933983,-0.268468,-0.808752,0.933983,-0.268468,-0.837872,0.920332,-0.115976,-0.837872,0.921185,-0.125506,-0.808754,0.920332,-0.115975,-0.808754,0.920332,-0.115975,-0.837872,0.921185,-0.125506,-0.808754,0.921185,-0.125506,-0.83787,0.866554,-0.25529,-0.83787,0.932277,-0.249407,-0.808753,0.866554,-0.25529,-0.808753,0.866554,-0.25529,-0.83787,0.932277,-0.249407,-0.808753,0.932277,-0.249406,-0.837872,0.853756,-0.112329,-0.837872,0.852903,-0.102798,-0.808754,0.853756,-0.112328,-0.808754,0.853756,-0.112328,-0.837872,0.852903,-0.102798,-0.808754,0.852903,-0.102798,-0.837872,0.855462,-0.13139,-0.837872,0.854609,-0.12186,-0.808754,0.855462,-0.13139,-0.808754,0.855462,-0.13139,-0.837872,0.854609,-0.12186,-0.808754,0.854609,-0.121859,-0.83787,0.871673,-0.312475,-0.83787,0.937396,-0.306592,-0.808752,0.871673,-0.312475,-0.808752,0.871673,-0.312475,-0.83787,0.937396,-0.306592,-0.808752,0.937396,-0.306591,-0.83787,0.869967,-0.293414,-0.83787,0.93569,-0.28753,-0.808752,0.869967,-0.293413,-0.808752,0.869967,-0.293413,-0.83787,0.93569,-0.28753,-0.808752,0.93569,-0.28753,-0.837872,0.919479,-0.106445,-0.837872,0.853756,-0.112329,-0.808754,0.919479,-0.106445,-0.808754,0.919479,-0.106445,-0.837872,0.853756,-0.112329,-0.808754,0.853756,-0.112328,-0.837872,0.917772,-0.087384,-0.837872,0.852049,-0.093267,-0.808754,0.917772,-0.087383,-0.808754,0.917772,-0.087383,-0.837872,0.852049,-0.093267,-0.808754,0.852049,-0.093267,-0.83787,0.87338,-0.331537,-0.83787,0.939102,-0.325653,-0.808752,0.87338,-0.331536,-0.808752,0.87338,-0.331536,-0.83787,0.939102,-0.325653,-0.808752,0.939102,-0.325653,-0.837871,0.922891,-0.144568,-0.837871,0.857169,-0.150452,-0.808754,0.922891,-0.144568,-0.808754,0.922891,-0.144568,-0.837871,0.857169,-0.150452,-0.808754,0.857169,-0.150452,-0.837872,0.921185,-0.125506,-0.837872,0.855462,-0.13139,-0.808754,0.921185,-0.125506,-0.808754,0.921185,-0.125506,-0.837872,0.855462,-0.13139,-0.808754,0.855462,-0.13139,-0.837871,0.926304,-0.182691,-0.837871,0.860582,-0.188575,-0.808753,0.926304,-0.182691,-0.808753,0.926304,-0.182691,-0.837871,0.860582,-0.188575,-0.808753,0.860582,-0.188575,-0.837871,0.924598,-0.16363,-0.837871,0.858875,-0.169514,-0.808754,0.924598,-0.163629,-0.808754,0.924598,-0.163629,-0.837871,0.858875,-0.169514,-0.808754,0.858875,-0.169513,-0.837871,0.929717,-0.220814,-0.83787,0.863994,-0.226698,-0.808753,0.929717,-0.220814,-0.808753,0.929717,-0.220814,-0.83787,0.863994,-0.226698,-0.808753,0.863994,-0.226698,-0.837871,0.928011,-0.201753,-0.837871,0.862288,-0.207636,-0.808753,0.928011,-0.201753,-0.808753,0.928011,-0.201753,-0.837871,0.862288,-0.207636,-0.808753,0.862288,-0.207636,-0.837872,0.916919,-0.077853,-0.837872,0.917772,-0.087384,-0.808754,0.916919,-0.077853,-0.808754,0.916919,-0.077853,-0.837872,0.917772,-0.087384,-0.808754,0.917772,-0.087383,-0.83787,0.93313,-0.258937,-0.83787,0.867408,-0.264821,-0.808752,0.93313,-0.258937,-0.808752,0.93313,-0.258937,-0.83787,0.867408,-0.264821,-0.808753,0.867407,-0.264821,-0.83787,0.931423,-0.239876,-0.83787,0.865701,-0.24576,-0.808753,0.931423,-0.239876,-0.808753,0.931423,-0.239876,-0.83787,0.865701,-0.24576,-0.808753,0.865701,-0.245759,-0.83787,0.939102,-0.325653,-0.83787,0.939956,-0.335184,-0.808752,0.939102,-0.325653,-0.808752,0.939102,-0.325653,-0.83787,0.939956,-0.335184,-0.808752,0.939956,-0.335184,-0.83787,0.874233,-0.341067,-0.83787,0.87338,-0.331537,-0.808752,0.874233,-0.341067,-0.808752,0.874233,-0.341067,-0.83787,0.87338,-0.331537,-0.808752,0.87338,-0.331536,-0.83787,0.936543,-0.297061,-0.83787,0.87082,-0.302945,-0.808752,0.936543,-0.297061,-0.808752,0.936543,-0.297061,-0.83787,0.87082,-0.302945,-0.808752,0.87082,-0.302944,-0.83787,0.934837,-0.277999,-0.83787,0.869114,-0.283883,-0.808752,0.934837,-0.277999,-0.808752,0.934837,-0.277999,-0.83787,0.869114,-0.283883,-0.808752,0.869114,-0.283883,-0.83787,0.93569,-0.28753,-0.83787,0.936543,-0.297061,-0.808752,0.93569,-0.28753,-0.808752,0.93569,-0.28753,-0.83787,0.936543,-0.297061,-0.808752,0.936543,-0.297061,-0.83787,0.937396,-0.306592,-0.83787,0.938249,-0.316122,-0.808752,0.937396,-0.306591,-0.808752,0.937396,-0.306591,-0.83787,0.938249,-0.316122,-0.808752,0.938249,-0.316122,-0.83787,0.87082,-0.302945,-0.83787,0.869967,-0.293414,-0.808752,0.87082,-0.302944,-0.808752,0.87082,-0.302944,-0.83787,0.869967,-0.293414,-0.808752,0.869967,-0.293413,-0.83787,0.939956,-0.335184,-0.83787,0.874233,-0.341067,-0.808752,0.939956,-0.335184,-0.808752,0.939956,-0.335184,-0.83787,0.874233,-0.341067,-0.808752,0.874233,-0.341067,-0.83787,0.872527,-0.322006,-0.83787,0.871673,-0.312475,-0.808752,0.872527,-0.322006,-0.808752,0.872527,-0.322006,-0.83787,0.871673,-0.312475,-0.808752,0.871673,-0.312475,-0.83787,0.938249,-0.316122,-0.83787,0.872527,-0.322006,-0.808752,0.938249,-0.316122,-0.808752,0.938249,-0.316122,-0.83787,0.872527,-0.322006,-0.808752,0.872527,-0.322006,-0.83787,0.932277,-0.249407,-0.83787,0.93313,-0.258937,-0.808753,0.932277,-0.249406,-0.808753,0.932277,-0.249406,-0.83787,0.93313,-0.258937,-0.808752,0.93313,-0.258937,-0.837872,0.854609,-0.12186,-0.837872,0.920332,-0.115976,-0.808754,0.854609,-0.121859,-0.808754,0.854609,-0.121859,-0.837872,0.920332,-0.115976,-0.808754,0.920332,-0.115975,-0.83787,0.933983,-0.268468,-0.83787,0.934837,-0.277999,-0.808752,0.933983,-0.268468,-0.808752,0.933983,-0.268468,-0.83787,0.934837,-0.277999,-0.808752,0.934837,-0.277999,-0.837872,0.852903,-0.102798,-0.837872,0.918625,-0.096914,-0.808754,0.852903,-0.102798,-0.808754,0.852903,-0.102798,-0.837872,0.918625,-0.096914,-0.808754,0.918625,-0.096914,-0.83787,0.867408,-0.264821,-0.83787,0.866554,-0.25529,-0.808753,0.867407,-0.264821,-0.808753,0.867407,-0.264821,-0.83787,0.866554,-0.25529,-0.808753,0.866554,-0.25529,-0.83787,0.869114,-0.283883,-0.83787,0.868261,-0.274352,-0.808752,0.869114,-0.283883,-0.808752,0.869114,-0.283883,-0.83787,0.868261,-0.274352,-0.808752,0.868261,-0.274352,-0.837871,0.928864,-0.211284,-0.837871,0.929717,-0.220814,-0.808753,0.928864,-0.211284,-0.808753,0.928864,-0.211284,-0.837871,0.929717,-0.220814,-0.808753,0.929717,-0.220814,-0.837871,0.858022,-0.159983,-0.837871,0.923745,-0.154099,-0.808754,0.858022,-0.159983,-0.808754,0.858022,-0.159983,-0.837871,0.923745,-0.154099,-0.808754,0.923745,-0.154099,0.914115,1.189077,-0.387484,0.842711,1.218496,-0.384445,0.914115,1.209941,-0.385328,0.914115,1.209941,-0.385328,0.842711,1.218496,-0.384445,0.842711,1.23936,-0.382289,0.842711,1.23936,-0.382289,0.842711,1.218496,-0.384445,0.771308,1.209941,-0.385328,0.771308,1.209941,-0.385328,0.842711,1.218496,-0.384445,0.771308,1.189077,-0.387484,0.741731,1.115657,-0.167575,0.771307,1.186683,-0.160236,0.741731,1.138916,-0.392668,0.741731,1.138916,-0.392668,0.771307,1.186683,-0.160236,0.771308,1.209941,-0.385328,0.914115,1.165819,-0.162392,0.914115,1.189077,-0.387484,0.943691,1.094793,-0.16973,0.943691,1.094793,-0.16973,0.914115,1.189077,-0.387484,0.943691,1.118051,-0.394823,0.771308,1.209941,-0.385328,0.797379,1.209276,-0.343865,0.842711,1.23936,-0.382289,0.842711,1.23936,-0.382289,0.797379,1.209276,-0.343865,0.842711,1.227953,-0.341935,0.842711,1.195238,-0.159352,0.842711,1.218496,-0.384445,0.914115,1.165819,-0.162392,0.914115,1.165819,-0.162392,0.842711,1.218496,-0.384445,0.914115,1.189077,-0.387484,0.771307,1.165819,-0.162392,0.771308,1.189077,-0.387484,0.842711,1.195238,-0.159352,0.842711,1.195238,-0.159352,0.771308,1.189077,-0.387484,0.842711,1.218496,-0.384445,0.914115,1.186683,-0.160236,0.914115,1.209941,-0.385328,0.888044,1.19451,-0.200959,0.888044,1.19451,-0.200959,0.914115,1.209941,-0.385328,0.888044,1.209276,-0.343865,0.741731,1.094793,-0.16973,0.741731,1.118051,-0.394823,0.771307,1.165819,-0.162392,0.771307,1.165819,-0.162392,0.741731,1.118051,-0.394823,0.771308,1.189077,-0.387484,0.914115,1.186683,-0.160236,0.943691,1.115657,-0.167575,0.914115,1.209941,-0.385328,0.914115,1.209941,-0.385328,0.943691,1.115657,-0.167575,0.943691,1.138916,-0.392668,0.914115,1.186683,-0.160236,0.914115,1.165819,-0.162392,0.943691,1.115657,-0.167575,0.943691,1.115657,-0.167575,0.914115,1.165819,-0.162392,0.943691,1.094793,-0.16973,0.741731,1.094793,-0.16973,0.771307,1.165819,-0.162392,0.741731,1.115657,-0.167575,0.741731,1.115657,-0.167575,0.771307,1.165819,-0.162392,0.771307,1.186683,-0.160236,0.943691,1.118051,-0.394823,0.914115,1.189077,-0.387484,0.943691,1.138916,-0.392668,0.943691,1.138916,-0.392668,0.914115,1.189077,-0.387484,0.914115,1.209941,-0.385328,0.771308,1.209941,-0.385328,0.771308,1.189077,-0.387484,0.741731,1.138916,-0.392668,0.741731,1.138916,-0.392668,0.771308,1.189077,-0.387484,0.741731,1.118051,-0.394823,0.943691,1.115657,-0.167575,0.943691,1.094793,-0.16973,0.943691,1.138916,-0.392668,0.943691,1.138916,-0.392668,0.943691,1.094793,-0.16973,0.943691,1.118051,-0.394823,0.771307,1.165819,-0.162392,0.842711,1.195238,-0.159352,0.771307,1.186683,-0.160236,0.771307,1.186683,-0.160236,0.842711,1.195238,-0.159352,0.842711,1.216102,-0.157196,0.741731,1.138916,-0.392668,0.741731,1.118051,-0.394823,0.741731,1.115657,-0.167575,0.741731,1.115657,-0.167575,0.741731,1.118051,-0.394823,0.741731,1.094793,-0.16973,0.842711,1.216102,-0.157196,0.842711,1.195238,-0.159352,0.914115,1.186683,-0.160236,0.914115,1.186683,-0.160236,0.842711,1.195238,-0.159352,0.914115,1.165819,-0.162392,0.888044,1.209276,-0.343865,0.842711,1.227953,-0.341935,0.882275,1.245227,-0.33096,0.882275,1.245227,-0.33096,0.842711,1.227953,-0.341935,0.842711,1.261528,-0.329275,0.888044,1.19451,-0.200959,0.888044,1.209276,-0.343865,0.882275,1.232341,-0.20624,0.882275,1.232341,-0.20624,0.888044,1.209276,-0.343865,0.882275,1.245227,-0.33096,0.771307,1.186683,-0.160236,0.842711,1.216102,-0.157196,0.797378,1.19451,-0.200959,0.797378,1.19451,-0.200959,0.842711,1.216102,-0.157196,0.842711,1.213187,-0.199029,0.771308,1.209941,-0.385328,0.771307,1.186683,-0.160236,0.797379,1.209276,-0.343865,0.797379,1.209276,-0.343865,0.771307,1.186683,-0.160236,0.797378,1.19451,-0.200959,0.914115,1.209941,-0.385328,0.842711,1.23936,-0.382289,0.888044,1.209276,-0.343865,0.888044,1.209276,-0.343865,0.842711,1.23936,-0.382289,0.842711,1.227953,-0.341935,0.914115,1.186683,-0.160236,0.888044,1.19451,-0.200959,0.842711,1.216102,-0.157196,0.842711,1.216102,-0.157196,0.888044,1.19451,-0.200959,0.842711,1.213187,-0.199029,0.882275,1.232341,-0.20624,0.882275,1.245227,-0.33096,0.872048,1.235411,-0.222214,0.872048,1.235411,-0.222214,0.882275,1.245227,-0.33096,0.872048,1.244967,-0.314696,0.803148,1.232341,-0.20624,0.842711,1.248641,-0.204556,0.813374,1.235411,-0.222214,0.813374,1.235411,-0.222214,0.842711,1.248641,-0.204556,0.842711,1.247498,-0.220965,0.797379,1.209276,-0.343865,0.803148,1.245227,-0.33096,0.842711,1.227953,-0.341935,0.842711,1.227953,-0.341935,0.803148,1.245227,-0.33096,0.842711,1.261528,-0.329275,0.797379,1.209276,-0.343865,0.797378,1.19451,-0.200959,0.803148,1.245227,-0.33096,0.803148,1.245227,-0.33096,0.797378,1.19451,-0.200959,0.803148,1.232341,-0.20624,0.888044,1.19451,-0.200959,0.882275,1.232341,-0.20624,0.842711,1.213187,-0.199029,0.842711,1.213187,-0.199029,0.882275,1.232341,-0.20624,0.842711,1.248641,-0.204556,0.797378,1.19451,-0.200959,0.842711,1.213187,-0.199029,0.803148,1.232341,-0.20624,0.803148,1.232341,-0.20624,0.842711,1.213187,-0.199029,0.842711,1.248641,-0.204556,0.842711,1.247498,-0.220965,0.872048,1.235411,-0.222214,0.842711,1.225838,-0.223203,0.842711,1.225838,-0.223203,0.872048,1.235411,-0.222214,0.872048,1.213751,-0.224452,0.813374,1.244967,-0.314696,0.813374,1.235411,-0.222214,0.813374,1.223307,-0.316934,0.813374,1.223307,-0.316934,0.813374,1.235411,-0.222214,0.813374,1.213751,-0.224452,0.882275,1.245227,-0.33096,0.842711,1.261528,-0.329275,0.872048,1.244967,-0.314696,0.872048,1.244967,-0.314696,0.842711,1.261528,-0.329275,0.842711,1.257054,-0.313447,0.803148,1.245227,-0.33096,0.813374,1.244967,-0.314696,0.842711,1.261528,-0.329275,0.842711,1.261528,-0.329275,0.813374,1.244967,-0.314696,0.842711,1.257054,-0.313447,0.803148,1.245227,-0.33096,0.803148,1.232341,-0.20624,0.813374,1.244967,-0.314696,0.813374,1.244967,-0.314696,0.803148,1.232341,-0.20624,0.813374,1.235411,-0.222214,0.882275,1.232341,-0.20624,0.872048,1.235411,-0.222214,0.842711,1.248641,-0.204556,0.842711,1.248641,-0.204556,0.872048,1.235411,-0.222214,0.842711,1.247498,-0.220965,0.872048,1.213751,-0.224452,0.866538,1.215406,-0.23306,0.842711,1.225838,-0.223203,0.842711,1.225838,-0.223203,0.866538,1.215406,-0.23306,0.842711,1.225222,-0.232045,0.813374,1.223307,-0.316934,0.813374,1.213751,-0.224452,0.818885,1.223167,-0.30817,0.818885,1.223167,-0.30817,0.813374,1.213751,-0.224452,0.818885,1.215406,-0.23306,0.842711,1.247498,-0.220965,0.842711,1.225838,-0.223203,0.813374,1.235411,-0.222214,0.813374,1.235411,-0.222214,0.842711,1.225838,-0.223203,0.813374,1.213751,-0.224452,0.872048,1.235411,-0.222214,0.872048,1.244967,-0.314696,0.872048,1.213751,-0.224452,0.872048,1.213751,-0.224452,0.872048,1.244967,-0.314696,0.872048,1.223307,-0.316934,0.842711,1.257054,-0.313447,0.842711,1.235394,-0.315685,0.872048,1.244967,-0.314696,0.872048,1.244967,-0.314696,0.842711,1.235394,-0.315685,0.872048,1.223307,-0.316934,0.842711,1.257054,-0.313447,0.813374,1.244967,-0.314696,0.842711,1.235394,-0.315685,0.842711,1.235394,-0.315685,0.813374,1.244967,-0.314696,0.813374,1.223307,-0.316934,0.866538,1.215406,-0.23306,0.866538,1.268604,-0.227563,0.842711,1.225222,-0.232045,0.842711,1.225222,-0.232045,0.866538,1.268604,-0.227563,0.842711,1.268604,-0.227563,0.818885,1.223167,-0.30817,0.818885,1.215406,-0.23306,0.818885,1.276365,-0.302673,0.818885,1.276365,-0.302673,0.818885,1.215406,-0.23306,0.818885,1.268604,-0.227563,0.813374,1.213751,-0.224452,0.842711,1.225838,-0.223203,0.818885,1.215406,-0.23306,0.818885,1.215406,-0.23306,0.842711,1.225838,-0.223203,0.842711,1.225222,-0.232045,0.872048,1.213751,-0.224452,0.872048,1.223307,-0.316934,0.866538,1.215406,-0.23306,0.866538,1.215406,-0.23306,0.872048,1.223307,-0.316934,0.866538,1.223167,-0.30817,0.872048,1.223307,-0.316934,0.842711,1.235394,-0.315685,0.866538,1.223167,-0.30817,0.866538,1.223167,-0.30817,0.842711,1.235394,-0.315685,0.842711,1.232983,-0.307156,0.813374,1.223307,-0.316934,0.818885,1.223167,-0.30817,0.842711,1.235394,-0.315685,0.842711,1.235394,-0.315685,0.818885,1.223167,-0.30817,0.842711,1.232983,-0.307156,0.818885,1.215406,-0.23306,0.842711,1.225222,-0.232045,0.818885,1.268604,-0.227563,0.818885,1.268604,-0.227563,0.842711,1.225222,-0.232045,0.842711,1.268604,-0.227563,0.866538,1.215406,-0.23306,0.866538,1.223167,-0.30817,0.866538,1.268604,-0.227563,0.866538,1.268604,-0.227563,0.866538,1.223167,-0.30817,0.866538,1.276365,-0.302673,0.866538,1.223167,-0.30817,0.842711,1.232983,-0.307156,0.866538,1.276365,-0.302673,0.866538,1.276365,-0.302673,0.842711,1.232983,-0.307156,0.842711,1.276365,-0.302673,0.818885,1.223167,-0.30817,0.818885,1.276365,-0.302673,0.842711,1.232983,-0.307156,0.842711,1.232983,-0.307156,0.818885,1.276365,-0.302673,0.842711,1.276365,-0.302673,0.738337,1.113335,-0.484255,0.769153,1.18743,-0.477585,0.777535,1.120514,-0.56401,0.777535,1.120514,-0.56401,0.769153,1.18743,-0.477585,0.79687,1.167004,-0.559825,0.769153,1.13573,0.096759,0.738337,1.061635,0.090089,0.784111,1.114499,0.16578,0.784111,1.114499,0.16578,0.738337,1.061635,0.090089,0.759491,1.055302,0.160451,0.738337,1.113335,-0.484255,0.738337,1.061635,0.090089,0.769153,1.18743,-0.477585,0.769153,1.18743,-0.477585,0.738337,1.061635,0.090089,0.769153,1.13573,0.096759,0.948759,1.113335,-0.484255,0.948759,1.061635,0.090089,0.917943,1.03924,-0.490924,0.917943,1.03924,-0.490924,0.948759,1.061635,0.090089,0.917943,0.98754,0.083419,0.769153,1.18743,-0.477585,0.769153,1.13573,0.096759,0.843548,1.218122,-0.474822,0.843548,1.218122,-0.474822,0.769153,1.13573,0.096759,0.843548,1.166422,0.099521,0.917943,1.03924,-0.490924,0.895543,1.028377,-0.404736,0.843548,1.008549,-0.493687,0.843548,1.008549,-0.493687,0.895543,1.028377,-0.404736,0.843548,1.006926,-0.406667,0.917943,0.98754,0.083419,0.843548,0.956849,0.080657,0.895543,0.992243,-0.003324,0.895543,0.992243,-0.003324,0.843548,0.956849,0.080657,0.843548,0.970793,-0.005255,0.843548,1.218122,-0.474822,0.843548,1.166422,0.099521,0.917943,1.18743,-0.477585,0.917943,1.18743,-0.477585,0.843548,1.166422,0.099521,0.917943,1.13573,0.096759,0.769153,1.03924,-0.490924,0.769153,0.98754,0.083419,0.738337,1.113335,-0.484255,0.738337,1.113335,-0.484255,0.769153,0.98754,0.083419,0.738337,1.061635,0.090089,0.917943,1.18743,-0.477585,0.917943,1.13573,0.096759,0.948759,1.113335,-0.484255,0.948759,1.113335,-0.484255,0.917943,1.13573,0.096759,0.948759,1.061635,0.090089,0.843548,1.13902,0.167987,0.784111,1.114499,0.16578,0.902985,1.114499,0.16578,0.784111,1.114499,0.16578,0.759491,1.055302,0.160451,0.902985,1.114499,0.16578,0.759491,1.055302,0.160451,0.784111,0.996104,0.155122,0.902985,1.114499,0.16578,0.784111,0.996104,0.155122,0.843548,0.971584,0.152915,0.902985,1.114499,0.16578,0.843548,0.971584,0.152915,0.902985,0.996104,0.155122,0.902985,1.114499,0.16578,0.902985,0.996104,0.155122,0.927605,1.055302,0.160451,0.902985,1.114499,0.16578,0.917943,0.98754,0.083419,0.948759,1.061635,0.090089,0.902985,0.996104,0.155122,0.902985,0.996104,0.155122,0.948759,1.061635,0.090089,0.927605,1.055302,0.160451,0.843548,1.166422,0.099521,0.769153,1.13573,0.096759,0.843548,1.13902,0.167987,0.843548,1.13902,0.167987,0.769153,1.13573,0.096759,0.784111,1.114499,0.16578,0.843548,0.956849,0.080657,0.917943,0.98754,0.083419,0.843548,0.971584,0.152915,0.843548,0.971584,0.152915,0.917943,0.98754,0.083419,0.902985,0.996104,0.155122,0.769153,0.98754,0.083419,0.843548,0.956849,0.080657,0.784111,0.996104,0.155122,0.784111,0.996104,0.155122,0.843548,0.956849,0.080657,0.843548,0.971584,0.152915,0.917943,1.13573,0.096759,0.843548,1.166422,0.099521,0.902985,1.114499,0.16578,0.902985,1.114499,0.16578,0.843548,1.166422,0.099521,0.843548,1.13902,0.167987,0.738337,1.061635,0.090089,0.769153,0.98754,0.083419,0.759491,1.055302,0.160451,0.759491,1.055302,0.160451,0.769153,0.98754,0.083419,0.784111,0.996104,0.155122,0.948759,1.061635,0.090089,0.917943,1.13573,0.096759,0.927605,1.055302,0.160451,0.927605,1.055302,0.160451,0.917943,1.13573,0.096759,0.902985,1.114499,0.16578,0.79687,1.167004,-0.559825,0.843548,1.186261,-0.558092,0.820897,1.143074,-0.561979,0.820897,1.143074,-0.561979,0.843548,1.186261,-0.558092,0.843548,1.152418,-0.561138,0.948759,1.113335,-0.484255,0.917943,1.03924,-0.490924,0.909561,1.120514,-0.56401,0.909561,1.120514,-0.56401,0.917943,1.03924,-0.490924,0.890226,1.074024,-0.568195,0.769153,1.18743,-0.477585,0.843548,1.218122,-0.474822,0.79687,1.167004,-0.559825,0.79687,1.167004,-0.559825,0.843548,1.218122,-0.474822,0.843548,1.186261,-0.558092,0.917943,1.03924,-0.490924,0.843548,1.008549,-0.493687,0.890226,1.074024,-0.568195,0.890226,1.074024,-0.568195,0.843548,1.008549,-0.493687,0.843548,1.054767,-0.569928,0.843548,1.008549,-0.493687,0.769153,1.03924,-0.490924,0.843548,1.054767,-0.569928,0.843548,1.054767,-0.569928,0.769153,1.03924,-0.490924,0.79687,1.074024,-0.568195,0.843548,1.218122,-0.474822,0.917943,1.18743,-0.477585,0.843548,1.186261,-0.558092,0.843548,1.186261,-0.558092,0.917943,1.18743,-0.477585,0.890226,1.167004,-0.559825,0.769153,1.03924,-0.490924,0.738337,1.113335,-0.484255,0.79687,1.074024,-0.568195,0.79687,1.074024,-0.568195,0.738337,1.113335,-0.484255,0.777535,1.120514,-0.56401,0.917943,1.18743,-0.477585,0.948759,1.113335,-0.484255,0.890226,1.167004,-0.559825,0.890226,1.167004,-0.559825,0.948759,1.113335,-0.484255,0.909561,1.120514,-0.56401,0.843548,1.090263,0.868414,0.774045,1.06159,0.865833,0.913051,1.06159,0.865833,0.774045,1.06159,0.865833,0.745256,0.992367,0.859602,0.913051,1.06159,0.865833,0.745256,0.992367,0.859602,0.774045,0.923145,0.853371,0.913051,1.06159,0.865833,0.774045,0.923145,0.853371,0.843548,0.894471,0.850789,0.913051,1.06159,0.865833,0.843548,0.894471,0.850789,0.913051,0.923145,0.853371,0.913051,1.06159,0.865833,0.913051,0.923145,0.853371,0.94184,0.992367,0.859602,0.913051,1.06159,0.865833,0.843548,1.085167,0.832706,0.907198,1.058909,0.830342,0.779898,1.058909,0.830342,0.907198,1.058909,0.830342,0.933563,0.995515,0.824635,0.779898,1.058909,0.830342,0.933563,0.995515,0.824635,0.907198,0.932121,0.818929,0.779898,1.058909,0.830342,0.907198,0.932121,0.818929,0.843548,0.905862,0.816565,0.779898,1.058909,0.830342,0.843548,0.905862,0.816565,0.779898,0.932121,0.818929,0.779898,1.058909,0.830342,0.779898,0.932121,0.818929,0.753533,0.995515,0.824635,0.779898,1.058909,0.830342,0.843548,1.090263,0.868414,0.843548,1.085167,0.832706,0.774045,1.06159,0.865833,0.774045,1.06159,0.865833,0.843548,1.085167,0.832706,0.779898,1.058909,0.830342,0.843548,0.894471,0.850789,0.843548,0.905862,0.816565,0.913051,0.923145,0.853371,0.913051,0.923145,0.853371,0.843548,0.905862,0.816565,0.907198,0.932121,0.818929,0.774045,0.923145,0.853371,0.779898,0.932121,0.818929,0.843548,0.894471,0.850789,0.843548,0.894471,0.850789,0.779898,0.932121,0.818929,0.843548,0.905862,0.816565,0.913051,1.06159,0.865833,0.907198,1.058909,0.830342,0.843548,1.090263,0.868414,0.843548,1.090263,0.868414,0.907198,1.058909,0.830342,0.843548,1.085167,0.832706,0.745256,0.992367,0.859602,0.753533,0.995515,0.824635,0.774045,0.923145,0.853371,0.774045,0.923145,0.853371,0.753533,0.995515,0.824635,0.779898,0.932121,0.818929,0.94184,0.992367,0.859602,0.933563,0.995515,0.824635,0.913051,1.06159,0.865833,0.913051,1.06159,0.865833,0.933563,0.995515,0.824635,0.907198,1.058909,0.830342,0.774045,1.06159,0.865833,0.779898,1.058909,0.830342,0.745256,0.992367,0.859602,0.745256,0.992367,0.859602,0.779898,1.058909,0.830342,0.753533,0.995515,0.824635,0.913051,0.923145,0.853371,0.907198,0.932121,0.818929,0.94184,0.992367,0.859602,0.94184,0.992367,0.859602,0.907198,0.932121,0.818929,0.933563,0.995515,0.824635,0.843548,1.135588,0.296903,0.778355,1.108693,0.294482,0.908741,1.108693,0.294482,0.778355,1.108693,0.294482,0.751351,1.043763,0.288637,0.908741,1.108693,0.294482,0.751351,1.043763,0.288637,0.778355,0.978833,0.282792,0.908741,1.108693,0.294482,0.778355,0.978833,0.282792,0.843548,0.951938,0.280371,0.908741,1.108693,0.294482,0.843548,0.951938,0.280371,0.908741,0.978833,0.282792,0.908741,1.108693,0.294482,0.908741,0.978833,0.282792,0.935745,1.043763,0.288637,0.908741,1.108693,0.294482,0.843548,1.141531,0.264374,0.910864,1.11376,0.261874,0.776232,1.11376,0.261874,0.910864,1.11376,0.261874,0.938748,1.046715,0.255839,0.776232,1.11376,0.261874,0.938748,1.046715,0.255839,0.910864,0.979671,0.249804,0.776232,1.11376,0.261874,0.910864,0.979671,0.249804,0.843548,0.9519,0.247304,0.776232,1.11376,0.261874,0.843548,0.9519,0.247304,0.776232,0.979671,0.249804,0.776232,1.11376,0.261874,0.776232,0.979671,0.249804,0.748348,1.046715,0.255839,0.776232,1.11376,0.261874,0.843548,1.135588,0.296903,0.843548,1.141531,0.264374,0.778355,1.108693,0.294482,0.778355,1.108693,0.294482,0.843548,1.141531,0.264374,0.776232,1.11376,0.261874,0.843548,0.951938,0.280371,0.843548,0.9519,0.247304,0.908741,0.978833,0.282792,0.908741,0.978833,0.282792,0.843548,0.9519,0.247304,0.910864,0.979671,0.249804,0.778355,0.978833,0.282792,0.776232,0.979671,0.249804,0.843548,0.951938,0.280371,0.843548,0.951938,0.280371,0.776232,0.979671,0.249804,0.843548,0.9519,0.247304,0.908741,1.108693,0.294482,0.910864,1.11376,0.261874,0.843548,1.135588,0.296903,0.843548,1.135588,0.296903,0.910864,1.11376,0.261874,0.843548,1.141531,0.264374,0.751351,1.043763,0.288637,0.748348,1.046715,0.255839,0.778355,0.978833,0.282792,0.778355,0.978833,0.282792,0.748348,1.046715,0.255839,0.776232,0.979671,0.249804,0.935745,1.043763,0.288637,0.938748,1.046715,0.255839,0.908741,1.108693,0.294482,0.908741,1.108693,0.294482,0.938748,1.046715,0.255839,0.910864,1.11376,0.261874,0.778355,1.108693,0.294482,0.776232,1.11376,0.261874,0.751351,1.043763,0.288637,0.751351,1.043763,0.288637,0.776232,1.11376,0.261874,0.748348,1.046715,0.255839,0.908741,0.978833,0.282792,0.910864,0.979671,0.249804,0.935745,1.043763,0.288637,0.935745,1.043763,0.288637,0.910864,0.979671,0.249804,0.938748,1.046715,0.255839,0.895543,0.919511,-0.009871,0.895543,0.955644,-0.411283,0.895543,0.923047,-0.022696,0.895543,0.923047,-0.022696,0.895543,0.955644,-0.411283,0.895543,0.956833,-0.398033,0.791553,0.992243,-0.003324,0.791553,0.919511,-0.009871,0.843548,0.970793,-0.005255,0.843548,0.970793,-0.005255,0.791553,0.919511,-0.009871,0.843548,0.89806,-0.011802,0.769153,1.03924,-0.490924,0.843548,1.008549,-0.493687,0.791553,1.028377,-0.404736,0.791553,1.028377,-0.404736,0.843548,1.008549,-0.493687,0.843548,1.006926,-0.406667,0.769153,0.98754,0.083419,0.791553,0.992243,-0.003324,0.843548,0.956849,0.080657,0.843548,0.956849,0.080657,0.791553,0.992243,-0.003324,0.843548,0.970793,-0.005255,0.769153,0.98754,0.083419,0.769153,1.03924,-0.490924,0.791553,0.992243,-0.003324,0.791553,0.992243,-0.003324,0.769153,1.03924,-0.490924,0.791553,1.028377,-0.404736,0.917943,1.03924,-0.490924,0.917943,0.98754,0.083419,0.895543,1.028377,-0.404736,0.895543,1.028377,-0.404736,0.917943,0.98754,0.083419,0.895543,0.992243,-0.003324,0.895543,0.955644,-0.411283,0.895543,0.919511,-0.009871,0.882513,0.949324,-0.361145,0.882513,0.949324,-0.361145,0.895543,0.919511,-0.009871,0.882512,0.922247,-0.060332,0.791553,0.919511,-0.009871,0.804583,0.922247,-0.060332,0.843548,0.89806,-0.011802,0.843548,0.89806,-0.011802,0.804583,0.922247,-0.060332,0.843548,0.906172,-0.061779,0.895543,1.028377,-0.404736,0.895543,0.955644,-0.411283,0.843548,1.006926,-0.406667,0.843548,1.006926,-0.406667,0.895543,0.955644,-0.411283,0.843548,0.934194,-0.413214,0.791553,1.028377,-0.404736,0.843548,1.006926,-0.406667,0.791553,0.955644,-0.411283,0.791553,0.955644,-0.411283,0.843548,1.006926,-0.406667,0.843548,0.934194,-0.413214,0.895543,0.992243,-0.003324,0.843548,0.970793,-0.005255,0.895543,0.919511,-0.009871,0.895543,0.919511,-0.009871,0.843548,0.970793,-0.005255,0.843548,0.89806,-0.011802,0.882513,0.949324,-0.361145,0.882512,0.922247,-0.060332,0.882513,0.941903,-0.349548,0.882513,0.941903,-0.349548,0.882512,0.922247,-0.060332,0.882512,0.917015,-0.073067,0.804583,0.922247,-0.060332,0.804583,0.84266,-0.067496,0.843548,0.906172,-0.061779,0.843548,0.906172,-0.061779,0.804583,0.84266,-0.067496,0.843548,0.84266,-0.067496,0.895543,0.955644,-0.411283,0.882513,0.949324,-0.361145,0.843548,0.934194,-0.413214,0.843548,0.934194,-0.413214,0.882513,0.949324,-0.361145,0.843548,0.93325,-0.362592,0.791553,0.955644,-0.411283,0.843548,0.934194,-0.413214,0.804583,0.949324,-0.361145,0.804583,0.949324,-0.361145,0.843548,0.934194,-0.413214,0.843548,0.93325,-0.362592,0.791553,0.919511,-0.009871,0.791553,0.955644,-0.411283,0.804583,0.922247,-0.060332,0.804583,0.922247,-0.060332,0.791553,0.955644,-0.411283,0.804583,0.949324,-0.361145,0.895543,0.919511,-0.009871,0.843548,0.89806,-0.011802,0.882512,0.922247,-0.060332,0.882512,0.922247,-0.060332,0.843548,0.89806,-0.011802,0.843548,0.906172,-0.061779,0.882513,0.869737,-0.368309,0.882512,0.84266,-0.067496,0.843548,0.869737,-0.368309,0.843548,0.869737,-0.368309,0.882512,0.84266,-0.067496,0.843548,0.84266,-0.067496,0.843548,0.869737,-0.368309,0.843548,0.84266,-0.067496,0.804583,0.869737,-0.368309,0.804583,0.869737,-0.368309,0.843548,0.84266,-0.067496,0.804583,0.84266,-0.067496,0.882513,0.949324,-0.361145,0.882513,0.869737,-0.368309,0.843548,0.93325,-0.362592,0.843548,0.93325,-0.362592,0.882513,0.869737,-0.368309,0.843548,0.869737,-0.368309,0.804583,0.949324,-0.361145,0.843548,0.93325,-0.362592,0.804583,0.869737,-0.368309,0.804583,0.869737,-0.368309,0.843548,0.93325,-0.362592,0.843548,0.869737,-0.368309,0.804583,0.949324,-0.361145,0.804583,0.869737,-0.368309,0.804583,0.940862,-0.344788,0.804583,0.940862,-0.344788,0.804583,0.869737,-0.368309,0.804583,0.875142,-0.350703,0.882512,0.922247,-0.060332,0.843548,0.906172,-0.061779,0.882512,0.84266,-0.067496,0.882512,0.84266,-0.067496,0.843548,0.906172,-0.061779,0.843548,0.84266,-0.067496,0.890226,1.074024,-0.568195,0.843548,1.054767,-0.569928,0.866199,1.097955,-0.566041,0.866199,1.097955,-0.566041,0.843548,1.054767,-0.569928,0.843548,1.088611,-0.566881,0.843548,1.054767,-0.569928,0.79687,1.074024,-0.568195,0.843548,1.088611,-0.566881,0.843548,1.088611,-0.566881,0.79687,1.074024,-0.568195,0.820897,1.097955,-0.566041,0.843548,1.186261,-0.558092,0.890226,1.167004,-0.559825,0.843548,1.152418,-0.561138,0.843548,1.152418,-0.561138,0.890226,1.167004,-0.559825,0.866199,1.143074,-0.561979,0.79687,1.074024,-0.568195,0.777535,1.120514,-0.56401,0.820897,1.097955,-0.566041,0.820897,1.097955,-0.566041,0.777535,1.120514,-0.56401,0.811515,1.120514,-0.56401,0.890226,1.167004,-0.559825,0.909561,1.120514,-0.56401,0.866199,1.143074,-0.561979,0.866199,1.143074,-0.561979,0.909561,1.120514,-0.56401,0.875581,1.120514,-0.56401,0.777535,1.120514,-0.56401,0.79687,1.167004,-0.559825,0.811515,1.120514,-0.56401,0.811515,1.120514,-0.56401,0.79687,1.167004,-0.559825,0.820897,1.143074,-0.561979,0.909561,1.120514,-0.56401,0.890226,1.074024,-0.568195,0.875581,1.120514,-0.56401,0.875581,1.120514,-0.56401,0.890226,1.074024,-0.568195,0.866199,1.097955,-0.566041,0.815386,1.147379,-0.748529,0.811052,1.136956,-0.749467,0.815386,1.15741,-0.859973,0.815386,1.15741,-0.859973,0.811052,1.136956,-0.749467,0.811052,1.146988,-0.860911,0.829672,1.211866,-0.739513,0.858647,1.211866,-0.739513,0.829672,1.221897,-0.850957,0.829672,1.221897,-0.850957,0.858647,1.211866,-0.739513,0.858647,1.221897,-0.850957,0.903193,1.081094,-0.659817,0.920054,1.121637,-0.656167,0.872938,1.111053,-0.655173,0.872938,1.111053,-0.655173,0.920054,1.121637,-0.656167,0.877268,1.121463,-0.654236,0.893695,1.069067,-0.752367,0.858647,1.054608,-0.753669,0.893695,1.079099,-0.863811,0.893695,1.079099,-0.863811,0.858647,1.054608,-0.753669,0.858647,1.06464,-0.865113,0.920054,1.128502,-0.655549,0.903193,1.169045,-0.6519,0.877268,1.128329,-0.653617,0.877268,1.128329,-0.653617,0.903193,1.169045,-0.6519,0.872938,1.138738,-0.65268,0.858651,1.203725,-0.649125,0.858651,1.153314,-0.651369,0.893692,1.18927,-0.650426,0.893692,1.18927,-0.650426,0.858651,1.153314,-0.651369,0.858047,1.153563,-0.651346,0.829668,1.203725,-0.649125,0.794627,1.18927,-0.650426,0.829668,1.153314,-0.651369,0.794627,1.18927,-0.650426,0.830272,1.153563,-0.651346,0.829668,1.153314,-0.651369,0.768245,1.136713,-0.746763,0.785118,1.177282,-0.743111,0.768245,1.146745,-0.858207,0.768245,1.146745,-0.858207,0.785118,1.177282,-0.743111,0.785118,1.187313,-0.854554,0.836944,1.214763,-0.660937,0.836944,1.220602,-0.725795,0.786416,1.193918,-0.662814,0.786416,1.193918,-0.662814,0.836944,1.220602,-0.725795,0.786416,1.199757,-0.727671,0.903201,1.177282,-0.743111,0.920073,1.136713,-0.746763,0.903201,1.187313,-0.854554,0.903201,1.187313,-0.854554,0.920073,1.136713,-0.746763,0.920073,1.146745,-0.858207,0.934605,1.12966,-0.668598,0.934605,1.135498,-0.733455,0.910539,1.187526,-0.663389,0.910539,1.187526,-0.663389,0.934605,1.135498,-0.733455,0.910539,1.193364,-0.728247,0.829668,1.046475,-0.66328,0.829668,1.096477,-0.656485,0.794627,1.060931,-0.661979,0.794627,1.060931,-0.661979,0.829668,1.096477,-0.656485,0.830272,1.096228,-0.656507,0.768265,1.121637,-0.656167,0.785126,1.081094,-0.659817,0.811052,1.121463,-0.654236,0.811052,1.121463,-0.654236,0.785126,1.081094,-0.659817,0.815381,1.111053,-0.655173,0.851376,1.037725,-0.676874,0.851376,1.043563,-0.741731,0.901903,1.05857,-0.674998,0.901903,1.05857,-0.674998,0.851376,1.043563,-0.741731,0.901903,1.064408,-0.739855,0.815386,1.119668,-0.751023,0.830271,1.104857,-0.752357,0.815386,1.1297,-0.862467,0.815386,1.1297,-0.862467,0.830271,1.104857,-0.752357,0.830271,1.114889,-0.863801,0.872933,1.147379,-0.748529,0.858048,1.162191,-0.747195,0.872933,1.15741,-0.859973,0.872933,1.15741,-0.859973,0.858048,1.162191,-0.747195,0.858048,1.172222,-0.858639,0.858651,1.046475,-0.66328,0.893692,1.060931,-0.661979,0.858651,1.096477,-0.656485,0.893692,1.060931,-0.661979,0.858047,1.096228,-0.656507,0.858651,1.096477,-0.656485,0.777779,1.187526,-0.663389,0.777779,1.193364,-0.728247,0.753714,1.12966,-0.668598,0.753714,1.12966,-0.668598,0.777779,1.193364,-0.728247,0.753714,1.135498,-0.733455,0.910539,1.064963,-0.674422,0.910539,1.070801,-0.739279,0.934605,1.122828,-0.669213,0.934605,1.122828,-0.669213,0.910539,1.070801,-0.739279,0.934605,1.128666,-0.73407,0.901903,1.193918,-0.662814,0.901903,1.199757,-0.727671,0.851375,1.214763,-0.660937,0.851375,1.214763,-0.660937,0.901903,1.199757,-0.727671,0.851376,1.220602,-0.725795,0.785126,1.169045,-0.6519,0.768265,1.128502,-0.655549,0.815381,1.138738,-0.65268,0.815381,1.138738,-0.65268,0.768265,1.128502,-0.655549,0.811052,1.128329,-0.653618,0.753714,1.122828,-0.669213,0.753714,1.128666,-0.73407,0.777779,1.064963,-0.674422,0.777779,1.064963,-0.674422,0.753714,1.128666,-0.73407,0.777779,1.070801,-0.739279,0.786416,1.05857,-0.674998,0.786416,1.064408,-0.739855,0.836944,1.037725,-0.676874,0.836944,1.037725,-0.676874,0.786416,1.064408,-0.739855,0.836944,1.043563,-0.741731,0.903201,1.089279,-0.751033,0.910539,1.070801,-0.739279,0.893695,1.069067,-0.752367,0.893695,1.069067,-0.752367,0.910539,1.070801,-0.739279,0.901903,1.064408,-0.739855,0.903193,1.081094,-0.659817,0.893692,1.060931,-0.661979,0.910539,1.064963,-0.674422,0.910539,1.064963,-0.674422,0.893692,1.060931,-0.661979,0.901903,1.05857,-0.674998,0.858647,1.054608,-0.753669,0.851376,1.043563,-0.741731,0.829672,1.054608,-0.753669,0.829672,1.054608,-0.753669,0.851376,1.043563,-0.741731,0.836944,1.043563,-0.741731,0.851376,1.037725,-0.676874,0.858651,1.046475,-0.66328,0.836944,1.037725,-0.676874,0.836944,1.037725,-0.676874,0.858651,1.046475,-0.66328,0.829668,1.046475,-0.66328,0.786416,1.064408,-0.739855,0.777779,1.070801,-0.739279,0.794624,1.069067,-0.752367,0.794624,1.069067,-0.752367,0.777779,1.070801,-0.739279,0.785118,1.089279,-0.751033,0.785126,1.081094,-0.659817,0.777779,1.064963,-0.674422,0.794627,1.060931,-0.661979,0.794627,1.060931,-0.661979,0.777779,1.064963,-0.674422,0.786416,1.05857,-0.674998,0.753714,1.135498,-0.733455,0.768245,1.136713,-0.746763,0.753714,1.128666,-0.73407,0.753714,1.128666,-0.73407,0.768245,1.136713,-0.746763,0.768245,1.129848,-0.747381,0.768265,1.121637,-0.656167,0.768265,1.128502,-0.655549,0.753714,1.122828,-0.669213,0.753714,1.122828,-0.669213,0.768265,1.128502,-0.655549,0.753714,1.12966,-0.668598,0.920054,1.121637,-0.656167,0.934605,1.122828,-0.669213,0.920054,1.128502,-0.655549,0.920054,1.128502,-0.655549,0.934605,1.122828,-0.669213,0.934605,1.12966,-0.668598,0.920073,1.129848,-0.747381,0.920073,1.136713,-0.746763,0.934605,1.128666,-0.73407,0.934605,1.128666,-0.73407,0.920073,1.136713,-0.746763,0.934605,1.135498,-0.733455,0.903193,1.169045,-0.6519,0.910539,1.187526,-0.663389,0.893692,1.18927,-0.650426,0.893692,1.18927,-0.650426,0.910539,1.187526,-0.663389,0.901903,1.193918,-0.662814,0.903201,1.177282,-0.743111,0.893695,1.197407,-0.740815,0.910539,1.193364,-0.728247,0.910539,1.193364,-0.728247,0.893695,1.197407,-0.740815,0.901903,1.199757,-0.727671,0.858651,1.203725,-0.649125,0.851375,1.214763,-0.660937,0.829668,1.203725,-0.649125,0.829668,1.203725,-0.649125,0.851375,1.214763,-0.660937,0.836944,1.214763,-0.660937,0.858647,1.211866,-0.739513,0.829672,1.211866,-0.739513,0.851376,1.220602,-0.725795,0.851376,1.220602,-0.725795,0.829672,1.211866,-0.739513,0.836944,1.220602,-0.725795,0.786416,1.193918,-0.662814,0.777779,1.187526,-0.663389,0.794627,1.18927,-0.650426,0.794627,1.18927,-0.650426,0.777779,1.187526,-0.663389,0.785126,1.169045,-0.6519,0.785118,1.177282,-0.743111,0.777779,1.193364,-0.728247,0.794624,1.197407,-0.740815,0.794624,1.197407,-0.740815,0.777779,1.193364,-0.728247,0.786416,1.199757,-0.727671,0.920073,1.129848,-0.747381,0.934605,1.128666,-0.73407,0.903201,1.089279,-0.751033,0.903201,1.089279,-0.751033,0.934605,1.128666,-0.73407,0.910539,1.070801,-0.739279,0.920054,1.121637,-0.656167,0.903193,1.081094,-0.659817,0.934605,1.122828,-0.669213,0.934605,1.122828,-0.669213,0.903193,1.081094,-0.659817,0.910539,1.064963,-0.674422,0.893695,1.069067,-0.752367,0.901903,1.064408,-0.739855,0.858647,1.054608,-0.753669,0.858647,1.054608,-0.753669,0.901903,1.064408,-0.739855,0.851376,1.043563,-0.741731,0.851376,1.043563,-0.741731,0.851376,1.037725,-0.676874,0.836944,1.043563,-0.741731,0.836944,1.043563,-0.741731,0.851376,1.037725,-0.676874,0.836944,1.037725,-0.676874,0.794624,1.069067,-0.752367,0.829672,1.054608,-0.753669,0.786416,1.064408,-0.739855,0.786416,1.064408,-0.739855,0.829672,1.054608,-0.753669,0.836944,1.043563,-0.741731,0.794627,1.060931,-0.661979,0.786416,1.05857,-0.674998,0.829668,1.046475,-0.66328,0.829668,1.046475,-0.66328,0.786416,1.05857,-0.674998,0.836944,1.037725,-0.676874,0.768265,1.121637,-0.656167,0.753714,1.122828,-0.669213,0.785126,1.081094,-0.659817,0.785126,1.081094,-0.659817,0.753714,1.122828,-0.669213,0.777779,1.064963,-0.674422,0.786416,1.064408,-0.739855,0.786416,1.05857,-0.674998,0.777779,1.070801,-0.739279,0.777779,1.070801,-0.739279,0.786416,1.05857,-0.674998,0.777779,1.064963,-0.674422,0.753714,1.12966,-0.668598,0.753714,1.135498,-0.733455,0.753714,1.122828,-0.669213,0.753714,1.122828,-0.669213,0.753714,1.135498,-0.733455,0.753714,1.128666,-0.73407,0.768245,1.129848,-0.747381,0.785118,1.089279,-0.751033,0.753714,1.128666,-0.73407,0.753714,1.128666,-0.73407,0.785118,1.089279,-0.751033,0.777779,1.070801,-0.739279,0.910539,1.070801,-0.739279,0.910539,1.064963,-0.674422,0.901903,1.064408,-0.739855,0.901903,1.064408,-0.739855,0.910539,1.064963,-0.674422,0.901903,1.05857,-0.674998,0.893692,1.060931,-0.661979,0.858651,1.046475,-0.66328,0.901903,1.05857,-0.674998,0.901903,1.05857,-0.674998,0.858651,1.046475,-0.66328,0.851376,1.037725,-0.676874,0.934605,1.135498,-0.733455,0.934605,1.12966,-0.668598,0.934605,1.128666,-0.73407,0.934605,1.128666,-0.73407,0.934605,1.12966,-0.668598,0.934605,1.122828,-0.669213,0.920054,1.128502,-0.655549,0.934605,1.12966,-0.668598,0.903193,1.169045,-0.6519,0.903193,1.169045,-0.6519,0.934605,1.12966,-0.668598,0.910539,1.187526,-0.663389,0.920073,1.136713,-0.746763,0.903201,1.177282,-0.743111,0.934605,1.135498,-0.733455,0.934605,1.135498,-0.733455,0.903201,1.177282,-0.743111,0.910539,1.193364,-0.728247,0.901903,1.199757,-0.727671,0.901903,1.193918,-0.662814,0.910539,1.193364,-0.728247,0.910539,1.193364,-0.728247,0.901903,1.193918,-0.662814,0.910539,1.187526,-0.663389,0.893692,1.18927,-0.650426,0.901903,1.193918,-0.662814,0.858651,1.203725,-0.649125,0.858651,1.203725,-0.649125,0.901903,1.193918,-0.662814,0.851375,1.214763,-0.660937,0.893695,1.197407,-0.740815,0.858647,1.211866,-0.739513,0.901903,1.199757,-0.727671,0.901903,1.199757,-0.727671,0.858647,1.211866,-0.739513,0.851376,1.220602,-0.725795,0.836944,1.220602,-0.725795,0.836944,1.214763,-0.660937,0.851376,1.220602,-0.725795,0.851376,1.220602,-0.725795,0.836944,1.214763,-0.660937,0.851375,1.214763,-0.660937,0.794627,1.18927,-0.650426,0.829668,1.203725,-0.649125,0.786416,1.193918,-0.662814,0.786416,1.193918,-0.662814,0.829668,1.203725,-0.649125,0.836944,1.214763,-0.660937,0.794624,1.197407,-0.740815,0.786416,1.199757,-0.727671,0.829672,1.211866,-0.739513,0.829672,1.211866,-0.739513,0.786416,1.199757,-0.727671,0.836944,1.220602,-0.725795,0.777779,1.193364,-0.728247,0.777779,1.187526,-0.663389,0.786416,1.199757,-0.727671,0.786416,1.199757,-0.727671,0.777779,1.187526,-0.663389,0.786416,1.193918,-0.662814,0.768265,1.128502,-0.655549,0.785126,1.169045,-0.6519,0.753714,1.12966,-0.668598,0.753714,1.12966,-0.668598,0.785126,1.169045,-0.6519,0.777779,1.187526,-0.663389,0.768245,1.136713,-0.746763,0.753714,1.135498,-0.733455,0.785118,1.177282,-0.743111,0.785118,1.177282,-0.743111,0.753714,1.135498,-0.733455,0.777779,1.193364,-0.728247,0.830271,1.104857,-0.752357,0.829672,1.105104,-0.752334,0.830271,1.114889,-0.863801,0.830271,1.114889,-0.863801,0.829672,1.105104,-0.752334,0.829672,1.115136,-0.863778,0.858048,1.162191,-0.747195,0.858647,1.161943,-0.747218,0.858048,1.172222,-0.858639,0.858048,1.172222,-0.858639,0.858647,1.161943,-0.747218,0.858647,1.171975,-0.858662,0.877268,1.121463,-0.654236,0.920054,1.121637,-0.656167,0.877268,1.128329,-0.653617,0.877268,1.128329,-0.653617,0.920054,1.121637,-0.656167,0.920054,1.128502,-0.655549,0.893692,1.18927,-0.650426,0.858047,1.153563,-0.651346,0.903193,1.169045,-0.6519,0.903193,1.169045,-0.6519,0.858047,1.153563,-0.651346,0.872938,1.138738,-0.65268,0.794627,1.18927,-0.650426,0.785126,1.169045,-0.6519,0.830272,1.153563,-0.651346,0.830272,1.153563,-0.651346,0.785126,1.169045,-0.6519,0.815381,1.138738,-0.65268,0.768265,1.121637,-0.656167,0.811052,1.121463,-0.654236,0.768265,1.128502,-0.655549,0.768265,1.128502,-0.655549,0.811052,1.121463,-0.654236,0.811052,1.128329,-0.653618,0.794624,1.069067,-0.752367,0.785118,1.089279,-0.751033,0.794624,1.079099,-0.863811,0.794624,1.079099,-0.863811,0.785118,1.089279,-0.751033,0.785118,1.099311,-0.862476,0.785118,1.089279,-0.751033,0.768245,1.129848,-0.747381,0.785118,1.099311,-0.862476,0.785118,1.099311,-0.862476,0.768245,1.129848,-0.747381,0.768245,1.139879,-0.858824,0.920073,1.129848,-0.747381,0.903201,1.089279,-0.751033,0.920073,1.139879,-0.858824,0.920073,1.139879,-0.858824,0.903201,1.089279,-0.751033,0.903201,1.099311,-0.862476,0.829672,1.105104,-0.752334,0.858647,1.105104,-0.752334,0.829672,1.115136,-0.863778,0.829672,1.115136,-0.863778,0.858647,1.105104,-0.752334,0.858647,1.115136,-0.863778,0.858647,1.161943,-0.747218,0.829672,1.161943,-0.747218,0.858647,1.171975,-0.858662,0.858647,1.171975,-0.858662,0.829672,1.161943,-0.747218,0.829672,1.171975,-0.858662,0.829668,1.203725,-0.649125,0.829668,1.153314,-0.651369,0.858651,1.203725,-0.649125,0.858651,1.203725,-0.649125,0.829668,1.153314,-0.651369,0.858651,1.153314,-0.651369,0.893692,1.060931,-0.661979,0.903193,1.081094,-0.659817,0.858047,1.096228,-0.656507,0.858047,1.096228,-0.656507,0.903193,1.081094,-0.659817,0.872938,1.111053,-0.655173,0.794627,1.060931,-0.661979,0.830272,1.096228,-0.656507,0.785126,1.081094,-0.659817,0.785126,1.081094,-0.659817,0.830272,1.096228,-0.656507,0.815381,1.111053,-0.655173,0.858048,1.104857,-0.752357,0.872933,1.119668,-0.751023,0.858048,1.114889,-0.863801,0.858048,1.114889,-0.863801,0.872933,1.119668,-0.751023,0.872933,1.1297,-0.862467,0.858651,1.046475,-0.66328,0.858651,1.096477,-0.656485,0.829668,1.046475,-0.66328,0.829668,1.046475,-0.66328,0.858651,1.096477,-0.656485,0.829668,1.096477,-0.656485,0.877268,1.130091,-0.750085,0.877268,1.136956,-0.749467,0.877268,1.140123,-0.861529,0.877268,1.140123,-0.861529,0.877268,1.136956,-0.749467,0.877268,1.146988,-0.860911,0.877268,1.146988,-0.860911,0.872933,1.15741,-0.859973,0.870252,1.154955,-0.957566,0.870252,1.154955,-0.957566,0.872933,1.15741,-0.859973,0.866836,1.163169,-0.956827,0.830271,1.114889,-0.863801,0.829672,1.115136,-0.863778,0.833214,1.129658,-0.959843,0.833214,1.129658,-0.959843,0.829672,1.115136,-0.863778,0.832742,1.129852,-0.959825,0.920073,1.139879,-0.858824,0.903201,1.099311,-0.862476,0.903987,1.149353,-0.955922,0.903987,1.149353,-0.955922,0.903201,1.099311,-0.862476,0.89069,1.117381,-0.9588,0.794624,1.207438,-0.852259,0.829672,1.221897,-0.850957,0.805121,1.202596,-0.950747,0.805121,1.202596,-0.950747,0.829672,1.221897,-0.850957,0.832741,1.213991,-0.949721,0.858647,1.115136,-0.863778,0.858048,1.114889,-0.863801,0.855577,1.129852,-0.959825,0.855577,1.129852,-0.959825,0.858048,1.114889,-0.863801,0.855105,1.129658,-0.959843,0.829672,1.171975,-0.858662,0.830271,1.172222,-0.858639,0.832742,1.174647,-0.955793,0.832742,1.174647,-0.955793,0.830271,1.172222,-0.858639,0.833214,1.174842,-0.955776,0.893695,1.207438,-0.852259,0.883198,1.202596,-0.950747,0.858647,1.221897,-0.850957,0.858647,1.221897,-0.850957,0.883198,1.202596,-0.950747,0.855577,1.213991,-0.949721,0.920073,1.146745,-0.858207,0.920073,1.139879,-0.858824,0.903987,1.154763,-0.955435,0.903987,1.154763,-0.955435,0.920073,1.139879,-0.858824,0.903987,1.149353,-0.955922,0.877268,1.140123,-0.861529,0.877268,1.146988,-0.860911,0.870252,1.149545,-0.958053,0.870252,1.149545,-0.958053,0.877268,1.146988,-0.860911,0.870252,1.154955,-0.957566,0.794624,1.079099,-0.863811,0.805121,1.101452,-0.959852,0.829672,1.06464,-0.865113,0.829672,1.06464,-0.865113,0.805121,1.101452,-0.959852,0.832741,1.090057,-0.960878,0.811052,1.140123,-0.861529,0.815386,1.1297,-0.862467,0.818067,1.149545,-0.958053,0.818067,1.149545,-0.958053,0.815386,1.1297,-0.862467,0.821483,1.141331,-0.958793,0.830271,1.172222,-0.858639,0.815386,1.15741,-0.859973,0.833214,1.174842,-0.955776,0.833214,1.174842,-0.955776,0.815386,1.15741,-0.859973,0.821483,1.163169,-0.956827,0.893695,1.079099,-0.863811,0.883198,1.101452,-0.959852,0.903201,1.099311,-0.862476,0.903201,1.099311,-0.862476,0.883198,1.101452,-0.959852,0.89069,1.117381,-0.9588,0.893695,1.079099,-0.863811,0.858647,1.06464,-0.865113,0.883198,1.101452,-0.959852,0.883198,1.101452,-0.959852,0.858647,1.06464,-0.865113,0.855577,1.090057,-0.960878,0.829672,1.221897,-0.850957,0.858647,1.221897,-0.850957,0.832741,1.213991,-0.949721,0.832741,1.213991,-0.949721,0.858647,1.221897,-0.850957,0.855577,1.213991,-0.949721,0.768245,1.146745,-0.858207,0.785118,1.187313,-0.854554,0.784332,1.154763,-0.955435,0.784332,1.154763,-0.955435,0.785118,1.187313,-0.854554,0.797629,1.186735,-0.952557,0.877268,1.136956,-0.749467,0.872933,1.147379,-0.748529,0.877268,1.146988,-0.860911,0.877268,1.146988,-0.860911,0.872933,1.147379,-0.748529,0.872933,1.15741,-0.859973,0.829672,1.054608,-0.753669,0.794624,1.069067,-0.752367,0.829672,1.06464,-0.865113,0.829672,1.06464,-0.865113,0.794624,1.069067,-0.752367,0.794624,1.079099,-0.863811,0.893695,1.069067,-0.752367,0.893695,1.079099,-0.863811,0.903201,1.089279,-0.751033,0.903201,1.089279,-0.751033,0.893695,1.079099,-0.863811,0.903201,1.099311,-0.862476,0.829672,1.161943,-0.747218,0.830271,1.162191,-0.747195,0.829672,1.171975,-0.858662,0.829672,1.171975,-0.858662,0.830271,1.162191,-0.747195,0.830271,1.172222,-0.858639,0.811052,1.130091,-0.750085,0.815386,1.119668,-0.751023,0.811052,1.140123,-0.861529,0.811052,1.140123,-0.861529,0.815386,1.119668,-0.751023,0.815386,1.1297,-0.862467,0.830271,1.162191,-0.747195,0.815386,1.147379,-0.748529,0.830271,1.172222,-0.858639,0.830271,1.172222,-0.858639,0.815386,1.147379,-0.748529,0.815386,1.15741,-0.859973,0.794624,1.197407,-0.740815,0.794624,1.207438,-0.852259,0.785118,1.177282,-0.743111,0.785118,1.177282,-0.743111,0.794624,1.207438,-0.852259,0.785118,1.187313,-0.854554,0.920073,1.136713,-0.746763,0.920073,1.129848,-0.747381,0.920073,1.146745,-0.858207,0.920073,1.146745,-0.858207,0.920073,1.129848,-0.747381,0.920073,1.139879,-0.858824,0.858647,1.105104,-0.752334,0.858048,1.104857,-0.752357,0.858647,1.115136,-0.863778,0.858647,1.115136,-0.863778,0.858048,1.104857,-0.752357,0.858048,1.114889,-0.863801,0.811052,1.136956,-0.749467,0.811052,1.130091,-0.750085,0.811052,1.146988,-0.860911,0.811052,1.146988,-0.860911,0.811052,1.130091,-0.750085,0.811052,1.140123,-0.861529,0.794624,1.197407,-0.740815,0.829672,1.211866,-0.739513,0.794624,1.207438,-0.852259,0.794624,1.207438,-0.852259,0.829672,1.211866,-0.739513,0.829672,1.221897,-0.850957,0.858647,1.211866,-0.739513,0.893695,1.197407,-0.740815,0.858647,1.221897,-0.850957,0.858647,1.221897,-0.850957,0.893695,1.197407,-0.740815,0.893695,1.207438,-0.852259,0.858647,1.054608,-0.753669,0.829672,1.054608,-0.753669,0.858647,1.06464,-0.865113,0.858647,1.06464,-0.865113,0.829672,1.054608,-0.753669,0.829672,1.06464,-0.865113,0.768245,1.129848,-0.747381,0.768245,1.136713,-0.746763,0.768245,1.139879,-0.858824,0.768245,1.139879,-0.858824,0.768245,1.136713,-0.746763,0.768245,1.146745,-0.858207,0.893695,1.197407,-0.740815,0.903201,1.177282,-0.743111,0.893695,1.207438,-0.852259,0.893695,1.207438,-0.852259,0.903201,1.177282,-0.743111,0.903201,1.187313,-0.854554,0.872933,1.119668,-0.751023,0.877268,1.130091,-0.750085,0.872933,1.1297,-0.862467,0.872933,1.1297,-0.862467,0.877268,1.130091,-0.750085,0.877268,1.140123,-0.861529,0.797629,1.117381,-0.9588,0.784332,1.149353,-0.955922,0.821483,1.141331,-0.958793,0.821483,1.141331,-0.958793,0.784332,1.149353,-0.955922,0.818067,1.149545,-0.958053,0.832741,1.090057,-0.960878,0.805121,1.101452,-0.959852,0.832742,1.129852,-0.959825,0.805121,1.101452,-0.959852,0.833214,1.129658,-0.959843,0.832742,1.129852,-0.959825,0.883198,1.101452,-0.959852,0.855577,1.090057,-0.960878,0.855105,1.129658,-0.959843,0.855577,1.090057,-0.960878,0.855577,1.129852,-0.959825,0.855105,1.129658,-0.959843,0.784332,1.154763,-0.955435,0.797629,1.186735,-0.952557,0.818067,1.154955,-0.957566,0.818067,1.154955,-0.957566,0.797629,1.186735,-0.952557,0.821483,1.163169,-0.956827,0.89069,1.186735,-0.952557,0.903987,1.154763,-0.955435,0.866836,1.163169,-0.956827,0.866836,1.163169,-0.956827,0.903987,1.154763,-0.955435,0.870252,1.154955,-0.957566,0.855577,1.213991,-0.949721,0.883198,1.202596,-0.950747,0.855577,1.174647,-0.955793,0.883198,1.202596,-0.950747,0.855105,1.174842,-0.955776,0.855577,1.174647,-0.955793,0.805121,1.202596,-0.950747,0.832741,1.213991,-0.949721,0.833214,1.174842,-0.955776,0.832741,1.213991,-0.949721,0.832742,1.174647,-0.955793,0.833214,1.174842,-0.955776,0.832742,1.174647,-0.955793,0.832741,1.213991,-0.949721,0.855577,1.174647,-0.955793,0.855577,1.174647,-0.955793,0.832741,1.213991,-0.949721,0.855577,1.213991,-0.949721,0.866836,1.163169,-0.956827,0.855105,1.174842,-0.955776,0.89069,1.186735,-0.952557,0.89069,1.186735,-0.952557,0.855105,1.174842,-0.955776,0.883198,1.202596,-0.950747,0.855577,1.129852,-0.959825,0.855577,1.090057,-0.960878,0.832742,1.129852,-0.959825,0.832742,1.129852,-0.959825,0.855577,1.090057,-0.960878,0.832741,1.090057,-0.960878,0.821483,1.141331,-0.958793,0.833214,1.129658,-0.959843,0.797629,1.117381,-0.9588,0.797629,1.117381,-0.9588,0.833214,1.129658,-0.959843,0.805121,1.101452,-0.959852,0.784332,1.154763,-0.955435,0.818067,1.154955,-0.957566,0.784332,1.149353,-0.955922,0.784332,1.149353,-0.955922,0.818067,1.154955,-0.957566,0.818067,1.149545,-0.958053,0.866836,1.141331,-0.958793,0.89069,1.117381,-0.9588,0.855105,1.129658,-0.959843,0.855105,1.129658,-0.959843,0.89069,1.117381,-0.9588,0.883198,1.101452,-0.959852,0.821483,1.163169,-0.956827,0.797629,1.186735,-0.952557,0.833214,1.174842,-0.955776,0.833214,1.174842,-0.955776,0.797629,1.186735,-0.952557,0.805121,1.202596,-0.950747,0.870252,1.154955,-0.957566,0.903987,1.154763,-0.955435,0.870252,1.149545,-0.958053,0.870252,1.149545,-0.958053,0.903987,1.154763,-0.955435,0.903987,1.149353,-0.955922,0.903987,1.149353,-0.955922,0.89069,1.117381,-0.9588,0.870252,1.149545,-0.958053,0.870252,1.149545,-0.958053,0.89069,1.117381,-0.9588,0.866836,1.141331,-0.958793,0.920073,1.146745,-0.858207,0.903987,1.154763,-0.955435,0.903201,1.187313,-0.854554,0.903201,1.187313,-0.854554,0.903987,1.154763,-0.955435,0.89069,1.186735,-0.952557,0.768245,1.139879,-0.858824,0.768245,1.146745,-0.858207,0.784332,1.149353,-0.955922,0.784332,1.149353,-0.955922,0.768245,1.146745,-0.858207,0.784332,1.154763,-0.955435,0.858048,1.172222,-0.858639,0.858647,1.171975,-0.858662,0.855105,1.174842,-0.955776,0.855105,1.174842,-0.955776,0.858647,1.171975,-0.858662,0.855577,1.174647,-0.955793,0.829672,1.115136,-0.863778,0.858647,1.115136,-0.863778,0.832742,1.129852,-0.959825,0.832742,1.129852,-0.959825,0.858647,1.115136,-0.863778,0.855577,1.129852,-0.959825,0.877268,1.140123,-0.861529,0.870252,1.149545,-0.958053,0.872933,1.1297,-0.862467,0.872933,1.1297,-0.862467,0.870252,1.149545,-0.958053,0.866836,1.141331,-0.958793,0.858048,1.114889,-0.863801,0.872933,1.1297,-0.862467,0.855105,1.129658,-0.959843,0.855105,1.129658,-0.959843,0.872933,1.1297,-0.862467,0.866836,1.141331,-0.958793,0.858647,1.171975,-0.858662,0.829672,1.171975,-0.858662,0.855577,1.174647,-0.955793,0.855577,1.174647,-0.955793,0.829672,1.171975,-0.858662,0.832742,1.174647,-0.955793,0.794624,1.207438,-0.852259,0.805121,1.202596,-0.950747,0.785118,1.187313,-0.854554,0.785118,1.187313,-0.854554,0.805121,1.202596,-0.950747,0.797629,1.186735,-0.952557,0.858647,1.06464,-0.865113,0.829672,1.06464,-0.865113,0.855577,1.090057,-0.960878,0.855577,1.090057,-0.960878,0.829672,1.06464,-0.865113,0.832741,1.090057,-0.960878,0.811052,1.146988,-0.860911,0.818067,1.154955,-0.957566,0.815386,1.15741,-0.859973,0.815386,1.15741,-0.859973,0.818067,1.154955,-0.957566,0.821483,1.163169,-0.956827,0.815386,1.1297,-0.862467,0.830271,1.114889,-0.863801,0.821483,1.141331,-0.958793,0.821483,1.141331,-0.958793,0.830271,1.114889,-0.863801,0.833214,1.129658,-0.959843,0.768245,1.139879,-0.858824,0.784332,1.149353,-0.955922,0.785118,1.099311,-0.862476,0.785118,1.099311,-0.862476,0.784332,1.149353,-0.955922,0.797629,1.117381,-0.9588,0.811052,1.146988,-0.860911,0.811052,1.140123,-0.861529,0.818067,1.154955,-0.957566,0.818067,1.154955,-0.957566,0.811052,1.140123,-0.861529,0.818067,1.149545,-0.958053,0.794624,1.079099,-0.863811,0.785118,1.099311,-0.862476,0.805121,1.101452,-0.959852,0.805121,1.101452,-0.959852,0.785118,1.099311,-0.862476,0.797629,1.117381,-0.9588,0.872933,1.15741,-0.859973,0.858048,1.172222,-0.858639,0.866836,1.163169,-0.956827,0.866836,1.163169,-0.956827,0.858048,1.172222,-0.858639,0.855105,1.174842,-0.955776,0.893695,1.207438,-0.852259,0.903201,1.187313,-0.854554,0.883198,1.202596,-0.950747,0.883198,1.202596,-0.950747,0.903201,1.187313,-0.854554,0.89069,1.186735,-0.952557,0.843548,1.186862,-1.041726,0.859989,1.180079,-1.042337,0.827107,1.180079,-1.042337,0.859989,1.180079,-1.042337,0.8668,1.163704,-1.043811,0.827107,1.180079,-1.042337,0.8668,1.163704,-1.043811,0.859989,1.147329,-1.045285,0.827107,1.180079,-1.042337,0.859989,1.147329,-1.045285,0.843548,1.140546,-1.045895,0.827107,1.180079,-1.042337,0.843548,1.140546,-1.045895,0.827107,1.147329,-1.045285,0.827107,1.180079,-1.042337,0.827107,1.147329,-1.045285,0.820296,1.163704,-1.043811,0.827107,1.180079,-1.042337,0.882513,0.874968,-0.355573,0.882513,0.941903,-0.349548,0.852992,0.874968,-0.355573,0.852992,0.874968,-0.355573,0.882513,0.941903,-0.349548,0.852992,0.941903,-0.349548,0.882512,0.922247,-0.060332,0.882512,0.84266,-0.067496,0.882512,0.917015,-0.073067,0.882512,0.917015,-0.073067,0.882512,0.84266,-0.067496,0.882512,0.850081,-0.079093,0.882512,0.84266,-0.067496,0.882513,0.869737,-0.368309,0.882512,0.850081,-0.079093,0.882512,0.850081,-0.079093,0.882513,0.869737,-0.368309,0.882513,0.874968,-0.355573,0.882513,0.869737,-0.368309,0.882513,0.949324,-0.361145,0.882513,0.874968,-0.355573,0.882513,0.874968,-0.355573,0.882513,0.949324,-0.361145,0.882513,0.941903,-0.349548,0.852992,0.941903,-0.349548,0.852992,0.917015,-0.073067,0.852992,0.874968,-0.355573,0.852992,0.874968,-0.355573,0.852992,0.917015,-0.073067,0.852992,0.850081,-0.079093,0.882513,0.941903,-0.349548,0.882512,0.917015,-0.073067,0.852992,0.941903,-0.349548,0.852992,0.941903,-0.349548,0.882512,0.917015,-0.073067,0.852992,0.917015,-0.073067,0.882512,0.850081,-0.079093,0.882513,0.874968,-0.355573,0.852992,0.850081,-0.079093,0.852992,0.850081,-0.079093,0.882513,0.874968,-0.355573,0.852992,0.874968,-0.355573,0.882512,0.917015,-0.073067,0.882512,0.850081,-0.079093,0.852992,0.917015,-0.073067,0.852992,0.917015,-0.073067,0.882512,0.850081,-0.079093,0.852992,0.850081,-0.079093,0.804583,0.851122,-0.083854,0.804583,0.916842,-0.077938,0.83787,0.851122,-0.083854,0.83787,0.851122,-0.083854,0.804583,0.916842,-0.077938,0.83787,0.916842,-0.077938,0.804583,0.84266,-0.067496,0.804583,0.922247,-0.060332,0.804583,0.851122,-0.083854,0.804583,0.851122,-0.083854,0.804583,0.922247,-0.060332,0.804583,0.916842,-0.077938,0.804583,0.922247,-0.060332,0.804583,0.949324,-0.361145,0.804583,0.916842,-0.077938,0.804583,0.916842,-0.077938,0.804583,0.949324,-0.361145,0.804583,0.940862,-0.344788,0.804583,0.869737,-0.368309,0.804583,0.84266,-0.067496,0.804583,0.875142,-0.350703,0.804583,0.875142,-0.350703,0.804583,0.84266,-0.067496,0.804583,0.851122,-0.083854,0.83787,0.916842,-0.077938,0.83787,0.940862,-0.344788,0.83787,0.851122,-0.083854,0.83787,0.851122,-0.083854,0.83787,0.940862,-0.344788,0.83787,0.875142,-0.350703,0.804583,0.916842,-0.077938,0.804583,0.940862,-0.344788,0.83787,0.916842,-0.077938,0.83787,0.916842,-0.077938,0.804583,0.940862,-0.344788,0.83787,0.940862,-0.344788,0.804583,0.875142,-0.350703,0.804583,0.851122,-0.083854,0.83787,0.875142,-0.350703,0.83787,0.875142,-0.350703,0.804583,0.851122,-0.083854,0.83787,0.851122,-0.083854,0.804583,0.940862,-0.344788,0.804583,0.875142,-0.350703,0.83787,0.940862,-0.344788,0.83787,0.940862,-0.344788,0.804583,0.875142,-0.350703,0.83787,0.875142,-0.350703,-0.810706,1.274566,-0.264023,-0.82008,1.27225,-0.241511,-0.865341,1.276881,-0.286536,-0.82008,1.27225,-0.241511,-0.842711,1.271292,-0.232186,-0.865341,1.276881,-0.286536,-0.842711,1.271292,-0.232186,-0.865342,1.27225,-0.241512,-0.865341,1.276881,-0.286536,-0.865342,1.27225,-0.241512,-0.874715,1.274566,-0.264023,-0.865341,1.276881,-0.286536,-0.84271,1.239289,-0.382362,-0.84271,1.218424,-0.384508,-0.914114,1.209868,-0.385388,-0.914114,1.209868,-0.385388,-0.84271,1.218424,-0.384508,-0.914114,1.189003,-0.387534,-0.84271,1.239289,-0.382362,-0.771306,1.209868,-0.385387,-0.84271,1.218424,-0.384508,-0.84271,1.218424,-0.384508,-0.771306,1.209868,-0.385387,-0.771306,1.189003,-0.387533,-0.741731,1.115691,-0.167587,-0.74173,1.138839,-0.392691,-0.771308,1.18672,-0.160283,-0.771308,1.18672,-0.160283,-0.74173,1.138839,-0.392691,-0.771306,1.209868,-0.385387,-0.914115,1.165855,-0.16243,-0.943691,1.094826,-0.169734,-0.914114,1.189003,-0.387534,-0.914114,1.189003,-0.387534,-0.943691,1.094826,-0.169734,-0.94369,1.117974,-0.394838,-0.84271,1.227902,-0.342003,-0.797378,1.209223,-0.343924,-0.84271,1.239289,-0.382362,-0.84271,1.239289,-0.382362,-0.797378,1.209223,-0.343924,-0.771306,1.209868,-0.385387,-0.842711,1.195276,-0.159403,-0.914115,1.165855,-0.16243,-0.84271,1.218424,-0.384508,-0.84271,1.218424,-0.384508,-0.914115,1.165855,-0.16243,-0.914114,1.189003,-0.387534,-0.771308,1.165855,-0.162428,-0.842711,1.195276,-0.159403,-0.771306,1.189003,-0.387533,-0.771306,1.189003,-0.387533,-0.842711,1.195276,-0.159403,-0.84271,1.218424,-0.384508,-0.914115,1.18672,-0.160284,-0.888044,1.194527,-0.20101,-0.914114,1.209868,-0.385388,-0.914114,1.209868,-0.385388,-0.888044,1.194527,-0.20101,-0.888043,1.209223,-0.343924,-0.741731,1.094825,-0.169732,-0.771308,1.165855,-0.162428,-0.74173,1.117973,-0.394837,-0.74173,1.117973,-0.394837,-0.771308,1.165855,-0.162428,-0.771306,1.189003,-0.387533,-0.914115,1.18672,-0.160284,-0.914114,1.209868,-0.385388,-0.943691,1.115691,-0.167589,-0.943691,1.115691,-0.167589,-0.914114,1.209868,-0.385388,-0.94369,1.138839,-0.392693,-0.914115,1.18672,-0.160284,-0.943691,1.115691,-0.167589,-0.914115,1.165855,-0.16243,-0.914115,1.165855,-0.16243,-0.943691,1.115691,-0.167589,-0.943691,1.094826,-0.169734,-0.771308,1.18672,-0.160283,-0.771308,1.165855,-0.162428,-0.741731,1.115691,-0.167587,-0.741731,1.115691,-0.167587,-0.771308,1.165855,-0.162428,-0.741731,1.094825,-0.169732,-0.914114,1.209868,-0.385388,-0.914114,1.189003,-0.387534,-0.94369,1.138839,-0.392693,-0.94369,1.138839,-0.392693,-0.914114,1.189003,-0.387534,-0.94369,1.117974,-0.394838,-0.771306,1.209868,-0.385387,-0.74173,1.138839,-0.392691,-0.771306,1.189003,-0.387533,-0.771306,1.189003,-0.387533,-0.74173,1.138839,-0.392691,-0.74173,1.117973,-0.394837,-0.943691,1.115691,-0.167589,-0.94369,1.138839,-0.392693,-0.943691,1.094826,-0.169734,-0.943691,1.094826,-0.169734,-0.94369,1.138839,-0.392693,-0.94369,1.117974,-0.394838,-0.842711,1.216141,-0.157258,-0.842711,1.195276,-0.159403,-0.771308,1.18672,-0.160283,-0.771308,1.18672,-0.160283,-0.842711,1.195276,-0.159403,-0.771308,1.165855,-0.162428,-0.74173,1.138839,-0.392691,-0.741731,1.115691,-0.167587,-0.74173,1.117973,-0.394837,-0.74173,1.117973,-0.394837,-0.741731,1.115691,-0.167587,-0.741731,1.094825,-0.169732,-0.842711,1.216141,-0.157258,-0.914115,1.18672,-0.160284,-0.842711,1.195276,-0.159403,-0.842711,1.195276,-0.159403,-0.914115,1.18672,-0.160284,-0.914115,1.165855,-0.16243,-0.888043,1.209223,-0.343924,-0.882274,1.245181,-0.331036,-0.84271,1.227902,-0.342003,-0.84271,1.227902,-0.342003,-0.882274,1.245181,-0.331036,-0.84271,1.261483,-0.32936,-0.888044,1.194527,-0.20101,-0.882274,1.232355,-0.20631,-0.888043,1.209223,-0.343924,-0.888043,1.209223,-0.343924,-0.882274,1.232355,-0.20631,-0.882274,1.245181,-0.331036,-0.771308,1.18672,-0.160283,-0.797378,1.194527,-0.20101,-0.842711,1.216141,-0.157258,-0.842711,1.216141,-0.157258,-0.797378,1.194527,-0.20101,-0.842711,1.213205,-0.199089,-0.771306,1.209868,-0.385387,-0.797378,1.209223,-0.343924,-0.771308,1.18672,-0.160283,-0.771308,1.18672,-0.160283,-0.797378,1.209223,-0.343924,-0.797378,1.194527,-0.20101,-0.914114,1.209868,-0.385388,-0.888043,1.209223,-0.343924,-0.84271,1.239289,-0.382362,-0.84271,1.239289,-0.382362,-0.888043,1.209223,-0.343924,-0.84271,1.227902,-0.342003,-0.842711,1.213205,-0.199089,-0.888044,1.194527,-0.20101,-0.842711,1.216141,-0.157258,-0.842711,1.216141,-0.157258,-0.888044,1.194527,-0.20101,-0.914115,1.18672,-0.160284,-0.882274,1.232355,-0.20631,-0.872048,1.235418,-0.222285,-0.882274,1.245181,-0.331036,-0.882274,1.245181,-0.331036,-0.872048,1.235418,-0.222285,-0.872048,1.244928,-0.314772,-0.803148,1.232355,-0.20631,-0.813374,1.235418,-0.222285,-0.842711,1.248657,-0.204634,-0.842711,1.248657,-0.204634,-0.813374,1.235418,-0.222285,-0.842711,1.247506,-0.221042,-0.84271,1.261483,-0.32936,-0.803147,1.245181,-0.331036,-0.84271,1.227902,-0.342003,-0.84271,1.227902,-0.342003,-0.803147,1.245181,-0.331036,-0.797378,1.209223,-0.343924,-0.797378,1.209223,-0.343924,-0.803147,1.245181,-0.331036,-0.797378,1.194527,-0.20101,-0.797378,1.194527,-0.20101,-0.803147,1.245181,-0.331036,-0.803148,1.232355,-0.20631,-0.842711,1.248657,-0.204634,-0.882274,1.232355,-0.20631,-0.842711,1.213205,-0.199089,-0.842711,1.213205,-0.199089,-0.882274,1.232355,-0.20631,-0.888044,1.194527,-0.20101,-0.797378,1.194527,-0.20101,-0.803148,1.232355,-0.20631,-0.842711,1.213205,-0.199089,-0.842711,1.213205,-0.199089,-0.803148,1.232355,-0.20631,-0.842711,1.248657,-0.204634,-0.842711,1.247506,-0.221042,-0.842711,1.225845,-0.22327,-0.872048,1.235418,-0.222285,-0.872048,1.235418,-0.222285,-0.842711,1.225845,-0.22327,-0.872048,1.213757,-0.224513,-0.813373,1.244928,-0.314772,-0.813373,1.223268,-0.317,-0.813374,1.235418,-0.222285,-0.813374,1.235418,-0.222285,-0.813373,1.223268,-0.317,-0.813374,1.213757,-0.224512,-0.882274,1.245181,-0.331036,-0.872048,1.244928,-0.314772,-0.84271,1.261483,-0.32936,-0.84271,1.261483,-0.32936,-0.872048,1.244928,-0.314772,-0.84271,1.257016,-0.313529,-0.84271,1.257016,-0.313529,-0.813373,1.244928,-0.314772,-0.84271,1.261483,-0.32936,-0.84271,1.261483,-0.32936,-0.813373,1.244928,-0.314772,-0.803147,1.245181,-0.331036,-0.803147,1.245181,-0.331036,-0.813373,1.244928,-0.314772,-0.803148,1.232355,-0.20631,-0.803148,1.232355,-0.20631,-0.813373,1.244928,-0.314772,-0.813374,1.235418,-0.222285,-0.842711,1.247506,-0.221042,-0.872048,1.235418,-0.222285,-0.842711,1.248657,-0.204634,-0.842711,1.248657,-0.204634,-0.872048,1.235418,-0.222285,-0.882274,1.232355,-0.20631,-0.842711,1.225225,-0.232112,-0.866538,1.215407,-0.233121,-0.842711,1.225845,-0.22327,-0.842711,1.225845,-0.22327,-0.866538,1.215407,-0.233121,-0.872048,1.213757,-0.224513,-0.813373,1.223268,-0.317,-0.818884,1.223132,-0.308235,-0.813374,1.213757,-0.224512,-0.813374,1.213757,-0.224512,-0.818884,1.223132,-0.308235,-0.818885,1.215407,-0.233121,-0.813374,1.213757,-0.224512,-0.842711,1.225845,-0.22327,-0.813374,1.235418,-0.222285,-0.813374,1.235418,-0.222285,-0.842711,1.225845,-0.22327,-0.842711,1.247506,-0.221042,-0.872048,1.235418,-0.222285,-0.872048,1.213757,-0.224513,-0.872048,1.244928,-0.314772,-0.872048,1.244928,-0.314772,-0.872048,1.213757,-0.224513,-0.872048,1.223268,-0.317,-0.872048,1.223268,-0.317,-0.84271,1.235356,-0.315757,-0.872048,1.244928,-0.314772,-0.872048,1.244928,-0.314772,-0.84271,1.235356,-0.315757,-0.84271,1.257016,-0.313529,-0.84271,1.257016,-0.313529,-0.84271,1.235356,-0.315757,-0.813373,1.244928,-0.314772,-0.813373,1.244928,-0.314772,-0.84271,1.235356,-0.315757,-0.813373,1.223268,-0.317,-0.842711,1.268608,-0.22765,-0.866538,1.268608,-0.227651,-0.842711,1.225225,-0.232112,-0.842711,1.225225,-0.232112,-0.866538,1.268608,-0.227651,-0.866538,1.215407,-0.233121,-0.818884,1.223132,-0.308235,-0.818884,1.276332,-0.302764,-0.818885,1.215407,-0.233121,-0.818885,1.215407,-0.233121,-0.818884,1.276332,-0.302764,-0.818885,1.268608,-0.22765,-0.813374,1.213757,-0.224512,-0.818885,1.215407,-0.233121,-0.842711,1.225845,-0.22327,-0.842711,1.225845,-0.22327,-0.818885,1.215407,-0.233121,-0.842711,1.225225,-0.232112,-0.872048,1.213757,-0.224513,-0.866538,1.215407,-0.233121,-0.872048,1.223268,-0.317,-0.872048,1.223268,-0.317,-0.866538,1.215407,-0.233121,-0.866537,1.223132,-0.308236,-0.872048,1.223268,-0.317,-0.866537,1.223132,-0.308236,-0.84271,1.235356,-0.315757,-0.84271,1.235356,-0.315757,-0.866537,1.223132,-0.308236,-0.84271,1.232949,-0.307226,-0.84271,1.232949,-0.307226,-0.818884,1.223132,-0.308235,-0.84271,1.235356,-0.315757,-0.84271,1.235356,-0.315757,-0.818884,1.223132,-0.308235,-0.813373,1.223268,-0.317,-0.818885,1.268608,-0.22765,-0.818884,1.276332,-0.302764,-0.842711,1.268608,-0.22765,-0.842711,1.268608,-0.22765,-0.818884,1.276332,-0.302764,-0.84271,1.276332,-0.302764,-0.842711,1.268608,-0.22765,-0.84271,1.276332,-0.302764,-0.866538,1.268608,-0.227651,-0.866538,1.268608,-0.227651,-0.84271,1.276332,-0.302764,-0.866537,1.276332,-0.302765,-0.818885,1.215407,-0.233121,-0.818885,1.268608,-0.22765,-0.842711,1.225225,-0.232112,-0.842711,1.225225,-0.232112,-0.818885,1.268608,-0.22765,-0.842711,1.268608,-0.22765,-0.866538,1.215407,-0.233121,-0.866538,1.268608,-0.227651,-0.866537,1.223132,-0.308236,-0.866537,1.223132,-0.308236,-0.866538,1.268608,-0.227651,-0.866537,1.276332,-0.302765,-0.866537,1.223132,-0.308236,-0.866537,1.276332,-0.302765,-0.84271,1.232949,-0.307226,-0.84271,1.232949,-0.307226,-0.866537,1.276332,-0.302765,-0.84271,1.276332,-0.302764,-0.84271,1.276332,-0.302764,-0.818884,1.276332,-0.302764,-0.84271,1.232949,-0.307226,-0.84271,1.232949,-0.307226,-0.818884,1.276332,-0.302764,-0.818884,1.223132,-0.308235,-0.738335,1.113214,-0.484266,-0.777532,1.120353,-0.564025,-0.76915,1.187312,-0.477633,-0.76915,1.187312,-0.477633,-0.777532,1.120353,-0.564025,-0.796867,1.166846,-0.559863,-0.769156,1.135894,0.096737,-0.784114,1.114696,0.165769,-0.73834,1.061795,0.090104,-0.73834,1.061795,0.090104,-0.784114,1.114696,0.165769,-0.759494,1.055496,0.160469,-0.738335,1.113214,-0.484266,-0.76915,1.187312,-0.477633,-0.73834,1.061795,0.090104,-0.73834,1.061795,0.090104,-0.76915,1.187312,-0.477633,-0.769156,1.135894,0.096737,-0.948756,1.113214,-0.484268,-0.917941,1.039115,-0.490901,-0.948761,1.061795,0.090102,-0.948761,1.061795,0.090102,-0.917941,1.039115,-0.490901,-0.917946,0.987697,0.083469,-0.76915,1.187312,-0.477633,-0.843546,1.218005,-0.474885,-0.769156,1.135894,0.096737,-0.769156,1.135894,0.096737,-0.843546,1.218005,-0.474885,-0.843551,1.166587,0.099484,-0.843546,1.006842,-0.406626,-0.895541,1.028294,-0.404706,-0.843546,1.008423,-0.493648,-0.843546,1.008423,-0.493648,-0.895541,1.028294,-0.404706,-0.917941,1.039115,-0.490901,-0.917946,0.987697,0.083469,-0.895545,0.992357,-0.003277,-0.843551,0.957004,0.080722,-0.843551,0.957004,0.080722,-0.895545,0.992357,-0.003277,-0.84355,0.970906,-0.005197,-0.843546,1.218005,-0.474885,-0.917941,1.187312,-0.477634,-0.843551,1.166587,0.099484,-0.843551,1.166587,0.099484,-0.917941,1.187312,-0.477634,-0.917946,1.135894,0.096736,-0.76915,1.039115,-0.490899,-0.738335,1.113214,-0.484266,-0.769156,0.987697,0.08347,-0.769156,0.987697,0.08347,-0.738335,1.113214,-0.484266,-0.73834,1.061795,0.090104,-0.917941,1.187312,-0.477634,-0.948756,1.113214,-0.484268,-0.917946,1.135894,0.096736,-0.917946,1.135894,0.096736,-0.948756,1.113214,-0.484268,-0.948761,1.061795,0.090102,-0.843551,1.139217,0.167964,-0.902988,1.114696,0.165768,-0.784114,1.114696,0.165769,-0.902988,1.114696,0.165768,-0.927608,1.055496,0.160468,-0.784114,1.114696,0.165769,-0.927608,1.055496,0.160468,-0.902988,0.996296,0.155168,-0.784114,1.114696,0.165769,-0.902988,0.996296,0.155168,-0.843551,0.971774,0.152974,-0.784114,1.114696,0.165769,-0.843551,0.971774,0.152974,-0.784114,0.996296,0.155169,-0.784114,1.114696,0.165769,-0.784114,0.996296,0.155169,-0.759494,1.055496,0.160469,-0.784114,1.114696,0.165769,-0.917946,0.987697,0.083469,-0.902988,0.996296,0.155168,-0.948761,1.061795,0.090102,-0.948761,1.061795,0.090102,-0.902988,0.996296,0.155168,-0.927608,1.055496,0.160468,-0.843551,1.166587,0.099484,-0.843551,1.139217,0.167964,-0.769156,1.135894,0.096737,-0.769156,1.135894,0.096737,-0.843551,1.139217,0.167964,-0.784114,1.114696,0.165769,-0.843551,0.957004,0.080722,-0.843551,0.971774,0.152974,-0.917946,0.987697,0.083469,-0.917946,0.987697,0.083469,-0.843551,0.971774,0.152974,-0.902988,0.996296,0.155168,-0.769156,0.987697,0.08347,-0.784114,0.996296,0.155169,-0.843551,0.957004,0.080722,-0.843551,0.957004,0.080722,-0.784114,0.996296,0.155169,-0.843551,0.971774,0.152974,-0.917946,1.135894,0.096736,-0.902988,1.114696,0.165768,-0.843551,1.166587,0.099484,-0.843551,1.166587,0.099484,-0.902988,1.114696,0.165768,-0.843551,1.139217,0.167964,-0.73834,1.061795,0.090104,-0.759494,1.055496,0.160469,-0.769156,0.987697,0.08347,-0.769156,0.987697,0.08347,-0.759494,1.055496,0.160469,-0.784114,0.996296,0.155169,-0.948761,1.061795,0.090102,-0.927608,1.055496,0.160468,-0.917946,1.135894,0.096736,-0.917946,1.135894,0.096736,-0.927608,1.055496,0.160468,-0.902988,1.114696,0.165768,-0.796867,1.166846,-0.559863,-0.820894,1.142914,-0.562006,-0.843545,1.186104,-0.558139,-0.843545,1.186104,-0.558139,-0.820894,1.142914,-0.562006,-0.843545,1.152259,-0.561169,-0.948756,1.113214,-0.484268,-0.909558,1.120354,-0.564026,-0.917941,1.039115,-0.490901,-0.917941,1.039115,-0.490901,-0.909558,1.120354,-0.564026,-0.890223,1.073862,-0.568188,-0.76915,1.187312,-0.477633,-0.796867,1.166846,-0.559863,-0.843546,1.218005,-0.474885,-0.843546,1.218005,-0.474885,-0.796867,1.166846,-0.559863,-0.843545,1.186104,-0.558139,-0.917941,1.039115,-0.490901,-0.890223,1.073862,-0.568188,-0.843546,1.008423,-0.493648,-0.843546,1.008423,-0.493648,-0.890223,1.073862,-0.568188,-0.843545,1.054603,-0.569912,-0.843546,1.008423,-0.493648,-0.843545,1.054603,-0.569912,-0.76915,1.039115,-0.490899,-0.76915,1.039115,-0.490899,-0.843545,1.054603,-0.569912,-0.796867,1.073861,-0.568187,-0.843546,1.218005,-0.474885,-0.843545,1.186104,-0.558139,-0.917941,1.187312,-0.477634,-0.917941,1.187312,-0.477634,-0.843545,1.186104,-0.558139,-0.890223,1.166846,-0.559864,-0.76915,1.039115,-0.490899,-0.796867,1.073861,-0.568187,-0.738335,1.113214,-0.484266,-0.738335,1.113214,-0.484266,-0.796867,1.073861,-0.568187,-0.777532,1.120353,-0.564025,-0.917941,1.187312,-0.477634,-0.890223,1.166846,-0.559864,-0.948756,1.113214,-0.484268,-0.948756,1.113214,-0.484268,-0.890223,1.166846,-0.559864,-0.909558,1.120354,-0.564026,-0.843557,1.090804,0.868415,-0.91306,1.06213,0.865847,-0.774054,1.06213,0.865848,-0.91306,1.06213,0.865847,-0.941849,0.992905,0.85965,-0.774054,1.06213,0.865848,-0.941849,0.992905,0.85965,-0.91306,0.923678,0.853453,-0.774054,1.06213,0.865848,-0.91306,0.923678,0.853453,-0.843557,0.895004,0.850886,-0.774054,1.06213,0.865848,-0.843557,0.895004,0.850886,-0.774054,0.923678,0.853454,-0.774054,1.06213,0.865848,-0.774054,0.923678,0.853454,-0.745265,0.992904,0.859651,-0.774054,1.06213,0.865848,-0.843557,1.085691,0.832709,-0.779907,1.059431,0.830359,-0.907207,1.059431,0.830358,-0.779907,1.059431,0.830359,-0.753542,0.996035,0.824684,-0.907207,1.059431,0.830358,-0.753542,0.996035,0.824684,-0.779907,0.932638,0.819008,-0.907207,1.059431,0.830358,-0.779907,0.932638,0.819008,-0.843557,0.906378,0.816657,-0.907207,1.059431,0.830358,-0.843557,0.906378,0.816657,-0.907207,0.932638,0.819007,-0.907207,1.059431,0.830358,-0.907207,0.932638,0.819007,-0.933573,0.996035,0.824682,-0.907207,1.059431,0.830358,-0.843557,1.090804,0.868415,-0.774054,1.06213,0.865848,-0.843557,1.085691,0.832709,-0.843557,1.085691,0.832709,-0.774054,1.06213,0.865848,-0.779907,1.059431,0.830359,-0.843557,0.895004,0.850886,-0.91306,0.923678,0.853453,-0.843557,0.906378,0.816657,-0.843557,0.906378,0.816657,-0.91306,0.923678,0.853453,-0.907207,0.932638,0.819007,-0.774054,0.923678,0.853454,-0.843557,0.895004,0.850886,-0.779907,0.932638,0.819008,-0.779907,0.932638,0.819008,-0.843557,0.895004,0.850886,-0.843557,0.906378,0.816657,-0.91306,1.06213,0.865847,-0.843557,1.090804,0.868415,-0.907207,1.059431,0.830358,-0.907207,1.059431,0.830358,-0.843557,1.090804,0.868415,-0.843557,1.085691,0.832709,-0.745265,0.992904,0.859651,-0.774054,0.923678,0.853454,-0.753542,0.996035,0.824684,-0.753542,0.996035,0.824684,-0.774054,0.923678,0.853454,-0.779907,0.932638,0.819008,-0.941849,0.992905,0.85965,-0.91306,1.06213,0.865847,-0.933573,0.996035,0.824682,-0.933573,0.996035,0.824682,-0.91306,1.06213,0.865847,-0.907207,1.059431,0.830358,-0.774054,1.06213,0.865848,-0.745265,0.992904,0.859651,-0.779907,1.059431,0.830359,-0.779907,1.059431,0.830359,-0.745265,0.992904,0.859651,-0.753542,0.996035,0.824684,-0.91306,0.923678,0.853453,-0.941849,0.992905,0.85965,-0.907207,0.932638,0.819007,-0.907207,0.932638,0.819007,-0.941849,0.992905,0.85965,-0.933573,0.996035,0.824682,-0.843552,1.135849,0.296881,-0.908745,1.108953,0.294472,-0.77836,1.108953,0.294474,-0.908745,1.108953,0.294472,-0.935749,1.04402,0.288659,-0.77836,1.108953,0.294474,-0.935749,1.04402,0.288659,-0.908745,0.979087,0.282846,-0.77836,1.108953,0.294474,-0.908745,0.979087,0.282846,-0.843552,0.952191,0.280439,-0.77836,1.108953,0.294474,-0.843552,0.952191,0.280439,-0.77836,0.979087,0.282848,-0.77836,1.108953,0.294474,-0.77836,0.979087,0.282848,-0.751356,1.04402,0.288661,-0.77836,1.108953,0.294474,-0.843552,1.141776,0.264349,-0.776236,1.114004,0.261864,-0.910868,1.114004,0.261862,-0.776236,1.114004,0.261864,-0.748353,1.046957,0.255861,-0.910868,1.114004,0.261862,-0.748353,1.046957,0.255861,-0.776236,0.979908,0.249859,-0.910868,1.114004,0.261862,-0.776236,0.979908,0.249859,-0.843552,0.952136,0.247372,-0.910868,1.114004,0.261862,-0.843552,0.952136,0.247372,-0.910868,0.979908,0.249858,-0.910868,1.114004,0.261862,-0.910868,0.979908,0.249858,-0.938751,1.046957,0.25586,-0.910868,1.114004,0.261862,-0.843552,1.135849,0.296881,-0.77836,1.108953,0.294474,-0.843552,1.141776,0.264349,-0.843552,1.141776,0.264349,-0.77836,1.108953,0.294474,-0.776236,1.114004,0.261864,-0.843552,0.952191,0.280439,-0.908745,0.979087,0.282846,-0.843552,0.952136,0.247372,-0.843552,0.952136,0.247372,-0.908745,0.979087,0.282846,-0.910868,0.979908,0.249858,-0.77836,0.979087,0.282848,-0.843552,0.952191,0.280439,-0.776236,0.979908,0.249859,-0.776236,0.979908,0.249859,-0.843552,0.952191,0.280439,-0.843552,0.952136,0.247372,-0.908745,1.108953,0.294472,-0.843552,1.135849,0.296881,-0.910868,1.114004,0.261862,-0.910868,1.114004,0.261862,-0.843552,1.135849,0.296881,-0.843552,1.141776,0.264349,-0.751356,1.04402,0.288661,-0.77836,0.979087,0.282848,-0.748353,1.046957,0.255861,-0.748353,1.046957,0.255861,-0.77836,0.979087,0.282848,-0.776236,0.979908,0.249859,-0.935749,1.04402,0.288659,-0.908745,1.108953,0.294472,-0.938751,1.046957,0.25586,-0.938751,1.046957,0.25586,-0.908745,1.108953,0.294472,-0.910868,1.114004,0.261862,-0.77836,1.108953,0.294474,-0.751356,1.04402,0.288661,-0.776236,1.114004,0.261864,-0.776236,1.114004,0.261864,-0.751356,1.04402,0.288661,-0.748353,1.046957,0.255861,-0.908745,0.979087,0.282846,-0.935749,1.04402,0.288659,-0.910868,0.979908,0.249858,-0.910868,0.979908,0.249858,-0.935749,1.04402,0.288659,-0.938751,1.046957,0.25586,-0.84355,0.89817,-0.011708,-0.791555,0.919621,-0.009787,-0.84355,0.970906,-0.005197,-0.84355,0.970906,-0.005197,-0.791555,0.919621,-0.009787,-0.791555,0.992357,-0.003276,-0.76915,1.039115,-0.490899,-0.791551,1.028294,-0.404706,-0.843546,1.008423,-0.493648,-0.843546,1.008423,-0.493648,-0.791551,1.028294,-0.404706,-0.843546,1.006842,-0.406626,-0.84355,0.970906,-0.005197,-0.791555,0.992357,-0.003276,-0.843551,0.957004,0.080722,-0.843551,0.957004,0.080722,-0.791555,0.992357,-0.003276,-0.769156,0.987697,0.08347,-0.769156,0.987697,0.08347,-0.791555,0.992357,-0.003276,-0.76915,1.039115,-0.490899,-0.76915,1.039115,-0.490899,-0.791555,0.992357,-0.003276,-0.791551,1.028294,-0.404706,-0.917941,1.039115,-0.490901,-0.895541,1.028294,-0.404706,-0.917946,0.987697,0.083469,-0.917946,0.987697,0.083469,-0.895541,1.028294,-0.404706,-0.895545,0.992357,-0.003277,-0.895541,0.955558,-0.411218,-0.882511,0.949263,-0.361077,-0.895545,0.919622,-0.009788,-0.895545,0.919622,-0.009788,-0.882511,0.949263,-0.361077,-0.882514,0.922333,-0.06025,-0.843549,0.906257,-0.061689,-0.804585,0.922333,-0.06025,-0.84355,0.89817,-0.011708,-0.84355,0.89817,-0.011708,-0.804585,0.922333,-0.06025,-0.791555,0.919621,-0.009787,-0.843546,0.934107,-0.413138,-0.895541,0.955558,-0.411218,-0.843546,1.006842,-0.406626,-0.843546,1.006842,-0.406626,-0.895541,0.955558,-0.411218,-0.895541,1.028294,-0.404706,-0.791551,1.028294,-0.404706,-0.791551,0.955558,-0.411217,-0.843546,1.006842,-0.406626,-0.843546,1.006842,-0.406626,-0.791551,0.955558,-0.411217,-0.843546,0.934107,-0.413138,-0.895545,0.992357,-0.003277,-0.895545,0.919622,-0.009788,-0.84355,0.970906,-0.005197,-0.84355,0.970906,-0.005197,-0.895545,0.919622,-0.009788,-0.84355,0.89817,-0.011708,-0.882511,0.949263,-0.361077,-0.882511,0.941847,-0.349476,-0.882514,0.922333,-0.06025,-0.882514,0.922333,-0.06025,-0.882511,0.941847,-0.349476,-0.882514,0.917095,-0.072983,-0.843549,0.842742,-0.067375,-0.804585,0.842742,-0.067375,-0.843549,0.906257,-0.061689,-0.843549,0.906257,-0.061689,-0.804585,0.842742,-0.067375,-0.804585,0.922333,-0.06025,-0.843547,0.933188,-0.362515,-0.882511,0.949263,-0.361077,-0.843546,0.934107,-0.413138,-0.843546,0.934107,-0.413138,-0.882511,0.949263,-0.361077,-0.895541,0.955558,-0.411218,-0.791551,0.955558,-0.411217,-0.804582,0.949263,-0.361076,-0.843546,0.934107,-0.413138,-0.843546,0.934107,-0.413138,-0.804582,0.949263,-0.361076,-0.843547,0.933188,-0.362515,-0.791555,0.919621,-0.009787,-0.804585,0.922333,-0.06025,-0.791551,0.955558,-0.411217,-0.791551,0.955558,-0.411217,-0.804585,0.922333,-0.06025,-0.804582,0.949263,-0.361076,-0.895545,0.919622,-0.009788,-0.882514,0.922333,-0.06025,-0.84355,0.89817,-0.011708,-0.84355,0.89817,-0.011708,-0.882514,0.922333,-0.06025,-0.843549,0.906257,-0.061689,-0.882511,0.869672,-0.368202,-0.843547,0.869672,-0.368201,-0.882514,0.842742,-0.067375,-0.882514,0.842742,-0.067375,-0.843547,0.869672,-0.368201,-0.843549,0.842742,-0.067375,-0.843547,0.869672,-0.368201,-0.804582,0.869672,-0.368201,-0.843549,0.842742,-0.067375,-0.843549,0.842742,-0.067375,-0.804582,0.869672,-0.368201,-0.804585,0.842742,-0.067375,-0.843547,0.869672,-0.368201,-0.882511,0.869672,-0.368202,-0.843547,0.933188,-0.362515,-0.843547,0.933188,-0.362515,-0.882511,0.869672,-0.368202,-0.882511,0.949263,-0.361077,-0.804582,0.949263,-0.361076,-0.804582,0.869672,-0.368201,-0.843547,0.933188,-0.362515,-0.843547,0.933188,-0.362515,-0.804582,0.869672,-0.368201,-0.843547,0.869672,-0.368201,-0.804582,0.949263,-0.361076,-0.804582,0.940809,-0.344715,-0.804582,0.869672,-0.368201,-0.804582,0.869672,-0.368201,-0.804582,0.940809,-0.344715,-0.804582,0.875086,-0.350598,-0.882514,0.922333,-0.06025,-0.882514,0.842742,-0.067375,-0.843549,0.906257,-0.061689,-0.843549,0.906257,-0.061689,-0.882514,0.842742,-0.067375,-0.843549,0.842742,-0.067375,-0.890223,1.073862,-0.568188,-0.866195,1.097794,-0.566045,-0.843545,1.054603,-0.569912,-0.843545,1.054603,-0.569912,-0.866195,1.097794,-0.566045,-0.843545,1.088448,-0.566881,-0.843545,1.054603,-0.569912,-0.843545,1.088448,-0.566881,-0.796867,1.073861,-0.568187,-0.796867,1.073861,-0.568187,-0.843545,1.088448,-0.566881,-0.820894,1.097793,-0.566045,-0.843545,1.186104,-0.558139,-0.843545,1.152259,-0.561169,-0.890223,1.166846,-0.559864,-0.890223,1.166846,-0.559864,-0.843545,1.152259,-0.561169,-0.866195,1.142914,-0.562006,-0.796867,1.073861,-0.568187,-0.820894,1.097793,-0.566045,-0.777532,1.120353,-0.564025,-0.777532,1.120353,-0.564025,-0.820894,1.097793,-0.566045,-0.811512,1.120353,-0.564025,-0.890223,1.166846,-0.559864,-0.866195,1.142914,-0.562006,-0.909558,1.120354,-0.564026,-0.909558,1.120354,-0.564026,-0.866195,1.142914,-0.562006,-0.875578,1.120353,-0.564026,-0.777532,1.120353,-0.564025,-0.811512,1.120353,-0.564025,-0.796867,1.166846,-0.559863,-0.796867,1.166846,-0.559863,-0.811512,1.120353,-0.564025,-0.820894,1.142914,-0.562006,-0.909558,1.120354,-0.564026,-0.875578,1.120353,-0.564026,-0.890223,1.073862,-0.568188,-0.890223,1.073862,-0.568188,-0.875578,1.120353,-0.564026,-0.866195,1.097794,-0.566045,-0.815382,1.147128,-0.748558,-0.81538,1.157105,-0.860006,-0.811047,1.136705,-0.749491,-0.811047,1.136705,-0.749491,-0.81538,1.157105,-0.860006,-0.811046,1.146682,-0.860939,-0.829667,1.211619,-0.739574,-0.829666,1.221596,-0.851022,-0.858643,1.211619,-0.739574,-0.858643,1.211619,-0.739574,-0.829666,1.221596,-0.851022,-0.858642,1.221596,-0.851023,-0.903189,1.080887,-0.659813,-0.872934,1.110848,-0.655184,-0.92005,1.121431,-0.656184,-0.92005,1.121431,-0.656184,-0.872934,1.110848,-0.655184,-0.877264,1.121258,-0.654252,-0.89369,1.068814,-0.752358,-0.893689,1.078791,-0.863807,-0.858643,1.054355,-0.753653,-0.858643,1.054355,-0.753653,-0.893689,1.078791,-0.863807,-0.858642,1.064332,-0.865101,-0.92005,1.128296,-0.655569,-0.877264,1.128124,-0.653637,-0.903189,1.168841,-0.65194,-0.903189,1.168841,-0.65194,-0.877264,1.128124,-0.653637,-0.872934,1.138534,-0.652705,-0.858647,1.203524,-0.649181,-0.893688,1.189067,-0.650476,-0.858647,1.153111,-0.651401,-0.893688,1.189067,-0.650476,-0.858043,1.15336,-0.651378,-0.858647,1.153111,-0.651401,-0.829664,1.203523,-0.649181,-0.829665,1.153111,-0.6514,-0.794623,1.189067,-0.650475,-0.829665,1.153111,-0.6514,-0.830268,1.15336,-0.651378,-0.794623,1.189067,-0.650475,-0.768241,1.136462,-0.746786,-0.76824,1.146439,-0.858235,-0.785113,1.177033,-0.743154,-0.785113,1.177033,-0.743154,-0.76824,1.146439,-0.858235,-0.785112,1.18701,-0.854603,-0.83694,1.214555,-0.661,-0.786412,1.193709,-0.662865,-0.836939,1.220362,-0.725859,-0.836939,1.220362,-0.725859,-0.786412,1.193709,-0.662865,-0.786412,1.199516,-0.727725,-0.903197,1.177033,-0.743155,-0.903195,1.18701,-0.854604,-0.920069,1.136462,-0.746787,-0.920069,1.136462,-0.746787,-0.903195,1.18701,-0.854604,-0.920068,1.14644,-0.858236,-0.934601,1.129448,-0.668619,-0.910535,1.187316,-0.663439,-0.9346,1.135255,-0.733479,-0.9346,1.135255,-0.733479,-0.910535,1.187316,-0.663439,-0.910535,1.193123,-0.728298,-0.829665,1.046266,-0.663259,-0.794623,1.060723,-0.661965,-0.829665,1.096272,-0.656488,-0.794623,1.060723,-0.661965,-0.830268,1.096022,-0.656511,-0.829665,1.096272,-0.656488,-0.768261,1.121431,-0.656183,-0.811048,1.121258,-0.654252,-0.785122,1.080887,-0.659812,-0.785122,1.080887,-0.659812,-0.811048,1.121258,-0.654252,-0.815377,1.110848,-0.655184,-0.851372,1.037509,-0.676849,-0.901899,1.058354,-0.674984,-0.851371,1.043315,-0.741709,-0.851371,1.043315,-0.741709,-0.901899,1.058354,-0.674984,-0.901898,1.064161,-0.739843,-0.815382,1.119416,-0.751038,-0.81538,1.129393,-0.862488,-0.830266,1.104604,-0.752364,-0.830266,1.104604,-0.752364,-0.81538,1.129393,-0.862488,-0.830265,1.114581,-0.863813,-0.872928,1.147128,-0.748558,-0.872927,1.157105,-0.860007,-0.858044,1.16194,-0.747232,-0.858044,1.16194,-0.747232,-0.872927,1.157105,-0.860007,-0.858043,1.171917,-0.858681,-0.858647,1.046266,-0.663259,-0.858647,1.096272,-0.656489,-0.893688,1.060723,-0.661966,-0.858647,1.096272,-0.656489,-0.858043,1.096022,-0.656511,-0.893688,1.060723,-0.661966,-0.777775,1.187316,-0.663437,-0.75371,1.129448,-0.668618,-0.777775,1.193123,-0.728297,-0.777775,1.193123,-0.728297,-0.75371,1.129448,-0.668618,-0.753709,1.135254,-0.733477,-0.910535,1.064748,-0.674411,-0.934601,1.122616,-0.669231,-0.910535,1.070554,-0.739271,-0.910535,1.070554,-0.739271,-0.934601,1.122616,-0.669231,-0.9346,1.128422,-0.734091,-0.901899,1.19371,-0.662866,-0.851371,1.214555,-0.661,-0.901898,1.199516,-0.727726,-0.901898,1.199516,-0.727726,-0.851371,1.214555,-0.661,-0.851371,1.220362,-0.725859,-0.785122,1.168841,-0.651938,-0.815377,1.138534,-0.652705,-0.768261,1.128296,-0.655568,-0.768261,1.128296,-0.655568,-0.815377,1.138534,-0.652705,-0.811048,1.128124,-0.653637,-0.75371,1.122616,-0.66923,-0.777775,1.064748,-0.67441,-0.753709,1.128422,-0.734089,-0.753709,1.128422,-0.734089,-0.777775,1.064748,-0.67441,-0.777775,1.070554,-0.73927,-0.786412,1.058354,-0.674983,-0.83694,1.037509,-0.676849,-0.786412,1.064161,-0.739843,-0.786412,1.064161,-0.739843,-0.83694,1.037509,-0.676849,-0.836939,1.043315,-0.741709,-0.903197,1.089027,-0.751033,-0.89369,1.068814,-0.752358,-0.910535,1.070554,-0.739271,-0.910535,1.070554,-0.739271,-0.89369,1.068814,-0.752358,-0.901898,1.064161,-0.739843,-0.903189,1.080887,-0.659813,-0.910535,1.064748,-0.674411,-0.893688,1.060723,-0.661966,-0.893688,1.060723,-0.661966,-0.910535,1.064748,-0.674411,-0.901899,1.058354,-0.674984,-0.858643,1.054355,-0.753653,-0.829667,1.054355,-0.753652,-0.851371,1.043315,-0.741709,-0.851371,1.043315,-0.741709,-0.829667,1.054355,-0.753652,-0.836939,1.043315,-0.741709,-0.851372,1.037509,-0.676849,-0.83694,1.037509,-0.676849,-0.858647,1.046266,-0.663259,-0.858647,1.046266,-0.663259,-0.83694,1.037509,-0.676849,-0.829665,1.046266,-0.663259,-0.785113,1.089027,-0.751033,-0.777775,1.070554,-0.73927,-0.794619,1.068814,-0.752358,-0.794619,1.068814,-0.752358,-0.777775,1.070554,-0.73927,-0.786412,1.064161,-0.739843,-0.786412,1.058354,-0.674983,-0.777775,1.064748,-0.67441,-0.794623,1.060723,-0.661965,-0.794623,1.060723,-0.661965,-0.777775,1.064748,-0.67441,-0.785122,1.080887,-0.659812,-0.753709,1.135254,-0.733477,-0.753709,1.128422,-0.734089,-0.768241,1.136462,-0.746786,-0.768241,1.136462,-0.746786,-0.753709,1.128422,-0.734089,-0.768241,1.129597,-0.7474,-0.768261,1.121431,-0.656183,-0.75371,1.122616,-0.66923,-0.768261,1.128296,-0.655568,-0.768261,1.128296,-0.655568,-0.75371,1.122616,-0.66923,-0.75371,1.129448,-0.668618,-0.92005,1.121431,-0.656184,-0.92005,1.128296,-0.655569,-0.934601,1.122616,-0.669231,-0.934601,1.122616,-0.669231,-0.92005,1.128296,-0.655569,-0.934601,1.129448,-0.668619,-0.920069,1.129597,-0.747402,-0.9346,1.128422,-0.734091,-0.920069,1.136462,-0.746787,-0.920069,1.136462,-0.746787,-0.9346,1.128422,-0.734091,-0.9346,1.135255,-0.733479,-0.903189,1.168841,-0.65194,-0.893688,1.189067,-0.650476,-0.910535,1.187316,-0.663439,-0.910535,1.187316,-0.663439,-0.893688,1.189067,-0.650476,-0.901899,1.19371,-0.662866,-0.903197,1.177033,-0.743155,-0.910535,1.193123,-0.728298,-0.89369,1.19716,-0.740868,-0.89369,1.19716,-0.740868,-0.910535,1.193123,-0.728298,-0.901898,1.199516,-0.727726,-0.858647,1.203524,-0.649181,-0.829664,1.203523,-0.649181,-0.851371,1.214555,-0.661,-0.851371,1.214555,-0.661,-0.829664,1.203523,-0.649181,-0.83694,1.214555,-0.661,-0.858643,1.211619,-0.739574,-0.851371,1.220362,-0.725859,-0.829667,1.211619,-0.739574,-0.829667,1.211619,-0.739574,-0.851371,1.220362,-0.725859,-0.836939,1.220362,-0.725859,-0.785122,1.168841,-0.651938,-0.777775,1.187316,-0.663437,-0.794623,1.189067,-0.650475,-0.794623,1.189067,-0.650475,-0.777775,1.187316,-0.663437,-0.786412,1.193709,-0.662865,-0.786412,1.199516,-0.727725,-0.777775,1.193123,-0.728297,-0.794619,1.19716,-0.740868,-0.794619,1.19716,-0.740868,-0.777775,1.193123,-0.728297,-0.785113,1.177033,-0.743154,-0.910535,1.070554,-0.739271,-0.9346,1.128422,-0.734091,-0.903197,1.089027,-0.751033,-0.903197,1.089027,-0.751033,-0.9346,1.128422,-0.734091,-0.920069,1.129597,-0.747402,-0.92005,1.121431,-0.656184,-0.934601,1.122616,-0.669231,-0.903189,1.080887,-0.659813,-0.903189,1.080887,-0.659813,-0.934601,1.122616,-0.669231,-0.910535,1.064748,-0.674411,-0.851371,1.043315,-0.741709,-0.901898,1.064161,-0.739843,-0.858643,1.054355,-0.753653,-0.858643,1.054355,-0.753653,-0.901898,1.064161,-0.739843,-0.89369,1.068814,-0.752358,-0.851371,1.043315,-0.741709,-0.836939,1.043315,-0.741709,-0.851372,1.037509,-0.676849,-0.851372,1.037509,-0.676849,-0.836939,1.043315,-0.741709,-0.83694,1.037509,-0.676849,-0.794619,1.068814,-0.752358,-0.786412,1.064161,-0.739843,-0.829667,1.054355,-0.753652,-0.829667,1.054355,-0.753652,-0.786412,1.064161,-0.739843,-0.836939,1.043315,-0.741709,-0.83694,1.037509,-0.676849,-0.786412,1.058354,-0.674983,-0.829665,1.046266,-0.663259,-0.829665,1.046266,-0.663259,-0.786412,1.058354,-0.674983,-0.794623,1.060723,-0.661965,-0.777775,1.064748,-0.67441,-0.75371,1.122616,-0.66923,-0.785122,1.080887,-0.659812,-0.785122,1.080887,-0.659812,-0.75371,1.122616,-0.66923,-0.768261,1.121431,-0.656183,-0.786412,1.064161,-0.739843,-0.777775,1.070554,-0.73927,-0.786412,1.058354,-0.674983,-0.786412,1.058354,-0.674983,-0.777775,1.070554,-0.73927,-0.777775,1.064748,-0.67441,-0.75371,1.129448,-0.668618,-0.75371,1.122616,-0.66923,-0.753709,1.135254,-0.733477,-0.753709,1.135254,-0.733477,-0.75371,1.122616,-0.66923,-0.753709,1.128422,-0.734089,-0.768241,1.129597,-0.7474,-0.753709,1.128422,-0.734089,-0.785113,1.089027,-0.751033,-0.785113,1.089027,-0.751033,-0.753709,1.128422,-0.734089,-0.777775,1.070554,-0.73927,-0.910535,1.070554,-0.739271,-0.901898,1.064161,-0.739843,-0.910535,1.064748,-0.674411,-0.910535,1.064748,-0.674411,-0.901898,1.064161,-0.739843,-0.901899,1.058354,-0.674984,-0.893688,1.060723,-0.661966,-0.901899,1.058354,-0.674984,-0.858647,1.046266,-0.663259,-0.858647,1.046266,-0.663259,-0.901899,1.058354,-0.674984,-0.851372,1.037509,-0.676849,-0.9346,1.135255,-0.733479,-0.9346,1.128422,-0.734091,-0.934601,1.129448,-0.668619,-0.934601,1.129448,-0.668619,-0.9346,1.128422,-0.734091,-0.934601,1.122616,-0.669231,-0.910535,1.187316,-0.663439,-0.934601,1.129448,-0.668619,-0.903189,1.168841,-0.65194,-0.903189,1.168841,-0.65194,-0.934601,1.129448,-0.668619,-0.92005,1.128296,-0.655569,-0.920069,1.136462,-0.746787,-0.9346,1.135255,-0.733479,-0.903197,1.177033,-0.743155,-0.903197,1.177033,-0.743155,-0.9346,1.135255,-0.733479,-0.910535,1.193123,-0.728298,-0.901898,1.199516,-0.727726,-0.910535,1.193123,-0.728298,-0.901899,1.19371,-0.662866,-0.901899,1.19371,-0.662866,-0.910535,1.193123,-0.728298,-0.910535,1.187316,-0.663439,-0.851371,1.214555,-0.661,-0.901899,1.19371,-0.662866,-0.858647,1.203524,-0.649181,-0.858647,1.203524,-0.649181,-0.901899,1.19371,-0.662866,-0.893688,1.189067,-0.650476,-0.89369,1.19716,-0.740868,-0.901898,1.199516,-0.727726,-0.858643,1.211619,-0.739574,-0.858643,1.211619,-0.739574,-0.901898,1.199516,-0.727726,-0.851371,1.220362,-0.725859,-0.836939,1.220362,-0.725859,-0.851371,1.220362,-0.725859,-0.83694,1.214555,-0.661,-0.83694,1.214555,-0.661,-0.851371,1.220362,-0.725859,-0.851371,1.214555,-0.661,-0.794623,1.189067,-0.650475,-0.786412,1.193709,-0.662865,-0.829664,1.203523,-0.649181,-0.829664,1.203523,-0.649181,-0.786412,1.193709,-0.662865,-0.83694,1.214555,-0.661,-0.836939,1.220362,-0.725859,-0.786412,1.199516,-0.727725,-0.829667,1.211619,-0.739574,-0.829667,1.211619,-0.739574,-0.786412,1.199516,-0.727725,-0.794619,1.19716,-0.740868,-0.777775,1.193123,-0.728297,-0.786412,1.199516,-0.727725,-0.777775,1.187316,-0.663437,-0.777775,1.187316,-0.663437,-0.786412,1.199516,-0.727725,-0.786412,1.193709,-0.662865,-0.768261,1.128296,-0.655568,-0.75371,1.129448,-0.668618,-0.785122,1.168841,-0.651938,-0.785122,1.168841,-0.651938,-0.75371,1.129448,-0.668618,-0.777775,1.187316,-0.663437,-0.777775,1.193123,-0.728297,-0.753709,1.135254,-0.733477,-0.785113,1.177033,-0.743154,-0.785113,1.177033,-0.743154,-0.753709,1.135254,-0.733477,-0.768241,1.136462,-0.746786,-0.830266,1.104604,-0.752364,-0.830265,1.114581,-0.863813,-0.829667,1.104851,-0.752342,-0.829667,1.104851,-0.752342,-0.830265,1.114581,-0.863813,-0.829666,1.114828,-0.863791,-0.858044,1.16194,-0.747232,-0.858043,1.171917,-0.858681,-0.858643,1.161693,-0.747254,-0.858643,1.161693,-0.747254,-0.858043,1.171917,-0.858681,-0.858642,1.17167,-0.858703,-0.877264,1.121258,-0.654252,-0.877264,1.128124,-0.653637,-0.92005,1.121431,-0.656184,-0.92005,1.121431,-0.656184,-0.877264,1.128124,-0.653637,-0.92005,1.128296,-0.655569,-0.893688,1.189067,-0.650476,-0.903189,1.168841,-0.65194,-0.858043,1.15336,-0.651378,-0.858043,1.15336,-0.651378,-0.903189,1.168841,-0.65194,-0.872934,1.138534,-0.652705,-0.815377,1.138534,-0.652705,-0.785122,1.168841,-0.651938,-0.830268,1.15336,-0.651378,-0.830268,1.15336,-0.651378,-0.785122,1.168841,-0.651938,-0.794623,1.189067,-0.650475,-0.768261,1.121431,-0.656183,-0.768261,1.128296,-0.655568,-0.811048,1.121258,-0.654252,-0.811048,1.121258,-0.654252,-0.768261,1.128296,-0.655568,-0.811048,1.128124,-0.653637,-0.794619,1.068814,-0.752358,-0.794618,1.078791,-0.863806,-0.785113,1.089027,-0.751033,-0.785113,1.089027,-0.751033,-0.794618,1.078791,-0.863806,-0.785112,1.099004,-0.862481,-0.785113,1.089027,-0.751033,-0.785112,1.099004,-0.862481,-0.768241,1.129597,-0.7474,-0.768241,1.129597,-0.7474,-0.785112,1.099004,-0.862481,-0.76824,1.139574,-0.858849,-0.920069,1.129597,-0.747402,-0.920067,1.139575,-0.85885,-0.903197,1.089027,-0.751033,-0.903197,1.089027,-0.751033,-0.920067,1.139575,-0.85885,-0.903195,1.099004,-0.862482,-0.829667,1.104851,-0.752342,-0.829666,1.114828,-0.863791,-0.858643,1.104851,-0.752343,-0.858643,1.104851,-0.752343,-0.829666,1.114828,-0.863791,-0.858642,1.114828,-0.863791,-0.858643,1.161693,-0.747254,-0.858642,1.17167,-0.858703,-0.829667,1.161693,-0.747254,-0.829667,1.161693,-0.747254,-0.858642,1.17167,-0.858703,-0.829666,1.17167,-0.858703,-0.829664,1.203523,-0.649181,-0.858647,1.203524,-0.649181,-0.829665,1.153111,-0.6514,-0.829665,1.153111,-0.6514,-0.858647,1.203524,-0.649181,-0.858647,1.153111,-0.651401,-0.872934,1.110848,-0.655184,-0.903189,1.080887,-0.659813,-0.858043,1.096022,-0.656511,-0.858043,1.096022,-0.656511,-0.903189,1.080887,-0.659813,-0.893688,1.060723,-0.661966,-0.794623,1.060723,-0.661965,-0.785122,1.080887,-0.659812,-0.830268,1.096022,-0.656511,-0.830268,1.096022,-0.656511,-0.785122,1.080887,-0.659812,-0.815377,1.110848,-0.655184,-0.858044,1.104604,-0.752365,-0.858043,1.114581,-0.863814,-0.872928,1.119416,-0.751039,-0.872928,1.119416,-0.751039,-0.858043,1.114581,-0.863814,-0.872927,1.129394,-0.862488,-0.858647,1.046266,-0.663259,-0.829665,1.046266,-0.663259,-0.858647,1.096272,-0.656489,-0.858647,1.096272,-0.656489,-0.829665,1.046266,-0.663259,-0.829665,1.096272,-0.656488,-0.877263,1.12984,-0.750106,-0.877262,1.139817,-0.861555,-0.877263,1.136705,-0.749491,-0.877263,1.136705,-0.749491,-0.877262,1.139817,-0.861555,-0.877262,1.146682,-0.86094,-0.877262,1.146682,-0.86094,-0.870245,1.154602,-0.957599,-0.872927,1.157105,-0.860007,-0.872927,1.157105,-0.860007,-0.870245,1.154602,-0.957599,-0.866829,1.162816,-0.956864,-0.830265,1.114581,-0.863813,-0.833207,1.129303,-0.959864,-0.829666,1.114828,-0.863791,-0.829666,1.114828,-0.863791,-0.833207,1.129303,-0.959864,-0.832735,1.129498,-0.959846,-0.920067,1.139575,-0.85885,-0.90398,1.149,-0.955953,-0.903195,1.099004,-0.862482,-0.903195,1.099004,-0.862482,-0.90398,1.149,-0.955953,-0.890684,1.117027,-0.958815,-0.794618,1.207137,-0.852317,-0.805114,1.202246,-0.950803,-0.829666,1.221596,-0.851022,-0.829666,1.221596,-0.851022,-0.805114,1.202246,-0.950803,-0.832735,1.213641,-0.949784,-0.858642,1.114828,-0.863791,-0.855571,1.129498,-0.959846,-0.858043,1.114581,-0.863814,-0.858043,1.114581,-0.863814,-0.855571,1.129498,-0.959846,-0.855099,1.129303,-0.959864,-0.829666,1.17167,-0.858703,-0.832735,1.174295,-0.955836,-0.830265,1.171917,-0.858681,-0.830265,1.171917,-0.858681,-0.832735,1.174295,-0.955836,-0.833207,1.17449,-0.955819,-0.855571,1.213641,-0.949784,-0.883192,1.202246,-0.950804,-0.858642,1.221596,-0.851023,-0.858642,1.221596,-0.851023,-0.883192,1.202246,-0.950804,-0.893689,1.207137,-0.852318,-0.920068,1.14644,-0.858236,-0.90398,1.154411,-0.955468,-0.920067,1.139575,-0.85885,-0.920067,1.139575,-0.85885,-0.90398,1.154411,-0.955468,-0.90398,1.149,-0.955953,-0.877262,1.139817,-0.861555,-0.870245,1.149191,-0.958083,-0.877262,1.146682,-0.86094,-0.877262,1.146682,-0.86094,-0.870245,1.149191,-0.958083,-0.870245,1.154602,-0.957599,-0.832735,1.089702,-0.960879,-0.805114,1.101097,-0.959858,-0.829666,1.064332,-0.865101,-0.829666,1.064332,-0.865101,-0.805114,1.101097,-0.959858,-0.794618,1.078791,-0.863806,-0.811046,1.139817,-0.861554,-0.818061,1.149191,-0.958083,-0.81538,1.129393,-0.862488,-0.81538,1.129393,-0.862488,-0.818061,1.149191,-0.958083,-0.821477,1.140977,-0.958819,-0.830265,1.171917,-0.858681,-0.833207,1.17449,-0.955819,-0.81538,1.157105,-0.860006,-0.81538,1.157105,-0.860006,-0.833207,1.17449,-0.955819,-0.821477,1.162816,-0.956863,-0.890684,1.117027,-0.958815,-0.883192,1.101097,-0.959859,-0.903195,1.099004,-0.862482,-0.903195,1.099004,-0.862482,-0.883192,1.101097,-0.959859,-0.893689,1.078791,-0.863807,-0.893689,1.078791,-0.863807,-0.883192,1.101097,-0.959859,-0.858642,1.064332,-0.865101,-0.858642,1.064332,-0.865101,-0.883192,1.101097,-0.959859,-0.855571,1.089702,-0.960879,-0.829666,1.221596,-0.851022,-0.832735,1.213641,-0.949784,-0.858642,1.221596,-0.851023,-0.858642,1.221596,-0.851023,-0.832735,1.213641,-0.949784,-0.855571,1.213641,-0.949784,-0.76824,1.146439,-0.858235,-0.784326,1.154411,-0.955467,-0.785112,1.18701,-0.854603,-0.785112,1.18701,-0.854603,-0.784326,1.154411,-0.955467,-0.797622,1.186384,-0.952605,-0.877263,1.136705,-0.749491,-0.877262,1.146682,-0.86094,-0.872928,1.147128,-0.748558,-0.872928,1.147128,-0.748558,-0.877262,1.146682,-0.86094,-0.872927,1.157105,-0.860007,-0.829667,1.054355,-0.753652,-0.829666,1.064332,-0.865101,-0.794619,1.068814,-0.752358,-0.794619,1.068814,-0.752358,-0.829666,1.064332,-0.865101,-0.794618,1.078791,-0.863806,-0.903195,1.099004,-0.862482,-0.893689,1.078791,-0.863807,-0.903197,1.089027,-0.751033,-0.903197,1.089027,-0.751033,-0.893689,1.078791,-0.863807,-0.89369,1.068814,-0.752358,-0.829667,1.161693,-0.747254,-0.829666,1.17167,-0.858703,-0.830266,1.16194,-0.747232,-0.830266,1.16194,-0.747232,-0.829666,1.17167,-0.858703,-0.830265,1.171917,-0.858681,-0.811047,1.12984,-0.750105,-0.811046,1.139817,-0.861554,-0.815382,1.119416,-0.751038,-0.815382,1.119416,-0.751038,-0.811046,1.139817,-0.861554,-0.81538,1.129393,-0.862488,-0.830266,1.16194,-0.747232,-0.830265,1.171917,-0.858681,-0.815382,1.147128,-0.748558,-0.815382,1.147128,-0.748558,-0.830265,1.171917,-0.858681,-0.81538,1.157105,-0.860006,-0.785112,1.18701,-0.854603,-0.794618,1.207137,-0.852317,-0.785113,1.177033,-0.743154,-0.785113,1.177033,-0.743154,-0.794618,1.207137,-0.852317,-0.794619,1.19716,-0.740868,-0.920069,1.136462,-0.746787,-0.920068,1.14644,-0.858236,-0.920069,1.129597,-0.747402,-0.920069,1.129597,-0.747402,-0.920068,1.14644,-0.858236,-0.920067,1.139575,-0.85885,-0.858643,1.104851,-0.752343,-0.858642,1.114828,-0.863791,-0.858044,1.104604,-0.752365,-0.858044,1.104604,-0.752365,-0.858642,1.114828,-0.863791,-0.858043,1.114581,-0.863814,-0.811047,1.136705,-0.749491,-0.811046,1.146682,-0.860939,-0.811047,1.12984,-0.750105,-0.811047,1.12984,-0.750105,-0.811046,1.146682,-0.860939,-0.811046,1.139817,-0.861554,-0.794619,1.19716,-0.740868,-0.794618,1.207137,-0.852317,-0.829667,1.211619,-0.739574,-0.829667,1.211619,-0.739574,-0.794618,1.207137,-0.852317,-0.829666,1.221596,-0.851022,-0.858643,1.211619,-0.739574,-0.858642,1.221596,-0.851023,-0.89369,1.19716,-0.740868,-0.89369,1.19716,-0.740868,-0.858642,1.221596,-0.851023,-0.893689,1.207137,-0.852318,-0.858643,1.054355,-0.753653,-0.858642,1.064332,-0.865101,-0.829667,1.054355,-0.753652,-0.829667,1.054355,-0.753652,-0.858642,1.064332,-0.865101,-0.829666,1.064332,-0.865101,-0.768241,1.129597,-0.7474,-0.76824,1.139574,-0.858849,-0.768241,1.136462,-0.746786,-0.768241,1.136462,-0.746786,-0.76824,1.139574,-0.858849,-0.76824,1.146439,-0.858235,-0.89369,1.19716,-0.740868,-0.893689,1.207137,-0.852318,-0.903197,1.177033,-0.743155,-0.903197,1.177033,-0.743155,-0.893689,1.207137,-0.852318,-0.903195,1.18701,-0.854604,-0.872928,1.119416,-0.751039,-0.872927,1.129394,-0.862488,-0.877263,1.12984,-0.750106,-0.877263,1.12984,-0.750106,-0.872927,1.129394,-0.862488,-0.877262,1.139817,-0.861555,-0.797622,1.117027,-0.958814,-0.821477,1.140977,-0.958819,-0.784326,1.149,-0.955951,-0.784326,1.149,-0.955951,-0.821477,1.140977,-0.958819,-0.818061,1.149191,-0.958083,-0.832735,1.089702,-0.960879,-0.832735,1.129498,-0.959846,-0.805114,1.101097,-0.959858,-0.832735,1.129498,-0.959846,-0.833207,1.129303,-0.959864,-0.805114,1.101097,-0.959858,-0.883192,1.101097,-0.959859,-0.855099,1.129303,-0.959864,-0.855571,1.089702,-0.960879,-0.855099,1.129303,-0.959864,-0.855571,1.129498,-0.959846,-0.855571,1.089702,-0.960879,-0.784326,1.154411,-0.955467,-0.818061,1.154602,-0.957599,-0.797622,1.186384,-0.952605,-0.797622,1.186384,-0.952605,-0.818061,1.154602,-0.957599,-0.821477,1.162816,-0.956863,-0.890684,1.186384,-0.952606,-0.866829,1.162816,-0.956864,-0.90398,1.154411,-0.955468,-0.90398,1.154411,-0.955468,-0.866829,1.162816,-0.956864,-0.870245,1.154602,-0.957599,-0.855571,1.213641,-0.949784,-0.855571,1.174295,-0.955836,-0.883192,1.202246,-0.950804,-0.855571,1.174295,-0.955836,-0.855099,1.17449,-0.955819,-0.883192,1.202246,-0.950804,-0.805114,1.202246,-0.950803,-0.833207,1.17449,-0.955819,-0.832735,1.213641,-0.949784,-0.833207,1.17449,-0.955819,-0.832735,1.174295,-0.955836,-0.832735,1.213641,-0.949784,-0.832735,1.174295,-0.955836,-0.855571,1.174295,-0.955836,-0.832735,1.213641,-0.949784,-0.832735,1.213641,-0.949784,-0.855571,1.174295,-0.955836,-0.855571,1.213641,-0.949784,-0.883192,1.202246,-0.950804,-0.855099,1.17449,-0.955819,-0.890684,1.186384,-0.952606,-0.890684,1.186384,-0.952606,-0.855099,1.17449,-0.955819,-0.866829,1.162816,-0.956864,-0.855571,1.129498,-0.959846,-0.832735,1.129498,-0.959846,-0.855571,1.089702,-0.960879,-0.855571,1.089702,-0.960879,-0.832735,1.129498,-0.959846,-0.832735,1.089702,-0.960879,-0.805114,1.101097,-0.959858,-0.833207,1.129303,-0.959864,-0.797622,1.117027,-0.958814,-0.797622,1.117027,-0.958814,-0.833207,1.129303,-0.959864,-0.821477,1.140977,-0.958819,-0.784326,1.154411,-0.955467,-0.784326,1.149,-0.955951,-0.818061,1.154602,-0.957599,-0.818061,1.154602,-0.957599,-0.784326,1.149,-0.955951,-0.818061,1.149191,-0.958083,-0.866829,1.140977,-0.958819,-0.855099,1.129303,-0.959864,-0.890684,1.117027,-0.958815,-0.890684,1.117027,-0.958815,-0.855099,1.129303,-0.959864,-0.883192,1.101097,-0.959859,-0.821477,1.162816,-0.956863,-0.833207,1.17449,-0.955819,-0.797622,1.186384,-0.952605,-0.797622,1.186384,-0.952605,-0.833207,1.17449,-0.955819,-0.805114,1.202246,-0.950803,-0.870245,1.154602,-0.957599,-0.870245,1.149191,-0.958083,-0.90398,1.154411,-0.955468,-0.90398,1.154411,-0.955468,-0.870245,1.149191,-0.958083,-0.90398,1.149,-0.955953,-0.90398,1.149,-0.955953,-0.870245,1.149191,-0.958083,-0.890684,1.117027,-0.958815,-0.890684,1.117027,-0.958815,-0.870245,1.149191,-0.958083,-0.866829,1.140977,-0.958819,-0.890684,1.186384,-0.952606,-0.90398,1.154411,-0.955468,-0.903195,1.18701,-0.854604,-0.903195,1.18701,-0.854604,-0.90398,1.154411,-0.955468,-0.920068,1.14644,-0.858236,-0.76824,1.139574,-0.858849,-0.784326,1.149,-0.955951,-0.76824,1.146439,-0.858235,-0.76824,1.146439,-0.858235,-0.784326,1.149,-0.955951,-0.784326,1.154411,-0.955467,-0.858043,1.171917,-0.858681,-0.855099,1.17449,-0.955819,-0.858642,1.17167,-0.858703,-0.858642,1.17167,-0.858703,-0.855099,1.17449,-0.955819,-0.855571,1.174295,-0.955836,-0.829666,1.114828,-0.863791,-0.832735,1.129498,-0.959846,-0.858642,1.114828,-0.863791,-0.858642,1.114828,-0.863791,-0.832735,1.129498,-0.959846,-0.855571,1.129498,-0.959846,-0.866829,1.140977,-0.958819,-0.870245,1.149191,-0.958083,-0.872927,1.129394,-0.862488,-0.872927,1.129394,-0.862488,-0.870245,1.149191,-0.958083,-0.877262,1.139817,-0.861555,-0.858043,1.114581,-0.863814,-0.855099,1.129303,-0.959864,-0.872927,1.129394,-0.862488,-0.872927,1.129394,-0.862488,-0.855099,1.129303,-0.959864,-0.866829,1.140977,-0.958819,-0.858642,1.17167,-0.858703,-0.855571,1.174295,-0.955836,-0.829666,1.17167,-0.858703,-0.829666,1.17167,-0.858703,-0.855571,1.174295,-0.955836,-0.832735,1.174295,-0.955836,-0.797622,1.186384,-0.952605,-0.805114,1.202246,-0.950803,-0.785112,1.18701,-0.854603,-0.785112,1.18701,-0.854603,-0.805114,1.202246,-0.950803,-0.794618,1.207137,-0.852317,-0.858642,1.064332,-0.865101,-0.855571,1.089702,-0.960879,-0.829666,1.064332,-0.865101,-0.829666,1.064332,-0.865101,-0.855571,1.089702,-0.960879,-0.832735,1.089702,-0.960879,-0.821477,1.162816,-0.956863,-0.818061,1.154602,-0.957599,-0.81538,1.157105,-0.860006,-0.81538,1.157105,-0.860006,-0.818061,1.154602,-0.957599,-0.811046,1.146682,-0.860939,-0.81538,1.129393,-0.862488,-0.821477,1.140977,-0.958819,-0.830265,1.114581,-0.863813,-0.830265,1.114581,-0.863813,-0.821477,1.140977,-0.958819,-0.833207,1.129303,-0.959864,-0.797622,1.117027,-0.958814,-0.784326,1.149,-0.955951,-0.785112,1.099004,-0.862481,-0.785112,1.099004,-0.862481,-0.784326,1.149,-0.955951,-0.76824,1.139574,-0.858849,-0.811046,1.146682,-0.860939,-0.818061,1.154602,-0.957599,-0.811046,1.139817,-0.861554,-0.811046,1.139817,-0.861554,-0.818061,1.154602,-0.957599,-0.818061,1.149191,-0.958083,-0.794618,1.078791,-0.863806,-0.805114,1.101097,-0.959858,-0.785112,1.099004,-0.862481,-0.785112,1.099004,-0.862481,-0.805114,1.101097,-0.959858,-0.797622,1.117027,-0.958814,-0.872927,1.157105,-0.860007,-0.866829,1.162816,-0.956864,-0.858043,1.171917,-0.858681,-0.858043,1.171917,-0.858681,-0.866829,1.162816,-0.956864,-0.855099,1.17449,-0.955819,-0.893689,1.207137,-0.852318,-0.883192,1.202246,-0.950804,-0.903195,1.18701,-0.854604,-0.903195,1.18701,-0.854604,-0.883192,1.202246,-0.950804,-0.890684,1.186384,-0.952606,-0.843541,1.186467,-1.041775,-0.827099,1.179684,-1.042382,-0.859982,1.179684,-1.042382,-0.827099,1.179684,-1.042382,-0.820289,1.163308,-1.043848,-0.859982,1.179684,-1.042382,-0.820289,1.163308,-1.043848,-0.827099,1.146932,-1.045314,-0.859982,1.179684,-1.042382,-0.827099,1.146932,-1.045314,-0.843541,1.140149,-1.045922,-0.859982,1.179684,-1.042382,-0.843541,1.140149,-1.045922,-0.859982,1.146932,-1.045314,-0.859982,1.179684,-1.042382,-0.859982,1.146932,-1.045314,-0.866792,1.163308,-1.043848,-0.859982,1.179684,-1.042382,-0.882511,0.87491,-0.355469,-0.852992,0.87491,-0.355468,-0.882511,0.941847,-0.349476,-0.882511,0.941847,-0.349476,-0.852992,0.87491,-0.355468,-0.852992,0.941847,-0.349476,-0.882514,0.922333,-0.06025,-0.882514,0.917095,-0.072983,-0.882514,0.842742,-0.067375,-0.882514,0.842742,-0.067375,-0.882514,0.917095,-0.072983,-0.882514,0.850158,-0.078976,-0.882514,0.842742,-0.067375,-0.882514,0.850158,-0.078976,-0.882511,0.869672,-0.368202,-0.882511,0.869672,-0.368202,-0.882514,0.850158,-0.078976,-0.882511,0.87491,-0.355469,-0.882511,0.869672,-0.368202,-0.882511,0.87491,-0.355469,-0.882511,0.949263,-0.361077,-0.882511,0.949263,-0.361077,-0.882511,0.87491,-0.355469,-0.882511,0.941847,-0.349476,-0.852992,0.941847,-0.349476,-0.852992,0.87491,-0.355468,-0.852994,0.917095,-0.072983,-0.852994,0.917095,-0.072983,-0.852992,0.87491,-0.355468,-0.852994,0.850158,-0.078975,-0.882511,0.941847,-0.349476,-0.852992,0.941847,-0.349476,-0.882514,0.917095,-0.072983,-0.882514,0.917095,-0.072983,-0.852992,0.941847,-0.349476,-0.852994,0.917095,-0.072983,-0.882514,0.850158,-0.078976,-0.852994,0.850158,-0.078975,-0.882511,0.87491,-0.355469,-0.882511,0.87491,-0.355469,-0.852994,0.850158,-0.078975,-0.852992,0.87491,-0.355468,-0.882514,0.917095,-0.072983,-0.852994,0.917095,-0.072983,-0.882514,0.850158,-0.078976,-0.882514,0.850158,-0.078976,-0.852994,0.917095,-0.072983,-0.852994,0.850158,-0.078975,-0.804585,0.851196,-0.083736,-0.837872,0.851196,-0.083737,-0.804585,0.916919,-0.077853,-0.804585,0.916919,-0.077853,-0.837872,0.851196,-0.083737,-0.837872,0.916919,-0.077853,-0.804585,0.842742,-0.067375,-0.804585,0.851196,-0.083736,-0.804585,0.922333,-0.06025,-0.804585,0.922333,-0.06025,-0.804585,0.851196,-0.083736,-0.804585,0.916919,-0.077853,-0.804585,0.922333,-0.06025,-0.804585,0.916919,-0.077853,-0.804582,0.949263,-0.361076,-0.804582,0.949263,-0.361076,-0.804585,0.916919,-0.077853,-0.804582,0.940809,-0.344715,-0.804582,0.869672,-0.368201,-0.804582,0.875086,-0.350598,-0.804585,0.842742,-0.067375,-0.804585,0.842742,-0.067375,-0.804582,0.875086,-0.350598,-0.804585,0.851196,-0.083736,-0.837872,0.916919,-0.077853,-0.837872,0.851196,-0.083737,-0.83787,0.940809,-0.344715,-0.83787,0.940809,-0.344715,-0.837872,0.851196,-0.083737,-0.83787,0.875086,-0.350598,-0.804585,0.916919,-0.077853,-0.837872,0.916919,-0.077853,-0.804582,0.940809,-0.344715,-0.804582,0.940809,-0.344715,-0.837872,0.916919,-0.077853,-0.83787,0.940809,-0.344715,-0.804582,0.875086,-0.350598,-0.83787,0.875086,-0.350598,-0.804585,0.851196,-0.083736,-0.804585,0.851196,-0.083736,-0.83787,0.875086,-0.350598,-0.837872,0.851196,-0.083737,-0.804582,0.940809,-0.344715,-0.83787,0.940809,-0.344715,-0.804582,0.875086,-0.350598,-0.804582,0.875086,-0.350598,-0.83787,0.940809,-0.344715,-0.83787,0.875086,-0.350598,0.895543,0.923047,-0.022696,0.895543,0.956833,-0.398033,0.882065,0.923047,-0.022696,0.882065,0.923047,-0.022696,0.895543,0.956833,-0.398033,0.882065,0.956833,-0.398033,0.895543,1.028377,-0.404736,0.895543,0.992243,-0.003324,0.895543,1.024841,-0.391911,0.895543,1.024841,-0.391911,0.895543,0.992243,-0.003324,0.895543,0.991054,-0.016574,0.895543,0.992243,-0.003324,0.895543,0.919511,-0.009871,0.895543,0.991054,-0.016574,0.895543,0.991054,-0.016574,0.895543,0.919511,-0.009871,0.895543,0.923047,-0.022696,0.895543,0.955644,-0.411283,0.895543,1.028377,-0.404736,0.895543,0.956833,-0.398033,0.895543,0.956833,-0.398033,0.895543,1.028377,-0.404736,0.895543,1.024841,-0.391911,0.895543,0.991054,-0.016574,0.895543,0.923047,-0.022696,0.882065,0.991054,-0.016574,0.882065,0.991054,-0.016574,0.895543,0.923047,-0.022696,0.882065,0.923047,-0.022696,0.895543,0.956833,-0.398033,0.895543,1.024841,-0.391911,0.882065,0.956833,-0.398033,0.882065,0.956833,-0.398033,0.895543,1.024841,-0.391911,0.882065,1.024841,-0.391911,0.895543,1.024841,-0.391911,0.895543,0.991054,-0.016574,0.882065,1.024841,-0.391911,0.882065,1.024841,-0.391911,0.895543,0.991054,-0.016574,0.882065,0.991054,-0.016574,0.842935,0.885474,1.18121,0.861573,0.893163,1.181902,0.842935,0.880088,1.241042,0.842935,0.880088,1.241042,0.861573,0.893163,1.181902,0.861573,0.887778,1.241734,0.842935,0.897385,1.021989,0.842935,0.893977,1.086749,0.826108,0.904327,1.022614,0.826108,0.904327,1.022614,0.842935,0.893977,1.086749,0.824296,0.901666,1.087441,0.869294,0.92023,1.089112,0.861573,0.938793,1.090783,0.869294,0.911727,1.183573,0.869294,0.911727,1.183573,0.861573,0.938793,1.090783,0.861573,0.93029,1.185244,0.842935,0.924052,1.23822,0.830791,0.919042,1.23777,0.842935,0.931695,1.153308,0.842935,0.931695,1.153308,0.830791,0.919042,1.23777,0.830791,0.926685,1.152858,0.816576,0.92023,1.089112,0.824296,0.901666,1.087441,0.816576,0.911727,1.183573,0.816576,0.911727,1.183573,0.824296,0.901666,1.087441,0.824296,0.893163,1.181902,0.842935,1.022984,0.157542,0.859762,1.016043,0.156918,0.826108,1.016043,0.156918,0.859762,1.016043,0.156918,0.866731,0.999284,0.155409,0.826108,1.016043,0.156918,0.866731,0.999284,0.155409,0.859762,0.982525,0.1539,0.826108,1.016043,0.156918,0.859762,0.982525,0.1539,0.842935,0.975583,0.153275,0.826108,1.016043,0.156918,0.842935,0.975583,0.153275,0.826108,0.982525,0.1539,0.826108,1.016043,0.156918,0.826108,0.982525,0.1539,0.819138,0.999284,0.155409,0.826108,1.016043,0.156918,0.861573,0.938793,1.090783,0.842935,0.946482,1.091475,0.861573,0.93029,1.185244,0.861573,0.93029,1.185244,0.842935,0.946482,1.091475,0.842935,0.937979,1.185936,0.842935,0.893977,1.086749,0.861573,0.901666,1.087441,0.842935,0.885474,1.18121,0.842935,0.885474,1.18121,0.861573,0.901666,1.087441,0.861573,0.893163,1.181902,0.824296,0.901666,1.087441,0.842935,0.893977,1.086749,0.824296,0.893163,1.181902,0.824296,0.893163,1.181902,0.842935,0.893977,1.086749,0.842935,0.885474,1.18121,0.842935,0.880088,1.241042,0.861573,0.887778,1.241734,0.842935,0.889841,1.235141,0.842935,0.889841,1.235141,0.861573,0.887778,1.241734,0.855079,0.894851,1.235592,0.842935,0.946482,1.091475,0.824296,0.938793,1.090783,0.842935,0.937979,1.185936,0.842935,0.937979,1.185936,0.824296,0.938793,1.090783,0.824296,0.93029,1.185244,0.826108,0.982525,0.1539,0.842935,0.975583,0.153275,0.826108,0.904327,1.022614,0.826108,0.904327,1.022614,0.842935,0.975583,0.153275,0.842935,0.897385,1.021989,0.842935,1.022984,0.157542,0.826108,1.016043,0.156918,0.842935,0.944786,1.026256,0.842935,0.944786,1.026256,0.826108,1.016043,0.156918,0.826108,0.937845,1.025631,0.824296,0.887778,1.241734,0.842935,0.880088,1.241042,0.830791,0.894851,1.235592,0.830791,0.894851,1.235592,0.842935,0.880088,1.241042,0.842935,0.889841,1.235141,0.861573,0.901666,1.087441,0.869294,0.92023,1.089112,0.861573,0.893163,1.181902,0.861573,0.893163,1.181902,0.869294,0.92023,1.089112,0.869294,0.911727,1.183573,0.859762,0.982525,0.1539,0.866731,0.999284,0.155409,0.859762,0.904327,1.022614,0.859762,0.904327,1.022614,0.866731,0.999284,0.155409,0.866731,0.921086,1.024122,0.824296,0.938793,1.090783,0.816576,0.92023,1.089112,0.824296,0.93029,1.185244,0.824296,0.93029,1.185244,0.816576,0.92023,1.089112,0.816576,0.911727,1.183573,0.826108,1.016043,0.156918,0.819138,0.999284,0.155409,0.826108,0.937845,1.025631,0.826108,0.937845,1.025631,0.819138,0.999284,0.155409,0.819138,0.921086,1.024122,0.842935,0.932594,1.245769,0.824296,0.924905,1.245076,0.842935,0.924052,1.23822,0.842935,0.924052,1.23822,0.824296,0.924905,1.245076,0.830791,0.919042,1.23777,0.861573,0.924905,1.245076,0.842935,0.932594,1.245769,0.855079,0.919042,1.23777,0.855079,0.919042,1.23777,0.842935,0.932594,1.245769,0.842935,0.924052,1.23822,0.824296,0.893163,1.181902,0.842935,0.885474,1.18121,0.824296,0.887778,1.241734,0.824296,0.887778,1.241734,0.842935,0.885474,1.18121,0.842935,0.880088,1.241042,0.816575,0.906341,1.243406,0.824296,0.887778,1.241734,0.82576,0.906947,1.236681,0.82576,0.906947,1.236681,0.824296,0.887778,1.241734,0.830791,0.894851,1.235592,0.866731,0.999284,0.155409,0.859762,1.016043,0.156918,0.866731,0.921086,1.024122,0.866731,0.921086,1.024122,0.859762,1.016043,0.156918,0.859762,0.937845,1.025631,0.842935,0.937979,1.185936,0.824296,0.93029,1.185244,0.842935,0.932594,1.245769,0.842935,0.932594,1.245769,0.824296,0.93029,1.185244,0.824296,0.924905,1.245076,0.869294,0.906341,1.243406,0.861573,0.924905,1.245076,0.86011,0.906947,1.236681,0.86011,0.906947,1.236681,0.861573,0.924905,1.245076,0.855079,0.919042,1.23777,0.819138,0.999284,0.155409,0.826108,0.982525,0.1539,0.819138,0.921086,1.024122,0.819138,0.921086,1.024122,0.826108,0.982525,0.1539,0.826108,0.904327,1.022614,0.824296,0.924905,1.245076,0.816575,0.906341,1.243406,0.830791,0.919042,1.23777,0.830791,0.919042,1.23777,0.816575,0.906341,1.243406,0.82576,0.906947,1.236681,0.861573,0.893163,1.181902,0.869294,0.911727,1.183573,0.861573,0.887778,1.241734,0.861573,0.887778,1.241734,0.869294,0.911727,1.183573,0.869294,0.906341,1.243406,0.859762,1.016043,0.156918,0.842935,1.022984,0.157542,0.859762,0.937845,1.025631,0.859762,0.937845,1.025631,0.842935,1.022984,0.157542,0.842935,0.944786,1.026256,0.824296,0.93029,1.185244,0.816576,0.911727,1.183573,0.824296,0.924905,1.245076,0.824296,0.924905,1.245076,0.816576,0.911727,1.183573,0.816575,0.906341,1.243406,0.869294,0.911727,1.183573,0.861573,0.93029,1.185244,0.869294,0.906341,1.243406,0.869294,0.906341,1.243406,0.861573,0.93029,1.185244,0.861573,0.924905,1.245076,0.816576,0.911727,1.183573,0.824296,0.893163,1.181902,0.816575,0.906341,1.243406,0.816575,0.906341,1.243406,0.824296,0.893163,1.181902,0.824296,0.887778,1.241734,0.861573,0.887778,1.241734,0.869294,0.906341,1.243406,0.855079,0.894851,1.235592,0.855079,0.894851,1.235592,0.869294,0.906341,1.243406,0.86011,0.906947,1.236681,0.861573,0.93029,1.185244,0.842935,0.937979,1.185936,0.861573,0.924905,1.245076,0.861573,0.924905,1.245076,0.842935,0.937979,1.185936,0.842935,0.932594,1.245769,0.842935,0.931695,1.153308,0.830791,0.926685,1.152858,0.855079,0.926685,1.152858,0.830791,0.926685,1.152858,0.82576,0.91459,1.151769,0.855079,0.926685,1.152858,0.82576,0.91459,1.151769,0.830791,0.902495,1.15068,0.855079,0.926685,1.152858,0.830791,0.902495,1.15068,0.842935,0.897485,1.150229,0.855079,0.926685,1.152858,0.842935,0.897485,1.150229,0.855079,0.902495,1.15068,0.855079,0.926685,1.152858,0.855079,0.902495,1.15068,0.86011,0.91459,1.151769,0.855079,0.926685,1.152858,0.842935,0.889841,1.235141,0.855079,0.894851,1.235592,0.842935,0.897485,1.150229,0.842935,0.897485,1.150229,0.855079,0.894851,1.235592,0.855079,0.902495,1.15068,0.842935,0.975583,0.153275,0.859762,0.982525,0.1539,0.842935,0.897385,1.021989,0.842935,0.897385,1.021989,0.859762,0.982525,0.1539,0.859762,0.904327,1.022614,0.830791,0.894851,1.235592,0.842935,0.889841,1.235141,0.830791,0.902495,1.15068,0.830791,0.902495,1.15068,0.842935,0.889841,1.235141,0.842935,0.897485,1.150229,0.842935,0.897385,1.021989,0.859762,0.904327,1.022614,0.842935,0.893977,1.086749,0.842935,0.893977,1.086749,0.859762,0.904327,1.022614,0.861573,0.901666,1.087441,0.855079,0.919042,1.23777,0.842935,0.924052,1.23822,0.855079,0.926685,1.152858,0.855079,0.926685,1.152858,0.842935,0.924052,1.23822,0.842935,0.931695,1.153308,0.82576,0.906947,1.236681,0.830791,0.894851,1.235592,0.82576,0.91459,1.151769,0.82576,0.91459,1.151769,0.830791,0.894851,1.235592,0.830791,0.902495,1.15068,0.826108,0.937845,1.025631,0.824296,0.938793,1.090783,0.842935,0.944786,1.026256,0.842935,0.944786,1.026256,0.824296,0.938793,1.090783,0.842935,0.946482,1.091475,0.866731,0.921086,1.024122,0.859762,0.937845,1.025631,0.869294,0.92023,1.089112,0.869294,0.92023,1.089112,0.859762,0.937845,1.025631,0.861573,0.938793,1.090783,0.86011,0.906947,1.236681,0.855079,0.919042,1.23777,0.86011,0.91459,1.151769,0.86011,0.91459,1.151769,0.855079,0.919042,1.23777,0.855079,0.926685,1.152858,0.830791,0.919042,1.23777,0.82576,0.906947,1.236681,0.830791,0.926685,1.152858,0.830791,0.926685,1.152858,0.82576,0.906947,1.236681,0.82576,0.91459,1.151769,0.859762,0.904327,1.022614,0.866731,0.921086,1.024122,0.861573,0.901666,1.087441,0.861573,0.901666,1.087441,0.866731,0.921086,1.024122,0.869294,0.92023,1.089112,0.826108,0.904327,1.022614,0.824296,0.901666,1.087441,0.819138,0.921086,1.024122,0.819138,0.921086,1.024122,0.824296,0.901666,1.087441,0.816576,0.92023,1.089112,0.819138,0.921086,1.024122,0.816576,0.92023,1.089112,0.826108,0.937845,1.025631,0.826108,0.937845,1.025631,0.816576,0.92023,1.089112,0.824296,0.938793,1.090783,0.855079,0.894851,1.235592,0.86011,0.906947,1.236681,0.855079,0.902495,1.15068,0.855079,0.902495,1.15068,0.86011,0.906947,1.236681,0.86011,0.91459,1.151769,0.859762,0.937845,1.025631,0.842935,0.944786,1.026256,0.861573,0.938793,1.090783,0.861573,0.938793,1.090783,0.842935,0.944786,1.026256,0.842935,0.946482,1.091475,0.882065,1.024841,-0.391911,0.882065,0.991054,-0.016574,0.882065,0.956833,-0.398033,0.882065,0.956833,-0.398033,0.882065,0.991054,-0.016574,0.882065,0.923047,-0.022696,-0.895541,1.028294,-0.404706,-0.895541,0.955558,-0.411218,-0.895545,0.992357,-0.003277,-0.895545,0.992357,-0.003277,-0.895541,0.955558,-0.411218,-0.895545,0.919622,-0.009788,0.791553,0.992243,-0.003324,0.791553,1.028377,-0.404736,0.791553,0.919511,-0.009871,0.791553,0.919511,-0.009871,0.791553,1.028377,-0.404736,0.791553,0.955644,-0.411283,-0.791555,0.992357,-0.003276,-0.791555,0.919621,-0.009787,-0.791551,1.028294,-0.404706,-0.791551,1.028294,-0.404706,-0.791555,0.919621,-0.009787,-0.791551,0.955558,-0.411217],\"uv\":[0.976969,0.829143,0.980466,0.830593,0.973471,0.830591,0.967547,0.297495,0.970223,0.300171,0.961084,0.300171,0.96712,0.648444,0.96712,0.652229,0.957981,0.648444,0.947818,0.8994,0.944321,0.897951,0.947818,0.889507,0.960907,0.776902,0.963584,0.774225,0.970046,0.776902,0.975356,0.291575,0.978853,0.290127,0.982351,0.291575,0.371673,0.901752,0.368015,0.914726,0.368015,0.900777,0.905014,0.720969,0.908608,0.734446,0.904415,0.734446,0.127695,0.91875,0.13167,0.917415,0.13167,0.930587,0.92641,0.542298,0.92641,0.529126,0.930385,0.540963,0.926419,0.872004,0.930394,0.870669,0.930394,0.883841,0.913886,0.734446,0.913886,0.721275,0.917861,0.733112,0.917406,0.310872,0.921381,0.309537,0.921381,0.322709,0.913556,0.376728,0.913556,0.363556,0.917532,0.375393,0.459698,0.905999,0.463674,0.904664,0.463674,0.917836,0.913803,0.75984,0.913803,0.746668,0.917778,0.758505,0.917166,0.872004,0.921141,0.870669,0.921141,0.883841,0.917462,0.152681,0.917462,0.139509,0.921437,0.151346,0.532043,0.12902,0.535828,0.128941,0.535828,0.310273,0.604546,0.310261,0.604546,0.128934,0.608331,0.310182,0.81037,0.19311,0.814471,0.192237,0.814471,0.212391,0.673414,0.812798,0.673414,0.792644,0.677515,0.811926,0.893187,0.355288,0.890487,0.355704,0.890487,0.337774,0.89319,0.309238,0.89319,0.327169,0.89049,0.309655,0.285266,0.309848,0.289051,0.309769,0.289051,0.491101,0.532043,0.496881,0.532043,0.315553,0.535828,0.496802,0.917403,0.339109,0.921378,0.337774,0.921378,0.350946,0.29452,0.91671,0.29452,0.903538,0.298495,0.915375,0.607114,0.802097,0.611215,0.801225,0.611215,0.821379,0.179561,0.821283,0.179561,0.801129,0.183663,0.820411,0.643426,0.979685,0.646923,0.981135,0.639928,0.981132,0.968432,0.513347,0.971109,0.516024,0.96197,0.516024,0.968094,0.483336,0.968094,0.487122,0.958955,0.483336,0.947818,0.881888,0.944321,0.880439,0.947818,0.871995,0.963325,0.080708,0.966002,0.078031,0.972464,0.080708,0.975375,0.530575,0.978872,0.529126,0.98237,0.530575,0.810332,0.2794,0.814434,0.278527,0.814434,0.298682,0.804877,0.617912,0.804877,0.597757,0.808978,0.617039,0.265053,0.309848,0.268838,0.309769,0.268838,0.491102,0.25599,0.435424,0.25599,0.25408,0.259775,0.435346,0.913471,0.837425,0.917446,0.83609,0.917446,0.849262,0.917158,0.565506,0.917158,0.552334,0.921133,0.564171,0.810885,0.53343,0.814986,0.532558,0.814986,0.552712,0.805115,0.684496,0.805115,0.664342,0.809217,0.683624,0.818354,0.565229,0.822548,0.565229,0.818354,0.584943,0.818923,0.487819,0.823116,0.468106,0.823116,0.487819,0.477666,0.315632,0.481451,0.315553,0.481451,0.496887,0.029827,0.623185,0.029827,0.441862,0.033612,0.623106,0.870433,0.363351,0.870433,0.367545,0.868179,0.364082,0.989072,0.078031,0.993204,0.078031,0.991362,0.079522,0.853212,0.921633,0.857405,0.921633,0.853212,0.934119,0.917138,0.288328,0.917138,0.275156,0.921113,0.286993,0.805829,0.099103,0.80993,0.09823,0.80993,0.118385,0.069545,0.809323,0.069545,0.789169,0.073647,0.808451,0.450478,0.31563,0.454263,0.315551,0.454263,0.496884,0.10076,0.400714,0.10076,0.219355,0.104544,0.400636,0.991564,0.173929,0.987575,0.172636,0.991564,0.17156,0.994612,0.378583,0.99048,0.378583,0.992322,0.377093,0.595483,0.129013,0.599268,0.128934,0.599268,0.310267,0.233975,0.436592,0.233975,0.255243,0.23776,0.436513,0.541106,0.315632,0.544891,0.315553,0.544891,0.496886,0.504855,0.496889,0.504855,0.315553,0.508639,0.49681,0.805707,0.750644,0.809808,0.749771,0.809808,0.769925,0.273917,0.807693,0.273917,0.787538,0.278018,0.80682,0.438335,0.797285,0.442436,0.796412,0.442436,0.816567,0.428955,0.816567,0.428955,0.796412,0.433057,0.815694,0.513917,0.12902,0.517702,0.128941,0.517702,0.310274,0.450478,0.310273,0.450478,0.128941,0.454263,0.310194,0.686117,0.307527,0.690311,0.307527,0.686848,0.309781,0.994696,0.760088,0.990564,0.760088,0.992406,0.758598,0.322766,0.801946,0.326867,0.801074,0.326867,0.821228,0.776565,0.821856,0.776565,0.801701,0.780667,0.820983,0.276203,0.309848,0.279988,0.309769,0.279988,0.491102,0.323604,0.310305,0.323604,0.128941,0.327389,0.310226,0.091698,0.406065,0.095482,0.405986,0.095482,0.587319,0.613609,0.310258,0.613609,0.128934,0.617393,0.310179,0.808975,0.566102,0.813076,0.565229,0.813076,0.585384,0.809437,0.271529,0.809437,0.251375,0.813538,0.270657,0.80603,0.340674,0.810132,0.339802,0.810132,0.359956,0.803419,0.444147,0.803419,0.423992,0.807521,0.443274,0.350791,0.31566,0.354576,0.315581,0.354576,0.496914,0.142828,0.436591,0.142828,0.255244,0.146612,0.436512,0.604545,0.315632,0.60833,0.315553,0.60833,0.496885,0.58642,0.310268,0.58642,0.128934,0.590205,0.310189,0.357869,0.991212,0.35388,0.989919,0.357869,0.988842,0.994616,0.818344,0.990485,0.818344,0.992327,0.816853,0.907359,0.408131,0.903166,0.408131,0.906628,0.405877,0.549454,0.97496,0.553586,0.97496,0.551744,0.976451,0.819587,0.502167,0.823781,0.502167,0.819588,0.52188,0.819291,0.32925,0.823484,0.309537,0.823484,0.32925,0.785945,0.802574,0.790046,0.801701,0.790046,0.821856,0.558873,0.820347,0.558873,0.800192,0.562975,0.819474,0.822422,0.921633,0.826615,0.921633,0.822422,0.934119,0.914221,0.235559,0.914221,0.222387,0.918196,0.234224,0.99024,0.626486,0.986726,0.624198,0.990857,0.624198,0.99332,0.595544,0.989189,0.595544,0.991031,0.594054,0.73991,0.802134,0.744011,0.801262,0.744011,0.821416,0.81541,0.359956,0.81541,0.339802,0.819511,0.359084,0.597734,0.802097,0.601836,0.801225,0.601836,0.821379,0.616493,0.821379,0.616493,0.801225,0.620595,0.820507,0.314542,0.315664,0.318327,0.315584,0.318327,0.496918,0.414228,0.3103,0.414228,0.128941,0.418012,0.310222,0.343731,0.905278,0.347706,0.903943,0.347706,0.917115,0.914394,0.262729,0.914394,0.249557,0.918369,0.261394,0.271107,0.902925,0.274765,0.901949,0.274765,0.915898,0.809618,0.897925,0.809618,0.883976,0.81367,0.896845,0.986286,0.836127,0.990479,0.836127,0.987017,0.838381,0.67363,0.99261,0.677762,0.99261,0.67592,0.994101,0.795705,0.694797,0.799807,0.693924,0.799807,0.714079,0.800057,0.271529,0.800057,0.251375,0.804159,0.270657,0.137384,0.91875,0.141359,0.917415,0.141359,0.930587,0.923072,0.801845,0.923072,0.788674,0.927047,0.800511,0.445075,0.483755,0.441415,0.4968,0.441415,0.482784,0.898228,0.870669,0.902417,0.884044,0.898228,0.88423,0.359853,0.315652,0.363638,0.315573,0.363638,0.496906,0.58642,0.496879,0.58642,0.315553,0.590205,0.4968,0.604116,0.921037,0.607895,0.921247,0.604116,0.934557,0.900874,0.205667,0.905052,0.192477,0.905052,0.206026,0.990283,0.203141,0.986769,0.200853,0.990901,0.200853,0.465194,0.995468,0.461062,0.995468,0.462904,0.993978,0.912652,0.164291,0.908994,0.177265,0.908994,0.163316,0.905522,0.249557,0.909116,0.263035,0.904923,0.263035,0.474476,0.913684,0.478451,0.912349,0.478451,0.925521,0.917235,0.053523,0.917235,0.040351,0.921211,0.052188,0.468695,0.483835,0.472388,0.483003,0.472388,0.49681,0.904101,0.376716,0.908278,0.363556,0.908278,0.377076,0.51675,0.921195,0.515998,0.934665,0.512964,0.921195,0.909094,0.309238,0.912128,0.322709,0.907935,0.322709,0.477666,0.12902,0.481451,0.128941,0.481451,0.310275,0.186537,0.436584,0.186537,0.255243,0.190322,0.436505,0.87058,0.921188,0.869828,0.934687,0.866794,0.921188,0.904325,0.3871,0.907359,0.400599,0.903166,0.400599,0.917166,0.909292,0.921141,0.907957,0.921141,0.921129,0.907913,0.921428,0.907913,0.908256,0.911888,0.920093,0.727025,0.918508,0.73081,0.918508,0.727216,0.932056,0.898228,0.902883,0.902417,0.889508,0.902417,0.903068,0.428955,0.91298,0.43293,0.911645,0.43293,0.924817,0.920628,0.071972,0.920628,0.058801,0.924603,0.070637,0.927183,0.163316,0.930969,0.163316,0.927375,0.176863,0.899527,0.176691,0.903716,0.163316,0.903716,0.176876,0.926411,0.553669,0.930386,0.552334,0.930386,0.565506,0.914359,0.644677,0.914359,0.631505,0.918334,0.643342,0.913988,0.193452,0.91033,0.206426,0.91033,0.192477,0.904947,0.788674,0.908541,0.802152,0.904347,0.802152,0.7702,0.939851,0.773715,0.942139,0.769583,0.942139,0.363147,0.995588,0.367279,0.995588,0.365437,0.997078,0.91793,0.164651,0.921905,0.163316,0.921905,0.176488,0.409984,0.919022,0.409984,0.90585,0.41396,0.917687,0.439634,0.894012,0.436933,0.894428,0.436933,0.876498,0.884033,0.723338,0.884033,0.741267,0.881333,0.723754,0.274765,0.921176,0.274013,0.934675,0.27098,0.921176,0.904804,0.577313,0.907838,0.590812,0.903645,0.590812,0.406426,0.992517,0.403902,0.991472,0.408951,0.991472,0.476408,0.977669,0.474476,0.975737,0.481072,0.975737,0.37661,0.976297,0.375565,0.973773,0.382704,0.973773,0.970528,0.357819,0.970528,0.355087,0.977124,0.355087,0.870923,0.559594,0.872854,0.557662,0.877519,0.559594,0.766335,0.418331,0.768859,0.417285,0.771383,0.418331,0.027713,0.917879,0.031688,0.916544,0.031688,0.929716,0.926489,0.053522,0.926489,0.040351,0.930463,0.052188,0.795572,0.225629,0.799674,0.224756,0.799674,0.244911,0.800532,0.329691,0.800532,0.309537,0.804634,0.328819,0.70879,0.896304,0.70609,0.89672,0.70609,0.878791,0.896959,0.058801,0.896959,0.07673,0.894258,0.059217,0.655374,0.92162,0.654623,0.93509,0.651588,0.92162,0.909149,0.139509,0.912183,0.15298,0.90799,0.15298,0.705097,0.90283,0.70879,0.901998,0.70879,0.915806,0.904015,0.848902,0.908193,0.835742,0.908193,0.849262,0.52298,0.12902,0.526765,0.128941,0.526765,0.310274,0.550169,0.310269,0.550169,0.128941,0.553954,0.31019,0.629121,0.894376,0.626421,0.894792,0.626421,0.876863,0.85613,0.879975,0.85613,0.897904,0.85343,0.880391,0.262245,0.798328,0.266347,0.797455,0.266347,0.817609,0.371884,0.818507,0.371884,0.798353,0.375986,0.817635,0.336486,0.8966,0.333786,0.897017,0.333786,0.879087,0.606902,0.878743,0.606902,0.896673,0.604202,0.87916,0.890813,0.381069,0.888112,0.381486,0.888112,0.363556,0.892485,0.631505,0.892485,0.649435,0.889785,0.631922,0.81541,0.366107,0.819511,0.365234,0.819511,0.385389,0.814401,0.180257,0.814401,0.160102,0.818503,0.179385,0.419841,0.920855,0.423621,0.921065,0.419841,0.934375,0.900493,0.426848,0.904671,0.413658,0.904671,0.427207,0.285266,0.802929,0.289368,0.802057,0.289368,0.822211,0.168527,0.821283,0.168527,0.801129,0.172629,0.820411,0.443954,0.900682,0.447612,0.899706,0.447612,0.913655,0.616156,0.897214,0.616156,0.883265,0.620208,0.896133,0.128362,0.606759,0.124703,0.619804,0.124703,0.605788,0.898634,0.116301,0.902823,0.129677,0.898634,0.129862,0.598924,0.896257,0.596224,0.896673,0.596224,0.878743,0.071546,0.702487,0.071546,0.720416,0.068846,0.702903,0.818816,0.251375,0.82301,0.251375,0.818816,0.271088,0.146817,0.81643,0.146817,0.796276,0.150919,0.815558,0.002639,0.794086,0.006741,0.793214,0.006741,0.813368,0.810208,0.522321,0.810208,0.502167,0.814309,0.521449,0.455663,0.899386,0.452931,0.899386,0.455662,0.881665,0.546996,0.881401,0.544265,0.899121,0.544264,0.881401,0.89907,0.764388,0.896338,0.764388,0.899068,0.746668,0.899069,0.769876,0.896339,0.787596,0.896337,0.769876,0.909949,0.414634,0.913607,0.413658,0.913607,0.427607,0.894315,0.591262,0.894315,0.577313,0.898367,0.590181,0.461704,0.799541,0.465805,0.798668,0.465805,0.818822,0.812799,0.444147,0.812799,0.423992,0.8169,0.443274,0.826397,0.897488,0.823697,0.897905,0.823697,0.879975,0.885378,0.116301,0.885378,0.134231,0.882677,0.116718,0.572842,0.896922,0.570141,0.897338,0.570141,0.879408,0.667463,0.879962,0.667463,0.897891,0.664763,0.880378,0.52298,0.315632,0.526765,0.315553,0.526765,0.496885,0.550169,0.496881,0.550169,0.315553,0.553954,0.496802,0.094062,0.894382,0.091362,0.894798,0.091362,0.876868,0.082794,0.876868,0.082794,0.894798,0.080094,0.877285,0.911977,0.433856,0.908318,0.446901,0.908318,0.432885,0.898734,0.275612,0.902923,0.288987,0.898734,0.289172,0.499877,0.992222,0.497353,0.991176,0.502401,0.991176,0.801039,0.977626,0.799107,0.975694,0.805703,0.975694,0.369241,0.976297,0.363147,0.973773,0.370287,0.973773,0.966642,0.578822,0.967688,0.576298,0.973782,0.578822,0.187455,0.444257,0.189387,0.442325,0.194051,0.444257,0.845442,0.385402,0.847966,0.384357,0.850491,0.385402,0.796651,0.340674,0.800752,0.339802,0.800752,0.359956,0.799595,0.585384,0.799595,0.565229,0.803697,0.584511,0.559069,0.921066,0.562848,0.921276,0.559069,0.934586,0.191791,0.906489,0.195968,0.893299,0.195969,0.906848,0.991637,0.540027,0.987648,0.538734,0.991637,0.537658,0.992673,0.957598,0.988541,0.957598,0.990382,0.956107,0.987333,0.631894,0.990848,0.634182,0.986716,0.634182,0.443954,0.993381,0.448086,0.993381,0.446244,0.994872,0.486729,0.12902,0.490514,0.128941,0.490514,0.310275,0.177475,0.436584,0.177475,0.255243,0.181259,0.436505,0.917157,0.530461,0.921132,0.529126,0.921132,0.542298,0.396573,0.934126,0.400766,0.921639,0.400766,0.934125,0.919896,0.694832,0.923871,0.693497,0.923871,0.706669,0.536254,0.917571,0.536254,0.904399,0.540229,0.916236,0.893356,0.133815,0.890656,0.134231,0.890656,0.116301,0.89295,0.870669,0.89295,0.888599,0.890249,0.871085,0.990284,0.19544,0.986769,0.193152,0.990901,0.193152,0.994988,0.768393,0.990857,0.768393,0.992699,0.766903,0.414228,0.315658,0.418013,0.315579,0.418013,0.496912,0.10076,0.587319,0.10076,0.405992,0.104545,0.58724,0.79024,0.982905,0.794434,0.982905,0.790971,0.985158,0.990641,0.047958,0.994773,0.047958,0.992931,0.049448,0.923056,0.771211,0.927031,0.769876,0.927031,0.783048,0.913271,0.610929,0.913271,0.597757,0.917246,0.609594,0.314471,0.897803,0.311771,0.898219,0.311771,0.88029,0.287966,0.88033,0.287966,0.89826,0.285266,0.880747,0.513917,0.315632,0.517702,0.315553,0.517702,0.496885,0.405166,0.3103,0.405166,0.128941,0.40895,0.310222,0.990265,0.251447,0.986751,0.249159,0.990883,0.249159,0.992608,0.7881,0.988476,0.7881,0.990318,0.786609,0.913562,0.811443,0.917537,0.810108,0.917537,0.82328,0.201449,0.925298,0.201449,0.912126,0.205424,0.923963,0.714068,0.90283,0.717762,0.901998,0.717762,0.915806,0.06936,0.908014,0.073538,0.894853,0.073538,0.908373,0.99008,0.748922,0.985887,0.748922,0.98935,0.746668,0.904923,0.268313,0.909055,0.268313,0.907213,0.269804,0.405166,0.315657,0.408951,0.315579,0.408951,0.496911,0.115641,0.436591,0.115641,0.255244,0.119425,0.436512,0.545507,0.905734,0.549482,0.904399,0.549482,0.917571,0.059904,0.926823,0.059904,0.913651,0.063879,0.925488,0.387041,0.315651,0.390826,0.315572,0.390826,0.496905,0.314542,0.310305,0.314542,0.128941,0.318326,0.310226,0.667274,0.921619,0.666523,0.935089,0.663488,0.921619,0.138325,0.898667,0.141359,0.912137,0.137166,0.912137,0.865727,0.415972,0.86992,0.415972,0.866457,0.418226,0.994773,0.041242,0.990641,0.041242,0.992483,0.039751,0.528018,0.921195,0.527266,0.934694,0.524232,0.921195,0.904873,0.693497,0.907907,0.706996,0.903714,0.706996,0.468603,0.12902,0.472388,0.128941,0.472388,0.310275,0.199329,0.436584,0.199329,0.255243,0.203114,0.436505,0.504855,0.12902,0.508639,0.128941,0.508639,0.310274,0.396103,0.310294,0.396103,0.128941,0.399888,0.310215,0.890456,0.681855,0.887756,0.682272,0.887756,0.664342,0.879639,0.192477,0.879639,0.210407,0.876939,0.192893,0.223799,0.908916,0.223799,0.913109,0.221545,0.909646,0.627959,0.992615,0.632091,0.992615,0.630249,0.994106,0.922724,0.837425,0.926699,0.83609,0.926699,0.849261,0.182085,0.919346,0.182085,0.906174,0.18606,0.918011,0.926993,0.463872,0.930778,0.463872,0.927185,0.477419,0.898753,0.542501,0.902942,0.529126,0.902942,0.542686,0.9788,0.172534,0.982297,0.173983,0.975302,0.173983,0.967148,0.258099,0.969825,0.260776,0.960685,0.260776,0.280725,0.957519,0.280725,0.961304,0.271585,0.957519,0.947809,0.555505,0.944312,0.554057,0.947809,0.545613,0.960939,0.278122,0.963615,0.275445,0.970078,0.278122,0.975375,0.539107,0.978872,0.537658,0.98237,0.539107,0.893799,0.512731,0.891099,0.513147,0.891099,0.495217,0.893475,0.529126,0.893475,0.547056,0.890775,0.529542,0.926508,0.43422,0.930483,0.432885,0.930483,0.446057,0.923057,0.75984,0.923057,0.746668,0.927032,0.758505,0.422664,0.872726,0.419963,0.873142,0.419963,0.855212,0.882533,0.597757,0.882533,0.615687,0.879832,0.598174,0.875913,0.153315,0.875913,0.157508,0.873659,0.154045,0.114174,0.995363,0.118306,0.995363,0.116464,0.996853,0.985831,0.33879,0.990025,0.33879,0.986562,0.341044,0.793255,0.65861,0.789123,0.65861,0.790965,0.65712,0.990044,0.269961,0.985851,0.269961,0.989313,0.267707,0.990188,0.936726,0.99432,0.936726,0.992478,0.938217,0.990139,0.319694,0.986625,0.317407,0.990756,0.317407,0.132832,0.996853,0.128701,0.996853,0.130542,0.995363,0.903714,0.712274,0.907907,0.712274,0.904445,0.714528,0.331117,0.995467,0.335249,0.995467,0.333407,0.996958,0.990346,0.30047,0.986832,0.298182,0.990963,0.298182,0.089438,0.994111,0.085307,0.994111,0.087149,0.992621,0.987442,0.730505,0.990957,0.732792,0.986825,0.732792,0.990261,0.577355,0.994393,0.577355,0.992551,0.578845,0.980279,0.794922,0.977755,0.793876,0.982803,0.793876,0.344698,0.977433,0.342766,0.975501,0.349362,0.975501,0.460317,0.975227,0.459271,0.972703,0.466411,0.972703,0.966873,0.241408,0.967918,0.238884,0.974012,0.241408,0.919787,0.976549,0.921719,0.974617,0.926383,0.976549,0.615317,0.984544,0.617841,0.983499,0.620365,0.984544,0.515664,0.89705,0.512964,0.897467,0.512964,0.879537,0.244172,0.876703,0.244172,0.894633,0.241471,0.877119,0.884542,0.267071,0.881841,0.267487,0.881841,0.249557,0.885497,0.552334,0.885497,0.570264,0.882797,0.55275,0.898521,0.615478,0.895789,0.615478,0.898521,0.597757,0.898613,0.085598,0.895881,0.103318,0.895881,0.085598,0.654099,0.897475,0.651399,0.897892,0.651399,0.879962,0.885211,0.309238,0.885211,0.327169,0.882511,0.309655,0.583588,0.897308,0.580888,0.897724,0.580888,0.879794,0.897888,0.3871,0.897888,0.40503,0.895188,0.387516,0.795104,0.897489,0.792404,0.897905,0.792404,0.879975,0.121009,0.880002,0.121009,0.897932,0.118309,0.880418,0.303923,0.897844,0.301223,0.89826,0.301223,0.88033,0.885594,0.432885,0.885594,0.450815,0.882894,0.433301,0.530172,0.64716,0.525084,0.64746,0.525084,0.557147,0.480857,0.557144,0.475536,0.647299,0.475312,0.557144,0.552622,0.933072,0.547077,0.933072,0.551699,0.922849,0.936271,0.249557,0.936271,0.260776,0.9329,0.251081,0.366243,0.647185,0.361156,0.647485,0.361156,0.557173,0.613652,0.502167,0.613652,0.592479,0.608117,0.502493,0.355878,0.647185,0.350791,0.647485,0.350791,0.557173,0.440243,0.50219,0.440243,0.592502,0.434708,0.502516,0.463576,0.647165,0.458489,0.647466,0.458489,0.557153,0.381159,0.406592,0.381159,0.496905,0.375623,0.406919,0.38071,0.647176,0.375623,0.647476,0.375623,0.557163,0.340558,0.502196,0.340558,0.592507,0.335022,0.502522,0.391075,0.647176,0.385988,0.647476,0.385988,0.557163,0.606225,0.002639,0.606225,0.092952,0.600689,0.002966,0.656486,0.592179,0.651399,0.592479,0.651399,0.502167,0.510399,0.557147,0.505077,0.647303,0.504855,0.557147,0.453211,0.647165,0.448124,0.647466,0.448124,0.557153,0.40895,0.50219,0.40895,0.592502,0.403414,0.502516,0.174217,0.932225,0.168672,0.932225,0.173293,0.922003,0.939034,0.552334,0.939034,0.563553,0.935664,0.553858,0.232903,0.928072,0.227851,0.930356,0.227851,0.919137,0.936097,0.222387,0.936097,0.233606,0.932727,0.223911,0.541799,0.933072,0.536254,0.933072,0.540876,0.922849,0.939015,0.275156,0.939015,0.286375,0.935644,0.27668,0.631454,0.928232,0.626401,0.930516,0.626401,0.919298,0.939259,0.116301,0.939259,0.12752,0.935889,0.117825,0.449007,0.927867,0.443954,0.930152,0.443954,0.918933,0.939131,0.432885,0.939131,0.444104,0.935761,0.434409,0.326765,0.932212,0.321242,0.931713,0.326765,0.921947,0.939167,0.494828,0.939167,0.506047,0.935797,0.496352,0.699346,0.933033,0.693801,0.933033,0.698423,0.92281,0.939043,0.906004,0.939043,0.917223,0.935672,0.907528,0.783015,0.904518,0.77904,0.916355,0.77904,0.903183,0.930394,0.889508,0.930394,0.902679,0.926419,0.901345,0.23536,0.980112,0.238857,0.981562,0.231862,0.981559,0.96742,0.529126,0.970097,0.531803,0.960957,0.531803,0.96846,0.843336,0.96846,0.847121,0.95932,0.843336,0.959211,0.09412,0.959211,0.090335,0.96835,0.090335,0.963641,0.56346,0.966318,0.560783,0.97278,0.56346,0.459271,0.981954,0.462769,0.980505,0.466266,0.981954,0.895215,0.426527,0.891163,0.427607,0.891163,0.413658,0.423621,0.901628,0.423621,0.915577,0.419963,0.902603,0.917191,0.665677,0.913216,0.677514,0.913216,0.664342,0.684366,0.912529,0.684366,0.925701,0.680391,0.924366,0.260398,0.913421,0.256423,0.925258,0.256423,0.912086,0.699346,0.90436,0.699346,0.917532,0.695371,0.916197,0.870846,0.895744,0.866794,0.896824,0.866794,0.882876,0.64039,0.900071,0.64039,0.91402,0.636732,0.901046,0.655374,0.904504,0.651399,0.916342,0.651399,0.90317,0.930394,0.907957,0.930394,0.921129,0.926419,0.919794,0.843628,0.904517,0.839653,0.916355,0.839653,0.903183,0.917778,0.769876,0.917778,0.783048,0.913803,0.781713,0.528208,0.90408,0.524232,0.915917,0.524232,0.902745,0.92659,0.085598,0.92659,0.098769,0.922615,0.097435,0.137551,0.44187,0.137551,0.62317,0.133766,0.44187,0.002639,0.441862,0.006424,0.623176,0.002639,0.623176,0.818358,0.59863,0.814256,0.617912,0.814256,0.597757,0.800873,0.723687,0.800873,0.743841,0.796771,0.742969,0.882797,0.54664,0.885497,0.529126,0.885497,0.547056,0.262624,0.894601,0.262624,0.876671,0.265324,0.877088,0.224969,0.44187,0.224969,0.62317,0.221183,0.44187,0.21212,0.44187,0.215905,0.62317,0.21212,0.62317,0.921547,0.117636,0.917572,0.129473,0.917572,0.116301,0.516939,0.902745,0.516939,0.915917,0.512964,0.914582,0.526445,0.801194,0.522343,0.820476,0.522343,0.800321,0.093575,0.796782,0.093575,0.816937,0.089473,0.816064,0.978892,0.00295,0.982389,0.004398,0.975394,0.004398,0.967439,0.00295,0.970116,0.005627,0.960977,0.005627,0.33513,0.940129,0.336579,0.943626,0.326687,0.943626,0.947818,0.917223,0.944321,0.915774,0.947818,0.907331,0.96065,0.642137,0.963327,0.63946,0.96979,0.642137,0.975302,0.166282,0.9788,0.164833,0.982297,0.166282,0.732395,0.797812,0.728293,0.817094,0.728293,0.796939,0.13327,0.79195,0.13327,0.812105,0.129169,0.811232,0.626456,0.315553,0.626456,0.496851,0.622671,0.315553,0.215905,0.255243,0.215905,0.436592,0.212121,0.436513,0.022435,0.917879,0.01846,0.929716,0.01846,0.916544,0.765675,0.921633,0.769869,0.934119,0.765675,0.934119,0.799425,0.802574,0.795324,0.821856,0.795324,0.801701,0.805689,0.052071,0.805689,0.072225,0.801587,0.071353,0.812176,0.632138,0.808074,0.65142,0.808074,0.631265,0.75339,0.801262,0.75339,0.821416,0.749289,0.820544,0.653648,0.128934,0.653648,0.310223,0.649863,0.128934,0.658926,0.315553,0.662711,0.496841,0.658926,0.496841,0.991089,0.158106,0.991707,0.160394,0.987575,0.160394,0.231862,0.993585,0.235994,0.993585,0.233704,0.995076,0.926499,0.599092,0.922524,0.610929,0.922524,0.597757,0.593472,0.905663,0.593473,0.918835,0.589497,0.9175,0.80493,0.503039,0.800828,0.522321,0.800828,0.502167,0.819712,0.278527,0.823905,0.298241,0.819712,0.298241,0.463326,0.315644,0.459541,0.496895,0.459541,0.315565,0.265053,0.49638,0.268839,0.677656,0.265053,0.677656,0.615994,0.978214,0.616725,0.97596,0.620187,0.978214,0.99332,0.609723,0.989189,0.609723,0.991478,0.608232,0.463325,0.12902,0.459541,0.310287,0.459541,0.128941,0.599267,0.315553,0.599267,0.496886,0.595483,0.496807,0.146613,0.44187,0.146613,0.623178,0.142828,0.44187,0.677054,0.128934,0.680839,0.310218,0.677054,0.310218,0.412403,0.80258,0.408301,0.821862,0.408301,0.801708,0.804995,0.128934,0.804995,0.149088,0.800893,0.148216,0.421782,0.80258,0.417681,0.821862,0.417681,0.801708,0.81931,0.09823,0.81931,0.118385,0.815208,0.117512,0.224968,0.255322,0.221183,0.436592,0.221183,0.255243,0.059195,0.255243,0.059195,0.436592,0.055411,0.436513,0.726393,0.942472,0.724106,0.943089,0.724106,0.938958,0.992027,0.657982,0.996158,0.657982,0.993868,0.659473,0.639902,0.797921,0.6358,0.817202,0.6358,0.797048,0.109046,0.801728,0.109046,0.821883,0.104945,0.82101,0.024549,0.255323,0.020764,0.436584,0.020764,0.255244,0.006424,0.255244,0.006424,0.436584,0.002639,0.436505,0.617393,0.315632,0.613608,0.496875,0.613608,0.315553,0.563016,0.315553,0.563016,0.496888,0.559232,0.496809,0.665064,0.802129,0.665064,0.821842,0.66087,0.802129,0.118426,0.801728,0.118426,0.821883,0.114324,0.82101,0.385365,0.799225,0.381264,0.818507,0.381264,0.798353,0.800429,0.749771,0.800429,0.769925,0.796327,0.769053,0.662712,0.128934,0.662712,0.310223,0.658926,0.128934,0.631735,0.128934,0.635521,0.310224,0.631735,0.310225,0.172196,0.255323,0.168412,0.436591,0.168412,0.255244,0.572079,0.315553,0.572079,0.496887,0.568294,0.496808,0.403902,0.986193,0.404633,0.983939,0.408095,0.986193,0.993394,0.967847,0.989263,0.967847,0.991552,0.966356,0.832088,0.929329,0.834375,0.928711,0.834375,0.932843,0.834554,0.990996,0.830422,0.990996,0.832712,0.989505,0.805054,0.2794,0.800953,0.298682,0.800953,0.278527,0.818433,0.224756,0.818433,0.244911,0.814331,0.244038,0.809808,0.776076,0.805707,0.795358,0.805707,0.775203,0.815068,0.052071,0.815068,0.072225,0.810967,0.071353,0.884971,0.913989,0.880996,0.925826,0.880996,0.912654,0.857405,0.903183,0.857405,0.916354,0.85343,0.91502,0.990189,0.328536,0.990807,0.330823,0.986675,0.330823,0.898465,0.356613,0.902597,0.356613,0.900307,0.358103,0.819188,0.801508,0.815086,0.82079,0.815086,0.800636,0.028256,0.796187,0.028256,0.816341,0.024154,0.815468,0.517065,0.801194,0.512964,0.820476,0.512964,0.800321,0.084195,0.796782,0.084195,0.816937,0.080094,0.816064,0.644584,0.315553,0.644584,0.496842,0.640798,0.315553,0.296417,0.496379,0.300203,0.677656,0.296417,0.677656,0.487704,0.913684,0.483729,0.925521,0.483729,0.912349,0.930366,0.275156,0.930366,0.288328,0.926391,0.286993,0.91535,0.059776,0.911693,0.072749,0.911693,0.058801,0.905348,0.222387,0.908942,0.235865,0.904749,0.235865,0.35464,0.976118,0.356928,0.975501,0.356928,0.979632,0.994612,0.365046,0.99048,0.365046,0.99277,0.363556,0.818663,0.016559,0.814562,0.035841,0.814562,0.015686,0.809186,0.693924,0.809186,0.714079,0.805085,0.713206,0.583588,0.904337,0.579613,0.916174,0.579613,0.903002,0.195766,0.912126,0.195766,0.925298,0.191791,0.923963,0.902486,0.053523,0.898297,0.053337,0.902486,0.039962,0.507682,0.913959,0.504088,0.927506,0.503896,0.913959,0.015486,0.255323,0.011702,0.436584,0.011702,0.255244,0.345513,0.128941,0.345513,0.310296,0.341729,0.310217,0.757059,0.921074,0.756308,0.934573,0.753274,0.921074,0.881937,0.893877,0.884971,0.907376,0.880778,0.907376,0.991586,0.774225,0.991586,0.776594,0.987597,0.775518,0.994773,0.056216,0.990641,0.056216,0.992931,0.054726,0.275159,0.895591,0.271107,0.896671,0.271107,0.882723,0.083752,0.900076,0.083752,0.914025,0.080094,0.901052,0.926523,0.017348,0.922548,0.029185,0.922548,0.016013,0.562848,0.902616,0.562848,0.915788,0.558873,0.914453,0.802892,0.921633,0.802141,0.935103,0.799107,0.921633,0.128855,0.898667,0.131888,0.912137,0.127695,0.912137,0.908525,0.783396,0.904347,0.783036,0.908525,0.769876,0.336486,0.902295,0.336486,0.916102,0.332793,0.903126,0.581142,0.315632,0.577357,0.49688,0.577357,0.315553,0.4452,0.128941,0.4452,0.310281,0.441415,0.310202,0.906415,0.072349,0.902237,0.071991,0.906415,0.058801,0.932929,0.693707,0.929149,0.707017,0.929149,0.693497,0.769651,0.904518,0.765675,0.916355,0.765675,0.903183,0.384069,0.902935,0.384069,0.916107,0.380094,0.914772,0.911879,0.553305,0.908221,0.56635,0.908221,0.552334,0.898465,0.337774,0.902654,0.351149,0.898465,0.351335,0.803082,0.904517,0.799107,0.916355,0.799107,0.903183,0.813594,0.903203,0.813594,0.916375,0.809618,0.91504,0.507682,0.895635,0.504023,0.908681,0.504023,0.894665,0.898851,0.432885,0.90304,0.44626,0.898851,0.446446,0.917794,0.790009,0.913819,0.801846,0.913819,0.788674,0.792268,0.903183,0.792268,0.916355,0.788293,0.91502,0.893019,0.052442,0.888967,0.053523,0.888967,0.039574,0.912202,0.494828,0.912202,0.508777,0.908544,0.495804,0.987648,0.531495,0.987648,0.529126,0.991637,0.530202,0.990485,0.810085,0.994616,0.810085,0.992326,0.811575,0.152044,0.908553,0.148069,0.92039,0.148069,0.907218,0.498542,0.913463,0.498542,0.926635,0.494567,0.9253,0.887835,0.0332,0.890535,0.015686,0.890535,0.033616,0.882567,0.157439,0.882567,0.139509,0.885267,0.139926,0.478451,0.907071,0.474273,0.906712,0.478451,0.893522,0.345513,0.483605,0.341733,0.496914,0.341733,0.483394,0.990672,0.666331,0.988148,0.665285,0.993197,0.665285,0.593419,0.977447,0.591487,0.975515,0.598083,0.975515,0.130963,0.976073,0.129917,0.973548,0.137057,0.973548,0.965515,0.96888,0.966561,0.966356,0.972655,0.96888,0.819419,0.977481,0.821351,0.97555,0.826015,0.977481,0.9817,0.659028,0.984224,0.657982,0.986749,0.659028,0.35696,0.905278,0.352984,0.917115,0.352984,0.903943,0.073538,0.913651,0.073538,0.926823,0.069563,0.925488,0.809053,0.225629,0.804952,0.244911,0.804952,0.224756,0.814375,0.128934,0.814375,0.149089,0.810273,0.148216,0.460941,0.899386,0.460941,0.881665,0.463674,0.899386,0.355716,0.898665,0.352984,0.880945,0.355716,0.880945,0.908284,0.82328,0.904106,0.82292,0.908284,0.809759,0.74261,0.901988,0.74261,0.915796,0.738917,0.90282,0.583399,0.921452,0.582648,0.934923,0.579613,0.921452,0.90926,0.116301,0.912294,0.129772,0.908101,0.129772,0.63552,0.315553,0.63552,0.496851,0.631734,0.315553,0.168412,0.441869,0.172197,0.62318,0.168412,0.62318,0.753274,0.896294,0.755974,0.87878,0.755974,0.89671,0.879857,0.033616,0.879857,0.015686,0.882557,0.016103,0.719571,0.800447,0.71547,0.819729,0.71547,0.799575,0.710192,0.799575,0.710192,0.819729,0.70609,0.818857,0.396573,0.897494,0.399273,0.879981,0.399273,0.897911,0.765675,0.897905,0.765675,0.879975,0.768376,0.880391,0.17665,0.897858,0.17935,0.880345,0.17935,0.898275,0.880934,0.853672,0.880934,0.835742,0.883634,0.836158,0.244047,0.797489,0.239946,0.816771,0.239946,0.796617,0.312321,0.796111,0.312321,0.816265,0.30822,0.815393,0.708883,0.921084,0.708131,0.934583,0.705097,0.921084,0.90505,0.085598,0.908084,0.099096,0.903891,0.099096,0.498749,0.784291,0.494648,0.803573,0.494648,0.783418,0.799599,0.597757,0.799599,0.617912,0.795497,0.617039,0.912461,0.465222,0.908804,0.478196,0.908804,0.464247,0.028312,0.897788,0.031906,0.911266,0.027713,0.911266,0.152259,0.90194,0.148069,0.901755,0.152259,0.88838,0.930611,0.116301,0.927017,0.129849,0.926825,0.116301,0.887209,0.404614,0.889909,0.3871,0.889909,0.40503,0.884917,0.210407,0.884917,0.192477,0.887618,0.192894,0.809123,0.160975,0.805021,0.180257,0.805021,0.160102,0.348882,0.791564,0.348882,0.811718,0.344781,0.810846,0.823846,0.128934,0.823846,0.148648,0.819653,0.128934,0.536254,0.804135,0.540447,0.823848,0.536254,0.823848,0.887902,0.103111,0.890603,0.085598,0.890603,0.103527,0.558873,0.897338,0.558873,0.879408,0.561573,0.879824,0.889646,0.24227,0.892346,0.224756,0.892346,0.242686,0.293244,0.89826,0.293244,0.88033,0.295945,0.880747,0.09502,0.901051,0.091362,0.914025,0.091362,0.900076,0.908295,0.870669,0.911888,0.884147,0.907695,0.884147,0.256967,0.798327,0.252866,0.817609,0.252866,0.797455,0.819805,0.390721,0.819805,0.410875,0.815703,0.410003,0.881806,0.649019,0.884507,0.631505,0.884507,0.649435,0.727025,0.894004,0.727025,0.876074,0.729725,0.87649,0.880381,0.764181,0.883081,0.746668,0.883081,0.764598,0.360995,0.895499,0.360995,0.877569,0.363695,0.877985,0.119426,0.441948,0.115641,0.623182,0.115641,0.441869,0.285266,0.496379,0.289052,0.677665,0.285266,0.677665,0.896096,0.82748,0.896096,0.809759,0.898828,0.82748,0.698103,0.899082,0.695371,0.881362,0.698103,0.881362,0.161726,0.90194,0.157537,0.901755,0.161726,0.88838,0.932304,0.192477,0.928711,0.206024,0.928519,0.192477,0.005204,0.992993,0.002679,0.991948,0.007728,0.991948,0.68742,0.977247,0.685488,0.975315,0.692084,0.975315,0.118545,0.976073,0.1175,0.973548,0.124639,0.973548,0.274101,0.976825,0.275147,0.974301,0.281241,0.976825,0.839653,0.977481,0.841585,0.975549,0.846249,0.977481,0.835116,0.385402,0.83764,0.384357,0.840164,0.385402,0.805092,0.19311,0.80099,0.212391,0.80099,0.192237,0.584989,0.784437,0.584989,0.804591,0.580888,0.803719,0.572652,0.921066,0.5719,0.934565,0.568866,0.921066,0.904957,0.597757,0.907992,0.611256,0.903799,0.611256,0.987667,0.005319,0.987667,0.00295,0.991656,0.004026,0.997161,0.801846,0.993029,0.801846,0.995319,0.800356,0.987629,0.285769,0.987629,0.2834,0.991618,0.284476,0.989273,0.584599,0.993405,0.584599,0.991115,0.586089,0.572079,0.12902,0.568294,0.310268,0.568294,0.128941,0.581142,0.128941,0.581142,0.310268,0.577357,0.310189,0.054626,0.905784,0.050651,0.917621,0.050651,0.904449,0.921141,0.889508,0.921141,0.902679,0.917166,0.901344,0.315964,0.921947,0.315964,0.934434,0.311771,0.921947,0.116816,0.92166,0.121009,0.934146,0.116816,0.934146,0.381369,0.897241,0.384069,0.879727,0.384069,0.897657,0.879924,0.103528,0.879924,0.085598,0.882624,0.086014,0.991667,0.384428,0.991667,0.386797,0.987678,0.385721,0.278537,0.997033,0.274406,0.997033,0.276696,0.995543,0.436137,0.12902,0.432353,0.310292,0.432353,0.128941,0.649862,0.315553,0.653648,0.496841,0.649862,0.496842,0.851527,0.976167,0.853815,0.975549,0.853815,0.979681,0.437936,0.997088,0.433804,0.997088,0.436094,0.995598,0.927622,0.250892,0.923647,0.262729,0.923647,0.249557,0.92286,0.413658,0.92286,0.42683,0.918885,0.425495,0.845452,0.897488,0.848152,0.879975,0.848152,0.897905,0.88357,0.181246,0.88357,0.163316,0.886271,0.163732,0.279989,0.49638,0.279989,0.677656,0.276203,0.49638,0.640799,0.128934,0.644585,0.310223,0.640799,0.310224,0.990266,0.258887,0.990883,0.261174,0.986751,0.261174,0.99048,0.370324,0.994612,0.370324,0.992322,0.371815,0.172647,0.904888,0.168672,0.916724,0.168672,0.903553,0.923241,0.192477,0.923241,0.205649,0.919266,0.204314,0.336579,0.92138,0.335828,0.93485,0.332793,0.92138,0.909091,0.337774,0.912125,0.351244,0.907932,0.351244,0.810981,0.976312,0.813268,0.975694,0.813268,0.979826,0.098848,0.994111,0.094716,0.994111,0.097006,0.992621,0.626457,0.128934,0.626457,0.310233,0.622671,0.128934,0.159405,0.255244,0.159405,0.436585,0.15562,0.436506,0.315746,0.904833,0.311771,0.916669,0.311771,0.903497,0.917337,0.085598,0.917337,0.09877,0.913362,0.097435,0.033612,0.255323,0.029827,0.436584,0.029827,0.255244,0.071987,0.255244,0.071987,0.436584,0.068203,0.436505,0.908525,0.760188,0.904348,0.759828,0.908525,0.746668,0.607895,0.901951,0.607895,0.915759,0.604202,0.902783,0.882717,0.969042,0.880429,0.969659,0.880429,0.965527,0.989212,0.025497,0.993343,0.025497,0.991054,0.026987,0.684569,0.907251,0.680391,0.906892,0.684569,0.893702,0.327389,0.483608,0.323609,0.496917,0.323609,0.483397,0.02455,0.441862,0.02455,0.623175,0.020764,0.441862,0.233975,0.44187,0.237761,0.62317,0.233975,0.62317,0.680839,0.315553,0.680839,0.496826,0.677053,0.315553,0.050134,0.441871,0.050134,0.623172,0.046348,0.623093,0.881667,0.24227,0.884368,0.224756,0.884368,0.242686,0.882508,0.355704,0.882508,0.337774,0.885209,0.33819,0.99074,0.455033,0.991357,0.45732,0.987226,0.45732,0.641719,0.993158,0.645851,0.993158,0.643561,0.994649,0.927114,0.72261,0.923139,0.734447,0.923139,0.721275,0.902203,0.908346,0.902203,0.921518,0.898228,0.920183,0.911879,0.530097,0.90822,0.543142,0.90822,0.529126,0.898753,0.552334,0.902942,0.565709,0.898753,0.565895,0.978853,0.2834,0.982351,0.284849,0.975356,0.284849,0.967148,0.249557,0.969825,0.252234,0.960685,0.252234,0.931769,0.961042,0.940908,0.961042,0.931769,0.964827,0.032177,0.960085,0.032177,0.963871,0.023037,0.963871,0.032177,0.969149,0.0295,0.971825,0.023037,0.969149,0.982319,0.774225,0.978822,0.775674,0.975324,0.774225,0.889311,0.740851,0.892012,0.723338,0.892012,0.741268,0.890872,0.450815,0.890872,0.432885,0.893573,0.433301,0.400548,0.904524,0.396573,0.916361,0.396573,0.903189,0.242156,0.912647,0.242156,0.925819,0.238181,0.924484,0.524232,0.89705,0.526933,0.879537,0.526933,0.897467,0.319749,0.898219,0.319749,0.88029,0.322449,0.880706,0.990282,0.229114,0.9909,0.231401,0.986768,0.231401,0.07321,0.992621,0.077342,0.992621,0.075052,0.994111,0.573234,0.979503,0.570947,0.98012,0.570947,0.975989,0.991005,0.406465,0.995137,0.406465,0.992847,0.407955,0.528443,0.976714,0.53073,0.976097,0.53073,0.980228,0.993188,0.03397,0.989056,0.03397,0.991346,0.032479,0.990275,0.472815,0.990892,0.475103,0.98676,0.475103,0.104764,0.995363,0.108896,0.995363,0.106606,0.996853,0.831293,0.976167,0.833581,0.97555,0.83358,0.979681,0.892126,0.997009,0.887995,0.997009,0.890285,0.995518,0.991699,0.221466,0.991699,0.223836,0.98771,0.222759,0.150135,0.993898,0.146004,0.993898,0.148293,0.992408,0.987678,0.396257,0.987678,0.393887,0.991667,0.394964,0.013006,0.991948,0.017138,0.991948,0.014848,0.993438,0.990699,0.983006,0.988175,0.98196,0.993223,0.98196,0.660975,0.977614,0.659043,0.975682,0.665639,0.975682,0.947232,0.976682,0.946186,0.974158,0.953326,0.974158,0.168672,0.976638,0.169717,0.974114,0.175811,0.976638,0.970858,0.739704,0.97279,0.737772,0.977454,0.739704,0.824789,0.385402,0.827314,0.384357,0.829838,0.385402,0.895704,0.711217,0.895704,0.693497,0.898436,0.711217,0.404551,0.897911,0.404551,0.879981,0.407252,0.880397,0.77904,0.897488,0.78174,0.879975,0.78174,0.897905,0.714068,0.89672,0.714068,0.878791,0.716769,0.879207,0.882777,0.293125,0.885478,0.275612,0.885478,0.293542,0.831675,0.897905,0.831675,0.879975,0.834375,0.880391,0.73991,0.896294,0.74261,0.87878,0.74261,0.89671,0.88628,0.07673,0.88628,0.058801,0.88898,0.059217,0.888359,0.787389,0.891059,0.769876,0.891059,0.787806,0.887811,0.615687,0.887811,0.597757,0.890511,0.598174,0.892896,0.20999,0.895596,0.192477,0.895596,0.210407,0.887726,0.711426,0.887726,0.693497,0.890426,0.693913,0.891358,0.481761,0.894059,0.464247,0.894059,0.482177,0.898545,0.033407,0.895813,0.015686,0.898545,0.015686,0.819632,0.72456,0.81553,0.743841,0.81553,0.723687,0.813645,0.468106,0.813645,0.48826,0.809543,0.487388,0.879777,0.681855,0.882478,0.664342,0.882478,0.682272,0.341764,0.897017,0.341764,0.879087,0.344464,0.879503,0.160298,0.797148,0.156197,0.81643,0.156197,0.796276,0.819188,0.749771,0.819188,0.769925,0.815086,0.769053,0.447452,0.979908,0.450949,0.981358,0.443954,0.981355,0.96742,0.537658,0.970097,0.540335,0.960958,0.540335,0.67107,0.96174,0.68021,0.96174,0.67107,0.965526,0.967105,0.801018,0.967105,0.804804,0.957966,0.804804,0.970349,0.862714,0.967673,0.865391,0.96121,0.862714,0.982297,0.158106,0.9788,0.159555,0.975302,0.158106,0.76925,0.799345,0.765149,0.818627,0.765149,0.798473,0.018876,0.796187,0.018876,0.816341,0.014775,0.815468,0.819188,0.776076,0.815086,0.795358,0.815086,0.775203,0.810425,0.390721,0.810425,0.410875,0.806324,0.410003,0.801046,0.391594,0.796944,0.410876,0.796944,0.390721,0.802796,0.631265,0.802796,0.65142,0.798695,0.650547,0.700203,0.989218,0.70082,0.991506,0.696688,0.991506,0.241272,0.993585,0.245403,0.993585,0.243114,0.995076,0.298839,0.802057,0.298839,0.82177,0.294646,0.802057,0.545725,0.804135,0.549918,0.823848,0.545725,0.823848,0.13755,0.255323,0.133766,0.436592,0.133766,0.255244,0.055411,0.441871,0.059196,0.623171,0.055411,0.623171,0.671776,0.128934,0.671776,0.31023,0.66799,0.128934,0.095482,0.219355,0.095482,0.400708,0.091698,0.400629,0.67508,0.922504,0.672792,0.923122,0.672792,0.91899,0.989189,0.60125,0.99332,0.60125,0.99103,0.602741,0.234668,0.797489,0.230566,0.816771,0.230566,0.796617,0.821555,0.631265,0.821555,0.65142,0.817454,0.650547,0.390825,0.12902,0.387041,0.310294,0.387041,0.128941,0.3727,0.128941,0.3727,0.310294,0.368916,0.310215,0.630522,0.797921,0.626421,0.817202,0.626421,0.797048,0.805607,0.532558,0.805607,0.552712,0.801505,0.551839,0.071988,0.441862,0.071988,0.623175,0.068203,0.441862,0.199329,0.441862,0.203114,0.623175,0.199329,0.623175,0.403902,0.978661,0.404633,0.976408,0.408096,0.978661,0.992634,0.214712,0.988502,0.214712,0.990792,0.213222,0.69935,0.976604,0.701637,0.975986,0.701637,0.980118,0.99432,0.931448,0.990188,0.931448,0.992478,0.929958,0.572842,0.903951,0.568866,0.915788,0.568866,0.902616,0.121009,0.90321,0.121009,0.916382,0.117034,0.915047,0.99024,0.616633,0.990858,0.61892,0.986726,0.61892,0.989105,0.674015,0.993237,0.674015,0.990947,0.675506,0.08478,0.441861,0.08478,0.623175,0.080994,0.441862,0.243038,0.44071,0.246823,0.622023,0.243038,0.622023,0.92123,0.43422,0.917255,0.446057,0.917255,0.432885,0.839653,0.921633,0.843847,0.934119,0.839653,0.934119,0.181089,0.974731,0.183377,0.974114,0.183377,0.978245,0.901536,0.997009,0.897404,0.997009,0.899694,0.995518,0.18126,0.441862,0.18126,0.623175,0.177475,0.441862,0.363638,0.128941,0.363638,0.310295,0.359853,0.310215,0.991706,0.513654,0.991706,0.516024,0.987717,0.514947,0.551715,0.997262,0.547584,0.997262,0.549873,0.995771,0.926444,0.665677,0.922469,0.677514,0.922469,0.664342,0.620208,0.902492,0.620208,0.915664,0.616233,0.914329,0.084779,0.255323,0.080994,0.436583,0.080994,0.255244,0.667989,0.315553,0.671775,0.496841,0.667989,0.496841,0.917091,0.578648,0.913116,0.590485,0.913116,0.577313,0.926785,0.363556,0.926785,0.376728,0.92281,0.375393,0.667463,0.904504,0.663488,0.916341,0.663488,0.90317,0.921715,0.464247,0.921715,0.477419,0.91774,0.476084,0.92679,0.811443,0.922815,0.82328,0.922815,0.810108,0.324999,0.903497,0.324999,0.916669,0.321024,0.915334,0.987629,0.278122,0.987629,0.275753,0.991618,0.276829,0.989263,0.974694,0.993394,0.974694,0.991105,0.976184,0.006847,0.908062,0.002872,0.919899,0.002872,0.906727,0.926344,0.577313,0.926344,0.590485,0.922369,0.58915,0.990605,0.794922,0.988081,0.793876,0.993129,0.793876,0.825643,0.245845,0.823711,0.243913,0.830307,0.243913,0.104723,0.976073,0.103677,0.973548,0.110817,0.973548,0.208354,0.977068,0.209399,0.974543,0.215493,0.977068,0.579613,0.977447,0.581545,0.975515,0.586209,0.977447,0.816914,0.219478,0.819439,0.218433,0.821963,0.219478,0.536254,0.899121,0.536254,0.881401,0.538986,0.899121,0.898823,0.381276,0.896091,0.363556,0.898823,0.363556,0.259775,0.440782,0.25599,0.622018,0.25599,0.440702,0.128488,0.255244,0.128488,0.436584,0.124703,0.436505,0.880381,0.80372,0.883081,0.786206,0.883081,0.804136,0.230203,0.894633,0.230203,0.876703,0.232903,0.877119,0.630079,0.901046,0.626421,0.914019,0.626421,0.900071,0.018842,0.897788,0.022435,0.911266,0.018242,0.911266,0.888359,0.764182,0.891059,0.746668,0.891059,0.764598,0.800382,0.897905,0.800382,0.879975,0.803082,0.880391,0.419963,0.895933,0.422663,0.87842,0.422663,0.89635,0.883121,0.513147,0.883121,0.495217,0.885821,0.495633,0.902712,0.15307,0.898523,0.152884,0.902712,0.139509,0.930519,0.494828,0.926926,0.508376,0.926733,0.494828,0.742702,0.921074,0.741951,0.934573,0.738917,0.921074,0.904903,0.664342,0.907938,0.677841,0.903744,0.677841,0.104945,0.897516,0.107645,0.880002,0.107645,0.897932,0.879231,0.40503,0.879231,0.3871,0.881931,0.387516,0.168672,0.897858,0.171372,0.880345,0.171372,0.898275,0.882271,0.888599,0.882271,0.870669,0.884971,0.871085,0.383879,0.921385,0.383128,0.934855,0.380094,0.921385,0.908923,0.040052,0.911957,0.053523,0.907764,0.053523,0.064082,0.908373,0.059904,0.908014,0.064082,0.894853,0.756967,0.901988,0.756967,0.915796,0.753274,0.90282,0.205424,0.906848,0.201247,0.906489,0.205424,0.893299,0.932378,0.38731,0.928598,0.40062,0.928598,0.3871,0.88338,0.481761,0.88608,0.464247,0.88608,0.482177,0.898466,0.682062,0.895734,0.664342,0.898466,0.664342,0.42695,0.483813,0.423291,0.496859,0.423291,0.482843,0.899077,0.495217,0.903266,0.508592,0.899077,0.508777,0.53545,0.64716,0.540537,0.557147,0.540537,0.64746,0.646121,0.592322,0.640576,0.50218,0.646121,0.502167,0.368015,0.928938,0.373068,0.920004,0.373068,0.931222,0.935672,0.881888,0.935672,0.870669,0.939043,0.872193,0.654337,0.092651,0.659423,0.002639,0.659423,0.092952,0.49168,0.6473,0.486135,0.557158,0.49168,0.557144,0.55593,0.64716,0.561017,0.557147,0.561017,0.64746,0.638694,0.092794,0.633149,0.002653,0.638694,0.002639,0.414228,0.647183,0.419315,0.55717,0.419315,0.647484,0.624475,0.592323,0.61893,0.502181,0.624475,0.502167,0.57641,0.64716,0.581497,0.557148,0.581497,0.64746,0.59232,0.644637,0.586775,0.554494,0.59232,0.55448,0.314542,0.647189,0.319629,0.557176,0.319629,0.647489,0.627871,0.092795,0.622326,0.002653,0.627871,0.002639,0.643972,0.092651,0.649059,0.002639,0.649059,0.092951,0.635298,0.592323,0.629753,0.50218,0.635298,0.502167,0.597752,0.644493,0.602839,0.55448,0.602839,0.644793,0.617048,0.092796,0.611503,0.002653,0.617048,0.002639,0.080094,0.928237,0.085146,0.919303,0.085146,0.930522,0.935741,0.051569,0.935741,0.040351,0.939112,0.041875,0.636732,0.928232,0.641784,0.919298,0.641784,0.930516,0.932865,0.642724,0.932865,0.631505,0.936236,0.633029,0.615155,0.929876,0.620208,0.920942,0.620208,0.932161,0.935672,0.900726,0.935672,0.889507,0.939043,0.891031,0.288231,0.921988,0.298495,0.921988,0.288729,0.927511,0.342766,0.933612,0.342766,0.922393,0.346137,0.923917,0.091362,0.928237,0.096415,0.919303,0.096415,0.930522,0.935664,0.540345,0.935664,0.529126,0.939034,0.53065,0.351415,0.932616,0.352338,0.922393,0.35696,0.932616,0.932392,0.732494,0.932392,0.721275,0.935763,0.722799,0.918969,0.865391,0.918969,0.855127,0.924492,0.864892,0.935909,0.348993,0.935909,0.337774,0.93928,0.339298,0.038952,0.984444,0.038562,0.982977,0.044485,0.982977,0.480399,0.984414,0.474476,0.984414,0.48001,0.982947,0.052449,0.968979,0.052613,0.970489,0.038562,0.970489,0.799107,0.968907,0.813158,0.968907,0.799271,0.970416,0.875103,0.780928,0.861134,0.780928,0.875103,0.775203,0.855332,0.031559,0.840236,0.031559,0.842407,0.026261,0.530681,0.96931,0.530845,0.970819,0.516794,0.970819,0.945611,0.671129,0.959662,0.671129,0.945775,0.672639,0.486066,0.984414,0.485677,0.982947,0.4916,0.982947,0.737402,0.98456,0.731479,0.98456,0.737012,0.983093,0.959028,0.3871,0.959192,0.388609,0.945141,0.388609,0.536254,0.961385,0.550305,0.961385,0.536418,0.962895,0.536254,0.861092,0.550223,0.861091,0.536254,0.866817,0.492568,0.839335,0.507664,0.839335,0.505493,0.844632,0.016566,0.957255,0.01673,0.958764,0.002679,0.958764,0.516794,0.955734,0.530845,0.955734,0.516958,0.957244,0.014775,0.86448,0.028743,0.86448,0.014775,0.870205,0.168672,0.848191,0.183768,0.848191,0.181597,0.853489,0.833306,0.961974,0.83347,0.963484,0.819419,0.963484,0.839653,0.961974,0.853704,0.961974,0.839817,0.963484,0.874554,0.603482,0.860586,0.603482,0.874554,0.597757,0.855222,0.709797,0.840126,0.709797,0.842297,0.7045,0.720802,0.955624,0.720967,0.957133,0.706915,0.957133,0.604116,0.955598,0.618167,0.955598,0.60428,0.957107,0.325739,0.875011,0.311771,0.875011,0.325739,0.869287,0.507664,0.855207,0.492568,0.855207,0.494739,0.84991,0.96044,0.926706,0.960604,0.928215,0.946553,0.928215,0.946424,0.058801,0.960475,0.058801,0.946588,0.06031,0.838073,0.559909,0.837683,0.558442,0.843606,0.558442,0.306031,0.984496,0.300109,0.984496,0.305642,0.983028,0.961385,0.597757,0.961549,0.599267,0.947498,0.599267,0.414082,0.963082,0.428132,0.963082,0.414246,0.964591,0.985386,0.845225,0.985386,0.843707,0.991111,0.845225,0.325374,0.985351,0.319451,0.985351,0.324985,0.983883,0.959498,0.664342,0.959662,0.665851,0.945611,0.665851,0.945141,0.399309,0.959192,0.399309,0.945305,0.400819,0.985184,0.71425,0.985184,0.712732,0.990909,0.71425,0.06605,0.985215,0.060127,0.985215,0.065661,0.983748,0.961385,0.604545,0.961549,0.606054,0.947498,0.606054,0.947544,0.238884,0.961595,0.238884,0.947708,0.240394,0.347755,0.873809,0.333786,0.873809,0.347755,0.868084,0.300362,0.854416,0.285266,0.854416,0.287437,0.849119,0.960008,0.784298,0.960173,0.785807,0.946122,0.785807,0.208354,0.960968,0.222405,0.960968,0.208518,0.962478,0.875103,0.752393,0.861134,0.752393,0.875103,0.746668,0.855856,0.751965,0.84076,0.751965,0.842931,0.746668,0.812993,0.96212,0.813157,0.963629,0.799107,0.963629,0.497353,0.970476,0.511403,0.970476,0.497517,0.971985,0.985299,0.141028,0.985299,0.139509,0.991024,0.141028,0.985202,0.365023,0.979279,0.365023,0.984813,0.363556,0.457841,0.959128,0.458005,0.960638,0.443954,0.960638,0.907913,0.961042,0.921964,0.961042,0.908077,0.962551,0.985299,0.134231,0.985299,0.132713,0.991024,0.134231,0.398176,0.985043,0.392254,0.985043,0.397787,0.983575,0.618003,0.969173,0.618167,0.970682,0.604116,0.970682,0.392254,0.956045,0.406305,0.956045,0.392418,0.957555,0.331507,0.990189,0.331117,0.988722,0.33704,0.988722,0.971438,0.990695,0.965515,0.990695,0.971049,0.989227,0.9612,0.577313,0.961364,0.578822,0.947313,0.578822,0.946186,0.960583,0.960237,0.960583,0.94635,0.962093,0.874499,0.670067,0.860531,0.670067,0.874499,0.664342,0.855332,0.042134,0.840236,0.042134,0.842407,0.036837,0.960073,0.953796,0.960237,0.955305,0.946186,0.955305,0.685488,0.96174,0.699539,0.96174,0.685652,0.963249,0.720059,0.873512,0.70609,0.873512,0.720059,0.867788,0.851571,0.343071,0.836475,0.343071,0.838646,0.337774,0.096186,0.957239,0.09635,0.958749,0.082299,0.958749,0.059679,0.956218,0.07373,0.956218,0.059843,0.957727,0.472178,0.861357,0.486147,0.861356,0.472178,0.867082,0.836475,0.348349,0.851571,0.348349,0.8494,0.353647,0.959579,0.705706,0.959743,0.707215,0.945692,0.707215,0.168672,0.960539,0.182722,0.960539,0.168836,0.962049,0.985299,0.148195,0.985299,0.146677,0.991024,0.148195,0.74928,0.98456,0.743357,0.98456,0.74889,0.983093,0.961014,0.765408,0.961178,0.766918,0.947127,0.766918,0.559069,0.969201,0.57312,0.969201,0.559233,0.970711,0.115515,0.957239,0.115679,0.958749,0.101628,0.958749,0.311771,0.956353,0.325822,0.956353,0.311935,0.957863,0.745366,0.955614,0.74553,0.957123,0.731479,0.957123,0.753081,0.955614,0.767132,0.955614,0.753245,0.957123,0.873435,0.962515,0.873599,0.964025,0.859549,0.964025,0.414082,0.956294,0.428133,0.956294,0.414246,0.957804,0.957883,0.078031,0.958047,0.079541,0.943996,0.079541,0.753081,0.969189,0.767132,0.969189,0.753245,0.970698,0.970454,0.455033,0.970618,0.456542,0.956567,0.456542,0.944312,0.560783,0.958363,0.560783,0.944476,0.562293,0.639607,0.957234,0.639771,0.958743,0.62572,0.958743,0.497353,0.956901,0.511404,0.956901,0.497517,0.95841,0.488363,0.96895,0.488527,0.970459,0.474476,0.970459,0.288231,0.969073,0.302282,0.969073,0.288395,0.970582,0.96044,0.933493,0.960604,0.935003,0.946553,0.935003,0.342766,0.961926,0.356817,0.961926,0.34293,0.963435,0.960311,0.07101,0.960475,0.072519,0.946424,0.072519,0.731479,0.962401,0.74553,0.962401,0.731643,0.963911,0.427969,0.969869,0.428132,0.971379,0.414082,0.971379,0.956924,0.108225,0.970975,0.108225,0.957088,0.109735,0.960073,0.946549,0.960237,0.948059,0.946187,0.948059,0.946122,0.791085,0.960173,0.791085,0.946286,0.792595,0.073566,0.969793,0.07373,0.971302,0.059679,0.971302,0.123006,0.959973,0.137057,0.959973,0.12317,0.961483,0.202866,0.968478,0.203031,0.969988,0.18898,0.969988,0.250212,0.963309,0.264262,0.963309,0.250375,0.964818,0.961408,0.015322,0.961573,0.016831,0.947522,0.016831,0.947127,0.75862,0.961178,0.75862,0.947291,0.76013,0.766968,0.962401,0.767132,0.963911,0.753081,0.963911,0.957263,0.683338,0.971314,0.683338,0.957427,0.684848,0.241737,0.959332,0.241902,0.960842,0.227851,0.960842,0.18898,0.961691,0.203031,0.961691,0.189144,0.9632,0.961408,0.027348,0.961573,0.028857,0.947522,0.028857,0.731479,0.969189,0.74553,0.969189,0.731643,0.970698,0.720802,0.969199,0.720966,0.970708,0.706915,0.970708,0.887995,0.961132,0.902045,0.961132,0.888159,0.962642,0.9612,0.589522,0.961364,0.591032,0.947313,0.591032,0.579613,0.96194,0.593664,0.96194,0.579777,0.963449,0.874499,0.68107,0.860531,0.68107,0.874499,0.675345,0.55135,0.855813,0.536254,0.855813,0.538425,0.850516,0.038562,0.861142,0.052531,0.861141,0.038562,0.866867,0.360995,0.845415,0.376091,0.845415,0.37392,0.850713,0.452931,0.861357,0.4669,0.861356,0.452931,0.867082,0.839889,0.078962,0.854986,0.078962,0.852815,0.08426,0.979376,0.938171,0.978987,0.936704,0.98491,0.936704,0.420004,0.985292,0.414082,0.985292,0.419615,0.983824,0.874579,0.021411,0.86061,0.021411,0.874579,0.015686,0.573969,0.852552,0.558873,0.852552,0.561044,0.847255,0.888384,0.99024,0.887995,0.988773,0.893918,0.988773,0.989996,0.891017,0.984074,0.891017,0.989607,0.889549,0.572842,0.87413,0.558873,0.87413,0.572842,0.868405,0.855856,0.769925,0.84076,0.769925,0.842931,0.764628,0.191791,0.860649,0.205759,0.860649,0.191791,0.866374,0.038562,0.839991,0.053659,0.839991,0.051488,0.845288,0.428955,0.865496,0.442924,0.865495,0.428955,0.87122,0.840063,0.181253,0.855159,0.181253,0.852988,0.18655,0.979829,0.056194,0.97944,0.054726,0.985363,0.054726,0.985363,0.049448,0.97944,0.049448,0.984974,0.04798,0.875103,0.763396,0.861134,0.763396,0.875103,0.757671,0.206887,0.855371,0.191791,0.855371,0.193962,0.850074,0.920176,0.990561,0.919787,0.989093,0.92571,0.989093,0.164352,0.99065,0.158429,0.99065,0.163963,0.989183,0.526933,0.874259,0.512964,0.874259,0.526933,0.868534,0.755006,0.853621,0.73991,0.853621,0.742081,0.848324,0.127695,0.865359,0.141663,0.865359,0.127695,0.871084,0.838742,0.434568,0.853838,0.434568,0.851667,0.439865,0.080094,0.865866,0.094062,0.865865,0.080094,0.87159,0.839889,0.068387,0.854986,0.068387,0.852815,0.073684,0.536643,0.990493,0.536254,0.989026,0.542177,0.989026,0.553507,0.990493,0.547584,0.990493,0.553117,0.989026,0.871586,0.984725,0.871197,0.983258,0.87712,0.983258,0.294831,0.984445,0.288908,0.984445,0.294441,0.982977,0.707305,0.98457,0.706915,0.983103,0.712838,0.983103,0.267783,0.985519,0.26186,0.985519,0.267394,0.984051,0.148069,0.86536,0.162038,0.865359,0.14807,0.871084,0.398922,0.84877,0.414018,0.84877,0.411847,0.854067,0.683032,0.861537,0.697,0.861536,0.683032,0.867262,0.825078,0.848764,0.840174,0.848764,0.838003,0.854061,0.984925,0.184462,0.984536,0.182994,0.990459,0.182994,0.175682,0.99065,0.169759,0.99065,0.175293,0.989183,0.250601,0.985519,0.250212,0.984051,0.256134,0.984051,0.985202,0.373395,0.979279,0.373395,0.984813,0.371928,0.861134,0.792736,0.875103,0.792736,0.861134,0.798461,0.230203,0.855124,0.245299,0.855124,0.243128,0.860421,0.874579,0.042562,0.86061,0.042562,0.874579,0.036837,0.52806,0.852681,0.512964,0.852681,0.515135,0.847384,0.360995,0.866566,0.374963,0.866566,0.360995,0.872291,0.651399,0.848751,0.666495,0.848751,0.664324,0.854048,0.979673,0.811575,0.979284,0.810108,0.985207,0.810108,0.77156,0.98456,0.765637,0.98456,0.77117,0.983093,0.97983,0.041219,0.97944,0.039751,0.985363,0.039751,0.985213,0.240352,0.97929,0.240352,0.984824,0.238884,0.819419,0.991023,0.819419,0.989505,0.825144,0.991023,0.474349,0.850781,0.487274,0.856078,0.472178,0.856078,0.038562,0.850566,0.053658,0.850566,0.051487,0.855863,0.626421,0.86586,0.64039,0.86586,0.626421,0.871585,0.840156,0.664342,0.855253,0.664342,0.853082,0.669639,0.559458,0.984573,0.559069,0.983105,0.564992,0.983105,0.724716,0.98457,0.718794,0.98457,0.724327,0.983103,0.874406,0.18482,0.860437,0.18482,0.874406,0.179096,0.8198,0.854061,0.804703,0.854061,0.806875,0.848764,0.517183,0.984732,0.516794,0.983264,0.522717,0.983264,0.985207,0.818321,0.979284,0.818321,0.984817,0.816853,0.874554,0.621443,0.860586,0.621443,0.874554,0.615718,0.326867,0.853434,0.311771,0.853434,0.313942,0.848136,0.985299,0.127064,0.985299,0.125545,0.991024,0.127064,0.610039,0.984544,0.604116,0.984544,0.609649,0.983076,0.856849,0.375761,0.870817,0.37576,0.856849,0.381486,0.765675,0.848764,0.780772,0.848764,0.778601,0.854061,0.117889,0.990085,0.1175,0.988617,0.123423,0.988617,0.953197,0.990694,0.947274,0.990694,0.952807,0.989227,0.230203,0.8657,0.244172,0.8657,0.230203,0.871425,0.840212,0.615718,0.855308,0.615718,0.853137,0.621015,0.208743,0.990506,0.208354,0.989039,0.214276,0.989039,0.69141,0.990686,0.685488,0.990686,0.691021,0.989218,0.874469,0.710225,0.8605,0.710225,0.874469,0.7045,0.120041,0.854088,0.104945,0.854088,0.107116,0.848791,0.979376,0.931426,0.978987,0.929958,0.98491,0.929958,0.985286,0.760088,0.979364,0.760088,0.984897,0.75862,0.093019,0.850012,0.080094,0.844715,0.09519,0.844715,0.266452,0.849815,0.251355,0.849815,0.253526,0.844518,0.819808,0.984227,0.819419,0.982759,0.825342,0.982759,0.664966,0.984359,0.659043,0.984359,0.664577,0.982892,0.251355,0.865669,0.265324,0.865668,0.251356,0.871394,0.840063,0.160102,0.855159,0.160102,0.852988,0.1654,0.985177,0.855727,0.985177,0.854209,0.990902,0.855727,0.784962,0.984372,0.77904,0.984372,0.784573,0.982905,0.058937,0.861142,0.072905,0.861141,0.058937,0.866867,0.333786,0.846934,0.348882,0.846934,0.346711,0.852231,0.18264,0.875067,0.168672,0.875067,0.18264,0.869342,0.074033,0.855863,0.058937,0.855863,0.061108,0.850566,0.979449,0.578822,0.97906,0.577355,0.984983,0.577355,0.98491,0.92468,0.978987,0.92468,0.984521,0.923212,0.874469,0.699222,0.8605,0.699222,0.874469,0.693497,0.855856,0.780501,0.84076,0.780501,0.842931,0.775203,0.129219,0.990085,0.12883,0.988617,0.134753,0.988617,0.982768,0.990695,0.976845,0.990695,0.982379,0.989227,0.016445,0.942762,0.01673,0.94473,0.002872,0.94473,0.168672,0.953293,0.18253,0.953293,0.168957,0.955261,0.978995,0.465648,0.979616,0.467537,0.973246,0.467537,0.976387,0.514034,0.982439,0.516024,0.976387,0.516024,0.221927,0.953722,0.222212,0.955691,0.208354,0.95569,0.941514,0.631505,0.955372,0.631505,0.941799,0.633473,0.859676,0.089812,0.859676,0.103528,0.853624,0.089812,0.828288,0.26219,0.843279,0.26219,0.840836,0.267727,0.941711,0.406412,0.941997,0.40838,0.928138,0.40838,0.799107,0.940381,0.812965,0.940381,0.799392,0.942349,0.980817,0.632293,0.981438,0.634182,0.975068,0.634182,0.158429,0.981916,0.164481,0.983905,0.158429,0.983905,0.854333,0.757243,0.854619,0.759212,0.84076,0.759212,0.363147,0.952952,0.377006,0.952952,0.363432,0.95492,0.110816,0.981351,0.110817,0.983339,0.104764,0.981351,0.947274,0.98196,0.953326,0.983949,0.947274,0.983949,0.953915,0.375123,0.9542,0.377091,0.940341,0.377091,0.938844,0.650261,0.952703,0.650261,0.93913,0.652229,0.337169,0.981455,0.337169,0.983444,0.331117,0.981455,0.18898,0.982064,0.195032,0.984053,0.18898,0.984053,0.955414,0.00295,0.955699,0.004918,0.94184,0.004918,0.443954,0.944635,0.457813,0.944635,0.444239,0.946604,0.858307,0.445705,0.858307,0.459421,0.852255,0.445705,0.828664,0.192237,0.843655,0.192237,0.841212,0.197774,0.263785,0.942028,0.26407,0.943997,0.250212,0.943997,0.84076,0.785917,0.854619,0.785917,0.841045,0.787886,0.22024,0.851448,0.22024,0.865163,0.214188,0.851448,0.829124,0.139749,0.844115,0.139749,0.841672,0.145286,0.953039,0.712732,0.953324,0.7147,0.939465,0.7147,0.142335,0.950468,0.156194,0.950468,0.14262,0.952437,0.980817,0.640248,0.981438,0.642137,0.975068,0.642137,0.977933,0.966356,0.983985,0.968345,0.977933,0.968345,0.953915,0.363556,0.9542,0.365524,0.940341,0.365524,0.938127,0.683338,0.951985,0.683338,0.938412,0.685307,0.27864,0.834706,0.27864,0.848422,0.272588,0.834706,0.596224,0.837472,0.611215,0.837472,0.608772,0.843009,0.955087,0.638751,0.955372,0.64072,0.941514,0.64072,0.227851,0.944839,0.241709,0.944839,0.228136,0.946808,0.980575,0.504206,0.981196,0.506095,0.974825,0.506095,0.976845,0.98196,0.982897,0.983949,0.976845,0.983949,0.095873,0.942746,0.096158,0.944715,0.082299,0.944715,0.142335,0.943222,0.156193,0.943222,0.14262,0.94519,0.983339,0.521343,0.983339,0.523332,0.977287,0.521343,0.965515,0.98196,0.971567,0.983949,0.965515,0.983949,0.953919,0.821675,0.954205,0.823643,0.940346,0.823643,0.227851,0.952086,0.241709,0.952086,0.228136,0.954054,0.86206,0.243749,0.86206,0.245739,0.856008,0.24375,0.976716,0.690706,0.982768,0.692695,0.976716,0.692695,0.953919,0.810108,0.954205,0.812076,0.940346,0.812076,0.940074,0.099398,0.953933,0.099398,0.94036,0.101366,0.862901,0.337774,0.862901,0.351489,0.856849,0.337774,0.828664,0.213867,0.843655,0.213867,0.841212,0.219404,0.955647,0.863423,0.955932,0.865391,0.942074,0.865391,0.168672,0.946046,0.18253,0.946046,0.168957,0.948015,0.940078,0.977999,0.940699,0.979889,0.934328,0.979889,0.976592,0.682859,0.982644,0.684848,0.976592,0.684848,0.953757,0.843336,0.954042,0.845304,0.940184,0.845304,0.940074,0.084906,0.953933,0.084906,0.94036,0.086874,0.136771,0.952727,0.137057,0.954695,0.123198,0.954695,0.443954,0.951882,0.457813,0.951882,0.444239,0.95385,0.953757,0.850582,0.954042,0.85255,0.940184,0.85255,0.940074,0.092152,0.953933,0.092152,0.94036,0.09412,0.954614,0.721275,0.954899,0.723243,0.941041,0.723243,0.77904,0.940381,0.792898,0.940381,0.779325,0.942349,0.073252,0.941725,0.073538,0.943694,0.059679,0.943693,0.941375,0.222387,0.955234,0.222387,0.941661,0.224355,0.901568,0.953886,0.901853,0.955854,0.887995,0.955854,0.941549,0.258808,0.955407,0.258808,0.941834,0.260776,0.953757,0.83609,0.954042,0.838058,0.940184,0.838058,0.938706,0.212763,0.952565,0.212763,0.938991,0.214731,0.052136,0.940453,0.052421,0.942421,0.038562,0.942421,0.579613,0.940201,0.593472,0.940201,0.579899,0.942169,0.510926,0.942408,0.511211,0.944376,0.497353,0.944376,0.941375,0.229633,0.955234,0.229633,0.941661,0.231602,0.954614,0.730525,0.954899,0.732494,0.941041,0.732494,0.939819,0.483336,0.953677,0.483336,0.940104,0.485305,0.955521,0.297495,0.955806,0.299463,0.941948,0.299463,0.941549,0.249557,0.955407,0.249558,0.941834,0.251526,0.665162,0.940368,0.665447,0.942336,0.651588,0.942336,0.474476,0.940423,0.488335,0.940423,0.474762,0.942392,0.639293,0.942741,0.639579,0.944709,0.62572,0.944709,0.536254,0.954139,0.550112,0.954139,0.536539,0.956107,0.940623,0.953796,0.940908,0.955764,0.92705,0.955764,0.907913,0.953796,0.921771,0.953796,0.908198,0.955764,0.859676,0.108806,0.859676,0.122521,0.853624,0.108806,0.827826,0.579406,0.842817,0.579406,0.840374,0.584943,0.981948,0.455033,0.981948,0.457022,0.975896,0.455033,0.976818,0.664342,0.98287,0.666331,0.976818,0.666331,0.135969,0.981351,0.135969,0.983339,0.129917,0.981351,0.977933,0.974694,0.983985,0.976682,0.977933,0.976682,0.983263,0.956107,0.983263,0.958096,0.977211,0.956107,0.919787,0.981827,0.925839,0.983815,0.919787,0.983815,0.980808,0.423587,0.981429,0.425476,0.975059,0.425476,0.432013,0.981585,0.438065,0.983574,0.432013,0.983574,0.866489,0.160102,0.866489,0.173817,0.860437,0.160102,0.829183,0.289342,0.844174,0.289342,0.841731,0.294879,0.980776,0.328536,0.981397,0.330425,0.975027,0.330425,0.977742,0.078031,0.983794,0.08002,0.977742,0.08002,0.865168,0.423992,0.865168,0.437708,0.859116,0.423992,0.829124,0.128934,0.844115,0.128934,0.841672,0.134471,0.123552,0.981351,0.123552,0.983339,0.1175,0.981351,0.169759,0.981916,0.175811,0.983905,0.169759,0.983905,0.983224,0.213222,0.983224,0.215211,0.977172,0.213222,0.977766,0.015322,0.983818,0.017311,0.977766,0.017311,0.58694,0.848019,0.58694,0.861734,0.580888,0.848019,0.651399,0.837936,0.66639,0.837936,0.663947,0.843472,0.86206,0.224756,0.86206,0.238472,0.856008,0.224756,0.826833,0.652895,0.841825,0.652895,0.839381,0.658432,0.838793,0.865391,0.825078,0.865391,0.838793,0.859339,0.843385,0.484458,0.828394,0.484458,0.830837,0.478921,0.798384,0.865391,0.784669,0.865391,0.798384,0.859339,0.842023,0.009284,0.827032,0.009284,0.829475,0.003747,0.866316,0.068387,0.866316,0.082102,0.860264,0.068387,0.829202,0.547556,0.844193,0.547556,0.84175,0.553093,0.11866,0.865418,0.104945,0.865418,0.11866,0.859366,0.839964,0.843486,0.824973,0.843486,0.827416,0.837949,0.818419,0.865391,0.804703,0.865391,0.818419,0.859339,0.573864,0.841977,0.558873,0.841977,0.561316,0.83644,0.665114,0.865378,0.651399,0.865378,0.665114,0.859326,0.842817,0.570766,0.827826,0.570766,0.830269,0.565229,0.752457,0.843046,0.73991,0.837509,0.754901,0.837509,0.843754,0.315074,0.828762,0.315074,0.831206,0.309537,0.298982,0.865746,0.285266,0.865746,0.298982,0.859694,0.819695,0.843486,0.804703,0.843486,0.807147,0.837949,0.863269,0.058123,0.849553,0.058123,0.863269,0.052071,0.326867,0.842858,0.311876,0.842858,0.314319,0.837321,0.980726,0.317805,0.981347,0.319694,0.974976,0.319694,0.547584,0.981759,0.553636,0.983748,0.547584,0.983748,0.412637,0.865397,0.398922,0.865397,0.412637,0.859345,0.348882,0.841656,0.333891,0.841656,0.336334,0.836119,0.840836,0.256912,0.828288,0.251375,0.843279,0.251375,0.119936,0.843513,0.104945,0.843513,0.107388,0.837976,0.980387,0.836127,0.981008,0.838016,0.974638,0.838016,0.536254,0.981759,0.542306,0.983748,0.536254,0.983748,0.859167,0.865391,0.845452,0.865391,0.859167,0.859339,0.183663,0.842913,0.168672,0.842913,0.171115,0.837377,0.779391,0.865391,0.765675,0.865391,0.779391,0.859339,0.841825,0.647617,0.826833,0.647617,0.829277,0.64208,0.978986,0.72305,0.979607,0.72494,0.973236,0.72494,0.976348,0.384428,0.9824,0.386417,0.976348,0.386417,0.979285,0.712732,0.979906,0.714621,0.973535,0.714621,0.976716,0.700284,0.982768,0.702273,0.976716,0.702273,0.506283,0.866537,0.492568,0.866537,0.506283,0.860485,0.844193,0.538094,0.829202,0.538094,0.831646,0.532558,0.841731,0.284064,0.829183,0.278527,0.844174,0.278527,0.844275,0.057608,0.829284,0.057608,0.831728,0.052071,0.07896,0.978708,0.079581,0.980597,0.07321,0.980597,0.887995,0.981506,0.894047,0.983495,0.887995,0.983495,0.008691,0.840382,0.008691,0.854097,0.002639,0.840382,0.512964,0.836569,0.527955,0.836569,0.525512,0.842106,0.979988,0.746668,0.980609,0.748557,0.974239,0.748557,0.363147,0.981575,0.369199,0.983564,0.363147,0.983564,0.392985,0.846001,0.392985,0.859716,0.386933,0.846001,0.398922,0.837955,0.413913,0.837955,0.41147,0.843492,0.983198,0.786609,0.983198,0.788598,0.977146,0.78661,0.376652,0.981575,0.382704,0.983564,0.376652,0.983564,0.977943,0.5841,0.983995,0.586089,0.977943,0.586089,0.979122,0.485232,0.979743,0.487122,0.973372,0.487122,0.976348,0.393887,0.9824,0.395876,0.976348,0.395876,0.734345,0.841365,0.734345,0.85508,0.728293,0.841365,0.765675,0.837949,0.780667,0.837949,0.778223,0.843486,0.990619,0.467537,0.984894,0.467537,0.990619,0.466019,0.988272,0.547081,0.982349,0.547081,0.982738,0.545613,0.966983,0.917223,0.953096,0.915714,0.967147,0.915714,0.052613,0.963701,0.038562,0.963701,0.038726,0.962192,0.846175,0.09823,0.848346,0.103528,0.83325,0.103528,0.835634,0.224756,0.85073,0.224756,0.837804,0.230054,0.968029,0.830653,0.954142,0.829143,0.968193,0.829143,0.182722,0.968836,0.168672,0.968836,0.168836,0.967327,0.382315,0.99031,0.376782,0.988842,0.382704,0.988842,0.913597,0.990788,0.907675,0.990788,0.908064,0.98932,0.530681,0.964031,0.516794,0.962522,0.530845,0.962522,0.720966,0.963921,0.706915,0.963921,0.70708,0.962411,0.845299,0.820197,0.843128,0.8149,0.858225,0.8149,0.142791,0.860081,0.127695,0.860081,0.14062,0.854784,0.969635,0.626227,0.955748,0.624718,0.969799,0.624718,0.302281,0.957007,0.288231,0.957007,0.288395,0.955498,0.847623,0.854061,0.845452,0.848764,0.860548,0.848764,0.52806,0.863256,0.512964,0.863256,0.525889,0.857959,0.966983,0.8994,0.953096,0.89789,0.967147,0.89789,0.241902,0.967629,0.227851,0.967629,0.228015,0.96612,0.861957,0.309537,0.864128,0.314834,0.849032,0.314834,0.848663,0.468106,0.863759,0.468106,0.850834,0.473403,0.377034,0.968495,0.363147,0.966986,0.377198,0.966986,0.117728,0.96827,0.103677,0.96827,0.103841,0.966761,0.8494,0.373781,0.851571,0.379079,0.836475,0.379079,0.840126,0.693924,0.855222,0.693924,0.842297,0.699222,0.833306,0.970271,0.819419,0.968762,0.83347,0.968762,0.902045,0.969429,0.887995,0.969429,0.888159,0.96792,0.987936,0.357819,0.982403,0.356351,0.988325,0.356351,0.991469,0.829143,0.985744,0.830662,0.985744,0.829143,0.550141,0.969682,0.536254,0.968173,0.550305,0.968173,0.853704,0.956696,0.839653,0.956696,0.839817,0.955186,0.987882,0.553826,0.982349,0.552359,0.988272,0.552359,0.760359,0.989889,0.754634,0.991408,0.754634,0.989889,0.966974,0.547122,0.953087,0.545613,0.967138,0.545613,0.967147,0.873505,0.953096,0.873505,0.95326,0.871995,0.989607,0.873083,0.984074,0.871615,0.989996,0.871615,0.991408,0.432744,0.985683,0.434262,0.985683,0.432744,0.969635,0.618522,0.955748,0.617013,0.969799,0.617012,0.921964,0.969339,0.907913,0.969339,0.908077,0.967829,0.609149,0.848287,0.61132,0.853584,0.596224,0.853584,0.428955,0.844345,0.444051,0.844345,0.431126,0.849642,0.488363,0.963672,0.474476,0.962162,0.488527,0.962162,0.325822,0.971438,0.311771,0.971438,0.311935,0.969929,0.441881,0.85492,0.444052,0.860217,0.428955,0.860217,0.843128,0.803739,0.858225,0.803739,0.845299,0.809036,0.966983,0.891017,0.953096,0.889507,0.967147,0.889507,0.967147,0.880292,0.953096,0.880292,0.95326,0.878783,0.990374,0.414731,0.98484,0.413263,0.990763,0.413263,0.865919,0.990004,0.860194,0.991522,0.860194,0.990003,0.96876,0.269217,0.954873,0.267707,0.968924,0.267707,0.968851,0.570341,0.9548,0.570341,0.954964,0.568831,0.845187,0.984227,0.839653,0.982759,0.845576,0.982759,0.760359,0.983093,0.754634,0.984611,0.754634,0.983093,0.832241,0.559951,0.818354,0.558442,0.832405,0.558442,0.511404,0.965198,0.497353,0.965198,0.497517,0.963688,0.464805,0.9887,0.459271,0.987232,0.465194,0.987232,0.991001,0.090335,0.985277,0.091853,0.985277,0.090335,0.136893,0.96827,0.123006,0.966761,0.137057,0.966761,0.969749,0.330045,0.955698,0.330045,0.955862,0.328536,0.14062,0.844209,0.142791,0.849506,0.127695,0.849506,0.230203,0.844549,0.245299,0.844549,0.232374,0.849846,0.967445,0.184082,0.953559,0.182572,0.96761,0.182572,0.458005,0.967425,0.443954,0.967425,0.444118,0.965916,0.853161,0.015686,0.855332,0.020983,0.840236,0.020983,0.148069,0.844209,0.163165,0.844209,0.15024,0.849506,0.264098,0.971605,0.250212,0.970096,0.264263,0.970096,0.967147,0.906187,0.953096,0.906187,0.95326,0.904678,0.847523,0.417408,0.845352,0.412111,0.860448,0.412111,0.266452,0.86039,0.251355,0.86039,0.264281,0.855093,0.156222,0.959224,0.142335,0.957715,0.156386,0.957715,0.156386,0.966012,0.142335,0.966012,0.142499,0.964502,0.008213,0.98667,0.002679,0.985202,0.008602,0.985202,0.598182,0.989794,0.592458,0.991313,0.592458,0.989794,0.572956,0.957136,0.559069,0.955626,0.57312,0.955626,0.874469,0.688219,0.860418,0.688219,0.860582,0.686709,0.873435,0.957237,0.859549,0.955728,0.873599,0.955728,0.96525,0.357819,0.951199,0.357819,0.951363,0.356309,0.959579,0.695006,0.945692,0.693497,0.959743,0.693497,0.918466,0.741268,0.904415,0.741268,0.904579,0.739758,0.016566,0.965552,0.002679,0.964042,0.016731,0.964042,0.377198,0.961708,0.363147,0.961708,0.363311,0.960198,0.873435,0.970812,0.859549,0.969303,0.873599,0.969303,0.222405,0.969265,0.208354,0.969265,0.208518,0.967756,0.073566,0.964515,0.059679,0.963005,0.07373,0.963005,0.952688,0.804804,0.938637,0.804804,0.938801,0.803294,0.302117,0.963795,0.288231,0.962286,0.302281,0.962286,0.83347,0.956696,0.819419,0.956696,0.819583,0.955187,0.699375,0.970037,0.685488,0.968527,0.699538,0.968527,0.79309,0.970417,0.77904,0.970417,0.779204,0.968907,0.961162,0.407921,0.947275,0.406412,0.961326,0.406412,0.406305,0.964342,0.392254,0.964342,0.392418,0.962833,0.960073,0.96888,0.946186,0.967371,0.960237,0.967371,0.971893,0.214731,0.957843,0.214731,0.958007,0.213222,0.5935,0.970237,0.579613,0.968727,0.593664,0.968727,0.853704,0.970271,0.839653,0.970271,0.839817,0.968762,0.938554,0.079541,0.924667,0.078031,0.938718,0.078031,0.264263,0.95803,0.250212,0.95803,0.250376,0.956521,0.952731,0.659017,0.938844,0.657507,0.952895,0.657507,0.325822,0.96465,0.311771,0.96465,0.311935,0.963141,0.665475,0.970403,0.651588,0.968894,0.665639,0.968894,0.356817,0.970223,0.342766,0.970223,0.34293,0.968713,0.966974,0.55391,0.953087,0.5524,0.967138,0.5524,0.57312,0.963923,0.559069,0.963923,0.559233,0.962414,0.9487,0.830653,0.934813,0.829143,0.948864,0.829143,0.09635,0.965536,0.082299,0.965536,0.082464,0.964027,0.639607,0.965531,0.62572,0.964021,0.639771,0.964021,0.868381,0.154824,0.85433,0.154824,0.854494,0.153315,0.665475,0.963616,0.651588,0.962107,0.665639,0.962107,0.699539,0.956462,0.685488,0.956462,0.685652,0.954952,0.965416,0.739281,0.951529,0.737772,0.96558,0.737772,0.618167,0.963895,0.604116,0.963895,0.60428,0.962385,0.40614,0.971129,0.392254,0.96962,0.406305,0.96962,0.793091,0.963629,0.77904,0.963629,0.779203,0.96212,0.204716,0.839498,0.206887,0.844796,0.191791,0.844796,0.536254,0.839941,0.55135,0.839941,0.538425,0.845238,0.851499,0.507464,0.849328,0.502167,0.864424,0.502167,0.863653,0.256672,0.848557,0.256672,0.861482,0.251375,0.628592,0.860582,0.626421,0.855285,0.641517,0.855285,0.862199,0.658192,0.847103,0.658192,0.860028,0.652895,0.987891,0.880251,0.982358,0.878783,0.98828,0.878783,0.876922,0.990003,0.871197,0.991522,0.871197,0.990003,0.86102,0.586619,0.863191,0.591916,0.848095,0.591916,0.848933,0.203052,0.864029,0.203052,0.851104,0.208349,0.437547,0.99032,0.432013,0.988852,0.437936,0.988852,0.522717,0.99001,0.516992,0.991528,0.516992,0.99001,0.8494,0.358925,0.851571,0.364222,0.836475,0.364222,0.835634,0.235332,0.85073,0.235332,0.837805,0.240629,0.453975,0.856078,0.451804,0.850781,0.4669,0.850781,0.376091,0.861288,0.360995,0.861288,0.37392,0.855991,0.082265,0.860587,0.080094,0.85529,0.09519,0.85529,0.348882,0.862806,0.333786,0.862806,0.346711,0.857509,0.09084,0.987343,0.085307,0.985875,0.091229,0.985875,0.749082,0.989838,0.743357,0.991357,0.743357,0.989838,0.695957,0.850961,0.698128,0.856258,0.683032,0.856258,0.845179,0.734742,0.860275,0.734742,0.84735,0.740039,0.990746,0.487122,0.985021,0.487122,0.990746,0.485603,0.609841,0.989822,0.604116,0.991341,0.604116,0.989822,0.858104,0.723687,0.860275,0.728984,0.845179,0.728984,0.845242,0.837949,0.860338,0.837949,0.847413,0.843246,0.237396,0.988307,0.231862,0.98684,0.237785,0.98684,0.991502,0.568831,0.985778,0.570349,0.985778,0.568831,0.835421,0.114103,0.83325,0.108806,0.848346,0.108806,0.855253,0.680214,0.840156,0.680214,0.853082,0.674917,0.279939,0.990265,0.274406,0.988797,0.280329,0.988797,0.044287,0.989723,0.038562,0.991241,0.038562,0.989722,0.842931,0.798461,0.84076,0.793164,0.855856,0.793164,0.641517,0.850006,0.626421,0.850006,0.639346,0.844709,0.98519,0.76837,0.979656,0.766903,0.985579,0.766903,0.294831,0.989723,0.289106,0.991241,0.289106,0.989723,0.987362,0.801823,0.981829,0.800356,0.987751,0.800356,0.771362,0.989838,0.765637,0.991357,0.765637,0.989838,0.989607,0.906567,0.984074,0.9051,0.989996,0.9051,0.991408,0.443327,0.985683,0.444845,0.985683,0.443327,0.226164,0.99007,0.22063,0.988603,0.226553,0.988603,0.784764,0.989651,0.77904,0.991169,0.77904,0.98965,0.74208,0.864197,0.73991,0.8589,0.755006,0.8589,0.863191,0.570526,0.848095,0.570526,0.86102,0.565229,0.110298,0.990085,0.104764,0.988617,0.110687,0.988617,0.991536,0.11616,0.985811,0.117678,0.985811,0.11616,0.685203,0.845683,0.683032,0.840386,0.698128,0.840386,0.855308,0.603055,0.840212,0.603055,0.853137,0.597757,0.989607,0.897762,0.984074,0.896295,0.989996,0.896295,0.805505,0.98965,0.79978,0.991169,0.79978,0.98965,0.480201,0.991211,0.474476,0.991211,0.480201,0.989693,0.664768,0.989637,0.659043,0.991156,0.659043,0.989637,0.078744,0.987343,0.07321,0.985875,0.079133,0.985875,0.564992,0.989851,0.559267,0.991369,0.559267,0.989851,0.834052,0.459421,0.831881,0.454123,0.846977,0.454123,0.855159,0.175975,0.840063,0.175975,0.852988,0.170678,0.860227,0.003747,0.862397,0.009044,0.847301,0.009044,0.847103,0.64232,0.862199,0.64232,0.849273,0.647617,0.989607,0.916801,0.984074,0.915333,0.989996,0.915333,0.774175,0.657448,0.76845,0.658964,0.76845,0.657445,0.847523,0.396258,0.845352,0.390961,0.860448,0.390961,0.183768,0.864064,0.168672,0.864064,0.181597,0.858767,0.631701,0.987337,0.626168,0.985869,0.632091,0.985869,0.738079,0.989838,0.732354,0.991357,0.732354,0.989838,0.985338,0.407933,0.979804,0.406465,0.985727,0.406465,0.348491,0.98978,0.342766,0.991299,0.342766,0.98978,0.449488,0.988103,0.443954,0.986636,0.449877,0.986636,0.991556,0.346322,0.985831,0.34784,0.985831,0.346322,0.061108,0.845288,0.058937,0.839991,0.074033,0.839991,0.721186,0.851934,0.70609,0.851934,0.719015,0.846637,0.151537,0.98713,0.146004,0.985662,0.151927,0.985662,0.724518,0.989848,0.718794,0.991367,0.718794,0.989848,0.474349,0.845503,0.472178,0.840206,0.487274,0.840206,0.853838,0.42929,0.838742,0.42929,0.851667,0.423992,0.645462,0.98788,0.639928,0.986413,0.645851,0.986413,0.620844,0.989822,0.615119,0.99134,0.615119,0.989822,0.858277,0.401536,0.860449,0.406833,0.845352,0.406833,0.014775,0.853905,0.029871,0.853905,0.016946,0.859202,0.939862,0.986634,0.934328,0.985167,0.940251,0.985167,0.99061,0.72305,0.984885,0.724569,0.984885,0.72305,0.571798,0.85783,0.573969,0.863127,0.558873,0.863127,0.848663,0.489976,0.863759,0.489976,0.850834,0.495273,0.805313,0.984372,0.79978,0.982904,0.805703,0.982904,0.991444,0.494687,0.985719,0.496205,0.985719,0.494687,0.851564,0.134231,0.849393,0.128934,0.864489,0.128934,0.326867,0.864009,0.311771,0.864009,0.324696,0.858712,0.502886,0.985898,0.497353,0.984431,0.503275,0.984431,0.305834,0.989774,0.300109,0.991292,0.300109,0.989774,0.453975,0.845503,0.451804,0.840206,0.4669,0.840206,0.029871,0.848627,0.014775,0.848627,0.0277,0.84333,0.491402,0.991211,0.485677,0.991211,0.491402,0.989693,0.988655,0.739704,0.982732,0.739704,0.983121,0.738236,0.861482,0.26219,0.863653,0.267487,0.848557,0.267487,0.848933,0.192477,0.864029,0.192477,0.851104,0.197774,0.845576,0.991024,0.839851,0.991024,0.845576,0.989505,0.988254,0.652405,0.982331,0.652405,0.98272,0.650937,0.86102,0.576044,0.863191,0.581341,0.848095,0.581341,0.849032,0.323713,0.864128,0.323713,0.851202,0.32901,0.028571,0.985739,0.023037,0.984271,0.02896,0.984271,0.585338,0.989794,0.579613,0.991313,0.579613,0.989794,0.598395,0.86416,0.596224,0.858863,0.61132,0.858863,0.862199,0.636802,0.847103,0.636802,0.860028,0.631505,0.86553,0.984725,0.859996,0.983258,0.865919,0.983258,0.991528,0.100926,0.985804,0.102445,0.985804,0.100926,0.851499,0.518519,0.849328,0.513221,0.864424,0.513221,0.864029,0.219164,0.848933,0.219164,0.861858,0.213867,0.160994,0.854784,0.163165,0.860081,0.148069,0.860081,0.845242,0.827134,0.860338,0.827134,0.847413,0.832431,0.36868,0.99031,0.363147,0.988842,0.36907,0.988842,0.195032,0.990799,0.189109,0.990799,0.189499,0.989331,0.719015,0.857213,0.721186,0.86251,0.70609,0.86251,0.848663,0.479161,0.863759,0.479161,0.850834,0.484458,0.679163,0.987332,0.67363,0.985865,0.679553,0.985865,0.71264,0.989848,0.706915,0.991367,0.706915,0.989848,0.221927,0.946476,0.222212,0.948444,0.208354,0.948444,0.819611,0.94794,0.83347,0.94794,0.819897,0.949909,0.977129,0.067577,0.977129,0.065588,0.983181,0.067577,0.981448,0.625689,0.975077,0.625689,0.980827,0.6238,0.356339,0.954679,0.356625,0.956648,0.342766,0.956648,0.250212,0.949275,0.26407,0.949275,0.250497,0.951243,0.849452,0.278528,0.863167,0.278527,0.849452,0.28458,0.829059,0.502167,0.84405,0.502167,0.841606,0.507704,0.921486,0.946549,0.921772,0.948518,0.907913,0.948518,0.288231,0.948251,0.302089,0.948251,0.288516,0.95022,0.976253,0.110214,0.976253,0.108225,0.982305,0.110214,0.980021,0.127064,0.973651,0.127064,0.9794,0.125174,0.202553,0.947198,0.202839,0.949167,0.18898,0.949167,0.604116,0.948351,0.617975,0.948351,0.604401,0.95032,0.974804,0.348211,0.974183,0.346322,0.980553,0.346322,0.978796,0.917223,0.972425,0.917223,0.978175,0.915333,0.950185,0.617012,0.95047,0.618981,0.936612,0.618981,0.935664,0.568831,0.949522,0.568831,0.935949,0.570799,0.30073,0.97775,0.300109,0.97586,0.306479,0.97586,0.979899,0.856098,0.973528,0.856098,0.979278,0.854209,0.901568,0.946639,0.901853,0.948608,0.887995,0.948608,0.579613,0.954693,0.593472,0.954693,0.579898,0.956662,0.561316,0.825625,0.573864,0.831162,0.558873,0.831162,0.285266,0.827489,0.300258,0.827489,0.297814,0.833026,0.325344,0.949107,0.32563,0.951075,0.311771,0.951075,0.799107,0.947627,0.812965,0.947627,0.799392,0.949595,0.830837,0.489736,0.843385,0.495273,0.828394,0.495273,0.826833,0.631265,0.841825,0.631265,0.839381,0.636802,0.37672,0.945706,0.377006,0.947674,0.363147,0.947674,0.932063,0.356309,0.945921,0.356309,0.932348,0.358278,0.975627,0.864703,0.975627,0.862714,0.98168,0.864703,0.06605,0.97847,0.059679,0.97847,0.065429,0.97658,0.665162,0.947614,0.665447,0.949582,0.651588,0.949582,0.497353,0.949654,0.511211,0.949654,0.497638,0.951623,0.68558,0.829571,0.698128,0.835108,0.683137,0.835108,0.191791,0.828683,0.206782,0.828683,0.204338,0.83422,0.53056,0.948488,0.530845,0.950456,0.516987,0.950456,0.651588,0.95486,0.665447,0.95486,0.651874,0.956829,0.975698,0.618522,0.975077,0.616633,0.981448,0.616633,0.00905,0.979924,0.002679,0.979924,0.008429,0.978034,0.115009,0.949993,0.115295,0.951961,0.101436,0.951961,0.082299,0.949993,0.096158,0.949993,0.082585,0.951961,0.974692,0.496577,0.974071,0.494687,0.980441,0.494687,0.981473,0.260776,0.975103,0.260776,0.980852,0.258887,0.853227,0.94794,0.853512,0.949908,0.839653,0.949908,0.706915,0.948378,0.720774,0.948378,0.707201,0.950346,0.974272,0.151671,0.97365,0.149781,0.980021,0.149781,0.256582,0.978773,0.250212,0.978773,0.255961,0.976883,0.947995,0.182572,0.948281,0.18454,0.934422,0.18454,0.18898,0.954445,0.202839,0.954445,0.189265,0.956413,0.827353,0.734502,0.839901,0.740039,0.82491,0.740039,0.765675,0.827134,0.780667,0.827134,0.778223,0.832671,0.639293,0.949987,0.639579,0.951956,0.62572,0.951956,0.937788,0.107766,0.951646,0.107766,0.938073,0.109735,0.976891,0.945522,0.976891,0.943533,0.982943,0.945521,0.980405,0.434633,0.974035,0.434633,0.979784,0.432744,0.792613,0.954874,0.792898,0.956842,0.77904,0.956842,0.038562,0.947699,0.052421,0.947699,0.038848,0.949668,0.873122,0.948481,0.873407,0.95045,0.859549,0.95045,0.474476,0.954916,0.488335,0.954916,0.474762,0.956884,0.593186,0.947447,0.593472,0.949415,0.579613,0.949415,0.935736,0.267707,0.949595,0.267707,0.936022,0.269676,0.766847,0.948368,0.767132,0.950336,0.753274,0.950336,0.936561,0.328077,0.95042,0.328077,0.936847,0.330045,0.956406,0.514055,0.956692,0.516024,0.942833,0.516024,0.942833,0.521302,0.956692,0.521302,0.943118,0.52327,0.405827,0.948799,0.406112,0.950767,0.392254,0.950767,0.414082,0.949048,0.42794,0.949048,0.414367,0.951016,0.945965,0.737772,0.946251,0.73974,0.932392,0.73974,0.123198,0.945481,0.137057,0.945481,0.123484,0.947449,0.81268,0.954873,0.812965,0.956842,0.799107,0.956842,0.77904,0.947627,0.792898,0.947627,0.779325,0.949596,0.016445,0.950008,0.01673,0.951977,0.002872,0.951977,0.038562,0.954946,0.052421,0.954946,0.038848,0.956914,0.572642,0.94838,0.572927,0.950348,0.559069,0.950348,0.059679,0.948972,0.073538,0.948972,0.059965,0.95094,0.745244,0.948367,0.74553,0.950336,0.731671,0.950336,0.474476,0.94767,0.488335,0.94767,0.474762,0.949638,0.549827,0.946893,0.550113,0.948861,0.536254,0.948861,0.342766,0.947433,0.356625,0.947433,0.343051,0.949401,0.940623,0.946549,0.940908,0.948518,0.92705,0.948518,0.936612,0.624259,0.95047,0.624259,0.936897,0.626227,0.699061,0.947706,0.699346,0.949674,0.685488,0.949674,0.93743,0.455033,0.951289,0.455033,0.937716,0.457001,0.017218,0.832515,0.029766,0.838052,0.014775,0.838052,0.492673,0.82852,0.507664,0.82852,0.505221,0.834057,0.974271,0.134231,0.973651,0.132342,0.980021,0.132342,0.980021,0.141399,0.973651,0.141399,0.9794,0.139509,0.974823,0.269597,0.974202,0.267707,0.980573,0.267707,0.979258,0.184462,0.972888,0.184462,0.978637,0.182572,0.974656,0.444845,0.974035,0.442955,0.980405,0.442955,0.981482,0.474705,0.975112,0.474705,0.980861,0.472815,0.975439,0.202842,0.975439,0.200853,0.981491,0.202842,0.523165,0.977986,0.516794,0.977986,0.522544,0.976097,0.849452,0.289858,0.863167,0.289858,0.849452,0.295911,0.251355,0.833703,0.266346,0.833703,0.263903,0.83924,0.97475,0.57072,0.974129,0.568831,0.9805,0.568831,0.325822,0.978605,0.319451,0.978605,0.325201,0.976716,0.831107,0.203052,0.843655,0.208589,0.828664,0.208589,0.70609,0.835822,0.721081,0.835822,0.718638,0.841359,0.973046,0.889912,0.972425,0.888022,0.978796,0.888022,0.980592,0.310457,0.974221,0.310457,0.979971,0.308567,0.674251,0.980586,0.67363,0.978697,0.68,0.978697,0.978796,0.906567,0.972425,0.906567,0.978175,0.904678,0.041006,0.829176,0.053554,0.834713,0.038562,0.834713,0.651399,0.82712,0.66639,0.82712,0.663947,0.832658,0.538697,0.829126,0.551245,0.834663,0.536254,0.834663,0.804703,0.827134,0.819695,0.827134,0.817251,0.832671,0.718638,0.830544,0.70609,0.825007,0.721081,0.825007,0.611215,0.832194,0.596224,0.832194,0.598667,0.826657,0.373542,0.829323,0.360995,0.823785,0.375986,0.823785,0.326867,0.832043,0.311876,0.832043,0.314319,0.826506,0.849471,0.543373,0.863187,0.543373,0.849471,0.549425,0.82491,0.723687,0.839901,0.723687,0.837457,0.729224,0.84131,0.32925,0.828762,0.323713,0.843754,0.323713,0.300257,0.843841,0.285266,0.843841,0.28771,0.838304,0.263903,0.828425,0.251355,0.822887,0.266347,0.822888,0.754901,0.832231,0.73991,0.832231,0.742353,0.826694,0.160512,0.83893,0.147964,0.833393,0.162955,0.833393,0.641412,0.839431,0.626421,0.839431,0.628864,0.833894,0.837631,0.396258,0.825083,0.390721,0.840074,0.390721,0.839964,0.832671,0.824973,0.832671,0.827416,0.827134,0.386933,0.840723,0.386933,0.827008,0.392986,0.840723,0.840074,0.410875,0.825083,0.410875,0.827526,0.405338,0.580888,0.842741,0.580888,0.829026,0.58694,0.842741,0.413913,0.832677,0.398922,0.832677,0.401366,0.82714,0.975502,0.300171,0.975502,0.298182,0.981554,0.300171,0.980533,0.118049,0.974163,0.118049,0.979912,0.11616,0.140243,0.83893,0.127695,0.833393,0.142686,0.833393,0.843385,0.473643,0.828394,0.473643,0.830837,0.468106,0.856849,0.370482,0.856849,0.356767,0.862901,0.370482,0.84405,0.518519,0.829059,0.518519,0.831502,0.512982,0.975439,0.195141,0.975439,0.193152,0.981491,0.19514,0.398624,0.978297,0.392254,0.978297,0.398003,0.976408,0.08548,0.980597,0.084859,0.978708,0.091229,0.978708,0.503723,0.979153,0.497353,0.979153,0.503102,0.977263,0.728293,0.836087,0.728293,0.822372,0.734345,0.836087,0.487064,0.834928,0.472073,0.834928,0.474516,0.829391,0.785945,0.840849,0.785945,0.827134,0.791997,0.840849,0.527955,0.831291,0.512964,0.831291,0.515407,0.825754,0.975495,0.732494,0.975495,0.730505,0.981547,0.732493,0.420452,0.978546,0.414082,0.978546,0.419831,0.976657,0.974776,0.102816,0.974155,0.100926,0.980526,0.100926,0.268231,0.978773,0.26186,0.978773,0.26761,0.976883,0.973813,0.415153,0.973192,0.413263,0.979562,0.413263,0.978796,0.898184,0.972425,0.898184,0.978175,0.896295,0.214188,0.84617,0.214188,0.832455,0.22024,0.84617,0.466795,0.834928,0.451804,0.834928,0.454247,0.829391,0.331738,0.976177,0.331117,0.974287,0.337488,0.974287,0.877568,0.97798,0.871197,0.97798,0.876947,0.97609,0.441503,0.839067,0.428955,0.83353,0.443946,0.83353,0.245194,0.839271,0.230203,0.839271,0.232646,0.833734,0.975724,0.251447,0.975103,0.249557,0.981473,0.249557,0.979999,0.092224,0.973628,0.092224,0.979378,0.090335,0.107388,0.827161,0.119936,0.832698,0.104945,0.832698,0.168672,0.826561,0.183663,0.826561,0.181219,0.832098,0.975437,0.231103,0.975437,0.229114,0.98149,0.231102,0.865919,0.97798,0.859549,0.97798,0.865298,0.97609,0.849393,0.13951,0.863108,0.139509,0.849393,0.145562,0.080094,0.8339,0.095085,0.8339,0.092642,0.839437,0.974359,0.845225,0.973738,0.843336,0.980108,0.843336,0.152374,0.980384,0.146004,0.980384,0.151753,0.978494,0.023658,0.978993,0.023037,0.977103,0.029408,0.977103,0.978796,0.873505,0.972425,0.873505,0.978175,0.871615,0.626341,0.980591,0.62572,0.978702,0.632091,0.978702,0.980553,0.341044,0.974183,0.341044,0.979933,0.339155,0.849472,0.532043,0.863187,0.532043,0.849471,0.538095,0.360995,0.834601,0.375986,0.834601,0.373542,0.840137,0.755974,0.873502,0.73991,0.873502,0.754305,0.869475,0.612288,0.869438,0.597892,0.873465,0.596224,0.869438,0.552318,0.872095,0.550649,0.876123,0.536254,0.872095,0.193459,0.871652,0.207855,0.87568,0.191791,0.87568,0.513491,0.04715,0.498289,0.052342,0.498289,0.002639,0.574931,0.05762,0.574931,0.107322,0.559729,0.062812,0.448124,0.546683,0.463326,0.502173,0.463326,0.551875,0.498289,0.107322,0.498289,0.05762,0.513491,0.062812,0.356247,0.756804,0.366339,0.755458,0.366339,0.769302,0.824789,0.379079,0.824789,0.365234,0.831196,0.373169,0.525335,0.546677,0.540537,0.502167,0.540537,0.551869,0.539249,0.107322,0.539249,0.05762,0.554451,0.062812,0.559729,0.047149,0.574931,0.002639,0.574931,0.052342,0.580209,0.107322,0.580209,0.05762,0.595411,0.062811,0.686117,0.302249,0.686117,0.255214,0.691588,0.293663,0.716443,0.705168,0.716443,0.666333,0.720649,0.675605,0.518769,0.10213,0.533971,0.05762,0.533971,0.107322,0.518769,0.052342,0.518769,0.002639,0.533971,0.007831,0.390825,0.546693,0.375623,0.551885,0.375623,0.502183,0.561017,0.502167,0.561017,0.551869,0.545815,0.507358,0.929535,0.829143,0.925507,0.830812,0.913471,0.829143,0.04259,0.933507,0.054627,0.935175,0.038562,0.935175,0.907932,0.356522,0.923996,0.356522,0.91196,0.358191,0.879924,0.110474,0.89196,0.108806,0.895988,0.110474,0.797012,0.558283,0.813076,0.558283,0.80104,0.559951,0.142335,0.937944,0.154371,0.936276,0.158399,0.937944,0.856276,0.608771,0.852248,0.61044,0.840212,0.608771,0.7996,0.21781,0.811637,0.219478,0.795572,0.219478,0.463576,0.699578,0.459235,0.699981,0.459235,0.652744,0.329248,0.557176,0.329248,0.604414,0.324907,0.557579,0.823697,0.870669,0.839761,0.870669,0.825365,0.874697,0.104945,0.874724,0.119341,0.870696,0.121009,0.874724,0.704813,0.367866,0.709173,0.367866,0.704816,0.414901,0.705274,0.471028,0.709632,0.423992,0.709634,0.471028,0.651399,0.874684,0.653067,0.870656,0.667463,0.874684,0.299662,0.875052,0.285266,0.871024,0.30133,0.871024,0.878668,0.585898,0.868469,0.585898,0.87461,0.57897,0.265324,0.89988,0.259183,0.906808,0.256423,0.89988,0.707174,0.22125,0.71424,0.192237,0.715203,0.22125,0.714451,0.396895,0.714451,0.367866,0.721455,0.371792,0.002639,0.75574,0.016362,0.764091,0.002639,0.765921,0.146817,0.821708,0.160662,0.821708,0.154752,0.828115,0.613652,0.597757,0.613652,0.644792,0.608182,0.606343,0.723003,0.549533,0.723003,0.588369,0.718797,0.579097,0.763414,0.462821,0.747349,0.462821,0.758121,0.454123,0.348882,0.816996,0.348882,0.830841,0.342475,0.824931,0.207855,0.756005,0.202562,0.764702,0.191791,0.756005,0.127695,0.821708,0.141539,0.821708,0.133604,0.828115,0.470242,0.477725,0.470242,0.451663,0.472388,0.474356,0.618775,0.849451,0.618775,0.826657,0.620595,0.830212,0.960004,0.346322,0.968905,0.346322,0.96208,0.349734,0.966532,0.039751,0.974162,0.039751,0.972436,0.042702,0.869767,0.127467,0.877399,0.124973,0.877399,0.134231,0.898734,0.303709,0.898734,0.29445,0.905395,0.300354,0.508166,0.689042,0.501099,0.718055,0.500136,0.689042,0.34021,0.093053,0.34021,0.122082,0.333206,0.118155,0.224387,0.870441,0.220329,0.87737,0.214188,0.870441,0.897992,0.00295,0.906261,0.007114,0.897992,0.010408,0.271107,0.869415,0.279908,0.874569,0.271107,0.877445,0.428955,0.899706,0.438214,0.899706,0.434859,0.906367,0.329089,0.638589,0.329089,0.645189,0.324907,0.640321,0.879231,0.414489,0.884099,0.410308,0.885831,0.414489,0.798141,0.425025,0.793734,0.44384,0.793734,0.423992,0.796309,0.052071,0.796309,0.071919,0.791902,0.070887,0.968793,0.498099,0.959892,0.498099,0.966716,0.494687,0.468732,0.955367,0.468732,0.962997,0.465781,0.961271,0.96006,0.750079,0.962136,0.746668,0.968961,0.750079,0.674908,0.760437,0.674908,0.752807,0.677859,0.758711,0.126849,0.574449,0.126849,0.60051,0.124703,0.577817,0.674611,0.839812,0.674611,0.862606,0.672792,0.859051,0.968757,0.441433,0.96668,0.444845,0.959856,0.441433,0.966456,0.75862,0.974086,0.75862,0.968182,0.761572,0.738079,0.975976,0.73696,0.977815,0.731479,0.975976,0.978058,0.560783,0.98384,0.560783,0.978757,0.562488,0.759825,0.801262,0.759825,0.820587,0.758668,0.803077,0.553308,0.881401,0.553308,0.898949,0.552274,0.897061,0.970027,0.700284,0.971438,0.704585,0.965021,0.704585,0.19225,0.691756,0.19225,0.698173,0.187949,0.693167,0.791305,0.211053,0.795712,0.192237,0.795712,0.212085,0.79182,0.552405,0.79182,0.532558,0.796227,0.53359,0.965515,0.948059,0.965515,0.943533,0.971613,0.945533,0.969338,0.400819,0.96447,0.396637,0.97107,0.396637,0.970027,0.695006,0.965021,0.690706,0.971438,0.690706,0.337488,0.957205,0.33139,0.959205,0.33139,0.954679,0.002872,0.925177,0.013142,0.929431,0.002872,0.930538,0.923098,0.212763,0.933428,0.212763,0.931053,0.217109,0.26198,0.740509,0.252909,0.753317,0.252909,0.734084,0.751484,0.468106,0.751484,0.487339,0.742413,0.480914,0.764959,0.975976,0.77156,0.975976,0.766078,0.977815,0.978129,0.608019,0.983911,0.608019,0.983211,0.609723,0.247434,0.931972,0.247434,0.912647,0.24859,0.930157,0.932325,0.801845,0.932325,0.784298,0.933359,0.786185,0.713516,0.977825,0.706915,0.977825,0.712397,0.975986,0.983911,0.602741,0.978129,0.602741,0.978828,0.601036,0.718794,0.977825,0.719912,0.975986,0.725394,0.977825,0.983934,0.027201,0.978153,0.027201,0.983235,0.025497,0.148643,0.930998,0.148069,0.925668,0.158399,0.925668,0.684366,0.935325,0.674036,0.935325,0.681992,0.930979,0.742062,0.299638,0.751134,0.286831,0.751134,0.306063,0.742992,0.65529,0.742992,0.636057,0.752063,0.642482,0.88372,0.523848,0.883145,0.518518,0.893475,0.518518,0.892136,0.659059,0.881806,0.659059,0.889761,0.654713,0.891933,0.926796,0.902203,0.93105,0.891933,0.932156,0.474476,0.930799,0.484806,0.930799,0.482432,0.935145,0.699535,0.380647,0.686117,0.390651,0.686117,0.367866,0.736784,0.283278,0.736784,0.306063,0.728365,0.289555,0.702262,0.063835,0.714168,0.052071,0.714168,0.07349,0.720481,0.213656,0.720481,0.192237,0.729993,0.204257,0.23776,0.131256,0.221183,0.249965,0.221183,0.128941,0.215905,0.128941,0.215905,0.249965,0.199329,0.247651,0.084779,0.004954,0.068203,0.123663,0.068203,0.002639,0.106633,0.002639,0.106633,0.123664,0.090057,0.121349,0.062925,0.004954,0.046348,0.123663,0.046348,0.002639,0.172196,0.002639,0.172196,0.123663,0.15562,0.121348,0.700555,0.107585,0.686677,0.120039,0.686677,0.09823,0.729145,0.052071,0.729145,0.07388,0.719446,0.067341,0.713603,0.29666,0.696866,0.29666,0.709055,0.278576,0.193205,0.704523,0.193205,0.726332,0.183505,0.711062,0.23776,0.004954,0.221183,0.123663,0.221183,0.002639,0.243038,0.128941,0.259775,0.248802,0.243038,0.248802,0.150342,0.131256,0.133766,0.249966,0.133766,0.128941,0.194051,0.128941,0.194051,0.249965,0.177474,0.247651,0.019215,0.131256,0.002639,0.249966,0.002639,0.128941,0.04107,0.128941,0.04107,0.249966,0.024494,0.247651,0.109963,0.75847,0.097608,0.753352,0.122317,0.753352,0.048345,0.697209,0.03889,0.687753,0.071173,0.687753,0.1305,0.680556,0.125383,0.668202,0.160326,0.668202,0.472073,0.683764,0.47719,0.67141,0.507016,0.683764,0.664701,0.07349,0.674157,0.064035,0.696984,0.07349,0.038562,0.758785,0.050916,0.753668,0.06327,0.758785,0.294921,0.69893,0.306685,0.710835,0.285266,0.710835,0.515677,0.716012,0.537096,0.716012,0.525076,0.725524,0.311963,0.715667,0.311963,0.69893,0.327199,0.713984,0.727252,0.092952,0.705833,0.092952,0.717853,0.083441,0.335022,0.701088,0.351658,0.702925,0.335022,0.716416,0.567268,0.719677,0.588687,0.719677,0.576667,0.729189,0.589284,0.699164,0.606021,0.699164,0.590967,0.714399,0.722094,0.18466,0.722094,0.163242,0.731605,0.175261,0.584006,0.714399,0.567268,0.714399,0.582323,0.699164,0.097608,0.711251,0.119027,0.711251,0.107007,0.720763,0.611299,0.7158,0.613136,0.699164,0.626627,0.7158,0.457283,0.729157,0.457283,0.707738,0.466795,0.719758,0.661054,0.699002,0.672818,0.710908,0.651399,0.710908,0.371884,0.720345,0.393303,0.720345,0.381283,0.729857,0.680391,0.881362,0.690093,0.88538,0.680391,0.888424,0.944538,0.116301,0.954706,0.116301,0.948446,0.119572,0.482077,0.70246,0.472073,0.689042,0.494858,0.689042,0.494858,0.730947,0.472073,0.730947,0.488582,0.722528,0.32796,0.665549,0.314542,0.675553,0.314542,0.652767,0.731436,0.09823,0.731436,0.121016,0.723017,0.104507,0.262913,0.70211,0.252909,0.688691,0.275694,0.688691,0.717213,0.736632,0.694427,0.736632,0.710936,0.728213,0.705549,0.02117,0.689051,0.018354,0.705549,0.002639,0.732815,0.423992,0.732815,0.446778,0.724396,0.430269,0.705788,0.044716,0.689051,0.044716,0.70267,0.026448,0.735152,0.339802,0.735152,0.362588,0.726733,0.346079,0.705787,0.63957,0.68905,0.63957,0.70267,0.621302,0.735152,0.367866,0.735152,0.390651,0.726733,0.374143,0.711165,0.6846,0.694427,0.6846,0.708047,0.666333,0.7367,0.549533,0.7367,0.572319,0.728281,0.55581,0.590856,0.658722,0.57641,0.652738,0.605302,0.652738,0.552374,0.123657,0.541317,0.1126,0.579067,0.1126,0.205313,0.642899,0.199329,0.628453,0.240189,0.628453,0.125383,0.644095,0.125383,0.628458,0.163133,0.628458,0.651399,0.67739,0.662456,0.666333,0.689149,0.67739,0.322766,0.727677,0.337212,0.721694,0.351658,0.727677,0.335996,0.743846,0.349225,0.749326,0.322766,0.749326,0.68621,0.582354,0.696335,0.592479,0.661764,0.592479,0.681399,0.09823,0.681399,0.11255,0.646828,0.09823,0.335022,0.680161,0.335022,0.665841,0.369594,0.665841,0.61155,0.676459,0.621676,0.666333,0.646121,0.676459,0.651399,0.747529,0.664629,0.742049,0.677859,0.747529,0.412916,0.766368,0.415659,0.773345,0.398922,0.773345,0.597734,0.778141,0.614471,0.778141,0.601656,0.78453,0.745949,0.009616,0.743206,0.002639,0.759943,0.002639,0.722827,0.78215,0.70609,0.78215,0.718905,0.77576,0.146817,0.778809,0.146817,0.771312,0.162394,0.777436,0.185264,0.7837,0.168527,0.7837,0.181343,0.77731,0.268442,0.772533,0.268442,0.78003,0.252866,0.773906,0.398922,0.778623,0.415659,0.778623,0.402844,0.785013,0.710859,0.301938,0.713603,0.308916,0.696866,0.308916,0.765221,0.002639,0.781958,0.002639,0.769143,0.009029,0.231403,0.779722,0.231403,0.772225,0.246979,0.778349,0.57561,0.782768,0.558873,0.782768,0.571688,0.776378,0.781564,0.74145,0.774587,0.744194,0.774587,0.727457,0.428955,0.773128,0.445692,0.773128,0.432877,0.779518,0.535819,0.768897,0.542796,0.766154,0.542796,0.782891,0.778818,0.271951,0.778818,0.255214,0.785208,0.26803,0.599971,0.123656,0.58642,0.118043,0.613521,0.118043,0.345393,0.69581,0.335022,0.685439,0.370431,0.685439,0.130996,0.662924,0.125383,0.649373,0.16371,0.649373,0.472073,0.666132,0.477686,0.652582,0.510399,0.666132,0.515677,0.693551,0.526049,0.68318,0.551086,0.693551,0.322766,0.738568,0.336316,0.732955,0.349867,0.738568,0.721042,0.536474,0.735034,0.54227,0.707051,0.54227,0.31112,0.682943,0.321829,0.693652,0.285266,0.693652,0.235891,0.648177,0.235891,0.663322,0.199329,0.648178,0.016631,0.668028,0.002639,0.662233,0.016631,0.628454,0.567268,0.693886,0.577977,0.683177,0.603831,0.693886,0.646828,0.123624,0.660819,0.117828,0.674811,0.123624,0.75323,0.789845,0.756322,0.795984,0.73991,0.795984,0.72079,0.402173,0.72079,0.418585,0.714451,0.404831,0.288358,0.796779,0.285266,0.790641,0.301679,0.790641,0.728293,0.791661,0.728293,0.775249,0.734632,0.789004,0.041654,0.801547,0.038562,0.795408,0.054975,0.795408,0.183663,0.795851,0.168527,0.789504,0.183663,0.788978,0.611055,0.789808,0.614147,0.795947,0.597734,0.795947,0.322766,0.788923,0.337901,0.79527,0.322766,0.795796,0.549574,0.792718,0.552666,0.798857,0.536254,0.798856,0.371884,0.786737,0.388297,0.786737,0.374542,0.793075,0.402014,0.79643,0.398922,0.790291,0.415335,0.790291,0.528099,0.795043,0.512964,0.788697,0.528099,0.78817,0.789886,0.790285,0.792978,0.796423,0.776565,0.796423,0.230566,0.785,0.246979,0.785,0.233224,0.791339,0.765149,0.779874,0.771287,0.776783,0.771287,0.793195,0.356247,0.790992,0.356247,0.77458,0.362585,0.788334,0.469199,0.606356,0.469199,0.5569,0.470034,0.601747,0.014679,0.622303,0.014679,0.574449,0.015486,0.576067,0.549842,0.760876,0.535819,0.755067,0.549842,0.749178,0.747709,0.082145,0.737007,0.092952,0.73253,0.082145,0.696866,0.338915,0.713603,0.338915,0.701413,0.356998,0.718881,0.333637,0.718881,0.311828,0.728581,0.327098,0.686117,0.463533,0.699996,0.451079,0.699996,0.472888,0.168527,0.726332,0.168527,0.704523,0.178227,0.711062,0.355746,0.122503,0.355746,0.002639,0.360446,0.104459,0.546789,0.659072,0.546789,0.557147,0.550652,0.575389,0.380402,0.002639,0.380402,0.122498,0.375702,0.020684,0.428456,0.55717,0.428456,0.659091,0.424593,0.640849,0.398837,0.315572,0.398837,0.399347,0.396103,0.326069,0.398444,0.404625,0.398444,0.477954,0.396103,0.467363,0.580888,0.779159,0.580888,0.768312,0.592233,0.776306,0.501019,0.823242,0.501019,0.809363,0.507664,0.815081,0.756002,0.544255,0.741978,0.538446,0.756002,0.532558,0.611758,0.752829,0.597734,0.758718,0.597734,0.74702,0.381159,0.328209,0.370373,0.332739,0.370373,0.317529,0.75938,0.224756,0.75938,0.239966,0.748594,0.229286,0.08033,0.750418,0.069545,0.754948,0.069545,0.739738,0.179197,0.628458,0.179197,0.643668,0.168411,0.632987,0.015486,0.441862,0.015486,0.504637,0.014166,0.444401,0.499577,0.502164,0.499577,0.56241,0.498312,0.559842,0.183872,0.772032,0.168527,0.765676,0.183872,0.763266,0.054095,0.79013,0.038562,0.79013,0.042785,0.783219,0.061574,0.771693,0.052707,0.777941,0.052707,0.764063,0.220833,0.813298,0.220833,0.827177,0.214188,0.821459,0.683137,0.76679,0.694834,0.76679,0.685782,0.77731,0.06063,0.828993,0.06063,0.815114,0.067275,0.823275,0.342779,0.399348,0.342779,0.315574,0.345513,0.388851,0.324654,0.47796,0.324654,0.404633,0.326995,0.415224,0.605364,0.772863,0.597734,0.763996,0.611613,0.763996,0.697015,0.824293,0.683137,0.824293,0.691297,0.817648,0.343121,0.597785,0.343131,0.660563,0.335022,0.597787,0.659432,0.597757,0.659432,0.661055,0.651399,0.660019,0.442807,0.59778,0.442818,0.660558,0.434708,0.597782,0.108792,0.592597,0.108793,0.655894,0.10076,0.654858,0.529701,0.771224,0.514356,0.764869,0.529701,0.762458,0.789331,0.089056,0.773798,0.089056,0.77802,0.082145,0.267082,0.758595,0.268442,0.767255,0.252909,0.767255,0.683137,0.782588,0.69867,0.782588,0.687359,0.789499,0.697,0.876084,0.680391,0.876084,0.695553,0.87254,0.745817,0.630779,0.730246,0.630779,0.732462,0.627657,0.76716,0.082145,0.76852,0.090805,0.752987,0.090805,0.146817,0.784087,0.16235,0.784087,0.15104,0.790998,0.111487,0.784955,0.101785,0.780936,0.111487,0.777892,0.954558,0.043021,0.94439,0.043021,0.95065,0.039751,0.002639,0.869877,0.002639,0.859375,0.009164,0.867174,0.954726,0.341044,0.944558,0.341044,0.950818,0.337774,0.878292,0.163316,0.878292,0.173817,0.871767,0.166019,0.945067,0.200853,0.955235,0.200853,0.948976,0.204123,0.018242,0.875483,0.028743,0.875483,0.020945,0.882008,0.954782,0.749938,0.944614,0.749938,0.950874,0.746668,0.138196,0.882887,0.127695,0.882887,0.135494,0.876362,0.944445,0.494828,0.954614,0.494828,0.948354,0.498099,0.876183,0.420544,0.885885,0.424563,0.876183,0.427607,0.945067,0.192305,0.955236,0.192305,0.948976,0.195575,0.201493,0.888021,0.191791,0.884002,0.201493,0.880958,0.032177,0.954807,0.022008,0.954807,0.028269,0.951537,0.140891,0.815208,0.138548,0.815445,0.138548,0.792069,0.834878,0.664342,0.834878,0.687718,0.832536,0.664579,0.766595,0.214752,0.760764,0.216262,0.760764,0.192237,0.76711,0.532558,0.76711,0.556582,0.76128,0.534067,0.873953,0.401536,0.873953,0.410694,0.865727,0.404939,0.95932,0.83609,0.96936,0.83609,0.960668,0.838016,0.029174,0.740489,0.021707,0.74302,0.021707,0.718463,0.742676,0.128934,0.742676,0.153492,0.735209,0.131466,0.877371,0.565229,0.87387,0.573692,0.868469,0.565229,0.96197,0.521343,0.972009,0.521343,0.963318,0.52327,0.874646,0.103528,0.864954,0.099518,0.874646,0.095644,0.645702,0.659614,0.645551,0.650969,0.645702,0.650906,0.870905,0.453217,0.863585,0.456143,0.863585,0.445705,0.469058,0.637503,0.469058,0.646211,0.468907,0.646167,0.407107,0.721378,0.398581,0.724737,0.398581,0.699739,0.422754,0.701603,0.422754,0.726601,0.414228,0.704962,0.580888,0.755723,0.589593,0.745358,0.589593,0.763034,0.617036,0.764696,0.617036,0.74702,0.625741,0.754331,0.161517,0.723121,0.152991,0.72648,0.152991,0.701483,0.436558,0.701603,0.436558,0.7266,0.428032,0.704962,0.053868,0.739309,0.06327,0.729573,0.06327,0.74839,0.631905,0.748256,0.631905,0.72944,0.641308,0.73852,0.381369,0.866566,0.391061,0.870575,0.381369,0.874449,0.38568,0.067518,0.394325,0.067366,0.394388,0.067518,0.865553,0.724195,0.873057,0.718945,0.873057,0.728984,0.970217,0.732494,0.960177,0.732494,0.968869,0.730567,0.30822,0.7631,0.316925,0.752735,0.316925,0.77041,0.70609,0.770482,0.70609,0.752807,0.714795,0.760118,0.785682,0.332394,0.781384,0.333202,0.781384,0.309537,0.785965,0.128934,0.785965,0.152599,0.781667,0.129742,0.781444,0.362659,0.777146,0.363467,0.777146,0.339802,0.781737,0.390721,0.781737,0.414386,0.777439,0.391529,0.863503,0.812685,0.870823,0.809759,0.870823,0.820197,0.408372,0.067518,0.399666,0.067518,0.399709,0.067366,0.03889,0.73931,0.048293,0.729573,0.048293,0.74839,0.740546,0.414746,0.740546,0.395929,0.749948,0.405009,0.152991,0.741495,0.162394,0.731759,0.162394,0.750575,0.414228,0.750695,0.414228,0.731879,0.42363,0.740959,0.751417,0.760136,0.760122,0.749771,0.760122,0.767447,0.725927,0.769971,0.725927,0.752295,0.734632,0.759606,0.865727,0.396258,0.865727,0.3871,0.873953,0.392855,0.241902,0.974834,0.231862,0.974834,0.240554,0.972907,0.198452,0.741647,0.207855,0.731911,0.207855,0.750727,0.440959,0.750695,0.440959,0.731879,0.450362,0.740958,0.021707,0.758663,0.030411,0.748298,0.030411,0.765974,0.756412,0.302193,0.756412,0.284517,0.765116,0.291828,0.97655,0.802421,0.972383,0.804804,0.972383,0.800356,0.319451,0.990629,0.323899,0.990629,0.322306,0.992198,0.688523,0.735749,0.68466,0.733151,0.688523,0.730975,0.992479,0.990791,0.988046,0.990791,0.99088,0.989227,0.97167,0.015322,0.972488,0.018933,0.966851,0.018933,0.220771,0.974543,0.226408,0.974543,0.224008,0.976342,0.582019,0.982725,0.585239,0.984516,0.579613,0.984516,0.968341,0.602693,0.972851,0.606054,0.966827,0.606052,0.061721,0.992063,0.060127,0.990494,0.064576,0.990494,0.433411,0.967068,0.435386,0.963082,0.438061,0.967068,0.977053,0.648444,0.974389,0.652405,0.972399,0.648444,0.992356,0.684422,0.987922,0.684422,0.989522,0.682859,0.988927,0.066231,0.992804,0.067577,0.988459,0.067577,0.919787,0.997272,0.923889,0.995839,0.92389,0.997272,0.213802,0.995785,0.214276,0.997136,0.209963,0.997136,0.646202,0.942741,0.646202,0.947054,0.644857,0.943213,0.169759,0.995928,0.173829,0.995928,0.16976,0.997361,0.452931,0.908977,0.452931,0.904664,0.454277,0.905136,0.79056,0.991789,0.790089,0.990437,0.794434,0.990437,0.639334,0.122384,0.639334,0.118038,0.640681,0.121915,0.972425,0.882744,0.975089,0.878783,0.97708,0.882744,0.023037,0.991017,0.027471,0.991017,0.025871,0.99258,0.157652,0.97129,0.162303,0.97129,0.160328,0.975275,0.420005,0.992139,0.415556,0.992139,0.418411,0.99057,0.644759,0.970809,0.645554,0.974407,0.639928,0.974407,0.592458,0.982725,0.598083,0.982725,0.595678,0.984516,0.972665,0.587481,0.966642,0.587481,0.971153,0.5841,0.491987,0.977536,0.48635,0.977536,0.489587,0.975737,0.989646,0.695006,0.988046,0.693443,0.99248,0.693443,0.701398,0.247148,0.697536,0.249324,0.697536,0.244551,0.382476,0.962582,0.386643,0.960198,0.386643,0.964647,0.790081,0.625507,0.785633,0.625507,0.787227,0.623937,0.931702,0.712732,0.934187,0.715997,0.923139,0.715997,0.902085,0.455033,0.912408,0.458969,0.899337,0.458969,0.76184,0.943089,0.753274,0.939851,0.764305,0.939851,0.92461,0.00295,0.914291,0.00685,0.911539,0.00295,0.890878,0.456529,0.893035,0.458969,0.88338,0.458969,0.945727,0.463872,0.954909,0.466861,0.943541,0.466861,0.935062,0.363556,0.935063,0.377091,0.932063,0.363556,0.934706,0.597757,0.934705,0.611621,0.931777,0.610972,0.273743,0.966582,0.281241,0.969023,0.271585,0.969023,0.943397,0.320245,0.952578,0.317257,0.954765,0.320245,0.962658,0.232512,0.960512,0.230088,0.970159,0.230088,0.953473,0.278122,0.944293,0.275156,0.95566,0.275156,0.567635,0.939864,0.5701,0.943102,0.559069,0.943102,0.914036,0.514055,0.924355,0.517956,0.911284,0.517956,0.938263,0.464236,0.936056,0.477591,0.936056,0.463872,0.939409,0.413658,0.939409,0.427377,0.937202,0.427012,0.382461,0.953594,0.383879,0.940133,0.383879,0.953743,0.881299,0.960249,0.881299,0.946639,0.882717,0.946789,0.200353,0.94192,0.191791,0.938655,0.202839,0.938655,0.895342,0.861454,0.885019,0.865391,0.882271,0.861454,0.941146,0.059165,0.938939,0.072519,0.938939,0.058801,0.941275,0.926706,0.941275,0.940424,0.939068,0.94006,0.967879,0.173983,0.960377,0.17156,0.970024,0.17156,0.955679,0.529126,0.946499,0.532091,0.944312,0.529126,0.960896,0.363705,0.959478,0.377166,0.959478,0.363556,0.436602,0.941587,0.436602,0.955197,0.435184,0.955048,0.734136,0.943089,0.731671,0.939851,0.742702,0.939851,0.920992,0.303709,0.910673,0.299808,0.923744,0.299808,0.171157,0.937503,0.17972,0.940768,0.168672,0.940768,0.900874,0.187199,0.911197,0.183263,0.913945,0.187199,0.942035,0.577678,0.939829,0.591032,0.939829,0.577313,0.940007,0.015322,0.942244,0.028857,0.940007,0.028857,0.968014,0.222387,0.970159,0.22481,0.960512,0.22481,0.946499,0.537369,0.95568,0.540335,0.944312,0.540335,0.824952,0.625987,0.817454,0.623547,0.827109,0.623547,0.954909,0.472139,0.945727,0.475127,0.943541,0.472139,0.935068,0.810108,0.935068,0.823643,0.932068,0.810108,0.934796,0.084906,0.934796,0.098769,0.931868,0.09812,0.962659,0.200853,0.970161,0.203277,0.960514,0.203277,0.944293,0.286375,0.953473,0.28341,0.95566,0.286375,0.82428,0.046793,0.822122,0.044353,0.831778,0.044353,0.952634,0.142498,0.943452,0.139509,0.95482,0.139509,0.282953,0.922353,0.280746,0.935707,0.280746,0.921988,0.939789,0.192305,0.939789,0.206024,0.937582,0.205659,0.70938,0.939861,0.717947,0.943099,0.706915,0.943099,0.904888,0.654161,0.915206,0.650261,0.917959,0.654161,0.538739,0.941615,0.536254,0.93835,0.547302,0.93835,0.908791,0.332013,0.898468,0.328077,0.911539,0.328077,0.110363,0.306009,0.110129,0.306011,0.110129,0.29261,0.110363,0.311289,0.110363,0.32469,0.110129,0.311291,0.110363,0.287331,0.110129,0.287332,0.110129,0.273927,0.110363,0.386004,0.110363,0.399405,0.110129,0.386005,0.720647,0.156549,0.729436,0.157964,0.720419,0.157964,0.80099,0.185545,0.810007,0.185545,0.809779,0.186959,0.589497,0.934602,0.589497,0.924113,0.593874,0.933017,0.222212,0.941198,0.212292,0.941198,0.214223,0.937271,0.786141,0.046493,0.785634,0.041866,0.795554,0.041866,0.137057,0.940203,0.127136,0.940203,0.135126,0.936276,0.720709,0.218934,0.729498,0.220348,0.720481,0.220348,0.720354,0.529781,0.729371,0.529781,0.729143,0.531196,0.780194,0.182905,0.775616,0.183722,0.775616,0.160102,0.780356,0.015686,0.780356,0.039305,0.775777,0.016503,0.011165,0.723008,0.002639,0.726367,0.002639,0.70137,0.207855,0.701635,0.207855,0.726633,0.199329,0.704995,0.133909,0.723121,0.125383,0.72648,0.125383,0.701483,0.235462,0.701635,0.235462,0.726633,0.226937,0.704995,0.765747,0.074586,0.759917,0.076096,0.759917,0.052071,0.76625,0.309537,0.76625,0.333562,0.76042,0.311047,0.766468,0.524682,0.760637,0.526191,0.760637,0.502167,0.763872,0.565229,0.763872,0.589254,0.758042,0.566739,0.212292,0.903638,0.212292,0.89315,0.218316,0.903638,0.506662,0.889387,0.494567,0.889387,0.497567,0.884163,0.928636,0.182572,0.929144,0.187199,0.919223,0.187199,0.891933,0.937434,0.901853,0.937434,0.893864,0.941361,0.748594,0.245244,0.759083,0.245244,0.75018,0.24962,0.363147,0.9365,0.373068,0.9365,0.371137,0.940427,0.073843,0.783083,0.069545,0.783891,0.069545,0.760226,0.783845,0.631265,0.783845,0.654931,0.779547,0.632074,0.894383,0.793084,0.894383,0.803572,0.888359,0.793084,0.871594,0.048299,0.883689,0.048299,0.880689,0.053523,0.877616,0.456143,0.876183,0.456143,0.877616,0.432885,0.877499,0.275612,0.876067,0.29887,0.876067,0.275612,0.870808,0.5492,0.868465,0.549425,0.868465,0.529126,0.899136,0.720969,0.899136,0.741268,0.89729,0.721146,0.110363,0.566596,0.110145,0.566599,0.110145,0.554107,0.645903,0.699164,0.645903,0.71025,0.645709,0.699166,0.749594,0.360322,0.74043,0.360322,0.748455,0.339802,0.756516,0.015686,0.756516,0.03772,0.74979,0.018317,0.755359,0.521377,0.747889,0.5239,0.747889,0.502167,0.771868,0.339802,0.771868,0.361536,0.76598,0.341791,0.645769,0.627858,0.645551,0.62786,0.645551,0.61537,0.370934,0.701088,0.370934,0.712173,0.37074,0.701089,0.110363,0.584367,0.110145,0.584368,0.110145,0.571877,0.095482,0.673399,0.095482,0.684488,0.095289,0.6734,0.385039,0.755747,0.385039,0.735135,0.392916,0.755391,0.765522,0.119964,0.765522,0.09823,0.77141,0.100219,0.41396,0.900483,0.41253,0.900572,0.41253,0.879981,0.621143,0.772657,0.621143,0.793247,0.620016,0.772727,0.674222,0.913622,0.672792,0.913712,0.672792,0.893461,0.390474,0.905304,0.390474,0.925555,0.389347,0.905375,0.214188,0.751121,0.221659,0.731911,0.221659,0.753645,0.7654,0.771505,0.7654,0.749771,0.771287,0.75176,0.86982,0.65158,0.867477,0.651804,0.867477,0.631505,0.674639,0.867884,0.674639,0.888183,0.672792,0.868061,0.677708,0.786535,0.673414,0.787366,0.673414,0.76679,0.827325,0.015686,0.827325,0.036262,0.823941,0.016341,0.787015,0.411228,0.789094,0.390721,0.791666,0.411228,0.824006,0.072607,0.820346,0.052266,0.824006,0.052071,0.754639,0.071282,0.747169,0.073805,0.747169,0.052071,0.770678,0.693924,0.770678,0.715658,0.764791,0.695913,0.772161,0.410484,0.766335,0.412007,0.766335,0.390721,0.788456,0.423992,0.788456,0.445279,0.783864,0.425193,0.106143,0.744736,0.097608,0.748074,0.097608,0.726041,0.247467,0.701635,0.247467,0.723669,0.24074,0.704266,0.834958,0.038944,0.832603,0.038944,0.834957,0.015686,0.835482,0.775203,0.833128,0.798461,0.833128,0.775203,0.742738,0.214263,0.735271,0.216795,0.735271,0.192237,0.742611,0.502167,0.742611,0.526725,0.735143,0.504699,0.77571,0.687144,0.780288,0.664342,0.780288,0.687961,0.775776,0.621377,0.775776,0.597757,0.780355,0.598574,0.110363,0.268648,0.110129,0.268649,0.110129,0.255244,0.110363,0.329968,0.110363,0.343369,0.110129,0.32997,0.392986,0.821492,0.390643,0.82173,0.390643,0.798353,0.423279,0.766368,0.423279,0.789745,0.420937,0.766605,0.218486,0.78178,0.214188,0.782588,0.214188,0.758923,0.278018,0.758595,0.278018,0.78226,0.27372,0.759403,0.775956,0.716727,0.780535,0.693924,0.780535,0.717544,0.776688,0.12185,0.776688,0.09823,0.781266,0.099047,0.355716,0.875579,0.354287,0.875667,0.354287,0.852365,0.397784,0.557163,0.397784,0.580465,0.396353,0.557252,0.110363,0.362046,0.110129,0.362048,0.110129,0.348647,0.110363,0.367326,0.110363,0.380726,0.110129,0.367327,0.355716,0.846999,0.354287,0.847087,0.354287,0.823785,0.871132,0.495217,0.871132,0.518519,0.869702,0.495305,0.737714,0.658083,0.730246,0.660615,0.730246,0.636057,0.741891,0.052071,0.741891,0.076629,0.734423,0.054603,0.549842,0.741368,0.542374,0.7439,0.542374,0.719342,0.743316,0.224756,0.743316,0.249314,0.735849,0.227288,0.766532,0.151449,0.760702,0.152959,0.760702,0.128934,0.091438,0.739738,0.091438,0.763763,0.085608,0.741248,0.873024,0.082014,0.871594,0.082102,0.871594,0.058801,0.877233,0.309238,0.875804,0.332496,0.8758,0.309238,0.780401,0.247559,0.775823,0.248376,0.775823,0.224756,0.781144,0.749771,0.781144,0.773391,0.776565,0.750588,0.140891,0.786554,0.138548,0.786791,0.138548,0.763415,0.721455,0.339211,0.721455,0.362588,0.719113,0.339448,0.93377,0.519975,0.929633,0.514055,0.937555,0.514055,0.7796,0.046542,0.771677,0.046542,0.778537,0.045021,0.408189,0.926604,0.41396,0.9243,0.41396,0.932534,0.751417,0.772725,0.758252,0.772725,0.758218,0.772843,0.926893,0.48955,0.926893,0.483336,0.934541,0.48639,0.265053,0.682934,0.271891,0.682934,0.271857,0.683053,0.92977,0.865391,0.932528,0.858716,0.936796,0.865391,0.536254,0.97496,0.544176,0.97496,0.537317,0.976481,0.880834,0.931104,0.884971,0.937023,0.877049,0.937023,0.887995,0.974707,0.895917,0.974707,0.889058,0.976228,0.493907,0.742155,0.488136,0.74446,0.488136,0.736225,0.591184,0.112719,0.584345,0.112719,0.584379,0.1126,0.26407,0.930536,0.26407,0.93675,0.256423,0.933696,0.754854,0.219367,0.748016,0.219367,0.74805,0.219249,0.314132,0.939712,0.32131,0.943829,0.311771,0.943829,0.93231,0.75862,0.941849,0.75862,0.939487,0.762738,0.967401,0.929799,0.965882,0.926706,0.973709,0.926706,0.967125,0.153228,0.960098,0.149781,0.968372,0.149782,0.770068,0.625457,0.761794,0.625458,0.770067,0.620711,0.114484,0.943542,0.104945,0.943542,0.107307,0.939424,0.972482,0.363556,0.974001,0.36665,0.966174,0.36665,0.961345,0.139509,0.968372,0.142956,0.960098,0.142956,0.868648,0.591176,0.875585,0.592291,0.868469,0.592291,0.861134,0.786343,0.86825,0.786343,0.868071,0.787458,0.841409,0.089538,0.847717,0.092631,0.839889,0.092631,0.960187,0.464722,0.967967,0.463872,0.967967,0.467537,0.972482,0.375021,0.966174,0.371928,0.974001,0.371928,0.967958,0.72409,0.960177,0.72494,0.960177,0.721275,0.965451,0.793876,0.972477,0.793876,0.965451,0.795005,0.879747,0.716705,0.886863,0.716705,0.886684,0.717819,0.791997,0.849912,0.786078,0.854049,0.786078,0.846127,0.966096,0.659028,0.958174,0.659028,0.965033,0.657507,0.739624,0.685029,0.748158,0.666333,0.748158,0.688366,0.428955,0.753912,0.428955,0.731879,0.435681,0.734509,0.590927,0.900296,0.589497,0.900385,0.589497,0.879794,0.556247,0.733879,0.556247,0.75447,0.55512,0.733949,0.095482,0.633983,0.095264,0.633985,0.095264,0.621494,0.022102,0.646222,0.022102,0.657311,0.021909,0.646224,0.774269,0.650616,0.76845,0.652167,0.76845,0.631265,0.790219,0.597757,0.790219,0.618659,0.785633,0.59898,0.867338,0.244831,0.869682,0.224756,0.869682,0.245055,0.798582,0.795502,0.798582,0.775203,0.800429,0.77538,0.794779,0.27112,0.790486,0.271951,0.790486,0.251375,0.827164,0.160102,0.827164,0.180679,0.823781,0.160757,0.776414,0.302193,0.770394,0.302002,0.776414,0.281986,0.79022,0.015686,0.79022,0.036588,0.785634,0.016909,0.785813,0.714013,0.790427,0.693924,0.790427,0.714592,0.504027,0.804085,0.504027,0.783418,0.507664,0.783874,0.77354,0.275818,0.76752,0.275632,0.773539,0.255214,0.552666,0.766154,0.552666,0.78744,0.548074,0.767354,0.869307,0.212688,0.869307,0.192477,0.871661,0.212639,0.897624,0.242686,0.897624,0.222387,0.899471,0.222564,0.794317,0.584975,0.790024,0.585805,0.790024,0.565229,0.82785,0.775203,0.82785,0.79578,0.824466,0.775859,0.500136,0.742029,0.508671,0.723333,0.508671,0.745366,0.749629,0.182136,0.749629,0.160102,0.756355,0.162733,0.914067,0.40726,0.912637,0.40735,0.912637,0.3871,0.932848,0.664342,0.932848,0.684593,0.931722,0.664413,0.791171,0.118842,0.786544,0.118373,0.791171,0.09823,0.823386,0.192237,0.823386,0.212904,0.819749,0.192693,0.793417,0.65101,0.789123,0.651842,0.789123,0.631265,0.827228,0.693924,0.827228,0.714501,0.823844,0.694579,0.466354,0.79339,0.461704,0.79339,0.464277,0.772884,0.825843,0.423992,0.823272,0.444499,0.822178,0.423992,0.911092,0.982627,0.914509,0.984042,0.907675,0.984042,0.632034,0.970809,0.63465,0.973424,0.62572,0.973424,0.751343,0.492617,0.751343,0.496316,0.742413,0.492617,0.95932,0.856098,0.95932,0.852399,0.96825,0.852399,0.082299,0.973429,0.084915,0.970814,0.091229,0.973429,0.274406,0.983519,0.277823,0.982103,0.281241,0.983519,0.621267,0.118038,0.634057,0.123656,0.618799,0.123656,0.801587,0.041175,0.816844,0.041175,0.814376,0.046793,0.845668,0.526335,0.829059,0.526335,0.844348,0.523796,0.919389,0.08032,0.903891,0.08032,0.905609,0.078031,0.124703,0.504637,0.124703,0.441862,0.126023,0.502098,0.30695,0.543486,0.30695,0.483237,0.308214,0.485805,0.795497,0.62319,0.812106,0.62319,0.796817,0.625729,0.88338,0.487455,0.898878,0.487455,0.89716,0.489744,0.399257,0.005926,0.38568,0.062005,0.38568,0.002639,0.45582,0.002639,0.45582,0.062005,0.442244,0.058718,0.692253,0.192237,0.692258,0.249936,0.686117,0.192238,0.194051,0.501848,0.194051,0.559872,0.187949,0.559224,0.083743,0.685839,0.089844,0.628463,0.089844,0.686487,0.187949,0.623175,0.187949,0.56515,0.194051,0.565799,0.64039,0.828616,0.626421,0.828616,0.64039,0.82248,0.207047,0.823405,0.191791,0.823405,0.194258,0.817787,0.475189,0.80704,0.487435,0.813217,0.472073,0.813217,0.038562,0.806825,0.053924,0.806825,0.050808,0.813002,0.74979,0.042998,0.7664,0.042998,0.751237,0.046542,0.791178,0.493767,0.806749,0.493767,0.804533,0.496889,0.03889,0.318023,0.03889,0.255244,0.040337,0.314479,0.038921,0.584203,0.038921,0.524951,0.040281,0.528529,0.040337,0.323301,0.040337,0.38608,0.03889,0.326845,0.30831,0.548764,0.30831,0.608013,0.30695,0.604435,0.461098,0.119344,0.474416,0.065271,0.474416,0.122624,0.479694,0.122624,0.479694,0.065271,0.493011,0.068551,0.676854,0.058329,0.676845,0.002639,0.683773,0.058328,0.664701,0.058757,0.664702,0.002639,0.671567,0.003492,0.683772,0.597757,0.683772,0.653447,0.676853,0.597757,0.259775,0.627296,0.259775,0.683413,0.252909,0.68256,0.728281,0.591312,0.728281,0.577597,0.7352,0.591312,0.207152,0.812509,0.191791,0.812509,0.194907,0.806332,0.871966,0.026689,0.873914,0.031393,0.86061,0.031393,0.889037,0.591262,0.883946,0.591262,0.883946,0.57897,0.792268,0.933925,0.788668,0.930324,0.792268,0.921633,0.329055,0.692351,0.327107,0.687647,0.329055,0.682943,0.865536,0.554703,0.863867,0.558731,0.849471,0.554703,0.788686,0.870669,0.803082,0.874697,0.787018,0.874697,0.784264,0.380713,0.800328,0.380713,0.785932,0.384741,0.765675,0.874697,0.780071,0.870669,0.78174,0.874697,0.475312,0.546674,0.490514,0.502163,0.490514,0.551866,0.580209,0.052342,0.580209,0.002639,0.595411,0.007831,0.365993,0.546703,0.350791,0.551895,0.350791,0.502192,0.554451,0.002639,0.554451,0.052342,0.539249,0.007831,0.434864,0.821845,0.442799,0.828252,0.428955,0.828252,0.472073,0.76541,0.482844,0.756713,0.488137,0.76541,0.441843,0.117306,0.426641,0.122498,0.426641,0.072796,0.520057,0.502167,0.520057,0.551869,0.504855,0.507359,0.581497,0.546678,0.566295,0.55187,0.566295,0.502167,0.602839,0.502167,0.586775,0.549202,0.586775,0.502167,0.691588,0.362588,0.686117,0.354001,0.691588,0.315553,0.719118,0.423992,0.719118,0.462828,0.714912,0.433264,0.400883,0.117306,0.38568,0.122498,0.38568,0.072796,0.421363,0.072796,0.421363,0.122499,0.406161,0.077988,0.414228,0.5467,0.42943,0.50219,0.42943,0.551892,0.314542,0.551898,0.314542,0.502196,0.329744,0.507388,0.930458,0.269676,0.914394,0.269676,0.926431,0.268007,0.018936,0.935816,0.0069,0.937484,0.002872,0.935816,0.842283,0.590811,0.838256,0.592479,0.826219,0.590811,0.668737,0.659387,0.680774,0.661055,0.66471,0.661055,0.304295,0.932789,0.300267,0.934457,0.288231,0.932789,0.084122,0.9358,0.096158,0.937468,0.080094,0.937468,0.641784,0.937463,0.62572,0.937463,0.637756,0.935794,0.820941,0.590811,0.808905,0.592479,0.804877,0.590811,0.697432,0.549001,0.701773,0.502167,0.701773,0.549403,0.697497,0.176171,0.697497,0.128934,0.701838,0.129337,0.038562,0.876173,0.040231,0.872145,0.054626,0.876173,0.467327,0.876387,0.452931,0.87236,0.468995,0.87236,0.245511,0.64858,0.241169,0.695414,0.241169,0.648177,0.697536,0.192237,0.701896,0.239272,0.697536,0.239273,0.861516,0.874697,0.845452,0.874697,0.859848,0.870669,0.412637,0.870675,0.398242,0.874703,0.396573,0.870675,0.868931,0.260722,0.876563,0.258229,0.876563,0.267487,0.55512,0.728601,0.55512,0.719342,0.561781,0.725246,0.715141,0.157697,0.707116,0.157964,0.707116,0.128934,0.718069,0.597757,0.718069,0.626787,0.711066,0.601684,0.247467,0.758249,0.242174,0.766947,0.231403,0.758249,0.080094,0.822215,0.093938,0.822215,0.086003,0.828622,0.18858,0.449535,0.194051,0.458121,0.18858,0.49657,0.718881,0.29405,0.718881,0.255214,0.723087,0.284778,0.631905,0.75488,0.641997,0.753534,0.641997,0.767379,0.824789,0.353647,0.824789,0.339802,0.831196,0.347737,0.238138,0.828456,0.230203,0.822049,0.244047,0.822049,0.162394,0.764204,0.148671,0.766034,0.148671,0.755853,0.041067,0.615543,0.038921,0.612175,0.041067,0.589481,0.421782,0.82714,0.421782,0.849934,0.419963,0.830695,0.968905,0.337633,0.966829,0.341044,0.960004,0.337633,0.966532,0.056209,0.974162,0.056209,0.968259,0.05916,0.906006,0.514055,0.906006,0.522956,0.899077,0.516815,0.059904,0.879074,0.066045,0.872145,0.070103,0.879074,0.707051,0.502433,0.715076,0.502167,0.715076,0.531196,0.711066,0.044716,0.711066,0.015686,0.71807,0.040789,0.889359,0.010408,0.883455,0.003747,0.892714,0.003747,0.818419,0.875823,0.809618,0.878698,0.809618,0.870669,0.876993,0.870669,0.872935,0.877597,0.866794,0.870669,0.238181,0.899911,0.24645,0.904075,0.238181,0.907369,0.970457,0.784298,0.971868,0.788598,0.965451,0.788598,0.626129,0.73234,0.626129,0.738757,0.621829,0.73375,0.795431,0.665374,0.799837,0.664342,0.799837,0.68419,0.791268,0.298375,0.791268,0.278527,0.795675,0.297343,0.959856,0.436155,0.961932,0.432744,0.968757,0.436155,0.610701,0.6577,0.610701,0.65007,0.613652,0.655974,0.725074,0.04375,0.730978,0.046701,0.723348,0.046701,0.959984,0.119572,0.966809,0.11616,0.968885,0.119572,0.306164,0.613291,0.30831,0.616659,0.306164,0.639352,0.797606,0.849928,0.797606,0.827134,0.799425,0.846373,0.972436,0.050931,0.966532,0.04798,0.974162,0.04798,0.968943,0.308567,0.962119,0.311979,0.960043,0.308567,0.225854,0.983325,0.220771,0.98162,0.226553,0.98162,0.565669,0.975989,0.560187,0.977827,0.559069,0.975989,0.590268,0.784437,0.591424,0.786252,0.590267,0.803762,0.869406,0.327085,0.869406,0.309537,0.87044,0.325198,0.414228,0.659362,0.414228,0.652762,0.418409,0.65763,0.97107,0.384428,0.966202,0.388609,0.96447,0.384428,0.799743,0.178918,0.795337,0.17995,0.795337,0.160102,0.799904,0.015686,0.799904,0.035534,0.795498,0.016718,0.966926,0.953796,0.971933,0.958096,0.965515,0.958096,0.33139,0.966484,0.337488,0.964483,0.337488,0.969009,0.965753,0.070114,0.965753,0.065588,0.971851,0.067588,0.969808,0.668523,0.96494,0.664342,0.97154,0.664342,0.931416,0.926706,0.93379,0.931052,0.923461,0.931052,0.038562,0.922899,0.048892,0.922899,0.039136,0.928229,0.267699,0.740509,0.27677,0.734084,0.27677,0.753317,0.742062,0.274447,0.742062,0.255214,0.751134,0.268022,0.610716,0.97596,0.609597,0.977798,0.604116,0.97596,0.978129,0.594054,0.983911,0.594054,0.978828,0.595758,0.073709,0.834439,0.072553,0.832624,0.073709,0.815114,0.306598,0.82531,0.306598,0.842858,0.305564,0.827197,0.753081,0.977815,0.7542,0.975976,0.759681,0.977815,0.774931,0.592419,0.76915,0.592419,0.774232,0.590714,0.978745,0.673801,0.983827,0.675506,0.978045,0.675506,0.288231,0.977699,0.293712,0.97586,0.294831,0.977699,0.833128,0.818707,0.83785,0.803739,0.83785,0.820197,0.002639,0.835104,0.002639,0.818646,0.007362,0.820136,0.672792,0.833044,0.677515,0.818076,0.677515,0.834534,0.273917,0.829428,0.273917,0.812971,0.27864,0.814461,0.92224,0.104374,0.93251,0.108629,0.92224,0.109735,0.497353,0.932784,0.507682,0.932784,0.505308,0.93713,0.75105,0.562341,0.741978,0.568766,0.741978,0.549533,0.466354,0.734435,0.466354,0.753668,0.457283,0.74086,0.907913,0.926706,0.918183,0.930959,0.907913,0.932066,0.923237,0.650261,0.933566,0.650261,0.931192,0.654607,0.071164,0.932101,0.073538,0.936447,0.063208,0.936447,0.921004,0.620898,0.931334,0.620898,0.921578,0.626227,0.694427,0.708145,0.697545,0.689878,0.711164,0.708145,0.722152,0.249314,0.722152,0.226528,0.730571,0.232806,0.089844,0.703529,0.077939,0.713184,0.077939,0.691765,0.729931,0.128934,0.729931,0.150353,0.720419,0.140954,0.15562,0.131256,0.172196,0.128941,0.172196,0.249966,0.024494,0.123663,0.024494,0.002639,0.04107,0.121348,0.243038,0.002639,0.259775,0.002639,0.243038,0.1225,0.265053,0.122501,0.28179,0.002639,0.28179,0.122501,0.002639,0.004954,0.019216,0.002639,0.019216,0.123663,0.046348,0.249965,0.046348,0.128941,0.062924,0.24765,0.716816,0.178512,0.707116,0.18505,0.707116,0.163242,0.713603,0.315553,0.701413,0.333637,0.696866,0.315553,0.168527,0.68989,0.182406,0.677437,0.182406,0.699245,0.053868,0.724295,0.053868,0.702487,0.063568,0.709025,0.199329,0.004954,0.215905,0.002639,0.215905,0.123663,0.133766,0.123663,0.133766,0.002639,0.150342,0.121349,0.177474,0.004954,0.194051,0.002639,0.194051,0.123663,0.068203,0.249965,0.068203,0.128941,0.084779,0.247651,0.111911,0.131256,0.128488,0.128942,0.128488,0.249966,0.111911,0.123663,0.111911,0.002639,0.128488,0.121349,0.411276,0.76109,0.398922,0.755973,0.42363,0.755973,0.386123,0.694461,0.376667,0.685006,0.40895,0.685006,0.204446,0.680954,0.199329,0.6686,0.234271,0.6686,0.376667,0.679728,0.376667,0.666356,0.40895,0.666356,0.664701,0.088223,0.674157,0.078768,0.696984,0.088223,0.322766,0.759722,0.33512,0.754604,0.347474,0.759722,0.376667,0.715067,0.376667,0.699739,0.393303,0.71323,0.694427,0.713423,0.715846,0.713423,0.706447,0.722935,0.698705,0.656753,0.68905,0.644848,0.710469,0.644848,0.306685,0.725625,0.285266,0.725625,0.294665,0.716113,0.559111,0.698829,0.557429,0.714064,0.542374,0.698829,0.651399,0.716186,0.672818,0.716186,0.663419,0.725697,0.713519,0.578714,0.701613,0.588369,0.701613,0.56695,0.27721,0.707388,0.27721,0.728806,0.267699,0.719408,0.021707,0.70142,0.033612,0.691766,0.033612,0.713185,0.262421,0.707388,0.262421,0.728806,0.252909,0.719408,0.717739,0.109994,0.705833,0.119649,0.705833,0.09823,0.729865,0.502167,0.729865,0.523585,0.720354,0.514187,0.525332,0.710734,0.515677,0.698829,0.537096,0.698829,0.493492,0.71725,0.472073,0.71725,0.481472,0.707738,0.506662,0.87236,0.50396,0.878885,0.496161,0.87236,0.954578,0.436155,0.944409,0.436155,0.948317,0.432885,0.10076,0.689236,0.119027,0.692354,0.10076,0.705973,0.069545,0.726041,0.09233,0.726041,0.086053,0.73446,0.168988,0.662154,0.182406,0.649373,0.182406,0.672159,0.725927,0.689119,0.725927,0.666333,0.734346,0.67261,0.002639,0.686088,0.016057,0.673306,0.016057,0.696092,0.725927,0.717182,0.725927,0.694397,0.734346,0.700674,0.68905,0.616024,0.692168,0.597757,0.705788,0.616024,0.723347,0.620543,0.723347,0.597757,0.731766,0.604034,0.686117,0.496697,0.686117,0.478166,0.702616,0.493881,0.723348,0.038472,0.723348,0.015686,0.731767,0.021963,0.10076,0.673954,0.114178,0.661172,0.114178,0.683958,0.728365,0.278,0.728365,0.255214,0.736784,0.261492,0.686117,0.40871,0.699535,0.395929,0.699535,0.418714,0.728716,0.490892,0.728716,0.468106,0.737135,0.474383,0.612181,0.727062,0.597734,0.721078,0.626627,0.721078,0.662456,0.693724,0.651399,0.682668,0.689149,0.682668,0.293052,0.107499,0.287068,0.093053,0.327928,0.093053,0.600689,0.112677,0.606673,0.09823,0.64155,0.112677,0.498289,0.123657,0.509346,0.1126,0.536039,0.123657,0.348409,0.660563,0.362856,0.654579,0.377302,0.660563,0.69789,0.742049,0.71112,0.747529,0.68466,0.747529,0.223774,0.686232,0.2339,0.696357,0.199329,0.696357,0.448799,0.666356,0.448799,0.680676,0.414228,0.666356,0.03889,0.682475,0.03889,0.668155,0.073461,0.668155,0.661764,0.577076,0.67189,0.56695,0.696335,0.577076,0.285266,0.747457,0.298496,0.741977,0.311726,0.747457,0.778986,0.369105,0.778986,0.384741,0.771517,0.369763,0.73991,0.778178,0.756646,0.778178,0.752725,0.784567,0.030411,0.77872,0.014775,0.77872,0.029753,0.771252,0.339503,0.783645,0.322766,0.783645,0.326687,0.777255,0.336759,0.771977,0.322766,0.765,0.339503,0.765,0.785428,0.460513,0.768692,0.460513,0.772613,0.454123,0.654142,0.76679,0.668136,0.773767,0.651399,0.773767,0.512964,0.776502,0.529701,0.776502,0.525779,0.782892,0.641997,0.780154,0.626421,0.778781,0.641997,0.772657,0.388621,0.781459,0.371884,0.781459,0.375806,0.775069,0.28801,0.766718,0.302003,0.773695,0.285266,0.773695,0.285266,0.778973,0.302003,0.778973,0.298081,0.785363,0.48771,0.778156,0.472073,0.778156,0.487051,0.770688,0.668136,0.785435,0.651399,0.785435,0.655321,0.779045,0.191791,0.76998,0.207427,0.76998,0.192449,0.777449,0.002639,0.787936,0.002639,0.771199,0.009029,0.77512,0.575137,0.74008,0.561586,0.734467,0.588687,0.734467,0.135754,0.696205,0.125383,0.685834,0.160792,0.685834,0.572881,0.677899,0.567268,0.664349,0.605595,0.664349,0.515677,0.677902,0.52129,0.664351,0.554004,0.677902,0.414228,0.696325,0.424599,0.685954,0.449637,0.696325,0.710827,0.008252,0.724378,0.002639,0.737928,0.008252,0.665391,0.730975,0.679383,0.736771,0.651399,0.736771,0.634962,0.683177,0.645671,0.693886,0.609109,0.693886,0.072669,0.628463,0.078465,0.642455,0.03889,0.642455,0.03889,0.662877,0.03889,0.647733,0.075452,0.647733,0.287068,0.123486,0.297777,0.112777,0.32363,0.123486,0.285266,0.736699,0.299258,0.730903,0.31325,0.736699,0.787356,0.369105,0.800676,0.375243,0.784264,0.375243,0.70609,0.794297,0.720996,0.787428,0.721235,0.794297,0.66472,0.796851,0.651399,0.790713,0.667811,0.790713,0.574018,0.788046,0.559112,0.794914,0.558873,0.788046,0.696457,0.800915,0.683137,0.794776,0.699549,0.794776,0.642833,0.79177,0.626421,0.79177,0.629079,0.785432,0.108037,0.790312,0.121357,0.79645,0.104945,0.79645,0.428955,0.784796,0.445367,0.784796,0.442709,0.791134,0.538405,0.658876,0.525084,0.652738,0.541497,0.652738,0.315089,0.790833,0.30822,0.775927,0.315089,0.775688,0.475165,0.795623,0.488485,0.801762,0.472073,0.801762,0.776565,0.778669,0.792978,0.778669,0.79032,0.785007,0.205111,0.801054,0.191791,0.794916,0.208203,0.794916,0.096506,0.791504,0.080094,0.791504,0.082752,0.785166,0.788747,0.481427,0.794886,0.468106,0.794886,0.484518,0.252866,0.792177,0.267772,0.785308,0.268011,0.792177,0.561586,0.757056,0.561586,0.745358,0.57561,0.751247,0.741978,0.589254,0.741978,0.574044,0.752763,0.584725,0.699996,0.433348,0.686117,0.445801,0.686117,0.423992,0.716874,0.226528,0.716874,0.248337,0.707174,0.241799,0.03889,0.709025,0.04859,0.702487,0.04859,0.724295,0.696866,0.273298,0.709056,0.255214,0.713603,0.273298,0.370424,0.1225,0.365724,0.104456,0.370424,0.002639,0.51954,0.557147,0.51954,0.659073,0.515677,0.575389,0.345768,0.002639,0.350468,0.020684,0.345768,0.1225,0.567268,0.659071,0.567268,0.557148,0.571132,0.640828,0.324654,0.315583,0.327389,0.32608,0.324654,0.399355,0.342779,0.477953,0.342779,0.404626,0.34512,0.467361,0.816036,0.002639,0.821754,0.009284,0.807876,0.009284,0.097608,0.763748,0.111487,0.763748,0.105238,0.772614,0.749459,0.10276,0.760244,0.09823,0.760244,0.11344,0.472073,0.751435,0.472073,0.736225,0.482858,0.746906,0.529701,0.75718,0.515677,0.751372,0.529701,0.745483,0.14292,0.752248,0.128897,0.758137,0.128897,0.746439,0.508671,0.762342,0.494648,0.756534,0.508671,0.750645,0.182551,0.752099,0.168527,0.757988,0.168527,0.74629,0.369025,0.406592,0.370345,0.409131,0.369025,0.469369,0.039017,0.519673,0.039017,0.459413,0.040281,0.517106,0.018998,0.790909,0.014775,0.783998,0.030308,0.783998,0.444488,0.76785,0.428955,0.76785,0.443128,0.75919,0.830356,0.232917,0.823711,0.238635,0.823711,0.224756,0.506345,0.76762,0.497293,0.77814,0.494648,0.76762,0.047429,0.771693,0.038562,0.777941,0.038562,0.764063,0.826991,0.077885,0.826991,0.091763,0.820346,0.086046,0.308214,0.399356,0.30548,0.388859,0.308214,0.315584,0.308214,0.404634,0.308214,0.477959,0.305873,0.415226,0.080094,0.779888,0.080094,0.769041,0.091438,0.777035,0.580888,0.823748,0.580888,0.809869,0.587533,0.815587,0.632241,0.598637,0.640273,0.597601,0.640273,0.660899,0.373126,0.401314,0.373126,0.338017,0.381159,0.400278,0.61893,0.598638,0.626963,0.597601,0.626963,0.660899,0.400918,0.661078,0.400918,0.59778,0.40895,0.660042,0.476296,0.790345,0.472073,0.783434,0.487606,0.783434,0.466354,0.767606,0.450821,0.767606,0.464994,0.758946,0.387229,0.769791,0.371884,0.763435,0.387229,0.761025,0.712965,0.561592,0.697432,0.561592,0.701654,0.554681,0.490883,0.87236,0.489436,0.875903,0.474273,0.87236,0.865616,0.827134,0.881187,0.827134,0.867832,0.830255,0.57561,0.7711,0.560265,0.764744,0.57561,0.762334,0.207324,0.789638,0.191791,0.789638,0.196013,0.782727,0.865553,0.741267,0.868256,0.734742,0.876055,0.741267,0.944538,0.12485,0.954706,0.12485,0.950798,0.12812,0.00491,0.882222,0.002795,0.875483,0.012964,0.875483,0.954578,0.444703,0.944409,0.444703,0.948317,0.441433,0.156123,0.876362,0.158238,0.883101,0.148069,0.883101,0.944558,0.346322,0.954726,0.346322,0.950818,0.349592,0.876101,0.811874,0.88284,0.809759,0.88284,0.819928,0.954855,0.425476,0.944687,0.425476,0.948595,0.422206,0.882834,0.379371,0.876095,0.381486,0.876095,0.371317,0.94439,0.048299,0.954558,0.048299,0.95065,0.051569,0.867675,0.010272,0.870378,0.003747,0.878177,0.010272,0.954614,0.506647,0.944445,0.506647,0.948354,0.503377,0.483975,0.881182,0.483975,0.888244,0.474273,0.885201,0.944687,0.413658,0.954855,0.413658,0.950947,0.416928,0.832506,0.717064,0.834848,0.693924,0.834848,0.717301,0.832442,0.183479,0.832443,0.160102,0.834785,0.16034,0.756762,0.490621,0.762592,0.468106,0.762592,0.492131,0.755226,0.414746,0.755226,0.390721,0.761057,0.392231,0.870866,0.835742,0.875656,0.843246,0.865616,0.843246,0.443954,0.972703,0.453993,0.972703,0.452645,0.97463,0.725927,0.744486,0.733394,0.72246,0.733394,0.747018,0.738672,0.747018,0.738672,0.72246,0.746139,0.724992,0.865826,0.848764,0.874052,0.852167,0.865826,0.857922,0.874484,0.865391,0.864445,0.865391,0.865793,0.863464,0.734345,0.86787,0.727025,0.870796,0.727025,0.860358,0.192773,0.73161,0.192773,0.740318,0.192622,0.740274,0.874646,0.116689,0.864954,0.11268,0.874646,0.108806,0.720414,0.751838,0.720565,0.751775,0.720565,0.760477,0.716443,0.657695,0.724968,0.636057,0.724968,0.661055,0.678096,0.724,0.678096,0.699002,0.686622,0.702362,0.65871,0.761512,0.651399,0.752807,0.669074,0.752807,0.302942,0.76144,0.285266,0.76144,0.295631,0.752735,0.714912,0.489745,0.723438,0.468106,0.723438,0.493104,0.356936,0.726085,0.356936,0.701088,0.365462,0.704447,0.407983,0.739751,0.398581,0.748831,0.398581,0.730015,0.236339,0.731911,0.236339,0.750727,0.226937,0.740991,0.272588,0.856626,0.279908,0.8537,0.279908,0.864137,0.329978,0.087674,0.32127,0.087674,0.321314,0.087522,0.877288,0.147972,0.868386,0.147972,0.873788,0.139509,0.142335,0.97129,0.152374,0.97129,0.151026,0.973216,0.766239,0.38264,0.754872,0.38264,0.766239,0.369105,0.770499,0.015686,0.770499,0.033362,0.761794,0.022997,0.781602,0.525024,0.7859,0.502167,0.7859,0.525832,0.779171,0.491772,0.779171,0.468106,0.783469,0.468915,0.782326,0.074928,0.786624,0.052071,0.786624,0.075736,0.782244,0.556223,0.782244,0.532558,0.786542,0.533366,0.385948,0.653194,0.39564,0.657204,0.385948,0.661078,0.31593,0.087522,0.315992,0.087674,0.307281,0.087674,0.137977,0.741161,0.128897,0.731759,0.147713,0.731759,0.187344,0.741012,0.168527,0.741012,0.178263,0.73161,0.366339,0.7411,0.356936,0.75018,0.356936,0.731363,0.012041,0.731645,0.012041,0.750462,0.002639,0.740725,0.770338,0.170467,0.761633,0.177778,0.761633,0.160102,0.770498,0.597757,0.770498,0.615433,0.761794,0.605068,0.585678,0.874516,0.580888,0.867012,0.590927,0.867012,0.012719,0.972756,0.002679,0.972756,0.004027,0.97083,0.606815,0.741742,0.597734,0.73234,0.616551,0.73234,0.534494,0.740205,0.515677,0.740205,0.525414,0.730802,0.731707,0.462828,0.724396,0.454123,0.742071,0.454123,0.700812,0.761512,0.683137,0.761512,0.693501,0.752807,0.336796,0.830492,0.332145,0.830492,0.33412,0.826506,0.787015,0.416506,0.791464,0.416506,0.788609,0.418075,0.977071,0.545613,0.974407,0.549574,0.972416,0.545613,0.265846,0.99236,0.261412,0.99236,0.263012,0.990797,0.311963,0.720945,0.317461,0.723404,0.311963,0.724648,0.76787,0.493978,0.773508,0.493978,0.770271,0.495777,0.981372,0.032479,0.983778,0.034271,0.978153,0.034271,0.966851,0.028857,0.971362,0.025497,0.972874,0.028857,0.926261,0.685184,0.922093,0.687567,0.922093,0.683119,0.049763,0.990509,0.054212,0.990509,0.052618,0.992078,0.746191,0.975976,0.74779,0.97754,0.743357,0.97754,0.697497,0.183625,0.701359,0.181449,0.701359,0.186223,0.992098,0.944175,0.992567,0.945522,0.988221,0.945522,0.397706,0.585743,0.397706,0.590089,0.396353,0.586215,0.904106,0.828558,0.908176,0.828558,0.904108,0.82999,0.30426,0.864008,0.30426,0.859694,0.305605,0.860167,0.20421,0.995785,0.204685,0.997136,0.200372,0.997136,0.390692,0.930833,0.390692,0.935146,0.389347,0.931305,0.162532,0.997361,0.158429,0.997361,0.162531,0.995928,0.724694,0.625821,0.724694,0.630166,0.723347,0.629697,0.718881,0.299328,0.722743,0.301926,0.718881,0.304102,0.251701,0.990797,0.256134,0.990797,0.2533,0.99236,0.716398,0.744432,0.720565,0.742049,0.720565,0.746497,0.992077,0.292617,0.987629,0.292617,0.989222,0.291047,0.966827,0.594054,0.972851,0.594056,0.968338,0.597415,0.342766,0.982711,0.348392,0.982711,0.345172,0.984502,0.55593,0.656119,0.557441,0.652738,0.561952,0.656119,0.712688,0.549347,0.707051,0.549347,0.709451,0.547548,0.433411,0.976307,0.436075,0.972346,0.438065,0.976307,0.988046,0.700284,0.99248,0.700284,0.99088,0.701848,0.395108,0.990321,0.396702,0.99189,0.392254,0.99189,0.19248,0.74629,0.190504,0.750276,0.187829,0.74629,0.902655,0.622291,0.915726,0.622291,0.905403,0.626227,0.839653,0.939397,0.850701,0.939397,0.848216,0.942662,0.525553,0.939972,0.528018,0.94321,0.516987,0.94321,0.907501,0.213208,0.91782,0.217109,0.904749,0.217109,0.282953,0.952241,0.271585,0.952241,0.280766,0.949252,0.969547,0.506647,0.959892,0.506647,0.96205,0.504206,0.492813,0.810012,0.495741,0.809363,0.495741,0.823227,0.931622,0.591177,0.931622,0.577313,0.934551,0.590527,0.9661,0.712732,0.968257,0.715172,0.958602,0.715172,0.945639,0.15024,0.95482,0.153228,0.943452,0.153228,0.943731,0.163316,0.955099,0.163316,0.945918,0.166282,0.960133,0.423053,0.969781,0.423053,0.967635,0.425476,0.903744,0.683119,0.916815,0.683119,0.906497,0.68702,0.859549,0.939965,0.87058,0.939965,0.868115,0.943203,0.938127,0.664706,0.940333,0.664342,0.940333,0.67806,0.935912,0.322709,0.935912,0.30899,0.938119,0.322344,0.960901,0.823568,0.959483,0.823718,0.959483,0.810108,0.961254,0.039751,0.961254,0.053361,0.959836,0.0399,0.351329,0.93889,0.353814,0.942155,0.342766,0.942155,0.835998,0.119381,0.846321,0.123317,0.83325,0.123317,0.939984,0.597757,0.94222,0.597757,0.939984,0.611292,0.938207,0.707215,0.938207,0.693497,0.940414,0.706851,0.962332,0.475239,0.960187,0.472815,0.969834,0.472815,0.953442,0.776902,0.944262,0.773936,0.955629,0.773936,0.245467,0.628602,0.246885,0.628453,0.246885,0.642063,0.161976,0.959656,0.161976,0.946046,0.163394,0.959507,0.921615,0.48955,0.908544,0.48955,0.918863,0.48565,0.615147,0.943073,0.604116,0.943073,0.606581,0.939835,0.824907,0.942662,0.822422,0.939397,0.83347,0.939397,0.910943,0.865391,0.90062,0.861454,0.913691,0.861454,0.937656,0.387464,0.939863,0.3871,0.939863,0.400819,0.938637,0.798016,0.938637,0.784298,0.940844,0.797651,0.955099,0.174525,0.943731,0.174525,0.952912,0.17156,0.970024,0.165739,0.960377,0.165739,0.962523,0.163316,0.962201,0.320245,0.960043,0.317805,0.969698,0.317805,0.952578,0.311979,0.943397,0.30899,0.954765,0.30899,0.931801,0.015971,0.934729,0.015322,0.934729,0.029185,0.931977,0.849953,0.931977,0.83609,0.934906,0.849304,0.968015,0.193152,0.970161,0.195575,0.960514,0.195575,0.853133,0.523796,0.862314,0.526762,0.850946,0.526762,0.271585,0.940985,0.282953,0.940985,0.273771,0.943974,0.864954,0.087925,0.874609,0.087925,0.872452,0.090366,0.936247,0.163681,0.938453,0.163316,0.938453,0.177035,0.935968,0.153228,0.935968,0.139509,0.938174,0.152863,0.290695,0.942973,0.288231,0.939735,0.299262,0.939735,0.914209,0.108275,0.903891,0.104374,0.916962,0.104374,0.842254,0.304094,0.829183,0.304094,0.839506,0.300157,0.823075,0.496889,0.812027,0.496889,0.814512,0.493624,0.110129,0.436762,0.110129,0.423361,0.110363,0.43676,0.110363,0.511474,0.110129,0.498076,0.110363,0.498074,0.110129,0.492796,0.110129,0.479396,0.110363,0.492794,0.110363,0.474118,0.110129,0.46072,0.110363,0.460718,0.033116,0.935816,0.033116,0.937248,0.024214,0.935816,0.861554,0.609025,0.870571,0.609025,0.861781,0.61044,0.883777,0.30396,0.883269,0.299334,0.89319,0.299334,0.237771,0.939561,0.227851,0.939561,0.23584,0.935634,0.445885,0.93543,0.453875,0.939357,0.443954,0.939357,0.459698,0.923114,0.464075,0.932017,0.459698,0.933602,0.750852,0.280138,0.751079,0.281553,0.742062,0.281553,0.904015,0.85454,0.912918,0.855972,0.904015,0.855972,0.772388,0.55536,0.776966,0.532558,0.776966,0.556177,0.774008,0.447612,0.774008,0.423992,0.778586,0.424809,0.441836,0.723241,0.450362,0.701603,0.450362,0.726601,0.139187,0.726481,0.139187,0.701483,0.147713,0.704842,0.213133,0.723274,0.221659,0.701635,0.221659,0.726633,0.631905,0.724162,0.631905,0.699164,0.640431,0.702523,0.754872,0.362317,0.760702,0.339802,0.760702,0.363827,0.757341,0.65529,0.757341,0.631265,0.763172,0.632775,0.753436,0.686857,0.759267,0.664342,0.759267,0.688366,0.241636,0.752971,0.241636,0.728947,0.247467,0.730457,0.221387,0.882648,0.224387,0.887871,0.212292,0.887871,0.127695,0.888165,0.13979,0.888165,0.130695,0.893389,0.93145,0.940257,0.923461,0.93633,0.933382,0.93633,0.759948,0.118718,0.751045,0.123094,0.749459,0.118718,0.221704,0.927366,0.222212,0.931993,0.212292,0.931993,0.907913,0.937344,0.917834,0.937344,0.909844,0.941271,0.781729,0.215094,0.786027,0.192237,0.786027,0.215902,0.13327,0.786672,0.128897,0.763415,0.13327,0.763415,0.021242,0.89251,0.018242,0.887287,0.030337,0.887287,0.072,0.889575,0.059904,0.889575,0.069,0.884352,0.87496,0.24797,0.87639,0.224756,0.87639,0.248058,0.223764,0.807802,0.223764,0.7845,0.225194,0.784588,0.869037,0.484458,0.869037,0.464247,0.871391,0.484409,0.897798,0.269857,0.897798,0.249557,0.899645,0.249734,0.645551,0.645628,0.645551,0.633138,0.645769,0.645627,0.11965,0.672262,0.119456,0.661174,0.11965,0.661172,0.726733,0.414625,0.735268,0.395929,0.735268,0.417962,0.74979,0.619791,0.74979,0.597757,0.756516,0.600388,0.371884,0.755747,0.371884,0.735135,0.379761,0.755391,0.762842,0.445726,0.762842,0.423992,0.76873,0.425981,0.645551,0.610092,0.645551,0.597601,0.645769,0.61009,0.095482,0.668121,0.095289,0.657032,0.095482,0.657031,0.021909,0.640944,0.021909,0.628454,0.022127,0.640943,0.022102,0.673679,0.021909,0.66259,0.022102,0.662589,0.764658,0.226745,0.770545,0.224756,0.770545,0.24649,0.748016,0.213971,0.748016,0.192237,0.755486,0.211447,0.708201,0.496857,0.708201,0.476306,0.709634,0.496847,0.369025,0.495238,0.369025,0.474647,0.370152,0.474717,0.913185,0.713707,0.913185,0.693497,0.914618,0.713697,0.833248,0.923433,0.833248,0.903183,0.834375,0.903254,0.764545,0.66633,0.770432,0.664342,0.770432,0.686075,0.747671,0.333562,0.747671,0.311828,0.755142,0.331038,0.223764,0.778997,0.226108,0.758923,0.226108,0.779222,0.897763,0.651804,0.897763,0.631505,0.89961,0.631682,0.791178,0.522373,0.791178,0.502167,0.79555,0.522273,0.824466,0.769925,0.824466,0.749349,0.827849,0.750004,0.305627,0.653223,0.309264,0.652767,0.309264,0.673435,0.786422,0.769914,0.791049,0.749771,0.791049,0.770383,0.747954,0.148145,0.755424,0.128934,0.755424,0.150668,0.763421,0.744194,0.763421,0.72246,0.769309,0.724449,0.73991,0.7729,0.73991,0.752295,0.745929,0.772713,0.344781,0.786286,0.344781,0.765,0.349373,0.7662,0.733859,0.330524,0.742393,0.311828,0.742393,0.333861,0.752787,0.715958,0.752787,0.693924,0.759513,0.696555,0.831122,0.447132,0.833464,0.423992,0.833464,0.447369,0.832269,0.091763,0.832269,0.068387,0.834611,0.068624,0.736714,0.120256,0.744181,0.09823,0.744181,0.122788,0.737045,0.040244,0.737045,0.015686,0.744512,0.018218,0.77181,0.129751,0.776389,0.128934,0.776389,0.152554,0.324907,0.633311,0.324907,0.609692,0.329486,0.632494,0.110129,0.418083,0.110129,0.404683,0.110363,0.418081,0.110363,0.530152,0.110129,0.516754,0.110363,0.516752,0.559648,0.687488,0.56199,0.664349,0.56199,0.687725,0.496958,0.6473,0.496958,0.623924,0.4993,0.624161,0.781692,0.301385,0.78599,0.278527,0.78599,0.302193,0.780448,0.588894,0.780447,0.565229,0.784746,0.566038,0.771873,0.193054,0.776451,0.192237,0.776451,0.215857,0.771528,0.333156,0.771528,0.309537,0.776106,0.332339,0.87641,0.518475,0.87641,0.495217,0.877842,0.518475,0.8758,0.361076,0.8758,0.337774,0.87723,0.337862,0.110129,0.548829,0.110129,0.53543,0.110363,0.548827,0.110363,0.45544,0.110129,0.442042,0.110363,0.44204,0.875098,0.654719,0.876528,0.631505,0.876528,0.654807,0.877519,0.552384,0.876086,0.529126,0.877519,0.529126,0.739624,0.717182,0.739624,0.693924,0.747509,0.717182,0.736883,0.18466,0.736883,0.160102,0.744351,0.162634,0.738093,0.446019,0.74556,0.423992,0.74556,0.44855,0.737044,0.622315,0.737044,0.597757,0.744512,0.600289,0.756412,0.277729,0.762242,0.255214,0.762242,0.279239,0.114071,0.655894,0.114071,0.63187,0.119901,0.633379,0.876669,0.487505,0.876669,0.464247,0.878102,0.487504,0.620208,0.877987,0.618775,0.85473,0.620208,0.854729,0.090903,0.615399,0.095482,0.592597,0.095482,0.616216,0.771746,0.525786,0.771746,0.502167,0.776324,0.502984,0.832579,0.621015,0.832579,0.597757,0.834934,0.621015,0.835482,0.769925,0.833127,0.746668,0.835482,0.746668,0.929888,0.009976,0.929888,0.00295,0.936562,0.007218,0.974378,0.76837,0.966456,0.76837,0.967519,0.76685,0.428955,0.930095,0.436602,0.933255,0.428955,0.936309,0.420441,0.067399,0.42049,0.067518,0.41365,0.067518,0.453957,0.652744,0.453957,0.661018,0.448214,0.655117,0.735504,0.49617,0.735553,0.496288,0.728716,0.496288,0.18606,0.931846,0.179567,0.929162,0.18606,0.924624,0.681959,0.942124,0.674036,0.942124,0.675099,0.940603,0.938984,0.769876,0.938984,0.776902,0.932309,0.772634,0.18898,0.975266,0.196902,0.975266,0.195839,0.976786,0.93667,0.303709,0.929022,0.300549,0.93667,0.297495,0.432557,0.067399,0.432606,0.067518,0.425768,0.067518,0.689051,0.058268,0.689051,0.049994,0.694794,0.055895,0.696915,0.362395,0.696866,0.362276,0.703703,0.362276,0.416443,0.94377,0.414082,0.939653,0.423621,0.939653,0.406112,0.943521,0.396573,0.943521,0.40375,0.939404,0.960133,0.413263,0.967914,0.416078,0.960133,0.416928,0.966179,0.820624,0.974006,0.820624,0.972487,0.823718,0.696985,0.938311,0.699346,0.942428,0.689807,0.942428,0.932727,0.238884,0.942266,0.238884,0.935088,0.243001,0.846523,0.448808,0.838742,0.445993,0.846523,0.445143,0.972767,0.676895,0.96494,0.676895,0.966459,0.673801,0.796961,0.591083,0.79714,0.592198,0.790024,0.592198,0.861134,0.76881,0.86825,0.76881,0.861313,0.769925,0.97219,0.935077,0.973709,0.938171,0.965882,0.938171,0.76288,0.183056,0.769907,0.186503,0.761633,0.186503,0.967698,0.813202,0.966179,0.810108,0.974006,0.810108,0.967125,0.134231,0.960098,0.130785,0.968372,0.130785,0.743193,0.045586,0.743372,0.046701,0.736256,0.046701,0.917158,0.570784,0.924183,0.571913,0.917158,0.571913,0.93231,0.746668,0.939336,0.746668,0.935068,0.753342,0.966604,0.406412,0.974526,0.406412,0.973464,0.407933,0.751417,0.72509,0.758143,0.72246,0.758143,0.744493,0.111421,0.748074,0.111421,0.726041,0.119955,0.744736,0.184628,0.900896,0.184628,0.880345,0.18606,0.900885,0.468907,0.632225,0.468907,0.611634,0.470034,0.611704,0.095264,0.651753,0.095264,0.639263,0.095482,0.651752,0.095482,0.700854,0.095289,0.689767,0.095482,0.689766,0.76915,0.585436,0.76915,0.565229,0.775169,0.585246,0.785472,0.181005,0.785472,0.160102,0.790059,0.161325,0.389347,0.879904,0.391194,0.879727,0.391194,0.900026,0.868445,0.295911,0.868445,0.275612,0.870789,0.295686,0.791243,0.149141,0.791243,0.128934,0.795615,0.149041,0.824466,0.821634,0.824466,0.801058,0.82785,0.801713,0.771025,0.072268,0.771669,0.052071,0.777048,0.072269,0.785566,0.685244,0.785566,0.664342,0.790153,0.665564,0.823636,0.597757,0.827301,0.597757,0.82473,0.618264,0.786842,0.744194,0.789414,0.723687,0.791493,0.744194,0.76787,0.4887,0.768509,0.468106,0.773893,0.4887,0.116765,0.785034,0.116765,0.763748,0.121357,0.764948,0.89689,0.835919,0.898737,0.835742,0.898737,0.856041,0.868179,0.358073,0.868179,0.337774,0.870522,0.357849,0.452132,0.792629,0.456426,0.772884,0.456426,0.79346,0.823874,0.684918,0.823874,0.664342,0.827258,0.664997,0.750838,0.426623,0.757564,0.423992,0.757564,0.446026,0.74043,0.388385,0.748455,0.367866,0.749594,0.388386,0.890249,0.914088,0.890249,0.893877,0.891682,0.914077,0.303773,0.923789,0.303773,0.903538,0.3049,0.90361,0.786722,0.360309,0.788801,0.339802,0.791373,0.360309,0.823924,0.553093,0.820264,0.532753,0.823924,0.532558,0.79096,0.329282,0.795254,0.309537,0.795254,0.330113,0.824588,0.118807,0.824588,0.09823,0.827972,0.098885,0.785679,0.244845,0.790294,0.224756,0.790294,0.245423,0.06063,0.809836,0.06063,0.789169,0.064267,0.789625,0.211771,0.982346,0.215188,0.983761,0.208354,0.983761,0.938084,0.970106,0.940699,0.972721,0.931769,0.972721,0.967462,0.099398,0.968877,0.102816,0.959211,0.102816,0.469198,0.950089,0.465781,0.948673,0.469198,0.940423,0.67107,0.973419,0.673686,0.970804,0.68,0.973419,0.685488,0.98394,0.688905,0.982525,0.692322,0.98394,0.813813,0.459741,0.811346,0.454123,0.826603,0.454123,0.030032,0.827237,0.014775,0.827237,0.027564,0.821619,0.835441,0.416154,0.83412,0.418692,0.818832,0.416154,0.798695,0.656698,0.814193,0.656698,0.800413,0.658986,0.040337,0.454135,0.039017,0.451596,0.040337,0.391358,0.397368,0.483232,0.397368,0.543488,0.396103,0.485799,0.796944,0.418692,0.798265,0.416154,0.813554,0.418692,0.09233,0.720763,0.076832,0.720763,0.090612,0.718474,0.423389,0.005926,0.436966,0.002639,0.436966,0.062005,0.404535,0.062005,0.404535,0.002639,0.418111,0.058719,0.686117,0.129583,0.692219,0.128934,0.692219,0.186959,0.027511,0.686488,0.027511,0.628463,0.033612,0.685839,0.194051,0.685829,0.187949,0.686478,0.187949,0.628453,0.692154,0.502167,0.692154,0.560192,0.686052,0.502816,0.484862,0.818495,0.48733,0.824113,0.472073,0.824113,0.038562,0.81828,0.053819,0.81828,0.04103,0.823898,0.797725,0.088322,0.794609,0.082145,0.80997,0.082145,0.698498,0.81237,0.683137,0.81237,0.695382,0.806193,0.832442,0.154824,0.833889,0.151281,0.849052,0.154824,0.897377,0.626227,0.881806,0.626227,0.895162,0.623106,0.472388,0.37833,0.470941,0.374786,0.472388,0.315553,0.126063,0.509915,0.126063,0.569171,0.124703,0.513493,0.470941,0.383608,0.472388,0.387152,0.470941,0.446385,0.014127,0.569171,0.014127,0.509916,0.015486,0.565593,0.474416,0.056713,0.461098,0.059993,0.461098,0.002639,0.493011,0.002639,0.493011,0.059993,0.479694,0.005919,0.671575,0.653022,0.66471,0.653875,0.66471,0.597757,0.454263,0.067545,0.454263,0.123663,0.447397,0.068398,0.661764,0.50302,0.66863,0.502167,0.66863,0.558284,0.673908,0.558285,0.673908,0.502167,0.680774,0.557431,0.802952,0.454123,0.806068,0.460301,0.790706,0.460301,0.787236,0.002639,0.802598,0.002639,0.790352,0.008816,0.423291,0.477565,0.423291,0.399238,0.426092,0.477565,0.444217,0.477506,0.441415,0.399179,0.444217,0.399179,0.470034,0.502163,0.470034,0.551622,0.469199,0.506772,0.499119,0.567688,0.499119,0.615542,0.498312,0.613924,0.855092,0.688257,0.840156,0.685551,0.855092,0.685492,0.891874,0.21827,0.876939,0.21827,0.877919,0.215685,0.840126,0.715075,0.855062,0.717781,0.840126,0.71784,0.847532,0.301508,0.862468,0.301508,0.861487,0.304094,0.93161,0.457781,0.917686,0.455033,0.932152,0.455033,0.931283,0.330825,0.916817,0.330825,0.917359,0.328077,0.191791,0.930576,0.205983,0.930576,0.191791,0.933377,0.904749,0.241143,0.919216,0.241143,0.918673,0.243891,0.444217,0.31557,0.444217,0.393901,0.441415,0.31557,0.42609,0.315579,0.42609,0.39396,0.423291,0.39386,0.926656,0.339109,0.930631,0.337774,0.930631,0.350946,0.923612,0.644677,0.923612,0.631505,0.927587,0.643342,0.730683,0.900257,0.727025,0.91323,0.727025,0.899282,0.905487,0.631505,0.909081,0.644983,0.904888,0.644983,0.814464,0.694797,0.818566,0.693924,0.818566,0.714079,0.356247,0.816425,0.356247,0.79627,0.360348,0.815552,0.894249,0.18083,0.891549,0.181246,0.891549,0.163316,0.891612,0.835742,0.891612,0.853672,0.888912,0.836158,0.809912,0.310409,0.814013,0.309537,0.814013,0.329691,0.805182,0.035841,0.805182,0.015686,0.809284,0.034968,0.978935,0.222387,0.982432,0.223836,0.975437,0.223836,0.967401,0.28341,0.970078,0.286087,0.960938,0.286087,0.030452,0.942762,0.031901,0.946259,0.022008,0.946259,0.670725,0.9514,0.670725,0.947614,0.679865,0.947614,0.96065,0.634182,0.963327,0.631505,0.96979,0.634182,0.975356,0.278122,0.978853,0.276673,0.982351,0.278122,0.398922,0.80258,0.403023,0.801708,0.403023,0.821862,0.805707,0.82079,0.805707,0.800636,0.809808,0.819918,0.569916,0.801065,0.574018,0.800192,0.574018,0.820347,0.814495,0.684496,0.814495,0.664342,0.818596,0.683624,0.214188,0.788738,0.21829,0.787866,0.21829,0.80802,0.651399,0.821842,0.655592,0.802129,0.655592,0.821842,0.882635,0.769876,0.882635,0.774069,0.880381,0.770606,0.536254,0.995771,0.540385,0.995771,0.538544,0.997262,0.80615,0.72456,0.810252,0.723687,0.810252,0.743842,0.80603,0.385389,0.80603,0.365234,0.810132,0.384516,0.296417,0.309848,0.300202,0.309769,0.300202,0.491101,0.377978,0.310294,0.377978,0.128941,0.381763,0.310215,0.495792,0.12902,0.499577,0.128941,0.499577,0.310275,0.15562,0.623176,0.15562,0.441863,0.159406,0.623097,0.049763,0.982977,0.053956,0.982977,0.050494,0.985231,0.994623,0.240374,0.990491,0.240374,0.992333,0.238884,0.800164,0.468979,0.804265,0.468106,0.804265,0.488261,0.796449,0.118385,0.796449,0.09823,0.800551,0.117512,0.541106,0.12902,0.544891,0.128941,0.544891,0.310274,0.350791,0.310303,0.350791,0.128941,0.354575,0.310224,0.452132,0.79961,0.456234,0.798738,0.456234,0.818892,0.332145,0.821228,0.332145,0.801074,0.336247,0.820356,0.495792,0.315632,0.499577,0.315553,0.499577,0.496886,0.42329,0.310292,0.42329,0.128941,0.427075,0.310213,0.991572,0.110214,0.987583,0.108921,0.991572,0.107845,0.224762,0.996839,0.22063,0.996839,0.222472,0.995348,0.990667,0.50646,0.986474,0.50646,0.989937,0.504206,0.990188,0.923189,0.99432,0.923189,0.992478,0.92468,0.104945,0.92166,0.109138,0.92166,0.104945,0.934146,0.809618,0.934139,0.813812,0.921653,0.813812,0.934139,0.990221,0.425875,0.986707,0.423587,0.990839,0.423587,0.993249,0.562274,0.989118,0.562274,0.990959,0.560783,0.559232,0.12902,0.563016,0.128941,0.563016,0.310274,0.046348,0.436593,0.046348,0.255243,0.050133,0.436514,0.104945,0.904545,0.10892,0.90321,0.10892,0.916382,0.157537,0.92039,0.157537,0.907218,0.161512,0.919055,0.98587,0.308203,0.990063,0.308203,0.986601,0.310457,0.378573,0.995588,0.382704,0.995588,0.380863,0.997078,0.432353,0.31565,0.436137,0.31557,0.436137,0.496903,0.332667,0.310305,0.332667,0.128941,0.336451,0.310226,0.990231,0.642535,0.986716,0.640248,0.990848,0.640248,0.993228,0.017311,0.989096,0.017311,0.990938,0.01582,0.038562,0.905784,0.042537,0.904449,0.042537,0.917621,0.919345,0.400272,0.919345,0.3871,0.92332,0.398937,0.332667,0.315663,0.336451,0.315583,0.336451,0.496917,0.243038,0.435432,0.243038,0.25408,0.246822,0.435353,0.926659,0.310872,0.930634,0.309537,0.930634,0.322709,0.285266,0.91671,0.285266,0.903538,0.289242,0.915375,0.91748,0.496163,0.921455,0.494828,0.921455,0.508,0.913294,0.029185,0.913294,0.016013,0.91727,0.02785,0.822422,0.904518,0.826397,0.903183,0.826397,0.916355,0.212292,0.922088,0.212292,0.908916,0.216267,0.920753,0.987575,0.862415,0.991089,0.864703,0.986958,0.864703,0.988617,0.521841,0.992749,0.521841,0.990907,0.523332,0.926715,0.140844,0.93069,0.139509,0.93069,0.152681,0.923474,0.235559,0.923474,0.222387,0.927449,0.234224,0.937727,0.992958,0.935203,0.991912,0.940251,0.991912,0.780972,0.977627,0.77904,0.975695,0.785636,0.975695,0.966561,0.976682,0.965515,0.974158,0.972655,0.974158,0.907913,0.977349,0.907913,0.974617,0.914509,0.974617,0.038562,0.977699,0.040494,0.975767,0.045158,0.977699,0.971374,0.659028,0.973898,0.657982,0.976422,0.659028,0.64039,0.894377,0.637689,0.894793,0.637689,0.876863,0.371673,0.877569,0.371673,0.895499,0.368973,0.877985,0.486729,0.315632,0.490514,0.315553,0.490514,0.496885,0.30548,0.310306,0.30548,0.128941,0.309264,0.310227,0.447612,0.894012,0.444912,0.894428,0.444912,0.876498,0.254056,0.876671,0.254056,0.894601,0.251355,0.877088,0.229245,0.900886,0.232903,0.899911,0.232903,0.913859,0.002795,0.901449,0.002795,0.8875,0.006847,0.900369,0.041294,0.899171,0.038562,0.899171,0.041293,0.881451,0.054626,0.881451,0.051896,0.899171,0.051894,0.881451,0.882448,0.71101,0.879747,0.711427,0.879747,0.693497,0.893456,0.275612,0.893456,0.293542,0.890756,0.276028,0.91186,0.276127,0.908201,0.289172,0.908201,0.275156,0.898468,0.309238,0.902657,0.322614,0.898468,0.322799,0.929881,0.058801,0.933661,0.059011,0.929881,0.072321,0.483729,0.906712,0.487907,0.893522,0.487907,0.907071,0.890818,0.827273,0.888118,0.827689,0.888118,0.809759,0.893245,0.139509,0.893245,0.157439,0.890545,0.139926,0.893475,0.569848,0.890775,0.570264,0.890775,0.552334,0.431655,0.876498,0.431655,0.894428,0.428955,0.876915,0.866794,0.902934,0.870487,0.902102,0.870487,0.91591,0.494567,0.907825,0.498745,0.894665,0.498745,0.908185,0.782825,0.921633,0.782074,0.935103,0.77904,0.921633,0.908854,0.889508,0.911888,0.902978,0.907695,0.902978,0.717947,0.921084,0.717195,0.934583,0.714161,0.921084,0.904982,0.015686,0.908016,0.029185,0.903823,0.029185,0.881002,0.076314,0.878302,0.076731,0.878302,0.058801,0.89252,0.249557,0.89252,0.267487,0.88982,0.249974,0.928138,0.413658,0.931924,0.413658,0.92833,0.427206,0.899337,0.477622,0.903526,0.464247,0.903526,0.477808,0.321247,0.005169,0.307281,0.082244,0.307281,0.002639,0.34049,0.002639,0.34049,0.082244,0.326525,0.079714,0.287068,0.005345,0.302003,0.002639,0.302003,0.087775,0.265053,0.304491,0.265053,0.219355,0.279988,0.301785,0.285266,0.301784,0.300202,0.219355,0.300202,0.304491,0.091698,0.214077,0.091698,0.128942,0.106633,0.131648,0.279988,0.211371,0.265053,0.214077,0.265053,0.128941,0.300202,0.128941,0.300202,0.214077,0.285266,0.131648],\"normal\":[0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0.0001,0.0896,-0.996,0.0001,0.0896,-0.996,0.0001,0.0896,-0.996,-0.3826,-0.9216,-0.0658,-0.3826,-0.9216,-0.0656,-0.7025,-0.7095,-0.0561,-0.7024,-0.7095,-0.0561,-0.3826,-0.9216,-0.0656,-0.7118,-0.7002,-0.056,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0633,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0633,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7043,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.3826,-0.9202,-0.0828,-0.7024,-0.7095,-0.0561,-0.7024,-0.7095,-0.0561,-0.3826,-0.9202,-0.0828,-0.3826,-0.9216,-0.0658,0.9998,0.0109,-0.0194,0.7019,0.7121,0.0173,1,0,0,1,0,0,0.7019,0.7121,0.0173,0.7071,0.7042,0.0635,0.3827,-0.9202,-0.0828,0.7072,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7071,0.7042,0.0634,-0.7112,0.7029,0.0161,0.7071,-0.7042,-0.0635,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,-0.9998,0.0109,-0.0194,-0.7118,-0.7002,-0.056,-1,0,0,-1,0,0,-0.7118,-0.7002,-0.056,-0.7071,-0.7042,-0.0634,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,-0.0001,0.0896,-0.996,-0.0001,0.0896,-0.996,-0.0001,0.0896,-0.996,0.7019,0.7121,0.0173,0.3821,0.9236,0.0302,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3821,0.9236,0.0302,0.3827,0.9202,0.0828,0.7071,-0.7042,-0.0634,1,0,0,0.7024,-0.7095,-0.0561,0.7024,-0.7095,-0.0561,1,0,0,0.9998,-0.0077,-0.0199,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,0.3826,-0.9216,-0.0656,0.7118,-0.7002,-0.056,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7118,-0.7002,-0.056,0.7071,-0.7042,-0.0634,-0.7118,-0.7002,-0.056,-0.3826,-0.9216,-0.0656,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3826,-0.9216,-0.0656,-0.3827,-0.9202,-0.0828,-0.7071,0.7042,0.0634,-1,0,0,-0.7112,0.7029,0.0161,-0.7111,0.7029,0.0161,-1,0,0,-0.9998,-0.0077,-0.0199,-0.2383,0.5027,0.8309,-0.4188,0.3449,0.84,-0.2383,0.5027,0.8309,-0.2383,0.5028,0.8309,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,-0.3821,0.9236,0.0302,-0.7019,0.7121,0.0173,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,1,0,0,0.7071,0.7042,0.0634,0.9998,-0.0077,-0.0199,0.9998,-0.0077,-0.0199,0.7071,0.7042,0.0634,0.7112,0.7028,0.0161,0.2382,-0.6431,0.7278,0.4188,-0.4894,0.7649,0.2382,-0.6431,0.7278,0.2383,-0.643,0.7279,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7024,-0.7095,-0.0561,-0.7024,-0.7095,-0.0561,-0.3827,-0.9201,-0.0828,-0.3826,-0.9216,-0.0658,-0.3827,0.9201,0.0828,-0.7071,0.7042,0.0634,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7071,0.7042,0.0634,-0.7112,0.7028,0.0161,-0.7019,0.7121,0.0173,-0.9998,0.0109,-0.0194,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.9998,0.0109,-0.0194,-1,0,0,0.7118,-0.7002,-0.056,0.9998,0.0109,-0.0194,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.9998,0.0109,-0.0194,1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7071,-0.7042,-0.0634,-0.7024,-0.7095,-0.0561,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.2383,0.5028,0.8309,0.7118,-0.7002,-0.056,0.9998,0.0109,-0.0194,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.9998,0.0109,-0.0194,1,0,0,0.7071,-0.7042,-0.0634,1,0,0,0.7024,-0.7095,-0.0561,0.7024,-0.7095,-0.0561,1,0,0,0.9998,-0.0077,-0.0199,0.7071,0.7042,0.0634,0.3827,0.9201,0.0828,0.7112,0.7028,0.0161,0.7112,0.7028,0.0161,0.3827,0.9202,0.0828,0.3821,0.9237,0.0287,-0.3821,0.9236,0.0302,-0.7019,0.7121,0.0173,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,-0.7019,0.7121,0.0173,-0.9998,0.0109,-0.0194,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.9998,0.0109,-0.0194,-1,0,0,-0.7071,0.7042,0.0636,-1,0,0,-0.7111,0.7029,0.0161,-0.7111,0.7029,0.0161,-1,0,0,-0.9998,-0.0077,-0.0199,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3826,-0.9216,-0.0658,0.3826,-0.9216,-0.0658,0.7071,-0.7042,-0.0634,0.7024,-0.7095,-0.0561,0.2382,-0.6431,0.7278,0.4188,-0.4894,0.7649,0.2382,-0.6431,0.7278,0.2383,-0.643,0.7279,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2382,-0.643,0.7279,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2383,-0.6431,0.7278,-0.2383,-0.6431,0.7278,-0.7118,-0.7002,-0.056,-0.3826,-0.9216,-0.0656,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3826,-0.9216,-0.0656,-0.3827,-0.9202,-0.0828,0.3826,-0.9216,-0.0656,0.7118,-0.7002,-0.056,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7118,-0.7002,-0.056,0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.7019,0.7121,0.0173,0.3821,0.9236,0.0302,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3821,0.9236,0.0302,0.3827,0.9202,0.0828,-0.9998,0.0109,-0.0194,-0.7118,-0.7002,-0.056,-1,0,0,-1,0,0,-0.7118,-0.7002,-0.056,-0.7071,-0.7042,-0.0634,1,0,0,0.7071,0.7042,0.0634,0.9998,-0.0077,-0.0199,0.9998,-0.0077,-0.0199,0.7071,0.7042,0.0634,0.7111,0.7029,0.0161,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,0.3826,-0.9216,-0.0658,0.7024,-0.7095,-0.0561,0.3824,-0.9217,-0.0656,0.3826,-0.9216,-0.0656,0.7024,-0.7095,-0.0561,0.7118,-0.7002,-0.056,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,0.9998,0.0109,-0.0194,0.7019,0.7121,0.0173,1,0,0,1,0,0,0.7019,0.7121,0.0173,0.7072,0.7042,0.0634,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7043,-0.0634,-0.7111,0.7029,0.0161,-0.7019,0.7121,0.0173,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7019,0.7121,0.0173,-0.3821,0.9236,0.0302,-1,0,0,-0.7071,-0.7042,-0.0634,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7071,-0.7042,-0.0634,-0.7024,-0.7095,-0.0561,0.9998,-0.0077,-0.0199,0.7111,0.7029,0.0161,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7111,0.7029,0.0161,0.7019,0.7121,0.0173,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,-0.3826,-0.9216,-0.0658,-0.3826,-0.9216,-0.0656,-0.7024,-0.7095,-0.0561,-0.7024,-0.7096,-0.0561,-0.3826,-0.9216,-0.0656,-0.7118,-0.7002,-0.056,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,0.7024,-0.7095,-0.0561,0.9998,-0.0077,-0.0199,0.7118,-0.7002,-0.056,0.7118,-0.7002,-0.056,0.9998,-0.0077,-0.0199,0.9998,0.0109,-0.0194,-0.7024,-0.7096,-0.0561,-0.7118,-0.7002,-0.056,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.056,-0.9998,0.0109,-0.0194,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7112,0.7028,0.0161,0.7112,0.7029,0.0161,0.3827,0.9202,0.0828,0.3821,0.9237,0.0287,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0194,-0.7111,0.7029,0.0161,-0.7111,0.7029,0.0161,-0.9998,0.0109,-0.0194,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,0.7112,0.7028,0.0161,0.3821,0.9237,0.0287,0.7019,0.7121,0.0173,0.7019,0.7121,0.0173,0.3821,0.9237,0.0287,0.3821,0.9236,0.0302,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.7111,0.7029,0.0161,0.3821,0.9237,0.0287,0.7019,0.7121,0.0173,0.7019,0.7121,0.0173,0.3821,0.9237,0.0287,0.3821,0.9236,0.0302,-1,0,-0.0001,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0633,-0.3826,-0.9216,-0.0658,-0.3826,-0.9216,-0.0656,-0.7024,-0.7095,-0.0561,-0.7024,-0.7095,-0.0561,-0.3826,-0.9216,-0.0656,-0.7118,-0.7002,-0.056,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0194,-0.7111,0.7029,0.0161,-0.7111,0.7029,0.0161,-0.9998,0.0109,-0.0194,-0.7019,0.7121,0.0173,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.9998,0.0109,-0.0194,0.7019,0.7121,0.0173,1,0,0,1,0,0,0.7019,0.7121,0.0173,0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.7024,-0.7095,-0.0561,-0.7118,-0.7002,-0.056,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.056,-0.9998,0.0109,-0.0194,0.7024,-0.7095,-0.0561,0.9998,-0.0077,-0.0199,0.7118,-0.7002,-0.056,0.7118,-0.7002,-0.056,0.9998,-0.0077,-0.0199,0.9998,0.0109,-0.0194,0.3826,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3826,-0.9216,-0.0658,0.3826,-0.9216,-0.0658,0.7071,-0.7042,-0.0634,0.7024,-0.7095,-0.0561,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,-0.9998,0.0109,-0.0194,-0.7118,-0.7002,-0.056,-1,0,0,-1,0,0,-0.7118,-0.7002,-0.056,-0.7071,-0.7042,-0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,0.7019,0.7121,0.0173,0.3821,0.9236,0.0302,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3821,0.9236,0.0302,0.3827,0.9202,0.0828,0.9998,-0.0077,-0.0199,0.7112,0.7028,0.0161,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7111,0.7029,0.0161,0.7019,0.7121,0.0173,0.3826,-0.9216,-0.0656,0.7118,-0.7002,-0.056,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7118,-0.7002,-0.056,0.7071,-0.7042,-0.0635,0.3826,-0.9216,-0.0658,0.7024,-0.7095,-0.0561,0.3824,-0.9217,-0.0656,0.3826,-0.9216,-0.0656,0.7025,-0.7095,-0.0561,0.7118,-0.7002,-0.056,-0.7111,0.7029,0.0161,-0.7019,0.7121,0.0173,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7019,0.7121,0.0173,-0.3821,0.9236,0.0302,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,-0.7118,-0.7002,-0.056,-0.3826,-0.9216,-0.0656,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3826,-0.9216,-0.0656,-0.3827,-0.9202,-0.0828,-0.3821,0.9236,0.0302,-0.7019,0.7121,0.0173,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,0.3826,-0.9216,-0.0658,0.7024,-0.7095,-0.0561,0.3824,-0.9217,-0.0656,0.3826,-0.9216,-0.0656,0.7024,-0.7095,-0.0561,0.7118,-0.7002,-0.056,0.7118,-0.7002,-0.056,0.9998,0.0109,-0.0194,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.9998,0.0109,-0.0194,1,0,0,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,0.3826,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3826,-0.9216,-0.0658,0.3826,-0.9216,-0.0658,0.7071,-0.7042,-0.0634,0.7024,-0.7095,-0.0561,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.7112,0.7028,0.0161,-0.7019,0.7121,0.0173,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7019,0.7121,0.0173,-0.3821,0.9236,0.0302,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-0.7019,0.7121,0.0173,-0.9998,0.0109,-0.0194,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.9998,0.0109,-0.0194,-1,0,0,0.9998,-0.0077,-0.0199,0.7112,0.7028,0.0161,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7111,0.7029,0.0161,0.7019,0.7121,0.0173,0.2383,-0.6431,0.7278,0.4188,-0.4894,0.7649,0.2383,-0.6431,0.7278,0.2383,-0.6431,0.7278,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7112,0.7028,0.0161,0.7112,0.7029,0.0161,0.3827,0.9202,0.0828,0.3821,0.9237,0.0287,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9201,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8024,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,-1,0,0,-0.7071,-0.7042,-0.0634,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7071,-0.7042,-0.0634,-0.7024,-0.7095,-0.0561,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.9998,-0.0077,-0.0199,0.9998,-0.0077,-0.0199,0.7071,0.7042,0.0634,0.7111,0.7029,0.0161,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.5924,-0.0722,0.8024,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.4188,0.3449,0.84,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7043,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,0.7024,-0.7095,-0.0561,0.9998,-0.0077,-0.0199,0.7118,-0.7002,-0.056,0.7118,-0.7002,-0.056,0.9998,-0.0077,-0.0199,0.9998,0.0109,-0.0194,-0.4188,-0.4894,0.7649,-0.2382,-0.643,0.7279,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2383,-0.6431,0.7278,-0.2383,-0.6431,0.7278,-0.7071,0.7042,0.0634,-1,0,0,-0.7112,0.7029,0.0161,-0.7111,0.7029,0.0161,-1,0,0,-0.9998,-0.0077,-0.0199,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.7071,-0.7042,-0.0634,1,0,0,0.7024,-0.7095,-0.0561,0.7024,-0.7095,-0.0561,1,0,0,0.9998,-0.0077,-0.0199,-0.7024,-0.7095,-0.0561,-0.7118,-0.7002,-0.056,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.056,-0.9998,0.0109,-0.0194,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.2383,0.5028,0.8309,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0194,-0.7111,0.7029,0.0161,-0.7111,0.7029,0.0161,-0.9998,0.0109,-0.0194,-0.7019,0.7121,0.0173,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7071,0.7042,0.0634,-0.7112,0.7029,0.0161,-0.7071,-0.7042,-0.0635,-0.3826,-0.9202,-0.0828,-0.7024,-0.7095,-0.0561,-0.7024,-0.7095,-0.0561,-0.3827,-0.9202,-0.0828,-0.3826,-0.9216,-0.0658,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,-0.2383,0.5028,0.8309,-0.4188,0.3449,0.84,-0.2383,0.5028,0.8309,-0.2383,0.5028,0.8309,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0635,0.7111,0.7029,0.0161,0.3821,0.9237,0.0287,0.7019,0.7121,0.0173,0.7019,0.7121,0.0173,0.3821,0.9237,0.0287,0.3821,0.9236,0.0302,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,-0.0001,0.0896,-0.996,-0.0001,0.0896,-0.996,-0.0001,0.0896,-0.996,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9201,0.0828,0.3827,0.9201,0.0828,0.3827,-0.9201,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9201,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,-0.2383,0.5028,0.8309,-0.4188,0.3449,0.84,-0.2383,0.5028,0.8309,-0.2383,0.5027,0.831,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.2382,0.5028,0.831,0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.2384,0.5028,0.8309,0.2384,0.5028,0.8309,-0.4188,-0.4894,0.7649,-0.2383,-0.6431,0.7278,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2383,-0.6431,0.7278,-0.2383,-0.6431,0.7278,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.4188,0.3449,0.84,-0.4189,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0.0001,-0.0896,0.996,0.0001,-0.0896,0.996,0.0001,-0.0896,0.996,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,-0.7071,-0.7042,-0.0634,-0.3827,-0.9201,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,-1,-0.0006,0.0065,-0.7071,0.7036,0.0699,-0.9937,0.01,-0.1114,-0.9937,0.01,-0.1114,-0.7071,0.7036,0.0699,-0.7027,0.7099,-0.0484,-0.7027,-0.6898,-0.1744,-0.9937,0.01,-0.1114,-0.6873,-0.6634,-0.2957,-0.6873,-0.6634,-0.2957,-0.9937,0.01,-0.1114,-0.972,0.0211,-0.234,1,-0.0006,0.0065,0.7071,-0.7048,-0.0569,0.9937,0.01,-0.1114,0.9937,0.01,-0.1114,0.7071,-0.7048,-0.0569,0.7027,-0.6898,-0.1744,-0.7071,0.7036,0.0699,-0.3827,0.9196,0.0888,-0.7027,0.7099,-0.0484,-0.7027,0.7099,-0.0484,-0.3827,0.9196,0.0888,-0.3806,0.9245,-0.0206,0.7071,-0.7048,-0.0569,0.3827,-0.9207,-0.0768,0.7027,-0.6898,-0.1744,0.7027,-0.6898,-0.1744,0.3827,-0.9207,-0.0768,0.3806,-0.906,-0.1854,-0.3826,-0.9207,-0.0768,-0.7071,-0.7048,-0.0569,-0.3806,-0.906,-0.1854,-0.3806,-0.906,-0.1854,-0.7071,-0.7048,-0.0569,-0.7027,-0.6898,-0.1744,0.3827,0.9196,0.0888,0.7071,0.7036,0.0699,0.3806,0.9245,-0.0206,0.3806,0.9245,-0.0206,0.7071,0.7036,0.0699,0.7027,0.7099,-0.0484,-0.7071,-0.7048,-0.0569,-1,-0.0006,0.0065,-0.7027,-0.6898,-0.1744,-0.7027,-0.6898,-0.1744,-1,-0.0006,0.0065,-0.9937,0.01,-0.1114,0.7071,0.7036,0.0699,1,-0.0006,0.0065,0.7027,0.7099,-0.0484,0.7027,0.7099,-0.0484,1,-0.0006,0.0065,0.9937,0.01,-0.1114,0.7027,0.7099,-0.0484,0.9937,0.01,-0.1114,0.6873,0.7056,-0.1724,0.6873,0.7056,-0.1724,0.9937,0.01,-0.1114,0.972,0.0211,-0.234,-0.9937,0.01,-0.1114,-0.7027,0.7099,-0.0484,-0.972,0.0211,-0.234,-0.972,0.0211,-0.234,-0.7027,0.7099,-0.0484,-0.6873,0.7056,-0.1724,0.9937,0.01,-0.1114,0.7027,-0.6898,-0.1744,0.972,0.0211,-0.234,0.972,0.0211,-0.234,0.7027,-0.6898,-0.1744,0.6873,-0.6634,-0.2957,-0.7027,0.7099,-0.0484,-0.3806,0.9245,-0.0206,-0.6873,0.7056,-0.1724,-0.6873,0.7056,-0.1724,-0.3806,0.9245,-0.0206,-0.3735,0.9176,-0.1363,0.7027,-0.6898,-0.1744,0.3806,-0.906,-0.1854,0.6873,-0.6634,-0.2957,0.6873,-0.6634,-0.2957,0.3806,-0.906,-0.1854,0.3735,-0.8785,-0.298,-0.3806,-0.906,-0.1854,-0.7027,-0.6898,-0.1744,-0.3735,-0.8785,-0.298,-0.3735,-0.8785,-0.298,-0.7027,-0.6898,-0.1744,-0.6873,-0.6634,-0.2957,0.3806,0.9245,-0.0206,0.7027,0.7099,-0.0484,0.3735,0.9176,-0.1363,0.3735,0.9176,-0.1363,0.7027,0.7099,-0.0484,0.6873,0.7056,-0.1724,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.063,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-0.0001,0.0892,-0.996,-0.0001,0.0892,-0.996,-0.0001,0.0892,-0.996,0.7118,-0.7002,-0.0556,0.3826,-0.9216,-0.0652,0.7024,-0.7096,-0.0558,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0653,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.0631,-0.3827,0.9202,0.0824,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,0.7118,-0.7002,-0.0556,0.3826,-0.9216,-0.0652,0.7024,-0.7096,-0.0558,0.7024,-0.7096,-0.0558,0.3824,-0.9217,-0.0652,0.3826,-0.9216,-0.0653,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.063,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.0631,1,0,0,0.7071,-0.7043,-0.063,0.7024,-0.7096,-0.0558,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0653,-0.9998,0.0109,-0.0195,-1,0,0,-0.7019,0.7121,0.017,-0.7019,0.7121,0.017,-1,0,0,-0.7071,0.7043,0.063,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.3827,0.9202,0.0824,0.3821,0.9237,0.0282,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3821,0.9237,0.0282,0.7111,0.7029,0.0158,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.063,-1,0,0,0.9998,0.0109,-0.0194,1,0,0,0.7118,-0.7002,-0.0556,0.7118,-0.7002,-0.0556,1,0,0,0.7071,-0.7043,-0.063,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0.0001,0.0892,-0.996,0.0001,0.0892,-0.996,0.0001,0.0892,-0.996,-0.7019,0.7121,0.017,-0.7071,0.7043,0.063,-0.3821,0.9236,0.0297,-0.3821,0.9236,0.0297,-0.7071,0.7043,0.0631,-0.3826,0.9202,0.0824,-0.7071,-0.7043,-0.0631,-0.7024,-0.7096,-0.0558,-1,0,0,-1,0,0,-0.7024,-0.7096,-0.0558,-0.9998,-0.0077,-0.0199,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,-0.3827,-0.9216,-0.0652,-0.3827,-0.9202,-0.0824,-0.7118,-0.7002,-0.0556,-0.7118,-0.7002,-0.0556,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.7118,-0.7002,-0.0556,0.7071,-0.7043,-0.063,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0652,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.7071,0.7043,0.0631,0.7112,0.7029,0.0158,1,0,0,1,0,0,0.7112,0.7029,0.0158,0.9998,-0.0077,-0.0199,0.2383,0.5032,0.8307,0.2383,0.5032,0.8307,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.2382,0.5032,0.8307,0.4188,0.3453,0.8398,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3821,0.9236,0.0297,0.3827,0.9202,0.0824,0.7019,0.7121,0.017,0.7019,0.7121,0.017,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,-1,0,0,-0.9998,-0.0077,-0.0199,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.9998,-0.0077,-0.0199,-0.7112,0.7029,0.0158,-0.2383,-0.6427,0.7281,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7651,0.7071,-0.7043,-0.063,0.7024,-0.7096,-0.0558,0.3826,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0653,0.3827,0.9202,0.0824,0.3821,0.9237,0.0282,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3821,0.9237,0.0282,0.7112,0.7029,0.0158,0.7019,0.7121,0.017,0.7071,0.7043,0.0631,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7071,0.7043,0.0632,1,0,0,-0.7118,-0.7002,-0.0556,-0.7071,-0.7043,-0.0631,-0.9998,0.0109,-0.0195,-0.9998,0.0109,-0.0195,-0.7071,-0.7043,-0.0631,-1,0,0,1,0,0,0.9998,-0.0077,-0.0199,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,0.9998,-0.0077,-0.0199,0.7024,-0.7096,-0.0558,-0.4188,0.3453,0.8398,-0.4188,0.3453,0.8399,-0.2382,0.5032,0.8307,-0.2383,0.5032,0.8307,-0.4189,0.3453,0.8398,-0.2383,0.5032,0.8307,-0.7118,-0.7002,-0.0556,-0.7071,-0.7043,-0.0631,-0.9998,0.0109,-0.0195,-0.9997,0.0109,-0.0195,-0.7071,-0.7043,-0.063,-1,0,0,-0.7071,-0.7043,-0.0631,-0.7024,-0.7096,-0.0558,-1,0,0,-1,0,0,-0.7024,-0.7096,-0.0558,-0.9998,-0.0078,-0.0199,-0.7071,0.7043,0.063,-0.7112,0.7029,0.0158,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7112,0.7029,0.0158,-0.3821,0.9237,0.0282,0.3821,0.9236,0.0297,0.3827,0.9202,0.0824,0.7019,0.7121,0.017,0.7019,0.7121,0.017,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7019,0.7121,0.017,0.7071,0.7043,0.0631,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7071,0.7043,0.0631,1,0,0,0.7071,0.7043,0.0631,0.7112,0.7029,0.0158,1,0,0,1,0,0,0.7112,0.7029,0.0158,0.9998,-0.0078,-0.0199,-0.3827,-0.9202,-0.0824,-0.3826,-0.9216,-0.0653,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3826,-0.9216,-0.0653,-0.7024,-0.7096,-0.0558,-0.2383,-0.6428,0.7281,-0.2383,-0.6428,0.7281,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.2383,-0.6426,0.7282,-0.4188,-0.489,0.7651,0.4188,-0.489,0.7651,0.4188,-0.489,0.7652,0.2382,-0.6427,0.7281,0.2384,-0.6428,0.728,0.4188,-0.489,0.7651,0.2384,-0.6428,0.728,0.7118,-0.7002,-0.0556,0.7071,-0.7043,-0.063,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0652,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,-0.3827,-0.9216,-0.0652,-0.3827,-0.9202,-0.0824,-0.7118,-0.7002,-0.0556,-0.7118,-0.7002,-0.0556,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.0631,0.3827,-0.9202,-0.0824,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8399,-0.4188,0.3453,0.8398,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8398,-0.7019,0.7121,0.017,-0.7071,0.7043,0.063,-0.3821,0.9236,0.0297,-0.3821,0.9236,0.0297,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,0.9998,0.0109,-0.0194,1,0,0,0.7118,-0.7002,-0.0556,0.7118,-0.7002,-0.0556,1,0,0,0.7071,-0.7043,-0.063,-1,0,0,-0.9998,-0.0078,-0.0199,-0.7071,0.7043,0.0629,-0.7071,0.7043,0.063,-0.9998,-0.0078,-0.0199,-0.7112,0.7029,0.0158,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,-0.3826,-0.9216,-0.0653,-0.3826,-0.9216,-0.0652,-0.7024,-0.7096,-0.0558,-0.7024,-0.7096,-0.0558,-0.3826,-0.9216,-0.0652,-0.7118,-0.7002,-0.0556,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,0.4189,-0.489,0.7651,0.5924,-0.0718,0.8025,0.4189,-0.489,0.7651,-0.9998,0.0109,-0.0195,-1,0,0,-0.7019,0.7121,0.017,-0.7019,0.7121,0.017,-1,0,0,-0.7071,0.7043,0.063,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.3821,0.9236,0.0297,0.7019,0.7121,0.017,0.3821,0.9237,0.0282,0.3821,0.9237,0.0282,0.7019,0.7121,0.017,0.7112,0.7028,0.0158,1,0,0,0.9998,-0.0078,-0.0199,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,0.9998,-0.0078,-0.0199,0.7024,-0.7096,-0.0558,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0195,-0.7112,0.7028,0.0158,-0.7111,0.7029,0.0158,-0.9998,0.0109,-0.0195,-0.7019,0.7121,0.017,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7652,-0.5923,-0.0718,0.8025,-0.5924,-0.0718,0.8025,-0.4189,-0.489,0.7651,-0.5923,-0.0718,0.8025,0.7118,-0.7002,-0.0556,0.3826,-0.9216,-0.0652,0.7024,-0.7096,-0.0558,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0653,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.063,-1,0,0,-0.7024,-0.7096,-0.0558,-0.7118,-0.7002,-0.0556,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.0556,-0.9998,0.0109,-0.0195,0.9998,0.0109,-0.0194,0.7118,-0.7002,-0.0556,0.9998,-0.0077,-0.0199,0.9998,-0.0077,-0.0199,0.7118,-0.7002,-0.0556,0.7024,-0.7096,-0.0558,-0.7071,0.7043,0.063,-0.7111,0.7029,0.0158,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7111,0.7029,0.0158,-0.3821,0.9237,0.0282,0.7019,0.7121,0.017,0.9998,0.0109,-0.0194,0.7112,0.7029,0.0158,0.7112,0.7029,0.0158,0.9998,0.0109,-0.0194,0.9998,-0.0077,-0.0199,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,-0.0001,1,0,0,0.7071,0.7043,0.063,1,0,0,-0.7111,0.7029,0.0158,-0.7019,0.7121,0.017,-0.3821,0.9237,0.0282,-0.3821,0.9237,0.0282,-0.7019,0.7121,0.017,-0.3821,0.9236,0.0297,-1,0,0,-1,0,0,-0.7071,0.7043,0.0631,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,-0.7112,0.7029,0.0158,-0.7019,0.7121,0.017,-0.3821,0.9237,0.0282,-0.3821,0.9237,0.0282,-0.7019,0.7121,0.017,-0.3821,0.9236,0.0297,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,0.7118,-0.7002,-0.0556,0.3826,-0.9216,-0.0652,0.7024,-0.7096,-0.0558,0.7024,-0.7096,-0.0558,0.3824,-0.9217,-0.0652,0.3826,-0.9216,-0.0653,0.4188,0.3453,0.8398,0.4188,0.3453,0.8399,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,0.3453,0.8399,0.5923,-0.0718,0.8025,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3826,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.0631,1,0,0,0.7019,0.7121,0.017,0.9998,0.0109,-0.0194,0.7112,0.7028,0.0158,0.7112,0.7029,0.0158,0.9998,0.0109,-0.0194,0.9998,-0.0078,-0.0199,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0.0001,-0.0891,0.996,0.0001,-0.0891,0.996,0.0001,-0.0891,0.996,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.9998,0.0109,-0.0195,-1,0,0,-0.7019,0.7121,0.017,-0.7019,0.7121,0.017,-1,0,0,-0.7071,0.7043,0.063,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.9998,0.0109,-0.0194,0.7118,-0.7002,-0.0556,0.9998,-0.0078,-0.0199,0.9998,-0.0078,-0.0199,0.7118,-0.7002,-0.0556,0.7024,-0.7096,-0.0558,-0.7024,-0.7096,-0.0558,-0.7118,-0.7002,-0.0556,-0.9998,-0.0078,-0.0199,-0.9998,-0.0078,-0.0199,-0.7118,-0.7002,-0.0556,-0.9998,0.0109,-0.0195,-0.3826,-0.9202,-0.0824,-0.3826,-0.9216,-0.0653,-0.7071,-0.7043,-0.063,-0.7071,-0.7043,-0.0631,-0.3826,-0.9216,-0.0653,-0.7024,-0.7096,-0.0558,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.0631,-1,0,0,0.9998,0.0109,-0.0194,1,0,0,0.7118,-0.7002,-0.0556,0.7118,-0.7002,-0.0556,1,0,0,0.7071,-0.7043,-0.063,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,-0.7019,0.7121,0.017,-0.7071,0.7043,0.063,-0.3821,0.9236,0.0297,-0.3821,0.9236,0.0297,-0.7071,0.7043,0.0629,-0.3827,0.9202,0.0824,-0.9998,-0.0078,-0.0199,-0.9998,0.0109,-0.0195,-0.7112,0.7029,0.0158,-0.7112,0.7028,0.0158,-0.9998,0.0109,-0.0195,-0.7019,0.7121,0.017,-0.3826,-0.9216,-0.0652,-0.3827,-0.9202,-0.0824,-0.7118,-0.7002,-0.0556,-0.7118,-0.7002,-0.0556,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.3826,-0.9216,-0.0653,-0.3826,-0.9216,-0.0652,-0.7024,-0.7096,-0.0558,-0.7024,-0.7096,-0.0558,-0.3826,-0.9216,-0.0652,-0.7118,-0.7002,-0.0556,0.3821,0.9236,0.0297,0.7019,0.7121,0.017,0.3821,0.9237,0.0282,0.3821,0.9237,0.0282,0.7019,0.7121,0.017,0.7112,0.7029,0.0158,-1,0,0,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,0.7118,-0.7002,-0.0556,0.7071,-0.7043,-0.063,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0652,0.7071,-0.7043,-0.0631,0.3827,-0.9202,-0.0824,0.3821,0.9236,0.0297,0.3826,0.9202,0.0824,0.7019,0.7121,0.017,0.7019,0.7121,0.017,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.0631,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,-0.3826,-0.9216,-0.0653,-0.3826,-0.9216,-0.0652,-0.7024,-0.7096,-0.0558,-0.7024,-0.7096,-0.0558,-0.3826,-0.9216,-0.0652,-0.7118,-0.7002,-0.0556,-0.7118,-0.7002,-0.0556,-0.7071,-0.7043,-0.0631,-0.9998,0.0109,-0.0195,-0.9998,0.0109,-0.0195,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-1,0,0,-0.7071,0.7043,0.0631,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3826,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3826,-0.9202,-0.0824,-0.3826,-0.9216,-0.0653,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3826,-0.9216,-0.0653,-0.7024,-0.7096,-0.0558,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.3821,0.9236,0.0297,0.7019,0.7121,0.017,0.3821,0.9237,0.0282,0.3821,0.9237,0.0282,0.7019,0.7121,0.017,0.7111,0.7029,0.0158,0,-0.0893,0.996,0,-0.0893,0.996,0,-0.0893,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,0.0001,-0.0891,0.996,0.0001,-0.0891,0.996,0.0001,-0.0891,0.996,0.7019,0.7121,0.017,0.7071,0.7043,0.0631,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7071,0.7043,0.0631,1,0,0,-0.9998,-0.0078,-0.0199,-0.9998,0.0109,-0.0195,-0.7112,0.7029,0.0158,-0.7112,0.7028,0.0158,-0.9998,0.0109,-0.0195,-0.7019,0.7121,0.017,-0.2383,-0.6427,0.7281,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7652,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,0.3453,0.8399,0.5923,-0.0718,0.8025,-0.7071,0.7043,0.063,-0.7111,0.7029,0.0158,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7111,0.7029,0.0158,-0.3821,0.9237,0.0282,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.0631,0.3827,-0.9202,-0.0824,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,-0.4188,-0.489,0.7652,-0.4188,-0.489,0.7651,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4189,-0.489,0.7651,-0.5923,-0.0718,0.8025,1,0,0,0.9998,-0.0078,-0.0199,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,0.9998,-0.0078,-0.0199,0.7024,-0.7096,-0.0558,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,0.4189,-0.489,0.7651,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.063,-1,0,0,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.9998,-0.0078,-0.0199,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.9998,-0.0078,-0.0199,-0.7112,0.7029,0.0158,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8398,-0.4188,0.3453,0.8399,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8399,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.0631,1,0,0,-0.7024,-0.7096,-0.0558,-0.7118,-0.7002,-0.0556,-0.9998,-0.0078,-0.0199,-0.9998,-0.0078,-0.0199,-0.7118,-0.7002,-0.0556,-0.9998,0.0109,-0.0195,0.4188,-0.489,0.7651,0.4188,-0.489,0.7651,0.2383,-0.6427,0.7281,0.2384,-0.6427,0.7281,0.4188,-0.489,0.7651,0.2384,-0.6427,0.7281,0.7071,0.7043,0.0631,0.7112,0.7029,0.0158,1,0,0,1,0,0,0.7112,0.7029,0.0158,0.9998,-0.0078,-0.0199,-1,0,0,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,-0.7071,-0.7043,-0.0631,-0.7024,-0.7096,-0.0558,-1,0,0,-1,0,0,-0.7024,-0.7096,-0.0558,-0.9998,-0.0078,-0.0199,0.9998,0.0109,-0.0194,0.7118,-0.7002,-0.0556,0.9998,-0.0078,-0.0199,0.9998,-0.0078,-0.0199,0.7118,-0.7002,-0.0556,0.7024,-0.7096,-0.0558,-0.4188,0.3453,0.8399,-0.4188,0.3453,0.8398,-0.2382,0.5032,0.8307,-0.2382,0.5032,0.8307,-0.4188,0.3453,0.8398,-0.2382,0.5032,0.8307,0.7019,0.7121,0.017,0.9998,0.0109,-0.0194,0.7112,0.7028,0.0158,0.7112,0.7029,0.0158,0.9998,0.0109,-0.0194,0.9998,-0.0078,-0.0199,0.3827,0.9202,0.0824,0.3821,0.9237,0.0282,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3821,0.9237,0.0282,0.7111,0.7029,0.0158,0.7071,-0.7043,-0.063,0.7024,-0.7096,-0.0558,0.3826,-0.9202,-0.0824,0.3826,-0.9202,-0.0824,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0653,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.0631,1,0,0,0.2383,0.5032,0.8307,0.2383,0.5032,0.8307,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.2383,0.5032,0.8307,0.4188,0.3453,0.8398,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,-0.0001,0.7071,-0.7043,-0.063,-0.7112,0.7029,0.0158,-0.7019,0.7121,0.017,-0.3821,0.9237,0.0282,-0.3821,0.9237,0.0282,-0.7019,0.7121,0.017,-0.3821,0.9236,0.0297,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.0631,-0.3827,0.9202,0.0824,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.2383,0.5032,0.8307,0.2383,0.5032,0.8307,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.2382,0.5033,0.8307,0.4188,0.3453,0.8398,-0.4188,0.3453,0.8399,-0.4188,0.3453,0.8399,-0.2383,0.5032,0.8307,-0.2382,0.5032,0.8307,-0.4188,0.3453,0.8399,-0.2382,0.5032,0.8307,0.4188,-0.489,0.7652,0.4188,-0.489,0.7652,0.2383,-0.6427,0.7281,0.2383,-0.6427,0.7281,0.4188,-0.489,0.7651,0.2383,-0.6427,0.7281,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4189,0.3453,0.8398,-0.4188,0.3453,0.8398,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8398,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,0.4188,-0.489,0.7652,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7652,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4188,-0.489,0.7651,-0.5923,-0.0718,0.8025,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.5923,-0.0718,0.8025,0.5924,-0.0718,0.8025,0.4189,0.3453,0.8398,0.5923,-0.0718,0.8025,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0.3826,0.9202,0.0824,0.3826,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3826,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,-1,0,0,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,1,0,0,1,0,0,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.0631,-1,0,0,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.063,1,0,0,-0.9998,0.0109,-0.0195,-1,0,0,-0.7019,0.7121,0.017,-0.7019,0.7121,0.017,-1,0,0,-0.7071,0.7043,0.063,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.9998,0.0109,-0.0194,1,0,0,0.7118,-0.7002,-0.0556,0.7118,-0.7002,-0.0556,1,0,0,0.7071,-0.7043,-0.063,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-0.7019,0.7121,0.017,-0.7071,0.7043,0.063,-0.3821,0.9236,0.0297,-0.3821,0.9236,0.0297,-0.7071,0.7043,0.0631,-0.3827,0.9202,0.0824,-0.3827,-0.9216,-0.0652,-0.3827,-0.9202,-0.0824,-0.7118,-0.7002,-0.0556,-0.7118,-0.7002,-0.0556,-0.3827,-0.9202,-0.0824,-0.7071,-0.7043,-0.0631,0.7118,-0.7002,-0.0556,0.7071,-0.7043,-0.063,0.3826,-0.9216,-0.0652,0.3826,-0.9216,-0.0652,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.2382,0.5032,0.8307,0.2382,0.5032,0.8307,0.4188,0.3453,0.8399,0.4188,0.3453,0.8399,0.2382,0.5032,0.8307,0.4188,0.3453,0.8398,0.3821,0.9236,0.0297,0.3827,0.9202,0.0824,0.7019,0.7121,0.017,0.7019,0.7121,0.017,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,-0.7043,-0.063,0.7024,-0.7096,-0.0558,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7024,-0.7096,-0.0558,0.3826,-0.9216,-0.0653,0.3827,0.9202,0.0824,0.3821,0.9237,0.0282,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3821,0.9237,0.0282,0.7112,0.7029,0.0158,-0.4188,0.3453,0.8399,-0.4188,0.3453,0.8398,-0.2383,0.5032,0.8306,-0.2382,0.5032,0.8307,-0.4188,0.3453,0.8399,-0.2382,0.5032,0.8307,-0.7118,-0.7002,-0.0556,-0.7071,-0.7043,-0.0631,-0.9998,0.0109,-0.0195,-0.9997,0.0109,-0.0195,-0.7071,-0.7043,-0.063,-1,0,0,-0.7071,-0.7043,-0.0631,-0.7024,-0.7096,-0.0558,-1,0,0,-1,0,0,-0.7024,-0.7096,-0.0558,-0.9998,-0.0077,-0.0199,0.7019,0.7121,0.017,0.7071,0.7043,0.0631,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7071,0.7043,0.0631,1,0,0,0.7071,0.7043,0.0631,0.7112,0.7029,0.0158,1,0,0,1,0,0,0.7112,0.7029,0.0158,0.9998,-0.0078,-0.0199,-0.2383,-0.6427,0.7281,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.2383,-0.6427,0.7281,-0.4188,-0.489,0.7651,0.4189,-0.489,0.7651,0.4188,-0.489,0.7651,0.2383,-0.6427,0.7281,0.2384,-0.6427,0.7281,0.4188,-0.489,0.7651,0.2384,-0.6427,0.7281,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.0628,0.3827,-0.9202,-0.0824,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8398,-0.4188,0.3453,0.8399,-0.5923,-0.0718,0.8025,-0.4188,0.3453,0.8398,-1,0,0,-0.9998,-0.0077,-0.0199,-0.7071,0.7043,0.0629,-0.7071,0.7043,0.063,-0.9998,-0.0077,-0.0199,-0.7112,0.7029,0.0158,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.063,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,0.4188,-0.489,0.7651,0.5923,-0.0718,0.8025,0.4188,-0.489,0.7651,1,0,0,0.9998,-0.0078,-0.0199,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,0.9998,-0.0078,-0.0199,0.7024,-0.7096,-0.0558,-0.4188,-0.489,0.7651,-0.4188,-0.489,0.7651,-0.5923,-0.0718,0.8025,-0.5923,-0.0718,0.8025,-0.4188,-0.489,0.7651,-0.5923,-0.0718,0.8025,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.063,-1,0,0,-0.7071,0.7043,0.063,-0.7111,0.7029,0.0158,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7112,0.7029,0.0158,-0.3821,0.9237,0.0282,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,-0.0001,1,0,0,0.7071,0.7043,0.0631,1,0,0,-1,0,0,-1,0,0,-0.7071,0.7043,0.0631,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,0.4188,0.3453,0.8398,0.4188,0.3453,0.8398,0.5923,-0.0718,0.8025,0.5923,-0.0718,0.8025,0.4188,0.3453,0.8399,0.5923,-0.0718,0.8025,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.0631,-0.3827,0.9202,0.0824,0,-0.0893,0.996,0,-0.0893,0.996,0,-0.0893,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0891,0.996,0,-0.0891,0.996,0,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,-0.0001,-0.0891,0.996,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,0.3827,0.9202,0.0824,0.7071,0.7043,0.0631,-0.3827,-0.9202,-0.0824,-0.3826,-0.9216,-0.0653,-0.7071,-0.7043,-0.0632,-0.7071,-0.7043,-0.0631,-0.3826,-0.9216,-0.0653,-0.7024,-0.7096,-0.0558,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-0.3826,0.9202,0.0824,-0.3827,0.9202,0.0824,-0.7071,0.7043,0.063,-0.3827,0.9202,0.0824,-0.3826,-0.9216,-0.0653,-0.3826,-0.9216,-0.0652,-0.7024,-0.7096,-0.0558,-0.7024,-0.7096,-0.0558,-0.3826,-0.9216,-0.0652,-0.7118,-0.7002,-0.0556,0.7071,-0.7043,-0.063,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,0.7071,-0.7043,-0.063,0.3827,-0.9202,-0.0824,-1,0,0,-1,0,0,-0.7071,0.7043,0.063,-0.7071,0.7043,0.063,-1,0,0,-0.7071,0.7043,0.063,0.3821,0.9236,0.0297,0.7019,0.7121,0.017,0.3821,0.9237,0.0282,0.3821,0.9237,0.0282,0.7019,0.7121,0.017,0.7112,0.7028,0.0158,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0195,-0.7112,0.7029,0.0158,-0.7111,0.7029,0.0158,-0.9998,0.0109,-0.0195,-0.7019,0.7121,0.017,1,0,0,1,0,0,0.7071,-0.7043,-0.0631,0.7071,-0.7043,-0.063,1,0,0,0.7071,-0.7043,-0.063,-0.7071,-0.7043,-0.0631,-0.7071,-0.7043,-0.0631,-1,0,0,-1,0,0,-0.7071,-0.7043,-0.063,-1,0,0,-0.7024,-0.7096,-0.0558,-0.7118,-0.7002,-0.0556,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.0556,-0.9998,0.0109,-0.0195,0.9998,0.0109,-0.0194,0.7118,-0.7002,-0.0556,0.9998,-0.0078,-0.0199,0.9998,-0.0078,-0.0199,0.7118,-0.7002,-0.0556,0.7024,-0.7096,-0.0558,0.7019,0.7121,0.017,0.9998,0.0109,-0.0194,0.7112,0.7028,0.0158,0.7112,0.7029,0.0158,0.9998,0.0109,-0.0194,0.9998,-0.0078,-0.0199,0.7071,0.7043,0.0631,0.7071,0.7043,0.0631,1,0,0,1,0,0,0.7071,0.7043,0.0631,1,0,0,-0.7112,0.7028,0.0158,-0.7019,0.7121,0.017,-0.3821,0.9237,0.0282,-0.3821,0.9237,0.0282,-0.7019,0.7121,0.017,-0.3821,0.9236,0.0297,1,-0.0006,0.0065,0.9937,0.0099,-0.1114,0.7071,0.7037,0.0695,0.7071,0.7037,0.0695,0.9937,0.0099,-0.1114,0.7027,0.7098,-0.0487,0.7027,-0.6899,-0.174,0.6873,-0.6636,-0.2953,0.9937,0.0099,-0.1114,0.9937,0.0099,-0.1114,0.6873,-0.6636,-0.2953,0.972,0.0209,-0.234,-1,-0.0005,0.0065,-0.9937,0.0099,-0.1114,-0.7071,-0.7048,-0.0566,-0.7071,-0.7048,-0.0566,-0.9937,0.0099,-0.1114,-0.7027,-0.6899,-0.174,0.7071,0.7037,0.0695,0.7027,0.7098,-0.0487,0.3827,0.9196,0.0884,0.3827,0.9196,0.0884,0.7027,0.7098,-0.0487,0.3806,0.9245,-0.0211,-0.7071,-0.7048,-0.0566,-0.7027,-0.6899,-0.174,-0.3827,-0.9207,-0.0764,-0.3827,-0.9207,-0.0764,-0.7027,-0.6899,-0.174,-0.3806,-0.9061,-0.1849,0.3827,-0.9207,-0.0764,0.3806,-0.9061,-0.1849,0.7071,-0.7049,-0.0566,0.7071,-0.7049,-0.0566,0.3806,-0.9061,-0.1849,0.7027,-0.6899,-0.174,-0.3827,0.9196,0.0884,-0.3806,0.9245,-0.0211,-0.7071,0.7037,0.0695,-0.7071,0.7037,0.0695,-0.3806,0.9245,-0.0211,-0.7027,0.7098,-0.0487,0.7071,-0.7049,-0.0566,0.7027,-0.6899,-0.174,1,-0.0006,0.0065,1,-0.0006,0.0065,0.7027,-0.6899,-0.174,0.9937,0.0099,-0.1114,-0.7071,0.7037,0.0695,-0.7027,0.7098,-0.0487,-1,-0.0005,0.0065,-1,-0.0005,0.0065,-0.7027,0.7098,-0.0487,-0.9937,0.0099,-0.1114,-0.7027,0.7098,-0.0487,-0.6873,0.7055,-0.1728,-0.9937,0.0099,-0.1114,-0.9937,0.0099,-0.1114,-0.6873,0.7055,-0.1728,-0.972,0.0209,-0.234,0.9937,0.0099,-0.1114,0.972,0.0209,-0.234,0.7027,0.7098,-0.0487,0.7027,0.7098,-0.0487,0.972,0.0209,-0.234,0.6873,0.7055,-0.1728,-0.9937,0.0099,-0.1114,-0.972,0.0209,-0.234,-0.7027,-0.6899,-0.174,-0.7027,-0.6899,-0.174,-0.972,0.0209,-0.234,-0.6873,-0.6636,-0.2953,0.7027,0.7098,-0.0487,0.6873,0.7055,-0.1728,0.3806,0.9245,-0.0211,0.3806,0.9245,-0.0211,0.6873,0.7055,-0.1728,0.3735,0.9175,-0.1367,-0.7027,-0.6899,-0.174,-0.6873,-0.6636,-0.2953,-0.3806,-0.9061,-0.1849,-0.3806,-0.906,-0.1849,-0.6873,-0.6636,-0.2953,-0.3735,-0.8786,-0.2975,0.3806,-0.9061,-0.1849,0.3735,-0.8786,-0.2975,0.7027,-0.6899,-0.174,0.7027,-0.6899,-0.174,0.3735,-0.8786,-0.2975,0.6873,-0.6636,-0.2953,-0.3806,0.9245,-0.0211,-0.3735,0.9175,-0.1367,-0.7027,0.7098,-0.0487,-0.7027,0.7098,-0.0487,-0.3735,0.9175,-0.1367,-0.6873,0.7055,-0.1728,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0898,0,-0.996,-0.0898,0,-0.996,-0.0898,0,-0.996,-0.0898,0,-0.996,-0.0898,0,-0.996,-0.0898,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0899,0,-0.996,-0.0899,0,-0.996,-0.0899,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.996,0.0898,0,0.996,0.0898,0,0.996,0.0898,0,0.996,0.0898,0,0.996,0.0898,0,0.996,0.0898,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,-0.0001,0.996,0.0895,-0.0001,0.996,0.0895,-0.0001,0.996,0.0895,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0.0002,-1,0,0.0002,-1,0,0.0002,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0.0002,-1,0,0.0002,-1,0,0.0002,-1,0,0.0002,-1,0,0.0002,-1,0,0.0002,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-0.0001,-1,0,-0.0001,-1,0,-0.0001,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0893,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0893,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0891,0,0.996,0.0891,0,0.996,0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,-0.996,-0.0891,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,-0.9808,0.194,0.02,-0.9239,0.3807,0.0393,-0.9808,0.194,0.02,-0.9808,0.194,0.02,-0.9239,0.3807,0.0393,-0.9239,0.3807,0.0393,-0.7071,-0.7034,-0.0727,-0.7071,-0.7034,-0.0727,-0.9239,-0.3806,-0.0393,-0.9239,-0.3807,-0.0393,-0.7071,-0.7034,-0.0727,-0.9239,-0.3807,-0.0393,-0.2949,0.9343,0.2004,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2519,-0.3778,0.891,0.2519,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2519,-0.3827,-0.919,-0.095,-0.3827,-0.919,-0.095,-0.7071,-0.7034,-0.0727,-0.7071,-0.7034,-0.0727,-0.3827,-0.919,-0.095,-0.7071,-0.7034,-0.0727,0.7071,-0.7034,-0.0727,0.7071,-0.7034,-0.0727,0.3827,-0.919,-0.095,0.3827,-0.919,-0.095,0.7071,-0.7034,-0.0727,0.3827,-0.919,-0.095,0.1368,0.9854,0.1018,0.2949,0.9343,0.2004,0.1368,0.9854,0.1018,0.1368,0.9854,0.1018,0.2949,0.9343,0.2004,0.2483,0.9534,0.1714,0.9239,-0.3806,-0.0393,0.9239,-0.3806,-0.0393,0.7071,-0.7034,-0.0727,0.7071,-0.7034,-0.0727,0.9239,-0.3807,-0.0393,0.7071,-0.7034,-0.0727,0.9239,0.3806,0.0393,0.9808,0.194,0.0201,0.9239,0.3806,0.0393,0.9239,0.3807,0.0393,0.9808,0.194,0.0201,0.9808,0.194,0.0201,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0.0001,-0.1027,0.9947,0.0001,-0.1027,0.9947,0.0001,-0.1027,0.9947,-0.0001,-0.1027,0.9947,-0.0001,-0.1027,0.9947,-0.0001,-0.1027,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0.0002,0.1029,-0.9947,0.0002,0.1029,-0.9947,0.0002,0.1029,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0.0001,0.1027,-0.9947,0.0001,0.1027,-0.9947,0.0001,0.1027,-0.9947,0.9808,0.194,0.02,1,0,0,0.9808,0.194,0.0201,0.9808,0.194,0.0201,1,0,0,1,0,0,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,-0.9808,0.194,0.02,-1,0,0,-0.9808,0.194,0.02,-0.9808,0.194,0.02,-1,0,0,-1,0,0,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0.1049,0.3509,-0.9305,0,0.3528,-0.9357,0.1049,0.3509,-0.9305,0.1049,0.3509,-0.9305,0,0.3528,-0.9357,0,0.3528,-0.9357,0.9881,0.1529,0.0158,0.9881,0.1529,0.0158,0.9881,0.1529,0.0158,0.9881,0.1529,0.0158,0.9881,0.1529,0.0158,0.9881,0.1529,0.0158,-0.3778,0.9236,-0.0644,-0.3778,0.9236,-0.0644,-0.3778,0.9236,-0.0644,-0.3778,0.9236,-0.0644,-0.3778,0.9236,-0.0644,-0.3778,0.9236,-0.0644,-0.2949,0.9343,0.2004,-0.1368,0.9854,0.1018,-0.2483,0.9534,0.1714,-0.2483,0.9534,0.1714,-0.1368,0.9854,0.1018,-0.1368,0.9854,0.1018,0.2949,0.9343,0.2004,0.3778,0.891,0.2518,0.2483,0.9534,0.1714,0.2483,0.9534,0.1714,0.3778,0.891,0.2519,0.3778,0.891,0.2519,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0644,0.3778,0.9236,-0.0644,0.3778,0.9236,-0.0644,0.1368,0.9854,0.1018,0.2949,0.9343,0.2004,0.1368,0.9854,0.1018,0.1369,0.9853,0.1018,0.2949,0.9343,0.2004,0.2483,0.9534,0.1714,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.1049,0.3509,-0.9305,-0.1049,0.3509,-0.9305,0,0.3528,-0.9357,0,0.3528,-0.9357,-0.1049,0.3509,-0.9305,0,0.3528,-0.9357,-0.9881,0.1529,0.0158,-0.9881,0.1529,0.0158,-0.9881,0.1529,0.0158,-0.9881,0.1529,0.0158,-0.9881,0.1529,0.0158,-0.9881,0.1529,0.0158,0.1049,0.1532,0.9826,0.1049,0.1532,0.9826,0,0.154,0.9881,0,0.154,0.9881,0.1049,0.1532,0.9826,0,0.154,0.9881,-0.1049,0.1532,0.9826,0,0.154,0.9881,-0.1049,0.1532,0.9826,-0.1049,0.1532,0.9826,0,0.154,0.9881,0,0.154,0.9881,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0.2949,0.9343,0.2004,0.3778,0.891,0.2518,0.2483,0.9534,0.1714,0.2483,0.9534,0.1714,0.3778,0.891,0.2519,0.3778,0.891,0.2519,-0.2949,0.9343,0.2004,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2518,-0.3778,0.891,0.2519,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2519,-0.2949,0.9343,0.2004,-0.1369,0.9853,0.1018,-0.2483,0.9534,0.1714,-0.2483,0.9534,0.1714,-0.1368,0.9854,0.1018,-0.1368,0.9854,0.1018,0.3778,0.9237,-0.0644,0.3778,0.9237,-0.0644,0.3778,0.9237,-0.0644,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9236,-0.0643,0.3778,0.9237,-0.0643,0.3778,0.9237,-0.0643,0.3778,0.9237,-0.0643,-0.2949,0.9343,0.2004,-0.1369,0.9853,0.1018,-0.2483,0.9534,0.1714,-0.2483,0.9534,0.1714,-0.1369,0.9853,0.1018,-0.1369,0.9853,0.1018,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9236,-0.0643,-0.3778,0.9237,-0.0643,-0.3778,0.9237,-0.0643,-0.3778,0.9237,-0.0643,0.1369,0.9853,0.1018,0.2949,0.9343,0.2004,0.1369,0.9853,0.1018,0.1369,0.9853,0.1018,0.2949,0.9343,0.2004,0.2483,0.9534,0.1714,0.2949,0.9343,0.2004,0.3778,0.891,0.2518,0.2483,0.9534,0.1714,0.2483,0.9534,0.1714,0.3778,0.891,0.2519,0.3778,0.891,0.2519,-0.2949,0.9343,0.2004,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2518,-0.3778,0.891,0.2518,-0.2483,0.9534,0.1714,-0.3778,0.891,0.2518,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,0,-0.1028,0.9947,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,0,0.1028,-0.9947,-0.9767,0.0192,-0.2135,-0.6906,0.7071,-0.1516,-0.8982,0.0394,-0.4378,-0.8982,0.0394,-0.4378,-0.6906,0.7071,-0.1516,-0.6351,0.672,-0.3809,-0.7001,0.6847,0.2023,-0.9901,-0.0125,0.1396,-0.6774,0.6489,0.3464,-0.6774,0.6489,0.3464,-0.9901,-0.0125,0.1396,-0.958,-0.0257,0.2857,-0.9768,0.0192,-0.2135,-0.9901,-0.0125,0.1396,-0.6906,0.7071,-0.1516,-0.6906,0.7071,-0.1516,-0.9901,-0.0125,0.1396,-0.7001,0.6848,0.2023,0.9768,0.0192,-0.2135,0.9901,-0.0125,0.1396,0.7747,-0.5356,-0.3362,0.7747,-0.5356,-0.3362,0.9901,-0.0125,0.1396,0.7891,-0.5996,0.1335,-0.6906,0.7071,-0.1516,-0.7001,0.6847,0.2023,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7001,0.6847,0.2023,-0.3794,0.9008,0.2112,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3439,-0.9286,-0.1391,0.3819,-0.9123,-0.1481,0.2333,-0.9659,-0.1126,0.2333,-0.9659,-0.1126,0.3819,-0.9123,-0.1481,0.3819,-0.9123,-0.1481,0.3827,0.9202,0.0828,0.3794,0.9008,0.2112,0.6906,0.7071,-0.1516,0.6906,0.7071,-0.1516,0.3794,0.9008,0.2112,0.7001,0.6847,0.2023,-0.7747,-0.5356,-0.3362,-0.7891,-0.5996,0.1335,-0.9768,0.0192,-0.2135,-0.9767,0.0192,-0.2135,-0.7891,-0.5996,0.1335,-0.9901,-0.0125,0.1396,0.6906,0.7071,-0.1516,0.7001,0.6847,0.2024,0.9768,0.0192,-0.2135,0.9768,0.0192,-0.2135,0.7001,0.6848,0.2023,0.9901,-0.0125,0.1396,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0.7891,-0.5996,0.1335,0.9901,-0.0125,0.1396,0.6774,-0.7004,0.225,0.6774,-0.7004,0.225,0.9901,-0.0125,0.1396,0.958,-0.0257,0.2857,-0.3794,0.9008,0.2112,-0.7001,0.6848,0.2023,-0.3688,0.8629,0.3454,-0.3688,0.8629,0.3454,-0.7001,0.6848,0.2023,-0.6774,0.6489,0.3464,0.3688,-0.9108,0.1857,0.7891,-0.5996,0.1335,0.3688,-0.9108,0.1857,0.3688,-0.9108,0.1857,0.7891,-0.5996,0.1335,0.6774,-0.7004,0.225,-0.7891,-0.5996,0.1335,-0.3688,-0.9108,0.1857,-0.6774,-0.7004,0.225,-0.6774,-0.7004,0.225,-0.3688,-0.9108,0.1857,-0.3688,-0.9108,0.1857,0.7002,0.6847,0.2023,0.3794,0.9008,0.2112,0.6774,0.6489,0.3464,0.6774,0.6489,0.3464,0.3794,0.9008,0.2112,0.3688,0.8629,0.3454,-0.9901,-0.0125,0.1396,-0.7891,-0.5996,0.1335,-0.958,-0.0257,0.2857,-0.958,-0.0257,0.2857,-0.7891,-0.5996,0.1335,-0.6774,-0.7004,0.225,0.9901,-0.0125,0.1396,0.7001,0.6847,0.2023,0.958,-0.0257,0.2857,0.958,-0.0257,0.2857,0.7001,0.6847,0.2023,0.6774,0.6489,0.3464,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0.9767,0.0192,-0.2135,0.7747,-0.5356,-0.3362,0.8982,0.0394,-0.4378,0.8982,0.0394,-0.4378,0.7747,-0.5356,-0.3362,0.6351,-0.5931,-0.4948,-0.6906,0.7071,-0.1516,-0.3487,0.8753,-0.3349,-0.6351,0.672,-0.3809,-0.6351,0.672,-0.3809,-0.3487,0.8754,-0.3349,-0.3487,0.8754,-0.3349,0.7747,-0.5356,-0.3362,0.3487,-0.8015,-0.4859,0.6351,-0.5931,-0.4948,0.6351,-0.5931,-0.4948,0.3487,-0.8015,-0.4859,0.3487,-0.8015,-0.4859,-0.3487,-0.8015,-0.4859,-0.7747,-0.5356,-0.3362,-0.3487,-0.8015,-0.4859,-0.3487,-0.8015,-0.4859,-0.7747,-0.5356,-0.3362,-0.6351,-0.5931,-0.4948,0.3487,0.8754,-0.3349,0.6906,0.7071,-0.1516,0.3487,0.8754,-0.3349,0.3487,0.8753,-0.3349,0.6906,0.7071,-0.1516,0.6351,0.672,-0.3809,-0.7747,-0.5356,-0.3362,-0.9767,0.0192,-0.2135,-0.6351,-0.5931,-0.4948,-0.6351,-0.5931,-0.4948,-0.9767,0.0192,-0.2135,-0.8982,0.0394,-0.4378,0.6906,0.7071,-0.1516,0.9768,0.0192,-0.2135,0.6351,0.672,-0.3809,0.6351,0.672,-0.3809,0.9768,0.0192,-0.2135,0.8982,0.0394,-0.4378,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,-0.3739,0.9182,-0.131,-0.3739,0.9182,-0.131,-0.6882,0.706,-0.1668,-0.6882,0.7061,-0.1668,-0.3739,0.9182,-0.131,-0.6882,0.7061,-0.1668,0.3739,-0.88,-0.2929,0.3739,-0.88,-0.2929,0.6882,-0.6649,-0.2902,0.6882,-0.6649,-0.2902,0.3739,-0.88,-0.2929,0.6882,-0.6649,-0.2902,-0.6882,-0.6649,-0.2902,-0.6882,-0.6649,-0.2902,-0.3739,-0.88,-0.2929,-0.3739,-0.88,-0.2929,-0.6882,-0.6649,-0.2902,-0.3739,-0.88,-0.2929,0.6882,0.7061,-0.1668,0.6882,0.706,-0.1668,0.3739,0.9182,-0.131,0.3739,0.9182,-0.131,0.6882,0.7061,-0.1668,0.3739,0.9182,-0.131,-0.9733,0.0206,-0.2285,-0.9733,0.0206,-0.2285,-0.6882,-0.6649,-0.2902,-0.6882,-0.6649,-0.2902,-0.9733,0.0206,-0.2285,-0.6882,-0.6649,-0.2902,0.9733,0.0206,-0.2285,0.9733,0.0206,-0.2285,0.6883,0.706,-0.1668,0.6882,0.706,-0.1668,0.9733,0.0206,-0.2285,0.6883,0.706,-0.1668,-0.6883,0.706,-0.1668,-0.6882,0.706,-0.1668,-0.9733,0.0206,-0.2285,-0.9733,0.0206,-0.2285,-0.6883,0.706,-0.1668,-0.9733,0.0206,-0.2285,0.6882,-0.6649,-0.2902,0.6882,-0.6649,-0.2902,0.9733,0.0206,-0.2285,0.9733,0.0206,-0.2285,0.6882,-0.6649,-0.2902,0.9733,0.0206,-0.2285,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,-0.3813,0.9094,0.1662,-0.3813,0.9094,0.1662,-0.7042,0.6932,0.1536,-0.7042,0.6932,0.1536,-0.3813,0.9094,0.1661,-0.7042,0.6932,0.1536,0.3813,-0.9244,0.0011,0.3813,-0.9244,0.0011,0.7042,-0.7095,0.0273,0.7042,-0.7095,0.0273,0.3813,-0.9244,0.0011,0.7042,-0.7095,0.0273,-0.7042,-0.7095,0.0273,-0.7042,-0.7095,0.0273,-0.3813,-0.9244,0.0011,-0.3813,-0.9244,0.0011,-0.7042,-0.7095,0.0273,-0.3813,-0.9244,0.0011,0.7042,0.6932,0.1536,0.7042,0.6932,0.1536,0.3813,0.9094,0.1661,0.3813,0.9094,0.1661,0.7042,0.6932,0.1536,0.3813,0.9094,0.1661,-0.9959,-0.0081,0.0904,-0.9959,-0.0081,0.0904,-0.7042,-0.7095,0.0273,-0.7042,-0.7095,0.0273,-0.9959,-0.0081,0.0904,-0.7042,-0.7095,0.0273,0.9959,-0.0081,0.0904,0.9959,-0.0081,0.0904,0.7042,0.6932,0.1536,0.7042,0.6932,0.1536,0.9959,-0.0081,0.0904,0.7042,0.6932,0.1536,-0.7042,0.6932,0.1536,-0.7042,0.6932,0.1536,-0.9959,-0.0081,0.0904,-0.9959,-0.0081,0.0904,-0.7042,0.6932,0.1536,-0.9959,-0.0081,0.0904,0.7042,-0.7095,0.0273,0.7042,-0.7095,0.0273,0.9959,-0.0081,0.0904,0.9959,-0.0081,0.0904,0.7042,-0.7095,0.0273,0.9959,-0.0081,0.0904,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3439,-0.9286,-0.1391,-0.2333,-0.9659,-0.1126,-0.3819,-0.9123,-0.1481,-0.3819,-0.9123,-0.1481,-0.2333,-0.9659,-0.1126,-0.3819,-0.9123,-0.1481,-0.3439,-0.9286,-0.1391,-0.1368,-0.9866,-0.0888,-0.2333,-0.9659,-0.1126,-0.2333,-0.9659,-0.1126,-0.1367,-0.9866,-0.0888,-0.1367,-0.9866,-0.0888,0.1367,-0.9866,-0.0888,0.3439,-0.9286,-0.1391,0.1367,-0.9866,-0.0888,0.1368,-0.9866,-0.0888,0.3439,-0.9286,-0.1391,0.2333,-0.9659,-0.1126,0.1368,-0.9866,-0.0888,0.3439,-0.9286,-0.1391,0.1368,-0.9866,-0.0888,0.1368,-0.9866,-0.0888,0.3439,-0.9286,-0.1391,0.2333,-0.9659,-0.1126,-0.3439,-0.9286,-0.1391,-0.2333,-0.9659,-0.1126,-0.3819,-0.9123,-0.1481,-0.3819,-0.9123,-0.1481,-0.2333,-0.9659,-0.1126,-0.3819,-0.9123,-0.1481,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3819,-0.9241,-0.0172,0.3818,-0.9241,-0.0172,0.3818,-0.9241,-0.0172,0.3818,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3819,-0.9241,-0.0172,-0.3818,-0.9241,-0.0172,-0.3818,-0.9241,-0.0172,-0.3818,-0.9241,-0.0172,-0.3439,-0.9286,-0.1391,-0.1368,-0.9866,-0.0888,-0.2333,-0.9659,-0.1126,-0.2333,-0.9659,-0.1126,-0.1368,-0.9866,-0.0888,-0.1368,-0.9866,-0.0888,0.3439,-0.9286,-0.1391,0.3819,-0.9123,-0.1481,0.2333,-0.9659,-0.1126,0.2333,-0.9659,-0.1126,0.3819,-0.9123,-0.1481,0.3819,-0.9123,-0.1481,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,-0.0001,0.0897,-0.996,-0.0001,0.0897,-0.996,-0.0001,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0.8313,-0.5535,-0.0498,0.9808,-0.1943,-0.0175,0.8312,-0.5558,-0.0155,0.8312,-0.5558,-0.0155,0.9808,-0.1943,-0.0175,0.9802,-0.197,0.0184,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0,0.996,0.0896,0.037,-0.1164,0.9925,0.0453,-0.0976,0.9942,0.0394,-0.1141,0.9927,0.0394,-0.1141,0.9927,0.0453,-0.0976,0.9942,0.0453,-0.0999,0.994,0.6886,-0.7222,-0.065,0.3827,-0.9202,-0.0828,0.6862,-0.712,-0.1489,0.6862,-0.712,-0.1489,0.3827,-0.9202,-0.0828,0.3813,-0.9095,-0.1654,0.0453,-0.0815,0.9956,0.037,-0.0627,0.9973,0.0453,-0.0792,0.9958,0.0453,-0.0792,0.9958,0.037,-0.0627,0.9973,0.0394,-0.065,0.9971,0.0061,0.1989,0.98,0.008,-0.0444,0.999,0.0255,-0.0512,0.9984,0.0253,-0.0511,0.9984,0.0079,-0.0444,0.999,0.0262,-0.0521,0.9983,-0.0061,0.1989,0.98,-0.0255,-0.0512,0.9984,-0.008,-0.0444,0.999,-0.0253,-0.0511,0.9984,-0.0262,-0.0521,0.9983,-0.0079,-0.0444,0.999,-0.9808,0.1943,0.0175,-0.9147,0.4024,0.0362,-0.9779,0.1994,-0.0624,-0.9779,0.1994,-0.0624,-0.9147,0.4024,0.0362,-0.9116,0.4091,-0.0413,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.4933,0.8663,0.078,-0.4933,0.8663,0.078,-0.3827,0.9202,0.0828,-0.4933,0.8663,0.078,0.9147,0.4024,0.0362,0.9808,0.1943,0.0175,0.9116,0.4091,-0.0413,0.9116,0.4091,-0.0413,0.9808,0.1943,0.0175,0.9779,0.1994,-0.0624,0.9808,0.1943,0.0175,0.9808,0.1943,0.0175,0.7886,0.6124,0.0551,0.7886,0.6124,0.0551,0.9808,0.1943,0.0175,0.7886,0.6124,0.0551,-0.0061,-0.3707,0.9287,-0.008,-0.1346,0.9909,-0.0255,-0.1279,0.9915,-0.0252,-0.128,0.9915,-0.0078,-0.1346,0.9909,-0.0261,-0.1271,0.9916,-0.0453,-0.0976,0.9942,-0.037,-0.1164,0.9925,-0.0453,-0.0999,0.994,-0.0453,-0.0999,0.994,-0.037,-0.1164,0.9925,-0.0394,-0.1141,0.9927,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.4933,-0.8663,-0.078,0.4933,-0.8663,-0.078,0.3827,-0.9202,-0.0828,0.4933,-0.8663,-0.078,0.8313,0.5535,0.0498,0.7068,0.7046,0.0634,0.8312,0.5496,0.084,0.8312,0.5496,0.084,0.7068,0.7046,0.0634,0.7064,0.7013,0.0959,-0.8313,-0.5535,-0.0498,-0.7068,-0.7046,-0.0634,-0.8312,-0.5558,-0.0155,-0.8312,-0.5558,-0.0155,-0.7068,-0.7046,-0.0634,-0.7064,-0.7071,-0.0308,0.0061,-0.3707,0.9287,0.0255,-0.1279,0.9915,0.008,-0.1346,0.9909,0.0252,-0.128,0.9915,0.0262,-0.127,0.9916,0.0078,-0.1346,0.9909,-0.7886,0.6124,0.0551,-0.7886,0.6124,0.0551,-0.9808,0.1943,0.0175,-0.9808,0.1943,0.0175,-0.7886,0.6124,0.0551,-0.9808,0.1943,0.0175,0.7886,-0.6124,-0.0551,0.7886,-0.6124,-0.0551,0.9808,-0.1943,-0.0175,0.9808,-0.1943,-0.0175,0.7886,-0.6124,-0.0551,0.9808,-0.1943,-0.0175,0.4933,0.8663,0.078,0.4933,0.8663,0.078,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,0.4933,0.8663,0.078,0.3827,0.9202,0.0828,-0.037,-0.0627,0.9973,-0.0453,-0.0815,0.9956,-0.0394,-0.065,0.9971,-0.0394,-0.065,0.9971,-0.0453,-0.0815,0.9956,-0.0453,-0.0792,0.9958,-0.9808,-0.1943,-0.0175,-0.9808,-0.1943,-0.0175,-0.7886,-0.6124,-0.0551,-0.7886,-0.6124,-0.0551,-0.9808,-0.1943,-0.0175,-0.7886,-0.6124,-0.0551,-0.4933,-0.8663,-0.078,-0.4933,-0.8663,-0.078,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,-0.4933,-0.8663,-0.078,-0.3827,-0.9202,-0.0828,0.6363,-0.2524,-0.729,0.6176,-0.303,-0.7258,0.472,-0.617,-0.6297,0.472,-0.6169,-0.6297,0.6176,-0.303,-0.7258,0.5168,-0.5387,-0.6653,0.6308,-0.3753,0.6791,0.4704,-0.7172,0.5141,0.6135,-0.4239,0.6662,0.6136,-0.4239,0.6662,0.4704,-0.7172,0.5141,0.5155,-0.6451,0.564,0,-0.734,-0.6791,0,-0.734,-0.6791,0,-0.734,-0.6791,0,-0.734,-0.6791,0,-0.734,-0.6791,0,-0.734,-0.6791,0,-0.8409,0.5412,0.0061,-0.3707,0.9287,0,-0.8409,0.5412,0,-0.8409,0.5412,0.0061,-0.3707,0.9287,-0.0061,-0.3707,0.9287,-0.5168,-0.5387,-0.6653,-0.6176,-0.303,-0.7258,-0.472,-0.6169,-0.6297,-0.472,-0.6169,-0.6297,-0.6176,-0.303,-0.7258,-0.6363,-0.2524,-0.729,-0.6308,-0.3753,0.6791,-0.6135,-0.4239,0.6662,-0.4705,-0.7172,0.5141,-0.4705,-0.7172,0.5141,-0.6135,-0.424,0.6662,-0.5155,-0.645,0.564,-0.6718,0.1876,-0.7165,-0.6695,0.2123,-0.7118,-0.6719,-0.0566,-0.7385,-0.6718,-0.0566,-0.7385,-0.6695,0.2123,-0.7118,-0.6695,-0.0818,-0.7383,-0.662,-0.2115,0.719,-0.662,0.0797,0.7453,-0.6643,-0.1867,0.7238,-0.6642,-0.1867,0.7238,-0.662,0.0797,0.7453,-0.6642,0.0544,0.7455,0.662,-0.2115,0.719,0.6642,-0.1867,0.7238,0.6621,0.0797,0.7452,0.662,0.0797,0.7452,0.6642,-0.1867,0.7238,0.6642,0.0544,0.7455,0.6695,-0.0818,-0.7382,0.6695,0.2123,-0.7118,0.6718,-0.0566,-0.7385,0.6718,-0.0566,-0.7385,0.6695,0.2123,-0.7118,0.6718,0.1876,-0.7166,0.6308,0.248,0.7352,0.6135,0.2981,0.7312,0.4705,0.6138,0.6339,0.4705,0.6138,0.6339,0.6135,0.2981,0.7312,0.5155,0.5339,0.6702,0.6363,0.3785,-0.6722,0.472,0.7195,-0.5094,0.6176,0.4277,-0.66,0.6176,0.4277,-0.66,0.472,0.7195,-0.5094,0.5168,0.6489,-0.5584,0.0061,0.1989,0.98,0,0.7306,0.6828,-0.0061,0.1989,0.98,-0.0061,0.1989,0.98,0,0.7306,0.6828,0,0.7306,0.6828,0,0.8435,-0.5372,0,0.8435,-0.5372,0,0.8435,-0.5372,0,0.8435,-0.5372,0,0.8435,-0.5372,0,0.8435,-0.5372,-0.5155,0.5339,0.6702,-0.6135,0.2981,0.7312,-0.4705,0.6138,0.6339,-0.4705,0.6138,0.6339,-0.6135,0.2981,0.7312,-0.6308,0.248,0.7352,-0.6364,0.3785,-0.6721,-0.6176,0.4277,-0.66,-0.472,0.7195,-0.5094,-0.472,0.7195,-0.5094,-0.6176,0.4277,-0.66,-0.5168,0.6489,-0.5584,0.6695,-0.0818,-0.7383,0.6718,-0.0566,-0.7385,0.6363,-0.2524,-0.729,0.6363,-0.2524,-0.729,0.6718,-0.0566,-0.7385,0.6176,-0.303,-0.7258,0.662,-0.2115,0.719,0.6308,-0.3753,0.6791,0.6642,-0.1867,0.7238,0.6642,-0.1867,0.7238,0.6308,-0.3753,0.6791,0.6135,-0.4239,0.6662,0.472,-0.6169,-0.6297,0.5168,-0.5387,-0.6653,0.3428,-0.7844,-0.517,0.3428,-0.7844,-0.5169,0.5168,-0.5387,-0.6653,0.3428,-0.7844,-0.5169,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0896,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,-0.472,-0.6169,-0.6297,-0.3428,-0.7844,-0.517,-0.5168,-0.5387,-0.6653,-0.5168,-0.5387,-0.6653,-0.3428,-0.7844,-0.5169,-0.3428,-0.7844,-0.5169,-0.4705,-0.7172,0.5141,-0.5155,-0.645,0.564,-0.3421,-0.8628,0.3722,-0.3421,-0.8628,0.3722,-0.5156,-0.6451,0.564,-0.3421,-0.8628,0.3722,-0.662,-0.2115,0.719,-0.6642,-0.1867,0.7238,-0.6308,-0.3753,0.6791,-0.6308,-0.3753,0.6791,-0.6642,-0.1867,0.7238,-0.6135,-0.4239,0.6662,-0.4933,-0.8663,-0.078,-0.4933,-0.8663,-0.078,-0.7886,-0.6124,-0.055,-0.7886,-0.6124,-0.0551,-0.4933,-0.8663,-0.078,-0.7886,-0.6124,-0.0551,-0.9808,0.1943,0.0175,-0.9808,0.1943,0.0175,-0.9808,-0.1943,-0.0175,-0.9808,-0.1943,-0.0175,-0.9808,0.1943,0.0175,-0.9808,-0.1943,-0.0175,-0.6695,-0.0818,-0.7383,-0.6363,-0.2524,-0.7289,-0.6718,-0.0566,-0.7385,-0.6718,-0.0566,-0.7385,-0.6363,-0.2524,-0.7289,-0.6176,-0.303,-0.7258,0.7886,-0.6124,-0.0551,0.7886,-0.6124,-0.0551,0.4933,-0.8664,-0.078,0.4933,-0.8663,-0.078,0.7886,-0.6124,-0.0551,0.4933,-0.8663,-0.078,0.4704,-0.7172,0.5141,0.3421,-0.8628,0.3722,0.5155,-0.645,0.564,0.5156,-0.6451,0.564,0.3421,-0.8628,0.3722,0.3421,-0.8628,0.3722,0.9808,0.1943,0.0175,0.9808,0.1943,0.0175,0.9808,-0.1943,-0.0175,0.9808,-0.1943,-0.0175,0.9808,0.1943,0.0175,0.9808,-0.1943,-0.0175,0.662,0.0797,0.7452,0.6642,0.0544,0.7455,0.6308,0.248,0.7352,0.6308,0.248,0.7352,0.6642,0.0544,0.7455,0.6135,0.2981,0.7312,0.6695,0.2123,-0.7118,0.6363,0.3785,-0.6721,0.6718,0.1876,-0.7165,0.6718,0.1876,-0.7165,0.6364,0.3785,-0.6721,0.6176,0.4277,-0.66,0.4933,0.8663,0.078,0.4933,0.8663,0.078,0.7886,0.6124,0.0551,0.7886,0.6124,0.0551,0.4933,0.8663,0.078,0.7886,0.6124,0.0551,0.4705,0.6138,0.6339,0.5155,0.534,0.6702,0.3421,0.7825,0.5203,0.3421,0.7824,0.5204,0.5155,0.5339,0.6702,0.3421,0.7824,0.5204,0.472,0.7195,-0.5094,0.3428,0.8641,-0.3685,0.5168,0.6489,-0.5584,0.5168,0.6489,-0.5584,0.3428,0.8641,-0.3686,0.3428,0.8641,-0.3686,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,-0.4705,0.6138,0.6339,-0.3421,0.7825,0.5203,-0.5155,0.534,0.6702,-0.5155,0.5339,0.6702,-0.3421,0.7824,0.5204,-0.3421,0.7824,0.5204,-0.472,0.7195,-0.5094,-0.5168,0.6489,-0.5584,-0.3428,0.8641,-0.3685,-0.3428,0.8641,-0.3686,-0.5168,0.6489,-0.5584,-0.3428,0.8641,-0.3686,-0.7886,0.6124,0.0551,-0.7886,0.6124,0.0551,-0.4933,0.8663,0.078,-0.4933,0.8664,0.078,-0.7886,0.6124,0.0551,-0.4933,0.8664,0.078,-0.662,0.0797,0.7453,-0.6308,0.248,0.7352,-0.6642,0.0544,0.7455,-0.6642,0.0544,0.7455,-0.6308,0.248,0.7352,-0.6135,0.2981,0.7312,-0.6695,0.2123,-0.7118,-0.6718,0.1876,-0.7165,-0.6363,0.3785,-0.6721,-0.6364,0.3785,-0.6722,-0.6718,0.1876,-0.7165,-0.6176,0.4277,-0.66,-0.3826,-0.9202,-0.0828,-0.3826,-0.9202,-0.0828,-0.3823,-0.9165,-0.1175,-0.3823,-0.9165,-0.1175,-0.3826,-0.9202,-0.0828,-0.3823,-0.9166,-0.1173,0.3828,0.9201,0.0828,0.3828,0.9201,0.0828,0.3824,0.9227,0.0481,0.3824,0.9227,0.0481,0.3827,0.9202,0.0828,0.3824,0.9227,0.0482,0.0453,-0.0999,0.994,0.0453,-0.0976,0.9942,0.0453,-0.0792,0.9958,0.0453,-0.0792,0.9958,0.0453,-0.0976,0.9942,0.0453,-0.0815,0.9956,0.0255,-0.0512,0.9984,0.0263,-0.052,0.9983,0.037,-0.0627,0.9973,0.037,-0.0627,0.9973,0.0263,-0.052,0.9983,0.0394,-0.065,0.9971,-0.0255,-0.0512,0.9984,-0.037,-0.0627,0.9973,-0.0263,-0.052,0.9983,-0.0263,-0.052,0.9983,-0.037,-0.0627,0.9973,-0.0394,-0.065,0.9971,-0.0453,-0.0976,0.9942,-0.0453,-0.0999,0.994,-0.0453,-0.0815,0.9956,-0.0453,-0.0815,0.9956,-0.0453,-0.0999,0.994,-0.0453,-0.0792,0.9958,-0.6886,-0.7222,-0.065,-0.9147,-0.4024,-0.0362,-0.6862,-0.712,-0.1489,-0.6861,-0.7121,-0.1489,-0.9147,-0.4024,-0.0362,-0.9116,-0.3951,-0.1137,-0.9147,-0.4024,-0.0362,-0.9808,-0.1943,-0.0175,-0.9116,-0.3951,-0.1137,-0.9116,-0.3951,-0.1137,-0.9808,-0.1943,-0.0175,-0.9779,-0.1851,-0.097,0.9808,-0.1943,-0.0175,0.9147,-0.4024,-0.0362,0.9779,-0.1851,-0.097,0.9779,-0.1851,-0.097,0.9148,-0.4024,-0.0362,0.9116,-0.3951,-0.1137,0,0.996,0.0897,0,0.996,0.0897,0,0.9927,0.1203,0,0.9927,0.1203,0,0.996,0.0897,0,0.9927,0.1203,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.9983,-0.0589,0,-0.9983,-0.0589,0,-0.996,-0.0897,0,-0.9983,-0.0589,-0.0061,0.1989,0.98,-0.008,-0.0444,0.999,0.0061,0.1989,0.98,0.0061,0.1989,0.98,-0.008,-0.0444,0.999,0.008,-0.0444,0.999,0.0255,-0.1279,0.9915,0.037,-0.1164,0.9925,0.0263,-0.1271,0.9915,0.0263,-0.1271,0.9915,0.037,-0.1164,0.9925,0.0394,-0.1141,0.9927,-0.0255,-0.1279,0.9915,-0.0263,-0.1271,0.9915,-0.037,-0.1164,0.9925,-0.037,-0.1164,0.9925,-0.0263,-0.1271,0.9915,-0.0394,-0.1141,0.9927,-0.7068,0.7046,0.0634,-0.8313,0.5535,0.0498,-0.7064,0.7013,0.0959,-0.7064,0.7013,0.0959,-0.8313,0.5535,0.0498,-0.8312,0.5496,0.084,0.0061,-0.3707,0.9287,0.008,-0.1346,0.9909,-0.0061,-0.3707,0.9287,-0.0061,-0.3707,0.9287,0.008,-0.1346,0.9909,-0.008,-0.1346,0.9909,-0.9808,0.1943,0.0175,-0.9808,-0.1943,-0.0175,-0.9802,0.1905,0.0533,-0.9802,0.1905,0.0533,-0.9808,-0.1943,-0.0175,-0.9802,-0.197,0.0184,-0.9802,-0.197,0.0184,-0.8312,-0.5558,-0.0155,-0.9781,-0.2011,0.0544,-0.9781,-0.2011,0.0544,-0.8312,-0.5558,-0.0155,-0.8288,-0.5593,0.0181,-0.3824,-0.9165,-0.1175,-0.3824,-0.9165,-0.1173,-0.3817,-0.9117,-0.1519,-0.3816,-0.9118,-0.1519,-0.3822,-0.9166,-0.1173,-0.3816,-0.9118,-0.1519,0.9779,-0.1851,-0.097,0.9116,-0.3951,-0.1137,0.9674,-0.1803,-0.1779,0.9674,-0.1803,-0.1779,0.9116,-0.3951,-0.1137,0.9035,-0.3845,-0.1895,-0.6861,0.7272,-0.0194,-0.3813,0.9244,-0.0004,-0.684,0.7214,-0.1083,-0.684,0.7214,-0.1083,-0.3813,0.9244,-0.0004,-0.3773,0.9221,-0.0855,0.3823,-0.9166,-0.1174,0.3823,-0.9165,-0.1175,0.3818,-0.9117,-0.1519,0.3818,-0.9117,-0.1519,0.3824,-0.9165,-0.1175,0.3818,-0.9117,-0.1519,-0.3824,0.9227,0.0482,-0.3824,0.9227,0.0481,-0.3816,0.9242,0.0134,-0.3818,0.9242,0.0133,-0.3824,0.9227,0.0481,-0.3818,0.9242,0.0133,0.6861,0.7272,-0.0194,0.684,0.7214,-0.1083,0.3813,0.9244,-0.0004,0.3813,0.9244,-0.0004,0.684,0.7214,-0.1083,0.3773,0.9221,-0.0855,0.9779,0.1994,-0.0624,0.9779,-0.1851,-0.097,0.9674,0.2092,-0.1428,0.9674,0.2092,-0.1428,0.9779,-0.1851,-0.097,0.9674,-0.1803,-0.1779,-0.9802,0.1905,0.0533,-0.9802,-0.197,0.0184,-0.9781,0.1881,0.0894,-0.9781,0.1881,0.0894,-0.9802,-0.197,0.0184,-0.9782,-0.2009,0.053,-0.6862,-0.7121,-0.1489,-0.684,-0.6905,-0.2355,-0.3813,-0.9095,-0.1654,-0.3813,-0.9095,-0.1654,-0.684,-0.6905,-0.2355,-0.3773,-0.892,-0.2488,0.9802,0.1905,0.0533,0.8312,0.5496,0.084,0.9781,0.1881,0.0894,0.9781,0.1881,0.0894,0.8312,0.5496,0.084,0.8288,0.5471,0.1177,0.7064,-0.7071,-0.0308,0.8312,-0.5558,-0.0155,0.7053,-0.7089,0.0022,0.7052,-0.709,0.0022,0.8312,-0.5558,-0.0155,0.8287,-0.5594,0.0189,0.6862,-0.712,-0.1489,0.6839,-0.6905,-0.2355,0.9116,-0.3951,-0.1137,0.9116,-0.3951,-0.1137,0.684,-0.6905,-0.2355,0.9034,-0.3845,-0.1895,0.6862,-0.7121,-0.1489,0.3813,-0.9095,-0.1654,0.684,-0.6905,-0.2355,0.684,-0.6905,-0.2355,0.3813,-0.9095,-0.1654,0.3773,-0.892,-0.2489,0,0.9968,-0.0798,0,0.9968,-0.0798,0,0.9968,-0.0798,0,0.9968,-0.0798,0,0.9968,-0.0798,0,0.9968,-0.0798,-0.9779,0.1994,-0.0624,-0.9116,0.4091,-0.0413,-0.9674,0.2092,-0.1428,-0.9674,0.2092,-0.1428,-0.9116,0.4091,-0.0413,-0.9035,0.4122,-0.1177,-0.9808,-0.1943,-0.0175,-0.8314,-0.5535,-0.0498,-0.9802,-0.197,0.0184,-0.9802,-0.197,0.0184,-0.8313,-0.5535,-0.0498,-0.8312,-0.5558,-0.0155,-0.3827,-0.9202,-0.0828,-0.6886,-0.7222,-0.065,-0.3813,-0.9095,-0.1654,-0.3813,-0.9095,-0.1654,-0.6886,-0.7222,-0.065,-0.6862,-0.712,-0.1489,0.6886,-0.7222,-0.065,0.6862,-0.712,-0.1489,0.9147,-0.4024,-0.0362,0.9147,-0.4024,-0.0362,0.6861,-0.7121,-0.1489,0.9116,-0.3951,-0.1137,-0.3827,0.9201,0.0828,-0.3827,0.9201,0.0828,-0.3824,0.9227,0.0482,-0.3824,0.9227,0.0482,-0.3826,0.9202,0.0828,-0.3824,0.9227,0.0481,0.9808,0.1943,0.0175,0.8313,0.5535,0.0498,0.9802,0.1905,0.0533,0.9802,0.1905,0.0533,0.8313,0.5535,0.0498,0.8312,0.5496,0.084,0.7068,-0.7046,-0.0634,0.8313,-0.5535,-0.0498,0.7064,-0.7071,-0.0308,0.7064,-0.7071,-0.0308,0.8313,-0.5535,-0.0498,0.8312,-0.5558,-0.0155,-0.6886,0.7222,0.065,-0.6861,0.7272,-0.0194,-0.9147,0.4024,0.0362,-0.9147,0.4024,0.0362,-0.6861,0.7272,-0.0194,-0.9116,0.4091,-0.0413,0.9808,0.1943,0.0175,0.9808,-0.1943,-0.0175,0.9779,0.1994,-0.0624,0.9779,0.1994,-0.0624,0.9808,-0.1943,-0.0175,0.9779,-0.1851,-0.097,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.3823,-0.9165,-0.1174,0.3823,-0.9165,-0.1174,0.3826,-0.9202,-0.0828,0.3823,-0.9165,-0.1175,0.9808,-0.1943,-0.0175,0.9808,0.1943,0.0175,0.9802,-0.197,0.0184,0.9802,-0.197,0.0184,0.9808,0.1943,0.0175,0.9802,0.1905,0.0533,-0.6886,0.7222,0.065,-0.3827,0.9202,0.0828,-0.6861,0.7272,-0.0194,-0.6861,0.7272,-0.0194,-0.3827,0.9202,0.0828,-0.3813,0.9244,-0.0004,0.3827,0.9202,0.0828,0.6886,0.7222,0.065,0.3813,0.9244,-0.0004,0.3813,0.9244,-0.0004,0.6886,0.7222,0.065,0.6861,0.7272,-0.0194,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.9849,-0.1729,0,-0.9849,-0.1729,0,-0.996,-0.0897,0,-0.9849,-0.1729,-0.9808,-0.1943,-0.0175,-0.9808,0.1943,0.0175,-0.9779,-0.1851,-0.097,-0.9779,-0.1851,-0.097,-0.9808,0.1943,0.0175,-0.9779,0.1994,-0.0624,0.6886,0.7222,0.065,0.9147,0.4024,0.0362,0.6861,0.7272,-0.0194,0.6861,0.7272,-0.0194,0.9147,0.4024,0.0362,0.9116,0.4091,-0.0413,-0.8313,0.5535,0.0498,-0.9808,0.1943,0.0175,-0.8312,0.5496,0.084,-0.8312,0.5496,0.084,-0.9808,0.1943,0.0175,-0.9802,0.1905,0.0533,-0.0518,0.0519,-0.9973,-0.0633,0.0783,-0.9949,-0.055,0.0551,-0.997,-0.055,0.0551,-0.997,-0.0633,0.0783,-0.9949,-0.0633,0.075,-0.9952,-0.0112,0.0264,-0.9996,-0.0356,0.0358,-0.9987,-0.0112,0.0264,-0.9996,-0.0361,0.0359,-0.9987,-0.037,0.0367,-0.9986,-0.0116,0.0264,-0.9996,0.0356,0.0358,-0.9987,0.0112,0.0264,-0.9996,0.0368,0.0369,-0.9986,0.0111,0.0264,-0.9996,0.0112,0.0264,-0.9996,0.0368,0.037,-0.9986,-0.0633,0.1007,-0.9929,-0.0518,0.127,-0.9905,-0.0633,0.1039,-0.9926,-0.0633,0.1039,-0.9926,-0.0518,0.127,-0.9905,-0.055,0.1238,-0.9908,0.0518,0.127,-0.9905,0.0633,0.1007,-0.9929,0.055,0.1238,-0.9908,0.055,0.1238,-0.9908,0.0633,0.1007,-0.9929,0.0633,0.104,-0.9926,0.0112,0.1525,-0.9882,0.0356,0.1431,-0.9891,0.0112,0.1525,-0.9882,0.0356,0.1431,-0.9891,0.0368,0.142,-0.9892,0.0112,0.1525,-0.9882,-0.0356,0.1431,-0.9891,-0.0112,0.1525,-0.9882,-0.0368,0.142,-0.9892,-0.0108,0.1525,-0.9882,-0.011,0.1525,-0.9882,-0.0364,0.1419,-0.9892,-0.0112,0.1525,-0.9882,-0.0112,0.1525,-0.9882,0.0112,0.1525,-0.9882,0.0112,0.1525,-0.9882,-0.0112,0.1525,-0.9882,0.0112,0.1525,-0.9882,0.055,0.1238,-0.9908,0.0368,0.142,-0.9892,0.0518,0.127,-0.9905,0.0518,0.127,-0.9905,0.0368,0.142,-0.9892,0.0356,0.1431,-0.9891,0.0112,0.0264,-0.9996,0.0112,0.0264,-0.9996,-0.0112,0.0264,-0.9996,-0.0112,0.0264,-0.9996,0.0112,0.0264,-0.9996,-0.0112,0.0264,-0.9996,-0.055,0.0551,-0.997,-0.0368,0.0369,-0.9986,-0.0518,0.0519,-0.9973,-0.0518,0.0519,-0.9973,-0.0368,0.0369,-0.9986,-0.0356,0.0358,-0.9987,-0.0633,0.1007,-0.9929,-0.0633,0.1039,-0.9926,-0.0633,0.0783,-0.9949,-0.0633,0.0783,-0.9949,-0.0633,0.1039,-0.9926,-0.0633,0.075,-0.9952,0.055,0.0551,-0.997,0.0518,0.0519,-0.9973,0.0368,0.0369,-0.9986,0.0368,0.0369,-0.9986,0.0518,0.0519,-0.9973,0.0356,0.0358,-0.9987,-0.055,0.1238,-0.9908,-0.0518,0.127,-0.9905,-0.0368,0.142,-0.9892,-0.0368,0.142,-0.9892,-0.0518,0.127,-0.9905,-0.0356,0.1431,-0.9891,0.0633,0.104,-0.9926,0.0633,0.1007,-0.9929,0.0633,0.075,-0.9952,0.0633,0.075,-0.9952,0.0633,0.1007,-0.9929,0.0633,0.0783,-0.9949,0.0633,0.0783,-0.9949,0.0518,0.0519,-0.9973,0.0633,0.075,-0.9952,0.0633,0.075,-0.9952,0.0518,0.0519,-0.9973,0.055,0.0551,-0.997,0.9779,0.1994,-0.0624,0.9674,0.2092,-0.1428,0.9116,0.4091,-0.0413,0.9116,0.4091,-0.0413,0.9674,0.2092,-0.1428,0.9035,0.4122,-0.1177,-0.9779,-0.1851,-0.097,-0.9779,0.1994,-0.0624,-0.9674,-0.1803,-0.1779,-0.9674,-0.1803,-0.1779,-0.9779,0.1994,-0.0624,-0.9674,0.2092,-0.1428,0.3824,0.9227,0.0481,0.3824,0.9227,0.0482,0.3817,0.9242,0.0134,0.3816,0.9242,0.0134,0.3824,0.9227,0.0482,0.3816,0.9242,0.0134,0,0.9927,0.1203,0,0.9927,0.1203,0,0.9885,0.1515,0,0.9885,0.1514,0,0.9927,0.1203,0,0.9885,0.1514,-0.9802,0.1905,0.0533,-0.9781,0.1881,0.0894,-0.8312,0.5496,0.084,-0.8312,0.5496,0.084,-0.9781,0.1881,0.0894,-0.8287,0.547,0.1185,-0.7064,0.7013,0.0959,-0.8312,0.5496,0.084,-0.7052,0.6972,0.1288,-0.7052,0.6972,0.1288,-0.8312,0.5496,0.084,-0.8287,0.547,0.1185,0,-0.9983,-0.0589,0,-0.9983,-0.0589,0,-0.9996,-0.0275,0,-0.9996,-0.0275,0,-0.9983,-0.0589,0,-0.9996,-0.0275,-0.6861,0.7272,-0.0194,-0.684,0.7214,-0.1083,-0.9116,0.4091,-0.0413,-0.9116,0.4091,-0.0413,-0.684,0.7214,-0.1083,-0.9035,0.4122,-0.1177,0,-0.9849,-0.1729,0,-0.9849,-0.1729,0,-0.9665,-0.2565,0,-0.9665,-0.2565,0,-0.9849,-0.1729,0,-0.9665,-0.2565,0.9802,-0.197,0.0184,0.9781,-0.2011,0.0544,0.8312,-0.5558,-0.0155,0.8312,-0.5558,-0.0155,0.9781,-0.2011,0.0544,0.8287,-0.5594,0.0189,0.8312,0.5496,0.084,0.7064,0.7013,0.0959,0.8287,0.547,0.1185,0.8287,0.547,0.1185,0.7064,0.7013,0.0959,0.7052,0.6972,0.1288,-0.9779,-0.1851,-0.097,-0.9674,-0.1803,-0.1779,-0.9116,-0.3951,-0.1137,-0.9116,-0.3951,-0.1137,-0.9674,-0.1803,-0.1779,-0.9035,-0.3845,-0.1895,0.9802,-0.197,0.0184,0.9802,0.1905,0.0533,0.9781,-0.2011,0.0544,0.9781,-0.2011,0.0544,0.9802,0.1905,0.0533,0.9782,0.1882,0.088,-0.6862,-0.712,-0.1489,-0.9116,-0.3951,-0.1137,-0.6839,-0.6905,-0.2355,-0.684,-0.6904,-0.2355,-0.9116,-0.3951,-0.1137,-0.9034,-0.3845,-0.1895,-0.8312,-0.5558,-0.0155,-0.7064,-0.7071,-0.0308,-0.8287,-0.5594,0.0189,-0.8287,-0.5594,0.0189,-0.7064,-0.7071,-0.0308,-0.7052,-0.709,0.0022,0.6861,0.7272,-0.0194,0.9116,0.4091,-0.0413,0.684,0.7214,-0.1083,0.684,0.7214,-0.1083,0.9116,0.4091,-0.0413,0.9034,0.4122,-0.1177,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0896,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.0896,0.996,0,-0.9948,-0.1023,0,-0.9948,-0.1023,0,-0.9948,-0.1023,0,-0.9948,-0.1023,0,-0.9948,-0.1023,0,-0.9948,-0.1023,0.0001,-0.9948,-0.1023,0.0001,-0.9948,-0.1023,0.0001,-0.9948,-0.1023,-0.0001,-0.9948,-0.1023,-0.0001,-0.9948,-0.1023,-0.0001,-0.9948,-0.1023,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0.9808,0.194,0.02,0.9808,0.194,0.02,0.9239,0.3807,0.0392,0.9239,0.3807,0.0392,0.9808,0.194,0.02,0.9239,0.3807,0.0392,0.7071,-0.7034,-0.0723,0.9239,-0.3807,-0.0391,0.7071,-0.7034,-0.0723,0.7071,-0.7034,-0.0723,0.9239,-0.3807,-0.0391,0.9239,-0.3807,-0.0391,0.3778,0.8911,0.2514,0.2483,0.9535,0.171,0.3778,0.8911,0.2514,0.3778,0.8911,0.2514,0.2483,0.9535,0.171,0.2949,0.9344,0.2,0.3827,-0.919,-0.0945,0.7071,-0.7034,-0.0723,0.3827,-0.919,-0.0945,0.3827,-0.919,-0.0945,0.7071,-0.7034,-0.0723,0.7071,-0.7034,-0.0723,-0.7071,-0.7034,-0.0723,-0.3827,-0.919,-0.0945,-0.7071,-0.7034,-0.0723,-0.7071,-0.7034,-0.0723,-0.3827,-0.919,-0.0945,-0.3827,-0.919,-0.0945,-0.1368,0.9854,0.1013,-0.1368,0.9854,0.1013,-0.2949,0.9343,0.2,-0.2949,0.9344,0.2,-0.1368,0.9854,0.1013,-0.2483,0.9535,0.171,-0.9239,-0.3807,-0.0392,-0.7071,-0.7034,-0.0723,-0.9239,-0.3807,-0.0392,-0.9239,-0.3807,-0.0392,-0.7071,-0.7034,-0.0723,-0.7071,-0.7034,-0.0723,-0.9239,0.3807,0.0391,-0.9239,0.3807,0.0391,-0.9808,0.194,0.0199,-0.9808,0.194,0.0199,-0.9239,0.3807,0.0391,-0.9808,0.194,0.0199,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,-0.0001,-0.1023,0.9948,-0.0001,-0.1023,0.9948,-0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0.0001,-0.1023,0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0.0001,0.1023,-0.9948,0.0001,0.1023,-0.9948,0.0001,0.1023,-0.9948,0.0001,0.1023,-0.9948,0.0001,0.1023,-0.9948,0.0001,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,-0.9808,0.194,0.0199,-0.9808,0.194,0.0199,-1,0,0,-1,0,0,-0.9808,0.194,0.0198,-1,0,0,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0.9808,0.194,0.02,0.9808,0.194,0.02,1,0,0,1,0,0,0.9808,0.194,0.02,1,0,0,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,-0.1049,0.3504,-0.9307,-0.1049,0.3504,-0.9307,0,0.3523,-0.9359,0,0.3523,-0.9359,-0.105,0.3504,-0.9307,0,0.3523,-0.9359,-0.9881,0.1529,0.0157,-0.9881,0.1529,0.0157,-0.9881,0.1529,0.0157,-0.9881,0.1529,0.0157,-0.9881,0.1529,0.0157,-0.9881,0.1529,0.0157,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.2949,0.9344,0.2,0.2483,0.9535,0.171,0.1368,0.9854,0.1013,0.1368,0.9854,0.1013,0.2483,0.9535,0.171,0.1368,0.9854,0.1013,-0.2949,0.9344,0.2,-0.2483,0.9535,0.171,-0.3778,0.8911,0.2514,-0.3778,0.8911,0.2514,-0.2483,0.9535,0.171,-0.3778,0.8911,0.2514,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.1369,0.9854,0.1013,-0.1369,0.9854,0.1013,-0.2949,0.9344,0.2,-0.2949,0.9344,0.2,-0.1368,0.9854,0.1013,-0.2483,0.9535,0.171,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0,0.3523,-0.9359,0.105,0.3504,-0.9307,0,0.3523,-0.9359,0,0.3523,-0.9359,0.105,0.3504,-0.9307,0.105,0.3504,-0.9307,0.9881,0.1529,0.0157,0.9881,0.1529,0.0157,0.9881,0.1529,0.0157,0.9881,0.1529,0.0157,0.9881,0.1529,0.0157,0.9881,0.1529,0.0157,0,0.1545,0.988,-0.1049,0.1537,0.9825,0,0.1545,0.988,0,0.1545,0.988,-0.1049,0.1537,0.9825,-0.1049,0.1537,0.9825,0.1049,0.1537,0.9825,0.1049,0.1537,0.9825,0,0.1545,0.988,0,0.1545,0.988,0.1049,0.1537,0.9825,0,0.1545,0.988,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-0.2949,0.9344,0.2,-0.2483,0.9535,0.171,-0.3778,0.8911,0.2514,-0.3778,0.8911,0.2514,-0.2483,0.9535,0.171,-0.3778,0.8911,0.2514,0.3778,0.8911,0.2514,0.2483,0.9535,0.171,0.3778,0.8911,0.2514,0.3778,0.8911,0.2514,0.2483,0.9535,0.171,0.2949,0.9344,0.2,0.2949,0.9344,0.2,0.2483,0.9535,0.171,0.1368,0.9854,0.1013,0.1369,0.9854,0.1013,0.2483,0.9535,0.171,0.1369,0.9854,0.1013,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,-0.3778,0.9236,-0.0648,0.2949,0.9344,0.2,0.2483,0.9535,0.1709,0.1369,0.9854,0.1013,0.1367,0.9854,0.1013,0.2483,0.9535,0.1709,0.1367,0.9854,0.1013,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,0.3778,0.9236,-0.0648,-0.1368,0.9854,0.1013,-0.1368,0.9854,0.1013,-0.2949,0.9344,0.2,-0.2949,0.9344,0.2,-0.1368,0.9854,0.1013,-0.2483,0.9535,0.1709,-0.2949,0.9344,0.2,-0.2483,0.9535,0.1709,-0.3778,0.8911,0.2514,-0.3778,0.8911,0.2514,-0.2483,0.9535,0.1709,-0.3778,0.8911,0.2514,0.3778,0.8911,0.2514,0.2483,0.9535,0.1709,0.3778,0.8911,0.2514,0.3778,0.8911,0.2514,0.2483,0.9535,0.1709,0.2949,0.9344,0.2,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,0.9948,0.1023,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,0,-0.1023,0.9948,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0,0.1023,-0.9948,0.9768,0.0191,-0.2135,0.8982,0.0392,-0.4379,0.6906,0.707,-0.152,0.6906,0.707,-0.152,0.8982,0.0392,-0.4379,0.6351,0.6718,-0.3812,0.7001,0.6848,0.202,0.6774,0.6491,0.3461,0.9901,-0.0125,0.1396,0.9901,-0.0125,0.1396,0.6774,0.6491,0.3461,0.958,-0.0256,0.2857,0.9768,0.0191,-0.2135,0.6906,0.707,-0.152,0.9901,-0.0125,0.1396,0.9901,-0.0125,0.1396,0.6906,0.7071,-0.152,0.7001,0.6848,0.202,-0.9768,0.0191,-0.2135,-0.7747,-0.5358,-0.3359,-0.9901,-0.0125,0.1396,-0.9901,-0.0125,0.1396,-0.7747,-0.5358,-0.3359,-0.7891,-0.5995,0.1338,0.6906,0.707,-0.152,0.3827,0.9202,0.0824,0.7001,0.6848,0.202,0.7001,0.6849,0.202,0.3827,0.9202,0.0824,0.3794,0.9009,0.2108,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3818,-0.9241,-0.0168,-0.3818,-0.9241,-0.0168,-0.3818,-0.9241,-0.0168,-0.3439,-0.9287,-0.1387,-0.2333,-0.9659,-0.1122,-0.3819,-0.9124,-0.1476,-0.3819,-0.9124,-0.1476,-0.2333,-0.9659,-0.1122,-0.3819,-0.9124,-0.1476,-0.3827,0.9202,0.0824,-0.6906,0.707,-0.152,-0.3794,0.9009,0.2108,-0.3794,0.9009,0.2108,-0.6906,0.7071,-0.152,-0.7001,0.6849,0.202,0.7747,-0.5358,-0.3359,0.9768,0.0191,-0.2135,0.7891,-0.5995,0.1339,0.7891,-0.5995,0.1339,0.9767,0.0191,-0.2135,0.9901,-0.0125,0.1396,-0.6906,0.707,-0.152,-0.9768,0.0191,-0.2135,-0.7001,0.6848,0.202,-0.7001,0.6848,0.202,-0.9768,0.0191,-0.2135,-0.9901,-0.0125,0.1396,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-0.7891,-0.5995,0.1338,-0.6774,-0.7002,0.2253,-0.9901,-0.0125,0.1396,-0.9901,-0.0125,0.1396,-0.6774,-0.7002,0.2253,-0.958,-0.0256,0.2857,0.3794,0.9009,0.2108,0.3688,0.8631,0.345,0.7001,0.6848,0.202,0.7001,0.6848,0.202,0.3688,0.8631,0.345,0.6774,0.6491,0.3461,-0.3688,-0.9107,0.1862,-0.3688,-0.9107,0.1862,-0.7891,-0.5995,0.1338,-0.7891,-0.5995,0.1338,-0.3688,-0.9107,0.1862,-0.6774,-0.7002,0.2253,0.7891,-0.5995,0.1339,0.6774,-0.7002,0.2253,0.3688,-0.9107,0.1862,0.3688,-0.9107,0.1862,0.6774,-0.7002,0.2253,0.3688,-0.9107,0.1862,-0.7001,0.6848,0.202,-0.6774,0.6491,0.3461,-0.3794,0.9009,0.2108,-0.3794,0.9009,0.2108,-0.6774,0.6491,0.3461,-0.3688,0.8631,0.345,0.9901,-0.0125,0.1396,0.958,-0.0256,0.2857,0.7891,-0.5995,0.1339,0.7891,-0.5995,0.1339,0.958,-0.0256,0.2857,0.6774,-0.7002,0.2253,-0.9901,-0.0125,0.1396,-0.958,-0.0256,0.2857,-0.7001,0.6848,0.202,-0.7001,0.6848,0.202,-0.958,-0.0256,0.2857,-0.6774,0.6491,0.3461,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-0.9768,0.0191,-0.2135,-0.8982,0.0392,-0.4379,-0.7747,-0.5358,-0.3359,-0.7747,-0.5358,-0.3359,-0.8982,0.0392,-0.4379,-0.6351,-0.5934,-0.4945,0.6906,0.707,-0.152,0.6351,0.6718,-0.3812,0.3487,0.8752,-0.3354,0.3487,0.8752,-0.3353,0.6351,0.6718,-0.3812,0.3487,0.8752,-0.3353,-0.7747,-0.5358,-0.3359,-0.6351,-0.5934,-0.4945,-0.3487,-0.8017,-0.4855,-0.3487,-0.8017,-0.4855,-0.6351,-0.5934,-0.4945,-0.3487,-0.8017,-0.4855,0.3487,-0.8017,-0.4855,0.3487,-0.8017,-0.4855,0.7747,-0.5358,-0.3359,0.7747,-0.5358,-0.3359,0.3487,-0.8017,-0.4855,0.6351,-0.5934,-0.4945,-0.3487,0.8752,-0.3354,-0.3487,0.8752,-0.3354,-0.6906,0.7071,-0.152,-0.6906,0.7071,-0.152,-0.3487,0.8752,-0.3354,-0.6351,0.6718,-0.3813,0.7747,-0.5358,-0.3359,0.6351,-0.5934,-0.4945,0.9768,0.0191,-0.2135,0.9767,0.0191,-0.2135,0.6351,-0.5934,-0.4945,0.8982,0.0392,-0.4379,-0.6906,0.707,-0.152,-0.6351,0.6718,-0.3813,-0.9767,0.0191,-0.2135,-0.9768,0.0191,-0.2135,-0.6351,0.6718,-0.3813,-0.8982,0.0392,-0.4379,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0.3739,0.9181,-0.1315,0.6882,0.706,-0.1671,0.3739,0.9181,-0.1315,0.3739,0.9181,-0.1315,0.6882,0.706,-0.1671,0.6882,0.706,-0.1671,-0.3739,-0.8801,-0.2925,-0.6882,-0.6651,-0.2899,-0.3739,-0.8801,-0.2925,-0.3739,-0.8801,-0.2925,-0.6882,-0.665,-0.2899,-0.6882,-0.665,-0.2899,0.6882,-0.665,-0.2899,0.3739,-0.8801,-0.2925,0.6882,-0.665,-0.2899,0.6882,-0.665,-0.2899,0.3739,-0.8801,-0.2925,0.3739,-0.8801,-0.2925,-0.6882,0.706,-0.1672,-0.3739,0.9181,-0.1315,-0.6882,0.706,-0.1672,-0.6882,0.706,-0.1672,-0.3739,0.9181,-0.1315,-0.3739,0.9181,-0.1315,0.9733,0.0204,-0.2285,0.6882,-0.665,-0.2899,0.9733,0.0204,-0.2285,0.9733,0.0204,-0.2285,0.6882,-0.665,-0.2899,0.6882,-0.665,-0.2899,-0.9733,0.0204,-0.2286,-0.6882,0.706,-0.1672,-0.9733,0.0204,-0.2286,-0.9733,0.0204,-0.2286,-0.6882,0.706,-0.1672,-0.6882,0.706,-0.1672,0.6882,0.706,-0.1671,0.9733,0.0204,-0.2285,0.6882,0.706,-0.1671,0.6882,0.706,-0.1671,0.9733,0.0204,-0.2285,0.9733,0.0204,-0.2285,-0.6883,-0.665,-0.2899,-0.9733,0.0204,-0.2286,-0.6882,-0.665,-0.2899,-0.6882,-0.665,-0.2899,-0.9733,0.0204,-0.2286,-0.9733,0.0204,-0.2286,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0.3813,0.9095,0.1657,0.7042,0.6933,0.1532,0.3813,0.9095,0.1657,0.3813,0.9095,0.1657,0.7042,0.6933,0.1532,0.7042,0.6933,0.1532,-0.3813,-0.9244,0.0015,-0.7042,-0.7095,0.0276,-0.3813,-0.9244,0.0015,-0.3813,-0.9244,0.0015,-0.7042,-0.7095,0.0276,-0.7042,-0.7095,0.0276,0.7042,-0.7095,0.0276,0.3813,-0.9244,0.0015,0.7042,-0.7095,0.0276,0.7042,-0.7095,0.0276,0.3813,-0.9244,0.0015,0.3813,-0.9244,0.0015,-0.7042,0.6933,0.1532,-0.3813,0.9095,0.1657,-0.7042,0.6933,0.1532,-0.7042,0.6933,0.1532,-0.3813,0.9095,0.1657,-0.3813,0.9095,0.1657,0.9959,-0.0081,0.0904,0.7042,-0.7095,0.0276,0.9959,-0.0081,0.0904,0.9959,-0.0081,0.0904,0.7042,-0.7095,0.0276,0.7042,-0.7095,0.0276,-0.9959,-0.0081,0.0904,-0.7042,0.6933,0.1532,-0.9959,-0.0081,0.0904,-0.9959,-0.0081,0.0904,-0.7042,0.6933,0.1532,-0.7042,0.6933,0.1532,0.7042,0.6933,0.1532,0.9959,-0.0081,0.0904,0.7042,0.6933,0.1532,0.7042,0.6933,0.1532,0.9959,-0.0081,0.0904,0.9959,-0.0081,0.0904,-0.7042,-0.7095,0.0276,-0.9959,-0.0081,0.0904,-0.7042,-0.7095,0.0276,-0.7042,-0.7095,0.0276,-0.9959,-0.0081,0.0904,-0.9959,-0.0081,0.0904,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0.3818,-0.9241,-0.0168,0.3818,-0.9241,-0.0168,0.3818,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3819,-0.9124,-0.1476,0.2333,-0.9659,-0.1121,0.3819,-0.9124,-0.1476,0.3819,-0.9124,-0.1476,0.2333,-0.9659,-0.1121,0.3439,-0.9287,-0.1387,0.3439,-0.9287,-0.1387,0.2333,-0.9659,-0.1121,0.1368,-0.9867,-0.0883,0.1368,-0.9867,-0.0883,0.2333,-0.9659,-0.1121,0.1368,-0.9867,-0.0883,-0.1368,-0.9867,-0.0883,-0.1368,-0.9867,-0.0883,-0.3439,-0.9287,-0.1387,-0.3439,-0.9287,-0.1387,-0.1368,-0.9867,-0.0883,-0.2333,-0.9659,-0.1122,-0.1368,-0.9867,-0.0883,-0.1368,-0.9867,-0.0883,-0.3439,-0.9287,-0.1387,-0.3439,-0.9287,-0.1387,-0.1368,-0.9867,-0.0883,-0.2334,-0.9659,-0.1122,0.3819,-0.9124,-0.1476,0.2334,-0.9659,-0.1121,0.3819,-0.9124,-0.1476,0.3819,-0.9124,-0.1476,0.2334,-0.9659,-0.1121,0.3439,-0.9287,-0.1387,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,-0.3819,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3819,-0.9241,-0.0168,0.3818,-0.9241,-0.0168,0.3818,-0.9241,-0.0168,0.3818,-0.9241,-0.0168,0.3439,-0.9287,-0.1387,0.2334,-0.9659,-0.1121,0.1367,-0.9867,-0.0883,0.1368,-0.9867,-0.0883,0.2334,-0.9659,-0.1121,0.1368,-0.9867,-0.0883,-0.3439,-0.9287,-0.1387,-0.2334,-0.9659,-0.1122,-0.3819,-0.9124,-0.1476,-0.3819,-0.9124,-0.1476,-0.2334,-0.9659,-0.1122,-0.3819,-0.9124,-0.1476,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-0.8313,-0.5536,-0.0495,-0.8312,-0.5558,-0.0152,-0.9808,-0.1943,-0.0174,-0.9808,-0.1943,-0.0174,-0.8312,-0.5558,-0.0152,-0.9802,-0.197,0.0185,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,-0.037,-0.1159,0.9926,-0.0394,-0.1136,0.9927,-0.0453,-0.0971,0.9942,-0.0453,-0.0971,0.9942,-0.0394,-0.1136,0.9927,-0.0453,-0.0994,0.994,-0.6886,-0.7222,-0.0646,-0.6861,-0.7121,-0.1486,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.6861,-0.7121,-0.1486,-0.3813,-0.9096,-0.165,-0.0453,-0.0811,0.9957,-0.0453,-0.0787,0.9959,-0.037,-0.0622,0.9974,-0.037,-0.0622,0.9974,-0.0453,-0.0787,0.9959,-0.0394,-0.0645,0.9971,-0.0061,0.1994,0.9799,-0.0255,-0.0507,0.9984,-0.008,-0.0439,0.999,-0.0251,-0.0506,0.9984,-0.0262,-0.0516,0.9983,-0.0078,-0.0439,0.999,0.0061,0.1994,0.9799,0.008,-0.0439,0.999,0.0255,-0.0507,0.9984,0.0078,-0.0439,0.999,0.0261,-0.0516,0.9983,0.0252,-0.0507,0.9984,0.9808,0.1943,0.0174,0.9779,0.1994,-0.0625,0.9148,0.4024,0.036,0.9148,0.4024,0.036,0.9779,0.1994,-0.0625,0.9116,0.409,-0.0415,0.3827,0.9202,0.0824,0.4933,0.8664,0.0775,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.4933,0.8664,0.0775,0.4933,0.8664,0.0775,-0.9148,0.4024,0.036,-0.9116,0.409,-0.0415,-0.9808,0.1943,0.0174,-0.9808,0.1943,0.0174,-0.9116,0.409,-0.0415,-0.9779,0.1994,-0.0625,-0.9808,0.1943,0.0174,-0.7886,0.6124,0.0548,-0.9808,0.1943,0.0174,-0.9808,0.1943,0.0174,-0.7886,0.6124,0.0548,-0.7886,0.6124,0.0548,0.0061,-0.3703,0.9289,0.0255,-0.1274,0.9915,0.008,-0.1342,0.9909,0.025,-0.1275,0.9915,0.026,-0.1265,0.9916,0.0077,-0.1342,0.9909,0.0453,-0.0971,0.9942,0.0453,-0.0994,0.994,0.037,-0.1159,0.9926,0.037,-0.1159,0.9926,0.0453,-0.0994,0.994,0.0394,-0.1136,0.9927,-0.3827,-0.9202,-0.0824,-0.4933,-0.8664,-0.0775,-0.3827,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.4933,-0.8664,-0.0775,-0.4933,-0.8664,-0.0775,-0.8313,0.5536,0.0495,-0.8312,0.5496,0.0837,-0.7068,0.7046,0.0631,-0.7068,0.7046,0.0631,-0.8312,0.5496,0.0837,-0.7064,0.7013,0.0956,0.8313,-0.5536,-0.0495,0.8312,-0.5558,-0.0152,0.7068,-0.7046,-0.0631,0.7068,-0.7046,-0.0631,0.8312,-0.5558,-0.0152,0.7064,-0.7071,-0.0305,-0.0061,-0.3703,0.9289,-0.008,-0.1342,0.9909,-0.0255,-0.1274,0.9915,-0.0082,-0.1342,0.9909,-0.0265,-0.1266,0.9916,-0.0258,-0.1273,0.9915,0.7886,0.6124,0.0547,0.9808,0.1943,0.0174,0.7886,0.6124,0.0548,0.7886,0.6124,0.0548,0.9808,0.1943,0.0174,0.9808,0.1943,0.0174,-0.7886,-0.6124,-0.0548,-0.9808,-0.1943,-0.0174,-0.7886,-0.6124,-0.0548,-0.7886,-0.6124,-0.0548,-0.9808,-0.1943,-0.0174,-0.9808,-0.1943,-0.0174,-0.4933,0.8664,0.0775,-0.3827,0.9202,0.0824,-0.4933,0.8664,0.0775,-0.4933,0.8664,0.0775,-0.3827,0.9202,0.0824,-0.3827,0.9202,0.0824,0.037,-0.0622,0.9974,0.0394,-0.0645,0.9971,0.0453,-0.0811,0.9957,0.0453,-0.0811,0.9957,0.0394,-0.0645,0.9971,0.0453,-0.0787,0.9959,0.9808,-0.1943,-0.0174,0.7886,-0.6124,-0.0548,0.9808,-0.1943,-0.0174,0.9808,-0.1943,-0.0174,0.7886,-0.6124,-0.0548,0.7886,-0.6124,-0.0548,0.4933,-0.8664,-0.0775,0.3827,-0.9202,-0.0824,0.4933,-0.8664,-0.0775,0.4933,-0.8664,-0.0775,0.3827,-0.9202,-0.0824,0.3827,-0.9202,-0.0824,-0.6363,-0.2528,-0.7288,-0.472,-0.6172,-0.6294,-0.6176,-0.3034,-0.7256,-0.6176,-0.3034,-0.7256,-0.472,-0.6172,-0.6295,-0.5168,-0.539,-0.6651,-0.6308,-0.375,0.6793,-0.6135,-0.4235,0.6665,-0.4705,-0.7169,0.5145,-0.4705,-0.7169,0.5145,-0.6135,-0.4235,0.6665,-0.5155,-0.6448,0.5643,0,-0.7343,-0.6788,0,-0.7343,-0.6788,0,-0.7343,-0.6788,0,-0.7343,-0.6788,0,-0.7343,-0.6788,0,-0.7343,-0.6788,0,-0.8406,0.5417,0,-0.8406,0.5417,-0.0061,-0.3703,0.9289,-0.0061,-0.3703,0.9289,0,-0.8406,0.5417,0.0061,-0.3703,0.9289,0.6363,-0.2528,-0.7288,0.6176,-0.3034,-0.7256,0.472,-0.6172,-0.6294,0.472,-0.6172,-0.6294,0.6176,-0.3034,-0.7256,0.5168,-0.539,-0.6651,0.5156,-0.6448,0.5643,0.6136,-0.4235,0.6664,0.4704,-0.7169,0.5145,0.4704,-0.7169,0.5145,0.6135,-0.4235,0.6665,0.6308,-0.375,0.6793,0.6719,0.1872,-0.7166,0.6718,-0.0569,-0.7385,0.6696,0.212,-0.7118,0.6696,0.212,-0.7119,0.6718,-0.0569,-0.7385,0.6695,-0.0822,-0.7383,0.662,-0.2112,0.7191,0.6642,-0.1864,0.7239,0.662,0.0801,0.7452,0.662,0.0801,0.7452,0.6642,-0.1864,0.724,0.6642,0.0548,0.7455,-0.662,-0.2112,0.7191,-0.662,0.0801,0.7452,-0.6642,-0.1864,0.7239,-0.6642,-0.1864,0.7239,-0.662,0.0801,0.7452,-0.6642,0.0548,0.7456,-0.6695,-0.0822,-0.7382,-0.6718,-0.0569,-0.7385,-0.6695,0.212,-0.7119,-0.6695,0.212,-0.7119,-0.6718,-0.0569,-0.7385,-0.6719,0.1872,-0.7166,-0.6308,0.2484,0.7351,-0.4705,0.6141,0.6336,-0.6135,0.2984,0.7311,-0.6135,0.2984,0.7311,-0.4705,0.6141,0.6336,-0.5155,0.5343,0.6699,-0.6363,0.3782,-0.6723,-0.6176,0.4274,-0.6602,-0.472,0.7192,-0.5098,-0.472,0.7192,-0.5098,-0.6176,0.4274,-0.6602,-0.5168,0.6486,-0.5588,-0.0061,0.1994,0.9799,0.0061,0.1994,0.9799,0,0.731,0.6823,0,0.731,0.6823,0.0061,0.1994,0.9799,0,0.731,0.6823,0,0.8432,-0.5375,0,0.8432,-0.5375,0,0.8432,-0.5375,0,0.8432,-0.5376,0,0.8432,-0.5376,0,0.8432,-0.5376,0.6308,0.2483,0.7351,0.6135,0.2984,0.7311,0.4705,0.6141,0.6336,0.4705,0.6141,0.6336,0.6135,0.2984,0.7311,0.5155,0.5343,0.6699,0.5168,0.6486,-0.5587,0.6176,0.4274,-0.6602,0.472,0.7192,-0.5098,0.4721,0.7192,-0.5098,0.6176,0.4274,-0.6602,0.6363,0.3782,-0.6723,-0.6176,-0.3034,-0.7256,-0.6718,-0.0569,-0.7385,-0.6363,-0.2528,-0.7288,-0.6363,-0.2528,-0.7288,-0.6718,-0.0569,-0.7385,-0.6695,-0.0822,-0.7382,-0.662,-0.2112,0.7191,-0.6642,-0.1864,0.7239,-0.6308,-0.375,0.6793,-0.6308,-0.375,0.6793,-0.6642,-0.1864,0.7239,-0.6135,-0.4235,0.6665,-0.3428,-0.7846,-0.5165,-0.5168,-0.539,-0.6651,-0.3428,-0.7846,-0.5165,-0.3428,-0.7846,-0.5166,-0.5168,-0.539,-0.6651,-0.472,-0.6172,-0.6295,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0.472,-0.6173,-0.6294,0.5168,-0.539,-0.6651,0.3428,-0.7847,-0.5165,0.3428,-0.7846,-0.5166,0.5168,-0.539,-0.6651,0.3428,-0.7846,-0.5166,0.3421,-0.8626,0.3727,0.5155,-0.6448,0.5644,0.3421,-0.8626,0.3727,0.3421,-0.8626,0.3727,0.5156,-0.6447,0.5644,0.4704,-0.7169,0.5145,0.6136,-0.4235,0.6665,0.6642,-0.1864,0.7239,0.6308,-0.375,0.6793,0.6308,-0.375,0.6793,0.6642,-0.1864,0.7239,0.662,-0.2112,0.7191,0.4933,-0.8664,-0.0775,0.7886,-0.6124,-0.0548,0.4933,-0.8664,-0.0775,0.4933,-0.8664,-0.0775,0.7886,-0.6124,-0.0548,0.7886,-0.6124,-0.0548,0.9808,0.1943,0.0173,0.9808,-0.1943,-0.0174,0.9808,0.1943,0.0174,0.9808,0.1943,0.0174,0.9808,-0.1943,-0.0174,0.9808,-0.1943,-0.0174,0.6695,-0.0822,-0.7382,0.6718,-0.0569,-0.7385,0.6363,-0.2528,-0.7288,0.6363,-0.2528,-0.7288,0.6718,-0.0569,-0.7385,0.6176,-0.3034,-0.7256,-0.7886,-0.6124,-0.0548,-0.4933,-0.8664,-0.0775,-0.7886,-0.6124,-0.0548,-0.7886,-0.6124,-0.0548,-0.4933,-0.8664,-0.0775,-0.4933,-0.8664,-0.0775,-0.4705,-0.7169,0.5145,-0.5156,-0.6448,0.5643,-0.3421,-0.8626,0.3728,-0.3421,-0.8626,0.3727,-0.5155,-0.6448,0.5643,-0.3421,-0.8626,0.3727,-0.9808,0.1943,0.0174,-0.9808,-0.1943,-0.0174,-0.9808,0.1943,0.0174,-0.9808,0.1943,0.0174,-0.9808,-0.1943,-0.0174,-0.9808,-0.1943,-0.0174,-0.6135,0.2984,0.7311,-0.6642,0.0548,0.7455,-0.6308,0.2484,0.7351,-0.6308,0.2484,0.7351,-0.6642,0.0548,0.7455,-0.662,0.0801,0.7452,-0.6695,0.212,-0.7119,-0.6718,0.1872,-0.7167,-0.6363,0.3782,-0.6723,-0.6363,0.3782,-0.6723,-0.6718,0.1872,-0.7166,-0.6176,0.4274,-0.6602,-0.4933,0.8664,0.0775,-0.7886,0.6124,0.0548,-0.4933,0.8664,0.0775,-0.4933,0.8664,0.0775,-0.7886,0.6124,0.0548,-0.7886,0.6124,0.0548,-0.3421,0.7827,0.5199,-0.5155,0.5343,0.6699,-0.3421,0.7827,0.5199,-0.3421,0.7827,0.52,-0.5155,0.5343,0.6699,-0.4705,0.6141,0.6336,-0.472,0.7192,-0.5098,-0.5168,0.6486,-0.5588,-0.3428,0.8639,-0.369,-0.3428,0.8639,-0.369,-0.5168,0.6486,-0.5588,-0.3428,0.8639,-0.369,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0.4705,0.6141,0.6336,0.5155,0.5343,0.6699,0.3421,0.7827,0.52,0.3421,0.7827,0.52,0.5155,0.5343,0.6699,0.3421,0.7827,0.52,0.3428,0.8639,-0.369,0.5168,0.6486,-0.5587,0.3428,0.8639,-0.369,0.3428,0.8639,-0.3689,0.5168,0.6486,-0.5587,0.472,0.7192,-0.5098,0.7886,0.6124,0.0548,0.4933,0.8664,0.0775,0.7886,0.6124,0.0548,0.7886,0.6124,0.0548,0.4933,0.8664,0.0775,0.4933,0.8664,0.0775,0.662,0.0801,0.7452,0.6642,0.0548,0.7455,0.6308,0.2483,0.7351,0.6308,0.2483,0.7351,0.6642,0.0548,0.7455,0.6135,0.2984,0.7311,0.6176,0.4274,-0.6602,0.6718,0.1872,-0.7166,0.6363,0.3782,-0.6723,0.6363,0.3782,-0.6723,0.6718,0.1872,-0.7167,0.6695,0.212,-0.7119,0.3824,-0.9203,-0.0824,0.3824,-0.9165,-0.117,0.3824,-0.9203,-0.0824,0.3826,-0.9202,-0.0824,0.3824,-0.9166,-0.117,0.3824,-0.9166,-0.1169,-0.3828,0.9201,0.0824,-0.3825,0.9227,0.0476,-0.3828,0.9201,0.0824,-0.3826,0.9202,0.0824,-0.3825,0.9227,0.0476,-0.3825,0.9227,0.0477,-0.0453,-0.0994,0.994,-0.0453,-0.0787,0.9959,-0.0453,-0.0971,0.9942,-0.0453,-0.0971,0.9942,-0.0453,-0.0787,0.9959,-0.0453,-0.0811,0.9957,-0.0255,-0.0507,0.9984,-0.037,-0.0622,0.9974,-0.0263,-0.0515,0.9983,-0.0263,-0.0515,0.9983,-0.037,-0.0622,0.9974,-0.0394,-0.0645,0.9971,0.0394,-0.0645,0.9971,0.037,-0.0622,0.9974,0.0263,-0.0515,0.9983,0.0263,-0.0515,0.9983,0.037,-0.0622,0.9974,0.0255,-0.0507,0.9984,0.0453,-0.0971,0.9942,0.0453,-0.0811,0.9957,0.0453,-0.0994,0.994,0.0453,-0.0994,0.994,0.0453,-0.0811,0.9957,0.0453,-0.0787,0.9959,0.6886,-0.7222,-0.0646,0.6861,-0.7121,-0.1486,0.9147,-0.4024,-0.036,0.9147,-0.4024,-0.036,0.6861,-0.7121,-0.1486,0.9116,-0.3952,-0.1135,0.9148,-0.4024,-0.036,0.9116,-0.3952,-0.1135,0.9808,-0.1943,-0.0174,0.9808,-0.1943,-0.0174,0.9116,-0.3952,-0.1135,0.9779,-0.1851,-0.0969,-0.9808,-0.1943,-0.0174,-0.9779,-0.1851,-0.0969,-0.9148,-0.4024,-0.036,-0.9148,-0.4024,-0.036,-0.9779,-0.1851,-0.0969,-0.9116,-0.3952,-0.1135,0,0.996,0.0892,0,0.9928,0.1198,0,0.996,0.0892,0,0.996,0.0892,0,0.9928,0.1198,0,0.9928,0.1198,0,-0.996,-0.0892,0,-0.9983,-0.0584,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.9983,-0.0584,0,-0.9983,-0.0584,0.0061,0.1994,0.9799,-0.0061,0.1994,0.9799,0.008,-0.0439,0.999,0.008,-0.0439,0.999,-0.0061,0.1994,0.9799,-0.008,-0.0439,0.999,-0.0394,-0.1136,0.9927,-0.037,-0.1159,0.9926,-0.0263,-0.1266,0.9916,-0.0263,-0.1266,0.9916,-0.037,-0.1159,0.9926,-0.0255,-0.1274,0.9915,0.0255,-0.1274,0.9915,0.037,-0.1159,0.9926,0.0263,-0.1266,0.9916,0.0263,-0.1266,0.9916,0.037,-0.1159,0.9926,0.0394,-0.1136,0.9927,0.7068,0.7046,0.0631,0.7064,0.7013,0.0956,0.8313,0.5535,0.0496,0.8314,0.5535,0.0495,0.7064,0.7013,0.0956,0.8312,0.5496,0.0837,-0.0061,-0.3703,0.9289,0.0061,-0.3703,0.9289,-0.008,-0.1342,0.9909,-0.008,-0.1342,0.9909,0.0061,-0.3703,0.9289,0.008,-0.1342,0.9909,0.9808,0.1943,0.0174,0.9802,0.1906,0.0532,0.9808,-0.1943,-0.0174,0.9808,-0.1943,-0.0174,0.9802,0.1906,0.0532,0.9802,-0.197,0.0185,0.9802,-0.197,0.0185,0.978,-0.2011,0.0545,0.8312,-0.5558,-0.0152,0.8312,-0.5558,-0.0152,0.978,-0.2011,0.0545,0.8287,-0.5594,0.0192,0.3824,-0.9166,-0.117,0.3816,-0.9118,-0.1515,0.3824,-0.9166,-0.1169,0.3824,-0.9166,-0.1169,0.3818,-0.9118,-0.1514,0.3818,-0.9118,-0.1514,-0.9779,-0.1851,-0.0969,-0.9674,-0.1805,-0.1778,-0.9116,-0.3952,-0.1135,-0.9116,-0.3952,-0.1135,-0.9674,-0.1805,-0.1778,-0.9035,-0.3846,-0.1893,0.6861,0.7272,-0.0197,0.684,0.7214,-0.1087,0.3813,0.9244,-0.0008,0.3813,0.9244,-0.0008,0.684,0.7214,-0.1087,0.3772,0.9221,-0.086,-0.3824,-0.9166,-0.1169,-0.3819,-0.9117,-0.1515,-0.3824,-0.9166,-0.117,-0.3824,-0.9166,-0.117,-0.382,-0.9117,-0.1514,-0.382,-0.9117,-0.1514,0.3825,0.9227,0.0477,0.3816,0.9242,0.0129,0.3825,0.9227,0.0476,0.3825,0.9227,0.0476,0.3822,0.924,0.0129,0.3822,0.924,0.0129,-0.3772,0.9221,-0.086,-0.684,0.7213,-0.1087,-0.3813,0.9244,-0.0008,-0.3813,0.9244,-0.0008,-0.684,0.7213,-0.1087,-0.6861,0.7272,-0.0197,-0.9779,0.1994,-0.0625,-0.9674,0.2091,-0.1429,-0.9779,-0.1851,-0.0969,-0.9779,-0.1851,-0.0969,-0.9674,0.2091,-0.1429,-0.9674,-0.1805,-0.1778,0.9802,0.1906,0.0532,0.9781,0.1882,0.0894,0.9802,-0.197,0.0185,0.9802,-0.197,0.0185,0.9782,0.1883,0.0879,0.978,-0.2011,0.0545,0.3772,-0.8922,-0.2484,0.684,-0.6906,-0.2351,0.3813,-0.9096,-0.165,0.3813,-0.9096,-0.165,0.684,-0.6906,-0.2351,0.6861,-0.7122,-0.1486,-0.9802,0.1906,0.0532,-0.9781,0.1882,0.0893,-0.8312,0.5496,0.0837,-0.8312,0.5496,0.0837,-0.9781,0.1882,0.0893,-0.8287,0.547,0.1182,-0.7064,-0.7071,-0.0305,-0.7052,-0.709,0.0026,-0.8312,-0.5558,-0.0152,-0.8312,-0.5558,-0.0152,-0.7053,-0.7089,0.0026,-0.8287,-0.5593,0.0192,-0.9035,-0.3846,-0.1893,-0.684,-0.6906,-0.2351,-0.9116,-0.3952,-0.1135,-0.9116,-0.3952,-0.1135,-0.684,-0.6906,-0.2351,-0.6861,-0.7121,-0.1486,-0.6861,-0.7121,-0.1486,-0.684,-0.6906,-0.2351,-0.3813,-0.9096,-0.165,-0.3813,-0.9096,-0.165,-0.684,-0.6906,-0.2351,-0.3772,-0.8922,-0.2484,0,0.9968,-0.0803,0,0.9968,-0.0803,0,0.9968,-0.0803,0,0.9968,-0.0803,0,0.9968,-0.0803,0,0.9968,-0.0803,0.9779,0.1994,-0.0625,0.9674,0.2091,-0.1429,0.9116,0.409,-0.0415,0.9116,0.409,-0.0415,0.9674,0.2091,-0.1429,0.9034,0.4121,-0.118,0.9808,-0.1943,-0.0174,0.9802,-0.197,0.0185,0.8313,-0.5535,-0.0495,0.8313,-0.5536,-0.0495,0.9802,-0.197,0.0185,0.8312,-0.5558,-0.0152,0.3827,-0.9202,-0.0824,0.3813,-0.9096,-0.165,0.6886,-0.7222,-0.0647,0.6886,-0.7222,-0.0646,0.3813,-0.9096,-0.165,0.6861,-0.7121,-0.1486,-0.9116,-0.3952,-0.1135,-0.6861,-0.7121,-0.1486,-0.9147,-0.4024,-0.036,-0.9147,-0.4024,-0.036,-0.6861,-0.7121,-0.1486,-0.6886,-0.7222,-0.0646,0.3825,0.9203,0.0824,0.3825,0.9227,0.0477,0.3825,0.9203,0.0824,0.3825,0.9203,0.0824,0.3825,0.9227,0.0477,0.3825,0.9227,0.0476,-0.9808,0.1943,0.0174,-0.9802,0.1906,0.0532,-0.8314,0.5535,0.0495,-0.8314,0.5535,0.0495,-0.9802,0.1906,0.0532,-0.8312,0.5496,0.0837,-0.7068,-0.7046,-0.0631,-0.7064,-0.7071,-0.0305,-0.8314,-0.5535,-0.0496,-0.8313,-0.5535,-0.0495,-0.7064,-0.7071,-0.0305,-0.8312,-0.5558,-0.0152,0.9116,0.409,-0.0415,0.6861,0.7272,-0.0197,0.9147,0.4024,0.036,0.9147,0.4024,0.036,0.6861,0.7272,-0.0197,0.6886,0.7222,0.0646,-0.9808,0.1943,0.0174,-0.9779,0.1994,-0.0625,-0.9808,-0.1943,-0.0174,-0.9808,-0.1943,-0.0174,-0.9779,0.1994,-0.0625,-0.9779,-0.1851,-0.0969,-0.3826,-0.9202,-0.0824,-0.3824,-0.9166,-0.1169,-0.3826,-0.9202,-0.0824,-0.3827,-0.9202,-0.0824,-0.3824,-0.9166,-0.1169,-0.3824,-0.9166,-0.117,-0.9808,-0.1943,-0.0174,-0.9802,-0.197,0.0185,-0.9808,0.1943,0.0174,-0.9808,0.1943,0.0174,-0.9802,-0.197,0.0185,-0.9802,0.1906,0.0532,0.6886,0.7222,0.0646,0.6861,0.7272,-0.0197,0.3827,0.9202,0.0824,0.3827,0.9202,0.0824,0.6861,0.7272,-0.0197,0.3813,0.9244,-0.0008,-0.3827,0.9202,0.0824,-0.3813,0.9244,-0.0008,-0.6886,0.7222,0.0646,-0.6886,0.7222,0.0646,-0.3813,0.9244,-0.0008,-0.6861,0.7272,-0.0197,0,-0.996,-0.0892,0,-0.985,-0.1724,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.985,-0.1724,0,-0.985,-0.1724,0.9808,-0.1943,-0.0174,0.9779,-0.1851,-0.0969,0.9808,0.1943,0.0174,0.9808,0.1943,0.0174,0.9779,-0.1851,-0.0969,0.9779,0.1994,-0.0625,-0.6886,0.7222,0.0646,-0.6861,0.7272,-0.0197,-0.9148,0.4024,0.036,-0.9147,0.4024,0.036,-0.6861,0.7272,-0.0197,-0.9116,0.409,-0.0415,0.8314,0.5535,0.0495,0.8312,0.5496,0.0837,0.9808,0.1943,0.0174,0.9808,0.1943,0.0174,0.8312,0.5496,0.0837,0.9802,0.1906,0.0532,0.0518,0.0514,-0.9973,0.055,0.0546,-0.997,0.0633,0.0778,-0.995,0.0633,0.0778,-0.995,0.055,0.0546,-0.997,0.0633,0.0745,-0.9952,0.0112,0.0259,-0.9996,0.0112,0.0259,-0.9996,0.0356,0.0353,-0.9987,0.0108,0.0259,-0.9996,0.0366,0.0366,-0.9987,0.0351,0.0352,-0.9988,-0.0356,0.0353,-0.9987,-0.0368,0.0364,-0.9987,-0.0112,0.0259,-0.9996,-0.0374,0.0362,-0.9986,-0.0118,0.0259,-0.9996,-0.012,0.0259,-0.9996,0.0633,0.1002,-0.993,0.0633,0.1035,-0.9926,0.0518,0.1265,-0.9906,0.0518,0.1265,-0.9906,0.0633,0.1035,-0.9926,0.055,0.1233,-0.9908,-0.0518,0.1265,-0.9906,-0.055,0.1233,-0.9908,-0.0633,0.1002,-0.993,-0.0633,0.1002,-0.993,-0.055,0.1233,-0.9908,-0.0633,0.1035,-0.9926,-0.0112,0.152,-0.9883,-0.0112,0.152,-0.9883,-0.0356,0.1426,-0.9891,-0.0114,0.152,-0.9883,-0.037,0.1415,-0.9892,-0.0359,0.1425,-0.9891,0.0356,0.1426,-0.9891,0.0368,0.1415,-0.9893,0.0112,0.152,-0.9883,0.0368,0.1415,-0.9892,0.0112,0.152,-0.9883,0.0112,0.152,-0.9883,0.0112,0.152,-0.9883,-0.0112,0.152,-0.9883,0.0112,0.152,-0.9883,0.0112,0.152,-0.9883,-0.0112,0.152,-0.9883,-0.0112,0.152,-0.9883,-0.0356,0.1426,-0.9891,-0.0368,0.1415,-0.9893,-0.0518,0.1265,-0.9906,-0.0518,0.1265,-0.9906,-0.0368,0.1415,-0.9893,-0.055,0.1233,-0.9908,-0.0112,0.0259,-0.9996,0.0112,0.0259,-0.9996,-0.0112,0.0259,-0.9996,-0.0112,0.0259,-0.9996,0.0112,0.0259,-0.9996,0.0112,0.0259,-0.9996,0.0356,0.0353,-0.9987,0.0368,0.0364,-0.9987,0.0518,0.0514,-0.9973,0.0518,0.0514,-0.9973,0.0368,0.0364,-0.9987,0.055,0.0546,-0.997,0.0633,0.1002,-0.993,0.0633,0.0778,-0.995,0.0633,0.1035,-0.9926,0.0633,0.1035,-0.9926,0.0633,0.0778,-0.995,0.0633,0.0745,-0.9952,-0.055,0.0546,-0.997,-0.0368,0.0364,-0.9987,-0.0518,0.0514,-0.9973,-0.0518,0.0514,-0.9973,-0.0368,0.0364,-0.9987,-0.0356,0.0353,-0.9987,0.055,0.1233,-0.9908,0.0368,0.1415,-0.9893,0.0518,0.1265,-0.9906,0.0518,0.1265,-0.9906,0.0368,0.1415,-0.9893,0.0356,0.1426,-0.9891,-0.0633,0.1035,-0.9926,-0.0633,0.0745,-0.9952,-0.0633,0.1002,-0.993,-0.0633,0.1002,-0.993,-0.0633,0.0745,-0.9952,-0.0633,0.0778,-0.995,-0.0633,0.0778,-0.995,-0.0633,0.0745,-0.9952,-0.0518,0.0514,-0.9973,-0.0518,0.0514,-0.9973,-0.0633,0.0745,-0.9952,-0.055,0.0546,-0.997,-0.9035,0.4121,-0.118,-0.9674,0.2091,-0.1429,-0.9116,0.409,-0.0415,-0.9116,0.409,-0.0415,-0.9674,0.2091,-0.1429,-0.9779,0.1994,-0.0625,0.9779,-0.1851,-0.0969,0.9674,-0.1804,-0.1778,0.9779,0.1994,-0.0625,0.9779,0.1994,-0.0625,0.9674,-0.1804,-0.1778,0.9674,0.2091,-0.1429,-0.3825,0.9227,0.0476,-0.3819,0.9241,0.0129,-0.3825,0.9227,0.0477,-0.3825,0.9227,0.0477,-0.3819,0.9241,0.0129,-0.3819,0.9241,0.0129,0,0.9928,0.1198,0,0.9885,0.151,0,0.9928,0.1198,0,0.9928,0.1198,0,0.9885,0.151,0,0.9885,0.151,0.8288,0.5471,0.1175,0.9781,0.1882,0.0894,0.8312,0.5496,0.0837,0.8312,0.5496,0.0837,0.9781,0.1882,0.0894,0.9802,0.1906,0.0532,0.7064,0.7013,0.0956,0.7053,0.6972,0.1285,0.8312,0.5496,0.0837,0.8312,0.5496,0.0837,0.7053,0.6972,0.1285,0.8287,0.547,0.1182,0,-0.9983,-0.0584,0,-0.9996,-0.027,0,-0.9983,-0.0584,0,-0.9983,-0.0584,0,-0.9996,-0.027,0,-0.9996,-0.027,0.9035,0.4121,-0.118,0.684,0.7214,-0.1087,0.9116,0.409,-0.0415,0.9116,0.409,-0.0415,0.684,0.7214,-0.1087,0.6861,0.7272,-0.0197,0,-0.985,-0.1724,0,-0.9667,-0.2561,0,-0.985,-0.1724,0,-0.985,-0.1724,0,-0.9667,-0.2561,0,-0.9667,-0.2561,-0.8288,-0.5593,0.0184,-0.9781,-0.2011,0.0545,-0.8312,-0.5558,-0.0152,-0.8312,-0.5558,-0.0152,-0.9781,-0.2011,0.0545,-0.9802,-0.197,0.0185,-0.8312,0.5496,0.0837,-0.8287,0.547,0.1182,-0.7064,0.7013,0.0956,-0.7064,0.7013,0.0956,-0.8287,0.547,0.1182,-0.7053,0.6972,0.1285,0.9035,-0.3846,-0.1893,0.9674,-0.1804,-0.1778,0.9116,-0.3952,-0.1135,0.9116,-0.3952,-0.1135,0.9674,-0.1804,-0.1778,0.9779,-0.1851,-0.0969,-0.9802,-0.197,0.0185,-0.9781,-0.2011,0.0545,-0.9802,0.1906,0.0532,-0.9802,0.1906,0.0532,-0.9782,-0.201,0.0531,-0.9781,0.1882,0.0893,0.6861,-0.7121,-0.1486,0.684,-0.6906,-0.2351,0.9116,-0.3952,-0.1135,0.9116,-0.3952,-0.1135,0.684,-0.6906,-0.2351,0.9035,-0.3846,-0.1893,0.8312,-0.5558,-0.0152,0.8287,-0.5594,0.0192,0.7064,-0.7071,-0.0305,0.7064,-0.7071,-0.0305,0.8287,-0.5594,0.0192,0.7053,-0.7089,0.0026,-0.6861,0.7272,-0.0197,-0.684,0.7213,-0.1087,-0.9116,0.409,-0.0415,-0.9116,0.409,-0.0415,-0.684,0.7213,-0.1087,-0.9034,0.4121,-0.118,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0891,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,-0.0001,0.0892,-0.996,-0.0001,0.0892,-0.996,-0.0001,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,0,0.0892,-0.996,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,-0.996,-0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,0.996,0.0892,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,-0.0892,0.996,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,0,0.996,0.0897,1,-0.0001,0,1,-0.0001,0,1,-0.0001,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0,-0.996,-0.0897,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9201,-0.0828,0.7071,-0.7043,-0.0634,0.7071,-0.7042,-0.0634,-0.3826,-0.9216,-0.0658,-0.3826,-0.9216,-0.0656,-0.7024,-0.7095,-0.0561,-0.7025,-0.7095,-0.0561,-0.3826,-0.9216,-0.0656,-0.7118,-0.7002,-0.056,0.9998,0.0109,-0.0194,0.7019,0.7121,0.0173,1,0,0,1,0,0,0.7019,0.7121,0.0173,0.7071,0.7042,0.0634,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,-0.9998,0.0109,-0.0194,-0.7118,-0.7002,-0.056,-1,0,0,-1,0,0,-0.7118,-0.7002,-0.056,-0.7071,-0.7042,-0.0634,0,0.0895,-0.996,0,0.0895,-0.996,0,0.0895,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0,0.0897,-0.996,0.7019,0.7121,0.0173,0.3822,0.9236,0.0302,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3822,0.9236,0.0302,0.3827,0.9202,0.0828,0.3826,-0.9216,-0.0656,0.7118,-0.7002,-0.056,0.3827,-0.9202,-0.0828,0.3827,-0.9202,-0.0828,0.7118,-0.7002,-0.056,0.7071,-0.7042,-0.0635,-0.7118,-0.7002,-0.056,-0.3826,-0.9216,-0.0656,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3826,-0.9216,-0.0656,-0.3827,-0.9202,-0.0828,-0.2383,0.5027,0.8309,-0.4188,0.3449,0.84,-0.2383,0.5027,0.8309,-0.2383,0.5028,0.8309,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-0.3821,0.9236,0.0302,-0.7019,0.7121,0.0173,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,-0.7071,-0.7043,-0.0634,-0.3827,-0.9202,-0.0828,-0.7024,-0.7096,-0.0561,-0.7024,-0.7096,-0.0561,-0.3827,-0.9202,-0.0828,-0.3826,-0.9216,-0.0658,-0.3826,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7071,0.7042,0.0634,-0.7111,0.7029,0.0161,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.4188,0.3449,0.84,0.4188,0.3449,0.84,0.2383,0.5028,0.8309,0.2383,0.5028,0.8309,0.7118,-0.7002,-0.056,0.9998,0.0109,-0.0194,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,0.9998,0.0109,-0.0194,1,0,0,0.7071,-0.7042,-0.0634,1,0,0,0.7024,-0.7095,-0.0561,0.7024,-0.7095,-0.0561,1,0,0,0.9998,-0.0077,-0.0199,-0.7019,0.7121,0.0173,-0.9998,0.0109,-0.0194,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.9998,0.0109,-0.0194,-1,0,-0.0001,-0.7071,0.7042,0.0634,-1,0,0,-0.7112,0.7028,0.0161,-0.7112,0.7029,0.0161,-1,0,0,-0.9998,-0.0077,-0.0199,0.2383,-0.6431,0.7277,0.4188,-0.4894,0.7649,0.2383,-0.6431,0.7277,0.2383,-0.643,0.7278,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2382,-0.6431,0.7278,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-0.2384,-0.6431,0.7277,-0.2384,-0.6431,0.7277,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9201,-0.0828,-0.3827,-0.9201,-0.0828,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,0.4188,0.3449,0.84,0.4188,0.3449,0.84,1,0,0,0.7071,0.7042,0.0634,0.9998,-0.0077,-0.0199,0.9998,-0.0077,-0.0199,0.7071,0.7042,0.0634,0.7112,0.7028,0.0161,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.5923,-0.0722,0.8025,-0.5923,-0.0722,0.8025,-0.4188,-0.4894,0.7649,-0.4188,-0.4894,0.7649,-1,0,0,-0.7071,-0.7042,-0.0634,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7071,-0.7042,-0.0634,-0.7024,-0.7095,-0.0561,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.4188,-0.4894,0.7649,0.4188,-0.4894,0.7649,0.5923,-0.0722,0.8025,0.5923,-0.0722,0.8025,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.3826,0.9202,0.0828,0.7112,0.7029,0.0161,0.7112,0.7029,0.0161,0.3826,0.9202,0.0828,0.3821,0.9237,0.0287,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.4188,0.3449,0.84,-0.5923,-0.0722,0.8025,-0.4188,0.3449,0.84,-0.4188,0.3449,0.84,-0.5922,-0.0722,0.8025,-0.5922,-0.0722,0.8025,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7043,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0895,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,0,-0.0897,0.996,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.3827,0.9202,0.0828,-0.3827,0.9202,0.0828,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,0.3827,-0.9202,-0.0828,0.7071,-0.7042,-0.0634,0.3826,-0.9216,-0.0658,0.3826,-0.9216,-0.0658,0.7071,-0.7042,-0.0634,0.7024,-0.7095,-0.0561,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,0.3827,0.9202,0.0828,0.3827,0.9202,0.0828,0.3826,-0.9216,-0.0658,0.7024,-0.7095,-0.0561,0.3824,-0.9217,-0.0656,0.3826,-0.9216,-0.0656,0.7024,-0.7095,-0.0561,0.7118,-0.7002,-0.056,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,-0.3827,-0.9202,-0.0828,-0.3827,-0.9202,-0.0828,1,0,0,0.7071,0.7042,0.0634,1,0,0,1,0,0,0.7071,0.7042,0.0634,0.7071,0.7042,0.0634,-0.7111,0.7029,0.0161,-0.7019,0.7121,0.0173,-0.3821,0.9237,0.0287,-0.3821,0.9237,0.0287,-0.7019,0.7121,0.0173,-0.3821,0.9236,0.0302,0.9998,-0.0077,-0.0199,0.7112,0.7028,0.0161,0.9998,0.0109,-0.0194,0.9998,0.0109,-0.0194,0.7112,0.7028,0.0161,0.7019,0.7121,0.0173,-1,0,0,-0.7071,-0.7042,-0.0634,-1,0,0,-1,0,0,-0.7071,-0.7042,-0.0634,-0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,0.7071,-0.7042,-0.0634,0.7071,-0.7042,-0.0634,1,0,0,1,0,0,0.7024,-0.7095,-0.0561,0.9998,-0.0077,-0.0199,0.7118,-0.7002,-0.056,0.7118,-0.7002,-0.056,0.9998,-0.0077,-0.0199,0.9998,0.0109,-0.0194,-0.7024,-0.7095,-0.0561,-0.7118,-0.7002,-0.056,-0.9998,-0.0077,-0.0199,-0.9998,-0.0077,-0.0199,-0.7118,-0.7002,-0.056,-0.9998,0.0109,-0.0194,-0.9998,-0.0077,-0.0199,-0.9998,0.0109,-0.0194,-0.7112,0.7028,0.0161,-0.7112,0.7028,0.0161,-0.9998,0.0109,-0.0194,-0.7019,0.7121,0.0173,-0.7071,0.7042,0.0634,-1,0,0,-0.7071,0.7042,0.0634,-0.7071,0.7042,0.0634,-1,0,0,-1,0,0,0.7111,0.7029,0.0161,0.3821,0.9237,0.0287,0.7019,0.7121,0.0173,0.7019,0.7121,0.0173,0.3821,0.9237,0.0287,0.3822,0.9236,0.0302,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0]}");
exports.loCannons = loCannons;
exports.upCannons = upCannons;
exports.reside = reside;
exports.track = track;
var rotatingItem = JSON.parse("{\"vertex\":[-0.118718,1.788072,-0.744545,-0.083624,1.872306,-0.735442,-0.071457,1.788072,-0.744545,-0.071457,1.788072,-0.744545,-0.083624,1.872306,-0.735442,-0.050205,1.839081,-0.739032,0.120918,1.788072,-0.744545,0.085825,1.703838,-0.753649,0.073658,1.788072,-0.744545,0.073658,1.788072,-0.744545,0.085825,1.703838,-0.753649,0.052406,1.737063,-0.750058,0.001101,1.839692,-0.546906,0.052406,1.818563,-0.54919,-0.050205,1.818563,-0.54919,0.052406,1.818563,-0.54919,0.073658,1.767554,-0.554702,-0.050205,1.818563,-0.54919,0.073658,1.767554,-0.554702,0.052406,1.716545,-0.560215,-0.050205,1.818563,-0.54919,0.052406,1.716545,-0.560215,0.001101,1.695417,-0.562499,-0.050205,1.818563,-0.54919,0.001101,1.695417,-0.562499,-0.050205,1.716545,-0.560215,-0.050205,1.818563,-0.54919,-0.050205,1.716545,-0.560215,-0.071457,1.767554,-0.554702,-0.050205,1.818563,-0.54919,0.052406,1.737063,-0.750058,0.001101,1.715935,-0.752342,0.052406,1.716545,-0.560215,0.052406,1.716545,-0.560215,0.001101,1.715935,-0.752342,0.001101,1.695417,-0.562499,0.001101,1.715935,-0.752342,-0.050205,1.737063,-0.750058,0.001101,1.695417,-0.562499,0.001101,1.695417,-0.562499,-0.050205,1.737063,-0.750058,-0.050205,1.716545,-0.560215,0.001101,1.86021,-0.736749,0.052406,1.839081,-0.739032,0.001101,1.839692,-0.546906,0.001101,1.839692,-0.546906,0.052406,1.839081,-0.739032,0.052406,1.818563,-0.54919,-0.050205,1.737063,-0.750058,-0.071457,1.788072,-0.744545,-0.050205,1.716545,-0.560215,-0.050205,1.716545,-0.560215,-0.071457,1.788072,-0.744545,-0.071457,1.767554,-0.554702,0.052406,1.839081,-0.739032,0.073658,1.788072,-0.744545,0.052406,1.818563,-0.54919,0.052406,1.818563,-0.54919,0.073658,1.788072,-0.744545,0.073658,1.767554,-0.554702,-0.071457,1.788072,-0.744545,-0.050205,1.839081,-0.739032,-0.071457,1.767554,-0.554702,-0.071457,1.767554,-0.554702,-0.050205,1.839081,-0.739032,-0.050205,1.818563,-0.54919,0.073658,1.788072,-0.744545,0.052406,1.737063,-0.750058,0.073658,1.767554,-0.554702,0.073658,1.767554,-0.554702,0.052406,1.737063,-0.750058,0.052406,1.716545,-0.560215,0.085825,1.872306,-0.735442,0.120918,1.788072,-0.744545,0.052406,1.839081,-0.739032,0.052406,1.839081,-0.739032,0.120918,1.788072,-0.744545,0.073658,1.788072,-0.744545,-0.083624,1.703838,-0.753649,-0.118718,1.788072,-0.744545,-0.050205,1.737063,-0.750058,-0.050205,1.737063,-0.750058,-0.118718,1.788072,-0.744545,-0.071457,1.788072,-0.744545,0.001101,1.907196,-0.731671,0.085825,1.872306,-0.735442,0.001101,1.86021,-0.736749,0.001101,1.86021,-0.736749,0.085825,1.872306,-0.735442,0.052406,1.839081,-0.739032,0.001101,1.668948,-0.75742,-0.083624,1.703838,-0.753649,0.001101,1.715935,-0.752342,0.001101,1.715935,-0.752342,-0.083624,1.703838,-0.753649,-0.050205,1.737063,-0.750058,0.085825,1.703838,-0.753649,0.001101,1.668948,-0.75742,0.052406,1.737063,-0.750058,0.052406,1.737063,-0.750058,0.001101,1.668948,-0.75742,0.001101,1.715935,-0.752342,-0.050205,1.839081,-0.739032,0.001101,1.86021,-0.736749,-0.050205,1.818563,-0.54919,-0.050205,1.818563,-0.54919,0.001101,1.86021,-0.736749,0.001101,1.839692,-0.546906,0.165919,1.76835,-0.54631,0.117645,1.652481,-0.558833,0.120918,1.788072,-0.744545,0.120918,1.788072,-0.744545,0.117645,1.652481,-0.558833,0.085825,1.703838,-0.753649,-0.115444,1.88422,-0.533787,-0.083624,1.872306,-0.735442,-0.163718,1.76835,-0.54631,-0.163718,1.76835,-0.54631,-0.083624,1.872306,-0.735442,-0.118718,1.788072,-0.744545,0.117645,1.88422,-0.533787,0.165919,1.76835,-0.54631,0.085825,1.872306,-0.735442,0.085825,1.872306,-0.735442,0.165919,1.76835,-0.54631,0.120918,1.788072,-0.744545,-0.163718,1.76835,-0.54631,-0.118718,1.788072,-0.744545,-0.115444,1.652481,-0.558833,-0.115444,1.652481,-0.558833,-0.118718,1.788072,-0.744545,-0.083624,1.703838,-0.753649,0.001101,1.932214,-0.5286,0.117645,1.88422,-0.533787,0.001101,1.907196,-0.731671,0.001101,1.907196,-0.731671,0.117645,1.88422,-0.533787,0.085825,1.872306,-0.735442,-0.115444,1.652481,-0.558833,-0.083624,1.703838,-0.753649,0.001101,1.604487,-0.56402,0.001101,1.604487,-0.56402,-0.083624,1.703838,-0.753649,0.001101,1.668948,-0.75742,0.117645,1.652481,-0.558833,0.001101,1.604487,-0.56402,0.085825,1.703838,-0.753649,0.085825,1.703838,-0.753649,0.001101,1.604487,-0.56402,0.001101,1.668948,-0.75742,-0.083624,1.872306,-0.735442,0.001101,1.907196,-0.731671,-0.050205,1.839081,-0.739032,-0.050205,1.839081,-0.739032,0.001101,1.907196,-0.731671,0.001101,1.86021,-0.736749,0.08531,1.673665,-0.437625,0.001101,1.638987,-0.441372,0.117645,1.652481,-0.558833,0.117645,1.652481,-0.558833,0.001101,1.638987,-0.441372,0.001101,1.604487,-0.56402,0.001101,1.875789,-0.41578,0.001101,1.932214,-0.5286,-0.083109,1.841109,-0.419528,-0.083109,1.841109,-0.419528,0.001101,1.932214,-0.5286,-0.115444,1.88422,-0.533787,0.12019,1.757387,-0.428576,0.08531,1.673665,-0.437625,0.165919,1.76835,-0.54631,0.165919,1.76835,-0.54631,0.08531,1.673665,-0.437625,0.117645,1.652481,-0.558833,-0.083109,1.841109,-0.419528,-0.115444,1.88422,-0.533787,-0.117989,1.757387,-0.428576,-0.117989,1.757387,-0.428576,-0.115444,1.88422,-0.533787,-0.163718,1.76835,-0.54631,0.08531,1.841109,-0.419528,0.12019,1.757387,-0.428576,0.117645,1.88422,-0.533787,0.117645,1.88422,-0.533787,0.12019,1.757387,-0.428576,0.165919,1.76835,-0.54631,-0.117989,1.757387,-0.428576,-0.163718,1.76835,-0.54631,-0.083109,1.673665,-0.437625,-0.083109,1.673665,-0.437625,-0.163718,1.76835,-0.54631,-0.115444,1.652481,-0.558833,0.001101,1.875789,-0.41578,0.08531,1.841109,-0.419528,0.001101,1.932214,-0.5286,0.001101,1.932214,-0.5286,0.08531,1.841109,-0.419528,0.117645,1.88422,-0.533787,-0.083109,1.673665,-0.437625,-0.115444,1.652481,-0.558833,0.001101,1.638987,-0.441372,0.001101,1.638987,-0.441372,-0.115444,1.652481,-0.558833,0.001101,1.604487,-0.56402,0.001101,1.932214,-0.5286,0.001101,1.907196,-0.731671,-0.115444,1.88422,-0.533787,-0.115444,1.88422,-0.533787,0.001101,1.907196,-0.731671,-0.083624,1.872306,-0.735442],\"uv\":[0.537939,0.932796,0.570722,0.837819,0.582088,0.932796,0.101686,0.252378,0.101686,0.348329,0.075223,0.305922,0.39965,0.998846,0.432432,0.903869,0.443797,0.998846,0.101686,0.348329,0.101686,0.444281,0.075223,0.401873,0.452512,0.880363,0.472365,0.822849,0.472365,0.937877,0.166833,0.881679,0.203515,0.837658,0.203515,0.987951,0.155192,0.945344,0.103316,0.945344,0.155192,0.795052,0.522638,0.958532,0.474712,0.934709,0.522638,0.795857,0.677023,0.978533,0.640341,0.934514,0.677023,0.828241,0.324409,0.875618,0.304557,0.818103,0.324409,0.760588,0.05235,0.521297,0.102158,0.503901,0.102158,0.726671,0.216641,0.614888,0.216641,0.837658,0.166833,0.632285,0.756563,0.662767,0.79222,0.652291,0.79222,0.872338,0.214081,0.221098,0.214081,0.441146,0.178424,0.231575,0.804574,0.434425,0.76785,0.434425,0.796049,0.220859,0.79294,0.651993,0.821144,0.438429,0.829664,0.651993,0.756563,0.866152,0.704687,0.866152,0.756563,0.652291,0.704354,0.652291,0.75623,0.438429,0.75623,0.65229,0.757927,0.213809,0.706051,0.213809,0.757927,0,0.587747,0.615131,0.587747,0.837819,0.537939,0.632533,0,0.769677,0.03563,0.759041,0.03563,0.979221,0.827849,0.652291,0.827849,0.87247,0.79222,0.662927,0.757927,0.007272,0.794133,0,0.794133,0.216707,0.75623,0.652163,0.786039,0.438429,0.79294,0.652163,0.324409,0.998067,0.357192,0.90309,0.368558,0.998067,0.472365,0.726898,0.472365,0.822849,0.445902,0.780443,0.244303,0.837658,0.244303,0.940461,0.203515,0.857933,0.324409,0.472734,0.324409,0.568685,0.297946,0.526278,0.593984,1,0.626766,0.905023,0.638131,1,0.324409,0.664638,0.324409,0.760588,0.297946,0.718181,0.246719,0.99809,0.279501,0.903112,0.290867,0.99809,0.324409,0.568685,0.324409,0.664638,0.297946,0.62223,0.833008,0.87247,0.833008,0.975272,0.79222,0.892745,0.246719,0.727162,0.246719,0.823112,0.220256,0.780705,0.05235,0.744078,0.102157,0.726671,0.102157,0.94932,0.715974,0.434629,0.767849,0.220859,0.76785,0.434629,0.39965,0.522749,0.471889,0.472734,0.471889,0.726898,0.640341,0.47532,0.640341,0.729484,0.587824,0.51168,0.474712,0.425298,0.546933,0.220859,0.546933,0.47532,0.599435,0.220859,0.599436,0.47532,0.546933,0.438955,0.221156,0.221098,0.103316,0.221098,0.203607,0,0.399649,0.220859,0.39965,0.472592,0.324409,0.27001,0.221156,0.220859,0.238704,0,0.338995,0.220859,0.075223,0.252378,0.075223,0.503901,0,0.45471,0.324409,0.52305,0.39642,0.472592,0.39642,0.727732,0.05235,0.503901,0.05235,0.759041,0,0.540582,0.221156,0.676719,0.293212,0.472734,0.293212,0.727162,0.651818,0.220859,0.651818,0.475287,0.599436,0.438617,0.221156,0.289007,0.324409,0.220859,0.324409,0.472734,0.474712,0.220859,0.474712,0.472734,0.39965,0.2704,0.756563,0.866152,0.756563,0.968955,0.715775,0.886428,0.397408,0.727732,0.397408,0.823683,0.370945,0.781277,0.514693,0.068239,0.578066,0,0.578066,0.181245,0.426703,0,0.426703,0.181245,0.338995,0.09444,0.474712,0.727421,0.537939,0.615131,0.537939,0.795857,0.474712,0.615131,0.570141,0.47532,0.587824,0.615131,0.246719,0.773216,0.293212,0.727162,0.293212,0.903112,0.704687,0.652291,0.704687,0.828241,0.640341,0.71603,0.324409,0.857119,0.370945,0.727732,0.370945,0.90309,0.706051,0,0.706051,0.175358,0.641645,0.111734,0.103316,0.682934,0.166833,0.614888,0.166833,0.795052,0.215313,0.614888,0.103316,0.494907,0.215313,0.473476,0.578066,0.112415,0.641645,0,0.641645,0.180379,0.514693,0,0.514694,0.180379,0.426703,0.086318,0.593984,0.77569,0.640341,0.729484,0.640341,0.905023,0.715974,0.220859,0.715974,0.396398,0.651818,0.284806,0.39965,0.857464,0.445902,0.726898,0.445902,0.903869,0.704354,0.47532,0.704354,0.652291,0.640341,0.588068,0,0.184366,0.103316,0,0.103316,0.252378,0.178424,0.221098,0.178424,0.473476,0.103316,0.424033],\"normal\":[0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,-0.7071,0.703,0.076,-0.3827,0.9185,0.0993,-0.7071,0.703,0.076,-0.7071,0.703,0.076,-0.3827,0.9185,0.0993,-0.3827,0.9185,0.0993,0.3827,0.9185,0.0993,0.7071,0.703,0.076,0.3827,0.9185,0.0993,0.3827,0.9185,0.0993,0.7071,0.703,0.076,0.7071,0.703,0.076,-0.3827,-0.9185,-0.0993,-0.7071,-0.703,-0.076,-0.3827,-0.9185,-0.0993,-0.3827,-0.9185,-0.0993,-0.7071,-0.703,-0.076,-0.7071,-0.703,-0.076,0.7071,0.703,0.076,1,0,0,0.7071,0.703,0.076,0.7071,0.703,0.076,1,0,0,1,0,0,-0.7071,-0.703,-0.076,-1,0,0,-0.7071,-0.703,-0.076,-0.7071,-0.703,-0.076,-1,0,0,-1,0,0,1,0,0,0.7071,-0.703,-0.076,1,0,0,1,0,0,0.7071,-0.703,-0.076,0.7071,-0.703,-0.076,-1,0,0,-0.7071,0.703,0.076,-1,0,0,-1,0,0,-0.7071,0.703,0.076,-0.7071,0.703,0.076,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1075,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0.7071,-0.703,-0.076,0.3827,-0.9185,-0.0993,0.7071,-0.703,-0.076,0.7071,-0.703,-0.076,0.3827,-0.9185,-0.0993,0.3827,-0.9185,-0.0993,0.9754,0.0255,-0.2189,0.6915,-0.6626,-0.2876,0.9754,0.0215,-0.2193,0.9754,0.0215,-0.2193,0.6915,-0.6626,-0.2876,0.6895,-0.6646,-0.2878,-0.6879,0.71,-0.1505,-0.6899,0.708,-0.1507,-0.9754,0.0255,-0.2189,-0.9754,0.0255,-0.2189,-0.6899,0.708,-0.1507,-0.9754,0.0215,-0.2193,0.6879,0.71,-0.1505,0.9754,0.0255,-0.2189,0.6899,0.708,-0.1507,0.6899,0.708,-0.1507,0.9754,0.0255,-0.2189,0.9754,0.0215,-0.2193,-0.9754,0.0255,-0.2189,-0.9754,0.0215,-0.2193,-0.6915,-0.6626,-0.2876,-0.6915,-0.6626,-0.2876,-0.9754,0.0215,-0.2193,-0.6895,-0.6646,-0.2878,0.374,0.9205,-0.1134,0.6879,0.71,-0.1505,0.374,0.9205,-0.1134,0.374,0.9205,-0.1134,0.6879,0.71,-0.1505,0.6899,0.708,-0.1507,-0.6915,-0.6626,-0.2876,-0.6895,-0.6646,-0.2878,-0.3752,-0.8794,-0.2931,-0.3752,-0.8794,-0.2931,-0.6895,-0.6646,-0.2878,-0.3752,-0.8794,-0.2931,0.6915,-0.6626,-0.2876,0.3752,-0.8794,-0.2931,0.6895,-0.6646,-0.2878,0.6895,-0.6646,-0.2878,0.3752,-0.8794,-0.2931,0.3752,-0.8794,-0.2931,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0,0.1074,-0.9942,0.6589,-0.6912,0.2966,0.3588,-0.8985,0.2528,0.6558,-0.6944,0.2963,0.6558,-0.6944,0.2963,0.3588,-0.8985,0.2528,0.3588,-0.8985,0.2528,-0.3619,0.8337,0.417,-0.3619,0.8337,0.417,-0.66,0.6219,0.4214,-0.66,0.6219,0.4214,-0.3619,0.8337,0.417,-0.6632,0.6187,0.4211,0.9327,-0.0352,0.359,0.6589,-0.6913,0.2966,0.9327,-0.0415,0.3583,0.9327,-0.0415,0.3583,0.659,-0.6912,0.2966,0.6558,-0.6944,0.2963,-0.66,0.6219,0.4214,-0.6632,0.6187,0.4211,-0.9327,-0.0352,0.359,-0.9327,-0.0352,0.359,-0.6632,0.6187,0.4211,-0.9326,-0.0415,0.3584,0.66,0.6219,0.4214,0.9327,-0.0352,0.359,0.6632,0.6187,0.4211,0.6632,0.6187,0.4211,0.9327,-0.0352,0.359,0.9327,-0.0415,0.3583,-0.9327,-0.0352,0.359,-0.9326,-0.0415,0.3584,-0.6589,-0.6913,0.2966,-0.659,-0.6912,0.2966,-0.9326,-0.0415,0.3584,-0.6558,-0.6944,0.2963,0.3619,0.8337,0.417,0.66,0.6219,0.4214,0.3619,0.8337,0.417,0.3619,0.8337,0.417,0.66,0.6219,0.4214,0.6632,0.6187,0.4211,-0.6589,-0.6912,0.2966,-0.6558,-0.6944,0.2963,-0.3588,-0.8985,0.2528,-0.3588,-0.8985,0.2528,-0.6558,-0.6944,0.2963,-0.3588,-0.8985,0.2528,-0.374,0.9205,-0.1134,-0.374,0.9205,-0.1134,-0.6879,0.71,-0.1505,-0.6879,0.71,-0.1505,-0.374,0.9205,-0.1134,-0.6899,0.708,-0.1507]}"); //这里不用理解，就是直接在js 里 执行 main（）而已，不能像原来那样在index.html onload来执行 ，注意。

exports.rotatingItem = rotatingItem;
setTimeout(function () {
  console.log("AirStrike Alert!");
  main();
}, 100);

function main() {
  /******************************
   * WebGL canvas acquisition
   ******************************/
  var canvas = document.querySelector('#glcanvas');
  var gl = canvas.getContext('webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  var shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  /* Program Info is a structure where the information of the shader program
   * as well as locations of its attributes and uniforms */
  // ProgramInfo for objects that emits light (no reflection)

  var ProgramInfo = GenerateProgramInfo(gl, shaderProgram);
  var ModelBufferCollection = (0, _ModelsManager.getModelBufferCollection)(gl);
  var TextureCollection = (0, _ModelsManager.GetTextureCollection)(gl);
  var Objects = (0, _ObjectTrees.ObjectTrees)(ModelBufferCollection, TextureCollection); // console.log(ModelBufferCollection);

  var then = 0;

  function render(now) {
    now *= 0.001; // convert to seconds

    var deltaTime = now - then;
    then = now; // console.log(lookAtX);
    // doMotion(Objects, deltaTime);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    (0, _DrawGenericObjects.Draw)(gl, ProgramInfo, Objects);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
/******************************
 * Shader Program Initializer
 ******************************/


function initShaderProgram(gl, vsSource, fsSource_sun) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource_sun); // Create the shader program

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram); // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;

  function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}

function GenerateProgramInfo(gl, webGLPrograms) {
  var programInfo = {
    program: webGLPrograms,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(webGLPrograms, 'aVertexPosition'),
      normalPosition: gl.getAttribLocation(webGLPrograms, 'aNormal'),
      textureCoordPosition: gl.getAttribLocation(webGLPrograms, 'aTextureCoord')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(webGLPrograms, 'uProjectionMatrix'),
      ViewMatrix: gl.getUniformLocation(webGLPrograms, 'uViewMatrix'),
      ModelMatrix: gl.getUniformLocation(webGLPrograms, 'uModelMatrix'),
      Sampler: gl.getUniformLocation(webGLPrograms, 'uSampler')
    }
  };
  return programInfo;
}
},{"fs":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/_empty.js","./ModelsManager.js":"ModelsManager.js","./DrawGenericObjects.js":"DrawGenericObjects.js","./ObjectTrees":"ObjectTrees.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59574" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","MainFunction.js"], null)
//# sourceMappingURL=/MainFunction.1c995849.map