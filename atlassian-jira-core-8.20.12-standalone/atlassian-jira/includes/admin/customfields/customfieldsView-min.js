define("jira/customfields/customfieldsView",["jquery","jira/marionette-4.1","jira/dialog/error-dialog","jira/featureflags/feature-manager","jira/message","jira/customfields/customfieldsCollection","jira/customfields/customfieldCollectionView","jira/customfields/customfieldDeleteDialog","jira/customfields/customfieldsFilterView","jira/customfields/customfieldsPaginationDetailsView","jira/customfields/customfieldsPaginationView","jira/customfields/customfieldsRecalculationDetailsView"],function(e,i,t,s,o,l,n,a,c,r,d,u){"use strict";return i.View.extend({template:JIRA.Templates.Admin.Customfields.customfieldsPageContent,getTemplate:function(){return this.collection.length?this.template:JIRA.Templates.Admin.Customfields.customfieldsEmptyPageContent},ui:{table:"#custom-fields-table",filters:"#custom-fields-filter",pagination:"#pagination-container",paginationDetails:"#pagination-details",recalculationDetails:"#recalculation-details",deleteDialog:"#customfield-delete-dialog-wrapper"},regions:{customfields:{el:"@ui.table",replaceElement:!0},filters:{el:"@ui.filters"},pagination:"@ui.pagination",paginationDetails:"@ui.paginationDetails",recalculationDetails:"@ui.recalculationDetails",deleteDialog:"@ui.deleteDialog"},childViewEvents:{"navigate:start":"onNavigationStart","navigate:end":"onNavigationEnd","navigate:error":"handleErrorResponse","search:start":"onNavigationStart","search:end":"onNavigationEnd","sort:start":"onNavigationStart","sort:end":"onNavigationEnd","delete:refresh":"refreshListAfterDelete","customfield:delete:click":"onCustomfieldDeleteClick","customfield:checkbox:change":"onCustomfieldCheckboxChange","bulk:checkbox:change":"onBulkCheckboxChange","bulk:deleteButton:click":"onBulkDeleteClick"},initialize:function(){this.collection=new l,this.fetchData().done(this.render.bind(this)).fail(this.handleErrorResponse.bind(this))},onRender:function(){this.collection.length&&(this.showChildView("customfields",new n({collection:this.collection})),this.showChildView("filters",new c({collection:this.collection})),this.showChildView("pagination",new d({collection:this.collection})),this.showChildView("paginationDetails",new r({collection:this.collection})),s.isFeatureEnabled("jira.customfields.cleanup.identification")&&this.showChildView("recalculationDetails",new u),s.isFeatureEnabled("jira.customfields.bulk.delete")&&this.showChildView("deleteDialog",new a({collection:this.collection})),this.updateBulkHeader(),this.initTooltips())},onNavigationStart:function(){this.displayLoadingIndicator()},onNavigationEnd:function(){this.updateBulkHeader(),this.hideBulkHeader(),this.hideLoadingIndicator()},onCustomfieldCheckboxChange:function(){var e=this.collection.where({isSelected:!0}).length;this.updateBulkHeader(),e>0?this.showBulkHeader():this.hideBulkHeader()},onCustomfieldDeleteClick:function(e){var i=e.model;this.getRegion("deleteDialog").currentView.setModel(i),this.getRegion("deleteDialog").currentView.show()},onBulkCheckboxChange:function(){this.getTable().find(".custom-fields-bulk-checkbox").prop("checked")?(this.collection.getSelectableModels().forEach(function(e){e.set("isSelected",!0)}),this.showBulkHeader()):(this.collection.resetDeleteData(),this.hideBulkHeader()),this.updateBulkHeader()},onBulkDeleteClick:function(){this.getRegion("deleteDialog").currentView.show()},showBulkHeader:function(){this.getTable().find("thead").addClass("custom-fields-header-bulk")},hideBulkHeader:function(){this.getTable().find("thead").removeClass("custom-fields-header-bulk")},updateBulkHeader:function(){var e=this.collection.where({isSelected:!0}).length,i=this.collection.getSelectableModels().length;this.getTable().find("th.customfield-checkbox").html(JIRA.Templates.Admin.Customfields.bulkHeader({count:e,isChecked:e===i&&0!==i,isButtonDisabled:0===e,isCheckboxDisabled:0===i}))},fetchData:function(){return this.displayLoadingIndicator(),this.collection.getFirstPage().done(this.hideLoadingIndicator.bind(this))},displayLoadingIndicator:function(){this.$el.addClass("active").find(".customfields-spinner").remove(),this.$el.append("<aui-spinner class='customfields-spinner' size='large'></aui-spinner>")},hideLoadingIndicator:function(){this.$el.removeClass("active").find(".customfields-spinner").remove(),this.initTooltips()},initTooltips:function(){this.$("th .customfield-help-icon").tooltip({gravity:"s"}),this.$("tr td.customfield-name-cell .customfield-help-icon").tooltip(),this.$("tr td.customfield-name-cell strong").tooltip(),this.$("tr td.customfield-name-cell .customfield-lozenge").tooltip(),this.$("tr td.customfield-name-cell div.description").tooltip({html:!0}),this.$("tr td.customfield-last-value-update-cell span").tooltip()},refreshListAfterDelete:function(){var e=this;this.displayLoadingIndicator(),this.collection.getFirstPage({reset:!0}).fail(function(i){return e.triggerMethod("navigate:error",i)}).done(this.onNavigationEnd.bind(this))},getTable:function(){return this.getRegion("customfields").currentView.$el},handleErrorResponse:function(e){var i=e.status,t=e.responseText,s=this._parseResponse(t),o=JIRA.Templates.Admin.Customfields.applicationAccessError({messages:s,status:i});switch(i){case 401:case 403:var l=JIRA.Templates.Admin.Customfields.applicationAccessErrorHeading({status:i});this._showErrorDialogue(o,l);break;default:this._showErrorMessage(o)}},_parseResponse:function(e){try{var i=JSON.parse(e),t=i.errorMessages,s=i.message;if(t)return t;if(s)return[s]}catch(e){return null}},_showErrorMessage:function(e){o.showErrorMsg(e,{closeable:!0})},_showErrorDialogue:function(e,i){return new t({heading:i,message:e,mode:"warning"}).show()}})});