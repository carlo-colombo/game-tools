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

		$('body').poke({
			'N' : function(){
				$('#right .block').remove()
				count = 0
			}
		})
	})

	window.scrollTo(0,50);
})(ender)