var user_id=null
var userid;
AFRAME.registerComponent('markerhandler',{
    init:async function(){
        if(user_id===null){this.askUserId}
        var toys=await this.getToys()

        this.el.addEventListener('markerFound',()=>{
            if(user_id!==null){
            console.log("marker is found")
            var markerId=this.el.id;
            this.handleMarkerFound(toys,markerId)}
        })
        this.el.addEventListener('markerLost',()=>{
            console.log("marker is lost")
            this.handleMarkerLost()
        })
    },

    askUserId:function(){
        var iconUrl="https://github.com/whitehatjr/ar-toy-store-assets/blob/master/toy-shop.png?raw=true"

        swal({
            title:"WELCOME TO TOY STORE",
            icon:iconUrl,
            content:{
                element:'input',
                attributes:{placeholder:'Enter the user id here', type:'number', min:1,}
            },
            closeOnClickOutside:false,
        })
        .then(inputVal=>{tableNumber=inputVal})
    },

    handleMarkerFound:function(toys,markerId){

        var toy = toys.filter(toy => toy.id === markerId)[0];

        if(toy.is_out_of_stock){
            swal({
                icon:'warning',
                title:toy.toy_name.toUpperCase(),
                text:'This toy is out of stock',
                timer:2500,
                buttons:false,
            })
        }
        else{
            var model=document.querySelector(`#model-${toy.id}`)
            model.setAttribute('position',toy.model_geometry.position)
            model.setAttribute("rotation", toy.model_geometry.rotation);
            model.setAttribute("scale", toy.model_geometry.scale);
            model.setAttribute('visible',true)

            var pricePlane=document.querySelector(`#main-plane-${toy.id}`)
            pricePlane.setAttribute('visible',true)
        

        var button_div=document.getElementById('button-div')
        button_div.style.display='flex'

        rating_button=document.getElementById('rating-button')
        rating_button.addEventListener('click',function(){
            swal({
                title:'Rate The toy',
                icon:'warning',
                text:"Work in progress...",
            })
        },)

        order_button=document.getElementById('order-button')
        order_button.addEventListener('click',function(){
            swal({
                title:'Thank You for ordering!!',
                icon:'success',
                text:"Your toy will be delivered shortly!",
            })
        },)
    }
    },
    handleMarkerLost:function(){
        var button_div=document.getElementById('button-div')
        button_div.style.display='none'
    },

    handleOrder: function(uid, toy) {
        firebase.firestore().collection('users').doc(uid).get()
        .then(doc=>{
          var details=doc.data();
          if(details['current_orders'][toy.id]){
            details['current_orders'][toy.id]['quantity']+=1
            var current_quantity=details['current_orders'][toy.id]['quantity']
            details['current_orders'][toy.id]['subtotal']=current_quantity*toy.price;
          }
          else{
            details['current_orders'][toy.id]={item:toy.toy_name,price:toy.price,subtotal:toy.price,quantity:1}
          }
          firebase.firestore().collection('users').doc(doc.id).update(details);
        })
      },
    
      getToys: async function() {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      },

})