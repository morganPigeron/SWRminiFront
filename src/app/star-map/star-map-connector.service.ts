import { Injectable } from '@angular/core';
import { from, of, Subject } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';
import { Sector } from '../models/sector';

@Injectable({
  providedIn: 'root',
})
export class StarMapConnectorService {
  private sectors: Subject<Sector[]>;
  private sectorsData: Sector[] = [];

  constructor() {
    this.sectors = new Subject<Sector[]>();

    //TODO this is fake
    of([
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
      new Sector('test1', 3),
      new Sector('test2', 8),
      new Sector('test3', 1),
    ]).pipe(
        // make observable to emit each element of the array (not the whole array)
        mergeMap((x) => from(x)),
        // delay each element by 1 sec
        concatMap(x => of(x).pipe(delay(200)))
    ).subscribe(sector => this.sectorsData.push(sector));
  }

  public getSectors() {
    return this.sectors;
  }

  public refreshSector() {
    this.sectors.next(this.sectorsData);
  }
}
