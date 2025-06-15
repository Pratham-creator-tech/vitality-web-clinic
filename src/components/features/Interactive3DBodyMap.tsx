
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import gsap from 'gsap';

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
  const selectedPartRef = useRef<THREE.Mesh | null>(null);
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
    loadHumanModel();

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

  // Create a more realistic human figure using primitives
  const loadHumanModel = () => {
    setIsLoading(true);
    
    if (!sceneRef.current) return;
    
    // Colors
    const skinColor = new THREE.Color(0xE0B69B); // Natural skin tone
    const highlightColor = new THREE.Color(0x3169ee); // Blue highlight for selection
    
    // Create body parts and add to an object for organization
    const humanFigure = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.5, 0);
    head.userData.partId = "neck"; // Map to neck in our data
    head.userData.name = "Head";
    humanFigure.add(head);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.2, 16);
    const neckMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.set(0, 1.3, 0);
    neck.userData.partId = "neck";
    neck.userData.name = "Neck";
    humanFigure.add(neck);

    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.35, 0.3, 0.7, 16);
    const torsoMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.set(0, 0.9, 0);
    torso.userData.partId = "back";
    torso.userData.name = "Torso";
    humanFigure.add(torso);

    // Lower torso
    const lowerTorsoGeometry = new THREE.CylinderGeometry(0.3, 0.35, 0.5, 16);
    const lowerTorsoMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const lowerTorso = new THREE.Mesh(lowerTorsoGeometry, lowerTorsoMaterial);
    lowerTorso.position.set(0, 0.3, 0);
    lowerTorso.userData.partId = "hip";
    lowerTorso.userData.name = "Lower Torso";
    humanFigure.add(lowerTorso);

    // Left Shoulder
    const shoulderGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const shoulderMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    leftShoulder.position.set(-0.35, 1.15, 0);
    leftShoulder.userData.partId = "shoulder";
    leftShoulder.userData.name = "Left Shoulder";
    humanFigure.add(leftShoulder);

    // Right Shoulder
    const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial.clone());
    rightShoulder.position.set(0.35, 1.15, 0);
    rightShoulder.userData.partId = "shoulder";
    rightShoulder.userData.name = "Right Shoulder";
    humanFigure.add(rightShoulder);

    // Left Upper Arm
    const upperArmGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.35, 16);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
    leftUpperArm.position.set(-0.45, 0.95, 0);
    leftUpperArm.rotation.z = Math.PI / 8;
    leftUpperArm.userData.partId = "elbow";
    leftUpperArm.userData.name = "Left Upper Arm";
    humanFigure.add(leftUpperArm);

    // Right Upper Arm
    const rightUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial.clone());
    rightUpperArm.position.set(0.45, 0.95, 0);
    rightUpperArm.rotation.z = -Math.PI / 8;
    rightUpperArm.userData.partId = "elbow";
    rightUpperArm.userData.name = "Right Upper Arm";
    humanFigure.add(rightUpperArm);

    // Left Elbow
    const elbowGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    const elbowMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftElbow = new THREE.Mesh(elbowGeometry, elbowMaterial);
    leftElbow.position.set(-0.55, 0.75, 0);
    leftElbow.userData.partId = "elbow";
    leftElbow.userData.name = "Left Elbow";
    humanFigure.add(leftElbow);

    // Right Elbow
    const rightElbow = new THREE.Mesh(elbowGeometry, elbowMaterial.clone());
    rightElbow.position.set(0.55, 0.75, 0);
    rightElbow.userData.partId = "elbow";
    rightElbow.userData.name = "Right Elbow";
    humanFigure.add(rightElbow);

    // Left Lower Arm
    const lowerArmGeometry = new THREE.CylinderGeometry(0.07, 0.06, 0.35, 16);
    const leftLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial.clone());
    leftLowerArm.position.set(-0.65, 0.55, 0);
    leftLowerArm.rotation.z = Math.PI / 12;
    leftLowerArm.userData.partId = "wrist";
    leftLowerArm.userData.name = "Left Lower Arm";
    humanFigure.add(leftLowerArm);

    // Right Lower Arm
    const rightLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial.clone());
    rightLowerArm.position.set(0.65, 0.55, 0);
    rightLowerArm.rotation.z = -Math.PI / 12;
    rightLowerArm.userData.partId = "wrist";
    rightLowerArm.userData.name = "Right Lower Arm";
    humanFigure.add(rightLowerArm);

    // Left Hand
    const handGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    handGeometry.scale(1, 1.2, 0.8);
    const handMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.75, 0.38, 0);
    leftHand.userData.partId = "wrist";
    leftHand.userData.name = "Left Hand";
    humanFigure.add(leftHand);

    // Right Hand
    const rightHand = new THREE.Mesh(handGeometry, handMaterial.clone());
    rightHand.position.set(0.75, 0.38, 0);
    rightHand.userData.partId = "wrist";
    rightHand.userData.name = "Right Hand";
    humanFigure.add(rightHand);

    // Left Hip Joint
    const hipJointGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const hipJointMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftHipJoint = new THREE.Mesh(hipJointGeometry, hipJointMaterial);
    leftHipJoint.position.set(-0.18, 0.05, 0);
    leftHipJoint.userData.partId = "hip";
    leftHipJoint.userData.name = "Left Hip";
    humanFigure.add(leftHipJoint);

    // Right Hip Joint
    const rightHipJoint = new THREE.Mesh(hipJointGeometry, hipJointMaterial.clone());
    rightHipJoint.position.set(0.18, 0.05, 0);
    rightHipJoint.userData.partId = "hip";
    rightHipJoint.userData.name = "Right Hip";
    humanFigure.add(rightHipJoint);

    // Left Upper Leg
    const upperLegGeometry = new THREE.CylinderGeometry(0.11, 0.09, 0.5, 16);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftUpperLeg = new THREE.Mesh(upperLegGeometry, legMaterial);
    leftUpperLeg.position.set(-0.18, -0.25, 0);
    leftUpperLeg.userData.partId = "knee";
    leftUpperLeg.userData.name = "Left Upper Leg";
    humanFigure.add(leftUpperLeg);

    // Right Upper Leg
    const rightUpperLeg = new THREE.Mesh(upperLegGeometry, legMaterial.clone());
    rightUpperLeg.position.set(0.18, -0.25, 0);
    rightUpperLeg.userData.partId = "knee";
    rightUpperLeg.userData.name = "Right Upper Leg";
    humanFigure.add(rightUpperLeg);

    // Left Knee
    const kneeGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const kneeMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftKnee = new THREE.Mesh(kneeGeometry, kneeMaterial);
    leftKnee.position.set(-0.18, -0.5, 0);
    leftKnee.userData.partId = "knee";
    leftKnee.userData.name = "Left Knee";
    humanFigure.add(leftKnee);

    // Right Knee
    const rightKnee = new THREE.Mesh(kneeGeometry, kneeMaterial.clone());
    rightKnee.position.set(0.18, -0.5, 0);
    rightKnee.userData.partId = "knee";
    rightKnee.userData.name = "Right Knee";
    humanFigure.add(rightKnee);

    // Left Lower Leg
    const lowerLegGeometry = new THREE.CylinderGeometry(0.09, 0.07, 0.5, 16);
    const leftLowerLeg = new THREE.Mesh(lowerLegGeometry, legMaterial.clone());
    leftLowerLeg.position.set(-0.18, -0.8, 0);
    leftLowerLeg.userData.partId = "ankle";
    leftLowerLeg.userData.name = "Left Lower Leg";
    humanFigure.add(leftLowerLeg);

    // Right Lower Leg
    const rightLowerLeg = new THREE.Mesh(lowerLegGeometry, legMaterial.clone());
    rightLowerLeg.position.set(0.18, -0.8, 0);
    rightLowerLeg.userData.partId = "ankle";
    rightLowerLeg.userData.name = "Right Lower Leg";
    humanFigure.add(rightLowerLeg);

    // Left Ankle/Foot
    const footGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.22);
    const footMaterial = new THREE.MeshStandardMaterial({ 
      color: skinColor,
      roughness: 0.7,
      metalness: 0.1
    });
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.18, -1.1, 0.05);
    leftFoot.userData.partId = "ankle";
    leftFoot.userData.name = "Left Foot";
    humanFigure.add(leftFoot);

    // Right Ankle/Foot
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial.clone());
    rightFoot.position.set(0.18, -1.1, 0.05);
    rightFoot.userData.partId = "ankle";
    rightFoot.userData.name = "Right Foot";
    humanFigure.add(rightFoot);
    
    // Add the whole human figure to the scene
    sceneRef.current.add(humanFigure);
    
    // For all meshes, store original color for hover effect
    humanFigure.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.originalColor = (child.material as THREE.MeshStandardMaterial).color.clone();
        (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(0x000000);
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
    
    const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children, true);
    
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
