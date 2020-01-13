<template>
  <div class="content">
    <h4 class="subtitle is-4">Projection surfaces</h4>
    <p>
      Typically, three different projection surfaces are used: the plane, the
      cone and the cylinder. In the beginning a projection based on the plane is
      shown with the default settings (use the Reset parameters button to return
      to the default settings). There are several properties (represented in the
      sliders below) that allow you to switch between a plane, a cylinder and a
      cone surface.
    </p>
    <p>
      To construct a
      <span class="highlight" v-on:click="setSurfaceToPlane"
        >plane surface</span
      >
      , set the "axis length" to 0, the "upper radius" to 0.01 and the "lower
      radius" to a value greater 0.01 such as 4 and the offset to 1.
    </p>
    <p>
      To construct a
      <span class="highlight" v-on:click="setSurfaceToCylinder"
        >cylinder surface</span
      >, set the "upper radius" equal the "lower radius" with a value such as 1
      and the "axis length" to a value greater than 0 such as 4 and the offset
      to 0.
    </p>
    <p>
      To construct a
      <span class="highlight" v-on:click="setSurfaceToCone">cone surface</span>,
      set the "upper radius" to 0.01, the "lower radius" to a value greater 0.01
      such as 4 and the axis length to a value greater than 0 such as 4 and the
      offset to 1.
    </p>
    <div class="slider-content">
      <b-field label="Upper radius">
        <b-slider
          size="is-small"
          :min="0.01"
          :max="4"
          :step="0.1"
          :disabled="disabled"
          v-model="surfaceUpperRadius"
        >
          <template v-for="val in [0.01, 1, 2, 3, 4]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
      <b-field label="Lower radius">
        <b-slider
          size="is-small"
          :min="0.01"
          :max="4"
          :step="0.1"
          :disabled="disabled"
          v-model="surfaceLowerRadius"
        >
          <template v-for="val in [0.01, 1, 2, 3, 4]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
      <b-field label="Axis length">
        <b-slider
          size="is-small"
          :min="0"
          :max="8"
          :step="0.1"
          :disabled="disabled"
          v-model="surfaceAxisLength"
        >
          <template v-for="val in [0, 2, 4, 6, 8]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
      <b-field label="Axis offset">
        <b-slider
          size="is-small"
          :min="-2"
          :max="2"
          :step="0.1"
          :disabled="disabled"
          v-model="surfaceOffset"
        >
          <template v-for="val in [-2, -1, 0, 1, 2]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
    </div>
    <p>
      Adjust the latitude and longitude values in the sliders below to
      investigate how different positions of the plane affect the resulting
      projection.
    </p>
    <div class="slider-content">
      <b-field label="Latitude">
        <b-slider
          size="is-small"
          :min="-90"
          :max="90"
          :step="1"
          :disabled="disabled"
          v-model="latitude"
        >
          <template v-for="val in [-90, -45, 0, 45, 90]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
      <b-field label="Longitude">
        <b-slider
          size="is-small"
          :min="-180"
          :max="180"
          :step="1"
          :disabled="disabled"
          v-model="longitude"
        >
          <template v-for="val in [-180, -90, 0, 90, 180]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
    </div>
    <p>
      While the plane is flat by default and hence can be used as a map
      out-of-the-box once the projection has been calculated, the cylinder and
      the cone need to be unrolled first to obtain their flat, two-dimensional
      form. To construct the flat representation based on the current
      orientation, use the "Unroll" button in the controls panel to flatten the
      surface. Once flattend, use the "Roll" button to obtain the original
      three-dimensional form. The location where these cylinders are "cut" can
      be adjusted in the slider below that sets the rotation value. The cut
      location is indicated by a scissor icon.
    </p>
    <div class="slider-content">
      <b-field label="Rotation">
        <b-slider
          size="is-small"
          :min="-90"
          :max="90"
          :step="1"
          :disabled="disabled"
          v-model="rotation"
        >
          <template v-for="val in [-90, -45, 0, 45, 90]">
            <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
          </template>
        </b-slider>
      </b-field>
    </div>
    <p>
      It is interesting to know that these three projection surfaces, the plane,
      the cylinder and the plane can be interpreted as special cases of the
      conical frustum. Use the following button to construct an open conical
      frustum (i.e., a conical frustum without caps on top and bottom).
    </p>
    <div class="content" style="text-align: center">
      <button
        class="button is-small is-primary is-outlined"
        @click="setSurfaceToFrustum"
      >
        Construct a frustum
      </button>
    </div>
    <p>
      Play again with the parameters above to see construct again a plane, a
      cylinder or a cone. Make yourself familiar with these parameters and how
      they influence the geometry of the projection surface.
    </p>
    <p>
      Now that you learned about the three common projection surfaces and their
      connection, move on to the next lesson on map distortions.
    </p>
    <div class="content">
      <button
        class="button is-small is-left"
        @click="$emit('change-guide-before', guideIndex)"
      >
        Previous: Introduction
      </button>
      <button
        class="button is-small is-right"
        @click="$emit('change-guide-after', guideIndex)"
      >
        Next: Map distortions
      </button>
    </div>
  </div>
</template>

<script>
import {
  coneSurfaceParameters,
  cylinderSurfaceParameters,
  planeSurfaceParameters,
  frustumSurfaceParameters
} from "../../parameters.js";
export default {
  props: ["guideIndex"],
  methods: {
    setSurfaceToCone() {
      this.setSurface(coneSurfaceParameters);
    },
    setSurfaceToCylinder() {
      this.setSurface(cylinderSurfaceParameters);
    },
    setSurfaceToPlane() {
      this.setSurface(planeSurfaceParameters);
    },
    setSurfaceToFrustum() {
      this.setSurface(frustumSurfaceParameters);
    },
    setSurface(parameters) {
      const { axisLength, offset, topRadius, bottomRadius } = parameters;

      this.$store.commit("changeSurfaceAxisLength", axisLength);
      this.$store.commit("changeSurfaceOffset", offset);
      this.$store.commit("changeSurfaceUpperRadius", topRadius);
      this.$store.commit("changeSurfaceLowerRadius", bottomRadius);
    }
  },
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
    },
    surfaceUpperRadius: {
      get() {
        return this.$store.state.surface.topRadius;
      },
      set(value) {
        this.$store.commit("changeSurfaceUpperRadius", value);
      }
    },
    surfaceLowerRadius: {
      get() {
        return this.$store.state.surface.bottomRadius;
      },
      set(value) {
        this.$store.commit("changeSurfaceLowerRadius", value);
      }
    },
    latitude: {
      get() {
        return this.$store.state.surface.latitude;
      },
      set(value) {
        this.$store.commit("changeSurfaceLatitude", value);
      }
    },
    longitude: {
      get() {
        return this.$store.state.surface.longitude;
      },
      set(value) {
        this.$store.commit("changeSurfaceLongitude", value);
      }
    },
    disabled: {
      get() {
        return this.$store.state.surfaceState === "flat";
      }
    }
  }
};
</script>
