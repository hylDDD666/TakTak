const rl = require('readline').createInterface({ input: process.stdin })
var iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value

// function TreeNode (color,child){
//   this.color = color
//   this.child = child || []
// }

// void async function () {
//     // Write your code here
//     let n
//     let nodes = []
//     let i =0
//     while(line = await readline()){
//       if(i===0){
//         n= line * 1
//       }
//       if(i===1){
//         for(let char of line){
//           nodes.push(new TreeNode(char))
//         }
//       }
//       if(i>1){
//         let sides = line.split(' ')
//         nodes[sides[0]*1-1].child.push(nodes[sides[1]*1-1])
//       }
//       i++
//     }
//     let result =new Set()
//     const deepSearch = (node)=>{
//       if(node.child.length===0){
//         return false
//       }
//       let colors = new Set([node.color])
//       let flag = false
//       for(let item of node.child){
//         colors.add(item.color)
//         if(colors.size>1){
//           flag = true
//         }
//         if(deepSearch(item)){
//           flag=true
//         }
//       }
//       if(flag){
//         result.add(node)
//       }
//       return flag
//     }
//     if(nodes.length<=1){
//       return 0
//     }
//     deepSearch(nodes[0])
//     return result.size
// }()

// void async function () {
//   // Write your code here
//   let i=0
//   let n,k
//   let arr
//   while(line = await readline()){
//     if(i===0){
//       let tokens = line.split(' ')
//       n=tokens[0]*1
//       k=tokens[1]*1
//     }
//     if(i===1){
//       let tokens = line.split(' ')
//       arr = tokens.map(item=>item*1)
//     }
//     i++
//   }
//   arr = arr.sort((a,b)=>Math.abs(a)-Math.abs(b))
//   let result = 0
//   for(let i=0;i<n;i++){
//     k -=Math.abs(arr[i])
//     if(k<0){
//       console.log(result);
//       return result
//     }else[
//       result++
//     ]
//   }
//   console.log(result);
//   return result
// }()

void (async function () {
  // Write your code here
  let m, n
  let arr = []
  let query = []
  let i = 0
  while ((line = await readline())) {
    if (i === 0) {
      let tokens = line.split(' ')
      n = tokens[0] * 1
      m = tokens[1] * 1
    } else if (i<=m){
      let tokens = line.split(' ')
      for(let j=0;j<tokens[1]*1;j++){
        arr.push(tokens[0]*1)
      }
    }else if(i>m+1){
      let tokens = line.split(' ')
      query.push([tokens[0]*1-1,tokens[1]*1-1])
    }
    i++
  }
  console.log(m,n,arr,query);
  const getFators = (num)=>{
    if(num<2){
      return [1]
    }
    let factors = []
    for (let i = 1; i <= Math.sqrt(num); i++) {  
      if (num % i === 0) {  
          factors.push(i) 
          if (i !== num / i) {  
              factors.push(num / i)
          }  
      }  
  }  

  return factors
  }
  
})()
