define("jira/customfields/customfieldRowView",["jira/marionette-4.1","jira/featureflags/feature-manager"],function(e,t){"use strict";return e.View.extend({tagName:"tr",triggers:{"click .customfield-delete-trigger":"delete:click"},attributes:function(){return{"data-custom-field-id":this.model.get("numericId")}},events:{"change .customfield-checkbox":"onCheckboxChange"},initialize:function(){this.listenTo(this.model,"change:isSelected",this.onIsSelectedChange.bind(this))},template:function(e){return JIRA.Templates.Admin.Customfields.customfield({multiLingual:e.multiLingual,customfield:e,showUsageData:t.isFeatureEnabled("jira.customfields.cleanup.identification"),showBulkCheckbox:t.isFeatureEnabled("jira.customfields.bulk.delete"),useDeleteDialog:t.isFeatureEnabled("jira.customfields.bulk.delete")})},templateContext:function(){return{multiLingual:this.getOption("isMultiLingual")}},onCheckboxChange:function(){this.model.set("isSelected",!this.model.get("isSelected")),this.trigger("checkbox:change")},onIsSelectedChange:function(){this.model.get("isSelected")?(this.$el.find(".customfield-checkbox").prop("checked",!0),this.$el.addClass("customfield-highlight")):(this.$el.find(".customfield-checkbox").prop("checked",!1),this.$el.removeClass("customfield-highlight"))}})});