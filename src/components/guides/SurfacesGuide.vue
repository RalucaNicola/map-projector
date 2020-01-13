<template>
  <div id="tut2" class="tabcontent">
    Typically, three different projection surfaces are used:
    The plane, the cone and the cylinder. A projection based on the plane is
    shown by default when starting this web application. If the settings have
    been modified, you can use the following button to enable the default
    settings.
    <div class="tut-button">
      <button onclick="tutorialControls.resetControls(1, 'advanced')">
        Reset
      </button>
    </div>
    <b-field label="Axis length">
      <b-slider size="is-small" :min="0" :max="8" :step="0.1" v-model="surfaceAxisLength">
          <template v-for="val in [2, 4, 6, 8]">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
      </b-slider>
  </b-field>
  <b-field label="Axis offset">
    <b-slider size="is-small" :min="-2" :max="2" :step="0.1" v-model="surfaceOffset">
        <template v-for="val in [-2, -1, 0, 1, 2]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
        </template>
    </b-slider>
</b-field>
Adjust the "lat" and "lon" values under the "orientation" section of the controls panel to investigate how different positions of the plane affect the resulting projection. Use the buttons below to construct a cone and a cylinder, respectively.
    <div class="tut-button">
      <button onclick="tutorialControls.constructCone()">
        Cone
      </button>
      <button onclick="tutorialControls.constructCylinder()">Cylinder</button>
    </div>
    <div class="content" style="text-align: center">
      <button
        class="button is-small is-primary is-outlined is-light"
        onclick="tutorialControls.moveCameraToProjectionCenter()"
      >
        Move Camera to Projection Center
      </button>
    </div>
    While the plane is flat by default and hence can be used as a map out-of-the-box once the projection has been calculated, the cylinder and the cone need to be unrolled first to obtain their flat, two-dimensional form. To construct the flat representation based on the current orientation, use the "unroll" button in the controls panel to flatten the surface. Once flattend, use the same button (now labeled "roll") to obtain the original three-dimensional form. The location where these cylinders are "cut" can be adjusted with the "rot" value in the "orientation" section of the controls panel. The cut location is indicated by a red sphere.
    <br>It is interesting to know that these three projection surfaces, the plane, the cylinder and the plane can be interpreted as special cases of the conical frustum. Use the following button to construct an open conical frustum (i.e., a conical frustum without caps on top and bottom).
    <div class="tut-button">
      <button onclick="tutorialControls.constructFrustum()">Frustum</button>
    </div>
Based on this surface, you can use the following ways to adjust the parameters in the control panel to construct the three common projection surfaces.
    <ul>
      <li>To construct a plane, set the "axis length" to 0, the "upper radius" to 0.01 and the "lower radius" to a value greater 0.01 such as 4 and the offset to 1.</li>
      <li>To construct a cone, set the "upper radius" to 0.01, the "lower radius" to a value greater 0.01 such as 4 and the axis length to a value greater 0 such as 4 and the offset to 1.</li>
      <li>To construct a cylinder, set the "upper radius" equal the "lower radius" with a value such as 1 and the "axis length" to a value greater 0 such as 4 and the offset to 0.</li>
    </ul>
    Make yourself familiar with these parameters and how they influence the
    geometry of the projection surface.
    <br />
    Now that you learned about the three common projection surfaces and their
    connection, move on to the next section by clicking on the tab "Map
    Distortion Basics" at the top of this panel or click on the button below.
    <div class="content">
      <button class="button is-small is-left" @click="$emit('change-guide-before', guideIndex)">
        Previous: Introduction
      </button>
      <button class="button is-small is-right" @click="$emit('change-guide-after', guideIndex)">
        Next: Map distortions
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["guideIndex"],
  computed: {
    surfaceAxisLength: {
      get() {
        return this.$store.state.surface.axisLength;
      },
      set(value) {
        this.$store.commit("changeSurfaceAxisLength", value);
      }
    },
    surfaceOffset: {
      get() {
        return this.$store.state.surface.offset;
      },
      set(value) {
        this.$store.commit("changeSurfaceOffset", value);
      }
    }
  }
};
</script>
