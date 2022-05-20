import express from "express";
import mongoose from "mongoose";
import expressSession from "express-session";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import assetRoutes from "./src/routes/assetRoutes.js";
import companyRoutes from "./src/routes/companyRoutes.js";
import lenderRoutes from "./src/routes/lenderRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import employeeRoutes from "./src/routes/employeeRoutes.js";
import equityRoutes from "./src/routes/equityRoutes.js";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import loanRoutes from "./src/routes/loanRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import lookupRoutes from "./src/routes/lookupRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import getterRoutes from "./src/routes/getterRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import { verifyToken } from "./src/middlewares/authMiddleware.js";
import passport from "passport";
import "./src/utils/passport.js";
// passportModule(passport);

const app = express();
app.use(cors());
app.use(
  expressSession({ secret: "cats", resave: true, saveUninitialized: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginRoutes);

app.use(verifyToken);
app.use("/users", userRoutes);
app.use("/assets", assetRoutes);
app.use("/companies", companyRoutes);
app.use("/lenders", lenderRoutes);
app.use("/customers", customerRoutes);
app.use("/employees", employeeRoutes);
app.use("/equities", equityRoutes);
app.use("/inventories", inventoryRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/loans", loanRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/lookups", lookupRoutes);
app.use("/transactions", transactionRoutes);
app.use("/getters", getterRoutes);

const CONNECTION_URL =
  "mongodb+srv://hassaan:qwerty123@cluster0.n0wch.mongodb.net/fincta?retryWrites=true&w=majority";
const PORT = process.env.PORT || 4500;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
