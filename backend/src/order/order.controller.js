import Order from "./order.model.js";

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the given email" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getOrderByEmail", error);
    res.status(500).json({ message: error.message });
  }
};

export { createOrder, getOrderByEmail };
