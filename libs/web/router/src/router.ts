// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
	| `/`
	| `/admin/movies`
	| `/auth/login`
	| `/auth/logout`
	| `/auth/me`
	| `/auth/register`
	| `/movies/:id`
	| `/reservation/cancel`
	| `/reservation/success`

export type Params = {
	'/movies/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()