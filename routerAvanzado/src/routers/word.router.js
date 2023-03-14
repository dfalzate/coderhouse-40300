import { Router } from "express";
import { WordModel } from "../models/word.model.js";

const router = Router();

router.post(
  "/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%BC%C3%9C]+)",
  async (req, res) => {
    try {
      const { word } = req.params;
      const response = await WordModel.create({ word });
      res.responseError({
        status: "Success",
        word: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
);

router.get(
  "/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%BC%C3%9C]+)",
  async (req, res) => {
    try {
      console.log(req);
      const { word } = req.params;
      const response = await WordModel.findOne({ word });
      res.json({
        status: "Success",
        word: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
);

router.put(
  "/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%BC%C3%9C]+)",
  async (req, res) => {
    try {
      const { word } = req.params;
      const response = await WordModel.findOne({ word });
      res.json({
        status: "Success",
        word: response,
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: error.message,
      });
    }
  },
);

router.get("*", (req, res) => res.send("La ruta no existe"));
router.post("*", (req, res) => res.send("La ruta no existe"));

router.param("word", async (req, res, next, word) => {
  try {
    const _word = await WordModel.findOne({ word });
    req.word = _word;
    next();
  } catch (error) {
    throw new Error(error.message);
  }
});

export default router;
