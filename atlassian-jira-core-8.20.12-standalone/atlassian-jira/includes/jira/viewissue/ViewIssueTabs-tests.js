AJS.test.require(['jira.webresources:viewissue-tabs'], function () {
    'use strict';

    var $ = require('jquery');

    module("ViewIssueTabs", {
        setup: function setup() {
            this.viewIssueTabs = require("jira/viewissue/tabs");
            $.fn.livestamp = sinon.stub();
        }
    });

    test("Should set performance mark", function () {
        var $el = $('<div><time class="livestamp"></time></div>');

        this.viewIssueTabs.domReady($el);

        ok(performance.getEntries().filter(function (mark) {
            return mark.name === 'activityTabFullyLoaded';
        }).length === 1);
    });
});