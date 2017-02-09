/* @flow */
const THREE = require('../libs/three.min.js')

let scene
let camera
let renderer
let cameraControl

const FRUSTUM_FAR = 50000
const FRUSTUM_NEAR = 0.01

function createRenderer () {
  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0x000000, 1.0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
}

function createCamera () {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    FRUSTUM_NEAR,
    FRUSTUM_FAR
  )
  camera.position.x = 90
  camera.position.y = 32
  camera.position.z = 32
  camera.lookAt(scene.position)
  cameraControl = new THREE.TrackballControls(camera)

  cameraControl.rotateSpeed = 1.5
  cameraControl.zoomSpeed = 1.5
  cameraControl.panSpeed = 0.8

  cameraControl.noZoom = false
  cameraControl.noPan = false
  cameraControl.staticMoving = false
  cameraControl.dynamicDampingFactor = 0.1

  cameraControl.keys = [65, 83, 68]
  cameraControl.addEventListener('change', render)
}

function createLight () {
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(100, 10, -50)
  directionalLight.name = 'directional'
  scene.add(directionalLight)

  let ambientLight = new THREE.AmbientLight(0x111111)
  scene.add(ambientLight)
}

function createEarthMaterial () {
  let earthTexture = new THREE.Texture()
  let loader1 = new THREE.ImageLoader()
  loader1.load('/img/earth/earthmap.jpg', (image) => {
    earthTexture.image = image
    earthTexture.needsUpdate = true
  })

  let normalTexture = new THREE.Texture()
  let loader2 = new THREE.ImageLoader()
  loader2.load('/img/earth/earth_normalmap_flat2k.jpg', (image) => {
    normalTexture.image = image
    normalTexture.needsUpdate = true
  })

  let specularTexture = new THREE.Texture()
  let loader3 = new THREE.ImageLoader()
  loader3.load('/img/earth/spec_map.png', (image) => {
    specularTexture.image = image
    specularTexture.needsUpdate = true
  })

  let earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(2, 2),
    specularMap: specularTexture,
    specular: new THREE.Color(0x262626)
  })

  return earthMaterial
}

function createEarth () {
  let sphereGeometry = new THREE.SphereGeometry(15, 32, 32)
  let sphereMaterial = createEarthMaterial()
  let earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)

  earthMesh.name = 'earth'
  scene.add(earthMesh)
}

// Transparent clouds:
// https://graphicdesign.stackexchange.com/questions/2549/photoshop-cs5-setting-a-black-background-to-transparent
function createClouds () {
  let sphereGeometry = new THREE.SphereGeometry(15.1, 32, 32)
  let cloudsTexture = new THREE.Texture()
  let loader = new THREE.ImageLoader()
  loader.load('/img/earth/clouds_1k.png', (image) => {
    cloudsTexture.image = image
    cloudsTexture.needsUpdate = true
  })

  let cloudsMaterial = new THREE.MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true
  })

  let cloudMesh = new THREE.Mesh(sphereGeometry, cloudsMaterial)
  cloudMesh.name = 'clouds'

  scene.add(cloudMesh)
}

function createStarfield () {
  let sphereGeometry = new THREE.SphereGeometry(2048, 32, 32)

  let envTexture = new THREE.Texture()
  let loader = new THREE.ImageLoader()
  loader.load('/img/starfields/milky_way.jpg', (image) => {
    envTexture.image = image
    envTexture.needsUpdate = true
  })

  let envMaterial = new THREE.MeshBasicMaterial()
  envMaterial.map = envTexture
  envMaterial.side = THREE.BackSide

  let mesh = new THREE.Mesh(sphereGeometry, envMaterial)
  scene.add(mesh)
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  cameraControl.handleResize()
  render()
}

function animate () {
  window.requestAnimationFrame(animate)
  cameraControl.update()
  render()
}

function init () {
  scene = new THREE.Scene()

  createRenderer()
  createCamera()
  createLight()
  createEarth()
  createClouds()
  createStarfield()

  window.addEventListener('resize', onWindowResize, false)
  document.body.appendChild(renderer.domElement)

  animate()
  render()
}

function render () {
  scene.getObjectByName('earth').rotation.y += 0.0005
  scene.getObjectByName('clouds').rotation.y += 0.0007
  renderer.render(scene, camera)
}

init()
