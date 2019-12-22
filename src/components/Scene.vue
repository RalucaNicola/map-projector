<template>
  <div id="webgl_canvas" class="scene" ref="scene"></div>
</template>

<script>
import * as THREE from "three";
export default {
  data: function() {
    return {
      camera: null,
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer()
    };
  },
  mounted() {
    const el = this.$refs.scene;
    const width = el.clientWidth;
    const height = el.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer.setSize(width, height);
    el.appendChild(this.renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const cube = new THREE.Mesh(geometry, material);

    this.scene.add(cube);
    this.camera.position.z = 5;
    this.renderer.render(this.scene, this.camera);
    window.addEventListener("resize", this.setSize);
  },
  methods: {
    setSize() {
      const el = this.$refs.scene;
      this.camera.aspect = el.clientWidth / el.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(el.clientWidth, el.clientHeight);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style scoped>
.scene,
canvas {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
