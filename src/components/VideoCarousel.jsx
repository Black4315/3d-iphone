import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]); // Stores references to video elements
    const videoDivRef = useRef([]); // Stores references to span elements (circle around video)
    const videoSpanRef = useRef([]); // Stores references to span elements (progress bar)
    
    const [video, setvideo] = useState({
        isEnd: false, // Indicates if the video has ended
        isLastVideo: false, // Indicates if the last video in the sequence is reached
        videoId: 0, // Stores the current video index
        startPlay: false, // Indicates if the video has started playing
        isPlaying: false // Tracks whether the video is currently playing
    });
    
    const [loadedData, setloadedData] = useState([]); // Stores metadata for loaded videos
    
    const { isEnd, isLastVideo, videoId, startPlay, isPlaying } = video;
    
    useGSAP(() => {
        // Animates the slider movement when changing videos
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`, // Moves the slider based on videoId
            duration: 2, // Animation duration
            ease: 'power2.inOut' // Easing function for smooth transition
        });
    
        // Triggers animation when the video section is scrolled into view
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: 'restart none none none' // Restart animation on enter, do nothing otherwise
            },
            onComplete: () => {
                setvideo(pre => ({ ...pre, isPlaying: true, startPlay: true })); // Starts video playback
            }
        });
    
    }, [isEnd, videoId]); // Runs GSAP animation whenever `isEnd` or `videoId` changes
    
    useEffect(() => {
        // Ensures that at least 3 videos are loaded before handling playback
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause(); // Pause video if it's not playing
            } else {
                startPlay && videoRef.current[videoId].play(); // Play video only if `startPlay` is true
            }
        }
    }, [videoId, loadedData, startPlay, isPlaying]); // Runs effect when these dependencies change
    
    useEffect(() => {
        let currentProgress = 0; // Tracks current progress percentage
        let span = videoSpanRef.current; // Gets reference to progress bar span
    
        if (span[videoId]) {
            // GSAP animation to update the progress bar while video plays
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100); // Calculate animation progress in percentage
    
                    if (progress !== currentProgress) { // Update only when progress changes
                        currentProgress = progress;
    
                        gsap.to(videoDivRef.current[videoId], {
                            width: (window.innerWidth < 1200 ? '10vw' : '4vw') // Adjusts size dynamically based on screen width
                        });
    
                        gsap.to(span[videoId], {
                            width: currentProgress + '%', // Sets the progress bar width
                            backgroundColor: 'white' // Changes progress bar color
                        });
                    }
                },
                onComplete: () => {
                    gsap.to(videoDivRef.current[videoId], {
                        width: '12px' // Resets width when animation completes
                    });
                },
            });
    
            // Function to update animation progress based on video playback
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / videoRef.current[videoId].duration);
            };
    
            if (isPlaying) gsap.ticker.add(animUpdate); // Sync animation with video if playing
            else gsap.ticker.remove(animUpdate); // Stop updating progress bar if not playing
        }
    }, [videoId, startPlay]); // Runs effect when videoId or startPlay changes
    
    const handleProcess = (type, i) => {
        switch (type) {
            case 'end': // When a video ends, move to the next video
                setvideo(pre => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;

            case 'last': // When the last video is reached
                setvideo(pre => ({ ...pre, isLastVideo: true }));
                break;
    
            case 'reset': // Reset video state to the first video
                setvideo(pre => ({ ...pre, isLastVideo: false, videoId: 0 }));
                break;
    
            case 'play-pause': // Toggle play/pause state
                setvideo(pre => ({ ...pre, isPlaying: !pre.isPlaying, videoId: videoId }));
                break;
    
            default:
                video; // Default case (does nothing)
        }
    };
    
    // Updates loaded metadata when a video loads
    const handleMetaData = (i, e) => setloadedData(pre => [...pre, e]);
    
  return (
    <>
    <div className='flex items-center'>
        {hightlightsSlides.map((list,i)=>(
            <div id='slider' key={list.id} className='sm:pr20 pr-10'>
                <div className="video-carousel_container">
                    <div className="video w-full h-full rounded-3xl bg-black flex-center overflow-hidden">
                        <video 
                            id='video' 
                            muted 
                            preload='auto' 
                            playsInline={true}
                            ref={(ele)=>(videoRef.current[i] = ele)}
                            onPlay={()=>{
                                setvideo((pre=>({...pre,isPlaying:true})))
                            }}
                            onEnded={()=> i!== hightlightsSlides.length-1? handleProcess('end',i):handleProcess('last')}
                            onLoadedMetadata={e=>handleMetaData(i,e)}
                        >
                            <source src={list.video} type='video/mp4' />
                        </video>
                    </div>
                    <div className="video-text z-10 absolute top-12 left-[5%]">
                        {list.textLists.map(text=>(
                            <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>

    <div className="flex-center relative mt-10">
        <div className='flex-center bg-gray-300 rounded-full py-5 px-7 backdrop-blur'>
            {videoRef.current.map((_,i)=>(
                <span key={i} ref={(ele)=>(videoDivRef.current[i]=ele)} 
                className='mx-2 w-3 h-3 relative bg-gray-200 rounded-full'>
                    <span ref={(ele)=>(videoSpanRef.current[i]=ele)} className='absolute h-full w-full rounded-full'/>
                </span>
            ))} 
        </div>
        <button className="control-btn cursor-pointer">
            <img src={isLastVideo?replayImg:(isPlaying?pauseImg:playImg)}
                alt={isLastVideo?'replayImg':(isPlaying?'pauseImg':'playImg')} 
                onClick={()=>isLastVideo?handleProcess('reset'): (handleProcess('play-pause'))} />
        </button>
    </div>

    </>
  )
}

export default VideoCarousel
