import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class GLCanvas {
  constructor(container) {
    this.container = container;

    const width = container.clientWidth;
    const height = container.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#ffffff");

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.y = 5;
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    container.append(this.renderer.domElement);

    this.gl = this.renderer.getContext();

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.addEventListener(
      "change",
      function() {
        const p = this.camera.position;
        this.light.position.set(p.x, p.y + 1, p.z);
      }.bind(this)
    );

    this.light = new THREE.DirectionalLight(0xeeeeee);
    this.light.position.set(1, 1, 1).normalize();
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0x111111));

    const axisHelper = new THREE.AxesHelper(2);
    this.scene.add(axisHelper);
  }

  resize() {
    const el = this.container;
    this.camera.aspect = el.clientWidth / el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(el.clientWidth, el.clientHeight);
    this.renderer.render(this.scene, this.camera);
  }

  update(delta) {
    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update(delta);
  }
}

export default GLCanvas;
