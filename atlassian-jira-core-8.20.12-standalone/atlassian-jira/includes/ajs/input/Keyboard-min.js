define("jira/ajs/input/keyboard",["jira/util/navigator"],function(e){"use strict";function r(e,r,t){return f[r]=e,a[e]=r,t&&(u[r]=!0),e}function t(e){return e.originalEvent||e}function n(e){var r=t(e);return null==r.which?r.keyCode:0!==r.which&&0!==r.charCode?r.which:null}function i(r){r=t(r);var i=s.specialKeyEntered(r);if(i)return i;if(e.isMozilla()){if("keypress"===r.type){var o=n(r);if(null!==o)return String.fromCharCode(o).toLowerCase()}}else if("keypress"!==r.type)return String.fromCharCode(r.keyCode).toLowerCase()}function o(e){return e+"+"}var f={},a={},u={},s={},c=s.SpecialKey={BACKSPACE:r("backspace",8,!0),TAB:r("tab",9,!0),RETURN:r("return",13,!0),SHIFT:r("shift",16),CTRL:r("ctrl",17),ALT:r("alt",18),PAUSE:r("pause",19),CAPS_LOCK:r("capslock",20),ESC:r("esc",27,!0),SPACE:r("space",32,!0),PAGE_UP:r("pageup",33),PAGE_DOWN:r("pagedown",34),END:r("end",35),HOME:r("home",36),LEFT:r("left",37),UP:r("up",38),RIGHT:r("right",39),DOWN:r("down",40),INSERT:r("insert",45),DELETE:r("del",46),F1:r("f1",112),F2:r("f2",113),F3:r("f3",114),F4:r("f4",115),F5:r("f5",116),F6:r("f6",117),F7:r("f7",118),F8:r("f8",119),F9:r("f9",120),F10:r("f10",121),F11:r("f11",122),F12:r("f12",123),NUMLOCK:r("numlock",144),SCROLL:r("scroll",145),META:r("meta",224)};return c.eventType=function(){return e.isMozilla()?"keypress":"keydown"},c.fromKeyCode=function(e){return f[e]},c.toKeyCode=function(e){return a[e]},c.isAscii=function(e){return!!u[e]},c.isSpecialKey=function(e){return!!c.toKeyCode(e)},s.characterEntered=function(e){var r=t(e);if("keypress"===r.type){var i=n(r);if(null!==i&&(!c.isAscii(i)||c.fromKeyCode(i)===c.SPACE))return String.fromCharCode(i)}},s.specialKeyEntered=function(r){if(r=t(r),e.isMozilla()){if("keypress"===r.type){var i=n(r);if(null===i)return c.fromKeyCode(r.keyCode);if(c.isAscii(i))return c.fromKeyCode(i)}}else if("keypress"!==r.type)return c.fromKeyCode(r.keyCode)},s.shortcutEntered=function(e){if(e=t(e),e.type===c.eventType()){var r=s.specialKeyEntered(e),n="";if(e.altKey&&r!==c.ALT&&(n+=o(c.ALT)),e.ctrlKey&&r!==c.CTRL&&(n+=o(c.CTRL)),e.metaKey&&!e.ctrlKey&&r!==c.META&&(n+=o(c.META)),e.shiftKey&&r!==c.SHIFT&&(n+=o(c.SHIFT)),r)return n+r;if(n.length>0&&"shift+"!==n){var f=i(e);if(f)return n+f}}},s}),AJS.namespace("JIRA.Keyboard",null,require("jira/ajs/input/keyboard"));