export function loader ({href="",integrity = "", crossorgin= ""}={}){
  return new Promise((resolve, reject)=>{
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    // link.rel = "preload";
    // link.as = "style";
    if(crossorgin || integrity) {
      link.integrity = integrity;
      link.crossOrigin = crossorgin;
    }
    link.onload = ()=>{
      resolve();
    }
    link.onerror = ()=>{
      reject();
    }
    const firstLink = document.getElementsByTagName('link')[0];
    firstLink.parentNode.insertBefore(link, firstLink);
  })
}