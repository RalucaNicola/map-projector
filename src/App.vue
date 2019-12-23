<template>
  <div id="app" class="tile is-ancestor is-gapless">
    <div class="tile menu-width is-gapless">
      <Menu
        v-on:change-active-guide="changeActiveGuide"
        v-bind:activeGuide="activeGuide"
        v-bind:menuSteps="menuSteps"
      ></Menu>
    </div>
    <div class="tile is-vertical is-gapless">
      <div class="map-container">
        <div class="guide">
          <Guide
            v-bind:activeGuide="activeGuide"
            v-bind:menuSteps="menuSteps"
          ></Guide>
        </div>
        <div class="map">
          <SceneComponent></SceneComponent>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Guide from "./components/Guide.vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import SceneComponent from "./components/SceneComponent.vue";
export default {
  name: "app",
  components: {
    Guide,
    Footer,
    Menu,
    SceneComponent
  },
  data: function() {
    return {
      activeGuide: "intro",
      menuSteps: [
        {
          text: "Introduction",
          type: "intro"
        },
        {
          text: "Projection Surfaces",
          type: "surfaces"
        },
        {
          text: "Map Distortions",
          type: "distortions"
        },
        {
          text: "Map Projections",
          type: "projections"
        }
      ]
    };
  },
  methods: {
    changeActiveGuide: function(type) {
      this.activeGuide = type;
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: hidden !important;
}

.menu-width {
  max-width: 100px;
}

.guide,
.map {
  flex: 0.5;
  height: 100%;
}

.map {
  overflow: hidden;
}

.guide {
  padding: 0.75em;
  overflow: auto;
}

.map-container {
  min-height: 0;
  display: flex;
  flex: 1;
}
</style>
