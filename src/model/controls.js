import camera from "./camera";
import renderer from "./renderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器的阻尼，让控制器更真实
controls.enableDamping = true;

export default controls;
