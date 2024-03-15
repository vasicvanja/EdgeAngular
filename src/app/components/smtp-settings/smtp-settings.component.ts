import { Component, OnInit } from '@angular/core';
import { SmtpSettings } from '../../models/smtp-settings';
import { SmtpSettingsService } from '../../services/smtp-settings.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessages } from '../../const/response-messages';

@Component({
  selector: 'smtp-settings',
  templateUrl: './smtp-settings.component.html',
  styleUrls: ['./smtp-settings.component.scss']
})
export class SmtpSettingsComponent implements OnInit {

  smtpSettings: SmtpSettings = new SmtpSettings();
  smtpSettingsForm: FormGroup;
  enableSmtpSettings: boolean = false;
  enableAuthentication: boolean = false;
  enableSsl: boolean = false;

  constructor(
    private smtpSettingsService: SmtpSettingsService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) {
    this.smtpSettingsForm = this.formBuilder.group({
      host: ['', [Validators.required]],
      port: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      senderEmail: ['', Validators.required],
      senderName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      authentication: [false],
      enableSsl: [false],
      enableSmtpSettings: [false]
    });
  }

  async ngOnInit() {
    await this.getSmtpSettings();
  }

  async getSmtpSettings() {
    try {
      const { Data, Succeeded, ErrorMessage } = await this.smtpSettingsService.getSmtpSettings();
      if (Succeeded) {
        this.smtpSettings = Data;
        this.enableSmtpSettings = this.smtpSettings.EnableSmtpSettings;
        this.enableAuthentication = this.smtpSettings.Authentication;
        this.enableSsl = this.smtpSettings.EnableSsl;

        this.smtpSettingsForm.patchValue({
          host: this.smtpSettings.Host,
          port: this.smtpSettings.Port,
          senderEmail: this.smtpSettings.SenderEmail,
          senderName: this.smtpSettings.SenderName,
          username: this.smtpSettings.Username,
          password: this.smtpSettings.Password,
          authentication: this.smtpSettings.Authentication,
          enableSsl: this.smtpSettings.EnableSsl,
          enableSmtpSettings: this.smtpSettings.EnableSmtpSettings
        });
        return Data;
      } else {
        this.toastrService.error(ErrorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateSmtpSettings() {
    if (!this.enableAuthentication) {
      this.smtpSettings.Username = '';
      this.smtpSettings.Password = '';
    }
    if (this.smtpSettingsForm.invalid) {
      return;
    }
    try {
      const { Succeeded, ErrorMessage } = await this.smtpSettingsService.updateSmtpSettings(this.smtpSettings);
      if (Succeeded) {
        this.toastrService.success(ResponseMessages.Update_smtp_success);
      } else {
        this.toastrService.error(ErrorMessage);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  toggleAuthentication() {
    const authenticationEnabled = this.smtpSettings.Authentication;
    if (authenticationEnabled) {
      this.enableAuthentication = true;
    } else {
      this.enableAuthentication = false;
    }
  }

  toggleSmtpSettings() {
    const smtpSettingsEnabled = this.smtpSettings.EnableSmtpSettings;
    if (smtpSettingsEnabled) {
      this.enableSmtpSettings = true;
    } else {
      this.enableSmtpSettings = false;
    }
  }
}
