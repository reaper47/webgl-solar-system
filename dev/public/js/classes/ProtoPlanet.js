/* @flow */
class ProtoPlanet {
  name : String
  params : Object
  textures : Object
  sphereParams : Object
  scene : Object
  angle : Number
  rotationSpeed : Number
  transparent : Boolean
  orbitParams : Object
  orbitSpeed : Number
  
  constructor(name, sphereParams, scene, rotationSpeed, transparent, orbitParams) {
      this.name = name
      this.params = sphereParams
      this.textures = { 'transparent': transparent}
      this.scene = scene
      this.rotationSpeed = rotationSpeed
      this.angle = Math.random(0, Math.PI)
      this.orbitRadius = orbitParams.radius
      this.orbitSegments = orbitParams.segments
      this.orbitColor = orbitParams.color
      this.orbitSpeed = orbitParams.speed
      
      this.moonOrbitTheta = 0
      this.moonOrbitDTheta = 0
      this.moonOrbitRadius = 0
  }
   
  createTexture(texture : String, normal : String, specular : String, 
                normalScale : Array<Number>, specularColor : Number) { 
                         
    texture.length !== 0 ? (
      this.textures.map = this.loadTexture(texture)) : (
      this.textures.map = '')
    normal.length !== 0 ? (
      this.textures.normalMap = this.loadTexture(normal)) : (
      this.textures.normalMap = '')
    specular.length !== 0 ? (
      this.textures.specularMap = this.loadTexture(specular)) : (
      this.textures.specularMap = '')
    normalScale.length === 2 ? (
      this.textures.normalScale = new THREE.Vector2(normalScale[0], normalScale[1])) : (
      this.textures.normalScale = '')
    specularColor.length !== 0 ? (
      this.textures.specular = new THREE.Color(specularColor)) : (
      this.textures.specular = '')
      
  }
  
  loadTexture(path : String) : Object {
    let texture : Object = new THREE.Texture()
    let loader : Object = new THREE.ImageLoader()
    
    loader.load(path, (img) => {
      texture.image = img
      texture.needsUpdate = true
    })

    return texture
  }
  
  createPhongMaterial(params : Object) {
    let planetMaterial = new THREE.MeshPhongMaterial()  
         
    for (let param in params) {
      try {
        planetMaterial[param] = params[param]
      } catch(e) {}
    }
    
    return planetMaterial  
  }
  
  createBasicMaterial(params : Object) {
    let planetMaterial = new THREE.MeshBasicMaterial({
      map: params.map
    })  

    return planetMaterial  
  }
  
  createSaturnRings() {     
    const ringGeometry = new THREE.RingGeometry(60, 100, 64, 64, 0, Math.PI * 2)
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      map: this.loadTexture('/img/texture_maps/saturn-rings.png'), 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    })
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh.rotateX(Math.PI / 2)
    
    const saturnObj = this.scene.getObjectByName('saturn')
    saturnObj.add(ringMesh)
  }
    
  movePlanet(rotationDir : String, angleAmp : Number) {
    this.angle += angleAmp
    let planet = this.scene.getObjectByName(this.name)

    if (rotationDir === 'x') {
      planet.rotation.x += this.rotationSpeed
    } else if (rotationDir === 'y') {
      planet.rotation.y += this.rotationSpeed
    } else {
      planet.rotation.z += this.rotationSpeed
    }
       
    planet.position.x = Math.cos(this.angle * 100) * this.orbitRadius
    planet.position.z = Math.sin(this.angle * 100) * this.orbitRadius

  }
  
  moveMoon() {
    let moon =  this.scene.getObjectByName(this.name)
    this.moonOrbitTheta += this.moonOrbitDTheta
    moon.position.x = this.moonOrbitRadius * Math.cos(this.moonOrbitTheta)
    moon.position.z = this.moonOrbitRadius * Math.sin(this.moonOrbitTheta)
  }
  
  // adapted from stackoverflow.com/questions/13756112
  createOrbitRing() {
    const orbitMaterial = new THREE.LineBasicMaterial({ color: this.orbitColor })
    const orbitGeometry = new THREE.CircleGeometry(this.orbitRadius, this.orbitSegments)
    orbitGeometry.vertices.shift();
    
    let orbit = new THREE.Line(orbitGeometry, orbitMaterial)
    orbit.rotateX(Math.PI / 2)
    orbitsScene.push(orbit)
    scene.add(orbit)
  }
     
  createPlanet(params : Object, pos : Object, moonParams=null) {
    this.createTexture(this.params.texture, this.params.normal, this.params.specular,
                       this.params.normalScale, this.params.specularColor)
                       
    let sphereGeometry : Object = new THREE.SphereGeometry(this.params.radius,
                                                           this.params.line,
                                                           this.params.width)
                                                           
    let sphereMaterial
    params.isSun ? sphereMaterial = this.createBasicMaterial(this.textures) : (
                   sphereMaterial = this.createPhongMaterial(this.textures))
                                    
    let planetMesh : Object = new THREE.Mesh(sphereGeometry, sphereMaterial)

    if (params.isSun) {
      let sunlight = new THREE.PointLight(0xffffff, 1, params.lightIntensity)
      sunlight.power = params.lightPower
	    sunlight.add(planetMesh)
	    this.scene.add(sunlight)
    } else {
      if (!this.name.startsWith('moon') && !this.name.startsWith('clouds')) {
        this.createOrbitRing()
      }
    }
    
    planetMesh.position.x = Math.cos(this.angle * 100) * this.orbitRadius
    planetMesh.position.z = Math.sin(this.angle * 100) * this.orbitRadius

    planetMesh.name = this.name
    planetsScene.push(planetMesh)
    
    if (moonParams !== null) {
      this.moonOrbitRadius = moonParams.radius
      this.moonOrbitTheta = moonParams.theta
      this.moonOrbitDTheta = moonParams.dTheta
      const parentPlanet = this.name.split('-')[1]
      const planetObj = this.scene.getObjectByName(parentPlanet)
      planetObj.add(planetMesh);
    } else if (this.name.startsWith('clouds')) {
      const parentPlanet = this.name.split('-')[1]
      const planetObj = this.scene.getObjectByName(parentPlanet)
      planetObj.add(planetMesh);
    } else {
      this.scene.add(planetMesh);
    }

    if (this.name === 'saturn') {
      this.createSaturnRings()
    }
    
  }
}

