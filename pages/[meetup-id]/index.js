import MeetupDetail from "../../components/meetups/MeetupDetail";
import { ObjectId, MongoClient } from "mongodb";
import Head from "next/head";

const MeetupDetailPage = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail meetupData={props.meetupData} />
    </>
  );
};

export default MeetupDetailPage;

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Aaron1299:2pBGMab0FbouZUlB@cluster0.cst0jtd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const database = client.db();
  const collection = database.collection("meetups");
  const meetupIds = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  console.log(`meetups: ${meetupIds}`);
  const paths = meetupIds.map((meetup) => ({
    params: { "meetup-id": meetup._id.toString() },
  }));
  console.log(`paths: ${paths}`);

  return {
    fallback: false,
    paths: paths,
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params["meetup-id"];

  const client = await MongoClient.connect(
    "mongodb+srv://Aaron1299:2pBGMab0FbouZUlB@cluster0.cst0jtd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const database = client.db();
  const collection = database.collection("meetups");
  const meetupData = await collection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        title: meetupData.title,
        description: meetupData.description,
        address: meetupData.address,
        image: meetupData.image,
        id: meetupData._id.toString(),
      },
    },
  };
};
