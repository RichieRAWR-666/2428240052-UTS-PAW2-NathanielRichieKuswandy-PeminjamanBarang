
import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'

import peminjamanRoutes from './peminjaman.routes.js'

const router = express.Router()


router.get('/welcome', WelcomeController.welcome)


router.use('/peminjaman', peminjamanRoutes)


router.post('/users', UserController.store)


router.post('/upload', upload.single('file'), UploadController.store)

export default router
