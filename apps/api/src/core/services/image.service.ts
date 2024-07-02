import { Injectable } from '@nestjs/common'
import { v2 } from 'cloudinary'

@Injectable()
export class ImageService {
	cloudinary = v2

	constructor() {
		this.cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY_CLOUDINARY,
			api_secret: process.env.API_SECRET_CLOUDINARY,
		})
	}

	async uploadToCloudinary(base64: string) {
		return this.cloudinary.uploader.upload(base64)
	}
}
