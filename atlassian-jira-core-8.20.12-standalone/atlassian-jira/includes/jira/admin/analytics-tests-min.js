AJS.test.require(["jira.webresources:jira-events","jira.webresources:ajs-underscorejs-amd-shim","jira.webresources:jira-admin-analytics"],function(){"use strict";var e=require("jquery"),t=require("underscore"),i=require("jira/util/events");module("admin/analytics",{setup:function(){this.sendSpy=sinon.spy(),this.context=AJS.test.mockableModuleContext(),this.context.mock("jira/analytics",{send:this.sendSpy}),this.context.require("jira/admin/analytics").bindEvents()},createClickAssert:function(e,t,i){this.createAndClick(e),this.assertEvent(t,i)},createAndClick:function(t,i){var o=e(t);i=i||"#qunit-fixture",o.appendTo(i),o.click()},assertEvent:function(e,i){ok(this.sendSpy.calledOnce,"Event added only once");var o=this.sendSpy.args[0][0];equal(o.name,e,"Check event name"),i&&t.each(i,function(e,t){equal(o.properties[t],e,"Check property '"+t+"'")}),this.sendSpy.reset()}}),test("Select workflow edit/view mode",function(){this.createClickAssert("<a class='workflow-view-toggle' data-mode='diagram' href='#'></a>","administration.workflow.selectmode",{mode:"diagram",edit:!1}),this.createClickAssert("<a class='workflow-view-toggle' data-mode='text' href='#'></a>","administration.workflow.selectmode",{mode:"text",edit:!1}),this.createClickAssert("<a class='workflow-edit-toggle' data-mode='diagram' href='#'></a>","administration.workflow.selectmode",{mode:"diagram",edit:!0}),this.createClickAssert("<a class='workflow-edit-toggle' data-mode='text' href='#'></a>","administration.workflow.selectmode",{mode:"text",edit:!0})}),test("Edit workflow in text mode",function(){function e(e,i,o){t.createClickAssert("<a id='"+e+"' href='#'></a>","administration.workflow.edit",{mode:"text",action:i,object:o})}var t=this;e("workflow-step-add-submit","add","step"),e("workflow-step-update","update","step"),e("workflow-step-delete","remove","step"),e("workflow-transition-add","add","transition"),e("workflow-transition-update","update","transition"),e("workflow-transition-delete","remove","transition"),e("workflow-global-transition-update","update","globaltransition")}),test("Edit workflow in diagram mode",function(){function e(e,o){i.trigger("wfd-edit-action",{action:e,object:o}),t.assertEvent("administration.workflow.edit",{mode:"diagram",action:e,object:o})}var t=this;e("add","status"),e("update","status"),e("remove","status"),e("add","step"),e("remove","step"),e("add","transition"),e("update","transition"),e("remove","transition"),e("add","globaltransition"),e("update","globaltransition"),e("remove","globaltransition")}),test("View workflow on workflow scheme edit page",function(){var t=e("<div id='workflowscheme-editor'></div>");t.appendTo("#qunit-fixture"),this.createAndClick("<a class='workflow-text-view' href='#'></a>",t),this.assertEvent("administration.workflowscheme.viewworkflow",{mode:"text"}),this.createAndClick("<a class='workflow-diagram-view' href='#'></a>",t),this.assertEvent("administration.workflowscheme.viewworkflow",{mode:"diagram"})}),test("View workflow as text on project workflows page",function(){this.createClickAssert("<a class='project-config-workflow-text-link' href='#'></a>","administration.projectconfig.workflow.viewastext")})});