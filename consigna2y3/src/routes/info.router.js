import { Router } from 'express'

const router = Router()

router
  .route('/')
    .get((req, res) => {
      res.send({
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        node_version: process.version,
        memoria_reservada: process.memoryUsage(),
        excec_path:process.execPath,
        process_id: process.pid,
        project_path: process.cwd()
      })
    })

export default router