const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')
  

// create main Model
const Item = db.Item
const Category = db.Category

//  get all categories

const getAllItems = async (req, res) => {

    let item = await Item.findAll({
        include: {
            model: Category,
            as: 'category' // Utilisez l'alias défini dans l'association
        }
    });

    res.json(item);

}

// add category
const addItem = async (req, res) => {

    var image = null;
    if (req.file) {
        image = req.file.filename;
    }

    let info = {
        "item_text": req.body.item_text,
        "cost_price": req.body.cost_price,
        "sale_price": req.body.sale_price,
        "quantite": req.body.quantite,
        "image": image,
        "category_id": req.body.category_id,
    }
     
    let item = await Item.create(info);
    if (item) return res.json({ loginStatus: true });
    return res.json({ loginStatus: false, Error: "Query error" });
}

// 3. get single category by id : 
const getItemById = async (req, res) => {
    let id = req.params.id;
    let item = await Item.findOne({
        include: {
            model: Category,
            as: 'category'  
        },
        where: { item_number: id }
    });
      res.json(item);
}



 

// 4. update item

const updateItem = async (req, res) => {
    var image = null;

    const id = req.body.id;
     if (req.file) {
        image = req.file.filename;
        const item = await Item.update({ image: image }, { where: { item_number: id } })
    }

    const item = await Item.update({ item_text: req.body.item_text, cost_price: req.body.cost_price, sale_price: req.body.sale_price
        , category_id: req.body.category_id, quantite: req.body.quantite}, { where: { item_number: id } })

    res.json({ loginStatus: true })

}

// 5. delete product by id

const deleteItem = async (req, res) => 
{

    let id = req.params.id

    await Item.destroy({ where: { item_number: id } })

    res.json({ loginStatus: true })

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true } })

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews = async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}








module.exports = {
    getAllItems,
    addItem,
    getItemById,
    updateItem,
    deleteItem

}