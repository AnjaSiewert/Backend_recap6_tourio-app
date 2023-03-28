import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      await Place.create(request.body);
      return response.status(201).json({ message: "Place created" });
    } catch (error) {
      return response.status(400).json({ message: "error" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
