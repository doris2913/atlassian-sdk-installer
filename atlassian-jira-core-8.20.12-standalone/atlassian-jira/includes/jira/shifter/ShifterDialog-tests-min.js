AJS.test.require(["jira.webresources:shifter"],function(){"use strict";var e,i=require("jira/shifter/shifter-dialog"),r=require("jira/shifter/shifter-analytics"),t=require("jquery"),s=require("jira/jquery/deferred"),n=sinon.assert;module("ShifterDialog",{setup:function(){this.sandbox=sinon.sandbox.create(),this.sandbox.useFakeTimers(),this.sandbox.stub(r,"selection"),e=new i("shifter-dialog",[{id:"group-id",name:"name",weight:1,getSuggestions:function(){var e=s();return e.resolve([{label:"label",value:"value"}]),e.promise()},onSelection:sinon.stub()}],{maxResultsDisplayedPerGroup:5}),this.sandbox.clock.tick(1e3)},teardown:function(){e.destroy(),t("#shifter-dialog").remove(),this.sandbox.restore()}}),test("should trigger analytics event on selection",function(){var i=t.Event("keydown");i.which=i.keyCode=AJS.keyCode.ENTER,e.$dialog.find("input").trigger(i),n.calledOnce(r.selection),n.calledWith(r.selection,"label","value","group-id")})});