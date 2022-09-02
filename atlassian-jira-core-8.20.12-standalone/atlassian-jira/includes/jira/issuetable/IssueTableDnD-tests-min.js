AJS.test.require("jira.webresources:jira-global",function(){"use strict";var e=require("jquery"),t=require("jira/issuetable"),a=null,n=null;module("jira/issuetable",{setup:function(){n&&(n.tables=[],n.off(n.Events.ATTACHED)),e("#qunit-fixture").html(""),a=e("#qunit-fixture")},teardown:function(){}}),test("Listeners are notified on component appearance on a page",function(s){s.expect(1);var o=s.async();t.then(function(e){n=e,n.onTable(function(t){s.ok(t,"Listeners should receive tables"),e.off(e.Events.ATTACHED),o()})}),e("<issuetable-web-component data-content='subtasks'><table id='issuetable'></table></issuetable-web-component>").appendTo(a)}),test("Listeners are notified even if component already present on a page",function(t){t.expect(1);var s=t.async();e("<issuetable-web-component data-content='subtasks'><table id='issuetable'></table></issuetable-web-component>").appendTo(a),n.onTable(function(e){t.ok(e,"Listeners should receive tables"),s()})}),test("Listeners are notified for every table separately",function(t){var s=0;t.expect(6);for(var o=[],i=0;i<6;i++)o.push(t.async());for(var b=0;b<3;b++)e("<issuetable-web-component data-content='subtasks'><table id='issuetable1"+b+"'></table></issuetable-web-component>").appendTo(a);n.onTable(function(e){t.ok(e,"Listeners must be supplied with table whenever it appears on a page"),o[s](),s++});for(var l=0;l<3;l++)e("<issuetable-web-component data-content='subtasks'><table id='issuetable2"+l+"'></table></issuetable-web-component>").appendTo(a)}),test("Every table must be capable of dragging by default",function(t){t.expect(4);var s=t.async();n.onTable(function(e){t.ok(e.dragging,"Failed to detect dragging enabled"),t.ok(e.dragging.enable,"Failed to detect dragging enabled"),t.ok(e.dragging.disable,"Failed to detect dragging enabled"),t.ok(e.dragging.cancel,"Failed to detect dragging enabled"),s()}),e("<issuetable-web-component data-content='subtasks'><table id='issuetable'></table></issuetable-web-component>").appendTo(a)})});