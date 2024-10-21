const express= require("express");
const router = express.Router();

const { addFeatureImage, getFeatureImages } = require("../../controllers/admin/feature") ;


router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);


module.exports = router;