import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, formState, clearErrors, getValues } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data: any) => {
    const { username, password } = getValues();

    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please log in",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: { ...data },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "FirstName is required",
            })}
            onChange={clearLoginError}
            name="firstName"
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register()}
            onChange={clearLoginError}
            name="lastName"
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors?.lastName?.message)}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            ref={register({
              required: "Email is required",
            })}
            onChange={clearLoginError}
            name="email"
            type="email"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: "Username is required",
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log In" link={routes.home} />
    </AuthLayout>
  );
};
export default SignUp;
