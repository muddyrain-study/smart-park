import controls from "@/model/controls";
import renderer from "./renderer";
import * as THREE from "three";
import scene from "./scene";
import camera from "./camera";
import { updateMesh } from "@/model/createMesh";

// 设置时钟
const clock = new THREE.Clock();
function animate() {
  controls.update();
  let time = clock.getDelta();
  updateMesh(time);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
export default animate;
