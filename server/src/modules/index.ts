import { Router } from 'express'

import users from './users/users.route'
import auth from './auth/auth.route'
import task from './task/task.route'

const router: Router = Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/task', task)

export default router
