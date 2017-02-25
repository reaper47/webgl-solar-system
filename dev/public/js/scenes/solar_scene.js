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
  cameraControl.maxDistance = 3000

  cameraControl.rotateSpeed = 1.5
  cameraControl.zoomSpeed = 1.5
  cameraControl.panSpeed = 0.8

  cameraControl.noZoom = false
  cameraControl.noPan = false

  cameraControl.staticMoving = false
  cameraControl.dynamicDampingFactor = 0.1

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
  createStarfield()
  
  for (let i = 0, n = planets.length; i < n; i++) {
    const orbitParams = {
      radius: planets[i][4],
      segments: 90,
      color: orbitColors[planets[i][0]],
      speed: planets[i][5]
    }
        
    let planet = new ProtoPlanet(
      planets[i][0], // name
      planets[i][1], // sphereParams
      scene,         // scene
      planets[i][2], // rotationSpeed
      false,         // transparent
      orbitParams
    ) 
                                 
    planets[i][1]['obj'] = planet
    planet.createPlanet(planets[i][3], {x: planets[i][4], z: planets[i][4]})
  }

  window.addEventListener('resize', onWindowResize, false)
  document.body.appendChild(renderer.domElement)
  animate()
  render()
}

function render () {
  for (let i = 0, n = planets.length; i < n; i++) {
    if (planets[i][1]['obj'].name !== 'sun') {
      planets[i][1]['obj'].movePlanet('y', planets[i][5]);
    } else {
      scene.getObjectByName('sun').rotateY(0.001)
    }
  }
  renderer.render(scene, camera)
}

init()

