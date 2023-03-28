import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ message: "Place not found" });
    }
    return response.status(200).json(place);
  }
  if ((request.method = "PATCH")) {
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json({ message: "Place updated" });
  }
  if (request.method === "DELETE") {
    const placeToDelete = await Place.findByIdAndDelete(id);

    response.status(200).json(placeToDelete);
  }
}
