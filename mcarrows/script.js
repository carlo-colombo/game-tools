(function($,bean) {
    var setCounter = function(counterId, value){
        var counter = document.getElementById(counterId)
        counter.children[1].textContent=value
        counter.setAttribute('data-value',value)
        return counter
    }

    var makeCounter = function(counterId,name,value){
        var counter = document
            .getElementById('original-counter')
            .cloneNode(true),
        children = counter.children
        children[0].textContent=name
        children[1].textContent=value
        counter.setAttribute('data-name',name)
        counter.setAttribute('data-value',value)
        counter.id=counterId
        document.body.appendChild(counter)
        return counter
    }

    function serialize(counter){
        localStorage.setItem(
            counter.id,
            JSON.stringify({
                name: counter.getAttribute('data-name'),
                value: counter.getAttribute('data-value'),
            })
        );
    }

    function pageX(evt){
        return Array.prototype.pop.call(evt.touches).pageX
    }

    console.log("start")
    $.domReady(function() {
        Object.keys(localStorage).forEach(function(k){
            var counter = JSON.parse(localStorage[k])
            makeCounter(k
                ,counter['name']
                ,counter['value'])
        })

        var startX, length, timer

        $("#add-counter").on('click',function(){
            serialize(makeCounter("counter-"+document.getElementsByClassName('counter').length
                ,prompt("Counter name?")
                ,parseInt(
                    prompt("Counter initial value?"))||0))
        })
        $('body').on('click', '.counter',function(){
            console.log('click');
            var c = (parseInt(this.children[1].textContent) || 1) - 1 ;
            this.children[1].textContent=c 
            this.setAttribute('data-value',c)
            serialize(this)
        }).on('touchstart','.counter',function(e){
            startX = pageX(e)
            $(this).addClass('touched')
        }).on('touchmove','.counter',function(e){
            length = startX - pageX(e)
            var time = startTime - Date.now()
        }).on('touchend','.counter',function(e){
            $(this).removeClass('touched');
            if (Math.abs(length) > 60){
                $(this).trigger(
                    'swipe-' + (length>0?'left':'right'))
            }
            length=0;
        }).on('swipe-left','.counter',function(data){
            if(confirm("Remove counter " + counter.getAttribute('data-name') + "?")){
                var counter = document.body.removeChild(counter);
                localStorage.removeItem(counter.id)
            }
        }).on('dblclick','.counter',function(){
            serialize(setCounter(this.id
                ,prompt("New counter value?") ))
        }).on('touchstart mousedown','.counter',function(){
            var counter = this
            timer = setTimeout(function(){
                serialize(setCounter(counter.id
                    ,prompt("New counter value?") ))
            },800);
        }).on('touchend mouseup',function(){
            clearTimeout(timer);
        })
    })
})(ender)