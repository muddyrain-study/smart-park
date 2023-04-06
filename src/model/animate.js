import controls from "@/model/controls";
import renderer from "./renderer";
import * as THREE from "three";
import scene from "./scene";
import camera from "./camera";

// 设置时钟
const clock = new THREE.Clock();
function animate() {
  let time = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
export default animate;
