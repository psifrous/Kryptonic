import React, { Component } from 'react'
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'

export default class ThreeScene extends Component {
    constructor(props) {
        super(props)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
        this.createCube = this.createCube.bind(this)
    }

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            1,
            10000000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setClearColor('#000000')
        renderer.setSize(width, height)
        this.scene = scene

        scene.add(this.createCube())

        camera.position.z = 3


        this.camera = camera
        this.renderer = renderer

        new OrbitControls(camera,renderer.domElement)
        
        this.mount.appendChild(this.renderer.domElement)
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: '#00ff00' })
        const cube = new THREE.Mesh(geometry, material)

        return cube
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animate() {




        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {

        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ overflow: 'hidden', maxHeight: '100vh', maxWidth: '100vw', width: '100vw', height: '100vh' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}