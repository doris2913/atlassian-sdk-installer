define("jira/viewissue/init-custom-field-tabs",["jira/util/logger","jira/util/events","jira/util/events/types","aui/tabs","jquery"],function(t,i,e,n,a){"use strict";var r="#customfieldmodule",u=function(i){var e;"string"!=typeof i&&i.length>0||("#"!==i[0]&&(i="#"+i),t.log("activating tab",i),e=a("a[href='"+i+"']",r),e.length&&n.change(e))},l=function(t){var i=a(t.target).closest(".tabs-pane");i.length>0&&u(i.attr("id"))};a(function(){e.NEW_CONTENT_ADDED&&i.bind(e.NEW_CONTENT_ADDED,function(t,i){var e=i.find(r);e.unbind("reveal"),e.bind("reveal",l),n.setup()}),e.PANEL_REFRESHED&&i.bind(e.PANEL_REFRESHED,function(t,i,e,n){if("details-module"===i){var a=n.find(r).find(".active-tab");1===a.length&&u(a.find("a").attr("href"))}}),a(r).bind("reveal",l)})});