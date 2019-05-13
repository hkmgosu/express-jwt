'use strict'

const express = require('express')
const http = require('http')
const jwt = require('express-jwt')

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3001
const users = [{ name: 'Juan', lastname: 'Dox' }, { name: 'Mari', lastname: 'Dolores' }]
//creando el secret
const secret  = { secret: process.env.SECRET || 'example' }

app.get('/api/users', jwt(secret),(req, res) => {
  //validando que el usuario sea admin
  if(req.user.admin){
    return res.status(200).send(users)
  }
  //respuesta para el usuario que no es admin
  res.status(401).send({ message: 'not authorized' })
})

server.listen(PORT, () => console.log(`server runnig in http://localhost:${PORT}`))