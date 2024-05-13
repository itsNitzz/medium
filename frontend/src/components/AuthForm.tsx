import { FormEvent, useState } from "react";
import { SignupType } from "iamnitzz-common-module";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = ({ auth }: { auth: string }) => {
  const navigate = useNavigate();

  const [userCredentials, getUserCredentials] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<null | string>(null);
  console.log(error);

  // on auth form submit
  const onUserCredentialsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isSuccess = userCredentials.email && userCredentials.password;

    if (!isSuccess) return setError("Incorrect credentials!");

    const userData =
      auth === "Signup" ? userCredentials : { email: userCredentials.email, password: userCredentials.password };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8787/api/v1/user/${auth === "Signup" ? "signup" : "signin"}`,
        userData
      );

      sessionStorage.setItem("token", response.data.token);

      setError(null);

      navigate("/blogs");
    } catch ({ response }) {
      setError(response.data.message);
    }
  };

  return (
    <form className="w-[20rem] mt-3" onSubmit={onUserCredentialsSubmit}>
      {error && <p className="text-red-400 font-medium">{error}</p>}
      {auth === "Signup" ? (
        <div className="flex flex-col gap-1 mb-3">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            className="border w-full rounded-md p-1"
            id="username"
            type="text"
            name="username"
            value={userCredentials.name}
            placeholder="Username"
            onChange={(e) => {
              getUserCredentials((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-medium" htmlFor="email">
          Email
        </label>
        <input
          className="border w-full rounded-md p-1"
          id="email"
          type="text"
          name="email"
          value={userCredentials.email}
          placeholder="Email"
          onChange={(e) => {
            getUserCredentials((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label className="font-medium" htmlFor="password">
          Password
        </label>
        <input
          className="border w-full rounded-md p-1"
          id="pasword"
          type="password"
          placeholder="Password"
          name="password"
          value={userCredentials.password}
          onChange={(e) => {
            getUserCredentials((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </div>
      <button className="bg-slate-900 text-white text-center w-full p-1 rounded-md mt-1 active:brightness-[80%]">
        {auth}
      </button>
    </form>
  );
};

export default AuthForm;
