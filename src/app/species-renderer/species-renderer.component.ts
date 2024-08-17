import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SWAPIService } from '../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'species-renderer',
  templateUrl: './species-renderer.component.html',
  styleUrls: ['./species-renderer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeciesRendererComponent
  implements ICellRendererAngularComp, OnInit
{
  @Input() speciesList: any = [];

  species: any = [];

  constructor(
    private swapiService: SWAPIService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {    
    this.callApis(this.speciesList);
  }

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.callApis(params?.data?.species);
  }

  callApis = (apiList: Array<string>) => {
    const apis = apiList?.map((url: string) =>
      this.swapiService?.getSpeciesDetail(url)
    );
    if (apis?.length) {
      forkJoin(apis)?.subscribe({
        next: (res: any) => {
          this.species = res?.map((data: any) => data?.name);
          this.detectChanges();
        },
      });
    }
  };

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  detectChanges = (): void => {
    try {
      this.changeDetectorRef?.detectChanges();
    } catch (error) {}
  };
}
