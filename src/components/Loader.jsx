import { Html } from '@react-three/drei'
import React from 'react'

const Loader = () => {
  return (
    <Html>
        <div className="absolute top-0 left-0 w-full h-full flex-center ">
            <div className='w-[10vw] y-[10vw] rounded-full'>Loading...</div>
        </div>
    </Html>
    
  )
}

export default Loader
