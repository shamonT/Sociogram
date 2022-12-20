import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
 import adminRoutes from "./routes/adminRoutes.js"
import { register } from "./controllers/controller/auth.js";
import { createPost } from "./controllers/controller/posts.js";
import { verifyToken } from "./controllers/middleware/auth.js";

//dummy

// import User from "./controllers/models/User.js";
// import post from "./controllers/models/Post.js";
// import { users ,posts} from "./controllers/data/index.js";

//CONFIGURATIONS//

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  "/assets",
  express.static(path.join(__dirname, "client/public/assets"))
);

// filestorage//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//routes with files//
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);
app.use("/admin",adminRoutes)

// app.use("/admin",adminRoutes);
//mongooose

const PORT = process.env.port || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server port:${PORT}`));
    //add data one time
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error}did not connect`));
