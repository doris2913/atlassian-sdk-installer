function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}AJS.test.require(["jira.webresources:jquery-plugin-shortener"],function(){"use strict";function e(){return document.querySelectorAll("br")}function t(){return document.querySelectorAll(".shortener-expand")}function n(){return document.querySelector(".shortener-expand")}function r(){var e=document.createElement("div");e.classList.add("shorten"),[].concat(_toConsumableArray(Array(5))).map(function(){return e.appendChild(document.createElement("span"))}),[].concat(_toConsumableArray(Array(5))).map(function(){return e.appendChild(document.createElement("a"))});var t=document.createElement("a");return t.classList.add("shortener-expand"),e.appendChild(t),e}var o=require("jira/ajs/shorten/shortener"),u=void 0;module("Shortener",{setup:function(){u=r(),document.querySelector("#qunit-fixture").appendChild(u),document.querySelector("#qunit-fixture").style.top="auto",document.querySelector("#qunit-fixture").style.left="auto"},teardown:function(){u.remove()}}),test("should render only one expand button when called multiple times",function(){new o({element:u}),equal(t().length,1,"short expand"),equal(e().length,1,"br"),new o({element:n()}),equal(t().length,1,"short expand"),equal(e().length,1,"br")}),test("should show proper count of hidden items when called multiple times",function(){new o({element:u}),equal(document.querySelector(".shortener-expand").textContent,"(9)","short expand"),new o({element:n()}),equal(document.querySelector(".shortener-expand").textContent,"(9)","short expand")})});