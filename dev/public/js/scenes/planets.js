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
  'lightIntensity': 2000
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
  'texture': '/img/earth/2k_earth_daymap.jpg',
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

const orbitColors = {
  'mercury': 0x5D4037,
  'venus': 0x7B1FA2,
  'earth': 0x1976D2,
  'mars': 0xD32F2F,
  'jupiter': 0xFF5722,
  'saturn': 0xFBC02D,
  'uranus': 0x3F51B5,
  'neptune': 0x607D8B,
  'pluto': 0x9E9E9E
}

const planets = [
  ['sun', sunParams, 0.0007, isSun, 0, 0],
  ['mercury', mercuryParams, 0.0005, notSun, 200, 0.00005],
  ['venus', venusParams, 0.0005, notSun, 400, 0.00004],
  ['earth', earthParams, 0.0005, notSun, 500, 0.00003],
  //['earthClouds', earthCloudsParams, 0.0007, notSun, 300, 0.001]
  ['mars', marsParams, 0.0005, notSun, 600, 0.00002],
  ['jupiter', jupiterParams, 0.0005, notSun, 800, 0.000008],
  ['saturn', saturnParams, 0.0005, notSun, 900, 0.000005],
  ['uranus', uranusParams, 0.0005, notSun, 1000, 0.000004],
  ['neptune', neptuneParams, 0.0005, notSun, 1100, 0.000002],
  ['pluto', plutoParams, 0.0005, notSun, 1300, 0.000001],
]

