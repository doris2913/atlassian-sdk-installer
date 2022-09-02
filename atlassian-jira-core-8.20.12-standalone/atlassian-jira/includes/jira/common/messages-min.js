define("jira/message/templates",["underscore"],function(e){"use strict";var s=JIRA.Templates.Messages;return e.extend({WARNING:s.warningMsg,ERROR:s.errorMsg,SUCCESS:s.successMsg,INFO:s.infoMsg},s)}),define("jira/message",["jira/flag","jquery","jira/message/templates","jira/data/local-storage"],function(e,s,r,t){"use strict";function a(e,r){r=r||{};var t,a=r.type({msg:e,closeable:r.closeable}),o=s("<div>").html(a),n=null!=r.timeout?r.timeout:M;return r.closeable&&o.find(".aui-close-button").click(function(e){e.preventDefault(),null!=t&&window.clearTimeout(t),o.remove()}),n>0&&(t=window.setTimeout(function(){o.fadeOut(function(){o.remove()})},1e3*n)),o}function o(e,s){return s=s||{},a(e,s).prependTo(s.target)}function n(e,s){return s=s||{},s.type="WARNING",I(e,s)}function g(e,s){return s=s||{},s.type="SUCCESS",I(e,s)}function i(e,s){return s=s||{},s.type="ERROR",I(e,s)}function u(e,s){return s=s||{},s.type="INFO",I(e,s)}function c(r,t){var a={};t=t||{},a.type=t.type,void 0===t.timeout?!1===t.closeable&&(a.close="auto"):t.timeout>0?a.close="auto":!1===t.closeable?a.close="never":a.close="manual";var o=s(e.showMsg("",r,a));return t.id&&o.attr("id",t.id),o}function l(e,r){return c(e,s.extend({},r,{type:"error"}))}function m(e,r){return c(e,s.extend({},r,{type:"warning"}))}function f(e,r){return c(e,s.extend({},r,{type:"success"}))}function d(e,r){return c(e,s.extend({},r,{type:"info"}))}function p(e,r){var t=s(e);r=r||{},t.css("backgroundColor","#fff").animate({backgroundColor:r.backgroundColor||"#ffd"}),window.setTimeout(function(){t.animate({backgroundColor:"#fff"},"slow",function(){t.css("backgroundColor","")})},3e3)}var M=10,I=function(){var e="jira.messages.reloadMessageMsg";return s(function(){var a,n,g,i=t.getItem(e);if(i){a=t.getItem("jira.messages.reloadMessageType"),n="true"===t.getItem("jira.messages.reloadMessageCloseable")||!0===t.getItem("jira.messages.reloadMessageCloseable"),g=t.getItem("jira.messages.reloadMessageTarget"),t.removeItem(e),t.removeItem("jira.messages.reloadMessageType"),t.removeItem("jira.messages.reloadMessageCloseable"),t.removeItem("jira.messages.reloadMessageTarget");var u={WARNING:{soyTemplate:r.warningMsg,auiType:"warning"},ERROR:{soyTemplate:r.errorMsg,auiType:"error"},SUCCESS:{soyTemplate:r.successMsg,auiType:"success"},INFO:{soyTemplate:r.infoMsg,auiType:"info"}};!g||s(g).is(document.body)?c(i,{type:u[a].auiType,closeable:n}):o(i,{type:u[a].soyTemplate,closeable:n,target:s(g)})}}),function(s,r){try{t.setItem(e,s),t.setItem("jira.messages.reloadMessageType",r.type)}catch(e){}if(r.closeable)try{t.setItem("jira.messages.reloadMessageCloseable",r.closeable)}catch(e){}if(r.target)try{t.setItem("jira.messages.reloadMessageTarget",r.target)}catch(e){}}}(),y=function(){var e="jira.messages.fadeInBackground.target";return s(function(){var s=t.getItem("jira.messages.fadeInBackground.color"),r=t.getItem(e);t.removeItem("jira.messages.fadeInBackground.color"),t.removeItem(e),p(r,{backgroundColor:s})}),function(s,r){r=r||{};var a=t.getItem(e);a?(a=a.split(","),a.push(s),a=a.join(",")):a=s;try{t.setItem(e,a),t.setItem("jira.messages.fadeInBackground.color",r.backgroundColor||"#ffd")}catch(e){}}}(),h={Types:r,DefaultTimeout:10,buildMsg:a,showMsg:c,showMessageAtTarget:o,showMsgOnReload:I,fadeInBackground:p,fadeInBackgroundOnReload:y,showErrorMsg:l,showWarningMsg:m,showSuccessMsg:f,showInfoMsg:d,showReloadErrorMsg:i,showReloadWarningMsg:n,showReloadSuccessMsg:g,showReloadInfoMsg:u},w={removeInVersion:"8.0",alternativeName:"jira/flag",sinceVersion:"6.4"};return AJS.deprecate.prop(h,"showMsg",w),AJS.deprecate.prop(h,"showErrorMsg",w),AJS.deprecate.prop(h,"showWarningMsg",w),AJS.deprecate.prop(h,"showSuccessMsg",w),h}),AJS.namespace("JIRA.Messages",null,require("jira/message")),function(){"use strict";var e=require("jira/message/templates"),s=require("jira/message"),r=require("jquery");r.fn.fadeInBackground=function(e){return s.fadeInBackground(this,e),this},r.fn.showErrorMsg=function(r,t){return t=t||{},t.target=this,t.type=e.errorMsg,s.showMessageAtTarget(r,t)},r.fn.showWarningMsg=function(r,t){return t=t||{},t.target=this,t.type=e.warningMsg,s.showMessageAtTarget(r,t)},r.fn.showSuccessMsg=function(r,t){return t=t||{},t.target=this,t.type=e.successMsg,s.showMessageAtTarget(r,t)},r.fn.showInfoMsg=function(r,t){return t=t||{},t.target=this,t.type=e.infoMsg,s.showMessageAtTarget(r,t)}}();