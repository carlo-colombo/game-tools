(function($) {
	$.domReady(function() {
		var buttons = {},
			count = 0,
			block = $('<div class="block">');

		['red','green','yellow'].forEach(function(color) {
			buttons[color] = $('<div class="button">').attr({
				id: color
			}).appendTo('#left')
		})

		$('#left').on('.button','click',function(){
			$(block[0].cloneNode(true))
				.text(++count)
				.addClass(this.id)
				.appendTo('#right')

			var button = buttons[this.id].addClass('opacity')

			setTimeout(function(){
				button.removeClass('opacity')
			},250)
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