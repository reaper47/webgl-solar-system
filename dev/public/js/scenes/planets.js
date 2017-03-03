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
  'radius': sizeEarth * 3,
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
  ['mercurius', mercuryParams, earthRotSpeed, notSun, 57 + radiusOffset, 0.00005],
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
    'volume': ['Eating', '1,300,000', ' Earths'],
    'gravity': ['Attracting you ', '27.94g', ' times more'],
    'density': ['Only ', '1.408', ' times denser than water']
  },
  'mercurius': {
    'name': 'Eloquent',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Resting ', '0.387 098 AU', ' et a sole'],
    'day': ['Winning a ', 'revolution', ' every 59 days'],
    'year': ['Merry-go-round every ', '88', ' days'],
    'volume': ['Thirty-eight times less ', 'humble', ' than Tellus'],
    'gravity': ['Lifting ', '2.63g', ' times more weights than Tellus'],
    'density': ['Composed of solid ', '5.427 g/cm3', ' rocks']
  },
  'venus': {
    'name': 'Romantic',
    'alive': ['Courting for ', '4.57', ' billion years'],
    'dist': ['Flirting ', '0.728 213 AU', ' et a sole'],
    'day': ['Twisting ', 'one turn', ' every 243 days'],
    'year': ['Completing a dance every ', '224.7', ' days'],
    'volume': ['95% as ', 'prominent', ' as Tellus'],
    'gravity': ['Enjoying ', 'a mere', ' 0.904g gravitational force'],
    'density': ['Consisting of ', '5.243 g/cm3', ' rocks']
  },
  'clouds-tellus': {
    'name': 'Grandiose',
    'alive': ['Alive for ', '4.54', ' billion years'],
    'dist': ['Relaxing at ', '1.000 001 018 AU', ' et a sole'],
    'day': ['Cycles of ', 'day and night', ' last 24h'],
    'year': ['Spanning four ', 'seasons', ' over 365 days'],
    'volume': ['Providing shelter for ', '7.4 billion', ' homo sapiens'],
    'gravity': ['Keeping everything on the ', 'ground', ' with its 1.00g'],
    'density': ['Average rock ', 'density', ' of 5.514 g/cm3']
  },
  'mars': {
    'name': 'Bloody',
    'alive': ['Battling for ', '4.57', ' billion years'],
    'dist': ['Protecting civilians ', '1.523679 AU', ' et a sole'],
    'day': ['Conquering cycles of ', 'light', ' every 24.65h'],
    'year': ['Blitzkriegs every ', '686.971', ' days'],
    'volume': ['53% less ', 'muscular', ' than Tellus'],
    'gravity': ['Titans ', 'clash with', ' 0.376g gravity'],
    'density': ['Muscles composed of ', '5.514 g/cm3', ' rocks']
  },
  'iuppiter': {
    'name': 'Flamboyant',
    'alive': ['Glamorous for ', '4.57', ' billion years'],
    'dist': ['Jazzing ', '5.20260 AU', ' et a sole'],
    'day': ['Self-indulges dizziness ', 'every', ' 9.83h'],
    'year': ['Achieves orbital victories ', 'every 4332.59', ' days'],
    'volume': ['Calorie intake is ', '1120', " times greater than Tellus'"],
    'gravity': ['Preventing inmates ', 'from escaping', ' with 2.528g gravity'],
    'density': ['Startles rivals with a ', '1.326 g/cm3', ' density']
  },
  'saturnus': {
    'name': 'Luminary',
    'alive': ['Noble for ', '4.57', ' billion years'],
    'dist': ['Repelling intruders ', '9.5549 AU', ' et a sole'],
    'day': ['On its full ', 'guard', ' every 10.25h'],
    'year': ['Provides full protection to ', 'Solis', ' 10759.22 days/orbit'],
    'volume': ['945 times more ', 'ferocious', ' than Tellus'],
    'gravity': ['Equipped with a ', 'gravity', ' of only 1.065g'],
    'density': ['', 'Floats on water', ' with a 0.687 g/cm3 density']
  },
  'uranus': {
    'name': 'Majestic',
    'alive': ['Loyal for ', '4.57', ' billion years'],
    'dist': ['Sublime beauty ', '19.2184 AU', ' et a sole'],
    'day': ['Dignifies ', 'dizziness', ' every 17.25h'],
    'year': ['Merry-go-round every ', '30,688.5', ' days'],
    'volume': ['Four times as ', 'monumental', ' as Tellus'],
    'gravity': ['Home to', '0.886g', ' gravity'],
    'density': ['Tidies ', '1.27 g/cm3', ' material']
  },
  'neptunus': {
    'name': 'Noble',
    'alive': ['Feverish for ', '4.57', ' billion years'],
    'dist': ['Chants ', '30.110387 AU', ' et a sole'],
    'day': ['Dominates a ', 'revolution', ' every 18h'],
    'year': ['Routine lasts ', '60182', ' days'],
    'volume': ['3.88 times more ', 'massive', ' than Tellus'],
    'gravity': ['Welcomes creatures at ', '1.14g', ' gravity'],
    'density': ['1.638 g/cm3']
  },
  'pluto': {
    'name': 'Eternal',
    'alive': ['Escaping realms for ', '4.57', ' billion years'],
    'dist': ['Haunted by loneliness ', '49.305 AU', ' et a sole'],
    'day': ['Spirals ', 'a full turn', ' every 6.39 days'],
    'year': ['Shadows around Solis every ', '90560', ' days'],
    'volume': ['Weaps 6 times less ', 'dreary tears', ' than Tellus'],
    'gravity': ['Provides ', 'weightless', ' experiences with 0.063g gravity'],
    'density': ['Composed of 1.860 g/cm3 rocks', 'as light as', ' a feather']
  },
  'moon-tellus': {
    'name': 'Exhuberant',
    'alive': ['War veteran for ', '4.51', ' billion years'],
    'dist': ['Entertaining organisms at ', '1.28 light-seconds', ' a patre meo'],
    'day': ['Orchestrating ', 'full moon shows', ' every 29.5d'],
    'year': ['Holder of the ', 'glorious', ' American flag'],
    'volume': ['Four times ', 'flimsier', ' than father'],
    'gravity': ['Propelling ', 'astronauts', ' with 1.62g'],
    'density': ['Herited a patre meo a ', 'rock density', ' of 3.344 g/cm3']
  }
}

