<template>
  <div id="app" class="tile is-ancestor is-gapless">
    <div class="tile menu-width is-gapless">
      <Menu></Menu>
    </div>
    <div class="tile is-vertical is-gapless">
      <div class="map-container">
        <div class="is-6 guide">
          <Guide></Guide>
        </div>
        <div class="is-6 map">
          <p>this is the map</p>
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
export default {
  name: "app",
  components: {
    Guide,
    Footer,
    Menu
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
  overflow: auto;
  padding: 0.7em;
}

.map-container {
  min-height: 0;
  display: flex;
  flex: 1;
}
</style>
