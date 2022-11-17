import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const meetupData = JSON.parse(req.body);
    console.log(meetupData);

    const client = await MongoClient.connect(
      "mongodb+srv://Aaron1299:2pBGMab0FbouZUlB@cluster0.cst0jtd.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const database = client.db();
    const meetupsCollection = database.collection("meetups");
    const result = await meetupsCollection.insertOne(meetupData);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
