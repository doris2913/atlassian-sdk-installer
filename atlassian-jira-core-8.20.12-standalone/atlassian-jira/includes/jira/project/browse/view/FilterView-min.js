define("jira/project/browse/filterview",["underscore","jira/marionette-4.1","jira/util/data/meta"],function(e,t,n){"use strict";return t.View.extend({template:JIRA.Templates.Project.Browse.filter,ui:{contains:".text"},events:{"change @ui.contains":"inputContains","keydown @ui.contains":"inputContains","submit form":"formSubmit"},modelEvents:{"change:category":"render","change:projectType":"render"},templateContext:function(){return{isAdminMode:n.get("in-admin-mode")}},inputContains:e.debounce(function(){var e=this.ui.contains.val();this.model.set("contains",e)},300),formSubmit:function(e){e.preventDefault()}})});