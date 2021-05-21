import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
const BottomBox = styled(WhiteBox)`
  padding: 20px 0;
  text-align: center;
`;

const Login = () => {
  return (
    <Container>
      <div>
        <TopBox>
          <h1>Instagram</h1>
          <form action="">
            <input type="text" placeholder="username" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Log In" />
          </form>
          <span>Or</span>
          <span>Log in with Facebook</span>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>
          <a href="#">Sign up</a>
        </BottomBox>
      </div>
    </Container>
  );
};

export default Login;
