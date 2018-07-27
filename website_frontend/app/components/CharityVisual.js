import React from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

export default class CharityVisual extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dict: [],
            images: [],
            timer: null
        }

        this.fetchImages = this.fetchImages.bind(this)
        this.makeChart = this.makeChart.bind(this)
        this.makeCollage = this.makeCollage.bind(this)
        this.collageAnim = this.collageAnim.bind(this)
        this.getRandomInt = this.getRandomInt.bind(this)
    }

    componentDidMount() {
        this.makeChart()
        var t = setInterval(this.collageAnim, 500)
	  	this.setState({timer: t})
    }

    componentDidUpdate() {
    	this.makeChart()
    	this.makeCollage()
    }

    componentWillUnmount() {
    	clearInterval(this.state.timer)
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
                })
                this.setState({images: images})
            }
            this.setState({images: images})
        })
        
    }

    collageAnim() {
    	const canv = this.canvas
    	var imgArr = d3.select(canv).selectAll('image').nodes()
    	var i = this.getRandomInt(0, imgArr.length)
    	var op = this.getRandomInt(0, 100) / 100

    	imgArr[i].parentElement.appendChild(imgArr[i])

    	d3.select(imgArr[i])
    	  .transition()
    	  .duration(2000)
    	  .ease(d3.easeElastic)
    	  .attr('x', this.getRandomInt(0, 300))
    	  .attr('y', this.getRandomInt(0, 300))
    	  .style('opacity', op)
    }

    makeCollage() {
    	const canv = this.canvas
    	d3.select(canv)
    	  .selectAll('image')
    	  .data(this.state.images)
    	  .enter()
    	  .append('svg:image')
    	  	.attr('xlink:href', d => d)
    	  	.attr('x', (d, i) => i * 30)
    	  	.attr('y', (d, i) => i * 30)
    	  	.attr('width', 200)
    	  	.attr('height', 200)
    }

    getRandomInt(min, max) {
	  min = Math.ceil(min)
	  max = Math.floor(max)
	  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
	}

	getRandomColor() {
    	switch(this.getRandomInt(0, 9)) {
    		case 0:
    		return 'blue'
    		break
    		case 1:
    		return 'indigo'
    		break
    		case 2:
    		return 'purple'
    		break
    		case 3:
    		return 'pink'
    		break
    		case 4:
    		return 'red'
    		break
    		case 5:
    		return 'orange'
    		break
    		case 6:
    		return 'yellow'
    		break
    		case 7:
    		return 'green'
    		break
    		case 8:
    		return 'teal'
    		break
    		case 9:
    		return 'cyan'
    	}
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
            .attr('x', (r, i) => i * 30)
            .attr('y', r => 500 - scale(r))
            .style('fill', this.getRandomColor())
            .style('stroke', 'black')
            .style('stroke-width', '1px')
            .transition()
            .ease(d3.easeBounce)
            .duration(2000)
            .attr('height', r => scale(r))

    }



    componentWillMount() {
        this.fetchImages('treatment')

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
                    this.setState({data: occurrences, dict: dictionary})
                })
            }
            this.setState({data: occurrences, dict: dictionary})
        })
        .then(data => this.makeChart())

    }
    
    render() {
        return(
            <div>
                <h1>Number of Charities per Category </h1>
                <svg ref={node => this.node = node} width={500} height={500} style={{border: '1px solid'}}></svg>

                <h1>Image Collage </h1>
                <svg ref={canvas => this.canvas = canvas} width={500} height={500} style={{border: '1px solid'}}></svg>

                <br /><br />

                <table width="720">
                	<tbody>
                    <tr align="center"><td colSpan="4"><h1>Commits per Author, per Project Phase</h1></td></tr>
                    <tr><td colSpan="4"><img src={require("./images/chart_commits.png")} width="600" /></td></tr>
                    <tr><td>Phase 1</td><td>Phase 2</td><td>Phase 3</td><td>Phase 4</td></tr>
                    </tbody>
                </table>

                <br /><br />
            </div>
        )
    }
}