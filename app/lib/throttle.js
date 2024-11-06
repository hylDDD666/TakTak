function throttle(func,delay){
  let timer = null
  return function(...args){
    if(timer){
      return
    }
    timer = setTimeout(function(){
      func.apply(this,args)
      timer=null
    },delay)
  }
}

export default throttle