
import Peminjaman from '../model/peminjaman.model.js'
import { createPeminjamanSchema } from '../schemas/peminjaman.schema.js'

// CREATE
export async function createPeminjaman(req, res) {
    try {
        const data = createPeminjamanSchema.parse(req.body)

        const peminjaman = new Peminjaman(data)
        await peminjaman.save()

        return res.status(201).json({
            message: 'Data peminjaman berhasil ditambahkan',
            data: peminjaman
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Gagal menambahkan data peminjaman',
            error: error.message
        })
    }
}

// READ ALL + FILTERING + SORTING
export async function getAllPeminjaman(req, res) {
    try {
        const filter = {}

        // Filtering nama barang
        if (req.query.item_name) {
            filter.item_name = {
                $regex: req.query.item_name,
                $options: 'i'
            }
        }

        // Filtering nama peminjam
        if (req.query.borrower_name) {
            filter.borrower_name = {
                $regex: req.query.borrower_name,
                $options: 'i'
            }
        }

        // Filtering status pengembalian
        if (req.query.is_returned !== undefined) {
            if (!['true', 'false'].includes(req.query.is_returned)) {
                return res.status(400).json({
                    message: 'is_returned harus true atau false'
                })
            }

            filter.is_returned = req.query.is_returned === 'true'
        }

        // Filtering tanggal peminjaman
        if (req.query.borrowed_date) {
            const date = new Date(req.query.borrowed_date)

            if (Number.isNaN(date.getTime())) {
                return res.status(400).json({
                    message: 'Tanggal peminjaman tidak valid'
                })
            }

            const start = new Date(date)
            start.setHours(0, 0, 0, 0)

            const end = new Date(date)
            end.setHours(23, 59, 59, 999)

            filter.borrowed_date = {
                $gte: start,
                $lte: end
            }
        }

        // Sorting
        const allowedSortFields = [
            'item_name',
            'borrower_name',
            'borrowed_date',
            'is_returned'
        ]

        const sortBy = allowedSortFields.includes(req.query.sortBy)
            ? req.query.sortBy
            : 'item_name'

        const sort = req.query.sort === 'desc' ? -1 : 1

        // Field selection
        const allowedFields = [
            'item_name',
            'borrower_name',
            'borrowed_date',
            'is_returned'
        ]

        let query = Peminjaman.find(filter)

        if (req.query.fields) {
            const fields = req.query.fields
                .split(',')
                .filter(field => allowedFields.includes(field))

            if (fields.length === 0) {
                return res.status(400).json({
                    message: 'Field yang diminta tidak valid'
                })
            }

            query = query.select(fields.join(' '))
        }

        const data = await query.sort({ [sortBy]: sort })

        return res.status(200).json({
            total: data.length,
            data
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Gagal mengambil data peminjaman',
            error: error.message
        })
    }
}

// READ BY ID
export async function getPeminjamanById(req, res) {
    try {
        const data = await Peminjaman.findById(req.params.id)

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            })
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({
            message: 'ID peminjaman tidak valid',
            error: error.message
        })
    }
}

// UPDATE
export async function updatePeminjaman(req, res) {
    try {
        const data = await Peminjaman.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            })
        }

        return res.status(200).json({
            message: 'Data peminjaman berhasil diperbarui',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Gagal memperbarui data peminjaman',
            error: error.message
        })
    }
}

// DELETE
export async function deletePeminjaman(req, res) {
    try {
        const data = await Peminjaman.findByIdAndDelete(req.params.id)

        if (!data) {
            return res.status(404).json({
                message: 'Data peminjaman tidak ditemukan'
            })
        }

        return res.status(200).json({
            message: 'Data peminjaman berhasil dihapus'
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Gagal menghapus data peminjaman',
            error: error.message
        })
    }
}
