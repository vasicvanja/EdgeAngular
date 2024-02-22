import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleUpdateComponent } from './cycle-update.component';

describe('CycleUpdateComponent', () => {
  let component: CycleUpdateComponent;
  let fixture: ComponentFixture<CycleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CycleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
