const {restaurantController} = require("../controllers/restaurantController")

const errorHandler = require("../middleware/errorHandler");


const router = require("express").Router();

router.get("/", restaurantController.getDataFood)



router.use(errorHandler);
module.exports = router