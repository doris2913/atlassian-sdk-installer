define("jira/dialog/init-dialog-behaviour",["jira/dialog/dialog-register","jira/dialog/dialog","jira/issue","jira/issuenavigator/issue-navigator","jquery","underscore","exports"],function(i,e,n,r,o,t,s){"use strict";s.init=function(){o(window).resize(t.debounce(function(){e.current&&e.current._positionInCenter&&e.current._positionInCenter()},200)),o.each(i,function(i,s){s instanceof e&&t.result(s,"isIssueDialog")&&o(s).bind("beforeShow",function(){return r.isRowSelected()||!!n.getIssueId()})})}});