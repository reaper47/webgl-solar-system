/* @flow */
let scene
let camera
let renderer
let cameraControl
let mouse
let raycaster
let intersected

init()

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
    1,
    100000
  )
  camera.position.set(-701, 547, -1034)
  camera.lookAt(scene.position)
  cameraControl = new THREE.TrackballControls(camera)

  // to have the perspective from the sun, cameraControl.minDistance = Infinity
  cameraControl.minDistance = 25
  cameraControl.maxDistance = 46000

  cameraControl.rotateSpeed = 1.5
  cameraControl.zoomSpeed = 1.5
  cameraControl.panSpeed = 0.8

  cameraControl.noZoom = false
  cameraControl.noPan = false

  cameraControl.staticMoving = false
  cameraControl.dynamicDampingFactor = 0.1
}

function createStarfield () {
  let sphereGeometry = new THREE.SphereGeometry(32768, 32, 32)

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
  
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2(window.innerWidth * 2 - 1, window.innerHeight * 2 - 1)
  raycaster.setFromCamera(mouse, camera)

  for (let i = 0, n = planets.length; i < n; i++) {
    const orbitParams = {
      radius: planets[i][4],
      segments: 128,
      color: orbitColors[planets[i][0]],
      speed: planets[i][5]
    }

    let planet = new ProtoPlanet(
      planets[i][0], // name
      planets[i][1], // sphereParams
      scene,         // scene
      planets[i][2], // rotationSpeed
      planets[i][0].startsWith('clouds') ? true : false,         // transparent
      orbitParams
    )

    planets[i][1]['obj'] = planet
    if (planet.name.startsWith('moon')) {
      planet.createPlanet(planets[i][3], {x: planets[i][4], z: planets[i][4]}, planets[i][6])
    } else if (planet.name.startsWith('rings')) {
      planet.createSaturnRings(planets[i][3], {x: planets[i][4], z: planets[i][4]})
    } else {
      planet.createPlanet(planets[i][3], {x: planets[i][4], z: planets[i][4]})
    }

  }

  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('mousemove', onDocumentMouseMove, false)
  
  document.body.appendChild(renderer.domElement)
  animate()
  render()
}

function render () {
  for (let i = 0, n = planets.length; i < n; i++) {
    const planet = planets[i][1]['obj']
  
    if (planet.name === 'sun') {
      scene.getObjectByName('sun').rotateY(planet.rotationSpeed)
    } else if (planet.name.startsWith('moon')) {
      planet.moveMoon()
    } else {
      planet.movePlanet('y', planets[i][5])
    }
  }
  renderer.render(scene, camera)
  
  let intersections = raycaster.intersectObjects(planetsScene)
  if (intersections.length > 0) {
  
    if (intersected !== intersections[0].object) {
    
      if (intersected) {
        intersected.material.color.setHex(0xffffff)
      }
      
      intersected = intersections[0].object
      intersected.material.color.setHex(0xff0000)
      displayInfo(intersected)
    }
    
  } else if (intersected) {
    intersected.material.color.setHex(0xffffff)
    intersected = null
  }
  
}

function displayInfo(object) {
  let name = object.name
  let nameColor = orbitColors[name]
  
  if (name.startsWith('clouds')) {
    name = name.split('-')[1]
    nameColor = orbitColors[name]
  } else if (name.startsWith('moon')) {
    if (name.split('-')[1] === 'earth') {
      name = 'The Moon'
    } else {
      name = name.split('-')[1]
    }
  }
  name = String.fromCharCode(name[0].charCodeAt() & 0xdf).concat(name.slice(1))

  let planetDiv = [...document.getElementById('planet-info').childNodes]
  planetDiv[1].innerHTML = name
  planetDiv[1].style.color = `#${nameColor.toString(16)}`
  
}

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  cameraControl.handleResize()
  render()
}

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera)
}

