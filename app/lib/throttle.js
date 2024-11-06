function throttle(func,delay){
  let timer = null
  return function(...args){
    if(timer){
      return
    }
    func.apply(this,args)
    timer = setTimeout(function(){
      timer=null
    },delay)
  }
}

export default throttle