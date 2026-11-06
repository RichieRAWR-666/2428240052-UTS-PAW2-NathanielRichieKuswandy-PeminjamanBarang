import { Router } from 'express'

import {
    createPeminjaman,
    getAllPeminjaman,
    getPeminjamanById,
    updatePeminjaman,
    deletePeminjaman
} from '../controllers/peminjaman.controller.js'

const router = Router()

router.post('/', createPeminjaman)
router.get('/', getAllPeminjaman)
router.get('/:id', getPeminjamanById)
router.put('/:id', updatePeminjaman)
router.delete('/:id', deletePeminjaman)

console.log('Peminjaman routes berhasil dimuat')

export default router