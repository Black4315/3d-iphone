import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './videoCarousel'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/animation'

const Highlights = () => {
    useGSAP(()=>{
      animateWithGsap('#heading',{
            opacity:1,
            y:0
        })
        animateWithGsap('.link',{opacity:1,y:1,duration:1,stagger:0.25})
    },[])
  return (
    <section id='highlights' className='w-screen overflow-hidden common-padding bg-zinc'>
      <div className="screen-max-width">
        <div className='mb-12 w-full md:flex items-center justify-between'>
            <h1 id='heading' className='section-heading'>Get the highlights</h1>
            <div className='flex flex-wrap items-end gap-5'>
                <p className="link">Watch the film <img src={watchImg} className='ml-1' alt="watch" /></p>
                <p className="link">Watch the event  <img src={rightImg} className='ml-1' alt="right" /></p>
            </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights
