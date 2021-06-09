import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      caption
      likes
      commentNumber
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      createdAt
      isMine
      isLiked
      file
    }
  }
`;

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
