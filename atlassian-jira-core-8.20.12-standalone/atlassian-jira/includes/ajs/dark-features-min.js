var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};define("jira/ajs/dark-features",["jira/util/data/meta"],function(e){"use strict";for(var t=function(){try{var t=JSON.parse(e.get("enabled-dark-features"));if("object"===(void 0===t?"undefined":_typeof(t)))return t}catch(e){}return[]}(),r={},n=0,o=t.length;n<o;n++)r[t[n]]=!0;return{isEnabled:function(e){return!!r[e]},enable:function(e){e&&!r[e]&&(r[e]=!0)},disable:function(e){e&&r[e]&&delete r[e]}}}),AJS.namespace("AJS.DarkFeatures",null,require("jira/ajs/dark-features"));