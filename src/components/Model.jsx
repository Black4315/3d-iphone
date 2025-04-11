import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Modelview from "./Modelview"
import * as THREE from 'three'
import { useEffect, useRef, useState } from "react"
import { models, sizes } from "../constants"
import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { yellowImg } from "../utils"
import { animateWithGsap, animateWithGsapTimeline } from "../utils/animation"

const Navebar = () => {
    const [size, setsize] = useState('small');
    const [model, setmodel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
        img: yellowImg,
    })

    // camera ref 
    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()

    // model group
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // rotaion
    const [smallRotaion, setsmallRotaion] = useState(0)
    const [largeRotation, setlargeRotation] = useState(0)
    const tl = gsap.timeline();

    useEffect(()=>{
        if(size === 'large'){
            animateWithGsapTimeline(tl,small,smallRotaion,'#view1','#view2',{
                transform:'translateX(-100%)',
                duration: 2
            })
        }
        if(size === 'small'){
            animateWithGsapTimeline(tl,large,largeRotation,'#view2','#view1',{
                transform:'translateX(0)',
                duration: 2
            })
        }
    },[size])

    useGSAP(()=>{
        animateWithGsap('#model-heading',{
            opacity:1,
            y:0
        })
    },[])        
    return (
        <section className="model-section common-padding">
            <div className="screen-max-width">
                <h1 id="model-heading" className="section-heading">
                    Take closer look
                </h1>

                <div className="flex flex-col items-center mt-5">
                    <div className="model overflow-hidden relative w-full h-[75vh] md:h-[90vh]">
                        <Modelview 
                            index={1}
                            groupRef={small}
                            gsaptype = 'view1'
                            controlRef={cameraControlSmall}
                            setRotation = {setsmallRotaion}
                            item ={model}
                            size={size}
                        />
                         <Modelview 
                            index={2}
                            groupRef={large}
                            gsaptype = 'view2'
                            controlRef={cameraControlLarge}
                            setRotation = {setlargeRotation}
                            item ={model}
                            size={size}

                        />
                        <Canvas className="w-full h-full"
                            style={{
                                position:'fixed',
                                top:0,
                                right:0,
                                left:0,
                                bottom:0,
                                overflow:"hidden"
                            }}
                            eventSource = {document.getElementById('root')}
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="text-sm text-center font-light mb-5">
                            {model.title}
                        </p>

                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item,i)=>(
                                    <li key={i}
                                        className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                                        style={{backgroundColor:item.color[0]}}
                                        onClick={()=>setmodel(item)}
                                    />
                                ))}
                            </ul>

                            <button className="size-btn-container">
                                {sizes.map(({label,value})=>(
                                    <span 
                                        key={label}
                                        className="size-btn"
                                        style={{
                                            backgroundColor: size === value? 'white':'transparent',
                                            color: size === value? 'black':'white'
                                        }} 
                                        onClick={()=>setsize(value)}
                    
                                    >{label}</span>
                                ))}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navebar
