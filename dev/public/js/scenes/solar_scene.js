/* @flow */
let scene;
let camera;
let renderer;
let cameraControl;

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.01,
        50000
    );
    

    camera.position.x = 90;
    camera.position.y = 32;
    camera.position.z = 32;
    camera.lookAt(scene.position);
    cameraControl = new THREE.TrackballControls(camera);
    
    cameraControl.minDistance = 25;
	  cameraControl.maxDistance = 3100;
    
    cameraControl.rotateSpeed = 1.5;
    cameraControl.zoomSpeed = 1.5;
    cameraControl.panSpeed = 0.8;
    
    cameraControl.noZoom = false;
    cameraControl.noPan = true;
    
    cameraControl. staticMoving = false;
    cameraControl.dynamicDampingFactor = 0.1;
    
    cameraControl.keys = [65, 83, 68];
    cameraControl.addEventListener('change', render);
}

function createLight() {
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 10, -50);
    directionalLight.name = 'directional';
    scene.add(directionalLight)

    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
}

function createClouds() {
    let sphereGeometry = new THREE.SphereGeometry(15.1, 32, 32);
    let cloudsTexture = new THREE.Texture();
    let loader = new THREE.ImageLoader();
    loader.load('/img/earth/clouds_1k.png', (image) => {
        cloudsTexture.image = image;
        cloudsTexture.needsUpdate = true;
    });

    let cloudsMaterial = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
    });

    let cloudMesh = new THREE.Mesh(sphereGeometry, cloudsMaterial);
    cloudMesh.name = 'clouds';

    scene.add(cloudMesh);
}

function createStarfield() {
    let sphereGeometry = new THREE.SphereGeometry(2048, 32, 32);

    let envTexture = new THREE.Texture();
    let loader = new THREE.ImageLoader();
    loader.load('/img/starfields/milky_way.jpg', (image) => {
        envTexture.image = image;
        envTexture.needsUpdate = true;
    });

    let envMaterial = new THREE.MeshBasicMaterial();
    envMaterial.map = envTexture;
    envMaterial.side = THREE.BackSide;

    let mesh = new THREE.Mesh(sphereGeometry, envMaterial);
    scene.add(mesh);
}         

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    cameraControl.handleResize();
    render();
}

function animate() {
    requestAnimationFrame(animate);
    cameraControl.update();
    render();
}

// Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
function createGlow() {

}

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

function init() {
    scene = new THREE.Scene();

    createRenderer();
    createCamera();
    createLight();
    
    let earth = new ProtoPlanet("earth", earthParams, scene)
    earth.createPlanet()
    
    createClouds();
    createStarfield();

    window.addEventListener('resize', onWindowResize, false);
    document.body.appendChild(renderer.domElement);
    
    animate();
    render();
}

function render() {
    scene.getObjectByName('earth').rotation.y += 0.0005;
    scene.getObjectByName('clouds').rotation.y += 0.0007;
    renderer.render(scene, camera);
}

init();
