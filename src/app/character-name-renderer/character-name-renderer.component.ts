import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-character-name-renderer',
  templateUrl: './character-name-renderer.component.html',
  styleUrls: ['./character-name-renderer.component.css'],
  changeDetection: ChangeDetectionStrategy?.OnPush
})
export class CharacterNameRendererComponent implements ICellRendererAngularComp {
  characterName: string = '';
  redirectUrl: string = '';

  agInit(params: ICellRendererParams<any, any, any>): void {        
    this.characterName = params?.data?.name || '';
    this.redirectUrl = `/characters/${params?.context?.componentRef?.characterCount}`
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
}
