var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventory');

// GET all inventories
router.get('/', async function (req, res, next) {
    try {
        let inventories = await inventoryController.GetAllInventory();
        res.status(200).send({
            success: true,
            data: inventories
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// GET inventory by ID (with product details)
router.get('/:id', async function (req, res, next) {
    try {
        let inventory = await inventoryController.GetInventoryById(req.params.id);
        if (inventory) {
            res.status(200).send({
                success: true,
                data: inventory
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Inventory not found'
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// POST - Add stock
router.post('/add-stock', async function (req, res, next) {
    try {
        if (!req.body.product || !req.body.quantity) {
            return res.status(400).send({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }
        
        if (req.body.quantity < 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a positive number'
            });
        }

        let inventory = await inventoryController.AddStock(req.body.product, req.body.quantity);
        res.status(200).send({
            success: true,
            message: 'Stock added successfully',
            data: inventory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// POST - Remove stock
router.post('/remove-stock', async function (req, res, next) {
    try {
        if (!req.body.product || !req.body.quantity) {
            return res.status(400).send({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }
        
        if (req.body.quantity < 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a positive number'
            });
        }

        let inventory = await inventoryController.RemoveStock(req.body.product, req.body.quantity);
        res.status(200).send({
            success: true,
            message: 'Stock removed successfully',
            data: inventory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// POST - Reserve stock
router.post('/reservation', async function (req, res, next) {
    try {
        if (!req.body.product || !req.body.quantity) {
            return res.status(400).send({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }
        
        if (req.body.quantity < 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a positive number'
            });
        }

        let inventory = await inventoryController.ReserveStock(req.body.product, req.body.quantity);
        res.status(200).send({
            success: true,
            message: 'Stock reserved successfully',
            data: inventory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

// POST - Mark as sold
router.post('/sold', async function (req, res, next) {
    try {
        if (!req.body.product || !req.body.quantity) {
            return res.status(400).send({
                success: false,
                message: 'Product ID and quantity are required'
            });
        }
        
        if (req.body.quantity < 0) {
            return res.status(400).send({
                success: false,
                message: 'Quantity must be a positive number'
            });
        }

        let inventory = await inventoryController.MarkAsSold(req.body.product, req.body.quantity);
        res.status(200).send({
            success: true,
            message: 'Inventory marked as sold successfully',
            data: inventory
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
