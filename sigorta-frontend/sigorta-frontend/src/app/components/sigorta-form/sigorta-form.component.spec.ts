import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigortaFormComponent } from './sigorta-form.component';

describe('SigortaFormComponent', () => {
  let component: SigortaFormComponent;
  let fixture: ComponentFixture<SigortaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigortaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigortaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
