import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 15px;
`;

const CommentCount = styled.span`
  font-size: 10px;
  font-weight: 600;
  margin: 10px 0;
  display: block;
  opacity: 0.7;
`;

interface ICommentsProps {
  author: string;
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

function Comments({
  author: username,
  caption,
  commentNumber,
  comments,
}: ICommentsProps) {
  return (
    <CommentsContainer>
      <Comment author={username} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
}
export default Comments;
