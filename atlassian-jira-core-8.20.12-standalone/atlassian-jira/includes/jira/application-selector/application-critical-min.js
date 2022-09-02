define("jira/admin/application-selector/application-critical",["jira/admin/application-selector/application","underscore"],function(i,n){"use strict";return i.extend({ui:n.extend({},i.prototype.ui,{criticalWarning:".application-warning"}),getApplicationKey:function(){return this.ui.criticalWarning.data("key")},isDisabled:function(){return this.ui.label.hasClass("disabled")},setDisabled:function(i){return this.ui.label.toggleClass("disabled",i),this},isIndeterminateButNotEffective:function(){return!1},onIndeterminateChange:function(i){this.ui.criticalWarning.toggleClass("effective",i.indeterminate),this.setDisabled(i.indeterminate)},onInlineWarningChange:function(i){this.ui.criticalWarning.attr("aria-controls",i.controls)},_getNonIndeterminateWarningId:function(){return this.ui.criticalWarning.data("warningId")},isSelected:function(){return!1},setSelected:function(){}})});