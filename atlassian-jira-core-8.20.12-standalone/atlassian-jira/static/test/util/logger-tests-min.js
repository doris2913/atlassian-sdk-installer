AJS.test.require(["jira.webresources:jira-logger"],function(){"use strict";var e=require("underscore");module("jira/util/logger - logging to console",{setup:function(){this.context=AJS.test.mockableModuleContext(),this.originalConsole=window.console},fakeWith:function(){var o=Array.prototype.slice.call(arguments),r={};return e.each(o,function(e){r[e]=this.spy()}.bind(this)),r},teardown:function(){window.console=this.originalConsole}}),test("when console is available",function(){var e=this.fakeWith("log","info","warn","error","debug");window.console=e;var o=this.context.require("jira/util/logger");o.log("a simple message"),o.log(1,2,3),o.info("informational messages","are","awesome"),o.warn("THIS IS SPARTAAA!",o.warn),o.error(o,"not an error"),o.error(void 0,"also not an error"),o.debug("a debug message",o),o.log("whee"),equal(e.log.callCount,3),equal(e.info.callCount,1),equal(e.warn.callCount,1),equal(e.error.callCount,2),equal(e.debug.callCount,1)}),test("when console is not immediately available (i.e., in IE8, 9, and 10)",function(){var e=this.fakeWith("log","info","warn","error","debug");delete window.console,window.console=void 0;var o=this.context.require("jira/util/logger");o.log("a simple message"),o.log(1,2,3),o.info("informational messages","are","awesome"),o.warn("THIS IS SPARTAAA!",o.warn),o.error(o,"not an error"),window.console=e,o.error(void 0,"also not an error"),o.debug("a debug message",o),o.log("whee"),equal(e.log.callCount,1),equal(e.info.callCount,0),equal(e.warn.callCount,0),equal(e.error.callCount,1),equal(e.debug.callCount,1)})});