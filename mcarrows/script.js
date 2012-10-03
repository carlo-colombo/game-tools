(function($,bean) {

     window.makeCounter = function(counterId,name,value){
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

        var startX, length

        $("#add-counter").on('click',function(){
            serialize(makeCounter("counter-"+document.getElementsByClassName('counter').length
                ,prompt("Counter name?")
                ,parseInt(
                    prompt("Counter initial value?"))||0))
        })
        $('body').on('click', '.counter',function(){
            var c = (parseInt(this.children[1].textContent) || 1) - 1 ;
            this.children[1].textContent=c 
            this.setAttribute('value',c)
            serialize(this)
        }).on('touchstart','.counter',function(e){
            startX = pageX(e)
            $(this).addClass('touched')
        }).on('touchmove','.counter',function(e){
            length = startX - pageX(e)
        }).on('touchend','.counter',function(e){
            if (Math.abs(length) > 60){
                $(this).trigger(
                    'swipe-' + (length>0?'left':'right'))
            }
            length=0;
            $(this).removeClass('touched')
        }).on('swipe-left','.counter',function(data){
            if(confirm("Remove counter " + this.getAttribute('data-name') + "?")){
                var counter = document.body.removeChild(this);
                localStorage.removeItem(counter.id)
            }
        });
    })
})(ender)