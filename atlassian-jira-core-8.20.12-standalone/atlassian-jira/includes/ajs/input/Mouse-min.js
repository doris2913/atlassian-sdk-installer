define("jira/ajs/input/mouse",["jquery","jira/util/top-same-origin-window"],function(e,t){"use strict";var n=t(window),i={},o=i.MotionDetector=function(){this.reset()};return o.prototype.reset=function(){this._handler=null,this._x=null,this._y=null,this.moved=!1},o.prototype.wait=function(t){var i=this;i._handler||(this.reset(),e(n.document).bind("mousemove",i._handler=function(e){i._x||i._y?e.pageX===i._x&&e.pageY===i._y||(i.unbind(),i.moved=!0,t&&t.call(this,e)):(i._x=e.pageX,i._y=e.pageY)}))},o.prototype.unbind=function(){this._handler&&(e(n.document).unbind("mousemove",this._handler),this.reset())},i}),AJS.namespace("JIRA.Mouse",null,require("jira/ajs/input/mouse"));