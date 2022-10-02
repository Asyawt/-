// 把obj1的对象里面的属性复制到obj2里面
// 以obj2对象的属性为标准，给obj2已有的属性值赋值，为obj1已有obj2相同对象的属性值

export default function objCopy(obj1:any,obj2:any){
Object.keys(obj2).forEach((key)=>{
obj2[key]=obj1[key]
})
}