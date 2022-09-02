AJS.test.require(["jira.webresources:viewcustomfields"],function(){"use strict";var e=require("jira/customfields/customfieldsFilterView"),s=require("jira/analytics");module("CustomfieldsFilterView",{setup:function(){this.sandbox=sinon.sandbox.create(),this.sandbox.spy(s,"send")},teardown:function(){this.sandbox.restore()}}),test("Sends analytics event",function(){var t=new e,a=t.sendAnalyticsFilterEvent;a("projectIds",["1",2]),deepEqual(s.send.lastCall.args[0],{name:"admin.customfields.filter.projects",properties:{values:["1",2]}},"Handles project filter with numeric and number values"),a("types",[]),deepEqual(s.send.lastCall.args[0],{name:"admin.customfields.filter.types",properties:{values:[]}},"Handles types filter with empty array of values"),a("screenIds"),deepEqual(s.send.lastCall.args[0],{name:"admin.customfields.filter.screens",properties:{values:[]}},"Handles screens filter with falsy values"),a("lastValueUpdate",["1234"]),deepEqual(s.send.lastCall.args[0],{name:"admin.customfields.filter.lastvalueupdate",properties:{values:["1234"]}},"Handles last value update filter")})});