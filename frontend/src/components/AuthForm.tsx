import { FormEvent, useState } from "react";
import { SignupType } from "iamnitzz-common-module";

const AuthForm = ({ auth }: { auth: string }) => {
  const [userCredentials, getUserCredentials] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const onUserCredentialsSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="w-[20rem] mt-3" onSubmit={onUserCredentialsSubmit}>
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
      <button className="bg-slate-900 text-white text-center w-full p-1 rounded-md mt-1">{auth}</button>
    </form>
  );
};

export default AuthForm;
