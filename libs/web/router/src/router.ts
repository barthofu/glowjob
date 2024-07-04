// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
	| `/`
	| `/500`
	| `/auth/login`
	| `/auth/logout`
	| `/auth/register`
	| `/offers/:id`
	| `/users/favoffers`
	| `/users/profile`

export type Params = {
	'/offers/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<
	Path,
	Params,
	ModalPath
>()
export const { redirect } = utils<Path, Params>()
