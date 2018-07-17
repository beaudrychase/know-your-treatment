// Dependencies
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
// import {addArrays, tally} from './aboutTools.js';
var tools = require('./aboutTools');



// Global Constants
const caleb = 0;
const travis = 1;
const brendan = 2;
const woo = 3;
const beaudry = 4;
const chris = 5;
const authorEmails = ["calebbarnwell@gmail.com", "travisllado@utexas.edu", "brendanmiller.ca@gmail.com", "woo.an31@live.com", "beauchase213@gmail.com", "csauce@utexas.edu"];
// const authorNames = ["cmibarnwell", "Travis Llado", "brendan miller", "woojunan", "Beaudry Chase", "Chris" ];    // used to use these for counting commits
const usernames =   ["cmibarnwell", "tllado",       "bpatmiller",     "woojunan", "beaudrychase",  "csauce"];
const gitlabProjectURL = "https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4";
const gitlabCommitsURL = "https://gitlab.com/api/v4/projects/7160520/repository/commits?per_page=100&private_token=eX7szajR1g6q1C9hyCr4";
const gitlabIssuesURL =  "https://gitlab.com/api/v4/projects/7160520/issues?scope=all&per_page=100&private_token=eX7szajR1g6q1C9hyCr4";



// Page builder
export default class About extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            ourDescription: "",                     // will be automatically found
            ourName:        "",                     // will be automatically found
            ourURL:         "",                     // will be automatically found
            ourLastChange:  "",                     // will be automatically found
            numCommits:     [0, 8, 0, 0, 0, 0],     // will be automatically counted, but some people used multiple email addresses
            numIssues:      [0, 0, 0, 0, 0, 0],     // will be automatically counted
            numTests:       [0, 9, 0, 12, 34, 0]    // was counted by hand
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

        // Get commits data
        // Assumes we have <= 1000 results (100 per page, 10 pages)
        // a while loop that checks the length of the last result would be good,
        // but that would require us to fetch twice or break our fetches into 
        // multiple functions
        for(var pageNum = 1; pageNum < 10; pageNum++) {
            fetch(gitlabCommitsURL + "&page=" + pageNum)
            .then(results => results.json())
            .then(commitsData => commitsData.map(thisCommit => thisCommit.author_email))
            .then(commitNames => tools.tally(commitNames, authorEmails))
            .then(thisPageTotals => tools.addArrays(thisPageTotals, this.state.numCommits))
            .then(allPagesTotals => this.setState({numCommits: allPagesTotals}));
        }

        // Get issues data
        // Assumes we have <= 1000 results (100 per page, 10 pages)
        // a while loop that checks the length of the last result would be good,
        // but that would require us to fetch twice or break our fetches into 
        // multiple functions
        for(var pageNum = 1; pageNum < 10; pageNum++) {
            fetch(gitlabIssuesURL + "&page=" + pageNum)
            .then(results => results.json())
            .then(issuesData => issuesData.map(thisIssue => thisIssue.author.username))
            .then(issueNames => tools.tally(issueNames, usernames))
            .then(thisPageTotals => tools.addArrays(thisPageTotals, this.state.numIssues))
            .then(allPagesTotals => this.setState({numIssues: allPagesTotals}));
        }

        // Get tests data
        console.log("You need to code up an automatic test counter");
    }

    render() {
        return(
            <div>
                <h2 class="display-3 text-center">About Our Project</h2>
                <table align="center" width="800">
                    <p>We are six Software Engineering students from the University of Texas at Austin and we are creating <b>{this.state.ourDescription}</b>.</p>
                    <p>Our Gitlab project, <b>{this.state.ourName}</b>, was last updated at <b>{this.state.ourLastChange}</b> and is available at <b><a href={this.state.ourURL}>{this.state.ourURL}</a></b>.</p>
                    <p>Our API documentation is available on <b><a href="https://documenter.getpostman.com/view/4692440/RWMBSAp3">Postman</a></b> and our technical report is available on <b><a href="https://knowyourtreatment.gitbook.io/project">Gitbook</a></b>.</p>
                </table>
                <table align="center" cellPadding="10">
                    <tr>
                        <td>
                            <h2>Our Team</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={require("./images/profile_caleb.jpg")} width="200" />
                        </td>
                        <td>
                            <img src={require("./images/profile_travis.jpg")} width="200" />
                        </td>
                        <td>
                            <img src={require("./images/profile_brendan.jpg")} width="200" />
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
                            Responsibilities: Fullstack<br />
                            Number of commits: {this.state.numCommits[caleb].toString()}<br />
                            Number of issues: {this.state.numIssues[caleb].toString()}<br />
                            Number of tests: {this.state.numTests[caleb].toString()}
                        </p></td>
                        <td><p>
                            Responsibilities: Frontend<br />
                            Number of commits: {this.state.numCommits[travis].toString()}<br />
                            Number of issues: {this.state.numIssues[travis].toString()}<br />
                            Number of tests: {this.state.numTests[travis].toString()}
                        </p></td>
                        <td><p>
                            Responsibilities: Backend<br />
                            Number of commits: {this.state.numCommits[brendan].toString()}<br />
                            Number of issues: {this.state.numIssues[brendan].toString()}<br />
                            Number of tests: {this.state.numTests[brendan].toString()}
                        </p></td>
                    </tr>
                    <tr>
                        <td>
                            <img src={require("./images/profile_woo.jpg")} width="200" />
                        </td>
                        <td>
                            <img src={require("./images/profile_beaudry.jpg")} width="200" />
                        </td>
                        <td>
                            <img src={require("./images/profile_chris.jpg")} width="200" />
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
                            Responsibilities: Fullstack<br />
                            Number of commits: {this.state.numCommits[woo].toString()}<br />
                            Number of issues: {this.state.numIssues[woo].toString()}<br />
                            Number of tests: {this.state.numTests[woo].toString()}
                        </p></td>
                        <td><p>
                            Responsibilities: Backend<br />
                            Number of commits: {this.state.numCommits[beaudry].toString()}<br />
                            Number of issues: {this.state.numIssues[beaudry].toString()}<br />
                            Number of tests: {this.state.numTests[beaudry].toString()}
                        </p></td>
                        <td><p>
                            Responsibilities: Frontend<br />
                            Number of commits: {this.state.numCommits[chris].toString()}<br />
                            Number of issues: {this.state.numIssues[chris].toString()}<br />
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
                <hr />
                <footer class="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
            </div>
        );
    }
}
