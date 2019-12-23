<template>
  <div id="webgl_canvas" class="scene" ref="scene"></div>
</template>

<script>
  import * as THREE from "three";
import GLScene from "../scene-utils/GLScene.js";

export default {
  mounted() {
    const scene = new GLScene(this.$refs.scene);

    const clock = new THREE.Clock();
    const animate = function() {
      let delta = clock.getDelta();
      requestAnimationFrame(animate);
      scene.update(delta);
    }
    animate();
    window.addEventListener("resize", function() {
      scene.resize();
    });
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
