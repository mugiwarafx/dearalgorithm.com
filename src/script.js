import './style.css'
import disc from '../static/textures/sprites/disc.png'

import * as THREE from 'three'

console.log('%cTao of Programming: https://www.mit.edu/~xela/tao.html', 'background: #282a36; color: #50fa7b')
console.log('%cDiscord: varequalsjordi#2376', 'background: #282a36; color: #ffb86c')
console.log('%cUS Phone: +1 (888) 355-7860', 'background: #282a36; color: #ff79c6')

console.log('%cEU Phone: +34 682 23 55 96', 'background: #282a36; color: #bd93f9')

console.log('Please, be nice with me, I am just a RPi with undervoltage problems 🏴‍☠️\nMany thanks 🌷')

import {
  BoxGeometry,
  BufferGeometry,
  CapsuleGeometry,
  CircleGeometry,
  Color,
  ConeGeometry,
  Curve,
  CylinderGeometry,
  DodecahedronGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LatheGeometry,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshPhongMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  RingGeometry,
  Scene,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  TetrahedronGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  WireframeGeometry,
  WebGLRenderer,
} from 'three'

import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import { ConvexGeometry } from '../jsm/geometries/ConvexGeometry.js'
import * as BufferGeometryUtils from '../jsm/utils/BufferGeometryUtils.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'

const twoPi = Math.PI * 2

class CustomSinCurve extends Curve {
  constructor(scale = 1) {
    super()

    this.scale = scale
  }

  getPoint(t, optionalTarget = new Vector3()) {
    const tx = t * 3 - 1.5
    const ty = Math.sin(2 * Math.PI * t)
    const tz = 0

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
  }
}

function updateGroupGeometry(mesh, geometry) {
  mesh.children[0].geometry.dispose()
  mesh.children[1].geometry.dispose()

  mesh.children[0].geometry = new WireframeGeometry(geometry)
  mesh.children[1].geometry = geometry

  // these do not update nicely together if shared
}

// heart shape

const x = 0,
  y = 0

const heartShape = new Shape()

heartShape.moveTo(x + 5, y + 5)
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)

const guis = {
  BoxGeometry: function (mesh) {
    const data = {
      width: 10,
      height: 10,
      depth: 10,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new BoxGeometry(data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments))
    }

    const folder = gui.addFolder('THREE.BoxGeometry')

    folder.add(data, 'width', 1, 30).onChange(generateGeometry)
    folder.add(data, 'height', 1, 30).onChange(generateGeometry)
    folder.add(data, 'depth', 1, 30).onChange(generateGeometry)
    folder.add(data, 'widthSegments', 1, 10).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 1, 10).step(1).onChange(generateGeometry)
    folder.add(data, 'depthSegments', 1, 10).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  CapsuleGeometry: function (mesh) {
    const data = {
      radius: 5,
      length: 5,
      capSegments: 10,
      heightSegments: 20,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new CapsuleGeometry(data.radius, data.length, data.capSegments, data.heightSegments))
    }

    const folder = gui.addFolder('THREE.CapsuleGeometry')

    folder.add(data, 'radius', 1, 30).onChange(generateGeometry)
    folder.add(data, 'length', 1, 30).onChange(generateGeometry)
    folder.add(data, 'capSegments', 1, 32).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 1, 64).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  CylinderGeometry: function (mesh) {
    const data = {
      radiusTop: 5,
      radiusBottom: 5,
      height: 10,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: twoPi,
    }

    function generateGeometry() {
      updateGroupGeometry(
        mesh,
        new CylinderGeometry(
          data.radiusTop,
          data.radiusBottom,
          data.height,
          data.radialSegments,
          data.heightSegments,
          data.openEnded,
          data.thetaStart,
          data.thetaLength
        )
      )
    }

    const folder = gui.addFolder('THREE.CylinderGeometry')

    folder.add(data, 'radiusTop', 0, 30).onChange(generateGeometry)
    folder.add(data, 'radiusBottom', 0, 30).onChange(generateGeometry)
    folder.add(data, 'height', 1, 50).onChange(generateGeometry)
    folder.add(data, 'radialSegments', 3, 64).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 1, 64).step(1).onChange(generateGeometry)
    folder.add(data, 'openEnded').onChange(generateGeometry)
    folder.add(data, 'thetaStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  ConeGeometry: function (mesh) {
    const data = {
      radius: 5,
      height: 10,
      radialSegments: 8,
      heightSegments: 1,
      openEnded: false,
      thetaStart: 0,
      thetaLength: twoPi,
    }

    function generateGeometry() {
      updateGroupGeometry(
        mesh,
        new ConeGeometry(data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength)
      )
    }

    const folder = gui.addFolder('THREE.ConeGeometry')

    folder.add(data, 'radius', 0, 30).onChange(generateGeometry)
    folder.add(data, 'height', 1, 50).onChange(generateGeometry)
    folder.add(data, 'radialSegments', 3, 64).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 1, 64).step(1).onChange(generateGeometry)
    folder.add(data, 'openEnded').onChange(generateGeometry)
    folder.add(data, 'thetaStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  CircleGeometry: function (mesh) {
    const data = {
      radius: 10,
      segments: 32,
      thetaStart: 0,
      thetaLength: twoPi,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new CircleGeometry(data.radius, data.segments, data.thetaStart, data.thetaLength))
    }

    const folder = gui.addFolder('THREE.CircleGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'segments', 0, 128).step(1).onChange(generateGeometry)
    folder.add(data, 'thetaStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  DodecahedronGeometry: function (mesh) {
    const data = {
      radius: 10,
      detail: 0,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new DodecahedronGeometry(data.radius, data.detail))
    }

    const folder = gui.addFolder('THREE.DodecahedronGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'detail', 0, 5).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  IcosahedronGeometry: function (mesh) {
    const data = {
      radius: 10,
      detail: 0,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new IcosahedronGeometry(data.radius, data.detail))
    }

    const folder = gui.addFolder('THREE.IcosahedronGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'detail', 0, 5).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  LatheGeometry: function (mesh) {
    const points = []

    for (let i = 0; i < 10; i++) {
      points.push(new Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2))
    }

    const data = {
      segments: 12,
      phiStart: 0,
      phiLength: twoPi,
    }

    function generateGeometry() {
      const geometry = new LatheGeometry(points, data.segments, data.phiStart, data.phiLength)

      updateGroupGeometry(mesh, geometry)
    }

    const folder = gui.addFolder('THREE.LatheGeometry')

    folder.add(data, 'segments', 1, 30).step(1).onChange(generateGeometry)
    folder.add(data, 'phiStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'phiLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  OctahedronGeometry: function (mesh) {
    const data = {
      radius: 10,
      detail: 0,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new OctahedronGeometry(data.radius, data.detail))
    }

    const folder = gui.addFolder('THREE.OctahedronGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'detail', 0, 5).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  PlaneGeometry: function (mesh) {
    const data = {
      width: 10,
      height: 10,
      widthSegments: 1,
      heightSegments: 1,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments))
    }

    const folder = gui.addFolder('THREE.PlaneGeometry')

    folder.add(data, 'width', 1, 30).onChange(generateGeometry)
    folder.add(data, 'height', 1, 30).onChange(generateGeometry)
    folder.add(data, 'widthSegments', 1, 30).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 1, 30).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  RingGeometry: function (mesh) {
    const data = {
      innerRadius: 5,
      outerRadius: 10,
      thetaSegments: 8,
      phiSegments: 8,
      thetaStart: 0,
      thetaLength: twoPi,
    }

    function generateGeometry() {
      updateGroupGeometry(
        mesh,
        new RingGeometry(data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength)
      )
    }

    const folder = gui.addFolder('THREE.RingGeometry')

    folder.add(data, 'innerRadius', 1, 30).onChange(generateGeometry)
    folder.add(data, 'outerRadius', 1, 30).onChange(generateGeometry)
    folder.add(data, 'thetaSegments', 1, 30).step(1).onChange(generateGeometry)
    folder.add(data, 'phiSegments', 1, 30).step(1).onChange(generateGeometry)
    folder.add(data, 'thetaStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  SphereGeometry: function (mesh) {
    const data = {
      radius: 15,
      widthSegments: 32,
      heightSegments: 16,
      phiStart: 0,
      phiLength: twoPi,
      thetaStart: 0,
      thetaLength: Math.PI,
    }

    function generateGeometry() {
      updateGroupGeometry(
        mesh,
        new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength)
      )
    }

    const folder = gui.addFolder('THREE.SphereGeometry')

    folder.add(data, 'radius', 1, 30).onChange(generateGeometry)
    folder.add(data, 'widthSegments', 3, 64).step(1).onChange(generateGeometry)
    folder.add(data, 'heightSegments', 2, 32).step(1).onChange(generateGeometry)
    folder.add(data, 'phiStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'phiLength', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaStart', 0, twoPi).onChange(generateGeometry)
    folder.add(data, 'thetaLength', 0, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  TetrahedronGeometry: function (mesh) {
    const data = {
      radius: 10,
      detail: 0,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new TetrahedronGeometry(data.radius, data.detail))
    }

    const folder = gui.addFolder('THREE.TetrahedronGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'detail', 0, 5).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  TorusGeometry: function (mesh) {
    const data = {
      radius: 10,
      tube: 3,
      radialSegments: 16,
      tubularSegments: 100,
      arc: twoPi,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new TorusGeometry(data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc))
    }

    const folder = gui.addFolder('THREE.TorusGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'tube', 0.1, 10).onChange(generateGeometry)
    folder.add(data, 'radialSegments', 2, 30).step(1).onChange(generateGeometry)
    folder.add(data, 'tubularSegments', 3, 200).step(1).onChange(generateGeometry)
    folder.add(data, 'arc', 0.1, twoPi).onChange(generateGeometry)

    generateGeometry()
  },

  TorusKnotGeometry: function (mesh) {
    const data = {
      radius: 10,
      tube: 3,
      tubularSegments: 64,
      radialSegments: 8,
      p: 2,
      q: 3,
    }

    function generateGeometry() {
      updateGroupGeometry(mesh, new TorusKnotGeometry(data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q))
    }

    const folder = gui.addFolder('THREE.TorusKnotGeometry')

    folder.add(data, 'radius', 1, 20).onChange(generateGeometry)
    folder.add(data, 'tube', 0.1, 10).onChange(generateGeometry)
    folder.add(data, 'tubularSegments', 3, 300).step(1).onChange(generateGeometry)
    folder.add(data, 'radialSegments', 3, 20).step(1).onChange(generateGeometry)
    folder.add(data, 'p', 1, 20).step(1).onChange(generateGeometry)
    folder.add(data, 'q', 1, 20).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  TubeGeometry: function (mesh) {
    const data = {
      segments: 20,
      radius: 2,
      radialSegments: 8,
    }

    const path = new CustomSinCurve(10)

    function generateGeometry() {
      updateGroupGeometry(mesh, new TubeGeometry(path, data.segments, data.radius, data.radialSegments, false))
    }

    const folder = gui.addFolder('THREE.TubeGeometry')

    folder.add(data, 'segments', 1, 100).step(1).onChange(generateGeometry)
    folder.add(data, 'radius', 1, 10).onChange(generateGeometry)
    folder.add(data, 'radialSegments', 1, 20).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  ShapeGeometry: function (mesh) {
    const data = {
      segments: 12,
    }

    function generateGeometry() {
      const geometry = new ShapeGeometry(heartShape, data.segments)
      geometry.center()

      updateGroupGeometry(mesh, geometry)
    }

    const folder = gui.addFolder('THREE.ShapeGeometry')
    folder.add(data, 'segments', 1, 100).step(1).onChange(generateGeometry)

    generateGeometry()
  },

  ExtrudeGeometry: function (mesh) {
    const data = {
      steps: 2,
      depth: 16,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }

    const length = 12,
      width = 8

    const shape = new Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0, width)
    shape.lineTo(length, width)
    shape.lineTo(length, 0)
    shape.lineTo(0, 0)

    function generateGeometry() {
      const geometry = new ExtrudeGeometry(shape, data)
      geometry.center()

      updateGroupGeometry(mesh, geometry)
    }

    const folder = gui.addFolder('THREE.ExtrudeGeometry')

    folder.add(data, 'steps', 1, 10).step(1).onChange(generateGeometry)
    folder.add(data, 'depth', 1, 20).onChange(generateGeometry)
    folder.add(data, 'bevelThickness', 1, 5).step(1).onChange(generateGeometry)
    folder.add(data, 'bevelSize', 0, 5).step(1).onChange(generateGeometry)
    folder.add(data, 'bevelOffset', -4, 5).step(1).onChange(generateGeometry)
    folder.add(data, 'bevelSegments', 1, 5).step(1).onChange(generateGeometry)

    generateGeometry()
  },
}

function chooseFromHash(mesh) {
  const selectedGeometry = window.location.hash.substring(1) || 'BoxGeometry'

  if (guis[selectedGeometry] !== undefined) {
    guis[selectedGeometry](mesh)
  }

  if (selectedGeometry === 'TextGeometry') {
    return { fixed: true }
  }

  //No configuration options
  return {}
}

//

// TODO: Custom Unicorn Jordi 🦄

const selectedGeometry = window.location.hash.substring(1)

if (guis[selectedGeometry] !== undefined) {
  document.getElementById('newWindow').href += '#' + selectedGeometry
}

const gui = new GUI()

const scene = new Scene()
scene.background = new Color(0x282a36)

const camera = new PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.8), 0.1, 50)
camera.position.z = 40

const renderer = new WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight * 0.8)
document.body.appendChild(renderer.domElement)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableZoom = true

const lights = []
lights[0] = new PointLight(0xffffff, 1, 0)
lights[1] = new PointLight(0xffffff, 1, 0)
lights[2] = new PointLight(0xffffff, 1, 0)

lights[0].position.set(0, 200, 0)
lights[1].position.set(100, 200, 100)
lights[2].position.set(-100, -200, -100)

scene.add(lights[0])
scene.add(lights[1])
scene.add(lights[2])

const group = new Group()

const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute([], 3))

const lineMaterial = new LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
})
const meshMaterial = new MeshPhongMaterial({
  color: 0xff79c6,
  emissive: 0x072534,
  side: DoubleSide,
  flatShading: true,
})

group.add(new LineSegments(geometry, lineMaterial))
group.add(new Mesh(geometry, meshMaterial))

const options = chooseFromHash(group)

// helper

scene.add(group)

function render() {
  requestAnimationFrame(render)

  if (!options.fixed) {
    group.rotation.x += 0.005
    group.rotation.y += 0.005
  }

  const axesHelper = new THREE.AxesHelper(200)
  axesHelper.setColors(0xffb86c, 0x50fa7b, 0xff79c6)
  scene.add(axesHelper)

  renderer.render(scene, camera)
}

window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / (window.innerHeight * 0.8)
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight * 0.8)
  },
  false
)

render()

const canvas = document.getElementsByTagName('canvas')[0]
//console.log(canvas)

const navHTML = `
<nav>
  <a target="_blank" href="https://github.com/mugiwarafx">github</a>
  <a target="_blank" href="https://dearalgorithm.github.io/joji_fx/">blog</a> 
  <a target="_blank" href="https://discord.gg/D8brSJSpaZ">discord</a>
  <a target="_blank" href="https://internationalaccessibilitytaskforce.com/">iatf</a>
</nav>
`

const footerHTML = `
<footer><h1>dearalgorithm</h1></footer>
`

canvas.insertAdjacentHTML('beforebegin', navHTML)
canvas.insertAdjacentHTML('afterend', footerHTML)
