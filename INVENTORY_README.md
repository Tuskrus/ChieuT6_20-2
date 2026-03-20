# Inventory Management System - NNPTUD-C6

## Overview

This is a complete Inventory Management System implemented in Node.js with Express.js and MongoDB. The system manages product inventory including stock quantities, reservations, and sold items.

## Features

- ✅ Auto-create inventory when a product is created
- ✅ Get all inventories with product details
- ✅ Get inventory by ID with full product information
- ✅ Add stock to inventory
- ✅ Remove stock from inventory
- ✅ Reserve stock (Move from stock to reserved)
- ✅ Mark items as sold (Move from reserved to soldCount)
- ✅ Complete error handling and validation

## Database Schema

### Inventory Model

```javascript
{
  product: ObjectID (ref: product, required, unique),
  stock: Number (default: 0, min: 0),
  reserved: Number (default: 0, min: 0),
  soldCount: Number (default: 0, min: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager
- Postman (for testing API)

### Installation

1. **Install MongoDB**
   - Download and install from: https://www.mongodb.com/try/download/community
   - Start MongoDB service (usually runs on port 27017)
   - Verify connection: `mongosh` or `mongo`

2. **Install Node.js Dependencies**

```bash
cd NNPTUD-C6
npm install
```

3. **Verify MongoDB Connection**

The application will automatically connect to MongoDB on startup. You should see:
```
connected
```

4. **Start the Application**

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get All Inventories

**Request:**
```
GET /api/v1/inventories
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "product": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k0",
        "title": "Product Name",
        "price": 99.99,
        "category": "65a1b2c3d4e5f6g7h8i9j0k2"
      },
      "stock": 100,
      "reserved": 20,
      "soldCount": 50,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Get Inventory by ID

**Request:**
```
GET /api/v1/inventories/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "product": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k0",
      "title": "Product Name",
      "price": 99.99,
      "description": "Product details",
      "category": "65a1b2c3d4e5f6g7h8i9j0k2",
      "images": ["url1", "url2"]
    },
    "stock": 100,
    "reserved": 20,
    "soldCount": 50
  }
}
```

### 3. Add Stock

**Request:**
```
POST /api/v1/inventories/add-stock
Content-Type: application/json

{
  "product": "65a1b2c3d4e5f6g7h8i9j0k0",
  "quantity": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock added successfully",
  "data": {
    "stock": 150,
    "reserved": 20,
    "soldCount": 50
  }
}
```

### 4. Remove Stock

**Request:**
```
POST /api/v1/inventories/remove-stock
Content-Type: application/json

{
  "product": "65a1b2c3d4e5f6g7h8i9j0k0",
  "quantity": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock removed successfully",
  "data": {
    "stock": 90,
    "reserved": 20,
    "soldCount": 50
  }
}
```

### 5. Reserve Stock

**Request:**
```
POST /api/v1/inventories/reservation
Content-Type: application/json

{
  "product": "65a1b2c3d4e5f6g7h8i9j0k0",
  "quantity": 15
}
```

**Response:**
```json
{
  "success": true,
  "message": "Stock reserved successfully",
  "data": {
    "stock": 85,
    "reserved": 35,
    "soldCount": 50
  }
}
```

### 6. Mark as Sold

**Request:**
```
POST /api/v1/inventories/sold
Content-Type: application/json

{
  "product": "65a1b2c3d4e5f6g7h8i9j0k0",
  "quantity": 10
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inventory marked as sold successfully",
  "data": {
    "stock": 85,
    "reserved": 25,
    "soldCount": 60
  }
}
```

### 7. Create Product (Auto Creates Inventory)

**Request:**
```
POST /api/v1/products
Content-Type: application/json

{
  "title": "New Product",
  "price": 99.99,
  "description": "Product description",
  "categoryId": "CATEGORY_ID",
  "images": ["image_url"]
}
```

**Response:**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k0",
  "title": "New Product",
  "slug": "new-product",
  "price": 99.99,
  "description": "Product description",
  "category": "CATEGORY_ID",
  "images": ["image_url"],
  "isDeleted": false,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

> **Note:** When a product is created, a corresponding inventory record is automatically created with stock=0, reserved=0, and soldCount=0.

## Testing with Postman

### Import the Collection

1. Open Postman
2. Click "Import" → "Upload Files"
3. Select `Inventory_Postman_Collection.json`
4. All endpoints will be imported and ready to test

### Test Workflow

1. **Create a Product** first (this will create the inventory)
2. **Get All Inventories** to see the created inventory
3. **Add Stock** to the product
4. **Reserve Stock** to simulate a reservation
5. **Mark as Sold** to complete a sale
6. **Remove Stock** if needed
7. **Get Inventory by ID** to view the final state

## Error Handling

| Status Code | Error | Description |
|------------|-------|-------------|
| 400 | Bad Request | Missing required fields or invalid data |
| 400 | Bad Request | Not enough stock to remove or reserve |
| 400 | Bad Request | Not enough reserved stock to mark as sold |
| 404 | Not Found | Inventory or product not found |
| 500 | Internal Server Error | Database or server error |

## File Structure

```
NNPTUD-C6/
├── schemas/
│   └── inventory.js          # Inventory schema definition
├── controllers/
│   └── inventory.js          # Inventory business logic
├── routes/
│   ├── inventory.js          # Inventory API endpoints
│   └── products.js           # Updated to auto-create inventory
├── app.js                    # Updated to register inventory routes
├── package.json              # Project dependencies
├── Inventory_Postman_Collection.json  # Postman test collection
├── Inventory_Management_Documentation.docx  # Complete documentation
└── README.md                 # This file
```

## Git Commits

### Commit: b4cb629

**Message:** `feat: implement inventory management system`

**Changes:**
- Created `schemas/inventory.js` - Inventory schema with product reference
- Created `controllers/inventory.js` - CRUD and business operations
- Created `routes/inventory.js` - API endpoint definitions
- Updated `routes/products.js` - Auto-create inventory on product creation
- Updated `app.js` - Register inventory routes

## Implementation Details

### Stock Flow

```
Initial State: stock=0, reserved=0, soldCount=0

1. Add Stock
   stock: 0 → 50

2. Reserve Stock
   stock: 50 → 30
   reserved: 0 → 20

3. Mark as Sold
   reserved: 20 → 10
   soldCount: 0 → 10

4. Remove Stock (if needed)
   stock: 30 → 25
```

### Key Features

1. **Automatic Inventory Creation**
   - When a product is created, an inventory is automatically initialized

2. **Complete Stock Tracking**
   - Available stock (stock)
   - Reserved items (reserved)
   - Completed sales (soldCount)

3. **Validation**
   - Cannot remove more stock than available
   - Cannot reserve more than available stock
   - Cannot mark more as sold than reserved

4. **Product Integration**
   - All inventory endpoints return product details
   - Automatic joins using Mongoose populate

## Development Notes

- All endpoints include proper error handling
- Request validation is performed on all endpoints
- Response format is consistent with {success, message, data}
- Timestamps are automatically tracked for all inventory records
- MongoDB transactions could be added for production use

## Support & Documentation

- **Word Documentation:** `Inventory_Management_Documentation.docx`
- **Postman Collection:** `Inventory_Postman_Collection.json`
- **API Examples:** See "Testing with Postman" section above

## License

This project is part of NNPTUD-C6 course work.
