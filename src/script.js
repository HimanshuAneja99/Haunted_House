import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Fog } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('#1C1D27', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorcolortexture = textureLoader.load('/textures/door/color.jpg')
const dooralphatexture = textureLoader.load('/textures/door/alpha.jpg')
const doorambientocclusiontexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorheighttexture = textureLoader.load('/textures/door/height.jpg')
const doornormaltexture = textureLoader.load('/textures/door/normal.jpg')
const doormetalnesstexture = textureLoader.load('/textures/door/metalness.jpg')
const doorroughnesstexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoghnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const graveColorTexture = textureLoader.load('/textures/grave/color.jpg')
const graveHeightTexture = textureLoader.load('/textures/grave/height.png')
const graveAmbientOcclusionTexture = textureLoader.load('/textures/grave/ambientOcclusion.jpg')
const graveNormalTexture = textureLoader.load('/textures/grave/normal.jpg')
const graveRoghnessTexture = textureLoader.load('/textures/grave/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoghnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(12,12)
grassAmbientOcclusionTexture.repeat.set(12,12)
grassNormalTexture.repeat.set(12,12)
grassRoghnessTexture.repeat.set(12,12)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoghnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoghnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */

//Group
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial( { 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        // roughness: bricksRoghnessTexture 
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5,1.25,4),
    new THREE.MeshStandardMaterial({ color: '#b35f45'})
)
roof.position.y = 2.5 + 0.625 
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2,2.2, 100,100),
    new THREE.MeshStandardMaterial({ 
        map: doorcolortexture,
        transparent: true,
        alphaMap: dooralphatexture,
        displacementMap: doorheighttexture,
        displacementScale: 0.15,
        normalMap: doornormaltexture,
        metalnessMap: doormetalnesstexture,
        roughnessMap: doorroughnesstexture

    })
)
door.position.y = 1 
door.position.z = 2.01
house.add(door)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoghnessTexture
     })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

//Bushes
const bushgeometry = new THREE.SphereBufferGeometry(1,16,16)
const bushmaterial = new THREE.MeshStandardMaterial({ color: '#89c854'})

const bush1 = new THREE.Mesh( bushgeometry, bushmaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(1.2,0.2,2.2)

const bush2 = new THREE.Mesh( bushgeometry, bushmaterial)
bush2.scale.set(0.2,0.2,0.2)
bush2.position.set(1.8,0.1,2.1)

const bush3 = new THREE.Mesh( bushgeometry, bushmaterial)
bush3.scale.set(0.3,0.3,0.3)
bush3.position.set(-1,0.1,2.2)

const bush4 = new THREE.Mesh( bushgeometry, bushmaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1.2,0.05,2.5)

house.add(bush1, bush2, bush3, bush4)

//Graves
const graves =  new THREE.Group()
scene.add(graves)

const gravegeometry = new THREE.BoxBufferGeometry(0.4,0.6,0.2)
const gravematerial = new THREE.MeshStandardMaterial({ 
    map: graveColorTexture,
    transparent: true,
    aoMap: graveAmbientOcclusionTexture,
    normalMap: graveNormalTexture,
    roughnessMap: graveRoghnessTexture
})

for(let i= 0; i < 50; i++ )
{
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 6
    const z = Math.cos(angle) * radius
    const x = Math.sin(angle) * radius

    const grave = new THREE.Mesh( gravegeometry, gravematerial)
    graves.add(grave)
    grave.rotation.y = (Math.random() - 0.5) * 0.5
    grave.rotation.z = (Math.random() - 0.5) * 0.3
    grave.position.set(x,0.2,z)
    grave.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(grave.geometry.attributes.uv.array, 2))


    grave.castShadow = true
}


//Ghosts
const ghost1 = new THREE.PointLight('#395583', 2, 5)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#122856', 4, 6)
scene.add(ghost3)



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.05)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.05)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door Light
const doorlight = new THREE.PointLight('#ff7d46', 1, 7)
doorlight.position.set(0,2,2.8)
house.add(doorlight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#1C1D27')

//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

moonLight.castShadow = true
doorlight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorlight.shadow.mapSize.width = 256
doorlight.shadow.mapSize.height = 256
doorlight.shadow.camera.far = 6

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 6

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 6

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 6

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update Ghosts
    const ghost1angle = elapsedTime * 0.5
    ghost1.position.x = Math.sin(ghost1angle) * 4
    ghost1.position.z = Math.cos(ghost1angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 4) 

    const ghost2angle = - elapsedTime * 0.35
    ghost2.position.x = Math.sin(ghost2angle) * 6
    ghost2.position.z = Math.cos(ghost2angle) * 6
    ghost2.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 0.5)

      const ghost3angle = - elapsedTime * 0.75
    ghost3.position.x = Math.sin(ghost3angle) + ( 7 * Math.sin(elapsedTime * 0.33))
    ghost3.position.z = Math.cos(ghost3angle) + ( 7 * Math.sin(elapsedTime * 0.8))
    ghost3.position.y = Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 0.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()