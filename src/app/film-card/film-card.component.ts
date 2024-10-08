import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SWAPIService } from '../swapi.service';

@Component({
  selector: 'film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilmCardComponent implements OnInit {

  constructor(private swapiService: SWAPIService, private changeDetectorRef: ChangeDetectorRef) {
  }

  @Input() url: string = '';

  filmDetail: any = {};

  ngOnInit(): void {
    this.setFilmDetail();
  }

  setFilmDetail = (): void => {
    this.swapiService?.getFilmDetail(this.url)?.subscribe({
      next: (res: any) => {        
        this.filmDetail = res;
        this.changeDetectorRef?.detectChanges();
      },
      error: (error) => {
      }
    });
  };
}
