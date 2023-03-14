import Router from "./router.js";

// function auth(req, res, next) {
//   next()
// }

class WordRouter extends Router {
  init() {
    this.get("/:word", ["ADMIN"], (req, res) => {
      res.sendServerError("Success coderhouse");
    });
  }
}

export default new WordRouter();
