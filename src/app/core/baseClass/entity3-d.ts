import { BufferGeometry, Material, Object3D } from 'three';

export class Entity3D {
  constructor(
    public geometry: BufferGeometry,
    public object3d: Object3D,
    public material: Material,
  ) {}
}
