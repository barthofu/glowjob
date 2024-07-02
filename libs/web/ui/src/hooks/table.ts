import { PaginationState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

const defaultPageIndex = 0
const defaultPageSize = 10

export const useTableQueryHelper = (
	initialData: PaginationState = { pageIndex: defaultPageIndex, pageSize: defaultPageSize }
) => {
	const [pagination, setPagination] = useState<PaginationState>(initialData)
	const [sorting, setSorting] = useState<string>('')
	const [filters, setFilters] = useState<any>({})

	const fetchDataOptions = {
		query: {
			page: (pagination.pageIndex + 1).toString(),
			perPage: pagination.pageSize.toString(),
			// ordering: sorting,
			...filters,
		},
	}

	return {
		pagination,
		setPagination,
		sorting,
		setSorting,
		filters,
		setFilters,
		fetchDataOptions,
	}
}
