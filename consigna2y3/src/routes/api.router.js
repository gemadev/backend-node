import { Router } from 'express'
import { fork } from 'child_process'

const router = Router()

router
  .route('/randoms')
    .get((req, res) => {
      // Calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
      // Por ej: /api/randoms?cant=20000
      // Si dicho parámetro no se ingresa, calcular 100.000.000 números
      const cantidad = parseInt(req.query.cant) || 1000000
      let worker = fork('./src/workers/randoms.js')
      worker.send(cantidad)
      worker.on('message', (randoms) => {
        res.send(randoms)
      })
    })

export default router