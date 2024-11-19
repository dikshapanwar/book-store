import Order from "./order.model.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get orders by email
const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 }).populate({
      path: "productIds",
      select: "title coverImage",
    });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the given email" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getOrderByEmail:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate({
      path: "productIds",
      select: "title coverImage",
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(500).json({ message: error.message });
  }
}
//get one order
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(order)
    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrder:", error);
    res.status(500).json({ message: error.message });
  }
};


export { createOrder, getOrderByEmail,getAllOrders, getOrder };
