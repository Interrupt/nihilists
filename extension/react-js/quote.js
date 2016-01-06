function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var QuoteArea = React.createClass({
	render: function() {
		var imgUrl = this.state.img;
		var style = {
			backgroundImage: 'url(philosopher images/' + imgUrl + ')'
		}

		return (
			<div>
				<div className="quote">
					{this.state.quote} 
					<span className="author">- {this.state.name}</span>
				</div>
			</div>);
	},
	getInitialState: function() {
		return { "name": "", "quote": "", "img": "" };
	},
	componentDidMount: function() {
	    $.get("js/data/quotes.json", function(result) {
    		var data = JSON.parse(result);

    		Math.seedrandom(makeDailySeed());

    		var quote = data.quotes[getRandomIntInclusive(0, data.quotes.length - 1)];
    		var author = data.philosophers[quote.philosopher_id];

    		this.setState({
    			name: author.name,
    			quote: quote.quote,
    			img: author.image
    		});

	    }.bind(this));
  	}
});