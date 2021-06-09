import styled from "styled-components";

interface IAvatarProps {
  lg?: boolean;
}

const SAvarat = styled.div<IAvatarProps>`
  width: ${(props) => (props.lg ? "30px" : "20px")};
  height: ${(props) => (props.lg ? "30px" : "20px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }) => {
  return <SAvarat lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvarat>;
};

export default Avatar;
