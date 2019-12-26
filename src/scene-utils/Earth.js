import * as THREE from "three";

const countriesSrc = "./img/textures/Countries.png";
const tissotSrc = "./img/textures/Tissot.png";
const gridSrc = "./img/textures/Graticule.png";
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
  uniform sampler2D tGrid;
  uniform sampler2D tTissot;

  varying vec2 vUv;
  void main() {
    vec4 color;
    vec4 CCountries = texture2D(tCountries, vUv);
    vec4 CGrid = texture2D(tGrid, vUv);
    vec4 CTissot = texture2D(tTissot, vUv);

    color = CCountries;
    color = vec4(color.rgb * color.a * (1.0 - CGrid.a) + CGrid.a * CGrid.rgb, 1.0);
    color = vec4(color.rgb * color.a * (1.0 - CTissot.a) + CTissot.a * CTissot.rgb, 1.0);

    gl_FragColor = vec4(color.rgb, 0.75);
  }
`;

class Earth {
  constructor(scene) {
    this.countriesTexture = this.setTexture(countriesSrc);
    this.tissotTexture = this.setTexture(tissotSrc);
    this.gridTexture = this.setTexture(gridSrc);
    this.emptyTexture = this.setTexture(emptySrc);

    const uniforms = {
      tCountries: { type: "t", value: this.countriesTexture },
      tGrid: { type: "t", value: this.gridTexture },
      tTissot: { type: "t", value: this.tissotTexture }
    };

    const blendMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShaderEarth,
      fragmentShader: fragmentShaderEarth,
      side: THREE.DoubleSide,
      transparent: true
    });

    this.earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 128, 128),
      blendMaterial
    );

    scene.add(this.earthMesh);
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

  toggleCountriesTexture(status) {
    this.earthMesh.material.uniforms.tCountries.value = status
      ? this.countriesTexture
      : this.emptyTexture;
  }

  toggleGridTexture(status) {
    this.earthMesh.material.uniforms.tGrid.value = status
      ? this.gridTexture
      : this.emptyTexture;
  }

  toggleTissotTexture(status) {
    this.earthMesh.material.uniforms.tTissot.value = status
      ? this.tissotTexture
      : this.emptyTexture;
  }
}

export default Earth;
