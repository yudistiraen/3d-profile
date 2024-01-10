import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight 
        intensity={0.05}
        groundColor="black"
      />
      <pointLight intensity={1}/>
      <spotLight 
        position={[-3, 5, 1]}
        angle={1}
        penumbra={1}
        intensity={300}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] :[0, -3.25, -.15]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    //add listener for change to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    //set the initial value of the isMobile state variable
    setIsMobile(mediaQuery.matches)

    //define a callback function to handle changes to the media query
    const handleMediaQUeryChange = (event) => {
      setIsMobile(event.matches)
    }

    //add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQUeryChange)

    //remove the listener when component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQUeryChange)
    }
  }, [])
  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25}}
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas