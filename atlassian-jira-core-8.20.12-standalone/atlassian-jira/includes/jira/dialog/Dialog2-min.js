var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};define("jira/dialog/dialog2",["require"],function(t){"use strict";var e=t("jira/dialog/dialog-stack"),i=t("aui/dialog2"),n=t("jira/ajs/control"),o=t("jira/ajs/layer/inline-layer"),s=t("jira/util/data/meta"),r=t("jira/ajs/ajax/smart-ajax"),a=t("jira/loading/loading"),c=t("jira/xsrf"),d=t("jira/util/browser"),h=t("jira/util/events"),l=t("aui/dropdown"),p=t("jquery"),u=t("jira/jquery/deferred"),g=t("jira/jquery/plugins/isdirty"),f=t("underscore"),_=t("wrm/require"),v=t("jira/util/key-code"),m=AJS.dim,C=AJS.LayerManager.global,y=n.extend({_getDefaultOptions:function(){return{cached:!1,widthClass:"medium",ajaxOptions:{data:{inline:!0,decorator:"dialog"}}}},init:function(t){if("string"==typeof t||t instanceof p?t={trigger:t}:t&&t.width&&(t.widthClass="custom"),this.classNames=y.ClassNames,this.OPEN_DIALOG_SELECTOR=y.getSelector("DIALOG")+y.getSelector("DIALOG_OPEN"),this.options=p.extend(!0,this._getDefaultOptions(),t),this.options.width=y.WIDTH_PRESETS[this.options.widthClass]||t.width,this._setType(),this.options.trigger){var e=p.makeArray(this.options.trigger),i=this;p.each(e,function(t,e){i._assignEvents("trigger",e)})}this.onContentReadyCallbacks=[],this.defineResources(),this.options.prefetchResources&&this.downloadResources()},_setType:function(){"function"==typeof this.options.content?this.options.type="builder":this.options.content instanceof p||"object"===_typeof(this.options.content)&&this.options.nodeName?this.options.type="element":(!this.options.type&&!this.options.content||"object"===_typeof(this.options.content)&&this.options.content.url)&&(this.options.type="ajax")},_getDialogSelector:function(){return this.options.id||(this.options.id="new-dialog-id",this.get$popup().attr("id",this.options.id)),"#"+this.options.id},_runContentReadyCallbacks:function(){var t=this;p.each(this.onContentReadyCallbacks,function(){this.call(t)})},_setContent:function(t,i){var n;if("resolved"!==this.resourcesReady().state())return this._showloadingIndicator(),void this.resourcesReady().done(this._setContent.bind(this,t,i));if(t)if(e.current===this){if(this.$content=t,this.get$popupContent().html(t),!1!==i&&this.decorateContent&&this.decorateContent(),!this.get$popup().find(".aui-dialog2-footer").length){var o=this.get$popup().find(".buttons");this.moveFooterToDialog2(o)}(n=this.get$popupContent().find("."+this.classNames.HEADING_AREA)).size()>0&&this.get$popupHeading().replaceWith(n),(n=this.get$popupContent().find("."+this.classNames.CONTENT_AREA)).size()>0&&(n.contents().insertAfter(n),n.remove()),!1!==i&&(p(document).trigger("dialogContentReady",[this]),this._runContentReadyCallbacks()),!1!==i&&p.isFunction(this.options.onContentRefresh)&&this.options.onContentRefresh.call(this),this._onShowContent()}else!1===this.options.cached&&delete this.$content;else this._contentRetrievers[this.options.type].call(this,this._setContent)},moveFooterToDialog2:function(t){if(t&&t.length){this.get$popup().children("footer").eq(0).remove();var e=p('<footer class="aui-dialog2-footer"></footer>');e.append(t),this.get$popup().append(e);var i=this.get$popupContent().find("form"),n=t.find('[type="submit"]'),o=i.attr("id")||"dialog-form";i.attr("id",o),n.attr("form",o)}},_initAuiDialog2:function(){i(this._getDialogSelector()).show(),this._listenOnAuiBlanket(),this._listenOnEscape()},_listenOnAuiBlanket:function(){var t=this;p(".aui-blanket").on("click."+this._getNamespace(),function(e){e.stopImmediatePropagation(),t.handleCancel()})},_listenOnEscape:function(){var t=this;p("body").off("keydown."+this._getNamespace()),p("body").on("keydown."+this._getNamespace(),function(e){var i=C.getTopLayer();i&&(i[0]&&"AUI-INLINE-DIALOG"===i[0].nodeName||i.hasClass("wiki-edit-dropdown")||i.hasClass("wiki-edit-picker"))||e.keyCode===v.ESCAPE&&(e.stopPropagation(),t.handleCancel())})},_getNamespace:function(){return this._getDialogSelector().substring(1)},_ellipsify:function(t){t instanceof p||(t=this.get$popup()),p(".overflow-ellipsis",t).textOverflow({className:"ellipsified"})},_handleInitialDoneResponse:function(t,e,i){},getRequestUrlFromTrigger:function(){if(this.$activeTrigger&&this.$activeTrigger.length)return this.$activeTrigger.attr("href")||this.$activeTrigger.data("url")},_getRequestOptions:function(){var t={};return!1!==this._getAjaxOptionsObject()&&(t=p.extend(!0,t,this._getAjaxOptionsObject()),t.url||(t.url=this.getRequestUrlFromTrigger()),t)},_getAjaxOptionsObject:function(){var t=this.options.ajaxOptions;return p.isFunction(t)?t.call(this):t},_contentRetrievers:{element:function(t){this.$content||(this.$content=p(this.options.content).clone(!0)),t.call(this,this.$content)},builder:function(t){var e=this;this.$content||(this._showloadingIndicator(),this.options.content.call(this,function(i){e.$content=p(i),t.call(e,e.$content)},function(){e._hideloadingIndicator()}))},ajax:function(t){var e,i=this;this.$content||(e=this._getRequestOptions(),this._showloadingIndicator(),this.serverIsDone=!1,e.complete=function(n,o,s){if(s.successful){var a=i._detectRedirectInstructions(n);i.serverIsDone=a.serverIsDone,a.redirectUrl?i._performRedirect(a.redirectUrl):(e.dataType&&"json"===e.dataType.toLowerCase()&&i._buildContentFromJSON?i.$content=i._buildContentFromJSON(s.data):i.$content=s.data,i.serverIsDone||t.call(i,i.$content))}else{var c=r.buildDialogErrorContent(s);t.call(i,c)}},r.makeRequest(e))}},_detectRedirectInstructions:function(t){var e={serverIsDone:!1,redirectUrl:""},i=t.getResponseHeader("X-Atlassian-Dialog-Control");if(i){e.serverIsDone=!0;0===i.indexOf("redirect:")?e.redirectUrl=i.substr("redirect:".length):"permissionviolation"===i&&(e.redirectUrl=window.location.href)}return e},_performRedirect:function(t){d.reloadViaWindowLocation(t)},_renders:{popupHeading:function(){return p("<header />").addClass(this.classNames.HEADING_AREA)},popupContent:function(){return p("<div />").addClass(this.classNames.CONTENT_AREA)},popup:function(){var t=p("<section />").attr("id",this.options.id||"").addClass(this.classNames.DIALOG).attr("role","dialog").attr("aria-labelledby","jira-dialog2__heading").hide();return this._setDialogSize(t),t}},_events:{trigger:{simpleClick:function(t,e){this.$activeTrigger=e,this.$activeTrigger.is("a")||(this.$activeTrigger=e.find("a")),this.show(),t.preventDefault()}}},handleCancel:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y.HIDE_REASON.escape;return this.hide(!0,{reason:t})},_showloadingIndicator:function(){a.showLoadingIndicator()},_hideloadingIndicator:function(){a.hideLoadingIndicator()},_setDialogSize:function(t){var e=this._getDialogSizeClass(this.options.width);t&&!t.hasClass(e)&&t.addClass(e)},_getDialogSizeClass:function(t){switch(!0){case t<=400:return"aui-dialog2-small";case t<=600:return"aui-dialog2-medium";default:return"aui-dialog2-large"}},getContentArea:function(){return this.$popup.find(".form-body")},getContentContainer:function(){var t=this.$popup.find(".content-area-container");return 1===t.length?t:this.$popup.find(".form-body")},get$popup:function(){return this.$popup||(this.$popup=this._render("popup").appendTo("body")),this.$popup},bindAnchorsToDialog:function(t){var e=this;t.click(function(t){e.$activeTrigger=p(this),delete e.$content,e._setContent(),t.preventDefault()})},get$popupContent:function(){return this.$popupContent||(this.$popupContent=this._render("popupContent").appendTo(this.get$popup())),this.$popupContent},get$popupHeading:function(){return this.$popupHeading||(this.$popupHeading=this._render("popupHeading").prependTo(this.get$popup())),this.$popupHeading},getLoadingIndicator:function(){return this.get$popup().find(".throbber:last")},showFooterLoadingIndicator:function(){var t=this.getLoadingIndicator();t.length&&(t.data("spinner")?t.hasClass("loading")||t.addClass("loading"):t.addClass("loading").spin())},hideFooterLoadingIndicator:function(){var t=this.getLoadingIndicator();t.length&&(t.removeClass("loading"),f.defer(function(){t.hasClass("loading")||t.spinStop()}))},_show:function(t){o.current&&o.current.hide(),l.current&&l.current.hide();var n=e.current;if(n){var s;if(n.options.stacked)s=n,s.stacked=!0,this.prev=s;else for(e.stackroot=this,s=n._removeStackState(),n.hide(!1);s;)n=s,s=n._removeStackState(),n._destroyIfNecessary()}else!0!==this.stacked&&(e.stackroot=this,e.originalWindowTitle=document.title);!0!==this.stacked&&m(!1),e.current=this;var r=this.get$popup().addClass(this.classNames.DIALOG_OPEN);t||"blank"!==this.options.type&&!this.$content&&!0!==this.stacked?(delete this.$content,this._setContent()):(r.show(),this._onShowContent(),i(this._getDialogSelector()).show()),this._assignEvents("container",document),p(this).trigger("Dialog.show",[this.$popup,this,this.id]),h.trigger("Dialog.show",[this.$popup,this,this.id]),this.stacked=!1},show:function(t){var i=this.options.delayShowUntil,n=this;if(e.current===this)return!1;var o=new p.Event("beforeShow"),s=new p.Event("beforeShow");if(p(this).trigger(o),h.trigger(s,[this.options.id]),o.isDefaultPrevented()||s.isDefaultPrevented())return!1;if(this.downloadResources(),i){var r=i();"resolved"===r.state()?n._show(t):(m(!1),this._showloadingIndicator(),r.done(function(){n._show(t)}))}else n._show(t)},_setWindowTitle:function(){var t,e,i=this.options.windowTitle,n=this.get$popup();if(!1!==i&&("string"==typeof i?t=i:"function"==typeof i?t=i.call(this):(e=n.find("."+this.classNames.HEADING_AREA),e.length&&(t=e.text())),t)){var o=s.get("app-title"),r=[t];o&&r.push(o),document.title=r.join(" - ")}},_onShowContent:function(){this._initAuiDialog2(),this._setWindowTitle(),this._hideloadingIndicator(),this._ellipsify(),this.get$popup().addClass(this.classNames.CONTENT_READY)},_resetWindowTitle:function(){!0!==this.stacked&&e.stackroot===this&&e.originalWindowTitle&&(document.title!==e.originalWindowTitle&&(document.title=e.originalWindowTitle),e.originalWindowTitle=void 0)},notifyOfNewContent:function(){this.$content&&(this.decorateContent(),this._setDialogSize(this.get$popup()),this._onShowContent(),p(document).trigger("dialogContentReady",[this]))},destroy:function(){this.$popup&&this.$popup.remove(),delete this.$popup,delete this.$popupContent,delete this.$popupHeading,delete this.$content},_destroyIfNecessary:function(){!this.options.cached&&this.destroy()},_removeStackState:function(){var t=this.prev;return delete this.prev,delete this.stacked,t},isCurrent:function(){return e.current===this},hide:function(t,n){if(e.current===this){var o=new p.Event("Dialog.beforeHide"),s=new p.Event("Dialog.beforeHide");if(n=n||{},h.trigger(o,[this.$popup,n.reason,this.options.id]),p(this).trigger(s,[this.$popup,n.reason,this.options.id]),o.isDefaultPrevented()||s.isDefaultPrevented())return!1;p(".aui-blanket").off("click."+this._getNamespace()),p("body").off("keydown."+this._getNamespace());var r=p("input[name=atl_token]",this.OPEN_DIALOG_SELECTOR).attr("value");void 0!==r&&c.updateTokenOnPage(r),i(this._getDialogSelector()).hide(),this.get$popup().removeClass(this.classNames.DIALOG_OPEN).removeClass(this.classNames.CONTENT_READY).hide(),this._hideloadingIndicator(),this._resetWindowTitle(),this._unassignEvents("container",document),p(document).trigger("hideAllLayers",[this.$popup,n.reason,this.options.id]),p(this).trigger("Dialog.hide",[this.$popup,n.reason,this.options.id]),h.trigger("Dialog.hide",[this.$popup,n.reason,this.options.id]),e.current=null,!1===this.options.cached&&!0!==this.stacked&&this.destroy(),!0!==this.stacked&&(this.prev?(this.prev.show(!!this.prev.options.reloadOnPop),this.prev._listenOnAuiBlanket(),delete this.prev):e.stackroot===this&&(e.stackroot=void 0))}},addHeading:function(t){var e=p("<div/>").html(t).contents(),i=p("<h2/>").attr("id","jira-dialog2__heading"),n=[i];e.each(function(){"div"===this.nodeName.toLowerCase()?n.push(this):i.append(this)}),this.get$popupHeading().html(n),i.attr("title",p.trim(i.text()))},onContentReady:function(t){p.isFunction(t)&&this.onContentReadyCallbacks.push(t)},defineResources:function(){f.isFunction(this.options.defineResources)&&this.options.defineResources.call(this)},requireContext:function(t){this.requireResource(t,"wrc!")},requireResource:function(t,e){this.wrmResources=this.wrmResources||[],this.wrmResources.push((e||"wr!")+t)},getRequiredResources:function(){return this.wrmResources||[]},downloadResources:function(){this.getRequiredResources().length>0&&!this.deferredResources&&(this.deferredResources=_(this.getRequiredResources()))},resourcesReady:function(){return this.deferredResources?this.deferredResources.promise():(new u).resolve().promise()}});return y.fn.dirtyFormWarning=function(){return this.bind("Dialog.beforeHide",function(t,e,i){if(!t.isDefaultPrevented()&&(i===y.HIDE_REASON.cancel||i===y.HIDE_REASON.escape)){var n=g.getDirtyWarning();n&&!confirm(n)&&t.preventDefault()}})},y.ClassNames={DIALOG:"aui-dialog2 aui-layer jira-dialog2 jira-dialog-core",HEADING_AREA:"aui-dialog2-header jira-dialog-core-heading",CONTENT_AREA:"aui-dialog2-content jira-dialog-core-content",DIALOG_OPEN:"jira-dialog-open",CONTENT_READY:"jira-dialog-content-ready"},y.getSelector=function(t){var e=(y.ClassNames[t]||"").split(" ")[0];return e?"."+e:""},y.WIDTH_PRESETS={small:360,medium:540,large:810},y.HIDE_REASON={cancel:"cancel",escape:"esc",submit:"submit"},Object.defineProperty(y,"current",{get:function(){return console.warn(e.currentDeprecationMsg),e.current},set:function(t){console.warn(e.currentDeprecationMsg),e.current=t}}),y});