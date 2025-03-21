import express from 'express';
import { 
    addAdmin, 
    getAllAdmins, 
    updateAdmin, 
    toggleAdminActive, 
    deleteAdmin 
} from '../controllers/adminController.js';

const router = express.Router();

router.post("/admins", addAdmin);
router.get("/admins", getAllAdmins);
router.put("/admins/:id", updateAdmin);
router.put("/admins/:id/toggle-active", toggleAdminActive);
router.delete("/admins/:id", deleteAdmin);

export default router;
