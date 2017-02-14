/* @flow */
let scene
let camera
let renderer
let cameraControl

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
    0.01,
    50000
  )
  camera.position.set(-701, 547, -1034)
  camera.lookAt(scene.position)
  cameraControl = new THREE.TrackballControls(camera)

  cameraControl.minDistance = 25
  cameraControl.maxDistance = 3100

  cameraControl.rotateSpeed = 1.5
  cameraControl.zoomSpeed = 1.5
  cameraControl.panSpeed = 0.8

  cameraControl.noZoom = false
  cameraControl.noPan = true

  cameraControl.staticMoving = false
  cameraControl.dynamicDampingFactor = 0.1

  cameraControl.keys = [65, 83, 68]
  cameraControl.addEventListener('change', render)
}

function createLight () {  
  
  let texture : Object = new THREE.Texture()
  
  let loader : Object = new THREE.ImageLoader()
  loader.load('/img/sun/sunmap.jpg', (img) => {
    texture.image = img
    texture.needsUpdate = true
  })
  
	let geometry = new THREE.SphereGeometry(30, 32, 32)
	let material = new THREE.MeshBasicMaterial({
	  map: texture,
	  side: THREE.DoubleSide
	})
	let sun = new THREE.Mesh(geometry, material)

  let sunlight = new THREE.PointLight(0xffffff, 1, 10000 )
  sunlight.position.set(0, 0, 0)
	sunlight.add(sun)
	scene.add(sunlight)
	scene.add(sun)
 
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
  requestAnimationFrame(animate)
  cameraControl.update()
  render()
}

function init () {
  scene = new THREE.Scene()

  createRenderer()
  createCamera()
  //createLight()

  let earth = new ProtoPlanet('earth', earthParams, scene, 0.0005, false)
  earthParams['obj'] = earth
  earth.createPlanet()

  let earthClouds = new ProtoPlanet('earthClouds', earthCloudsParams, scene, 0.0007, true)
  earthCloudsParams['obj'] = earthClouds
  earthClouds.createPlanet()

  createStarfield()

  let sun = new ProtoPlanet('sun', sunParams, scene, 0.0007, true)
  sunParams['obj'] = sun
  sun.createPlanet(true)

  window.addEventListener('resize', onWindowResize, false)
  document.body.appendChild(renderer.domElement)

  animate()
  render()
}

function render () {
  sunParams['obj'].movePlanet('y', 0, 0)
  earthParams['obj'].movePlanet('y', 100, 0.001)
  earthCloudsParams['obj'].movePlanet('y', 100, 0.001)
  renderer.render(scene, camera)
}

init()

