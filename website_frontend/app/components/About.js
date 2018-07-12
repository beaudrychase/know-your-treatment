import React from 'react';

const element1 = (
    <div>
        <h1>Hello World!</h1>
        <h2>These are words.</h2>
    </div>
);

const element2 = (
    <div>
        <h2 class="display-3 text-center">About Our Project:</h2>
        <p>We are six Software Engineering students from the University of Texas at Austin and we are creating <b><span id="ourDescription"></span></b>.</p>
        <p>Our Gitlab project, <b><span id="ourName"></span></b>, last updated on <b><span id="ourLastChange"></span></b>, can be found at <b><a id="ourHREF"><span id="ourURL"></span></a></b>.</p>
        <p>Our API documentation can be found on <b><a href="https://documenter.getpostman.com/view/4692440/RWEmKHEN">Postman</a></b>.</p>
        <table align="center" cellpadding="10">
            <tr>
                <td>
                    <h2>Our Team</h2>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="assets/images/profile_caleb.jpg" width="200"></img>
                </td>
                <td>
                    <img src="assets/images/profile_travis.jpg" width="200"></img>
                </td>
                <td>
                    <img src="assets/images/profile_brendan.jpg" width="200"></img>
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
                <td>
                    Responsibilities: Fullstack<br></br>
                    Number of commits: <span id="calebCommits"></span><br></br>
                    Number of issues: <span id="calebIssues"></span><br></br>
                    Number of tests: <span id="calebTests"></span><br></br>
                </td>
                <td>
                    Responsibilities: Frontend<br></br>
                    Number of commits: <span id="travisCommits"></span><br></br>
                    Number of issues: <span id="travisIssues"></span><br></br>
                    Number of tests: <span id="travisTests"></span><br></br>
                </td>
                <td>
                    Responsibilities: Backend<br></br>
                    Number of commits: <span id="brendanCommits"></span><br></br>
                    Number of issues: <span id="brendanIssues"></span><br></br>
                    Number of tests: <span id="brendanTests"></span><br></br>
                </td>
            </tr>
            <tr>
                <td>
                    <img src="assets/images/profile_woo.jpg" width="200"></img>
                </td>
                <td>
                    <img src="assets/images/profile_beaudry.jpg" width="200"></img>
                </td>
                <td>
                    <img src="assets/images/profile_chris.jpg" width="200"></img>
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
                <td>
                    Responsibilities: Frontend<br></br>
                    Number of commits: <span id="wooCommits"></span><br></br>
                    Number of issues: <span id="wooIssues"></span><br></br>
                    Number of tests: <span id="wooTests"></span><br></br>
                </td>
                <td>
                    Responsibilities: Backend<br></br>
                    Number of commits: <span id="beaudryCommits"></span><br></br>
                    Number of issues: <span id="beaudryIssues"></span><br></br>
                    Number of tests: <span id="beaudryTests"></span><br></br>
                </td>
                <td>
                    Responsibilities: Fullstack<br></br>
                    Number of commits: <span id="chrisCommits"></span><br></br>
                    Number of issues: <span id="chrisIssues"></span><br></br>
                    Number of tests: <span id="chrisTests"></span><br></br>
                </td>
            </tr>
        </table>
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
        <p>Slack is a team communication tool. Put simply, its a juiced up messenger app. It is great for team communication on development projects. It has integrations for many of the other tools that we used such as GitLab and Postman.</p>
    </div>
);

export default class About extends React.Component {
    render() {
        return (
            element2
        );
    }
}