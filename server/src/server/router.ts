import { Router } from "express";
import { getBuyers, postRecords } from "./controllers";



const router = Router();


router.get("/", (_req, res) => {
  res.render("index.html.ejs");
});

router.post("/api/records", postRecords);

router.get("/api/buyers", getBuyers);


export default router;