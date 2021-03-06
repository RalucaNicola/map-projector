<template>
  <div class="scene-component">
    <div class="scene" ref="glcanvas"></div>
    <div class="scene-menu">
      <div class="scene-buttons">
        <button class="button is-small is-primary" v-on:click="rollSurface">
          {{ rollButtonText }}
        </button>
        <button
          class="button is-small is-primary"
          v-on:click="resetProjectionParameters"
        >
          Reset parameters
        </button>
      </div>
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
import { Clock, Vector3 } from "three";
import GLCanvas from "../scene-utils/GLCanvas.js";
import Earth from "../scene-utils/Earth.js";
import Surface from "../scene-utils/Surface.js";
import ProjectionCenter from "../scene-utils/ProjectionCenter.js";
import { initialParameters } from "../parameters.js";

function convertLatDegToRad(value) {
  return ((value - 90) / 360) * 2 * Math.PI;
}

function convertLonDegToRad(value) {
  return (value / 360) * 2 * Math.PI;
}

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
    this.clock = new Clock();
    window.addEventListener(
      "resize",
      function() {
        this.canvas.resize();
      }.bind(this)
    );
    this.initializeStoreProps();
    this.resetProjectionParameters();
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
        this.toggleGridTexture(status);
      }
    },
    countriesEnabled: {
      get() {
        return this.$store.state.countriesEnabled;
      },
      set() {
        this.$store.commit("toggleCountries");
        const status = this.$store.state.countriesEnabled;
        this.toggleCountriesTexture(status);
      }
    },
    tissotEnabled: {
      get() {
        return this.$store.state.tissotEnabled;
      },
      set() {
        this.$store.commit("toggleTissot");
        const status = this.$store.state.tissotEnabled;
        this.toggleTissotTexture(status);
      }
    },
    rollButtonText: {
      get() {
        if (this.$store.state.surfaceState === "flat") {
          return "Flatten";
        } else {
          return "Roll";
        }
      }
    }
  },
  methods: {
    rollSurface() {
      this.$store.commit("toggleSurfaceState");
    },
    toggleTissotTexture(value) {
      this.earth.toggleTissotTexture(value);
      this.surface.toggleTissotTexture(value);
    },
    toggleCountriesTexture(value) {
      this.earth.toggleCountriesTexture(value);
      this.surface.toggleCountriesTexture(value);
    },
    toggleGridTexture(value) {
      this.earth.toggleGridTexture(value);
      this.surface.toggleGridTexture(value);
    },
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

      this.toggleTissotTexture(state.tissotEnabled);
      this.toggleCountriesTexture(state.countriesEnabled);
      this.toggleGridTexture(state.gridEnabled);
    },
    resetProjectionParameters() {
      const { surface, projectionCenter } = { ...initialParameters };

      const {
        axisLength,
        latitude,
        longitude,
        offset,
        topRadius,
        bottomRadius
      } = surface;
      this.$store.commit("changeSurfaceAxisLength", axisLength);
      this.$store.commit("changeSurfaceOffset", offset);
      this.$store.commit("changeSurfaceLatitude", latitude);
      this.$store.commit("changeSurfaceLongitude", longitude);
      this.surface.setTopRadius(topRadius);
      this.surface.setBottomRadius(bottomRadius);

      const { scale, offset: cOffset } = projectionCenter;
      this.$store.commit("changePCenterOffset", cOffset);
      this.$store.commit("changePCenterScale", scale);
    },
    lookAt(mesh, distanceFactor) {
      const direction = new Vector3();
      mesh.getWorldDirection(direction);
      const position = mesh.position;
      this.canvas.camera.position
        .copy(position)
        .add(direction.multiplyScalar(distanceFactor));
      this.canvas.camera.lookAt(position);
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
        case "changeSurfaceLatitude": {
          const latitude = convertLatDegToRad(state.surface.latitude);
          this.surface.setLatitude(latitude);
          this.projectionCenter.setLatitude(latitude);
          this.surface.setProjectionTorusParams(
            this.projectionCenter.scale,
            this.projectionCenter.lightCenter.matrixWorld
          );
          break;
        }
        case "changeSurfaceLongitude": {
          const longitude = convertLonDegToRad(state.surface.longitude);
          this.surface.setLongitude(longitude);
          this.projectionCenter.setLongitude(longitude);
          this.surface.setProjectionTorusParams(
            this.projectionCenter.scale,
            this.projectionCenter.lightCenter.matrixWorld
          );
          break;
        }
        case "changeSurfaceUpperRadius":
          this.surface.setTopRadius(state.surface.topRadius);
          break;
        case "changeSurfaceLowerRadius":
          this.surface.setBottomRadius(state.surface.bottomRadius);
          break;
        case "changePCenterOffset":
          this.projectionCenter.setOffset(state.projectionCenter.offset);
          break;
        case "changePCenterScale":
          this.projectionCenter.reconstructTorus(state.projectionCenter.scale);
          this.surface.setProjectionTorusParams(
            this.projectionCenter.scale,
            this.projectionCenter.lightCenter.matrixWorld
          );
          break;
        case "setCamera":
          if (state.cameraPosition === "projectionCenter") {
            this.canvas.camera.position.copy(new Vector3(0, 0, 0));
            this.canvas.orbitControls.target = new Vector3(0, 0, 0.1);
          }
          if (state.cameraPosition === "lookAtProjectionCenter") {
            this.lookAt(this.projectionCenter.earthCenter, 1);
          }
          if (state.cameraPosition === "lookAtEarth") {
            this.lookAt(this.earth.earthMesh, 3);
          }
          if (state.cameraPosition === "lookAtSurface") {
            this.lookAt(this.surface.mesh, 3);
          }
          break;
        case "toggleSurfaceState":
          if (state.surfaceState === "flat") {
            this.surface.flatten();
          } else if (state.surfaceState === "rolled") {
            this.surface.roll();
          }
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
  bottom: 70px;
  right: 10px;
  text-align: right;
  font-size: 0.9em;
}

.scene-buttons {
  padding-bottom: 1em;
}

.scene-buttons > button:not(:last-child) {
  margin-right: 1em;
}
</style>
