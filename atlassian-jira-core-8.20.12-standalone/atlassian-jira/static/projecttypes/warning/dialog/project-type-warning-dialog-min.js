define("jira/project/types/warning/dialog",["require"],function(e){"use strict";function t(t,a,r){var o=n(".project-type-warning-icon",r);i(o,"uninstalled-warning-dialog",function(i,r,o){return i.html(JIRA.Project.Types.Warning.dialog({title:t.title,firstParagraph:t.firstParagraph,secondParagraph:t.secondParagraph,callToActionText:t.callToActionText})),e("jira/project/admin/change-project-type-dialog")({trigger:n(".warning-dialog-change-project-type"),projectId:t.projectId,onProjectTypeChanged:a}),o(),!1},{width:375,gravity:"w"})}var n=e("jquery"),a=e("wrm/data"),i=e("aui/inline-dialog"),r=a.claim("project.type.warning.dialogs.data");return{init:function(e){e=e||{},e.sectionElement=e.sectionElement||n("body"),t(r,e.onProjectTypeChanged,e.sectionElement)}}});