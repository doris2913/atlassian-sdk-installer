define("jira/ajs/list/group-descriptor",["jira/ajs/descriptor"],function(t){"use strict";return t.extend({_getDefaultOptions:function(){return{showLabel:!0,label:"",items:[]}},placement:function(){return this.properties.placement},styleClass:function(){return this.properties.styleClass},weight:function(){return this.properties.weight},label:function(){return this.properties.label},footerText:function(t){if(!t)return this.properties.footerText;this.properties.footerText=t},footerHtml:function(t){if(!t)return this.properties.footerHtml;this.properties.footerHtml=t},actionBarHtml:function(t){return t&&(this.properties.actionBarHtml=t),this.properties.actionBarHtml},showLabel:function(){return this.properties.showLabel},items:function(t){return t?(this.properties.items=t,this):this.properties.items},addItem:function(t){return this.properties.items.push(t),this},id:function(){return this.properties.id},setModel:function(t){this.properties.model=t},replace:function(){return this.properties.replace},uniqueItemScope:function(){return this.properties.uniqueItemScope},description:function(){return this.properties.description},model:function(t){if(!t)return this.properties.model;this.properties.model=t}})}),AJS.namespace("AJS.GroupDescriptor",null,require("jira/ajs/list/group-descriptor"));