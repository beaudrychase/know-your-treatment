import React from 'react';
import { Link } from 'react-router-dom';

export default class ImageVisual extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			images: ['boi', 'hey'],
			test: 'TEST'
		}

		this.fetchImages = this.fetchImages.bind(this)
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

	componentWillMount() {
		this.fetchImages('treatment')
	}
	
	render() {
		return(
			<div>
				{this.state.images && this.state.images.map(i => <img src={i} />)}
			</div>
		)
	}
}