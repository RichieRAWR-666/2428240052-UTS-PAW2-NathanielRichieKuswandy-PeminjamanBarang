
import mongoose from 'mongoose'

const peminjamanSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    borrower_name: {
        type: String,
        required: true
    },
    borrowed_date: {
        type: Date,
        required: true
    },
    is_returned: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Peminjaman = mongoose.model('Peminjaman', peminjamanSchema)

export default Peminjaman
