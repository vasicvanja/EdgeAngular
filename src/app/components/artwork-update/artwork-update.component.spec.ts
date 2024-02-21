import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtwrokUpdateComponent } from './artwork-update.component';

describe('ArtwrokUpdateComponent', () => {
  let component: ArtwrokUpdateComponent;
  let fixture: ComponentFixture<ArtwrokUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtwrokUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtwrokUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
