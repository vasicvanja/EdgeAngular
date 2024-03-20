import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrl: './reply-modal.component.scss'
})
export class ReplyModalComponent {
  
  @Input() title: string = '';
  @Input() senderEmail: string = '';
  @Input() subject: string = '';
  @Input() recievedMessage: string = '';
  replyMessage: string = '';

  @Output() reply = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onReply() {
    this.reply.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
