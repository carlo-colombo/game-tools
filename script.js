(function($) {
	$.domReady(function() {

		['green', 'yellow', 'red'].forEach(function(color) {
			$('#left').append($('<div>').attr({
				id: color,
				'class': 'button',
			}).css('background-color', color))
		})

		var count = 0
		$('#left').on('.button','click',function(){
			$('<div>')
				.attr({
					'class': 'block'
				})
				.text(++count)
				.css('background-color',this.id).appendTo('#right')
		})
	})

	window.scrollTo(0,50);
})(ender)