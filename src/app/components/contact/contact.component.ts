import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseMessages } from '../../const/response-messages';
import { ContactMessagesService } from '../../services/contact-messages.service';
import { CreateContactMessage } from '../../models/create-contact-message';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @ViewChild('contactForm') contactForm!: NgForm;
  contactMessage: CreateContactMessage = new CreateContactMessage;

  constructor(
    private contactMessagesService: ContactMessagesService,
    private toastrService: ToastrService) {
  }

  async createContactMessage() {
    try {
      if (this.isAnyFieldEmpty()) {
        this.toastrService.error('Please fill in all fields');
        return;
      }
      const { Data, Succeeded, ErrorMessage } = await this.contactMessagesService.createContactMessage(this.contactMessage);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Send_contact_message_success);
        this.contactForm.resetForm();
        this.contactMessage = new CreateContactMessage();
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private isAnyFieldEmpty(): boolean {
    return Object.values(this.contactMessage).some(val => val === null || val === undefined || val === '');
  }
}