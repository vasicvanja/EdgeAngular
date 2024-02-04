import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclesDetailsComponent } from './cycles-details.component';

describe('CyclesDetailsComponent', () => {
  let component: CyclesDetailsComponent;
  let fixture: ComponentFixture<CyclesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyclesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CyclesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
