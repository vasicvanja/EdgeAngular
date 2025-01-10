import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
    selector: 'reply-modal',
    templateUrl: './reply-modal.component.html',
    styleUrl: './reply-modal.component.scss',
    standalone: true,
    imports: [FormsModule]
})
export class ReplyModalComponent {
  
  @Input() title: string = '';
  @Input() senderEmail: string = '';
  @Input() subject: string = '';
  @Input() recievedMessage: string = '';
  replyMessage: string = '';

  @Output() reply = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('replyForm') replyForm!: NgForm;

  onReply() {
    if (this.replyForm.valid) {
      this.reply.emit();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  formatMessage(message: string): string {
    if (message) {
      return message.replace(/\n/g, '<br>');
    } else {
      return '';
    }
  }
}
