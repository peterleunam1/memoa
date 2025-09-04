import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfNotes } from './list-of-notes';

describe('ListOfNotes', () => {
  let component: ListOfNotes;
  let fixture: ComponentFixture<ListOfNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
