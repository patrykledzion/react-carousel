import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [images, setImages] = useState(null)
  const [current, setCurrent] = useState(1);
  const [beeingSwitched, setBeeingSwitched] = useState(false);

  const duration = 280;

  useEffect(()=>{
    const loadData = async() => {
      const res = await axios.get("https://api.slingacademy.com/v1/sample-data/photos");
      const data = res.data;
      if(data.success==false)return;
      else setImages(data.photos);
    }

    loadData();
  },[])
 
  const slide = async dir => {

    await setBeeingSwitched(true);
    setTimeout(async ()=>{
      let new_curr = current + dir;
      if(new_curr > images.length)new_curr = 1;
      if(new_curr < 1)new_curr = images.length -1;
      console.log(new_curr)
      await setCurrent(new_curr);
      setBeeingSwitched(false);
    }, duration);
    
  }

  return (
    <>
      {images!=null && false?images.map(e=>{return <img src={e.url} style={{width: 50}}/>}) : null}
      <div className="images">
      {
        images!=null? 
        <>
        <img className="right-image-hidden" src={
          images.filter(f=>f.id==(current + 2 <= images.length ? current + 2 : current+2 - images.length))[0].url
        }
        style={beeingSwitched ? {animation: '0.3s 1 alternate back-to-right'}: {animation: 'none'}}

        />
        <img className="left-image-hidden" src={
          images.filter(f=>f.id==(current - 2 > 0 ? current - 2 : images.length))[0].url 
        }/>
        <img className="left-image" src={
          images.filter(f=>f.id==(current - 1 > 0 ? current - 1 : images.length))[0].url 
        }
        style={beeingSwitched ? {animation: '0.3s 1 alternate left-to-back'}: {animation: 'none'}}
        
        />
         <img className="right-image" src={
          images.filter(f=>f.id==(current + 1 <= images.length ? current + 1 : 1))[0].url
          }
          style={beeingSwitched ? {animation: '0.3s 1 alternate right-to-middle'}: {animation: 'none'}}
          />
        <img className="middle-image" src={
          images.filter(f=>f.id==current)[0].url
          }
          style={beeingSwitched ? {animation: '0.3s 1 alternate middle-to-left'}: {animation: 'none'}}
          />
       
        
      
        </> : null
      }
      
      <button onClick={()=>slide(1)} >&gt;</button>
      </div>
    </>
  )
}

export default App
