import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkCreateComponent } from './artwork-create.component';

describe('ArtworkCreateComponent', () => {
  let component: ArtworkCreateComponent;
  let fixture: ComponentFixture<ArtworkCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtworkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
