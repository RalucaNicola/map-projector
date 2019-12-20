<template>
  <div class="hello">
    The intention of this web application is to demonstrate the construction of map projections. On the left side of the application, you find the controls panel to adjust the parameters of the different objects present in the 3D-scene in the center of this application. To navigate within the 3D-scene, use the left mouse button to rotate, the right mouse button to pan and the middle mouse button to zoom.
    If you want to restore the default settings, use the reset-button in the control panel.
    <br>
A common approach to construct map projections makes use of three geometric objects:
    <ul>
      <li>A simplified representation of the earth, typically in the shape of a sphere or a spheroid.</li>
      <li>A projection center, typically represented as a point.</li>
      <li>A projection surface, typically in the shape of a plane, cylinder or cone.</li>
    </ul>In the simplest case, the map surface is directly represented as a flat plane as shown by default when opening this web application. If the settings were changed, you can click the button below to reset them.
    <div class="tut-button">
      <button onclick="tutorialControls.resetControls(1, 'advanced')">Reset</button>
    </div>As you can see, the projection surface is currently a flat disk, touching the earth at the North Pole. The projection center is located at the center of the earth, represented as a yellow sphere. The earth can be imagined as a sphere of coloured glass, effectively coloring each ray that passes through its surface. The rays then paint the projection surface according to their color.
    <br>Shift-click on the earth to visualize the ray originating from the projection center and passing the clicked location. Note how some rays hit the surface while some do not.
    <br>Alternatively, click the following button to move the camera to the position of the projection center. Note how the borders of the sphere and the borders painted on the projection surface start to coincide. Move the camera slightly to emphasize this effect.
    <div class="tut-button">
      <button
        onclick="tutorialControls.moveCameraToProjectionCenter()"
      >Move Camera to Projection Center</button>
    </div>The position of the projection center is an important aspect when constructing map projections. This can be adjusted by changing the "offset" value in the "light source" section of the controls panel. Observe how different positions of the projection center change the resulting projection and the geometry of the rays.
    <br>Now that you learned the basics of how map projections are constructed, move on to the next section by clicking on the tab "Projection Surfaces" at the top of this panel or click the button below.
    <div class="tut-button">
      <button onclick="openTab('tut2-button', 'tut2')">Projection Surfaces</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Guide"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
