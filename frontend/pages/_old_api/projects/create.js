import axios from "axios";

export default async function handler(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const { name, description } = req.body;
  try {
    const response = await axios.post(
      "http://localhost:5000/api/projects",
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
