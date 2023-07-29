const pages = {}

pages.page_index = function(){

  const sources= ["../assets/man.png", "../assets/wdress1.png"];
  let index = 0;
  const slide = document.getElementById("slide")
  const male = document.getElementById("male")
  const female = document.getElementById("female")

  
function toggle() {
  slide.classList.remove("show")
  setTimeout(() => {
    index = (index + 1) % sources.length
    slide.src = sources[index]
    slide.classList.add("show")
    if(index==0){
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
}

pages.loadFor = (page) => {
    eval("pages.page_" + page + "();")
}