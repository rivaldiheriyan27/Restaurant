const {restaurantController} = require("../controllers/restaurantController")

const errorHandler = require("../middleware/errorHandler");


const router = require("express").Router();

router.get("/foods", restaurantController.getDataFood)
router.get("/food/:food" , restaurantController.detailFood)
router.get("/detailOrder", restaurantController.detailOrder)

router.post("/order/:food", restaurantController.orderCustomer)
router.put("/order/:food" , restaurantController.updateOrder)



router.use(errorHandler);
module.exports = router