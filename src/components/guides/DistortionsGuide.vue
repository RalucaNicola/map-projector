<template>
  <div id="tut4" class="tabcontent">
    <p>
      Each map projection distorts the surface of the earth. This should become obvious, for example by carefully comparing the shapes of countries and their representation on the globe.
      Although these distortions can be precisly mathematically quantified, a more intuitive approach to these distortions can be followed using Tissot's indicatrix.
      Tissot's indicatrix is a graphical means to analyze such distortions and can be enabled by ticking the box labeled "Tissots indicatrices" in the "layers" section of the controls panel.
    </p>

    <p>
      Each indicatrix is constructed as a perfect circle of arbitrary radius covering the earth's surface.
      Typically multiple indicatrices are constructed to cover the whole globe.
      Investigating the shape of the indicatrices on a projection surface gives qualitative information on how features are being distorted depending on their location.
    </p>

    <p>
      For example, in the case of the Gnomonic Azimuthal projection it can be seen how the indicatrices keep their shapes near the point of contact.
      However, the farer away from the pole the greater the distortion becomes.
    </p>

    <p>Click the following button to construct the Gnomonic Azimuthal projection:</p>
    <div class="tut-button">
      <button
        class="tutorial-button"
        onclick="tutorialControls.setProjection('gnomonic azimuthal')"
      >Gnomonic Azimuthal Projection</button>
    </div>

    <p>
      In contrast, Tissot's indicatrices of the Stereographic Azimuthal projection do not show such high distortions.
      In fact, each indicatrix forms a perfect circle. However, their radii increase with larger distances from the point of contact.
    </p>
    <p>Click the following button to construct the Stereographic Azimuthal projection:</p>
    <div class="tut-button">
      <button
        class="tutorial-button"
        onclick="tutorialControls.setProjection('stereographic azimuthal')"
      >Stereographic Azimuthal Projection</button>
    </div>

    <p>How these shapes can be interpreted in detail will be discussed in the next section.</p>
    <div id="tut5" class="tabcontent">
      <p>
        There are three main types of distortions that are of interest and which can be analyzed with Tissot's indicatrix.
        First, an indicatrix forms a perfect circle. In such a case, the map projection preserves the angles encountered on the earth's surface.
        This means that an angle measured on the map is identical to the angle measured on the respective location on the earth's surface.
        This property is particular of interest for navigation purposes. A map with this property is also called "conformal".
        The Stereographic Azimuthal Projection is one example with this property.
      </p>
      <div class="tut-button">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setProjection('stereographic azimuthal')"
        >Stereographic Azimuthal Projection</button>
      </div>

      <p>
        Second, the diamater of an indicatrix is constant along a specific direction. In such a case, the projection is preserving the length along this direction.
        Many projections have this property where the projection surface interescts with the globe. A straight-forward example may be the central cylindrical projection where the cylinder touches the ecuator.
      </p>
      <div class="tut-button">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setProjection('central cylindrical')"
        >Central Cylindrical</button>
      </div>

      <p>
        The same is true for similar projections. For example, Braun's stereographic cylindrical projection touches the globe in the very same way and hence shares this property with the central cylindrical projection.
        Use the following button to construct Braun's stereographic cylindrical projection:
      </p>
      <div class="tut-button">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setProjection('brauns stereographic cylindrical')"
        >Braun's Stereographic Cylindrical Projection</button>
      </div>

      <p>
        As shown in the 3D view, this projection can not be constructed with a single projection center.
        Rather, the projection center changes depending on the longitude. This continuous range of projection centers can be represented as a Torus, which lies exactly at the ecuator.
        If you are unsure how each point on the globe is mapped on the projection surface, use the Shift key and the Left Mouse Button on the globe to indicate the projection lines.
      </p>

      <p>
        Third, the circle on the map covers the same area as on the globe. In this case, the projection is preserving the feature's areas.
        One example that has this property is Lambert's equal-area cylindrical projection. As with Braun's stereographic projection, its projection center depends on the longitude.
        However, the position of each center lies infinitely far away from the projection surface. Use the following button to construct Lambert's equal-area cylindrical projection:
      </p>
      <div class="tut-button">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setProjection('lamberts equal area cylindrical')"
        >Lambert's Equal Area Projection</button>
      </div>

      <p>Note how all the circles have the very same size, although their shapes may highly deviate from each other.</p>
      <p>Apart from these main properties of map projections, specifically the term "compromising" can be found in the literature, denoting map projections which reduce the distortions mentioned above while not entirely eliminating any of them.</p>

      <p>
        Some map projections with useful properties cannot be directly constructed geometrically in the way that was described before.
        Rather they need to be scaled (i.e., stretched or shrinked) using carefully derived formulas. One famous example for sucha map projection is the Mercator projection as described in the next section.
      </p>

      <div class="tut-button">
        <button onclick="openTab('tut6-button', 'tut6')">The Mercator Projection</button>
      </div>
    </div>

    <div id="tut6" class="tabcontent">
      <p>
        The Mercator projection is attributed to Gerhard Mercator, who sought to create a cylindrical map projection that would preserve angles and thus would be beneficial for navigational purposes.
        The projection is still in use today but severely distorts areas and shapes. Hence, it should be applied with great care.
      </p>

      <p>
        The Mercator projection can not be easily constructed geometrically, but rather requires to scale a flattened cylinder according to specific trigonometric formulas.
        To illustrate this approach, first the central cylindrical projection needs to be constructed.
      </p>
      <p></p>
      <div class="tut-button">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setProjection('central cylindrical')"
        >Central Cylindrical Projection</button>
      </div>

      <p>
        Use the "flatten" button to create the unrolled representation of the central cylindrical projection.
        As already described, the central cylindrical projection shows higher distortions the further away a point is from the ecuator.
        Conformity (i.e., the preservation of angles) can only be achieved if the projection is shrinked.
        The distance by which a specific point should be shrinked depends on the latitude.
      </p>

      <p>
        You can try to carry out this shrinking manually by using the "scaling" diagram, which gets enabled when a map is unrolled.
        The scaling diagram depicts by how much a point on the flattened map is moved (i.e., stretched or shrinked) depending on its position along the main unrolled axis.
        The "source" axis represents the position along the unscaled flattened map. The "target" axis represents the target position a point should be moved to, depending on its source position.
      </p>

      <p>
        Initially, this relationship is linear, i.e., each source position equals the target position and therefore no scaling is applied.
        This scaling function can be manually modified using interactive Bezier curves. To start editing these curves, push the "start editing" button.
        You can move around the control points (black) and handles (gray) to adjust the scaling function.
        Left-clicking into diagram will add a new control point and its handles. Right-clicking on a control point will remove it again.
        The initial two control-points cannot be removed. The resulting function should be steadily increasing. Else the map will intersect with itself.
      </p>

      <p>
        Investigate how changes in the diagram influence the flattened map. Try creating a scaling function that changes the shapes of the indicatrices to perfect circles.
        To reset the scaling function, first press the "stop editing" button and afterwards press the "reset" button.
      </p>

      <p>You can compare your result with the effective scaling function that was constructed using the Mercator formulas:</p>

      <!--<button class="tutorial-button" onclick="tutorialControls.setProjection('brauns pseudomercator')">Braun's Pseudomercator</button>-->
      <div class="tut-button-scaling">
        <button
          class="tutorial-button"
          onclick="tutorialControls.setScale('central cylindrical to mercator')"
          disabled
        >Scale Central Cylindrical to Mercator</button>
      </div>

      <p>Once you are finished with investigating the Mercator projection, you can use the "reset" button to undo the scaling operation. Once unscaled, the flattened map can be unrolled again</p>
      <p>To get an overview on the map projections that can be constructed with the GITTA Map Projector, click on the button below</p>
      <div class="tut-button">
        <button onclick="openTab('tut3-button', 'tut3')">List of Map Projections</button>
      </div>
    </div>
  </div>
</template>