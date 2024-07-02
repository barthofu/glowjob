import { Module } from '@nestjs/common'
import { MovieModule } from '../movie/movie.module'
import { ScreeningController } from './screening.controller'
import { ScreeningService } from './screening.service'

@Module({
	imports: [MovieModule],
	controllers: [ScreeningController],
	providers: [ScreeningService],
	exports: [ScreeningService],
})
export class ScreeningModule {}
