import styled from "styled-components";
import { FatText } from "../shared";

const CommentsContainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface ICommentProps {
  author: string;
  payload: string;
}

function Comment({ author, payload }: ICommentProps) {
  return (
    <CommentsContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentsContainer>
  );
}

export default Comment;
