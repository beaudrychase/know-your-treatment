import React from 'react';

export default class About extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            ourDescription: [],
            ourName: []
        };
    }

    componentWillMount() {
        fetch("https://gitlab.com/api/v4/projects/7160520?private_token=eX7szajR1g6q1C9hyCr4")
        .then(results => results.json())
        .then(gitlabData => this.setState({
            ourDescription: gitlabData.description,
            ourName:        gitlabData.name,
            ourURL:         gitlabData.web_url,
            ourLastChange:  gitlabData.last_activity_at
        }));
    }

    render() {return(
        <div>
            <h2 class="display-3 text-center">About Our Project:</h2>
            <table align="center" width="800">
                <p>We are six Software Engineering students from the University of Texas at Austin and we are creating <b>{this.state.ourDescription}</b>.</p>
                <p>Our Gitlab project, <b>{this.state.ourName}</b>, last updated on <b>{this.state.ourLastChange}</b>, can be found at <b>{this.state.ourURL}</b>.</p>
                <p>Our API documentation can be found on <b><a href="https://documenter.getpostman.com/view/4692440/RWEmKHEN">Postman</a></b>.</p>
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
                        Number of commits: <span id="calebCommits"></span><br></br>
                        Number of issues: <span id="calebIssues"></span><br></br>
                        Number of tests: <span id="calebTests"></span>
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: <span id="travisCommits"></span><br></br>
                        Number of issues: <span id="travisIssues"></span><br></br>
                        Number of tests: <span id="travisTests"></span>
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: <span id="brendanCommits"></span><br></br>
                        Number of issues: <span id="brendanIssues"></span><br></br>
                        Number of tests: <span id="brendanTests"></span>
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
                        Number of commits: <span id="wooCommits"></span><br></br>
                        Number of issues: <span id="wooIssues"></span><br></br>
                        Number of tests: <span id="wooTests"></span>
                    </p></td>
                    <td><p>
                        Responsibilities: Backend<br></br>
                        Number of commits: <span id="beaudryCommits"></span><br></br>
                        Number of issues: <span id="beaudryIssues"></span><br></br>
                        Number of tests: <span id="beaudryTests"></span>
                    </p></td>
                    <td><p>
                        Responsibilities: Frontend<br></br>
                        Number of commits: <span id="chrisCommits"></span><br></br>
                        Number of issues: <span id="chrisIssues"></span><br></br>
                        Number of tests: <span id="chrisTests"></span>
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