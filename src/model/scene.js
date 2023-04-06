import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 初始化场景
const scene = new THREE.Scene();

// 导入 hdr 纹理
const hdrLoader = new RGBELoader();

hdrLoader.loadAsync("./textures/023.hdr").then((texture) => {
  scene.background = texture;
  scene.environment = texture;
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});

export default scene;
