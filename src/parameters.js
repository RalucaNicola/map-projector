const initialParameters = {
  surface: {
    axisLength: 0.01,
    topRadius: 0.01,
    bottomRadius: 4,
    offset: 1,
    latitude: 90,
    longitude: 0
  },
  projectionCenter: {
    scale: 0.01,
    latitude: 0,
    longitude: 90,
    offset: 0
  }
};

const planeSurfaceParameters = {
  axisLength: 0,
  topRadius: 0.01,
  bottomRadius: 4,
  offset: 1
};

const cylinderSurfaceParameters = {
  axisLength: 3.4,
  topRadius: 1,
  bottomRadius: 1,
  offset: 0
};

const coneSurfaceParameters = {
  axisLength: 4,
  topRadius: 0.01,
  bottomRadius: 4,
  offset: 1
};

const frustumSurfaceParameters = {
  axisLength: 4,
  topRadius: 0.5,
  bottomRadius: 2,
  offset: 0
};

export {
  initialParameters,
  cylinderSurfaceParameters,
  planeSurfaceParameters,
  coneSurfaceParameters,
  frustumSurfaceParameters
};
