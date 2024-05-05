import AuthForm from "./AuthForm";

export default function Auth({ authType }: { authType: "Signin" | "Signup" }) {
  const heading = authType === "Signup" ? "Create an account" : "Login into your account";

  return (
    <section className="flex flex-1 justify-center h-dvh">
      <div className="signup basis-1/2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">{heading}</h1>
        {authType === "Signup" ? (
          <p className="text-center text-gray-500 mt-1">
            Already have an account? <a className="underline">Login</a>
          </p>
        ) : (
          <p className="text-center text-gray-500 mt-1">
            Don't have an account? <a className="underline">Signup</a>
          </p>
        )}
        <AuthForm auth={authType === "Signin" ? authType : authType} />
      </div>
      <div className="quote bg-slate-100 h-full hidden lg:flex justify-center items-center basis-1/2 ">
        <div className="w-[30rem]">
          <h2 className="font-bold text-xl leading-7 mb-3">
            "The customer service I received was exceptional. The support team went above and beyond to address my
            concerns."
          </h2>
          <p className="font-bold">Jules Winnfield</p>
          <p className="text-slate-400 text-sm">CEO, Acme inc</p>
        </div>
      </div>
    </section>
  );
}
