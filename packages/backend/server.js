import e from "express";
import cors from "cors";

const app = e();
app.use(cors());
app.use(e.json());
app.use("/backend");

const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log("서버 열림");
});
