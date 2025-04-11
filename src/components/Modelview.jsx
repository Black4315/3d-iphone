import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import IPhone from './IPhone'
import Lights from './Lights'
import * as THREE from 'three'
import Loader from './Loader'

const Modelview = ({ index, groupRef, gsaptype, controlRef, setRotation, item, size }) => {
    return (
        <View
            index={index}
            id={gsaptype}
            className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
        >
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 3.7]} />

            <Lights />
            <OrbitControls 
                makeDefault 
                ref={controlRef} 
                enableZoom={false} 
                rotateSpeed={0.4} 
                target={new THREE.Vector3(0,0,0)}
                onEnd={()=>setRotation(controlRef.current.getAzimuthalAngle())}
            />
            <group  ref={groupRef} name ={index==1?'small':'large'} position={[0,0,0]}>
                <Suspense fallback={<Loader />}>
                    <IPhone 
                        scale= {index==1?[15,15,15]:[17,17,17]}
                        item = {item}
                        size = {size}
                    />
                </Suspense>
            </group>
        </View>
    )
}

export default Modelview
