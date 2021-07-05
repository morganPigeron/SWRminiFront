import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Entity3D } from 'src/app/core/baseClass/entity3-d';
import { DisplayEngineService } from 'src/app/core/display-engine.service';
import { Sector } from 'src/app/models/sector';
import {
  SphereGeometry,
  TextureLoader,
} from 'three';

@Component({
  selector: 'app-sector-map',
  templateUrl: './sector-map.component.html',
  styleUrls: ['./sector-map.component.scss'],
})
export class SectorMapComponent implements AfterViewInit {
  @ViewChild('content3d', { static: false }) content3d!: ElementRef;

  @Input() sector!: Sector;

  private planets: Entity3D[] = [];

  constructor(private display: DisplayEngineService) {
    /*TODO create a abstraction for display service
    for (let i = 0; i < this.sector.sectorSize; i++) {
      const planet = new Entity3D(
        new SphereGeometry(0.5, 12, 8),
        new Object3D(),
        new MeshStandardMaterial({
          color: new Color().setHSL(Math.random(), 1, 0.75),
          roughness: 0.5,
          metalness: 0,
          flatShading: true,
        })
      );

      planet.object3d.position.x = Math.random();
      planet.object3d.position.y = Math.random();
      planet.object3d.position.z = Math.random();

      this.planets.push(planet);
    }
    */
  }

  ngAfterViewInit(): void {
    this.display.addSceneWithOneGeometry(
      this.content3d.nativeElement,
      new SphereGeometry(0.5, 12, 8),
      new TextureLoader().load('assets/img/space1.png')
    );
  }
}
