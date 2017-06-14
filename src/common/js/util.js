export function urlParse() {
  let url = window.location.search;
  let obj = {};
  //?id='123'&a='10'
  let reg = /[?&][^?&]+=[^?&]]/g
  let arr = url.match(reg);
  if(arr){
    arr.forEach((item)=>{
      let tempArr = item[0].substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    })
    return obj;
  }
}
