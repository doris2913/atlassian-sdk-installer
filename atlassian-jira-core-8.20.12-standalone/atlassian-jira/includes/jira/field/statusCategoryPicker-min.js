define("jira/field/status-category-single-select",["jira/ajs/select/single-select","jquery"],function(e,t){"use strict";function s(e){var s,i=t();return e&&e.model&&(s=t.extend({},e.model().data()),delete s.descriptor,i=t(JIRA.Template.Util.Issue.Status.issueStatus({issueStatus:{name:e.label(),statusCategory:s},isCompact:!0})).removeClass("jira-issue-status-lozenge-tooltip").removeAttr("title").removeAttr("data-tooltip")),i}return e.extend({_hasIcon:function(){return this.$field.val()&&this.$field.val()!==this.model.placeholder},setSelection:function(e){this._super(e),this.$container.find(".fake-ss-icon").remove(),this.$container.append(s(e).addClass("fake-ss-icon aui-ss-entity-icon"))},init:function(e){this._super(e);var t=this.listController._renders.suggestion;this.listController._renders.suggestion=function(e){var i=t.apply(this,arguments);return i.find("a").prepend("&nbsp;").prepend(s(e)),i}},_renders:{entityIcon:function(){return t()}}})}),AJS.namespace("JIRA.StatusCategorySingleSelect",null,require("jira/field/status-category-single-select"));