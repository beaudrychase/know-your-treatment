// $(document).ready(function(){
    var usernames = [];
    // Get project information
    $.get(
        "https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4",
        function(gitlabData) {
            // $("#ourDescription").html(gitlabData.description);
            document.getElementById('ourDescription').innerHTML = gitlabData.description;
            // $("#ourName").html(gitlabData.name);
            document.getElementById('ourName').innerHTML = gitlabData.name;
            // $("#ourCreatedAt").html(gitlabData.created_at);
            // $("#ourURL").html(gitlabData.web_url);
            document.getElementById('ourURL').innerHTML = gitlabData.web_url;
            document.getElementById("ourHREF").setAttribute("href",gitlabData.web_url);
            // $("#ourReadme").html(gitlabData.readme_url);
            // $("#ourStars").html(gitlabData.star_count);
            // $("#ourForks").html(gitlabData.forks_count);
            // $("#ourLastChange").html(gitlabData.last_activity_at);
            document.getElementById('ourLastChange').innerHTML = gitlabData.last_activity_at;
        }
    );
    // Get team member information
    $.get(
        "https://gitlab.com/api/v4/projects/7160520/members?private_token=eX7szajR1g6q1C9hyCr4",
        function(gitlabData) {
            var names = [];
            gitlabData.forEach(
                function(element) {
                    names.push(element.name);
                    usernames.push(element.username);
                }
            );
            // $("#memberNames").html(names);
            document.getElementById('memberNames').innerHTML = names;
            // $("#memberUsernames").html(usernames);
            // document.getElementById('memberUsernames').innerHTML = usernames;
        }
    );
    // Get issues information
    $.get(
        "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4",
        function(gitlabData) {
            var numIssues = [0,0,0,0,0,0];
            // numIssues.apply(null, new Array(10)).map(Number.prototype.valueOf,0);
            // var allIssues = [];
            gitlabData.forEach(
                function(element) {
                    var ii;
                    for (ii = 0; ii < usernames.length; ii++) {
                        if (element.author.username == usernames[ii]) {
                            numIssues[ii] += 1;
                        }
                    }
                    // allIssues.push(element.author.username);
                }
            );
            document.getElementById('issuesCreated').innerHTML = numIssues;
        }
    );
    // Get commits information
    // $.get(
    //     "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4",
    //     function(gitlabData) {
    //         var numCommits = [0,0,0,0,0,0];
    //         // numIssues.apply(null, new Array(10)).map(Number.prototype.valueOf,0);
    //         // var allIssues = [];
    //         gitlabData.forEach(
    //             function(element) {
    //                 var ii;
    //                 for (ii = 0; ii < usernames.length; ii++) {
    //                     if (element.author.username == usernames[ii]) {
    //                         numIssues[ii] += 1;
    //                     }
    //                 }
    //                 allIssues.push(element.author.username);
    //             }
    //         );
    //         document.getElementById('issuesCreated').innerHTML = numIssues;
    //     }
    // );
// });