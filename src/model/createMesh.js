import * as THREE from "three";
import scene from "./scene";
import City from "./Mesh/City";

export default function createMesh() {
  new City(scene);
}
