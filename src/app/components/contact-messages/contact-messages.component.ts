import { Component, OnInit } from '@angular/core';
import { ContactMessagesService } from '../../services/contact-messages.service';
import { ToastrService } from 'ngx-toastr';
import { ContactMessage } from '../../models/contact-message';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit {

  contactMessages: ContactMessage[] = [];
  emailFilter: string = '';
  selectedMessageId: number | null = null;

  constructor(
    private contactMessagesService: ContactMessagesService,
    private toastrService: ToastrService) {

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
    }
    else {
      this.toastrService.error(ResponseMessages.Invalid_id("Contact Message"));
      return;
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

  cancelDelete(): void {
    // No action needed
  }
}
