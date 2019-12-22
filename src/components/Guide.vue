<template>
  <div>
    <IntroductionGuide
      v-if="activeGuide === menuSteps[0].type"
    ></IntroductionGuide>
    <SurfacesGuide v-if="activeGuide === menuSteps[1].type"></SurfacesGuide>
    <DistortionsGuide
      v-if="activeGuide === menuSteps[2].type"
    ></DistortionsGuide>
    <ProjectionsGuide
      v-if="activeGuide === menuSteps[3].type"
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
  props: ["activeGuide", "menuSteps"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
