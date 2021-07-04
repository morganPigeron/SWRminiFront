import { Injectable } from '@angular/core';

import { GUI } from 'dat.gui';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  DirectionalLight,
  MeshPhongMaterial,
  SphereGeometry,
  DodecahedronGeometry,
  CylinderGeometry,
  BufferGeometry,
  Color,
  MeshStandardMaterial,
  HemisphereLight,
  Texture,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
  providedIn: 'root',
})
export class DisplayEngineService {
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer;
  private scenes: Scene[] = [];
  private clock: Clock;

  constructor() {
    this.canvas = document.getElementById('c') as HTMLCanvasElement;

    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.clock = new Clock();
    this.update();
  }

  private updateSize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.renderer.setSize(width, height, false);
    }
  }

  private updateScenes(deltaTime: number) {
    this.renderer.setClearColor(0xffffff);
    this.renderer.setScissorTest(false);
    this.renderer.clear();

    this.renderer.setClearColor(0xe0e0e0);
    this.renderer.setScissorTest(true);

    this.scenes.forEach((scene) => {
      // so something moves
      scene.children[0].rotation.y += deltaTime;

      // get the element that is a place holder for where we want to
      // draw the scene
      const element = scene.userData.element;

      // get its position relative to the page's viewport
      const rect = element.getBoundingClientRect();

      // check if it's offscreen. If so skip it
      if (
        rect.bottom < 0 ||
        rect.top > this.renderer.domElement.clientHeight ||
        rect.right < 0 ||
        rect.left > this.renderer.domElement.clientWidth
      ) {
        return; // it's off screen
      }

      // set the viewport
      const width = rect.right - rect.left;
      const height = rect.bottom - rect.top;
      const left = rect.left;
      const bottom = this.renderer.domElement.clientHeight - rect.bottom;

      this.renderer.setViewport(left, bottom, width, height);
      this.renderer.setScissor(left, bottom, width, height);

      const camera = scene.userData.camera;

      this.renderer.render(scene, camera);
    });
  }
  
  private fixedUpdate(deltaTime: number) {
    this.updateSize();
    this.updateScenes(deltaTime);
  }

  private update() {
    const deltaTime = this.clock.getDelta();
    if (deltaTime > 1 / 60)//TODO add setting for framerate
      this.fixedUpdate(deltaTime);

    requestAnimationFrame(() => this.update());
  }

  public addSceneWithOneGeometry(
    content: HTMLElement,
    geometry: BufferGeometry,
    background: Texture,
  ) {
    const scene = new Scene();
    scene.background = background;
    scene.userData.element = content;

    const camera = new PerspectiveCamera(50, 1, 1, 10);
    camera.position.z = 2;
    scene.userData.camera = camera;

    const controls = new OrbitControls(
      scene.userData.camera,
      scene.userData.element
    );
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.enablePan = false;
    controls.enableZoom = false;
    scene.userData.controls = controls;

    // add one random color to geometry
    const material = new MeshStandardMaterial({
      color: new Color().setHSL(Math.random(), 1, 0.75),
      roughness: 0.5,
      metalness: 0,
      flatShading: true,
    });

    scene.add(new Mesh(geometry, material));

    scene.add(new HemisphereLight(0xaaaaaa, 0x444444));

    const light = new DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);

    this.scenes.push(scene);
  }
}
