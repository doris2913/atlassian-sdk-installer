AJS.test.require(["jira.webresources:jira-global"],function(){"use strict";function e(e){return e="number"==typeof e?e:0,new t({desiredKeyLength:e})}var r=require("underscore"),t=JIRA.ProjectKeyGenerator;module("JIRA.ProjectKeyGenerator"),test("always outputs in uppercase",function(){r.each(["thekey","TheKey","ThEkEy","tHEKEy"],function(r){equal(e(6).generateKey(r),"THEKEY")})}),test("insignificant whitespace is stripped",function(){equal(e().generateKey("   \r\n    key  "),"KEY","should ignore spaces and newlines")}),test("multiple words are converted in to an acronym",function(){equal(e().generateKey("uno dos tres"),"UDT")}),test("english grammatical words are not used to generate keys",function(){equal(e(4).generateKey("the key"),"KEY","'the' is an ignored grammatical word"),equal(e(4).generateKey("the key of G Major"),"KGM","'the' and 'of' are ignored grammatical words"),equal(e(8).generateKey("As A User I Would Like To Be Able To"),"UIWLTBAT","'as' and 'a' are ignored grammatical words")}),test("ignored words are only ignored when key length must be reduced",function(){equal(e(0).generateKey("Game of Thrones"),"GOT","keys of infinite length shouldn't care too much"),equal(e(9).generateKey("Game of Thrones"),"GT","ignored words are stripped if their original string is longer than the desired length")}),test("syllables are removed when key longer than desired length",function(){equal(e(4).generateKey("thekey"),"THEK","should strip at the second 'e'"),equal(e(6).generateKey("macchiato"),"MAC","should strip at the second 'c'"),equal(e(7).generateKey("affogato"),"AF","should strip at the second 'f'")}),test("punctuation is ignored",function(){equal(e().generateKey("I'm a little tea-pot, short and stout!"),"IALTSAS")}),test("numbers are ignored",function(){equal(e().generateKey("l337sp34k"),"LSPK","nobody should have to read numbers like they were letters")}),test("certain diacritic characters are converted to english alphabet equivalents",function(){var t=String.fromCharCode(114,233,115,117,109,233),a=String.fromCharCode(112,226,116,233);equal(e().generateKey(t),"RESUME","accented e should become a regular e"),equal(e().generateKey(a),"PATE","accented a should become a regular a");var n=String.fromCharCode(224,232,236,242,249),o=String.fromCharCode(225,233,237,243,250),i=String.fromCharCode(226,234,238,244,251);r.each([n,o,i],function(r){equal(e().generateKey(r),"AEIOU")})}),test("extended characters from utf-8 are ignored",function(){var r=String.fromCharCode(26085,26412,20154);equal(e().generateKey(r),"","japanese characters are ignored");var t=String.fromCharCode(1040,1085,1085,1072,32,1050,1072,1088,1077,1085,1080,1085,1072);equal(e().generateKey(t),"","cryllic is ignored")})});