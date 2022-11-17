import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Brwose a huge list of highly active React meetups nearby"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export const getServerSideProps = async (context) => {
//     const res =  context.res
//     const req = context.req

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Aaron1299:2pBGMab0FbouZUlB@cluster0.cst0jtd.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const database = client.db();
  const collection = database.collection("meetups");
  const meetups = await collection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
