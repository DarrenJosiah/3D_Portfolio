import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {

  // const computer = useGLTF('./desktop_pc/scene.gltf')
  const car = useGLTF('./mclaren/scene.gltf')
  const kitten = useGLTF('./kitten/scene.gltf')
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="purple" />
      <pointLight intensity={1} />
      <spotLight position={[-20, 50, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024}/>
      <primitive object={kitten.scene}
      scale={isMobile ? 10 : 10.5}
      position={isMobile ? [0, -3.25, -1.5] : [0, -3.25, -1.5]}
      rotation={[-0.1, -0.4, 0]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    
    // Set the intial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])  

  return (
    <Canvas frameloop='demand' shadows camera={{position: [20,3,5], fov: 25}} gl={{preserveDrawingBuffer: true}}>
      
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} min PolarAngle={Math.PI / 2}/>
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;