import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SWAPIService } from '../swapi.service';
import { CharacterNameRendererComponent } from '../character-name-renderer/character-name-renderer.component';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { SpeciesRendererComponent } from '../species-renderer/species-renderer.component';
import { CharacterDetailInterface } from '../swapi.interface';

@Component({
  selector: 'app-character-listing-screen',
  templateUrl: './character-listing-screen.component.html',
  styleUrls: ['./character-listing-screen.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListingScreenComponent implements OnInit {
  gridOptions: any = {};
  columnDefs: Array<ColDef> = [];
  characterList: Array<CharacterDetailInterface> = [];
  characterCount: number = 0;
  gridApi!: GridApi;
  totalCharacterLengthRendered: number = 0;
  isMoreBtnDisabled: boolean = false;
  pageLoad: number = 1;

  constructor(
    private swapiService: SWAPIService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeGridOptions();
    this.prepareColumnDef();
    this.setCharacterList(1);
    this.detectChanges();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  initializeGridOptions = (): void => {
    this.gridOptions = {
      rowModelType: 'clientSide',
      rowHeight: 40,
      overlayNoRowsTemplate:
        '<span class="ag-overlay-loading-center">No Rows Found</span>',
      overlayLoadingTemplate:
        '<span class="ag-overlay-loading-center">Loading...</span>',
      context: {
        componentRef: this,
      },
    };
  };

  prepareColumnDef = (): void => {
    this.columnDefs = [
      {
        headerName: 'SI No.',
        cellRenderer: () => {
          return `<p>${++this.characterCount}</p>`;
        },
      },
      {
        headerName: 'Character Name',
        field: 'name',
        cellRenderer: CharacterNameRendererComponent,
      },
      {
        headerName: 'Species',
        field: 'species',
        cellRenderer: SpeciesRendererComponent,
      },
      {
        headerName: 'Birth Year',
        field: 'birth_year',
      },
    ];
  };

  setCharacterList = (page: number): void => {
    if (page === 1) {
      this.isMoreBtnDisabled = false;
      this.characterCount = 0;
      this.pageLoad = 1;
      this.detectChanges();
    }
    const options = {
      params: {
        page: page,
      },
    };
    this.swapiService?.getAllCharacterList(options).subscribe({
      next: (res: any) => {
        this.characterList = res?.results;        
        this.totalCharacterLengthRendered = this.totalCharacterLengthRendered + this.characterList?.length;
        if (this.totalCharacterLengthRendered === res?.count) {
          this.isMoreBtnDisabled = true;
          this.detectChanges();
        }
        this.detectChanges();
      },
      error: (error) => {
        this.characterList = [];
        this.detectChanges();
      },
    });
  };

  updateCharacterList = (updatedCharacterList: any): void => {
    this.characterCount = 0;
    const filteredCharacterlist = this.characterList?.filter(
      (character: any, index: number) => {
        if (
          updatedCharacterList?.map((data: any) => data - 1)?.includes(index)
        ) {
          return character;
        }
      }
    );
    this.gridApi?.setGridOption(
      'rowData',
      updatedCharacterList?.length == 0
        ? this.characterList
        : filteredCharacterlist
    );
    this.detectChanges();
  };

  onClickOnMore = (): void => {
    this.updateCharacterList
    if (this.isMoreBtnDisabled) return;
    this.setCharacterList(++this.pageLoad);
  };

  detectChanges = (): void => {
    try {
      this.changeDetectorRef?.detectChanges();
    } catch (error) {}
  };
}
