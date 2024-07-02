import { Box, Button, HStack, Image, Textarea, VStack } from '@chakra-ui/react'
import { CompleteMovieModel } from '@cinestia/contract'
import { DefaultTableCell, Table, createColumnMeta, useTableQueryHelper } from '@cinestia/web/ui'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { client, queryClient } from '../../core/libs/http'
import { convertBase64, dayjs } from '@cinestia/utils'
import { AdminLayout } from '../../components/layouts'
import { ScreeningsTable } from '../../components/modules'

type CompleteMovie = z.infer<typeof CompleteMovieModel>

const columnHelper = createColumnHelper<CompleteMovie>()

const AdminMoviesPage: React.FC = () => {
	const columns = [
		columnHelper.accessor('title', {
			header: 'Titre',
			meta: createColumnMeta({
				editable: true,
				type: 'text',
			}),
		}),
		columnHelper.accessor('duration', {
			header: 'Durée',
			meta: createColumnMeta({
				editable: true,
				type: 'number',
			}),
		}),
		columnHelper.accessor('releaseDate', {
			header: 'Date de sortie',
			cell: (cell) => (
				<DefaultTableCell {...cell}>{dayjs(cell.getValue()).format('YYYY-MM-DD')}</DefaultTableCell>
			),
			meta: createColumnMeta({
				editable: true,
				type: 'date',
			}),
		}),
		columnHelper.accessor('realisatorId', {
			header: 'Réalisateur',
			meta: createColumnMeta({
				editable: true,
				type: 'text',
			}),
		}),
		columnHelper.accessor('country', {
			header: 'Pays',
			meta: createColumnMeta({
				editable: true,
				type: 'text',
			}),
		}),
		columnHelper.accessor('genre', {
			header: 'Genre',
			meta: createColumnMeta({
				editable: true,
				type: 'text',
			}),
		}),
		// columnHelper.accessor('actors', {
		//     header: 'Acteurs',
		//     meta: createColumnMeta({
		//         editable: true,
		//         type: 'text'
		//     })
		// }),
		columnHelper.accessor('popularity', {
			header: 'Popularité',
			meta: createColumnMeta({
				editable: true,
				type: 'number',
			}),
		}),
		columnHelper.accessor('featured', {
			header: 'A la une',
			meta: createColumnMeta({
				editable: true,
				type: 'boolean',
			}),
		}),
	]

	const posterInputRef = useRef<HTMLInputElement>(null)
	const handlePosterButtonClick = () => {
		posterInputRef.current?.click()
	}

	const backgroundInputRef = useRef<HTMLInputElement>(null)
	const handleBackgroundButtonClick = () => {
		backgroundInputRef.current?.click()
	}

	const { pagination, setPagination, fetchDataOptions } = useTableQueryHelper()

	const { data, isLoading, refetch } = queryClient.movies.getMovies.useQuery(
		['admin-movies', pagination],
		fetchDataOptions
	)

	return (
		<AdminLayout
			title='Dashboard'
		>
			<Table<CompleteMovie>
				columns={columns}
				data={data?.body}
				loading={isLoading}
				pagination={{
					state: pagination,
					setState: setPagination,
				}}
				editable={{
					enabled: true,
					onRowUpdate: async (row, newData) => {
						queryClient.movies.updateMovie
							.mutation({
								params: { id: String(row.original.id) },
								body: {
									data: newData as any,
								},
							})
							.then(({ status }) => {
								if (status === 200) {
									refetch()
									toast.success('Film mis à jour')
								} else throw new Error()
							})
							.catch(() => {
								toast.error('Erreur lors de la mise à jour du film')
							})
					},
				}}
				rowSelection={{
					enabled: true,
					selectionActionComponent: ({ checkedItems, resetSelection }) => (
						<Box>
							<Button
								size='sm'
								colorScheme='red'
								borderRadius='4px'
								variant='solid'
								onClick={async () => {
									queryClient.movies.bulkDeleteMovies
										.mutation({
											body: checkedItems.map((item) => String(item.original.id)),
										})
										.then(({ status }) => {
											if (status === 200) {
												resetSelection()
												refetch()
												toast.success('Films supprimés avec succès')
											} else throw new Error()
										})
										.catch(() => toast.error('Erreur lors de la suppression des films'))
								}}
							>
								Supprimer
							</Button>
						</Box>
					),
				}}
				newRow={() => {
					queryClient.movies.createMovie
						.mutation({
							body: {
								data: {
									title: '',
									duration: 0,
									releaseDate: dayjs().toISOString(),
									country: '',
									genre: '',
									actors: {
										create: [],
									},
									popularity: 0,
									featured: false,
								},
							},
						})
						.then(({ status }) => {
							if (status === 201) {
								refetch()
								// go to last page
								setPagination({
									...pagination,
									pageIndex: data?.body.meta.lastPage ? data.body.meta.lastPage - 1 : 0,
								})
								toast.success('Film créé avec succès')
							} else throw new Error()
						})
						.catch(() => toast.error('Erreur lors de la création du film'))
				}}
				rowExpansion={{
					enabled: true,
					renderComponent: ({ row }) => {
						const updateSynopsis = (newSynopsis: string) => {
							if (row.original.synopsis !== newSynopsis) {
								queryClient.movies.updateMovie
									.mutation({
										params: { id: String(row.original.id) },
										body: { data: { synopsis: newSynopsis } },
									})
									.then(({ status }) => {
										if (status === 200) {
											refetch()
											toast.success('Description mise à jour')
										} else throw new Error()
									})
									.catch(() => toast.error('Erreur lors de la mise à jour de la description'))
							}
						}

						const updateImage = async (type: 'poster' | 'background', file: File) => {
							const base64 = await convertBase64(file)

							client.movies
								.updateMovieImage({
									params: { id: String(row.original.id) },
									body: {
										field: type,
										base64: base64 as string,
									},
								})
								.then(({ status }) => {
									if (status === 200) {
										refetch()
										toast.success('Image mise à jour')
									} else throw new Error()
								})
								.catch(() => toast.error("Erreur lors de la mise à jour de l'image"))
						}

						return (
							<HStack w='100%'>
								<VStack
									w='100%'
									bg='primary.90'
									padding='1em'
								>
									<HStack
										h='100%'
										w='100%'
										mb='2em'
									>
										<Image
											src={row.original.poster?.url}
											fallbackSrc='https://via.placeholder.com/360x640'
											width='7.5em'
											borderRadius='5px'
											onClick={() => {
												handlePosterButtonClick()
											}}
											cursor='pointer'
											transition='all 0.1s ease-in-out'
											_hover={{
												filter: 'brightness(0.8)',
											}}
										/>
										<input
											type='file'
											id='poster'
											multiple={false}
											style={{ display: 'none' }}
											ref={posterInputRef}
											onChange={(e) => {
												if (e.target.files?.[0]) {
													updateImage('poster', e.target.files[0])
												}
											}}
										/>

										<Image
											src={row.original.background?.url}
											fallbackSrc='https://via.placeholder.com/640x360'
											height='10em'
											borderRadius='5px'
											onClick={() => {
												handleBackgroundButtonClick()
											}}
											cursor='pointer'
											transition='all 0.1s ease-in-out'
											_hover={{
												filter: 'brightness(0.6)',
											}}
										/>
										<input
											type='file'
											id='background'
											multiple={false}
											style={{ display: 'none' }}
											ref={backgroundInputRef}
											onChange={(e) => {
												if (e.target.files?.[0]) {
													updateImage('background', e.target.files[0])
												}
											}}
										/>

										<Textarea
											defaultValue={row.original.synopsis || ''}
											onBlur={(e) => updateSynopsis(e.target.value)}
											rows={7}
											h='100%'
											fontSize='sm'
											borderColor='primary.100'
											backgroundColor='primary.100'
										/>
									</HStack>

									{/* Screenings table */}
									<ScreeningsTable
										screenings={row.original.screenings}
										movieId={row.original.id}
										refetch={refetch}
										isLoading={isLoading}
									/>
								</VStack>
							</HStack>
						)
					},
				}}
				styling={{
					table: {
						variant: 'simple',
						colorScheme: 'primary',
					},
					row: {
						height: '4em',
					},
				}}
			/>
		</AdminLayout>
	)
}

export default AdminMoviesPage
