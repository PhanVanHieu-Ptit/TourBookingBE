const express = require("express");
const JWT = require("../utils/_JWT");
const token = require("../utils/token");
const router = express.Router();
const orderController = require("../controllers/OrderTourController");
const { authenticateToken } = require("../middlewares/authentication");

// orderController.index;
router.get("/get-bill", authenticateToken, orderController.getBill);
router.get("/number-order", authenticateToken, orderController.getNumberOrder);
router.get("/list", authenticateToken, orderController.filter);
router.get("/ordered-tour", authenticateToken, orderController.orderedTour);
// router.get("/list", orderController.list);
router.get("/find", authenticateToken, orderController.find);
router.post("/order", authenticateToken, orderController.order);
router.put("/:id/update", authenticateToken, orderController.update);
router.get("/:id/detail", authenticateToken, orderController.detail);
router.patch(
  "/:id/confirm-using",
  authenticateToken,
  orderController.confirmUsing
);
router.patch("/:id/confirm-cancel", authenticateToken, orderController.cancel);
router.patch("/:id/confirm", authenticateToken, orderController.confirm);
router.patch("/:id/cancel", authenticateToken, orderController.cancel);
router.patch("/:id/customer-cancel", authenticateToken, orderController.cancel);
router.patch(
  "/:id/customer-need-cancel",
  authenticateToken,
  orderController.customerNeedCancel
);

module.exports = router;
