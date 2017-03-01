/* @flow */
const sizeEarth = 15
let planetsScene = []
let orbitsScene = []

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

const moonParams = {
  'radius': sizeEarth / 4,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/moon.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
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
  'radius': sizeEarth*3,
  'line': 32,
  'width': 32,
  'texture': '/img/texture_maps/2k_ceres_fictional.jpg',
  'normal': '',
  'specular': '',
  'normalScale': 0,
  'specularColor': 0
}

const orbitColors = {
  'solis': 0xFFEB3B,
  'mercurius': 0x5D4037,
  'venus': 0x7B1FA2,
  'tellus': 0x1976D2,
  'mars': 0xD32F2F,
  'iuppiter': 0xFF5722,
  'saturnus': 0xFBC02D,
  'uranus': 0x3F51B5,
  'neptunus': 0x607D8B,
  'pluto': 0x9E9E9E,
  'moon-tellus': 0xCFD8DC
}

const moonOrbit = {
  'radius': 25,
  'theta': 0,
  'dTheta': 2 * Math.PI / 1000 
}

const radiusOffset = 215
const earthRotSpeed = 0.001674

const planets = [
  ['solis', sunParams, earthRotSpeed, isSun, 0, 0],
  ['mercurius', mercuryParams, earthRotSpeed , notSun, 57 + radiusOffset, 0.00005],
  ['venus', venusParams, earthRotSpeed / 4, notSun, 108 + radiusOffset, 0.00004],
  ['tellus', earthParams, earthRotSpeed, notSun, 150 + radiusOffset, 0.00003],
  ['mars', marsParams, earthRotSpeed / 2, notSun, 228 + radiusOffset, 0.00002],
  ['iuppiter', jupiterParams, earthRotSpeed * 10, notSun, 588 + radiusOffset, 0.000008],
  ['saturnus', saturnParams, earthRotSpeed * 7, notSun, 1430 + radiusOffset, 0.000005],
  ['uranus', uranusParams, earthRotSpeed * 5, notSun, 2570 + radiusOffset, 0.000004],
  ['neptunus', neptuneParams, earthRotSpeed * 4, notSun, 4500 + radiusOffset, 0.000002],
  ['pluto', plutoParams, earthRotSpeed / 3, notSun, 5910 + radiusOffset, 0.000001],
  ['clouds-tellus', earthCloudsParams, earthRotSpeed + 0.0001, notSun, 0, 0.001],
  ['moon-tellus', moonParams, earthRotSpeed, notSun, radiusOffset, 0.00003, moonOrbit]
]

const planetDescriptors = {
  'solis': {
    'name': 'Burning',
    'alive': ['Blazing for ', '4.57', ' billion years'],
    'dist': ['Stuck at the center of the ', 'heavens', ''],
    'day': ['Observing every of its children every ', '25.38', ' days'],
    'year': ['Watching them go ', 'round', ''],
    'volume': ['Eating',  '1,300,000', ' Earths'],
    'gravity': ['Attracting you ', '27.94g', 'times more'],
    'density': ['Only ', '1.408', ' times denser than water'],
  },
  'mercurius': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '0.387 098 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 59 days'],
    'year': ['Merry-go-round every ', '88', ' days'],
    'volume': ['0.3829 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '2.63g', ' times less weights than Earth'],
    'density': ['5.427 g/cm3'],
  },
  'venus': { /***** HERE *****/
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '0.728 213 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 243 days'],
    'year': ['Merry-go-round every ', '224.7', ' days'],
    'volume': ['1.15 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '0.904g', ' times less weights than Earth'],
    'density': ['5.243 g/cm3'],
  },
  'clouds-tellus': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.54', ' billion years'],
    'dist': ['Resting ', '1.000 001 018 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 24h'],
    'year': ['Merry-go-round every ', '365', ' days'],
    'volume': ['1.08321×10 12 km31, times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '1.00g', ' times less weights than Earth'],
    'density': ['5.514 g/cm3'],
  },
  'mars': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '1.523679 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 24.65h'],
    'year': ['Merry-go-round every ', '686.971', ' days'],
    'volume': ['0.151 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '0.376g', ' times less weights than Earth'],
    'density': ['5.514 g/cm3'],
  },
  'iuppiter': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '5.20260 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 9.83h'],
    'year': ['Merry-go-round every ', '4,332.59', ' days'],
    'volume': ['1,321 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '2.528g', ' times less weights than Earth'],
    'density': ['1.326 g/cm3'],
  },
  'saturnus': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '9.5549 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 10.25h'],
    'year': ['Merry-go-round every ', '10,759.22', ' days'],
    'volume': ['14.5 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '1.065g', ' times less weights than Earth'],
    'density': ['0.687 g/cm3'],
  },
  'uranus': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '19.2184 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 17.25h'],
    'year': ['Merry-go-round every ', '30,688.5', ' days'],
    'volume': ['14.5 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '0.886g', ' times less weights than Earth'],
    'density': ['1.27 g/cm3'],
  },
  'neptunus': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '30.110387 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 18h'],
    'year': ['Merry-go-round every ', '60,182', ' days'],
    'volume': ['3.883 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '1.14 g', ' times less weights than Earth'],
    'density': ['1.638 g/cm3'],
  },
  'pluto': {
    'name': 'Inflexible',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '49.305 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 6.39d'],
    'year': ['Merry-go-round every ', '90,560', ' days'],
    'volume': ['0.1863 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '0.063g', ' times less weights than Earth'],
    'density': ['1.860 g/cm3'],
  },
  'moon-tellus': {
    'name': 'Exhuberant',
    'alive': ['Feverish for ', '4.51', ' billion years'],
    'dist': ['Resting ', '384399 km 1.28 light-seconds', ' et a sole'],
    'day': ['Winning a ', 'revolution', 'every 29.5d'],
    'year': ['Merry-go-round every ', 'no year', ' days'],
    'volume': ['0.273 times more ', 'humble', ' than Earth'],
    'gravity': ['Lifting ', '1.62g', ' times less weights than Earth'],
    'density': ['3.344 g/cm3'],
  }
}

