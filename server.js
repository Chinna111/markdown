import express from "express";
import cors from "cors";
import { marked } from "marked";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/convert", (req, res) => {
  const { markdown } = req.body;
  const html = marked(markdown);
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
