import { Injectable } from '@nestjs/common'
import { Stripe } from 'stripe'

type ProductData = Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData

@Injectable()
export class PaymentService {
	private stripe: Stripe

	private readonly config = {
		currency: 'EUR',
	}

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_API_KEY!, {
			apiVersion: '2023-10-16',
		})
	}

	createCheckout(product: ProductData, amount: number, price: number, email?: string) {
		return this.stripe.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: this.config.currency,
						unit_amount: price,
						product_data: product,
					},
					quantity: amount,
				},
			],
			customer_email: email,
			locale: 'fr',
			mode: 'payment',
			success_url: process.env.CLIENT_BASE_URL + '/reservation/success?checkout_id={CHECKOUT_SESSION_ID}',
			cancel_url: process.env.CLIENT_BASE_URL + '/reservation/cancel?checkout_id={CHECKOUT_SESSION_ID}',
		})
	}
}
