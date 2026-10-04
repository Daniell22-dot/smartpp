import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getCartController,
  addToCartController,
  updateCartController,
  removeFromCartController,
  clearCartController
} from "./cart.controller";

const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get("/", getCartController);
cartRouter.post("/", addToCartController);
cartRouter.patch("/:productId", updateCartController);
cartRouter.delete("/clear", clearCartController);
cartRouter.delete("/:productId", removeFromCartController);

export default cartRouter;