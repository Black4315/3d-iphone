import React, { useEffect, useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { animateWithGsap } from '../utils/animation';
// import { animateWithGsap } from '../utils/animations';

const HowItWorks = () => {
    const videoRef = useRef()
    var width = videoRef.current;
    


    useGSAP(()=>{
        gsap.from('#chip',{
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
              },
              opacity: 0,
              scale: 2,
              duration: 2,
              ease: 'power2.inOut'
        })
        gsap.to('.g_fadeIn',{
            scrollTrigger: {
                trigger: '.g_fadeIn',
                toggleActions: 'restart none restart reverse',
                start: 'top 85%',
              },
            opacity:1,
            y:0,
            duration:1
        })
  
    },[])
    

  return (
    <section className='common-padding'>
      <div className="screen-max-width overflow-hidden">
            <div id="chip" className='flex-center w-full my-20'>
                <img src={chipImg}  alt="chip" width={180} height={180} />
            </div>

            <div className='flex flex-1 justify-center flex-col'>
                <h2 className="hiw-title">
                    A17 Pro chip.
                    <br /> A monster win for gaming.
                </h2>
                <p className="hiw-subtitle">
                    It's here. The biggest redesign in the history of Apple GPUs.
                </p>
            </div>

            <div className='mt-10 mb-14 md:mt-20'>
                <div className='relative flex-center h-full flex-col'>
                    <div className='overflow-hidden'>
                        <img src={frameImg} alt="frame" className='bg-transparent z-10 relative' />
                    </div>

                    <div className='absolute w-[95%] rounded-[5vw] md:rounded-[56px] h-[90%] overflow-hidden'>
                        <video className="pointer-events-none" playsInline preload="none" muted autoPlay ref={videoRef}>
                            <source src={frameVideo} type="video/mp4" />
                        </video>
                    </div>
                    <p className='text-gray text-center mt-5 font-semibold'>Honkai Star Rail</p>
                </div>
            </div>
            <div className="hiw-text-container">
                <div className="flex flex-1 justify-center flex-col">
                    <p className='hiw-text g_fadeIn'>
                        A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                        <span className="hiw-text">
                            best graphic performance by far
                        </span>.
                    </p>
                    <p className="hiw-text g_fadeIn">
                   Mobile {' '}
                    <span className="text-white">
                      games will look and feel so immersive
                    </span>,
                     with incredibly detailed environments and characters.
                  </p>
                </div>

                <div className="flex-1 flex justify-center flex-col g_fadeIn">
                    <p className="hiw-text">New</p>
                    <p className="hiw-bigtext">Pro-class GPU</p>
                    <p className="hiw-text">with 6 cores</p>
              </div>
            </div>
      </div>
    </section>
  )
}

export default HowItWorks
