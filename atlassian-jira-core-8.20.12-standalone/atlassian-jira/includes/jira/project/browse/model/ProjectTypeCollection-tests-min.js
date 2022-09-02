AJS.test.require("jira.webresources:browseprojects",function(){"use strict";require(["jira/project/browse/projecttypecollection"],function(e){module("ProjectTypeCollection",{setup:function(){this.projectTypes=[{id:"business"},{id:"software"},{id:"service-desk"}],this.collection=new e(this.projectTypes)}}),test("should select project type when told to do so",function(){strictEqual(this.collection.get("business").get("selected"),void 0);var e=this.collection.selectProjectType("business");strictEqual(e.get("selected"),!0),equal(e.get("id"),"business","should return selected project type"),strictEqual(this.collection.get("business").get("selected"),!0)}),test("Should return selected project type",function(){var e=this.collection.selectProjectType("service-desk");equal(this.collection.getSelected().get("id"),"service-desk"),equal(e,this.collection.getSelected())}),test("should unselect project type when told so",function(){this.collection.selectProjectType("software");var e=this.collection.getSelected();this.collection.unselect(),strictEqual(e.get("selected"),!1),strictEqual(this.collection.getSelected(),void 0)}),test("should keep only one project type selected",function(){var e=this.collection.selectProjectType("business"),t=this.collection.get("software");this.collection.selectProjectType("software"),strictEqual(e.get("selected"),!1),strictEqual(t.get("selected"),!0)})})});