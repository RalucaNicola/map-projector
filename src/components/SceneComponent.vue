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
import Surface from "../scene-utils/Surface.js";
import ProjectionCenter from "../scene-utils/ProjectionCenter.js";

export default {
  mounted() {
    this.canvas = new GLCanvas(this.$refs.glcanvas);
    this.earth = new Earth(this.canvas.scene);
    this.surface = new Surface(this.canvas.scene, this.earth);
    this.projectionCenter = new ProjectionCenter(this.canvas.scene);
    this.surface.setProjectionTorusParams(
      this.projectionCenter.scale,
      this.projectionCenter.lightCenter.matrixWorld
    );
    this.clock = new THREE.Clock();
    window.addEventListener(
      "resize",
      function() {
        this.canvas.resize();
      }.bind(this)
    );
    this.initializeStoreProps();
    this.animate();
  },
  computed: {
    gridEnabled: {
      get() {
        return this.$store.state.gridEnabled;
      },
      set() {
        this.$store.commit("toggleGrid");
        const status = this.$store.state.gridEnabled;
        this.earth.toggleGridTexture(status);
        this.surface.toggleGridTexture(status);
      }
    },
    countriesEnabled: {
      get() {
        return this.$store.state.countriesEnabled;
      },
      set() {
        this.$store.commit("toggleCountries");
        const status = this.$store.state.countriesEnabled;
        this.earth.toggleCountriesTexture(status);
        this.surface.toggleCountriesTexture(status);
      }
    },
    tissotEnabled: {
      get() {
        return this.$store.state.tissotEnabled;
      },
      set() {
        this.$store.commit("toggleTissot");
        const status = this.$store.state.tissotEnabled;
        this.earth.toggleTissotTexture(status);
        this.surface.toggleTissotTexture(status);
      }
    }
  },
  methods: {
    animate() {
      let delta = this.clock.getDelta();
      this.canvas.update(delta);
      this.surface.update(delta);
      requestAnimationFrame(
        function() {
          this.animate();
        }.bind(this)
      );
    },
    initializeStoreProps() {
      const state = this.$store.state;

      this.earth.toggleTissotTexture(state.tissotEnabled);
      this.surface.toggleTissotTexture(state.tissotEnabled);
      this.earth.toggleCountriesTexture(state.countriesEnabled);
      this.surface.toggleCountriesTexture(state.countriesEnabled);
      this.earth.toggleGridTexture(state.gridEnabled);
      this.surface.toggleGridTexture(state.gridEnabled);

      const { axisLength, offset, topRadius, bottomRadius } = state.surface;
      this.surface.setAxisLength(axisLength);
      this.surface.setGeometryOffset(offset);
      this.surface.setTopRadius(topRadius);
      this.surface.setBottomRadius(bottomRadius);

      const {
        scale,
        latitude,
        longitude,
        offset: cOffset
      } = state.projectionCenter;
      this.projectionCenter.reconstructTorus(scale);
      this.projectionCenter.setLatitude(latitude);
      this.projectionCenter.setLongitude(longitude);
      this.projectionCenter.setOffset(cOffset);
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "changeSurfaceAxisLength":
          this.surface.setAxisLength(state.surface.axisLength);
          break;
        case "changeSurfaceOffset":
          this.surface.setGeometryOffset(state.surface.offset);
          break;
      }
    });
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
