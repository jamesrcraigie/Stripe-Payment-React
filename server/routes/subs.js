import express from "express";
import { prices, createSubscription, subscriptionStatus } from "../controllers/subs";
import { requireSignin } from "../middlewares"

const router = express.Router();

router.get('/prices', prices);
router.post('/create-subscription', requireSignin, createSubscription)
router.get('/subscription-status', requireSignin, subscriptionStatus)

module.exports = router;