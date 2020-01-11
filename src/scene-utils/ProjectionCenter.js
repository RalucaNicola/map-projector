import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  TorusGeometry,
  Object3D
} from "three";

class ProjectionCenter {
  constructor(scene) {
    this.scene = scene;
    this.sphere = new Mesh(
      new SphereGeometry(0.1, 32, 32),
      new MeshBasicMaterial({ color: 0xffff00 })
    );

    this.earthCenter = new Object3D();
    this.lightAnchor = new Object3D();
    this.lightCenter = new Object3D();

    this.earthCenter.add(this.lightAnchor);
    this.lightAnchor.add(this.lightCenter);

    this.reconstructTorus(0.01);
    this.scene.add(this.earthCenter);
  }

  reconstructTorus(scale) {
    this.scale = parseFloat(scale);
    const lcc = this.lightCenter.children;

    for (let i = 0; i < lcc.length; i++) {
      this.lightCenter.remove(lcc[i]);
    }
    this.torus = new Mesh(
      new TorusGeometry(this.scale, 0.1, 16, 32),
      new MeshBasicMaterial({
        color: 0xffff00,
        transparent: false,
        opacity: 1.0
      })
    );

    this.torus.rotation.x = Math.PI / 2.0;
    this.lightCenter.add(this.torus);
  }

  setOrientation(lat, lon, rot) {
    this.earthCenter.rotation.z = lat;
    this.earthCenter.rotation.y = lon;
    this.lightCenter.rotation.y = rot;
  }

  setOffset(offset) {
    this.lightCenter.position.y = offset;
  }

  setLatitude(rotation) {
    this.lightAnchor.rotation.z = rotation;
  }

  setLongitude(rotation) {
    this.lightAnchor.rotation.y = rotation;
  }
}

export default ProjectionCenter;
