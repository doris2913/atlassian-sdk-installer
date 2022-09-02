AJS.test.require(["jira.webresources:avatar-picker"],function(){"use strict";var t=require("jira/ajs/avatarpicker/avatar-store"),e=require("jira/util/urls");module("JIRA.AvatarStore",{teardown:function(){this.sandbox.restore()},setup:function(){this.sandbox=sinon.sandbox.create()}}),test("buildCompleteUrl should work for URLs with or without query params",function(){this.sandbox.stub(e,"atl_token").returns("TOKEN");var r="http://localhost:8090/jira/rest/api/latest/project/HSP-1",a=new t({restQueryUrl:"blah",restCreateTempUrl:"blah",restUpdateTempUrl:"blah",defaultAvatarId:1e3});equal(a._buildCompleteUrl(r),"http://localhost:8090/jira/rest/api/latest/project/HSP-1?atl_token=TOKEN","URL for project avatar"),r="http://localhost:8090/jira/rest/api/latest/user";var s=new t({restQueryUrl:"blah",restCreateTempUrl:"blah",restUpdateTempUrl:"blah",restParams:{username:"fred"},defaultAvatarId:1e3});equal(s._buildCompleteUrl(r),"http://localhost:8090/jira/rest/api/latest/user?username=fred&atl_token=TOKEN","URL for user avatar")})});