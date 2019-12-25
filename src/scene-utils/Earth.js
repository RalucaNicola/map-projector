import * as THREE from "three";

const countriesSrc = "./img/textures/Countries.png";
const tissotSrc = "./img/textures/Tissot.png";
const graticuleSrc = "./img/textures/Graticule.png";
const emptySrc = "./img/textures/Empty.png";

const vertexShaderEarth = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShaderEarth = `
  uniform sampler2D tCountries;
  uniform sampler2D tGraticule;
  uniform sampler2D tTissot;

  varying vec2 vUv;
  void main() {
    vec4 color;
    vec4 CCountries = texture2D(tCountries, vUv);
    vec4 CGraticule = texture2D(tGraticule, vUv);
    vec4 CTissot = texture2D(tTissot, vUv);

    color = CCountries;
    color = vec4(color.rgb * color.a * (1.0 - CGraticule.a) + CGraticule.a * CGraticule.rgb, 1.0);
    color = vec4(color.rgb * color.a * (1.0 - CTissot.a) + CTissot.a * CTissot.rgb, 1.0);

    gl_FragColor = vec4(color.rgb, 0.75);
  }
`;

class Earth {
  constructor(scene) {
    this.countriesTexture = this.setTexture(countriesSrc);
    this.tissotTexture = this.setTexture(tissotSrc);
    this.graticuleTexture = this.setTexture(graticuleSrc);
    this.emptyTexture = this.setTexture(emptySrc);

    const uniforms = {
      tCountries: { type: "t", value: this.countriesTexture },
      tGraticule: { type: "t", value: this.graticuleTexture },
      tTissot: { type: "t", value: this.tissotTexture }
    };

    const blendMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShaderEarth,
      fragmentShader: fragmentShaderEarth,
      side: THREE.DoubleSide,
      transparent: true
    });

    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 128, 128),
      blendMaterial
    );

    scene.add(earthMesh);
  }

  setTexture(src) {
    let texture = new THREE.TextureLoader().load(src);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    // anisotropy reduces blurring at glancing angles
    // 16 is maximum, if the graphics card doesn't support it
    // ThreeJS automatically downgrades it
    texture.anisotropy = 16;
    return texture;
  }

  enableCountriesTexture() {
    this.earthMesh.material.uniforms.tCountries.value = this.countriesTexture;
  }

  disableCountriesTexture() {
    this.earthMesh.material.uniforms.tCountries.value = this.emptyTexture;
  }

  enableGraticuleTexture() {
    this.earthMesh.material.uniforms.tGraticule.value = this.graticuleTexture;
  }

  disableGraticuleTexture() {
    this.earthMesh.material.uniforms.tGraticule.value = this.emptyTexture;
  }

  enableTissotTexture() {
    this.earthMesh.material.uniforms.tTissot.value = this.tissotTexture;
  }

  disableTissotTexture() {
    this.earthMesh.material.uniforms.tTissot.value = this.emptyTexture;
  }
}

export default Earth;
