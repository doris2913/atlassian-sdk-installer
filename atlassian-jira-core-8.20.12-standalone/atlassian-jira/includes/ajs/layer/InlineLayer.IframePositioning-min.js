define("jira/ajs/layer/inline-layer/iframe-positioning",["jira/ajs/layer/inline-layer/standard-positioning","jira/util/navigator","jquery","jira/util/top-same-origin-window"],function(t,e,n,o){"use strict";var i=o(window),r=t.extend({offset:function(){var t=r.window(),e=r.topWindow(),o=n("iframe",e.document.body).filter(function(){return this.getAttribute("name")===t.name}),i=o.parent().offset(),l=this._super(),c=this._topDocumentScrollTop(),a=this._topDocumentScrollLeft(),s=this._iframeScrollTop(),u=this._iframeScrollLeft(),d=c-s,f=a-u;return{left:i.left+l.left+f,top:i.top+l.top+d}},_topDocumentScrollTop:function(){return this.isOffsetIncludingScroll()?0:Math.max(i.document.body.scrollTop,i.document.documentElement.scrollTop)},_topDocumentScrollLeft:function(){return this.isOffsetIncludingScroll()?0:Math.max(i.document.body.scrollLeft,i.document.documentElement.scrollLeft)},_iframeScrollTop:function(){return this.isOffsetIncludingScroll()?2*Math.max(window.document.body.scrollTop,window.document.documentElement.scrollTop):0},_iframeScrollLeft:function(){return this.isOffsetIncludingScroll()?2*Math.max(window.document.body.scrollLeft,window.document.documentElement.scrollLeft):0},isOffsetIncludingScroll:function(t){return void 0===this.offsetIncludingScroll&&(this.offsetIncludingScroll=!0),void 0!==t&&(this.offsetIncludingScroll=t),this.offsetIncludingScroll},appendToBody:function(){i.jQuery("body").append(this.layer())},window:function(){return i},scrollTo:function(){}});return e.isWebkit()&&(r=r.extend({appendToBody:function(){var t=this.layer();this.layer(this._rebuildLayerInParent()),i.jQuery("body").append(this.layer()),t.remove(),this.rebuilt()},appendToPlaceholder:function(){var t=this.layer();this.layer(this._rebuildLayerInIframe()),this.layer().appendTo(this.placeholder()),t.remove(),this.rebuilt()},_rebuildLayerInParent:function(){return i.jQuery("<div class='ajs-layer'>"+this.layer().html()+"</div>")},_rebuildLayerInIframe:function(){return n("<div class='ajs-layer'>"+this.layer().html()+"</div>")}})),e.isMozilla()&&(r=r.extend({appendToPlaceholder:function(){var t=this.layer();this.layer(t.clone(!0).appendTo(this.placeholder())),this.rebuilt(),window.setTimeout(function(){t.remove()},10)}})),r.window=function(){return window},r.topWindow=function(){return i},r});