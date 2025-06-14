
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Sphere, Box, Torus } from '@react-three/drei';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Search, Star, Shield, UserCheck } from "lucide-react";
import { Star as LucideStar, StarHalf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import * as THREE from 'three';

// 3D Floating Elements Component
function FloatingElements() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t) * 0.5;
      sphereRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    
    if (boxRef.current) {
      boxRef.current.position.y = Math.cos(t * 0.8) * 0.3;
      boxRef.current.rotation.y = t * 0.5;
    }
    
    if (torusRef.current) {
      torusRef.current.position.y = Math.sin(t * 1.2) * 0.4;
      torusRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef} args={[0.3]} position={[-2, 1, -1]}>
          <meshStandardMaterial color="#4F46E5" />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Box ref={boxRef} args={[0.4, 0.4, 0.4]} position={[2, 0.5, -0.5]}>
          <meshStandardMaterial color="#059669" />
        </Box>
      </Float>
      
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <Torus ref={torusRef} args={[0.2, 0.1]} position={[0, -1, 0.5]}>
          <meshStandardMaterial color="#DC2626" />
        </Torus>
      </Float>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.8}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Physiocare 3D
      </Text>
    </>
  );
}

const Hero3D = () => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-brand-softblue via-white to-vitality-50 overflow-hidden dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="max-w-xl lg:pr-8">
            <div className="flex items-center mb-4 bg-vitality-50 rounded-full py-1 px-4 w-fit dark:bg-gray-800">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-vitality-700 dark:text-vitality-300">Trusted by 50,000+ patients across India</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display text-vitality-700 leading-tight dark:text-white">
              Experience Physiotherapy in 3D
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 dark:text-gray-300">
              Immerse yourself in next-generation physiotherapy care. Connect with certified physiotherapists across India through our innovative 3D platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                <Link to="/recommendations" className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Find Your Doctor
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Link to="/booking" className="flex items-center">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">Government Certified</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">1000+ Expert Doctors</span>
              </div>
              <div className="flex items-center">
                <CalendarCheck className="h-5 w-5 text-vitality-500 mr-2" />
                <span className="text-sm font-medium dark:text-gray-300">Same Day Booking</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-0">
                <div className="w-10 h-10 rounded-full bg-vitality-500 flex items-center justify-center text-white text-xs font-bold">
                  4.8
                </div>
                <div className="flex items-center bg-white py-2.5 px-5 rounded-full shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center gap-1 mr-3">
                    {[1, 2, 3, 4].map((star) => (
                      <LucideStar key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <StarHalf className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">(12,000+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative lg:pl-8 h-[500px]">
            <div 
              className="rounded-lg overflow-hidden shadow-xl relative z-10 h-full cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingElements />
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  enableRotate={true}
                  autoRotate={!isHovered}
                  autoRotateSpeed={1}
                />
                <Environment preset="city" />
              </Canvas>
            </div>
            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-vitality-300 rounded-full opacity-30 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-orange rounded-full opacity-10 z-0"></div>
            
            <div className="absolute -bottom-5 right-5 md:right-10 bg-white rounded-lg shadow-lg p-4 z-20 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-vitality-50 rounded-full p-3 dark:bg-gray-700">
                  <UserCheck className="h-6 w-6 text-vitality-600 dark:text-vitality-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Since 2010</p>
                  <p className="text-lg font-bold text-vitality-700 dark:text-vitality-300">50,000+ Patients</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Successfully Treated Across India</p>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 z-20">
              <p className="text-xs text-gray-600 font-medium">🖱️ Click and drag to explore</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
