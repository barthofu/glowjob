import { z } from 'zod'

export type Paginated<ItemType> = {
    data: ItemType[]
    meta: {
        total: number
        lastPage: number
        currentPage: number
        perPage: number
        prev: number | null
        next: number | null
    }
}

export const createPaginatedResponseSchema = <ItemType extends z.ZodTypeAny>(itemSchema: ItemType) => {
    return z.object({
        data: z.array(itemSchema),
        meta: z.object({
            total: z.number(),
            lastPage: z.number(),
            currentPage: z.number(),
            perPage: z.number(),
            prev: z.number().nullable(),
            next: z.number().nullable(),
        })
    })
}