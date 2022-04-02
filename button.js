AFRAME.registerComponent('createbuttons',{
    init:function(){
        var b1=document.createElement('button')
        b1.innerHTML='Order Now!'
        b1.setAttribute('id','order-button')
        b1.setAttribute('class','btn btn-danger ml-3 mr-3');

        var b2=document.createElement('button')
        b2.innerHTML="Order Summary"
        b2.setAttribute('id','order-summary-button')
        b2.setAttribute('class','btn btn-danger-ml-3')
        
        var buttonDiv=document.getElementById('button-div')
        buttonDiv.appendChild(b2)
        buttonDiv.appendChild(b1)
    }
})