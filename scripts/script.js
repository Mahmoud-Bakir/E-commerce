const pages = {}

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
  const profile = document.getElementById("profile")
  const home = document.getElementById("home")


  profile.addEventListener("click",()=>{
    window.location.href="../pages/profile.html"
  })
  home.addEventListener("click",()=>{
    window.location.href="../pages/index.html"
  })

}

pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}