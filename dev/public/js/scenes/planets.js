/* @flow */
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

const sunParams = {
  'radius': 30,
  'line': 32,
  'width': 32,
  'texture': '/img/sun/sunmap.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const isSun = {
  'isSun': true,
  'lightPower': 1000,
  'lightIntensity': 100000
}

const notSun = {
  'isSun': false
}

