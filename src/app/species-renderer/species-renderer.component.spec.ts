import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesRendererComponent } from './species-renderer.component';

describe('SpeciesRendererComponent', () => {
  let component: SpeciesRendererComponent;
  let fixture: ComponentFixture<SpeciesRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeciesRendererComponent]
    });
    fixture = TestBed.createComponent(SpeciesRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
