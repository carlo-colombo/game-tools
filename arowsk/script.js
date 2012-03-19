(function($) {
	$.domReady(function() {
		var count = total = prompt("Arrows?"),
			button = $('#button'),
			counter = $('#counter');

		counter.text(total)

		button.on('click',function(){
			if (count>0){
				counter.text(--count)
				button.addClass('opacity')
				setTimeout(function(){
					button.removeClass('opacity')
				},250)
			}
		})

		$('#corner').on('click',function(){
			count = parseInt(prompt("Arrows?"))
			counter.text(count)
		})

		$('body').poke({
			'N' : function(){
				count = total
				counter.text(total)		
			}
		})
	})

	window.scrollTo(0,50);
})(ender)