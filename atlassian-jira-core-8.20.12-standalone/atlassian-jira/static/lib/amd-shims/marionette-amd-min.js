define("marionette",["require"],function(e){"use strict";var t=e("atlassian/libs/factories/marionette-1.6.4"),i=e("backbone"),n=e("underscore"),r=t(n,i),a=e("jira/marionette/marionette.mixins");return n.extend(r.View.prototype,a.viewExtensions),r}),AJS.namespace("Backbone.Marionette",null,require("marionette"));