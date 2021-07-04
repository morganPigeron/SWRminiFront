import { Component, OnDestroy } from '@angular/core'; 
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Sector } from '../models/sector';
import { StarMapConnectorService } from './star-map-connector.service';

@Component({
  selector: 'app-star-map',
  templateUrl: './star-map.component.html',
  styleUrls: ['./star-map.component.scss'],
})
export class StarMapComponent implements OnDestroy {
  private sectorSubscription: Subscription;

  public sectors: Sector[] = [];

  constructor(private starMapConnector: StarMapConnectorService) {
    this.sectorSubscription = this.starMapConnector
      .getSectors()
      .subscribe((s) => {
        this.sectors = s;
      });

    //TODO fake latency;
    of(1)
      .pipe(delay(1500))
      .subscribe((x) => this.starMapConnector.refreshSector());
  }

  public ngOnDestroy() {
    this.sectorSubscription.unsubscribe();
  }
}
