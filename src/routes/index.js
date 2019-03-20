import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send({
    title: 'rootPage'
  });
});

export default router;
