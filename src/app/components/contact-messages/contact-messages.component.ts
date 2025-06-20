import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactMessagesService } from '../../services/contact-messages.service';
import { ToastrService } from 'ngx-toastr';
import { ContactMessage } from '../../models/contact-message';
import { ResponseMessages } from '../../const/response-messages';
import { EmailService } from '../../services/email.service';
import { ReplyModalComponent } from '../reply-modal/reply-modal.component';
import { EmailMessage } from '../../models/email-message';
import { SmtpSettingsService } from '../../services/smtp-settings.service';
import { ModalComponent } from '../modal/modal.component';
import { PagerComponent } from '../pager/pager.component';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss',
  imports: [FormsModule, NgIf, NgFor, PagerComponent, ModalComponent, ReplyModalComponent]
})
export class ContactMessagesComponent implements OnInit {

  contactMessages: ContactMessage[] = [];
  emailFilter: string = '';
  selectedMessageId: number | null = null;
  selectedMessage: ContactMessage | any;
  enableSmtpSettings!: boolean;
  displayedContactMessages: ContactMessage[] = [];
  itemsPerPage: number = 5;

  @ViewChild(ReplyModalComponent) replyModalComponent!: ReplyModalComponent;

  constructor(
    private contactMessagesService: ContactMessagesService,
    private toastrService: ToastrService,
    private emailService: EmailService,
    private smtpSettingsService: SmtpSettingsService) {

  }

  async ngOnInit() {
    await this.getAllContactMessages();
    await this.checkSmtpSettings();
    this.onPageChanged(1);
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
          this.onPageChanged(1);
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
        this.onPageChanged(1); // Update displayed messages to show the first page of the filtered results
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  filterByEmail() {
    if (this.emailFilter.trim() === '') {
      this.onPageChanged(1); // Reset display without re-fetching
    } else {
      this.filterContactMessagesByEmail(this.emailFilter.trim());
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

  async checkSmtpSettings() {
    const smtpSettings = await this.smtpSettingsService.getSmtpSettings();
    this.enableSmtpSettings = smtpSettings.Data.EnableSmtpSettings;
  }

  onPageChanged(page: number) {
    const start = (page - 1) * this.itemsPerPage;
    const end = (start + this.itemsPerPage);
    this.displayedContactMessages = [...this.contactMessages.slice(start, end)];
  }
}
