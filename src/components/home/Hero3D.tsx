
import { Canvas } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Suspense } from 'react';

// Floating geometric shapes component
function FloatingElements() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3169ee" />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -1, -1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[-2, -2, 1]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[3, 3, 0]}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <meshStandardMaterial color="#ec4899" />
        </mesh>
      </Float>
      
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={2.2}>
        <mesh position={[0, 1, -3]}>
          <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
      </Float>
    </>
  );
}

// 3D Text component
function Text3D() {
  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={1}>
      <Text
        position={[0, 0, 0]}
        fontSize={2}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        VITALITY
      </Text>
    </Float>
  );
}

// Loading fallback component
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-16 h-16 border-4 border-vitality-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

const Hero3D = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-vitality-50 via-white to-brand-softblue overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #3169ee 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center bg-vitality-100 rounded-full px-4 py-2 text-vitality-700 text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                🏥 Advanced Physiotherapy Solutions
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Expert Care for Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vitality-500 to-brand-orange">
                  Recovery Journey
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Experience cutting-edge physiotherapy treatments with our certified professionals. 
                From sports rehabilitation to chronic pain management, we're here to help you move better.
              </motion.p>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild size="lg" className="bg-vitality-600 hover:bg-vitality-700 text-white">
                <Link to="/booking" className="flex items-center">
                  Book Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/virtual-tour" className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Virtual Tour
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-vitality-600">50K+</div>
                <div className="text-sm text-gray-600">Patients Treated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-vitality-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-vitality-600">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Canvas Section */}
          <motion.div 
            className="relative h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
              <Suspense fallback={<Loader />}>
                <Canvas
                  camera={{ position: [0, 0, 8], fov: 45 }}
                  style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                >
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  
                  <FloatingElements />
                  <Text3D />
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </Suspense>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-vitality-200 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-orange opacity-20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero3D;
