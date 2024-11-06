function throttle(func,delay){
  let timer = null
  return function(...args){
    if(timer){
      return
    }
    timer = setTimeout(function(){
      func.apply(this,args)
      clearTimeout(timer)
    },delay)
  }
}

export default throttle