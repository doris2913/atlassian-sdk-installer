define("jira/ajs/select/checkbox-multi-select",["jira/util/formatter","jira/util/key-code","jira/ajs/select/queryable-dropdown-select","jira/ajs/select/select-helper","jira/ajs/select/select-model","jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler","jira/ajs/list/list","jira/util/events","jira/util/events/types","jquery","underscore"],function(e,t,i,n,s,o,l,r,a,c,d){"use strict";return i.extend({init:function(e){var t=this;if(c.extend(this,n),this._setOptions(e),!c(this.options.element).attr("multiple"))throw"Cannot create CheckboxMultiSelect without multiple-select select element.";this.options.element=c(this.options.element).hide(),this.model=new s({element:this.options.element,removeOnUnSelect:this.options.removeOnUnSelect});var i=this.options.suggestionsHandler?this.options.suggestionsHandler:o;return this.suggestionsHandler=new i(this.options,this.model),this.options.element.bind("updateOptions",function(){t._setOptions(e)}).bind("selectOption",function(e,i){t.selectItem(i)}).bind("removeOption",function(e,i){t.unselectItem(i)}).bind("clear",function(){t.clear()}),this._createFurniture(),this._createDropdownController(),this._createListController(),this._assignEventsToFurniture(),this.render(),this.model.$element.addClass("check-list-select-select").trigger("initialized",[this]),r.trigger(a.CHECKBOXMULITSELECT_READY,[this.model.$element,this]),this},_createListController:function(){var e=this;this.listController=new l({stallEventBind:this.options.stallEventBind,containerSelector:c(".aui-list",this.$container),scrollContainer:".aui-list-scroll",selectionEvent:"change",delegateTarget:this.$field,hasLinks:!1,itemSelector:".check-list-item",groupSelector:"ul.aui-list-section",matchingStrategy:this.options.matchingStrategy,maxInlineResultsDisplayed:this.options.maxInlineResultsDisplayed,expandAllResults:this.options.expandAllResults,renderers:this._getCustomRenders(),selectionHandler:function(t){var i;return i="change"===t.type?c(t.target).closest(this.options.itemSelector):this.getFocused(),e._selectionHandler(i,t),!1}})},_createDropdownController:function(){this.dropdownController={show:c.noop,setWidth:c.noop,setPosition:c.noop,hide:c.noop}},_getCustomRenders:function(){return{suggestion:this._renders.suggestionItem,suggestionItemElement:this._renders.suggestionItemElement.bind(this),suggestionItemResolver:this._renders.suggestionItemResolver.bind(this)}},_handleCharacterInput:function(e){c.each(this.listController.$container.find(".invalid-item"),function(){c(this).tipsy("hide")}),this.requestSuggestions(e).done(d.bind(function(e){this._setSuggestions(e)},this)),this.$dropDownIcon.toggleClass("clear-field aui-iconfont-remove",!!this.getQueryVal()),this.$dropDownIcon.toggleClass("aui-iconfont-search",!this.getQueryVal()),this.listController.moveToFirst()},_getDefaultOptions:function(){return c.extend(!0,this._super(),{errorMessage:e.I18n.getText("jira.ajax.autocomplete.error"),stallEventBind:!0})},_createFurniture:function(){var e=this.model.$element.attr("id");this.$container=this._render("container",e),this.$fieldContainer=this._render("fieldContainer").appendTo(this.$container),this.$field=this._render("field",e,this._getPlaceholderText()).appendTo(this.$fieldContainer);var t=this._render("suggestionsContainer",e);this.suggestionsContainerId=t.attr("id"),this.$container.append(t),this.$field.attr("aria-controls",t.attr("id")),this.$container.insertBefore(this.model.$element),this.$dropDownIcon=this._render("dropdownAndLoadingIcon").appendTo(this.$fieldContainer)},_getPlaceholderText:function(){var t=c.trim(this.model.$element.data("placeholder-text"));return t&&""!==t?t:e.I18n.getText("common.concepts.search")},_assignEventsToFurniture:function(){var e=this;this._assignEvents("body",document),this.options.stallEventBind?window.setTimeout(function(){e._assignEvents("field",e.$field)._assignEvents("keys",e.$field)._assignEvents("container",e.$container)._assignEvents("fieldIcon",e.$dropDownIcon)},0):e._assignEvents("field",e.$field)._assignEvents("keys",e.$field)._assignEvents("fieldIcon",e.$dropDownIcon),this.listController.$container.delegate(".clear-all","click",function(t){t.preventDefault();var i=c(t.target);i.hasClass("disabled")||(i.parent().remove(),e.clear())}),this.listController.bind("itemFocus",this._onItemFocus.bind(this))},clear:function(){var e=this,t=this.model.getDisplayableSelectedDescriptors();this.model.setAllUnSelected(),0===this.$field.val().length?(this.$field.val(""),this.listController.$container.find(":checkbox").removeAttr("checked")):(this.clearQueryField(),this.listController.moveToFirst()),this._toggleClearButton(),c.each(t,function(){e.model.$element.trigger("unselect",[this,e,!0])})},clearQueryField:function(){this.$field.val(""),this._handleCharacterInput(!0),this.$field.focus()},unselectItem:function(e){this.model.setUnSelected(e),this.model.$element.trigger("unselect",[e,this,!1]),this.$container.find(".aui-list input[type=checkbox]").each(function(){this.value===e.value()&&(this.checked=!1)})},showLoading:function(){return this.$dropDownIcon.addClass("loading").removeClass("noloading"),this},hideLoading:function(){return this.$dropDownIcon.removeClass("loading").addClass("noloading"),this},_handleEscape:function(e){function i(e){e.keyCode===t.ESCAPE&&(e.stopPropagation(),n.off("keyup",i))}var n=this.$field;"keydown"===e.type&&""!==n.val()&&(e.stopPropagation(),n.val(""),n.on("keyup",i),this._handleCharacterInput(!0))},selectItem:function(e,t){this.model.setSelected(e),t||this.model.$element.trigger("selected",[e,this]),this.$container.find(".aui-list input[type=checkbox]").each(function(){this.value===e.value()&&(this.checked=!0)})},_selectionHandler:function(e,t){var i=this;e.each(function(){var e=c.data(this,"descriptor"),n=c(this).find(":input");(i._directCheckboxClick||t.shiftKey)&&(e.properties.fromCheckbox=!0),i._setDescriptorSelection(e,n)}),this._toggleClearButton()},_toggleClearButton:function(){var e=this.model.getSelectedValues().length>0;this.listController.$container.find(".clear-all").attr("tabindex",e?null:-1).closest(".check-list-group-actions").toggleClass("hidden",!e)},_setDescriptorSelection:function(e,t){e.selected()?(this.unselectItem(e),t.removeAttr("checked")):(this.selectItem(e),t.attr("checked","checked"))},render:function(){this._handleCharacterInput(!0)},_events:{field:{keydown:function(e){function i(){""!==c.trim(n.$field.val())&&(n.$field.val(""),n._handleCharacterInput(!0))}if(e.keyCode===t.ENTER){e.preventDefault();var n=this;this.model.$element.bind("unselect selected",i),setTimeout(function(){n.model.$element.unbind("unselect selected",i)},0)}}},container:{mousedown:function(e){function t(e){"mouseup"===e.type&&(i._directCheckboxClick=!0,setTimeout(function(){i._directCheckboxClick=!1},40)),c(document).unbind("mouseup mouseleave",t)}var i=this;c(e.target).is("input[type=checkbox]")&&c(document).unbind("mouseup mouseleave",t).bind("mouseup mouseleave",t),e.target!==this.$field.get(0)&&e.preventDefault()},click:function(){this.$field.get(0)!==document.activeElement&&this.$field.focus()}},fieldIcon:{click:function(e){c(e.target).hasClass("clear-field")&&this.clearQueryField()}}},_renders:{errorMessage:function(e){return c('<div class="error" />').attr("id",e+"-error")},fieldContainer:function(){return c("<div class='check-list-field-container' />")},field:function(e,t){var i=this._render("baseField").attr({placeholder:t,class:"text",id:e+"-input"});return this.options.ariaLabel&&i.attr("aria-label",this.options.ariaLabel),i},disableSelectField:function(e){return c("<input type='text' class='long-field' />").attr({name:e,id:e})},container:function(e){return c('<div class="check-list-select" />').attr("id",e+"-multi-select")},suggestionItemElement:function(e,t){var i=e.value(),n=e.icon(),s=n&&"none"!==n,o=e.fallbackIcon(),l=d.escape(e.title()),r=t||e.html()||d.escape(e.label()),a=e.selected(),h=e.styleClass(),u=e.disabled(),g=o&&"none"!==o?" onerror=\"this.onerror=null;this.src='"+o+"';\"":"",p=s?"<img src="+n+" \n                    "+g+" \n                    loading='lazy' \n                    height='16' width='16' \n                    class='icon"+("rounded"===e.iconType()?" rounded":"")+"' \n                    align='absmiddle' />":"";return c("\n                    <li class='check-list-item"+(u?" disabled":"")+" "+(h||"")+"' role='option' id='"+i+"-"+this.options.id+"'>\n                    <label class='item-label checkbox' title='"+l+"' data-descriptor-title='"+l+"'>\n                        <input type='checkbox'"+(u?' disabled="disabled"':"")+" tabindex='-1' value='"+i+"'"+(a?" checked='checked'":"")+" />\n                        "+p+"\n                        "+r+"\n                    </label>\n                    </li>")},suggestionItemResolver:function(e,t){return this._render("suggestionItemElement",e,t)},suggestionItem:function(t,i){var n,s=this._render("suggestionItemResolver",t,i),o=s.find("label");if(t.invalid()||t.disabled()){s.addClass("has-invalid-item"),o.append("<span class='invalid-item'></span>"),n=o.find(".invalid-item"),d.defer(function(){s.attr("original-title",s.attr("title")),s.removeAttr("title")});var l;t.title()?(l=t.title(),o.attr("original-title",l),o.removeAttr("title")):l=e.I18n.getText("jira.search.context.invalid.generic",e.I18n.getText("common.concepts.value"),t.label()),n.tipsy({title:function(){return l},className:"tipsy-front",trigger:"manual"}),n.hoverIntent({interval:200,over:function(){n.tipsy("show")},out:function(){n.tipsy("hide")}})}return s.data("descriptor",t)},dropdownAndLoadingIcon:function(){return c('<span class="icon-default aui-icon aui-icon-small aui-iconfont-search noloading"></span>')}},handleFreeInput:c.noop,hideSuggestions:c.noop,showErrorMessage:c.noop,_deactivate:c.noop})}),AJS.namespace("AJS.CheckboxMultiSelect",null,require("jira/ajs/select/checkbox-multi-select"));