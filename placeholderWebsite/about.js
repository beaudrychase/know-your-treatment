// $(document).ready(function(){
    $.get("https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4", function(gitlabData){
        $("#ourDescription").html(gitlabData.description);
        $("#ourName").html(gitlabData.name);
        $("#ourCreatedAt").html(gitlabData.created_at);
        $("#ourURL").html(gitlabData.web_url);
        $("#ourReadme").html(gitlabData.readme_url);
        $("#ourStars").html(gitlabData.star_count);
        $("#ourForks").html(gitlabData.forks_count);
        $("#ourLastChange").html(gitlabData.last_activity_at);
    });
// });