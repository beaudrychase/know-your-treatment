// about.js
// Collects and processes information Gitlab information for our About page
// written by Travis Llado, travisllado@utexas.edu, last edited 2018-06-28



// global variables
var caleb = 0;
var travis = 1;
var brendan = 2;
var woo = 3;
var beaudry = 4;
var chris = 5;
var usernames =   ["cmibarnwell", "tllado",       "bpatmiller",     "woojunan", "beaudrychase", "csauce"];
var authorNames = ["cmibarnwell", "Travis Llado", "brendan miller", "woojunan", "beaudrychase", "Chris" ];

var gitlabProjectURL =  "https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4";
var gitlabIssuesURL =   "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4";
var gitlabCommitsURL =  "https://gitlab.com/api/v4/projects/7160520/repository/commits?per_page=100&private_token=eX7szajR1g6q1C9hyCr4";



// Get all of our About info
// window.onload = function getEverything() {
//     getProject();
//     getIssues();
//     getCommits();
//     getTests();
// }



// Get project information
// function getProject() {
    $.get(gitlabProjectURL, function(gitlabData) {
        document.getElementById('ourDescription').innerHTML = gitlabData.description;
        document.getElementById('ourName').innerHTML = gitlabData.name;
        document.getElementById('ourURL').innerHTML = gitlabData.web_url;
        document.getElementById("ourHREF").setAttribute("href",gitlabData.web_url);
        document.getElementById('ourLastChange').innerHTML = gitlabData.last_activity_at;
    });
// }



// Get issues information
// function getIssues() {
    $.get(gitlabIssuesURL, function(gitlabData) {
        var numIssues = [];
        usernames.forEach(function(element){numIssues.push(0);});

        gitlabData.forEach(function(element) {
            var ii;
            for (ii = 0; ii < usernames.length; ii++) {
                if (element.author.username == usernames[ii]) {
                    numIssues[ii] += 1;
                }
            }
        });

        document.getElementById('calebIssues').innerHTML = numIssues[caleb];
        document.getElementById('travisIssues').innerHTML = numIssues[travis];
        document.getElementById('brendanIssues').innerHTML = numIssues[brendan];
        document.getElementById('wooIssues').innerHTML = numIssues[woo];
        document.getElementById('beaudryIssues').innerHTML = numIssues[beaudry];
        document.getElementById('chrisIssues').innerHTML = numIssues[chris];
    });
// }



// Get commits information
// function getCommits() {
    $.get(gitlabCommitsURL, function(gitlabData) {
        // gitlab usernames and commit usernames aren't necessarily the same. need a better way to match these up.
        var numCommits = [];
        authorNames.forEach(function(element){numCommits.push(0);});

        gitlabData.forEach(function(element) {
            var ii;
            for (ii = 0; ii < authorNames.length; ii++) {
                if (element.author_name == authorNames[ii]) {
                    numCommits[ii] += 1;
                }
            }
        });

        document.getElementById('calebCommits').innerHTML = numCommits[caleb];
        document.getElementById('travisCommits').innerHTML = numCommits[travis];
        document.getElementById('brendanCommits').innerHTML = numCommits[brendan];
        document.getElementById('wooCommits').innerHTML = numCommits[woo];
        document.getElementById('beaudryCommits').innerHTML = numCommits[beaudry];
        document.getElementById('chrisCommits').innerHTML = numCommits[chris];
    });
// }



// Get tests information
// function getTests() {
    $.get(gitlabCommitsURL, function(gitlabData) {
        // Haven't created any tests yet, should create tests for javascript at least
        // Not sure how to count this dynamically, don't think gitlab has an automatic metric for it, will have to implement it through out own DB
        numTests = [0,0,0,0,0,0];

        document.getElementById('calebTests').innerHTML = numTests[caleb];
        document.getElementById('travisTests').innerHTML = numTests[travis];
        document.getElementById('brendanTests').innerHTML = numTests[brendan];
        document.getElementById('wooTests').innerHTML = numTests[woo];
        document.getElementById('beaudryTests').innerHTML = numTests[beaudry];
        document.getElementById('chrisTests').innerHTML = numTests[chris];
    });
// }



// End of file
