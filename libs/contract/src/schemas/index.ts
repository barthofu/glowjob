import {
	MovieModel,
	ScreeningModel,
	ActorModel,
	PictureModel,
	RealisatorModel,
	ReservationModel,
	UserModel,
} from '@cinestia/prisma'

export * from './pagination'

export const ActorWithIcon = ActorModel.extend({
	icon: PictureModel.nullish(),
})

export const MovieWithScreenings = MovieModel.extend({
	screenings: ScreeningModel.array(),
})

export const MovieWithPoster = MovieModel.extend({
	poster: PictureModel.nullish(),
})

export const CompleteMovieModel = MovieModel.extend({
	poster: PictureModel.nullish(),
	realisator: RealisatorModel.nullish(),
	screenings: ScreeningModel.array(),
	actors: ActorWithIcon.array(),
	background: PictureModel.nullish(),
})

export const ReservationWithUser = ReservationModel.extend({
	user: UserModel,
})

export const ScreeningWithMovie = ScreeningModel.extend({
	movie: MovieWithPoster,
})

export const ReservationWithScreening = ReservationModel.extend({
	screening: ScreeningWithMovie,
})

export const UserWithReservations = UserModel.extend({
	reservations: ReservationWithScreening.array(),
}).omit({
	password: true,
})
