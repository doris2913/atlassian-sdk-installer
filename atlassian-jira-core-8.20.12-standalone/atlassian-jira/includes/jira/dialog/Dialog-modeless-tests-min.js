AJS.test.require(["jira.webresources:jira-global","jira.webresources:dialogs","com.atlassian.auiplugin:dialog2"],function(){"use strict";var t,o,e=require("jquery"),i=require("underscore"),n=require("jira/dialog/dialog"),a=AJS.Dialog,d=AJS.dialog2,s=AJS.dim,u=[],r=function(){for(var t=0;t<arguments.length;t++)arguments[t].show()},c=function(){for(var t=0;t<arguments.length;t++)arguments[t].hide()},l=function(t){return t.options&&t.options.windowTitle||t.get&&t.get("header")&&t.get("header")[0].text()||t.$el&&t.$el.find("header").text()||"n/a"},h=function(t,o){o="modal"!==o,strictEqual(t.isModeless(),!!o,l(t)+" should "+(o?"":"not ")+"be modeless")},f=function(t){h(t,"modeless")},p=function(t){h(t,"modal")},g=function(t,o){var e;"function"==typeof t.isVisible?e=t.isVisible():t instanceof a&&(e=!!AJS.popup.current&&AJS.popup.current.element===t.popup.element),strictEqual(e,!!o,l(t)+" should "+(o?"":"not ")+"be visible")},m=function(t){g(t,!1)},w=function(t){t.forEach(function(t){m(t)})},b=function(t){g(t,!0)},v=function(t){var o=s&&s.$dim&&!s.$dim.attr("hidden");strictEqual(!!o,!!t,"blanket should "+(t?"":"not ")+"be visible")},k=function(t){strictEqual(document.title,t,"window title should be equal "+t)},S=function(t,o,e){void 0===o&&(o=i.difference(u,t)),b(t),w(o),"boolean"===e&&v(e)},x=function(t,o){S(t,o,!0)},j=function(t,o){S(t,o,!1)},y=function(t,o){S(t,o,void 0)},A=function(){u.reverse().forEach(function(t){t.hide()}),u=[],e("."+n.ClassNames.DIALOG).remove(),e(".aui-dialog2").remove(),e(".aui-dialog").remove()},q=function(t,o){var i=e("<div>").css({height:"200px"}).append(e("<h2>").text(t)),a={content:function(t){return t(i)},stacked:!0,height:"200px",windowTitle:t},d=new n(e.extend(a,o));return d.isVisible=function(){return i.is(":visible")&&"hidden"!==i.css("visibility")},d.isModeless=function(){return this.get$popup().hasClass(n.ClassNames.MODELESS_DIALOG)},u.push(d),d},E=function(t,o){var e={width:800,height:500,id:"dialog-name"+o,closeOnOutsideClick:!0,stacked:!0},i=new a(e);return i.addHeader(t||"some header"),u.push(i),i},J=function(t,o){var i={width:800,height:500,id:"dialog2-name"+o,closeOnOutsideClick:!0},n='<section role="dialog" id="'+i.id+'" class="aui-layer aui-dialog2 aui-dialog2-medium" hidden>             \x3c!-- Dialog header --\x3e             <header class="aui-dialog2-header">'+t+"</header>             <p>Hello World</p>         </section>";e(document.body).append(n);var a=d("#"+i.id);return u.push(a),a},D=function(t,o,e){e.forEach(function(e){test(AJS.format.apply(this,[t].concat(e.context)),function(){o.apply(this,e.parameters)})})};module("Modeless Dialog Tests",{setup:function(){t=document.title,o=q("modeless dialog",{modeless:!0})},teardown:function(){document.title=t,A()}}),test("Should show",function(){o.show(),b(o),f(o),k(l(o))}),test("Should hide",function(){o.show(),o.hide(),m(o),k(t)}),test('Should not change window title when windowTitle is "false"',function(){q("modeless dialog",{modeless:!0,windowTitle:!1}).show(),k(t)}),test("JIRA Dialog should be modal by default",function(){var t=q("jira dialog");t.show(),p(t)}),test('JIRA Dialog should be modal when specified "modeless: false"',function(){var t=q("jira dialog",{modeless:!1});t.show(),p(t)}),function(){var t=[{parameters:[function(){return q("jira stacked dialog")}],context:["jira dialog"]},{parameters:[function(){return E("aui stacked dialog",1)}],context:["aui dialog"]},{parameters:[function(){return J("aui stacked dialog2",1)}],context:["aui dialog2"]}];D('Should hide when stacked "{0}" is shown',function(t){var e=t();r(o),r(e),x(e)},t),D('Should show when stacked "{0}" is hidden',function(t){var e=t();r(o,e),c(e),j(o)},t)}(),function(){var t=[{parameters:[function(){return q("jira stacked dialog 1")},function(){return q("jira stacked dialog 2")}],context:["jira dialog","jira dialog"]}],e=function(t,o){return{bottom:t(),top:o()}};D('Should stay hidden when stacked "{0}" is shown on top of stacked "{1}"',function(t,i){var n=e(t,i);r(o,n.bottom),r(n.top),x(n.top)},t),D('Should stay hidden when top stacked "{1}" is hidden on top of stacked "{0}"',function(t,i){var n=e(t,i);r(o,n.bottom,n.top),c(n.top),x(n.bottom)},t),D('Should show when the bottom stacked "{0}" get hidden together with the top stacked "{1}"',function(t,i){var n=e(t,i);r(o,n.bottom,n.top),c(n.top),c(n.bottom),j(o)},t)}(),function(){var t=[{parameters:[function(){return J("aui stacked dialog2 1",1)},function(){return J("aui stacked dialog2 2",2)}],context:["aui dialog2","aui dialog2"]},{parameters:[function(){return E("aui stacked dialog 1",1)},function(){return J("aui stacked dialog2 2",2)}],context:["aui dialog","aui dialog2"]},{parameters:[function(){return J("aui stacked dialog2 1",1)},function(){return E("aui stacked dialog 2",2)}],context:["aui dialog2","aui dialog"]}],e=function(t,o){return{bottom:t(),top:o()}};D('Should stay hidden when stacked "{0}" is shown on top of stacked "{1}"',function(t,i){var n=e(t,i);r(o,n.bottom),r(n.top),x(n.top,[o])},t),D('Should stay hidden when top stacked "{1}" is hidden on top of stacked "{0}"',function(t,i){var n=e(t,i);r(o,n.bottom,n.top),c(n.top),y(n.bottom)},t),D('Should show when the bottom stacked "{0}" get hidden together with the top stacked "{1}"',function(t,i){var n=e(t,i);r(o,n.bottom,n.top),c(n.top),c(n.bottom),j(o)},t)}()});