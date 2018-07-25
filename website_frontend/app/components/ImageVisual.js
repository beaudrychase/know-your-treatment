import React from 'react';

export default class ImageVisual extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: []
		};

		this.fetchImages = this.fetchImages.bind(this);
	}

	fetchImages(apiName) {
		const baseUrl = 'http://api.knowyourtreatment.com/api/';
		var images = [];
		fetch(baseUrl + apiName)
		.then(results => results.json())
		.then(data => {
			const pages = data.total_pages;
			images.push(data.objects.map((d) => {
				return d.image_link;
			}));
			var i;
			for(i=2; i<=pages; i++) {
				fetch(baseUrl + apiName + '?page=' + i)
				.then(results => results.json())
				.then(data => {
					return data.objects.map((d) => {
						return d.image_link
					})
				})
				.then(img => {
					images.push(img);
				})
			}
		});

		return new Promise((resolve, reject) => {resolve(images);});
	}

	componentWillMount() {
		Promise.all([this.fetchImages('treatment'), this.fetchImages('disease')])
		.then(images => {
			console.log(images);
			console.log('Image:' + images[0][0][1]);
			var imgLinks = [];
			var i;
			for(i=0; i<2; i++) {
				var j;
				for(j=0; j<images[i].length; j++) {
					var k;
					for(k=0; k<images[i][j].length; k++) {
						var val = images[i][j][k];
						console.log('ImageLink: ' + val);
						if(val != '') imgLinks.push(val);
					}
				}
			}
			this.setState({images: imgLinks}); 	
		});
	}
	
	render() {
		return(
			<div>
				{this.state.images.map((i) => {return <p>{i}</p>;})}
			</div>
		);
	}
}