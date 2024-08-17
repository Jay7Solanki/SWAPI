import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SWAPIService } from '../swapi.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter();

  filmList: any = [];
  filteredCharacterList: any = [];
  speciesList: any = [];

  constructor(
    private swapiService: SWAPIService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.callApisToGetData();
  }

  callApisToGetData = (): void => {
    const apis = [
      this.swapiService.getAllFilmList(),
      this.swapiService.getAllSpecies(),
    ];

    forkJoin(apis)?.subscribe({
      next: (res: any) => {
        this.filmList = this.getList(res[0], 'title', 'characters');
        this.speciesList = this.getList(res[1], 'name', 'people');
        this.detectChanges();
      },
      error: (error) => {
      },
    });
  };

  getList = (data: any, nameKey: string, characterKey: string) => {
    return data?.results?.map((film: any) => {
      return {
        name: film[nameKey],
        characters: this.getCharacters(film[characterKey]),
      };
    });
  };

  getCharacters = (characters: any): number => {
    return characters?.map((character: any) => {
      return Number(character?.split('people')[1]?.split('/')[1]);
    });
  };

  onFilterCharacter = (event: any, name: string): void => {
    if (!this.filteredCharacterList?.some((data: any) => data?.name === name)) {
      this.filteredCharacterList?.push(
        [...this.filmList, ...this.speciesList]?.filter((film: any) => {
          if (film?.name === name) return film;
        })[0]
      );
    }

    if (!event?.target?.checked) {
      const index = this.filteredCharacterList?.findIndex(
        (film: any) => film?.name === name
      );
      this.filteredCharacterList?.splice(index, 1);
    }

    const uniqueCharacters = this.getUniqueCharacters();

    this.onFilterChanged?.emit(uniqueCharacters);
  };

  getUniqueCharacters = () => {
    return [
      ...new Set(
        this.filteredCharacterList.reduce((acc: any, film: any) => {
          console.log('film', film);
          
          return acc.concat(film.characters);
        }, [])
      ),
    ].sort((a: any, b: any) => a - b);
  }

  detectChanges = (): void => {
    try {
      this.changeDetectorRef?.detectChanges();
    } catch (error) {}
  };
}
