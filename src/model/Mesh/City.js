import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";

export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    this.loader.setDRACOLoader(dracoLoader);
    this.loader.load("./model/city3.glb", (gltf) => {
      scene.add(gltf.scene);

      // 对场景子元素进行遍历
      gltf.scene.traverse((child) => {
        if (child.name === "热气球") {
          // 根据无图创建一个 动画混合器 混合器播放的动画所属的对象
          this.mixer = new THREE.AnimationMixer(child);
          this.clip = gltf.animations[0];
          // 剪辑动画动作 并返回一个动画动作
          this.action = this.mixer.clipAction(this.clip);
          this.action.play();
        }
      });
    });
  }
  update(time) {
    if (time && this.mixer) {
      this.mixer.update(time);
    }
  }
}
