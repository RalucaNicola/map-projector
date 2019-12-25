<template>
  <div id="webgl_canvas" class="scene" ref="scene"></div>
</template>

<script>
import * as THREE from "three";
import GLCanvas from "../scene-utils/GLCanvas.js";
import Earth from "../scene-utils/Earth.js";

export default {
  mounted() {
    this.canvas = new GLCanvas(this.$refs.scene);
    this.earth = new Earth(this.canvas.scene);
    this.clock = new THREE.Clock();
    window.addEventListener(
      "resize",
      function() {
        this.canvas.resize();
      }.bind(this)
    );
    this.animate();
  },
  methods: {
    animate() {
      let delta = this.clock.getDelta();
      this.canvas.update(delta);
      requestAnimationFrame(
        function() {
          this.animate();
        }.bind(this)
      );
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
