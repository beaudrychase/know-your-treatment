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
            document.getElementById('memberNames').innerHTML = names;
            document.getElementById('memberUsernames').innerHTML = usernames;
        }
    );
    // Get issues information
    $.get(
        "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4",
        function(gitlabData) {
            var numIssues = [];
            usernames.forEach(function(element){numIssues.push(0);});
            gitlabData.forEach(
                function(element) {
                    var ii;
                    for (ii = 0; ii < usernames.length; ii++) {
                        if (element.author.username == usernames[ii]) {
                            numIssues[ii] += 1;
                        }
                    }
                }
            );
            document.getElementById('issuesCreated').innerHTML = numIssues;
        }
    );
    // Get commits information
    $.get(
        "https://gitlab.com/api/v4/projects/7160520/repository/commits?per_page=100&private_token=eX7szajR1g6q1C9hyCr4",
        function(gitlabData) {
            var numCommits = [];
            usernames.forEach(function(element){numCommits.push(0);});
            gitlabData.forEach(
                function(element) {
                    var ii;
                    for (ii = 0; ii < usernames.length; ii++) {
                        if (element.author_name == usernames[ii]) {
                            numCommits[ii] += 1;
                        }
                    }
                }
            );
            document.getElementById('issuesCreated').innerHTML = numCommits;
        }
    );
// });