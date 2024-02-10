import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleCreateComponent } from './cycle-create.component';

describe('CycleCreateComponent', () => {
  let component: CycleCreateComponent;
  let fixture: ComponentFixture<CycleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CycleCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CycleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
