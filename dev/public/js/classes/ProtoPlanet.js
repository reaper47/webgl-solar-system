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
  
  constructor(name, sphereParams, scene, rotationSpeed, transparent) {
      this.name = name
      this.params = sphereParams
      this.textures = { 'transparent': transparent}
      this.scene = scene
      this.rotationSpeed = rotationSpeed
      this.angle = 0
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
  
  movePlanet(rotationDir : String, orbitRadius : Number, angleAmp : Number) {
    this.angle += angleAmp 
    let planet = this.scene.getObjectByName(this.name)

    if (rotationDir === 'x') {
      planet.rotation.x += this.rotationSpeed
    } else if (rotationDir === 'y') {
      planet.rotation.y += this.rotationSpeed
    } else {
      planet.rotation.z += this.rotationSpeed
    }
    
    planet.position.x = this.params.radius + orbitRadius * Math.cos(this.angle)
    planet.position.z = this.params.radius + orbitRadius * Math.sin(this.angle)
  }
    
  createPlanet(params : Object) {
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
    }

    planetMesh.name = this.name
    this.scene.add(planetMesh);
  }
}

