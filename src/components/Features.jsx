import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import { animateWithGsap } from '../utils/animation'

const Features = () => {
    const videoRef = useRef(null)
    useGSAP(()=>{
        gsap.to('#explore-video', {
            scrollTrigger: {
              trigger: '#explore-video',
              toggleActions: 'play pause reverse restart',
              start: '-10% bottom'
            },
            onComplete:()=>{
                videoRef.current.play();
            }
        })
        animateWithGsap('#feature-title',{
            opacity:1,
            y:0,
        })
        animateWithGsap('.g_grow',{
            opacity:1,
            scale:1,
            ease:'power1'
        },{scrub:5.5})
        animateWithGsap('.g_text',{
            opacity:1,
            y:0,
            duration:1,
            ease:'power2.inOut'
        })
    },[])
  return (
    <section className='h-full common-padding bg-zinc relative overflow-hidden '>
        <div className="screen-max-width">

            <div className="mb-12 w-full">
                <h1 id='feature-title' className="section-heading">
                    Explore the full story
                </h1>
            </div> 

            <div className="title--video flex-center overflow-hidden flex-col">
                <div className="title mt-32 mb-24 sm:pl-24 pl-10">
                    <h2 className='font-semibold text-5xl lg:text-7xl'>iPhone.</h2>
                    <h2 className='font-semibold text-5xl lg:text-7xl'>Forged in titanium.</h2>
                </div>

                <div className='video flex-center flex-col sm:px-10'>

                    <div className='flex items-center h-[50vh] w-full relative'>
                        <video id='explore-video' playsInline className='object-cover w-full h-full object-center' 
                            preload='none' autoPlay muted  ref={videoRef}>
                            <source src={exploreVideo} type='video/mp4'/>
                        </video>
                    </div>

                    <div className='flex flex-col w-full relative'>
                        <div className="feature-video-container">
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore1Img} alt="titanium" className="feature-video g_grow" />
                            </div>
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="titanium 2" className="feature-video g_grow" />
                            </div>
                        </div>
                    </div>
                            
                    <div className="feature-text-container">
                        <div className="flex-1 flex-center">
                            <p className="feature-text g_text">
                                iPhone 15 Pro is {' '}
                                <span className="text-white">
                                the first iPhone to feature an aerospace-grade titanium design
                                </span>,
                                using the same alloy that spacecrafts use for missions to Mars.
                            </p>
                        </div>

                        <div className="flex-1 flex-center">
                            <p className="feature-text g_text">
                                Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                <span className="text-white">
                                lightest Pro models ever.
                                </span>
                                You'll notice the difference the moment you pick one up.
                            </p>
                        </div>
                    </div>

                </div>

            </div> 
        </div>
    </section>
  )
}

export default Features
