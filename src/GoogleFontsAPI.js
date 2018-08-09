const FONTS_URL = 'https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500';
export default function loader (){
  return new Promise((resolve, reject)=>{
    const link = document.createElement('link');
    link.rel = 'stylesheets';
    link.href = FONTS_URL;
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