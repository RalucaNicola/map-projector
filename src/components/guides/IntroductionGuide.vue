<template>
  <div class="content">
    <h4 class="subtitle is-4">Introduction</h4>
    <p>
      The Map Projector is an interactive tutorial explaining the main concepts
      behind cartographic projections. You'll learn about the main elements of a
      map projection and the parameters that influence the projection.
    </p>
    <div class="box">
      💡 Before we start, here are some instructions on how to use this web
      application: to navigate in the 3D scene, use the left mouse button to
      rotate, the right mouse button to pan and the middle mouse button to zoom.
      If you want to restore the default settings, use the Reset button. The
      parts of the text that are
      <span class="highlight">highlighted with a blue background</span>
      are interactive, you can click on them to get a visual representation in
      the 3D scene.
    </div>
    <p>
      A common approach to construct map projections makes use of three
      geometric objects:
    </p>
    <ul>
      <li>
        A <span class="highlight">simplified representation of the earth</span>,
        typically in the shape of a sphere or a spheroid.
      </li>
      <li>
        A <span class="highlight">projection center</span>, typically
        represented as a point.
      </li>
      <li>
        A <span class="highlight">projection surface</span>, typically in the
        shape of a plane, cylinder or cone. In the simplest case, the map
        surface is directly represented as a flat plane as shown in the 3D scene
        on the right.
      </li>
    </ul>
    <p>
      As you can see, the projection surface is currently a flat disk, touching
      the earth at the North Pole. The projection center is located at the
      center of the earth, represented as a yellow sphere. The earth can be
      imagined as a sphere of coloured glass, effectively coloring each ray that
      passes through its surface. The rays then paint the projection surface
      according to their color.
    </p>
    <div class="box">
      💡 Shift-click on the earth to visualize the ray originating from the
      projection center and passing the clicked location. Note how some rays hit
      the surface while some do not.
    </div>
    <p>
      If you move the camera to the position of the projection center you can
      note how the borders of the sphere and the borders painted on the
      projection surface start to coincide. Move the camera slightly to
      emphasize this effect.
    </p>
    <div class="content" style="text-align: center">
      <button
        class="button is-small is-primary is-outlined is-light"
        onclick="tutorialControls.moveCameraToProjectionCenter()"
      >
        Move Camera to Projection Center
      </button>
    </div>
    <p>
      The position of the projection center is an important aspect when
      constructing map projections. With this slider you can adjust the offset
      value of the projection center:
    </p>
    <div class="slider-content">
      <b-slider size="is-small" :min="-2" :max="2" :step="0.1">
        <template v-for="val in [-2, -1, 0, 1, 2]">
          <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
        </template>
      </b-slider>
    </div>
    <p>
      Observe how different positions of the projection center change the
      resulting projection and the geometry of the rays. Now that you learned
      the basics of how map projections are constructed, you can start learning
      more in depth about projection surfaces.
    </p>
    <div class="content" style="text-align: center">
      <button class="button is-small">
        Next: Projection surfaces
      </button>
    </div>
  </div>
</template>
