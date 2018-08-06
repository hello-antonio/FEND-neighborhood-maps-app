const FONTS_URL = 'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700';
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