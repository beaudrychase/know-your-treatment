// Dependencies
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';



// Global Constants
const caleb = 0;
const travis = 1;
const brendan = 2;
const woo = 3;
const beaudry = 4;
const chris = 5;
const authorNames = ["cmibarnwell", "Travis Llado", "brendan miller", "woojunan", "Beaudry Chase", "Chris" ];
const usernames =   ["cmibarnwell", "tllado",       "bpatmiller",     "woojunan", "beaudrychase",  "csauce"];
const gitlabProjectURL = "https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4";
const gitlabCommitsURL = "https://gitlab.com/api/v4/projects/7160520/repository/commits?per_page=100&private_token=eX7szajR1g6q1C9hyCr4";
const gitlabIssuesURL =  "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4";



// Page builder
export default class About extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            ourDescription: "",
            ourName:        "",
            ourURL:         "",
            ourLastChange:  "",
            numCommits:     [0, 0, 0, 0, 0, 0],
            numIssues:      [0, 0, 0, 0, 0, 0],
            numTests:       [0, 0, 0, 8, 34, 0]
        };
    }

    componentDidMount() {
        // Get project data
        fetch(gitlabProjectURL)
        .then(results => results.json())
        .then(projectData => this.setState({
            ourDescription: projectData.description,
            ourName:        projectData.name,
            ourURL:         projectData.web_url,
            ourLastChange:  projectData.last_activity_at
        }));

        // Counts the number of times each name appears on the list
        function tally(ourList, ourNames) {
            // console.log(ourList);
            // console.log(ourNames);
            var totals = [];
            ourNames.forEach(function() {
                totals.push(0)
            });

            ourList.forEach(function(thisItem) {
                for (var thisName = 0; thisName < ourNames.length; thisName++) {
                    if (thisItem == ourNames[thisName]) {
                        totals[thisName] += 1;
                    }
                }
            });

            return totals;
        }

        // Adds two arrays element-wise
        function addArrays(array1, array2) {
            for(var index = 0; index < array1.length; index++) {
                array1[index] = array1[index] + array2[index];
            }

            return array1;
        }

        // Get commits data
        // Assumes we have <= 10 pages of results (100 per page)
        for(var pageNum = 1; pageNum < 10; pageNum++) {
            fetch(gitlabCommitsURL + "&page=" + pageNum)
            .then(results => results.json())
            .then(commitsData => commitsData.map(thisCommit => thisCommit.author_name))
            .then(commitNames => tally(commitNames, authorNames))
            .then(thisPageTotals => addArrays(thisPageTotals, this.state.numCommits))
            .then(allPagesTotals => this.setState({numCommits: allPagesTotals}));
        }

        // Get issues data
        // Assumes we have <= 10 pages of results (100 per page)
        fetch(gitlabIssuesURL)
        .then(results => results.json())
        .then(issuesData => issuesData.map(thisIssue => thisIssue.author.username))
        .then(issueNames => tally(issueNames, usernames))
        .then(thisPageTotals => addArrays(thisPageTotals, this.state.numIssues))
        .then(allPagesTotals => this.setState({numIssues: allPagesTotals}));

        // Get tests data
        console.log("You need to code up your test counter");
    }

    render() {
        return(
        <div>
            <h2 class="display-3 text-center">About Our Project:</h2>
            <table align="center" width="800">
                <p>We are six Software Engineering students from the University of Texas at Austin and we are creating <b>{this.state.ourDescription}</b>.</p>
                <p>Our Gitlab project, <b>{this.state.ourName}</b>, was last updated at <b>{this.state.ourLastChange}</b> and is available at <b><a href={this.state.ourURL}>{this.state.ourURL}</a></b>.</p>
                <p>Our API documentation is available on <b><a href="https://documenter.getpostman.com/view/4692440/RWEmKHEN">Postman</a></b> and our technical report is available on <b><a href="https://knowyourtreatment.gitbook.io/project">Gitbook</a></b>.</p>
            </table>
            <table align="center" cellpadding="10">
                <tr>
                    <td>
                        <h2>Our Team</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_caleb.jpg" width="200"></img>
                    </td>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_travis.jpg" width="200"></img>
                    </td>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_brendan.jpg" width="200"></img>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Caleb Barnwell</h3>
                    </td>
                    <td>
                        <h3>Travis Llado</h3>
                    </td>
                    <td>
                        <h3>Brendan Miller</h3>
                    </td>
                </tr>
                <tr>
                    <td width="240" valign="top">
                        Caleb is working on his BS in Computer Science and Mathematics. He is from Bozeman, MT and Midland, TX. He enjoys snowboarding, RPG games, and reading.
                    </td>
                    <td width="240" valign="top">
                        Travis is a robotics engineer who wants to write better software
                    </td>
                    <td width="240" valign="top">
                        Brendan is a mathematician who wishes he were better at Algebra and frontend development.
                    </td>
                </tr>
                <tr>
                    <td><p>
                        Responsibilities: Fullstack<br></br>
                        Number of commits: {this.state.numCommits[caleb].toString()}<br></br>
                        Number of issues: {this.state.numIssues[caleb].toString()}<br></br>
                        Number of tests: {this.state.numTests[caleb].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: {this.state.numCommits[travis].toString()}<br></br>
                        Number of issues: {this.state.numIssues[travis].toString()}<br></br>
                        Number of tests: {this.state.numTests[travis].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: {this.state.numCommits[brendan].toString()}<br></br>
                        Number of issues: {this.state.numIssues[brendan].toString()}<br></br>
                        Number of tests: {this.state.numTests[brendan].toString()}
                    </p></td>
                </tr>
                <tr>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_woo.jpg" width="200"></img>
                    </td>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_beaudry.jpg" width="200"></img>
                    </td>
                    <td>
                        <img src="https://gitlab.com/cmibarnwell/idb-project-swe/raw/master/website_frontend/assets/images/profile_chris.jpg" width="200"></img>
                    </td>
                </tr>
                <tr>
                    <td>
                        <h3>Woo An</h3>
                    </td>
                    <td>
                        <h3>Beaudry Chase</h3>
                    </td>
                    <td>
                        <h3>Chris Sauceda</h3>
                    </td>
                </tr>
                <tr>
                    <td width="240" valign="top">
                        UT CS major who enjoys watching and playing basketball
                    </td>
                    <td width="240" valign="top">
                        Student at UT Austin. Studies CS and dabbles in rock climbing.
                    </td>
                    <td width="240" valign="top">
                        Senior ECE major
                    </td>
                </tr>
                <tr>
                    <td><p>
                        Responsibilities: Fullstack<br></br>
                        Number of commits: {this.state.numCommits[woo].toString()}<br></br>
                        Number of issues: {this.state.numIssues[woo].toString()}<br></br>
                        Number of tests: {this.state.numTests[woo].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: {this.state.numCommits[beaudry].toString()}<br></br>
                        Number of issues: {this.state.numIssues[beaudry].toString()}<br></br>
                        Number of tests: {this.state.numTests[beaudry].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: {this.state.numCommits[chris].toString()}<br></br>
                        Number of issues: {this.state.numIssues[chris].toString()}<br></br>
                        Number of tests: {this.state.numTests[chris].toString()}
                    </p></td>
                </tr>
            </table>
            <table align="center" width="800">
                <h2>Our Tools</h2>
                <b>GitLab​</b>
                <p>GitLab is the git repository manager that we use to develop knowyourtreatment.com.</p>

                ​<b>Postman​</b>
                <p>Postman is a HTTP client for testing web services. For this project we used it for developing our RESTful API.</p>

                ​<b>Amazon Web Services​</b>
                <p>Amazon Web Services is a cloud services platform that we used to host our development and production websites.</p>

                ​<b>GitBook​</b>
                <p>GitBook is a documentation platform that we used to write our technical reports.</p>

                ​<b>Bootstrap​</b>
                <p>Bootstrap is a frontend framework that we used for designing our website.</p>

                ​<b>Slack​</b>
                <p>Slack is a team communication tool that is great for development projects. It has integrations for many of the other tools that we used such as GitLab and Postman.</p>
            </table>
            <footer class="container">
                <p>© Know Your Treatment 2018</p>
            </footer>
        </div>
    );}
}