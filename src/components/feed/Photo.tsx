import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Comments from "./Comments";
interface IActionProps {
  onClick?: any;
}

const TOGGLE_LIKE = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 0 auto;
  margin-bottom: 60px;
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;
const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;
const PhotoData = styled.div`
  padding: 12px 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div<IActionProps>`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

interface IPhotoProps {
  id: number;
  user: {
    avatar: string;
    username: string;
  };
  file: string;
  isLiked: boolean;
  likes: number;
  caption: string;
  commentNumber: number;
  comments: [
    {
      id: number;
      user: {
        username: string;
        avatar: string;
      };
      payload: string;
      isMine: boolean;
      createdAt: string;
    }
  ];
}

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: IPhotoProps) {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment BSName on Photo {
          isLiked
          likes
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("isLiked" in result && "likes" in result) {
        const { isLiked, likes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment: fragment,
          data: {
            isLiked: !isLiked,
            likes: isLiked ? likes - 1 : likes + 1,
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { id },
    update: updateToggleLike,
  });

  return (
    <div>
      <PhotoContainer key={id}>
        <PhotoHeader>
          <Avatar lg url={user.avatar} />
          <Username>{user.username}</Username>
        </PhotoHeader>
        <PhotoFile src={file} />
        <PhotoData>
          <PhotoActions>
            <div>
              <PhotoAction onClick={toggleLikeMutation}>
                <FontAwesomeIcon
                  style={{ color: isLiked ? "tomato" : "inherit" }}
                  icon={isLiked ? SolidHeart : faHeart}
                />
              </PhotoAction>
              <PhotoAction>
                <FontAwesomeIcon icon={faComment} />
              </PhotoAction>
              <PhotoAction>
                <FontAwesomeIcon icon={faPaperPlane} />
              </PhotoAction>
            </div>
            <div>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </PhotoActions>
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
          <Comments
            author={user.username}
            caption={caption}
            commentNumber={commentNumber}
            comments={comments}
          />
        </PhotoData>
      </PhotoContainer>
    </div>
  );
}

export default Photo;
