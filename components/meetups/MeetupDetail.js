const MeetupDetail = (props) => {
  const meetupData = props.meetupData;
  return (
    <>
      <img src={meetupData.image} alt={meetupData.title} />
      <h1>{meetupData.title}</h1>
      <p>{meetupData.description}</p>
    </>
  );
};

export default MeetupDetail;
