<template>
  <div class="menu-element">
    <h1 class="title">Map Projector</h1>
    <MenuButton
      v-for="step in menuSteps"
      :key="step.type"
      :text="step.text"
      :onClick="setGuide(step.type)"
    ></MenuButton>
  </div>
</template>

<script>
import MenuButton from "./MenuButton.vue";
export default {
  name: "menu",
  components: {
    MenuButton
  },
  data: function() {
    return {
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
    setGuide: function(type) {
      return function() {
        console.log(type);
      };
    }
  }
};
</script>

<style scoped>
.menu-element {
  background-color: #222831;
  padding: 0.3em;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
