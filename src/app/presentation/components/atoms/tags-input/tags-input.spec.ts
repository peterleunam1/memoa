import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsInputComponent as TagsInput } from './tags-input';

describe('TagsInput', () => {
  let component: TagsInput;
  let fixture: ComponentFixture<TagsInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
