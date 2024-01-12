import { Router } from "express";
import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("product");
  try {
    const productFetch = await collection.find({}).toArray();
    return res.json({
      message: "Fetch successfully",
      data: productFetch,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Product  has been failed to fetch ${err}`,
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("product");
  const productID = new ObjectId(req.params.id);
  try {
    const product = await collection.findOne({ _id: productID });
    return res.json({
      message: `Fetch data ID:${productID} successfully `,
      data: product,
    });
  } catch {
    return res.status(500).json({
      message: "Product has been failed to fetch",
    });
  }
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("product");
  const { name, price, image, description, category } = req.body;
  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newProduct = {
    name,
    price,
    image,
    description,
    category,
  };
  const productData = { ...newProduct };
  try {
    const product = await collection.insertOne(productData);
    return res.json({
      message: `Product Id:(${product.insertedId}):(${productData.name}) has been created successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Product :(${newProduct.name}) has been failed to create ${err}`,
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("product");
  const { name, price, image, description, category } = req.body;
  const productId = new ObjectId(req.params.id);
  const updatedProduct = {
    name,
    price,
    image,
    description,
    category,
  };
  try {
    await collection.updateOne(
      { _id: productId },
      {
        $set: updatedProduct,
      }
    );
    return res.json({
      message: "updated successfully",
    });
  } catch {
    return res.status(500).json({
      message: `Product :(${updatedProduct.name}) has been failed to update ${err}`,
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("product");
  const productId = new ObjectId(req.params.id);
  try {
    await collection.deleteOne({ _id: productId });
    return res.json({
      message: `Product :(${productId}) has been deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Product :(${productId}) has been failed to delete ${err}`,
    });
  }
});

export default productRouter;
