const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const KEYAUTH_API = "https://keyauth.win/api/1.0/";

const appData = {
  name: "اسم التطبيق بتاعك في KeyAuth",
  ownerid: "الـ OwnerID بتاعك",
};

app.get("/", (req, res) => {
  res.render("index", { result: null });
});

app.post("/check", async (req, res) => {
  const { key } = req.body;

  try {
    const response = await axios.post(KEYAUTH_API, null, {
      params: {
        type: "login",
        key,
        name: appData.name,
        ownerid: appData.ownerid,
      },
    });

    if (response.data.success) {
      res.render("index", { result: "✅ الكي شغال تمام!" });
    } else {
      res.render("index", { result: "❌ الكي غلط أو منتهي." });
    }
  } catch (err) {
    res.render("index", { result: "❌ حصل خطأ أثناء التحقق." });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
