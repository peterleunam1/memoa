import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NoteModel } from '../../../../domain/models/note';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextArea } from '../../atoms/text-area/text-area';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextArea, TranslatePipe],
  templateUrl: './note-details.html',
  styleUrl: './note-details.css'
})
export class NoteDetails implements OnInit, OnChanges, OnDestroy {
  @Input() note: NoteModel = {} as NoteModel;
  @Output() noteUpdated = new EventEmitter<NoteModel>();

  contentControl = new FormControl('');
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.contentControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (this.note) {
          this.noteUpdated.emit({
            ...this.note,
            content: value ?? ''
          });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['note'] && this.note) {
      this.contentControl.setValue(this.note.content ?? '', { emitEvent: false });
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
