const express = require('express')
const { getAllCars, getSingleCar, addCar, updateCar, removeCar } = require('../controllers/carController')

const router = express.Router()


router.get('/',getAllCars)
.get('/:id',getSingleCar)
.post('/',addCar)
.put('/:id',updateCar)
.delete('/:id',removeCar)

module.exports = router