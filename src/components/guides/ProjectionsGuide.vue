/* eslint-disable */
<template>
  <div id="tut3" class="tabcontent">
    In this segment, we will briefly discuss some named map projections.
    Maybe the most simple map projection one can imagine is the gnomonic azimuthal map projection, which is also the default setting in this web application. In this case, the projection surface is the plane touch the North Pole and the light source is located at the center of the earth. Use the following button to construct this map projection:
    <div class="tut-button">
      <button onclick="tutorialControls.setProjection('gnomonic azimuthal')">Gnomonic Azimuthal</button>
    </div>
A slightly different map projection is the stereographic azimuthal map projection. In this case, the light source is located at the opposite pole of where the projection plane is touching the earth.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('stereographic azimuthal')"
      >Stereographic Azimuthal</button>
    </div>
Another variant is the orthographic azimuthal projection. In this case, the projection center is located at an infinitely distant location perpendicular to the projection surface. Note how the projection rays form straight, parallel lines.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('orthographic azimuthal')"
      >Orthographic Azimuthal</button>
    </div>
The vertical perspective azimuthal projections places the light source outside of the earth's surface. The near-side variant places the light source "above" the projection surface while the far-side variante places the light source "below" the projection surface.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('vertical perspective azimuthal near side')"
      >Vertical perspective Azimuthal, near-side</button>
    </div>
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('vertical perspective azimuthal far side')"
      >Vertical perspective Azimuthal, far-side</button>
    </div>

    <!--
        A rather special case of map projection is the so-called oblique perspective non-azimuthal perspective, in which case the surface orientation the vector between the light source and the earth's center is not perpendicular to the projection surface.

        <div class="tut-button">
        <button onclick="tutorialControls.setProjection('oblique perspective non-azimuthal')">Oblique perspective non-Azimuthal</button>
        </div>
    -->
    The only common cylindrical projection constructable with this tool is the central cylindrical projection. In this case, the light source is directly positioned in the center of the earth and the cylinder is touching the earth's surface along a great circle.
    Based on the central cylindrical projection, it is possible to construct the Mercator projection by scaling the flattened map.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('central cylindrical')"
      >Central Cylindrical</button>
    </div>
    <div class="tut-button-scaling">
      <button
        onclick="tutorialControls.setScale('central cylindrical to mercator')"
        disabled
      >Scale Central Cylindrical to Mercator</button>
    </div>
A common conical projection is the centrographic conic. Similarly to the gnomonic and the cylindrical projections, this projection places the light source in the center of the earth.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('centrographic conic')"
      >Centrographic Conic</button>
    </div>
A slightly different construction scheme is followed in the case of Braun's stereographic conic projection. In this case, the light source is centered on the opposite pole of where the cone peak is located.
    <div class="tut-button">
      <button
        onclick="tutorialControls.setProjection('brauns stereographic conic')"
      >Braun's Stereographic Conic</button>
      <br>
    </div>
Braun's stereographic cylindrical projection assumes a different projection center for each longitude, which is positioned at the ecuator at the opposite side of the globe.
    <div class="tut-button">
      <button
        class="tutorial-button"
        onclick="tutorialControls.setProjection('brauns stereographic cylindrical')"
      >Braun's Stereographic Cylindrical Projection</button>
    </div>
Lambert's equal area projection is similar to Braun's stereographic cylindrical projection. However, the projection center is assumed to be infinitely far away from the projection surface.
    <div class="tut-button">
      <button
        class="tutorial-button"
        onclick="tutorialControls.setProjection('lamberts equal area cylindrical')"
      >Lambert's Equal Area Projection</button>
    </div>
A projection similar to the Mercator projection can be constructed by placing the projection torus inside the globe.
    <div class="tut-button">
      <button
        class="tutorial-button"
        onclick="tutorialControls.setProjection('brauns pseudomercator')"
      >Braun's Pseudomercator</button>
    </div>

    <div class="content">
      <button class="button is-small is-left" @click="$emit('change-guide-before', guideIndex)">
        Previous: Map distortions
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["guideIndex"]
};
</script>
