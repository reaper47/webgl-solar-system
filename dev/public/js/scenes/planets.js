/* @flow */
const sunParams = {
  'radius': 100,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/sunmap.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const isSun = {
  'isSun': true,
  'lightPower': 35,
  'lightIntensity': 1000
}

const notSun = {
  'isSun': false
}

const mercuryParams = {
  'radius': 10,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/mercury.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const venusParams = {
  'radius': 12.5,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/venus_surface.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const earthParams = {
  'radius': 15,
  'line': 32,
  'width': 32,
  'texture': '/img/earth/earthmap.jpg',
  'normal': '/img/earth/earth_normalmap_flat2k.jpg',
  'specular': '/img/earth/spec_map.png',
  'normalScale': [2, 2],
  'specularColor': 0x262626
}

const earthCloudsParams = {
  'radius': 15.1,
  'line': 32,
  'width': 32,
  'texture': '/img/earth/clouds_1k.png',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const marsParams = {
  'radius': 14,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/mars.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const jupiterParams = {
  'radius': 30,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_jupiter.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const saturnParams = {
  'radius': 25,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_saturn.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const uranusParams = {
  'radius': 20,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_uranus.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const neptuneParams = {
  'radius': 18,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_neptune.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const plutoParams = {
  'radius': 7,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_ceres_fictional.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const planets = [
  ['sun', sunParams, 0.0007, isSun, 0, 0],
  ['mercury', mercuryParams, 0.0005, notSun, 200, 0.003],
  ['venus', venusParams, 0.0005, notSun, 400, 0.002],
  ['earth', earthParams, 0.0005, notSun, 500, 0.001],
  //['earthClouds', earthCloudsParams, 0.0007, notSun, 300, 0.001]
  ['mars', marsParams, 0.0005, notSun, 600, 0.004],
  ['jupiter', jupiterParams, 0.0005, notSun, 800, 0.006],
  ['saturn', saturnParams, 0.0005, notSun, 900, 0.007],
  ['uranus', uranusParams, 0.0005, notSun, 1000, 0.009],
  ['neptune', neptuneParams, 0.0005, notSun, 1100, 0.0025],
  ['pluto', plutoParams, 0.0005, notSun, 1200, 0.0005],
]

5.8911432148577685
y
:
13.685190197757628
z
:
-20.07510898782953

