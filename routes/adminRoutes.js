const express = require ("express");

const router = express.Router();
const {promoteUserById,demoteAdminById,getAdminData,getConsumerData,alldata,newUser} = require("../controller/adminController")

router.route("/all").get(alldata)
router.route("/all").post(newUser)
router.route("/consumer").get(getConsumerData)
router.route("/admin").get(getAdminData)

router.route("/consumer/promote/:id").put(promoteUserById)
router.route("/admin/demote/:id").put(demoteAdminById)


module.exports= router;