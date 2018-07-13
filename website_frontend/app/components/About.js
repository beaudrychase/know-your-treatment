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
const authorNames = ["cmibarnwell", "Travis Llado", "brendan miller", "woojunan", "beaudrychase", "Chris" ];
const usernames =   ["cmibarnwell", "tllado",       "bpatmiller",     "woojunan", "beaudrychase", "csauce"];
const gitlabProjectURL = "https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4";
const gitlabCommitsURL = "https://gitlab.com/api/v4/projects/7160520/repository/commits?per_page=100&private_token=eX7szajR1g6q1C9hyCr4";
const gitlabIssuesURL =  "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4";

// Global Variables
var numCommits = [0, 0, 0, 0, 0, 0];
var numIssues = [0, 0, 0, 0, 0, 0];
var numTests = [0, 0, 0, 0, 0, 0];



// Page builder
export default class About extends React.Component {
	constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        // Get project data
        fetch(gitlabProjectURL)
        .then(results => results.json())
        .then(projectData => this.setState({
            ourDescription: projectData.description,
            ourName:        projectData.name,
            ourURL:         projectData.web_url,
            ourLastChange:  projectData.last_activity_at
        }));

        // Get commits data
        fetch(gitlabCommitsURL)
        .then(results => results.json())
        .then(function(commitsData) {
            commitsData.forEach(function(element) {
                for (var index = 0; index < authorNames.length; index++) {
                    if (element.author_name == authorNames[index]) {
                        numCommits[index] += 1;
                    }
                }
            });
        });

        // Get issues data
        fetch(gitlabIssuesURL)
        .then(results => results.json())
        .then(function(issuesData) {
            issuesData.forEach(function(element) {
                for (var index = 0; index < usernames.length; index++) {
                    if (element.author.username == usernames[index]) {
                        numIssues[index] += 1;
                    }
                }
            });
        });
    }

    render() {
        console.log("commits: " + numCommits.toString());
        console.log("issues:  " + numIssues.toString());
        return(
        <div>
            <h2 class="display-3 text-center">About Our Project:</h2>
            <table align="center" width="800">
                <p>We are six Software Engineering students from the University of Texas at Austin and we are creating <b>{this.state.ourDescription}</b>.</p>
                <p>Our Gitlab project, <b>{this.state.ourName}</b>, was last updated at <b>{this.state.ourLastChange}</b> and is available at <b><a href={this.state.ourURL}>{this.state.ourURL}</a></b>.</p>
                <p>Our API documentation is available on <b><a href="https://documenter.getpostman.com/view/4692440/RWEmKHEN">Postman</a></b> and our Technical Report is available on <b><a href="https://knowyourtreatment.gitbook.io/project">Gitbook</a></b>.</p>
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
                        Number of commits: {numCommits[caleb].toString()}<br></br>
                        Number of issues: {numIssues[caleb].toString()}<br></br>
                        Number of tests: {numTests[caleb].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: {numCommits[travis].toString()}<br></br>
                        Number of issues: {numIssues[travis].toString()}<br></br>
                        Number of tests: {numTests[travis].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: {numCommits[brendan].toString()}<br></br>
                        Number of issues: {numIssues[brendan].toString()}<br></br>
                        Number of tests: {numTests[brendan].toString()}
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
                        Number of commits: {numCommits[woo].toString()}<br></br>
                        Number of issues: {numIssues[woo].toString()}<br></br>
                        Number of tests: {numTests[woo].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: {numCommits[beaudry].toString()}<br></br>
                        Number of issues: {numIssues[beaudry].toString()}<br></br>
                        Number of tests: {numTests[beaudry].toString()}
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: {numCommits[chris].toString()}<br></br>
                        Number of issues: {numIssues[chris].toString()}<br></br>
                        Number of tests: {numTests[chris].toString()}
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