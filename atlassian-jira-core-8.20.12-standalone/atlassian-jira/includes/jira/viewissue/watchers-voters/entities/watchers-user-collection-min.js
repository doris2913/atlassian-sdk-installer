define("jira/viewissue/watchers-voters/entities/watchers-user-collection",["jira/viewissue/watchers-voters/entities/user-collection","jira/util/data/meta"],function(e,t){"use strict";return e.extend({initialize:function(i){this.canBrowseUsers=t.get("can-search-users"),this.isReadOnly=!t.get("can-edit-watchers");var s={issueKey:i,endpoint:"watchers",modelKey:"watchers"};e.prototype.initialize.apply(this,[s])},addWatcher:function(e){return this.ajax({type:"POST",data:'"'+e+'"'})},removeWatcher:function(e){return this.ajax({type:"DELETE",url:this.url()+"?username="+e})}})});