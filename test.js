import { config } from 'dotenv'
import { pathResolve } from './utils/path.js'

config({ path: pathResolve('../../.env') })