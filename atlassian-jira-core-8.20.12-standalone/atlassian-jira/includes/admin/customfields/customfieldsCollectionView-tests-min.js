AJS.test.require(["jira.webresources:viewcustomfields"],function(){"use strict";var s=require("jira/customfields/customfieldCollectionView"),e=require("jira/analytics");module("CustomfieldsCollectionView",{setup:function(){this.sandbox=sinon.sandbox.create(),this.sandbox.spy(e,"send")},teardown:function(){this.sandbox.restore()}}),test("Sends analytics event",function(){var n=new s,t=n.sendSortingAnalyticsEvent;t("issues","ascending"),deepEqual(e.send.lastCall.args[0],{name:"administration.customfields.sorted",properties:{sortColumn:"issues",sortOrder:"ascending"}},"Sends strings"),t(null,""),deepEqual(e.send.lastCall.args[0],{name:"administration.customfields.sorted",properties:{sortColumn:"none",sortOrder:"none"}},"Handles falsy values")})});