<template>
  <div class="menu">
    <h1 class="title">Map Projector</h1>
    <MenuButton
      v-for="step in menuSteps"
      :key="step.type"
      :text="step.text"
      :type="step.type"
      :isSelected="activeGuide === step.type"
      v-on:change-active-guide="setActiveGuide"
    ></MenuButton>
  </div>
</template>

<script>
import MenuButton from "./MenuButton.vue";
export default {
  name: "side-menu",
  components: {
    MenuButton
  },
  props: ["activeGuide", "menuSteps"],
  methods: {
    setActiveGuide: function(type) {
      this.$store.commit("changeActiveGuide", type);
    }
  }
};
</script>

<style scoped>
.menu {
  background-color: #222831;
  padding: 0.3em;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
