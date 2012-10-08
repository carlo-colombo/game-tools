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

    $.domReady(function() {
        Object.keys(localStorage).forEach(function(k){
            var counter = JSON.parse(localStorage[k])
            makeCounter(k
                ,counter['name']
                ,counter['value'])
        })

        var startX, length, timer,
            $body= $('body');

        $("#add-counter").on('click',function(){
            serialize(makeCounter("counter-"+document.getElementsByClassName('counter').length
                ,prompt("Counter name?")
                ,parseInt(
                    prompt("Counter initial value?"))||0))
        });

        var events={
            click: function(){
                var c = (parseInt(this.children[1].textContent) || 1) - 1 ;
                this.children[1].textContent=c 
                this.setAttribute('data-value',c)
                serialize(this)
            },
            touchstart: function(e){
                startX = pageX(e)
            },
            touchmove: function(e){
                length = startX - pageX(e)
            },
            swipeLeft: function(){
                if(confirm("Remove counter " + this.getAttribute('data-name') + "?")){
                    var counter = document.body.removeChild(this);
                    localStorage.removeItem(counter.id)
                }
            },
            'touchstart mousedown': function(){
                var counter = this
                timer = setTimeout(function(){
                    serialize(setCounter(counter.id
                        ,prompt("New counter value?") ))
                },800);
            },
            'touchend mouseup': function(){
                clearTimeout(timer);
            },
            'touchstart touchend':function(){
                $(this).toggleClass('touched')
            },
            touchend: function(){
                if (Math.abs(length) > 60){
                    $(this).trigger(
                        'swipe' + (length>0 ? 'Left':'Right'))
                }
                length = 0;
            }
        }
        
        Object.keys(events).forEach(function(event){
            $body.on(event,'.counter', events[event])
        });
    })
})(ender)