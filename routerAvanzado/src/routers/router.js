import express from "express";
import jwt from "jsonwebtoken";

export default class Router {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {}
  getRouter() {
    return this.router;
  }
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks),
    );
  }

  post(path, ...callbacks) {
    this.router.post(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
  }
  put(path, ...callbacks) {
    this.router.put(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
  }
  delete(path, ...callbacks) {
    this.router.delete(path, this.generateCustomResponse, this.applyCallbacks(callbacks));
  }

  generateCustomResponse(req, res, next) {
    res.sendSuccess = (payload) => res.send({ status: "Success", payload });
    res.sendUserError = (error) => res.send({ status: "User error", error });
    res.sendServerError = (error) => res.send({ status: "Server error", error });
    next();
  }

  handlePolicies = (policies) => (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(403).send("Problema de autenticación");
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);
    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).send("Sin autorización");
    req.user = user;
    next();
  };
}
