/* @flow */
class ProtoPlanet {
  name : String
  params : Object
  textures : Object
  sphereParams : Object
  scene : Object
  
  constructor(name, sphereParams, scene) {
      this.name = name
      this.params = sphereParams
      this.textures = {}
      this.scene = scene
  }
   
  createTexture(texture : String, normal : String, specular : String, 
                normalScale : Array<Number>, specularColor : Number) {
                         
    texture.length !== 0 ? (
      this.textures.map = this.loadTexture(texture)) : (
      this.textures.map = "")
    normal.length !== 0 ? (
      this.textures.normalMap = this.loadTexture(normal)) : (
      this.textures.normalMap = "")
    specular.length !== 0 ? (
      this.textures.specularMap = this.loadTexture(specular)) : (
      this.textures.specularMap = "")
    normalScale.length === 2 ? (
      this.textures.normalScale = new THREE.Vector2(normalScale[0], normalScale[1])) : (
      this.textures.normalScale = "" )
    specularColor.length !== 0 ? (
      this.textures.specular = new THREE.Color(specularColor)) : (
      this.textures.specular = "" )
      
  }
  
  loadTexture(path : String) : Object {
    let texture : Object = new THREE.Texture()
    let loader : Object = new THREE.ImageLoader()
    
    loader.load(path, (img) => {
      texture.image = img
      texture.needsUpdate = true
    });
    
    return texture
  }
  
  createPhongMaterial(params : Object) {
    let planetMaterial : Object = new THREE.MeshPhongMaterial()
    
    for (let param in params) {
      planetMaterial[param] = params[param]
    }
    
    return planetMaterial  
  }
    
  createPlanet() {
    this.createTexture(this.params.texture, this.params.normal, this.params.specular,
                       this.params.normalScale, this.params.specularColor)
                       
    let sphereGeometry : Object = new THREE.SphereGeometry(this.params.radius,
                                                           this.params.line,
                                                           this.params.width)
                                                           
    let sphereMaterial : Object = this.createPhongMaterial(this.textures)    
    let planetMesh : Object = new THREE.Mesh(sphereGeometry, sphereMaterial)
    
    planetMesh.name = this.name
    this.scene.add(planetMesh);
  }

}
