import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";
import eventHub from "@/utils/eventHub";
import { gsap } from "gsap";
import cameraModule from "@/model/camera";
import controlsModule from "../controls";

export default class City {
  constructor(scene) {
    // 载入模型
    this.scene = scene;
    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    this.loader.setDRACOLoader(dracoLoader);
    this.loader.load("./model/city4.glb", (gltf) => {
      scene.add(gltf.scene);

      // 对场景子元素进行遍历
      this.gltf = gltf;
      console.log("gltf", gltf);
      gltf.scene.traverse((child) => {
        if (child.name === "热气球") {
          // 根据无图创建一个 动画混合器 混合器播放的动画所属的对象
          this.mixer = new THREE.AnimationMixer(child);
          this.clip = gltf.animations[1];
          // 剪辑动画动作 并返回一个动画动作
          this.action = this.mixer.clipAction(this.clip);
          this.action.play();
        }
        if (child.name === "redcar") {
          this.redcar = child;
        }
        if (child.name === "汽车园区轨迹") {
          const line = child;
          line.visible = false;
          // 根据点 创建曲线
          const points = [];
          for (
            let i = line.geometry.attributes.position.count - 1;
            i > 0;
            i--
          ) {
            points.push(
              new THREE.Vector3(
                line.geometry.attributes.position.array[i * 3],
                line.geometry.attributes.position.array[i * 3 + 1],
                line.geometry.attributes.position.array[i * 3 + 2]
              )
            );
          }
          // 创建曲线
          this.curve = new THREE.CatmullRomCurve3(points);
          this.curveProgress = 0;
          this.carAnimation();
        }
        if (child.name === "Stark_Tower") {
          this.loader.load("./model/jianshen-min.glb", (gltf) => {
            gltf.scene.traverse(function (child) {
              if (child.name == "Floor") {
                child.material = new THREE.MeshStandardMaterial({
                  color: 0xffffff,
                });
              }
              if (child.isMesh) {
                child.material.depthWrite = true;
                child.material.normalScale = new THREE.Vector2(1, 1);
                child.material.side = THREE.FrontSide;
                child.material.transparent = false;
                child.material.vertexColors = false;
              }
            });
            gltf.scene.scale.set(15, 15, 15);
            const childPostion = child.position.clone();
            gltf.scene.position.set(
              childPostion.x + 40,
              childPostion.y + 260,
              childPostion.z + 5
            );
            gltf.scene.rotation.y = Math.PI / 2;
            scene.add(gltf.scene);
            this.personMixer = new THREE.AnimationMixer(gltf.scene);
            const action = this.personMixer.clipAction(gltf.animations[0]);
            action.play();
            action.timeScale = 3;
            eventHub.on("togglePerson", () => {
              gsap.to(controlsModule.controls.target, {
                ...gltf.scene.position.clone(),
                duration: 1,
                onComplete() {
                  gsap.to(cameraModule.activeCamera.position, {
                    x: gltf.scene.position.clone().x * 0.95,
                    y: gltf.scene.position.clone().y * 1.25,
                    z: gltf.scene.position.clone().z,
                    duration: 2,
                  });
                },
              });
            });
          });
        }
      });
      gltf.cameras.forEach((camera) => {
        // scene.add(camera);
        cameraModule.add(camera.name, camera);
      });
    });

    eventHub.on("actionClick", (i) => {
      this.clip = this.gltf.animations[i];
      this.action.stop();
      this.action = this.mixer.clipAction(this.clip);
      this.action.setDuration(5);
      this.action.play();
    });
    eventHub.on("focusDance", () => {
      // this.womanPosition = this.woman = p
    });
  }
  update(time) {
    if (time && this.mixer) {
      this.mixer.update(time);
    }
    if (time && this.personMixer) {
      this.personMixer.update(time);
    }
  }
  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.99,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress);
        this.redcar.position.set(point.x, point.y, point.z);
        // 如果 当前的点 下一个点 小于 1
        if (this.curveProgress + 0.001 < 1) {
          // 那么获取下一个点的数据
          const point = this.curve.getPoint(this.curveProgress + 0.001);
          // 并且让小汽车看向下一个点
          this.redcar.lookAt(point);
        }
      },
    });
  }
}
