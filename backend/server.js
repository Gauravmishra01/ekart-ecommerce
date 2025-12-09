import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // ✅ production safe
    credentials: true,
  })
);

// ✅ health check route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ Ekart Backend API is Live");
});

// ✅ routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);

// ✅ server start (Render-safe)
app.listen(PORT, async () => {
  await connectDB(); // ✅ ensures DB connects before traffic
  console.log(`✅ Server is running on port ${PORT}`);
});
