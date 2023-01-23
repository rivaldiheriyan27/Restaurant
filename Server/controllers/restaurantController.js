const {Food,Table,Order} = require("../models");
const order = require("../models/order");

class restaurantController{
    static async getDataFood(req,res,next){
        try{

            const foods = await Food.findAll({
                attributes:{
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            
            res.status(200).json({
                statuscode:200,
                data:foods
            })
        }catch(err){
            next(err)
        }
    }

    static async detailFood(req,res,next){
        try{
            const{food} = req.params;

            console.log(food)
            const dataFoodDetail = await Food.findByPk(food,{
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }    
            })

            console.log(dataFoodDetail)

            res.status(200).json({
                statuscode:200,
                data:dataFoodDetail
            })

        }catch(err){
            next(err)
        }
    }

    static async orderCustomer(req,res,next){
        try{
            const {quantity, numberTable, name} = req.body;
            const {food} = req.params;

            let dataNumber = Number(numberTable)
            let dataQuantity = Number(quantity)
            let dataFood = Number(food)

            const checkTable = await Table.findOne({
                where: {
                    tabelNumber: dataNumber,
                },
                attributes:{
                    exclude: ["createdAt", "updatedAt"],}
              });

            // console.log(checkTable, "ini cek table")
            
            if(!checkTable){
                throw { name: "Table not found" };
            }

            //Check foods
            const checkFood = await Food.findByPk(food,{
                attributes: {
                    exclude: ["createdAt", "updatedAt"],}
                },
            )

            if(!checkFood){
                throw { name: "Food not found" };
            }

            // console.log(checkFood,checkTable)

            let orderInput = {
                TableId: dataNumber,
                FoodId: dataFood,
                quantity:dataQuantity,
                totalPice: dataQuantity * checkFood.price,
                name: name,
                status:"unPaid"
            }
            console.log(orderInput)
            await Order.create(orderInput)

            res.status(201).json({
                statuscode:201,
                message:"Terimakasih sudah mengorder kami"
            })
        }catch(err){
            next(err)
        }
    }

    static async detailOrder(req,res,next){
        try{
            const {name} = req.body;
            // console.log(name)
            const nameCustomer = await Order.findOne({
                where: {
                    name: name,
                },
                attributes:{
                    exclude: ["createdAt", "updatedAt"],}
              }
            )
            if(!nameCustomer){
                throw { name: `Customer not found` }; 
            }

            res.status(200).json({
                data:nameCustomer
            })
        }catch(err){
            next(err)
        }
    }

    static async updateOrder(req,res,next){
        try{
            const {name, quantity} = req.body
            const {food} = req.params

            // console.log(name,quantity,food)

            const dataCustomer = await Order.findOne({
                where: {
                    name: name,
                    status:"unPaid"
                },
            }
            )

            if(!dataCustomer){
                throw {name: `Customer not found`}
            }

            // console.log(dataCustomer, "ini data Customer")

            const dataFood = await Food.findByPk(dataCustomer.FoodId,{
                attributes: {
                    exclude: ["createdAt", "updatedAt"],}
                },
            )

            // console.log(dataFood, "ini data Food")

            const updateDataOrder = { 
                quantity:quantity,
                totalPice: dataFood.price * quantity
            }

            console.log(updateDataOrder)

            await Order.update(updateDataOrder, {
                where:{
                    name:name,
                    status:"unPaid"
                }
            })

            res.status(200).json({
                message: "Update Success"
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports = {restaurantController}
