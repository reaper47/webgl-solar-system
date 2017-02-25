/* @flow */
const sizeEarth = 15

const sunParams = {
  'radius': 200,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/texture_sun.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const isSun = {
  'isSun': true,
  'lightPower': 15,
  'lightIntensity': 2000 * 200
}

const notSun = {
  'isSun': false
}

const mercuryParams = {
  'radius': sizeEarth * 0.38,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/mercury.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const venusParams = {
  'radius': sizeEarth * 0.95,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/venus_surface.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const earthParams = {
  'radius': sizeEarth,
  'line': 32,
  'width': 32,
  'texture': '/img/earth/earthmap.jpg',
  'normal': '/img/earth/earth_normalmap_flat2k.jpg',
  'specular': '/img/earth/spec_map.png',
  'normalScale': [2, 2],
  'specularColor': 0x262626
}

const earthCloudsParams = {
  'radius': sizeEarth + 0.1,
  'line': 32,
  'width': 32,
  'texture': '/img/earth/clouds_1k.png',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const marsParams = {
  'radius': sizeEarth * 0.53,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/mars.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const jupiterParams = {
  'radius': sizeEarth * 5,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_jupiter.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const saturnParams = {
  'radius': sizeEarth * 3.5,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_saturn.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const uranusParams = {
  'radius': sizeEarth * 2.2,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_uranus.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const neptuneParams = {
  'radius': sizeEarth * 2,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_neptune.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const plutoParams = {
  'radius': sizeEarth,
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

const radiusOffset = 200

const planets = [
  ['sun', sunParams, 0.0007, isSun, 0, 0],
  ['mercury', mercuryParams, 0.0005, notSun, 57 + radiusOffset, 0.00005],
  ['venus', venusParams, 0.0005, notSun, 108 + radiusOffset, 0.00004],
  ['earth', earthParams, 0.0005, notSun, 150 + radiusOffset, 0.00003],
  // ['earthClouds', earthCloudsParams, 0.0007, notSun, 300, 0.001]
  ['mars', marsParams, 0.0005, notSun, 228 + radiusOffset, 0.00002],
  ['jupiter', jupiterParams, 0.0005, notSun, 588 + radiusOffset, 0.000008],
  ['saturn', saturnParams, 0.0005, notSun, 1430 + radiusOffset, 0.000005],
  ['uranus', uranusParams, 0.0005, notSun, 2570 + radiusOffset, 0.000004],
  ['neptune', neptuneParams, 0.0005, notSun, 4500 + radiusOffset, 0.000002],
  ['pluto', plutoParams, 0.0005, notSun, 5910 + radiusOffset, 0.000001]
]

