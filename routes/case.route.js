import express from "express"
import caseController from "../controllers/case.controller.js"
import caseIntercetor from "../interceptors/case.interceptor.js"
import { verifyToken } from "../interceptors/verifyToken.js"
import { checkTokenRefresh } from "../interceptors/checkTokenRefresh.js" 

const router = express.Router()

router.use(verifyToken);

router.use(checkTokenRefresh);

router.post("/createcase", caseIntercetor.validateNewCase, caseController.createNewCase)
router.post("/totalcasesAssignedTo/:id", caseIntercetor.validateOfficerId, caseController.getTotalCasesAssigned)
router.get("/getpending", caseController.getpending)
router.get("/getrecent", caseController.getrecent)
router.get("/getcritical", caseController.getcritical)
router.get("/getcompleted", caseController.getcompleted)

export default router