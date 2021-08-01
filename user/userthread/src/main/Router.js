const express = require("express");
const cors = require("cors");

module.exports = ({ authRoutes, customerRoutes, discountRoutes }) => {
  const router = express.Router();
  router.use(express.static("public"));
  router.use(cors({ exposedHeaders: "auth-token" }));
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));

  router.use("/auth", authRoutes);
  router.use("/customer", customerRoutes);
  router.use("/discount", discountRoutes);
  return router;
};
