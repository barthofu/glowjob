import { Injectable } from '@nestjs/common'
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { IMailgunClient } from 'mailgun.js/Interfaces'

@Injectable()
export class MailingService {
	private mailgun: Mailgun

	constructor() {
		this.mailgun = new Mailgun(formData)
	}

	createMgClient() {
		return this.mailgun.client({
			username: 'api',
			url: process.env.MG_URL || 'https://api.eu.mailgun.net',
			key: process.env.MG_API_KEY || 'key-yourkeyhere',
		})
	}

	sendSuccessMail(mgClient: IMailgunClient, emailTo: string, subject: string, textToSend: string, htmlBody: string) {
		mgClient.messages
			.create(process.env.MG_DOMAIN || 'domainname', {
				from: 'Cinestia < Cinestia@' + process.env.MG_DOMAIN + '>',
				to: [emailTo],
				subject: subject,
				text: textToSend,
				html: htmlBody,
			})
			.then((msg) => console.log(msg))
			.catch((err) => console.log(err))
	}
}
