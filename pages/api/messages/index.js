import { connectToDatabase } from "../../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const messages = await db
    .collection("Message")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  res.json(messages);
};