import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMenuItems } from './list-of-menu-items';

describe('ListOfMenuItems', () => {
  let component: ListOfMenuItems;
  let fixture: ComponentFixture<ListOfMenuItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfMenuItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfMenuItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
