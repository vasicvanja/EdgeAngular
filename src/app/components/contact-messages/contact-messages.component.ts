import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactMessagesService } from '../../services/contact-messages.service';
import { ToastrService } from 'ngx-toastr';
import { ContactMessage } from '../../models/contact-message';
import { ResponseMessages } from '../../const/response-messages';
import { EmailService } from '../../services/email.service';
import { ReplyModalComponent } from '../reply-modal/reply-modal.component';
import { EmailMessage } from '../../models/email-message';

@Component({
  selector: 'contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit {

  contactMessages: ContactMessage[] = [];
  emailFilter: string = '';
  selectedMessageId: number | null = null;
  selectedMessage: ContactMessage | any;

  @ViewChild(ReplyModalComponent) replyModalComponent!: ReplyModalComponent;

  constructor(
    private contactMessagesService: ContactMessagesService,
    private toastrService: ToastrService,
    private emailService: EmailService) {

  }

  async ngOnInit() {
    await this.getAllContactMessages();
  }

  async getAllContactMessages() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.contactMessagesService.getAllContactMessages();
      if (Succeeded) {
        this.contactMessages = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteContactMessage() {
    if (this.selectedMessageId != null) {
      try {
        var contactMessage = await this.contactMessagesService.getContactMessageById(this.selectedMessageId);
        const { Data, Succeeded, ErrorMessage } = await this.contactMessagesService.deleteContactMessage(this.selectedMessageId);
        if (Succeeded) {
          this.toastrService.success(ResponseMessages.Successfully_deleted_message(contactMessage.Data.Email));
          this.contactMessages = this.contactMessages.filter(message => message.Id !== this.selectedMessageId);
          this.selectedMessageId = null;
          return Data;
        } else {
          this.toastrService.error(ErrorMessage);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      this.toastrService.error(ResponseMessages.Invalid_id("Contact Message"));
      return;
    }
  }

  async sendReply() {
    const emailMessage: EmailMessage = {
      Email: this.selectedMessage.Email,
      Subject: this.selectedMessage.Subject,
      Message: this.replyModalComponent.replyMessage
    };
    try {
      const { Data, Succeeded, ErrorMessage } = await this.emailService.sendEmail(emailMessage);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Reply_sent_successfully(this.selectedMessage.Email));
        this.replyModalComponent.replyMessage = '';
        this.selectedMessage = null;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async filterContactMessagesByEmail(email: string) {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.contactMessagesService.getAllContactMessagesByEmail(email);
      if (Succeeded) {
        this.contactMessages = Data;
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  filterByEmail() {
    if (this.emailFilter.trim() !== '') {
      this.filterContactMessagesByEmail(this.emailFilter.trim());
    } else {
      this.getAllContactMessages();
    }
  }

  getMessageId(id: number) {
    this.selectedMessageId = id;
  }

  openReplyModal(message: ContactMessage) {
    this.selectedMessage = message;
  }

  cancel(): void {
    // No action needed
  }

  formatMessage(message: string): string {
    return message.replace(/\n/g, '<br>');
  }
}
