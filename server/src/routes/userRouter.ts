import {Router} from 'express'
import {getClientes} from '../controllers/userController'

const router = Router()

router.get('/clientes', getClientes)

export default router