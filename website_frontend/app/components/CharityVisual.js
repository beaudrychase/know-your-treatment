import React from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

export default class CharityVisual extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            images: ['boi', 'hey'],
            test: 'TEST'
        }

        this.fetchImages = this.fetchImages.bind(this)
        this.makeChart = this.makeChart.bind(this)
    }

    componentDidMount() {
        this.makeChart()
    }

    componentDidUpdate() {
        this.makeChart()
    }

    fetchImages(apiName) {
        const baseUrl = 'http://api.knowyourtreatment.com/api/'
        var images = []
        fetch(baseUrl + apiName)
        .then(results => results.json())
        .then(data => {
            const pages = data.total_pages;
            Array.prototype.push.apply(images, data.objects.filter(d => d.image_link != '')
            .map(e => e.image_link))
            var i;
            for(i=2; i<=pages; i++) {
                fetch(baseUrl + apiName + '?page=' + i)
                .then(results => results.json())
                .then(data => {
                    return data.objects.filter(d => d.image_link != '')
                    .map(e => e.image_link);
                })
                .then(img => {
                    Array.prototype.push.apply(images, img)
                    this.setState({images: images})
                })
            }
            this.setState({images: images})
        });
    }

    makeChart() {
        const node = this.node
        var scale = d3.scaleLinear()
                      .domain([0, 20])
                      .range([0, 1500])
        d3.select(node)
            .selectAll('rect')
            .data(this.state.data)
            .enter()
            .append('rect')
            .attr('width', 30)
            .attr('height', r => scale(r))
            .attr('x', (r, i) => i * 30)
            .attr('y', r => 500 - scale(r))
            .style('fill', 'green')
            .style('stroke', 'black')
            .style('stroke-width', '1px')
    }

    componentWillMount() {
        this.fetchImages('treatment')
        console.log(this.state.data);

        fetch('http://api.knowyourtreatment.com/api/charity')
        .then(results => results.json())
        .then(data => {
            var dictionary = []
            var occurrences = []
            const pages = data.total_pages
            data.objects.map(c => {
                var cat = c.category
                if(dictionary.length > 0) {
                    let index = dictionary.indexOf(cat)
                    if(index == -1) {
                        dictionary.push(cat)
                        occurrences.push(1)
                    } else {
                        occurrences[index] = occurrences[index] + 1
                    }
                } else {
                    dictionary.push(cat)
                    occurrences.push(1)
                }
            })
            var i;
            for(i=2; i<=pages; i++) {
                fetch('http://api.knowyourtreatment.com/api/charity?page=' + i)
                .then(results => results.json())
                .then(data => {
                    data.objects.map(c => {
                        var cat = c.category
                        if(dictionary.length > 0) {
                            let index = dictionary.indexOf(cat)
                            if(index == -1) {
                                dictionary.push(cat)
                                occurrences.push(1)
                            } else {
                                occurrences[index] = occurrences[index] + 1
                            }
                        } else {
                            dictionary.push(cat)
                            occurrences.push(1)
                        }
                    })
                    this.setState({data:occurrences})
                })
            }
            this.setState({data:occurrences})
        })
        .then(data => this.makeChart())

    }
    
    render() {
        return(
            <div>
                <h1>Number of Charities per Condition </h1>
                <svg ref={node => this.node = node} width={500} height={500} style={{border: '1px solid'}}></svg>

                <br /><br />

                <table width="720">
                    <tr align="center"><td colspan="4"><h1>Commits per Author, per Project Phase</h1></td></tr>
                    <tr><td colspan="4"><img src={require("./images/chart_commits.png")} width="600" /></td></tr>
                    <tr><td>Phase 1</td><td>Phase 2</td><td>Phase 3</td><td>Phase 4</td></tr>
                </table>

                <br /><br />

                <h1>Associated Media</h1>
                <div>{this.state.images && this.state.images.map(i => <img src={i} />)}</div>

                <br /><br />

                <table>
                    <tr><td><h3>Visualizations for our Provider:</h3></td></tr>
                    <tr><td><a href="http://www.ourplaceholderwebsite.me.s3-website.us-east-2.amazonaws.com/vis1.html">Commits by User, by Phase</a></td></tr>
                    <tr><td><a href="http://www.ourplaceholderwebsite.me.s3-website.us-east-2.amazonaws.com/vis2.html">Average Book Length by Subject</a></td></tr>
                    <tr><td><a href="http://www.ourplaceholderwebsite.me.s3-website.us-east-2.amazonaws.com/vis3.html">Number of Pages in the Book vs Number of Letter in the Title</a></td></tr>
                </table>
                <hr />
                <footer className="container">
                    <p>© Know Your Treatment 2018</p>
                </footer>
            </div>
        )
    }
}