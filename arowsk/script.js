(function($) {
	$.domReady(function() {
		var count 	= localStorage.getItem("count") || parseInt(prompt("Arrows?")) || 50,
			button 	= $('#button'),
			counter = $('#counter'),
			curry	= $('#curry')[0],
			setCount = function(c){
				localStorage.setItem("count", c)
				counter.text(c)	
			}

		setCount(count)

		button.on('click',function(){
			if (count>0){
				setCount(--count)
				button.addClass('opacity')
				setTimeout(function(){
					button.removeClass('opacity')
				},250)
				curry.play()
			}
		})

		$('#corner').on('click',function(){
			count = parseInt(prompt("Arrows?")) || 50
			setCount(count)
		})

		window.scrollTo(0,50);
	})
})(ender)