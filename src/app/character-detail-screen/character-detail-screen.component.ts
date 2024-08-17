import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SWAPIService } from '../swapi.service';
import { ActivatedRoute } from '@angular/router';
import { SpeciesRendererComponent } from '../species-renderer/species-renderer.component';
import * as moment from 'moment';
import { CharacterDetailInterface } from '../swapi.interface';

@Component({
  selector: 'app-character-detail-screen',
  templateUrl: './character-detail-screen.component.html',
  styleUrls: ['./character-detail-screen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CharacterDetailScreenComponent implements OnInit {

  characterDetail: CharacterDetailInterface = {};
  createdDate: string = '';
  editedDate: string = '';

  @ViewChild('speciesComponent', { read: ViewContainerRef }) speciesComponentRef!: ViewContainerRef;

  constructor(private swapiService: SWAPIService, private activatedRoute: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {    
    this.setCharacterDetail();
  }

  setCharacterDetail = (): void => {
    this.swapiService?.getCharacterById(this.activatedRoute?.snapshot?.params['id'])?.subscribe({
      next: (res: any) => {
        this.characterDetail = res;    
        console.log('characterDetail', this.characterDetail);
            
        this.createdDate = moment(this.characterDetail?.created).format('DD/MM/YYYY');
        this.editedDate = moment(this.characterDetail?.edited).format('DD/MM/YYYY');

        const componentInstance = this.speciesComponentRef?.createComponent(SpeciesRendererComponent);    
        if (componentInstance?.instance) {
          componentInstance.instance.speciesList = this.characterDetail?.species;
        }    
        this.changeDetectorRef?.detectChanges();
      },
      error: (error) => {
      }
    });
  };
}
