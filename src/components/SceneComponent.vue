<template>
  <div class="scene-component">
    <div class="scene" ref="glcanvas"></div>
    <div class="scene-menu">
      <b-checkbox v-model="tissotEnabled">
        Tissot indicator
      </b-checkbox>
      <b-checkbox v-model="gridEnabled">
        Grid
      </b-checkbox>
      <b-checkbox v-model="countriesEnabled">
        Countries
      </b-checkbox>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import GLCanvas from "../scene-utils/GLCanvas.js";
import Earth from "../scene-utils/Earth.js";

export default {
  mounted() {
    this.canvas = new GLCanvas(this.$refs.glcanvas);
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
  computed: {
    gridEnabled: {
      get() {
        return this.$store.state.gridEnabled;
      },
      set() {
        this.$store.commit("toggleGrid");
        this.earth.toggleGridTexture(this.$store.state.gridEnabled);
      }
    },
    countriesEnabled: {
      get() {
        return this.$store.state.countriesEnabled;
      },
      set() {
        this.$store.commit("toggleCountries");
        this.earth.toggleCountriesTexture(this.$store.state.countriesEnabled);
      }
    },
    tissotEnabled: {
      get() {
        return this.$store.state.tissotEnabled;
      },
      set() {
        this.$store.commit("toggleTissot");
        this.earth.toggleTissotTexture(this.$store.state.tissotEnabled);
      }
    }
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
.scene-component,
.scene,
canvas {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.scene-menu {
  position: relative;
  bottom: 30px;
  right: 10px;
  text-align: right;
  font-size: 0.9em;
}
</style>
