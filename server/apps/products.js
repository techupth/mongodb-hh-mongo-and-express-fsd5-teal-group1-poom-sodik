import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();
  return res.json({
    data: products,
  });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  let productId = new ObjectId(req.params.id);
  const product = await collection.findOne({ _id: productId });
  return res.json({
    data: product,
    message: "send",
  });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productsData = { ...req.body };
  const products = await collection.insertOne(productsData);
  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");

  let productId = new ObjectId(req.params.id);
  const newProductsData = { ...req.body };

  const product = await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: newProductsData,
    }
  );
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  let productId = new ObjectId(req.params.id);
  await collection.deleteOne({ _id: productId });
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
