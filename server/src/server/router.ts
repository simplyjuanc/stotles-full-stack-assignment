import { Router } from "express";
import { getBuyers, postRecords } from "./controllers";


const router = Router();

router.get("/", (_req, res) => res.render("index.html.ejs"));
// TODO Change this to a GET request using query params rather than JSON body
// to free up the POST method for creation of new records
router.post("/api/records", postRecords);
router.get("/api/buyers", getBuyers);


export default router;