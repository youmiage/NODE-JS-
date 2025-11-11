const ordersService = require('../services/orders.service');

async function listOrders(req, res, next) {
  try {
    const orders = await ordersService.getAllOrders();
    res.json({ status: 'success', data: orders, count: orders.length });
  } catch (err) { next(err); }
}
async function getOrder(req, res, next) {
  try {
    const order = await ordersService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ status: 'error', message: 'Commande introuvable' });
    res.json({ status: 'success', data: order });
  } catch (err) { next(err); }
}
async function createOrder(req, res, next) {
  try {
    const userId = req.user.id; // ← récupéré depuis auth middleware
     const order = await ordersService.createOrder({ ...req.body, user: userId });
    res.status(201).json({ status: 'success', data: order });
  } catch (err) { next(err); }
}
async function updateOrder(req, res, next) {
  try {
    const updated = await ordersService.updateOrder(req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Commande introuvable' });
    res.json({ status: 'success', data: updated });
  } catch (err) { next(err); }
}
async function deleteOrder(req, res, next) {
  try {
    const deleted = await ordersService.deleteOrder(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Commande introuvable' });
    res.json({ status: 'success', data: deleted });
  } catch (err) { next(err); }
}
module.exports = { listOrders, getOrder, createOrder, updateOrder, deleteOrder };
