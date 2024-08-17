import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailScreenComponent } from './character-detail-screen.component';

describe('CharacterDetailScreenComponent', () => {
  let component: CharacterDetailScreenComponent;
  let fixture: ComponentFixture<CharacterDetailScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailScreenComponent]
    });
    fixture = TestBed.createComponent(CharacterDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
