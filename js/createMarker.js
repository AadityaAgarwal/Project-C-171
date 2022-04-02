AFRAME.registerComponent('createmarkers',{
    init:async function(){
        var mainScene=document.querySelector('#main-scene')
        var toys=await this.getAllToys()
        toys.map(toy=>{
            var marker=document.createElement('a-marker')
            marker.setAttribute('id',toy.id)
            marker.setAttribute('type','pattern')
            marker.setAttribute('url',toy.marker_pattern_url)
            marker.setAttribute('cursor',{rayOrigin:'mouse'})
            marker.setAttribute('markerhandler',{})
            mainScene.appendChild(marker)

            if(!toy.is_out_of_stock){

            var model=document.createElement('a-entity')
            model.setAttribute('id',`model-${toy.id}`)
            model.setAttribute('position',toy.model_geometry.position)
            model.setAttribute('rotation',toy.model_geometry.rotation)
            model.setAttribute('scale',toy.model_geometry.scale)
            model.setAttribute('gltf-model',`url(${toy.model_url})`)
            model.setAttribute('gesture-handler',{})
            model.setAttribute('animation-mixer',{})
            model.setAttribute('visible',false)

            marker.appendChild(model)

            var main_plane= document.createElement('a-plane')
            var title_plane= document.createElement('a-plane')

            main_plane.setAttribute("id",`main_plane_${toy.id}`)
            main_plane.setAttribute('position',{x:0,y:0,z:0})
            main_plane.setAttribute('rotation',{x:-90,y:0,z:0})
            main_plane.setAttribute('width','1.5')
            main_plane.setAttribute('height','2')
            main_plane.setAttribute('visible',false)

            marker.setAttribute(main_plane)

            title_plane.setAttribute("id",`title_plane_${toy.id}`)
            title_plane.setAttribute('position',{x:0,y:1.1,z:0.1})
            title_plane.setAttribute('rotation',{x:0,y:0,z:0})
            title_plane.setAttribute('width','1.5')
            title_plane.setAttribute('height','1')

            marker.setAttribute(title_plane)

            var age_group_toy=document.createElement('a-entity')

            age_group_toy.setAttribute('id',`age_group_toy_${toy.id}`)
            age_group_toy.setAttribute('position',{x:0,y:1,z:0.1})
            age_group_toy.setAttribute('rotation',{x:0,y:0,z:0})
            age_group_toy.setAttribute('text',{color:'black',font:'monoid', value:`AGE GROUP: ${toy.age_group}`, width:'2', height:'1',align:'center'})

            title_plane.appendChild(age_group_toy)

            var toy_description=document.createElement('a-entity')
            toy_description.setAttribute('id',`description_${toy.id}`)
            toy_description.setAttribute('position',{x:0.3,y:0,z:0.1})
            toy_description.setAttribute('rotation',{x:0,y:0,z:0})
            toy_description.setAttribute('text',{color:'black',font:'monoid', value:`Description: ${toy.description}`, width:'2', height:'1',align:'center'})
            main_plane.appendChild(toy_description)

             
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${toy.id}`);
        pricePlane.setAttribute(
          "src",
          "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });

        
        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${toy.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${toy.price}`
        });
        pricePlane.setAttribute('visible',false)

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);
        }
        })
    },

    getAllToys:async function(){
        return await firebase
            .firestore()
            .collection("toys")
            .get()
            .then(snap => { return snap.docs.map(doc =>  doc.data() ) })
    },
})