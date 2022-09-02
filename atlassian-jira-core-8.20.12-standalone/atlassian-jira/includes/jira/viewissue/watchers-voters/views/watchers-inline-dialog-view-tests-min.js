AJS.test.require(["jira.webresources:viewissue-watchers-and-voters"],function(){"use strict";require(["jquery","jira/viewissue/watchers-voters/views/watchers-inline-dialog-view"],function(e,t){module("WatchersInlineDialogView",{setup:function(){e("body").append('<div id="#watching-toggle"></div> <div class=".icon"></div>'),this.$el=e('<div id="inline-dialog-watchers"><div class="aui-inline-dialog-contents"></div></div>'),this.el=this.$el.get(0),this.watcher=new t({el:this.el})}}),test("When cancel is triggered it should hide the dialog",function(){this.watcher.contents('<div class="cancel"></div>'),this.el.setAttribute("open",""),this.$el.find(".cancel").click(),ok(!1===this.watcher.el.hasAttribute("open"),"After hide is called AUI Inline Dialog open property should be false")}),test("When show is called it should change the open property to true",function(){this.el.removeAttribute("open"),this.watcher.show(),ok(!0===this.watcher.el.hasAttribute("open"),"AUI Inline Dialog open property should be true")}),test("When hide is called it should change the open property to false",function(){this.el.setAttribute("open",""),this.watcher.hide(),ok(!1===this.el.hasAttribute("open"),"AUI Inline Dialog open property should be false")})})});