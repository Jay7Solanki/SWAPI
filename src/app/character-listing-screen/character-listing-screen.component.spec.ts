import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListingScreenComponent } from './character-listing-screen.component';

describe('CharacterListingScreenComponent', () => {
  let component: CharacterListingScreenComponent;
  let fixture: ComponentFixture<CharacterListingScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterListingScreenComponent]
    });
    fixture = TestBed.createComponent(CharacterListingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
