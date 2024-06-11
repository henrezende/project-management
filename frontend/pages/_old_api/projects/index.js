import authMiddleware from "@/middleware/auth";
import axios from "axios";

async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const response = await axios.get("http://localhost:5000/api/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default authMiddleware(handler);
