const { Signup, Login, BookForm,uploadImage, Box, Recommendations } = require("../Controllers/AuthController");
const { userVerification } = require("../MiddleWares/AuthMiddleware");
const router = require("express").Router();
const upload = require("../uploads/multer");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/upload-image",upload.single("image"),uploadImage);
router.post("/bookform", BookForm);
router.get("/:id", Box);
router.get("/recommendations", Recommendations);

module.exports = router;