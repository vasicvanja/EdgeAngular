import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyModalComponent } from './reply-modal.component';

describe('ReplyModalComponent', () => {
  let component: ReplyModalComponent;
  let fixture: ComponentFixture<ReplyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
