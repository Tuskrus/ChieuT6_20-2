let inventoryModel = require('../schemas/inventory');
let productModel = require('../schemas/products');

module.exports = {
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            await newInventory.save();
            return newInventory;
        } catch (error) {
            throw error;
        }
    },

    GetAllInventory: async function () {
        try {
            let inventories = await inventoryModel.find({})
                .populate({ path: 'product', select: 'title price category' });
            return inventories;
        } catch (error) {
            throw error;
        }
    },

    GetInventoryById: async function (id) {
        try {
            let inventory = await inventoryModel.findById(id)
                .populate({ path: 'product', select: 'title price category images description' });
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    AddStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found for this product');
            }
            inventory.stock += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    RemoveStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found for this product');
            }
            if (inventory.stock < quantity) {
                throw new Error('Not enough stock available');
            }
            inventory.stock -= quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    ReserveStock: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found for this product');
            }
            if (inventory.stock < quantity) {
                throw new Error('Not enough stock available to reserve');
            }
            inventory.stock -= quantity;
            inventory.reserved += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    MarkAsSold: async function (productId, quantity) {
        try {
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory not found for this product');
            }
            if (inventory.reserved < quantity) {
                throw new Error('Not enough reserved stock to mark as sold');
            }
            inventory.reserved -= quantity;
            inventory.soldCount += quantity;
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    }
};
