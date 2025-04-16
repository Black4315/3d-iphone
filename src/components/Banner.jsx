import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { heroVideo, smallHeroVideo } from "../utils"

const Banner = () => {
  const [videoSrc,setvideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo: heroVideo) // vidoSrc useState
  const video =useRef(null) // ref to video
  const handleVideo =()=>{window.innerWidth < 445 ? setvideoSrc(smallHeroVideo) : setvideoSrc(heroVideo); }; // Handle video source update based on window size

  // update the video source on resize
  useEffect(()=>{
    window.addEventListener('resize',handleVideo)
    return ()=>{ window.removeEventListener('resize',handleVideo)}
  },[])

  // reload video
  useEffect(() => {
    if (video.current) { 
      video.current.load();  // Reload the video
      video.current.addEventListener('canplay',() => video.current.play()); // Play the video when it can play
    }
  }, [videoSrc]);  // This effect runs whenever `videoSrc` changes

  // GSAP animations
  useGSAP(()=>{
    gsap.to('#banner-title',{
      opacity:1,
      delay:2
    })

    gsap.to('#cta',{
      opacity:1,
      y:-50,
      delay:2    
    })
  },[])
  return (
    <section className="banner-section w-full bg-black relative nav-height">
      <div className="w-full h-5/6 flex-center flex-col">
        <p id="banner-title" className="banner-title">iPhone 15 Pro</p>

        <div className="video md:w-10/12 w-9/12">
            <video ref={video} className="pointer-events-none" autoPlay muted playsInline={true}>
              <source src={videoSrc} type='video/mp4'/>
            </video>
        </div>
      </div>

        <div id='cta' className="buy--cta flex flex-col items-center opacity-0 translate-y-20">
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199/ month or $999</p>
        </div>
    </section>
  )
}

export default Banner
