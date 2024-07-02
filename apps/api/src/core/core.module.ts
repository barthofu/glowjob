import { Global, Module } from '@nestjs/common'
import { PaymentService } from './services/payment.service'
import { MailingService } from './services/mailing.service'
import { ImageService } from './services/image.service'

@Global()
@Module({
	imports: [],
	exports: [PaymentService, MailingService, ImageService],
	providers: [PaymentService, MailingService, ImageService],
})
export class CoreModule {}
