
import { z } from 'zod'

export const createPeminjamanSchema = z.object({
    item_name: z.string().trim().min(1, 'Nama barang wajib diisi'),
    borrower_name: z.string().trim().min(1, 'Nama peminjam wajib diisi'),
    borrowed_date: z.coerce.date(),
    is_returned: z.boolean()
})
