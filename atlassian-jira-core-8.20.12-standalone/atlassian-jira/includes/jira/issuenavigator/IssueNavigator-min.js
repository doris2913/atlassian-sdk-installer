define("jira/issuenavigator/issue-navigator",["jira/issues/search/legacyissuenavigator"],function(a){"use strict";return a}),AJS.namespace("jira.app.issuenavigator",null,require("jira/issuenavigator/issue-navigator")),AJS.namespace("JIRA.IssueNavigator",null,require("jira/issuenavigator/issue-navigator")),AJS.namespace("JIRA.Settings.ApplicationTitle.get",null,function(){"use strict";return require("jira/util/data/meta").get("app-title")});