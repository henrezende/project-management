import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (req.method === "GET") {
      const response = await axios.get(
        `http://localhost:5000/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.status(200).json(response.data);
    } else if (req.method === "PUT") {
      const { name, description } = req.body;
      const response = await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.status(200).json(response.data);
    } else if (req.method === "DELETE") {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
