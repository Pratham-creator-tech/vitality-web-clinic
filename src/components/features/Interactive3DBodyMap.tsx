
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type BodyPart = {
  id: string;
  name: string;
  title: string;
  description: string;
  commonIssues: string[];
  treatments: string[];
  link: string;
};

interface Interactive3DBodyMapProps {
  bodyPartsData: BodyPart[];
  onPartSelect: (partId: string) => void;
}

const Interactive3DBodyMap = ({ bodyPartsData, onPartSelect }: Interactive3DBodyMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedPartRef = useRef<THREE.Object3D | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const hoveredPartRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  // Setup 3D scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, -10, -10);
    scene.add(backLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.maxPolarAngle = Math.PI / 1.5;
    controlsRef.current = controls;

    // Event listeners
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Load 3D model
    loadModel();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  // Handle view mode change
  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      if (viewMode === 'front') {
        gsap.to(cameraRef.current.position, {
          x: 0,
          y: 0,
          z: 3,
          duration: 1.5,
        });
      } else {
        gsap.to(cameraRef.current.position, {
          x: 0,
          y: 0,
          z: -3,
          duration: 1.5,
        });
      }
      controlsRef.current.update();
    }
  }, [viewMode]);

  const loadModel = () => {
    setIsLoading(true);
    
    // Load a placeholder 3D human model (for now using a basic shape)
    const geometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x9cc2fe });
    const humanBody = new THREE.Mesh(geometry, material);
    
    // Creating body parts
    const parts: Record<string, THREE.Mesh> = {
      head: new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      neck: new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.2, 0.2, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      leftShoulder: new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      rightShoulder: new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 32, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      leftArm: new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.6, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      rightArm: new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.6, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      leftHand: new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.25, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      rightHand: new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.25, 0.1),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      hip: new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.4, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      leftLeg: new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      rightLeg: new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      leftFoot: new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.1, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
      rightFoot: new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.1, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x9cc2fe })
      ),
    };

    // Position parts
    parts.head.position.set(0, 1.3, 0);
    parts.neck.position.set(0, 1.1, 0);
    parts.leftShoulder.position.set(-0.3, 0.9, 0);
    parts.rightShoulder.position.set(0.3, 0.9, 0);
    parts.leftArm.position.set(-0.5, 0.6, 0);
    parts.rightArm.position.set(0.5, 0.6, 0);
    parts.leftHand.position.set(-0.5, 0.2, 0);
    parts.rightHand.position.set(0.5, 0.2, 0);
    parts.hip.position.set(0, -0.8, 0);
    parts.leftLeg.position.set(-0.2, -1.3, 0);
    parts.rightLeg.position.set(0.2, -1.3, 0);
    parts.leftFoot.position.set(-0.2, -1.8, 0.1);
    parts.rightFoot.position.set(0.2, -1.8, 0.1);

    // Map part names to body part IDs
    const partMapping: Record<string, string> = {
      head: "neck",  // Using neck data for head
      neck: "neck",
      leftShoulder: "shoulder",
      rightShoulder: "shoulder",
      leftArm: "elbow",
      rightArm: "elbow",
      leftHand: "wrist",
      rightHand: "wrist",
      hip: "hip",
      leftLeg: "knee",
      rightLeg: "knee",
      leftFoot: "ankle",
      rightFoot: "ankle",
    };

    // Add user data for raycasting
    Object.entries(parts).forEach(([partName, mesh]) => {
      mesh.userData.partId = partMapping[partName];
      mesh.userData.name = partName;
      
      // For hover effect
      (mesh.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(0x000000);
      
      // The original colors
      mesh.userData.originalColor = (mesh.material as THREE.MeshStandardMaterial).color.clone();
    });

    // Add to scene
    Object.values(parts).forEach(part => {
      if (sceneRef.current) {
        sceneRef.current.add(part);
      }
    });

    // Add mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      mouseRef.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      checkIntersection();
    };

    const handleClick = () => {
      if (hoveredPartRef.current) {
        onPartSelect(hoveredPartRef.current);
      }
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('click', handleClick);
    
    setIsLoading(false);

    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('click', handleClick);
    };
  };

  const checkIntersection = () => {
    if (!sceneRef.current || !cameraRef.current) return;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    
    const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);
    
    // Reset previously hovered object
    if (selectedPartRef.current) {
      (selectedPartRef.current.material as THREE.MeshStandardMaterial).emissive.set(0x000000);
    }
    
    hoveredPartRef.current = null;
    selectedPartRef.current = null;
    
    if (intersects.length > 0) {
      const object = intersects[0].object as THREE.Mesh;
      
      if (object.userData.partId) {
        selectedPartRef.current = object;
        (object.material as THREE.MeshStandardMaterial).emissive.set(0x3169ee);
        hoveredPartRef.current = object.userData.partId;
      }
    }
  };

  return (
    <div className="relative w-full h-[600px]">
      <div className="absolute top-0 right-0 z-10">
        <Button 
          variant="outline" 
          onClick={() => setViewMode(viewMode === 'front' ? 'back' : 'front')}
          className="mb-2"
        >
          View {viewMode === 'front' ? 'Back' : 'Front'}
        </Button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-vitality-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-vitality-700 dark:text-vitality-300">Loading 3D Body Model...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg shadow-lg cursor-pointer"
      ></div>
      
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 p-2 rounded-md">
        Click and drag to rotate. Click on a body part for information.
      </div>
    </div>
  );
};

export default Interactive3DBodyMap;
