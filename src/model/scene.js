import * as THREE from "three";

// 初始化场景
const scene = new THREE.Scene();

// 加载填空图

const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureCubt = cubeTextureLoader.load([
  "./textures/1.jpg",
  "./textures/2.jpg",
  "./textures/3.jpg",
  "./textures/4.jpg",
  "./textures/5.jpg",
  "./textures/6.jpg",
]);
scene.background = textureCubt;
scene.environment = textureCubt;
export default scene;
