import * as THREE from "three";

const vertexShaderSource = /* glsl */ `
  varying vec4 localPosition;
  vec4 globalPosition;
  varying vec4 globalPositionRolled;
  vec4 globalPositionTorus;

  uniform int keepVertices;

  uniform float projTorusScale;
  uniform mat4 projTorusMatrix;

  attribute vec3 positionRolled;
  attribute vec3 positionProjectionCenter;

  void main() {
    gl_Position =  projectionMatrix *
      modelViewMatrix * vec4(position,1.0);
    globalPosition = modelMatrix * vec4(position, 1.0);
    if (keepVertices == 1) {
      globalPositionRolled = modelMatrix * vec4(positionRolled, 1.0);
    } else {
      globalPositionRolled = globalPosition;
    }
    localPosition = vec4(positionRolled, 1.0);
    globalPositionTorus = projTorusMatrix * vec4(positionProjectionCenter * projTorusScale, 1.0);
  }
`;

var fragmentShaderSource = /* glsl */ `
  uniform sampler2D tCountries;
  uniform sampler2D tGrid;
  uniform sampler2D tTissot;

  uniform float projTorusScale;
  uniform mat4 projTorusMatrix;

  uniform float opacity;

  varying vec4 localPosition;
  varying vec4 globalPositionRolled;
  varying vec4 globalPositionTorus;

  #define M_PI 3.1415926535897932384626433832795
  float radius = 1.0;
  vec2 xyz2latlon(vec3 xyz) {
    float r = sqrt(xyz.x * xyz.x + xyz.y * xyz.y + xyz.z * xyz.z);
    float azimuthal = atan(-xyz.z, xyz.x);
    float polar = acos(-xyz.y / r);
    return vec2(azimuthal, polar);
  }

  vec3 point_on_sphere(vec3 projection_center, vec3 fragment_location) {
    vec3 origin = projection_center;
    vec3 dir_vector = normalize(fragment_location - projection_center);

    float a = -dot(dir_vector, origin);
    float b = (dot(dir_vector, origin) * dot(dir_vector, origin)) - (length(origin) * length(origin)) + (radius * radius);

    // no intersection
    if (b < 0.0) {
      return vec3(-1000.0, -1000.0, -1000.0);
    }
    else if (b == 0.0) // one intersection
    {
    return origin + a * dir_vector;
    }

    // two intersections
    float c = sqrt(b);
    float d1 = a + c;
    float d2 = a - c;

    vec3 p1 = origin + d1 * dir_vector;
    vec3 p2 = origin + d2 * dir_vector;

    if (distance(p1, fragment_location) < distance(p2, fragment_location)) {
      return p1;
    }
    return p2;
  }


  void main() {
    vec3 globalPositionTorus = (projTorusMatrix * vec4(normalize(vec3(-localPosition.x, 0.0, -localPosition.z)) * projTorusScale, 1.0)).xyz;
    vec3 p = point_on_sphere(globalPositionTorus.xyz, globalPositionRolled.xyz);

    if (p.x < -999.0) {
      gl_FragColor = vec4(0.5, 0.5, 0.5, opacity);
    } else {
      vec2 latlon = xyz2latlon(p);

      float azimuthalNorm = (latlon[0]) / (2.0 * M_PI) + 0.5;
      float polarNorm = (latlon[1] / M_PI);

      vec2 uv_comp = vec2(azimuthalNorm, polarNorm);

      vec4 color;
      vec4 CCountries = texture2D(tCountries, uv_comp);
      vec4 CGrid = texture2D(tGrid, uv_comp);
      vec4 CTissot = texture2D(tTissot, uv_comp);

      color = CCountries;
      color = vec4(color.rgb * color.a * (1.0 - CGrid.a) + CGrid.a * CGrid.rgb, 1.0);
      color = vec4(color.rgb * color.a * (1.0 - CTissot.a) + CTissot.a * CTissot.rgb, 1.0);

      gl_FragColor = vec4(color.rgb, opacity);
    }
  }
`;

class Stripe {
  constructor(bufferGeometry, idxLeft, idxRight) {
    this.bufferGeometry = bufferGeometry;
    this.idxLeft = idxLeft;
    this.idxRight = idxRight;
  }

  getNormal() {
    const [vA, vB, vC] = [
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ];
    const [cb, ab] = [new THREE.Vector3(), new THREE.Vector3()];

    vA.fromBufferAttribute(
      this.bufferGeometry.attributes.position,
      this.idxLeft[0]
    );
    vB.fromBufferAttribute(
      this.bufferGeometry.attributes.position,
      this.idxLeft[1]
    );
    vC.fromBufferAttribute(
      this.bufferGeometry.attributes.position,
      this.idxRight[0]
    );
    cb.subVectors(vC, vB);
    ab.subVectors(vA, vB);
    cb.cross(ab);

    cb.normalize();

    return cb;
  }
}

class Surface {
  constructor(scene, earth) {
    this.scene = scene;
    this.earth = earth;
    this.state = "Initializing";
    this.showWireframe = false;
    this.bufferGeometry = new THREE.BufferGeometry();
    this.topRadius = 1.0;
    this.bottomRadius = 1.0;

    const segmentsRadial = 100;
    const segmentsHeight = 50;
    const indices = [];
    const position = [];

    let px, py, pz; // vertex position

    const indexArray = [];
    let index = 0;

    for (let y = 0; y <= segmentsHeight; y++) {
      const indexRow = [];
      const v = y / segmentsHeight;
      for (let x = 0; x <= segmentsRadial; x++) {
        const u = x / segmentsRadial;
        const theta = u * 2 * Math.PI - Math.PI / 2;

        px = Math.sin(theta);
        py = v - 0.5; // centers the cylinder to zero along the y axis (vertices get built up from bottom to top)
        pz = Math.cos(theta);
        position.push(px, py, pz);

        indexRow.push(index++);
      }

      indexArray.push(indexRow);
    }

    this.stripes = [];
    for (let x = 0; x < segmentsRadial; x++) {
      const idxLeft = [];
      const idxRight = [];

      for (let y = 0; y < segmentsHeight; y++) {
        // face indices
        const a = indexArray[y][x];
        const b = indexArray[y + 1][x];
        const c = indexArray[y + 1][x + 1];
        const d = indexArray[y][x + 1];

        // faces
        indices.push(a, b, d);
        indices.push(b, c, d);

        if (y == 0) {
          idxLeft.push(a);
          idxRight.push(d);
        }

        idxLeft.push(b);
        idxRight.push(c);
      }

      this.stripes.push(new Stripe(this.bufferGeometry, idxLeft, idxRight));
    }

    this.bufferGeometry.setIndex(indices);
    this.bufferGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(position), 3)
    );
    this.bufferGeometry.setAttribute(
      "positionRolled",
      new THREE.Float32BufferAttribute(new Float32Array(position), 3)
    );
    this.bufferGeometry.computeVertexNormals();
    this.savedRolledPositions = new Float32Array(position);

    this.startTime = new Date();
    this.maxTime = 2;
    this.fractionPerSecond = 1 / this.maxTime;
    this.quadsPerSecond = this.fractionPerSecond * this.stripes.length;
    this.secondsPerQuad = this.stripes.length / this.maxTime;
    this.lastQuadInverse = this.stripes.length - 1;
    this.overallTInverse = 0;
    this.remainingQuadsFloatInverse = 0;
    this.lastQuad = 0;
    this.overallT = 0;
    this.remainingQuadsFloat = 0;

    const uniforms = {
      tCountries: { type: "t", value: this.earth.countriesTexture },
      tGrid: { type: "t", value: this.earth.gridTexture },
      tTissot: { type: "t", value: this.earth.tissotTexture },
      projTorusScale: { type: "f", value: 1.0 },
      projTorusMatrix: { type: "m4", value: new THREE.Matrix4() },
      opacity: { type: "f", value: 1.0 }, // Note: if not 1.0, set transparent of material to true
      keepVertices: { type: "i", value: 0 }
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      side: THREE.DoubleSide,
      transparent: false,
      polygonOffset: true,
      depthTest: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: -1
    });

    this.mesh = new THREE.Mesh(this.bufferGeometry, this.material);

    if (this.showWireframe) {
      this.bufferGeometryWireframe = new THREE.BufferGeometry();
      this.bufferGeometryWireframe.setIndex(indices);
      this.bufferGeometryWireframe.addAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          new Float32Array(this.bufferGeometry.attributes.position.array),
          3
        )
      );
      this.bufferGeometryWireframe.computeVertexNormals();

      this.geo = new THREE.WireframeGeometry(this.bufferGeometryWireframe); // or WireframeGeometry( geometry )
      this.mat = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 4 });
      this.wireframe = new THREE.LineSegments(this.geo, this.mat);
    }

    this.earthCenter = new THREE.Object3D();

    this.earthCenter.add(this.mesh);
    if (this.showWireframe) {
      this.mesh.add(this.wireframe);
    }
    this.scene.add(this.earthCenter);

    this.updateGeometry();

    this.state = "Rolled";
  }

  updateGeometry() {
    const n1 = this.stripes[0].getNormal();
    const n2 = this.stripes[1].getNormal();
    this.angle = -n2.angleTo(n1);
    this.updateWireframe();
  }

  updateWireframe() {
    if (this.showWireframe) {
      this.mesh.remove(this.wireframe);
      this.bufferGeometryWireframe.attributes.position.array.set(
        this.bufferGeometry.attributes.position.array
      );
      this.bufferGeometryWireframe.attributes.position.needsUpdate = true;
      this.geo = new THREE.WireframeGeometry(this.bufferGeometryWireframe); // or WireframeGeometry( geometry )
      this.mat = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 4,
        depthWrite: true
      });
      this.wireframe = new THREE.LineSegments(this.geo, this.mat);
      this.mesh.add(this.wireframe);
    }
  }

  update(delta) {
    if (this.state == "Flattening") {
      const result = this.flattenAnimated(delta);

      if (result) {
        this.state = "Flattened";
      }
    } else if (this.state == "Rolling") {
      const result = this.rollAnimated(delta);

      if (result) {
        this.mesh.material.uniforms.keepVertices.value = 0;
        this.state = "Rolled";
      }
    }
  }

  /*****************************
   * Methods that flatten and roll
   * the surface
   *******************************/

  flattenAnimated(t) {
    this.overallT += t;

    const quadsToRotateFloat = this.overallT * this.quadsPerSecond;
    const quadsToRotateInt = Math.floor(quadsToRotateFloat);

    if (quadsToRotateInt < 1.0) {
      return;
    }

    const excessTime = quadsToRotateInt / this.quadsPerSecond;
    this.overallT -= excessTime;

    const start = this.lastQuad;
    const end = Math.min(start + quadsToRotateInt, this.stripes.length);

    if (end > this.stripes.length) {
      return false;
    }

    this.lastQuad = end;

    for (let a = start; a < end; a++) {
      const referenceStripe = this.stripes[a];
      const idxLeft = referenceStripe.idxLeft;

      const ll = new THREE.Vector3();
      const ul = new THREE.Vector3();

      ll.fromBufferAttribute(
        referenceStripe.bufferGeometry.attributes.position,
        idxLeft[0]
      );
      ul.fromBufferAttribute(
        referenceStripe.bufferGeometry.attributes.position,
        idxLeft[idxLeft.length - 1]
      );
      const scale = ul.clone().sub(ll);
      const axis = scale.clone().normalize();
      const loc = ll.clone().addScaledVector(scale, 0.5);
      for (let i = a; i < this.stripes.length; i++) {
        const rotationStripe = this.stripes[i];
        const idxRight = rotationStripe.idxRight;
        for (let o = 0; o < idxRight.length; o++) {
          const r = new THREE.Vector3();
          r.fromBufferAttribute(
            rotationStripe.bufferGeometry.attributes.position,
            idxRight[o]
          );
          r.sub(loc)
            .applyAxisAngle(axis, this.angle)
            .add(loc);
          rotationStripe.bufferGeometry.attributes.position.setXYZ(
            idxRight[o],
            r.x,
            r.y,
            r.z
          );
        }
      }
    }

    this.bufferGeometry.attributes.position.needsUpdate = true;
    this.updateWireframe();

    if (end == this.stripes.length) {
      return true;
    } else {
      return false;
    }
  }

  rollAnimated(t) {
    this.overallTInverse += t;

    const quadsToRollFloat = this.overallTInverse * this.quadsPerSecond;
    const quadsToRotateInt = Math.floor(quadsToRollFloat);

    if (quadsToRotateInt < 1.0) {
      return false;
    }

    const excessTime = quadsToRotateInt / this.quadsPerSecond;
    this.overallTInverse -= excessTime;

    const numQuads = quadsToRotateInt;

    const start = this.lastQuadInverse;
    const end = Math.max(start - numQuads, 0);

    if (end < 0) {
      return false;
    }

    this.lastQuadInverse = end;

    for (let a = start; a > end; a--) {
      const referenceStripe = this.stripes[a];
      const idxLeft = referenceStripe.idxLeft;

      const ll = new THREE.Vector3();
      const ul = new THREE.Vector3();

      ll.fromBufferAttribute(
        referenceStripe.bufferGeometry.attributes.position,
        idxLeft[0]
      );
      ul.fromBufferAttribute(
        referenceStripe.bufferGeometry.attributes.position,
        idxLeft[idxLeft.length - 1]
      );
      const scale = ul.clone().sub(ll);
      const axis = scale.clone().normalize();
      const loc = ll.clone().addScaledVector(scale, 0.5);
      for (let i = a; i < this.stripes.length; i++) {
        const rotationStripe = this.stripes[i];
        const idxRight = rotationStripe.idxRight;
        for (let o = 0; o < idxRight.length; o++) {
          const r = new THREE.Vector3();
          r.fromBufferAttribute(
            rotationStripe.bufferGeometry.attributes.position,
            idxRight[o]
          );
          r.sub(loc)
            .applyAxisAngle(axis, -this.angle)
            .add(loc);
          rotationStripe.bufferGeometry.attributes.position.setXYZ(
            idxRight[o],
            r.x,
            r.y,
            r.z
          );
        }
      }
    }

    this.bufferGeometry.attributes.position.needsUpdate = true;
    this.updateWireframe();

    if (end == 0) {
      return true;
    } else {
      return false;
    }
  }

  flatten() {
    this.lastQuad = 1;
    this.overallT = 0;
    this.remainingQuadsFloat = 0;

    // freeze vertex positions
    const vertAttributes = this.bufferGeometry.attributes;
    vertAttributes.positionRolled.array.set(vertAttributes.position.array);
    vertAttributes.positionRolled.needsUpdate = true;

    this.mesh.material.uniforms.keepVertices.value = 1;

    this.state = "Flattening";
  }

  roll() {
    this.state = "Rolling";
    this.lastQuadInverse = this.stripes.length - 1;
    this.overallTInverse = 0;
    this.remainingQuadsFloatInverse = 0;
  }

  /**********************************
   * Methods that toggle the different
   * texture layers on the globe: grid,
   * countries and tissot indicators
   **********************************/

  toggleCountriesTexture(status) {
    this.mesh.material.uniforms.tCountries.value = status
      ? this.earth.countriesTexture
      : this.earth.emptyTexture;
  }

  toggleGridTexture(status) {
    this.mesh.material.uniforms.tGrid.value = status
      ? this.earth.gridTexture
      : this.earth.emptyTexture;
  }

  toggleTissotTexture(status) {
    this.mesh.material.uniforms.tTissot.value = status
      ? this.earth.tissotTexture
      : this.earth.emptyTexture;
  }

  /**********************************
   * Methods that set the geometry
   * properties of the surface: axis
   * length, top radius, bottom radius,
   * offset and orientation
   **********************************/

  setAxisLength(length) {
    for (let i = 0; i < this.stripes.length; i++) {
      const stripe = this.stripes[i];
      const idxLeft = stripe.idxLeft;

      for (let a = 0; a < idxLeft.length; a++) {
        const newY = length * (a / (idxLeft.length - 1) - 0.5);
        stripe.bufferGeometry.attributes.position.setY(idxLeft[a], newY);
      }

      if (i == this.stripes.length - 1) {
        const idxRight = stripe.idxRight;
        for (let a = 0; a < idxRight.length; a++) {
          const newY = length * (a / (idxRight.length - 1) - 0.5);
          stripe.bufferGeometry.attributes.position.setY(idxRight[a], newY);
        }
      }
    }

    this.bufferGeometry.attributes.position.needsUpdate = true;

    this.updateGeometry();
  }

  setTopRadius(radius) {
    this.topRadius = parseFloat(radius);
    this.computeRadii();
  }

  setBottomRadius(radius) {
    this.bottomRadius = parseFloat(radius);
    this.computeRadii();
  }

  computeRadii() {
    const diff = this.topRadius - this.bottomRadius;
    for (let i = 0; i < this.stripes.length; i++) {
      const stripe = this.stripes[i];
      const idxLeft = stripe.idxLeft;

      for (let a = 0; a < idxLeft.length; a++) {
        const multiplier = a / (idxLeft.length - 1);
        const radius = this.bottomRadius + diff * multiplier;
        const leftVec = new THREE.Vector3();
        leftVec.fromBufferAttribute(
          stripe.bufferGeometry.attributes.position,
          idxLeft[a]
        );
        leftVec.y = 0;
        leftVec.normalize().multiplyScalar(radius);

        stripe.bufferGeometry.attributes.position.setX(idxLeft[a], leftVec.x);
        stripe.bufferGeometry.attributes.position.setZ(idxLeft[a], leftVec.z);
      }

      if (i == this.stripes.length - 1) {
        const idxRight = stripe.idxRight;
        for (let a = 0; a < idxRight.length; a++) {
          const multiplier = a / (idxRight.length - 1);
          const radius = this.bottomRadius + diff * multiplier;
          const rightVec = new THREE.Vector3();
          rightVec.fromBufferAttribute(
            stripe.bufferGeometry.attributes.position,
            idxRight[a]
          );
          rightVec.y = 0;
          rightVec.normalize().multiplyScalar(radius);

          stripe.bufferGeometry.attributes.position.setX(
            idxRight[a],
            rightVec.x
          );
          stripe.bufferGeometry.attributes.position.setZ(
            idxRight[a],
            rightVec.z
          );
        }
      }
    }

    this.bufferGeometry.attributes.position.needsUpdate = true;

    this.updateGeometry();
  }

  setGeometryOffset(offset) {
    this.mesh.position.y = offset;
  }

  setOrientation(lat, lon, rot) {
    this.earthCenter.rotation.z = lat;
    this.earthCenter.rotation.y = lon;
    this.mesh.rotation.y = rot;
  }

  setProjectionTorusParams(scale, transformMatrix) {
    this.mesh.material.uniforms.projTorusScale.value = scale;
    this.mesh.material.uniforms.projTorusMatrix.value = transformMatrix;
  }
}

export default Surface;
