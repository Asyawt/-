import {ref,onMounted} from 'vue'
import {getImagApi} from '@/api/user/user'
export default function useImage(){
  const imgSrc=ref('')
  const getImg= ()=>{
    getImagApi().then(res=>{
    // console.log('111');
    // console.log(res);
    return 'data:image/png;base64,'+btoa(
      new Uint8Array(res.data as any).reduce((data,byte)=>data+String.fromCharCode(byte),'')
    )
   }).then(data=>{
    imgSrc.value=data
   })
  }
  onMounted(() => {
    getImg()
  })
  return {
    imgSrc,
    getImg
  }
}