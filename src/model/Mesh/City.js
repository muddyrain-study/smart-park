import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    this.loader.load("./model/city.glb", (gltf) => {
      console.log(gltf);
      // this.scene.background =  gltf.scene
    });
  }
}
