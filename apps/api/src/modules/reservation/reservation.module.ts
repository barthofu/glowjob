import { Module } from '@nestjs/common'
import { ReservationController } from './reservation.controller'
import { ReservationService } from './reservation.service'
import { ScreeningModule } from '../screening/screening.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [ScreeningModule, UserModule],
	controllers: [ReservationController],
	providers: [ReservationService],
})
export class ReservationModule {}
