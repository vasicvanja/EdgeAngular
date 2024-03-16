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

  async deleteContactMessage(id: number) {
    try {
      var contactMessage = await this.contactMessagesService.getContactMessageById(id);
      const { Data, Succeeded, ErrorMessage } = await this.contactMessagesService.deleteContactMessage(id);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Successfully_deleted_message(contactMessage.Data.Email));
        this.contactMessages = this.contactMessages.filter(message => message.Id !== id);
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
}
