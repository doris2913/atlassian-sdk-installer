AJS.test.require(["jira.webresources:application-role-labels"],function(){"use strict";require(["jquery","jira/admin/application/application-role-labels","jira/admin/application/group-labels-store"],function(e,t,a){function n(e,t,a){return{title:e,text:t,type:a}}function l(t,a){var n=new e.Deferred;return this.sandbox.stub(t,a,n.resolve.bind(n)),n}module("ApplicationRoleLabels tests",{setup:function(){this.context=AJS.test.mockableModuleContext(),this.sandbox=sinon.sandbox.create()},teardown:function(){this.sandbox.restore()}}),asyncTest("sync labels called after attach",function(n){expect(6);var o=e("#qunit-fixture"),r=l.call(this,a,"syncLabels"),i=l.call(this,a,"removeHandler"),s=l.call(this,a,"fetchLabels"),u=new t;e(u).attr("data-role-key","role1").attr("data-group-name","group1").appendTo(o),r.then(function(t,a,l){n.ok(void 0!==e(u).attr("resolved"),"component was processed by skate"),n.equal(t,"group1"),n.equal(a,"role1"),n.deepEqual(l,u.syncLabelsHandler),e(u).remove(),i.then(function(e){n.deepEqual(e,u.syncLabelsHandler,"removeCalled called with proper arguments")}),s.then(function(){start(),ok("fetch called on detach")})})}),test("updateLabels takes only MULTIPLE and ADMIN",function(){var a=new t;a.updateLabels([n("Admin","admin","ADMIN"),n("Foo","foo","FOO"),n("Multi","multi","MULTIPLE"),n("Multi","multi","multiple")]);var l=e(a.innerHTML).map(function(e,t){return t.title}).toArray();deepEqual(l,["Admin","Multi"])})})});