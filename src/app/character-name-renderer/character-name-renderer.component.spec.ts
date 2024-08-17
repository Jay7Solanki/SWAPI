import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNameRendererComponent } from './character-name-renderer.component';

describe('CharacterNameRendererComponent', () => {
  let component: CharacterNameRendererComponent;
  let fixture: ComponentFixture<CharacterNameRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterNameRendererComponent]
    });
    fixture = TestBed.createComponent(CharacterNameRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
