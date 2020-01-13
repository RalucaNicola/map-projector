<template>
  <div>
    <IntroductionGuide
      v-if="activeGuide === menuSteps[0].type"
      v-on:change-guide-after="setActiveNext"
      :guideIndex="0"
    ></IntroductionGuide>
    <SurfacesGuide
      v-if="activeGuide === menuSteps[1].type"
      v-on:change-guide-before="setActivePrevious"
      v-on:change-guide-after="setActiveNext"
      :guideIndex="1"
    ></SurfacesGuide>
    <DistortionsGuide
      v-if="activeGuide === menuSteps[2].type"
      v-on:change-guide-before="setActivePrevious"
      v-on:change-guide-after="setActiveNext"
      :guideIndex="2"
    ></DistortionsGuide>
    <ProjectionsGuide
      v-if="activeGuide === menuSteps[3].type"
      v-on:change-guide-before="setActivePrevious"
      v-on:change-guide-after="setActiveNext"
      :guideIndex="3"
    ></ProjectionsGuide>
  </div>
</template>

<script>
import IntroductionGuide from "./guides/IntroductionGuide";
import SurfacesGuide from "./guides/SurfacesGuide";
import DistortionsGuide from "./guides/DistortionsGuide";
import ProjectionsGuide from "./guides/ProjectionsGuide";

export default {
  name: "Guide",
  components: {
    IntroductionGuide,
    SurfacesGuide,
    DistortionsGuide,
    ProjectionsGuide
  },
  props: ["activeGuide", "menuSteps"],
  methods: {
    setActivePrevious: function(index) {
      this.$store.commit("changeActiveGuide", this.menuSteps[index - 1].type);
    },
    setActiveNext: function(index) {
      this.$store.commit("changeActiveGuide", this.menuSteps[index + 1].type);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
