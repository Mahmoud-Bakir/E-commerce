const pages = {}
pages.page_signup = function(){
  const btn = document.getElementById("btn-signup")
  const err = document.getElementById("error")
  btn.addEventListener("click",()=>{
    const first_name = document.getElementById("first_name").value
    const last_name = document.getElementById("last_name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    
   const data = new FormData()
    data.append("first_name",first_name)
    data.append("last_name",last_name)
    data.append("email",email)
    data.append("password",password)

    axios.post('http://127.0.0.1:8000/api/register',data)
    .then((response)=>{
      console.log(response.data)
      console.log(response.data.authorisation.token)
      window.localStorage.setItem("token",response.data.authorisation.token)
      window.localStorage.setItem("id",response.data.user.id)

      window.location.href="../pages/index.html"
  
    }).catch((err)=>{
      console.log(err)

    }) })
  }
pages.page_signin = function(){
  const btn = document.getElementById("btn-signin")
  btn.addEventListener("click",()=>{
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const data = new FormData()
    data.append("email",email)
    data.append("password",password)
   

    axios.post('http://127.0.0.1:8000/api/login',data)
    .then((response)=>{
      console.log(response.data)
      console.log(response.data.authorisation.token)
      window.localStorage.setItem("token",response.data.authorisation.token)
      window.localStorage.setItem("id",response.data.user.id)
      window.location.href="../pages/index.html"
  
    }).catch((err)=>{
      console.log(err)

    }) })

  }
 


  
pages.page_index = function(){

      const sources= ["../assets/w1.png", "../assets/m1.png","../assets/w2.png","../assets/m2.png"]
      let index = 0;
      const slide = document.getElementById("slide")
      const male = document.getElementById("male")
      const female = document.getElementById("female")
      const profile = document.getElementById("profile")
      const browse = document.getElementById("browse")
      
     
     
      function toggle() {
      slide.classList.remove("show")
      setTimeout(() => {
        index = (index +1) % sources.length
        slide.src = sources[index]
        slide.classList.add("show")
        if(index%2!=0){
            male.classList.add("active-text")
            female.classList.remove("active-text")
        }else {
            female.classList.add("active-text")
            male.classList.remove("active-text")
        }
        setTimeout(toggle, 4000)
       }, 1000)
      }

toggle()
profile.addEventListener("click",()=>{
  window.location.href="../pages/profile.html"
})
browse.addEventListener("click",()=>{
  window.location.href="../pages/browse.html"
})

}
pages.page_browse = function(){
  document.addEventListener("DOMContentLoaded", function () {
    const profile = document.getElementById("profile")
    const home = document.getElementById("home")
    profile.addEventListener("click",()=>{
      window.location.href="../pages/profile.html"
    })
    home.addEventListener("click",()=>{
      window.location.href="../pages/index.html"
    })


    const toggleMenuButton = document.getElementById("toggleMenuButton");
    const menuItems = document.getElementById("menuItems");
    const clear = document.getElementById("clear")

    toggleMenuButton.addEventListener("click", function () {
        if (menuItems.style.display === "block") {
            menuItems.style.display = "none";
        } else {
            menuItems.style.display = "block";
        }
    });
    const filters = document.querySelectorAll(".filter");
    filters.forEach(filter => {
        filter.addEventListener("click", function () {
            clear.style.display="flex"
            const subMenus = document.querySelectorAll(".sub-menu");
            subMenus.forEach(subMenu => subMenu.style.display = "none");
            const category = this.dataset.category;
            const selectedSubMenu = this.querySelector(".sub-menu");
            selectedSubMenu.style.display = "block";
        });
    });
});



  
}
pages.page_admin = function(){
  const btn = document.getElementById("add")
  btn.addEventListener("click",()=>{
    window.location.href="../pages/form.html"
  })
}
pages.page_admin = function(){

}
pages.page_form = function(){
  const token = localStorage.getItem('token');
  function isEmpty(param){
    if (param.trim()!=="")
    return false
    else
    return true
  }

  const btn = document.getElementById("add")
  const err = document.getElementById("error")
  let gender_id = 0
  let category_id=0


  btn.addEventListener("click",()=>{
    const name = document.getElementById("name").value
    const gender = document.getElementById("gender").value
    const category = document.getElementById("category").value
    const price = document.getElementById("price").value
    const desc = document.getElementById("desc").value
    const image = document.getElementById("image").value
    if (!isEmpty(name)){
      err.innerText=""
      if(!isEmpty(gender) && (gender.toLowerCase()=="male"|| gender.toLowerCase()=="female") ){
          err.innerText=""
          if(!isEmpty(category)){
              err.innerText=""
              if(!isEmpty(price)){
                  err.innerText=""
                  if(!isEmpty(desc)){
                    err.innerText=""
                     if(!isEmpty(image)){
                      err.innerText=""
                          data = new FormData()
                          if (gender=="male")
                          gender_id=1
                          else
                          gender_id=2

                          switch (category.toLowerCase) {
                            case "shirts":
                                category_id=1
                                break
                            case "pants":     
                                category_id=2
                                break
                            case "suits":
                                category_id=3
                                break
                            case "dresses":
                                category_id=4
                                break
                            case "shoes":
                                category_id=5
                                break
                            case "sunglasses":
                                category_id=6
                                break 
                            case "watches":
                                category_id=7
                                break     }
                          data.append("name",name)
                          data.append("description",desc)
                          data.append("price",price)
                          data.append("image",image)
                          data.append("category",category_id)
                          data.append("gender",gender_id)

                          axios.post('http://localhost:8000/api/add',data,{
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                          .then(response => {
                             
                              console.log(response.data);
                          })
                          .catch(error => {
                              
                              console.error(error);
                          });


                      }else(err.innerText="kindly upload an image of the product")
                    }else(err.innerText="kindly write a description for the product")
                }else err.innerText="kindly enter a price for the product"
              }else err.innerText="kindly enter a category for the product"
          }else
              err.innerText="gender should be either a male or a female" 
      }else
          err.innerText="kindly enter a name for the product"
    })
  
}
pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}