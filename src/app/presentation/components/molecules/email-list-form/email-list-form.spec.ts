import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListForm } from './email-list-form';

describe('EmailListForm', () => {
  let component: EmailListForm;
  let fixture: ComponentFixture<EmailListForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailListForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailListForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
