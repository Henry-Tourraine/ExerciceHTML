let docStyle = getComputedStyle(document.body);
        let homeColor = docStyle.getPropertyValue('--home-background');
        let contactColor = docStyle.getPropertyValue('--contact-background');
        //get variable
        console.log(homeColor);
        class Element{
            constructor(el){
                this.element = el;
                this.active_=false;

            }
            
            get active(){
                return this.active_;
            }
            set active(val){
                this.active_ = val;
                this.element.style.display = val?"block":"none";
            }
        }
        let contact = new Element((()=>{
            let div = document.createElement("div");
            div.id = "contact";
            div.style.width = "100vw";
            div.style.minHeight = "80vh";
            return div;
        })());
        

        

       
        
        contact.active = false;


        let home = new Element((()=>{
            let homeDOM = document.createElement("div");
            homeDOM.id  ="home";
            homeDOM.style.width = "100vw";
            homeDOM.style.minHeight = "80vh";
            return homeDOM;
        })());

        home.active = false;

        Object.defineProperty(home, "active", {
            set: function(val){
                this.active_ = val;
                this.element.style.display = val?"flex":"none";
            }
        })


        let carousel = new Element((()=>{let d = document.createElement("div"); d.id = "carousel"; return d})());
        console.log("carousel ", carousel.element)
        let parser = new DOMParser();
        fetch("./original-angren.html").then(e=>e.text()).then(e=>{
            console.log(e);
            let doc = parser.parseFromString(e, "text/html");
            let articlesList = [];
            for(let i=0; i< 400; i++){
                let element = doc.getElementById("e"+i);
                element.style = "";
                element.classList.add("product");
                let img = element.querySelector("img");
                console.log(img);
                if(img != null && img.getAttribute("src") != null){ 
                    let imgSrc = img.src.replace("http://localhost:5500", "");
                    //GET RID OF CUSTOM BORDERS
                    if(img.width > 10 && img.height > 10){
                        if(!imgSrc.includes("http")){
                            img.src =  "https://arngren.net" + imgSrc;
                        }else{
                            img.src =  imgSrc;
                        }
                        let wrapper = document.createElement("div");
                        wrapper.classList.add("productWrapper");
                        if(typeof(element) == "object" && img.src !== "https://arngren.net/Cutout_2.gif"){
                             wrapper.appendChild(element);
                             let o = img.src.split("/")[img.src.split("/").length-1];
                             let name = o.split(".")[0];
                             wrapper.innerHTML += "<p>"+name+"</p><p style='font-size: 0.5em'>Swipe for more...</p>";
                             home.element.appendChild(wrapper);
                            }
                    }
                }
                

                
            }
        })
        let imageId = {id_:0,
             get id(){
                return this.id_;
        }, 
        set id(val){
            
            this.id_ = val;

            let l = [...home.element.querySelectorAll(".productWrapper")].length;
            let val2 = val%l;
            for(let i=0; i<l; i++){
                if(val2%l == i){
                    
                    home.element.querySelectorAll(".productWrapper")[i].style.display = "block";
                }else{
                    console.log("DISAPPEAR");
                    home.element.querySelectorAll(".productWrapper")[i].style.display = "none";
                }
            }
        } 
    }
        let portraitUrl = "https://arngren.net/Cutout_2.gif";

        let headerDOM = document.createElement("header");
        let header = new Element(headerDOM);
        Object.defineProperty(header, "active", {
            set:function(val){
                this.active_ = val;
                this.element.style.display = val?"flex":"none";
            }
        });
       

        //MENU SECTION
        let menuSection = new Element((()=>{let div = document.createElement("div"); div.id="menuSection";div.classList.add("wrap"); return div})());
        //(async()=>{ menuSection.element.innerHTML += await fetch("./panel.html").then(e=>e.text()).then(e=>{let a = parser.parseFromString(e, "text/html").body.innerHTML;return a})})()
        menuSection.active = true;
        menuSection.wrap=()=>{
            menuSection.element.classList.toggle("wrap");
            menuSection.element.classList.toggle("unwrap");
        };
        menuSection.unwrap=()=>{
            menuSection.element.classList.toggle("unwrap");
            menuSection.element.classList.toggle("wrap");
        };
        //BURGER MENU
         let menu = new Element((()=>{let div = document.createElement("div");div.classList.add("burger"); div.id="menu"; return div})());
         menu.element.addEventListener("click", (e)=>{
                e.target.classList.toggle("burger");
                e.target.classList.toggle("cross");
            if(e.target.classList.contains("cross")){
                getContact.element.style.opacity = 0;
                getHome.element.style.opacity = 0;
                menuSection.unwrap();
            }else{
                menuSection.wrap();
                setTimeout(()=>{
                    getContact.element.style.opacity = 1;
                    getHome.element.style.opacity = 1;
                }, 500)
                
               
                
            }
         })
         
         
         
         menu.active = true;
         menuSection.element.appendChild(menu.element);
         header.element.appendChild(menuSection.element);

         //FOOTER
        let footer = new Element((()=>{
            let div = document.createElement("footer");
            return div;
        })());
        (async()=>{ footer.element.innerHTML = await fetch("./footer.html").then(e=>e.text()).then(e=>{let a = parser.parseFromString(e, "text/html").body.innerHTML;return a})})()
       Object.defineProperty(footer, "active", {
        set: function(val){
            this.active_ = val;
            this.element.style.display = val?"flex":"none";
        }
       })
       

        let getContact = new Element((()=>{
            let div = document.createElement("h2");
            div.id = "contactLink"
            div.textContent = "Kontakt";
            return div;
        })());
        let getHome = new Element((()=>{
            let div = document.createElement("h2");
            div.id ="homeLink";
            div.textContent = "Hem";
            return div;
        })());

        
        Object.defineProperty(getContact, "contentDisplayed", {
            set: function(val){
                this.element.style.color = val?"rgb(182, 60, 193)":contactColor;
            }
        })
        Object.defineProperty(getHome, "contentDisplayed", {
            set: function(val){
                this.element.style.color = val?"rgb(182, 60, 193)":homeColor;
                console.log(this.element.style.color )
            }
        })

        

        getContact.element.addEventListener("click", ()=>{
            contact.active = true;
            getContact.contentDisplayed = true;
            getHome.contentDisplayed = false;
            home.active = false;
        })
        getHome.element.addEventListener("click", ()=>{
            contact.active = false;
            home.active = true;
            getContact.contentDisplayed = false;
            getHome.contentDisplayed = true;
        })
        header.element.appendChild(getHome.element);
        header.element.appendChild(getContact.element);

        //FILLING HOME
        home.element.appendChild(carousel.element);



        let b = document.body;
        


        let myElements = [header, home, contact, footer]
        for(let i of myElements){
            i.active = true;
            b.appendChild(i.element);
        }
        contact.active = false;
        

        

        fetch("./contact.html").then(e=>e.text()).then(e=>{
            let doc2 = parser.parseFromString(e, "text/html");
            contact.element.appendChild(doc2.querySelector("div"))
        });

        setTimeout(()=>{imageId.id = 2}, 1000);
        let mouseStart = 0;
        let mouseEnd = 0;
        home.element.addEventListener("pointerdown", (e)=>{
            mouseStart = e.clientX;
        })

        home.element.addEventListener("pointerup", (e)=>{
            mouseEnd = e.clientX;
            if(mouseEnd-mouseStart){
                imageId.id += 1;
            }else{
                imageId.id -= 1;
            }
        })