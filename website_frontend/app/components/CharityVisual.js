import React from 'react'
import * as d3 from 'd3'

export default class CharityVisual extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}

		this.makeChart = this.makeChart.bind(this)
	}

	componentDidMount() {
		this.makeChart()
	}

	componentDidUpdate() {
		this.makeChart()
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
				<h1>Number of Charities by Category </h1>
				<svg ref={node => this.node = node} width={500} height={500} style={{border: '1px solid'}}>
				</svg>
			</div>
		)
	}
}