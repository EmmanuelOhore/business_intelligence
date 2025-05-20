"use client";
import Inputfield from "@/components/ui/inputfields";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../context/AuthContext";
import { loginValidationSchema } from "../constants/schemas";
import { registrationSchema } from "../constants/schemas";

type UserType = {
  email: string;
  password: string;
  name: string;
};
const Home = () => {
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(false);
  const { setUser, setIsAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center p-2">
        <section className="relative overflow-hidden outline-2 w-[60%] h-[80vh] rounded-[30px] shadow-2xl max-laptop:w-[80%] max-tablet:w-[90%] max-phoneL:h-[95vh] max-phoneL:rounded-[20px] max-phoneP:w-full max-phoneP:rounded-md ">
          {/* login section of the page */}
          <article
            className={`${
              active ? "right-[50%] delay-75" : ""
            } z-1 bg-white p-8 absolute flex justify-center items-center right-0 w-[50%] h-full transition-all duration-500 ease-in-out  max-phoneL:w-[100%] max-phoneL:h-[70%] max-phoneL:top-0 max-phoneL:left-0 max-phoneP:p-2 ${
              active ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col w-full gap-6 ">
              <h2 className="text-3xl font-bold text-center text-black/80 max-tablet:text-2xl">
                Login
              </h2>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  rememberMe: false,
                }}
                validationSchema={loginValidationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    setSubmitting(true);
                    // Simulate a delay for the submission
                    setTimeout(() => {
                      // gets the stored user data from local storage
                      const storedUser = localStorage.getItem("auth_user");
                      // checks if the user already exists
                      const User = JSON.parse(storedUser || "[]")?.find(
                        (user: UserType) =>
                          user.email === values.email &&
                          user.password === values.password
                      );
                      if (!User) {
                        toast.error("Invalid email or password");
                        setSubmitting(false);
                        resetForm();
                        return;
                      } else {
                        setUser(User);
                        // getting the user session data
                        const sessionData = {
                          user: User,
                          rememberMe: values.rememberMe,
                          loginTime: new Date().getTime(),
                        };
                        localStorage.setItem(
                          "session",
                          JSON.stringify(sessionData)
                        );
                      }
                      setIsAuthenticated(true);
                      setSubmitting(false);
                      resetForm();
                      toast.success("Login successful");
                      // Redirect to the dashboard page
                      router.push("/overview");
                    }, 2000);
                  } catch (error) {
                    toast.error("Login failed");
                    setSubmitting(false);
                    console.log(error);
                  }
                }}
              >
                {({ handleSubmit }) => (
                  <Form className=" w-full" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-4 max-tablet:gap-2">
                      <Inputfield
                        type="email"
                        name="email"
                        label="Email address"
                        placeholder="Enter your email address"
                      />
                      <Inputfield
                        type="password"
                        name="password"
                        icon="fa-eye"
                        label="Password"
                        placeholder="Choose your Password"
                      />
                      <div className="flex items-center gap-2">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          id="rememberMe"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-sm text-black/80 max-tablet:text-xs"
                        >
                          Keep me logged in
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="bg-[#7494ec] capitalize w-full text-white  py-2 px-4 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            <span className="text-white">Signing...</span>
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                      <section className="flex flex-col items-center gap-4 max-tablet:gap-1 max-phoneL-gap-0">
                        <p className="text-mainblue text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px]">
                          Forgot your Password ?
                        </p>
                        <article className="flex flex-col gap-4 items-center">
                          <p className="max-tablet:text-sm font-medium text-black/50 max-tablet:text-[13px] max-phoneL:text-[11px]">
                            {" "}
                            Login with social Platforms
                          </p>
                          <div className="flex gap-3">
                            <i className="fa-brands fa-google border border-black/60 p-2 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3 "></i>
                            <i className="fa-brands fa-facebook-f border border-black/60 p-2 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3  "></i>
                            <i className="fa-brands fa-linkedin-in border border-black/60 p-2 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3  "></i>
                            <i className="fa-brands fa-github border border-black/60 p-2 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3  "></i>
                          </div>
                        </article>
                      </section>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </article>
          {/* Registraion section of the page */}
          <article
            className={`${
              !active ? "!flex left delay-75 z-2" : ""
            } p-8 absolute  justify-center items-center w-[50%] h-full right-0 transition-all duration-500 ease-in-out max-phoneL:w-[100%] max-phoneL:h-[70%] max-phoneL:bottom-0 max-phoneL:left-0  max-phoneP:p-2 ${
              active ? "hidden" : "block"
            }`}
          >
            <div className="flex flex-col w-full gap-6 ">
              <h2 className="text-3xl font-bold text-center text-black/80 max-tablet:text-2xl">
                Registration
              </h2>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={registrationSchema}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    setSubmitting(true);
                    // Simulate a delay for the submission
                    setTimeout(() => {
                      // gets the stored user data from local storage
                      const storedUser = localStorage.getItem("auth_user");
                      // checks if the user already exists
                      const userExists = JSON.parse(storedUser || "[]")?.some(
                        (user: UserType) => user.email === values.email
                      );
                      console.log(userExists);
                      if (userExists) {
                        toast.error("User already exists");
                        setSubmitting(false);
                        resetForm();
                        return;
                      }
                      // If the user does not exist, add the new user to local storage
                      const allUsers = storedUser ? JSON.parse(storedUser) : [];
                      allUsers.push(values);
                      localStorage.setItem(
                        "auth_user",
                        JSON.stringify(allUsers)
                      );

                      console.log(values);
                      toast.success("Registration successful");
                      resetForm();
                      setSubmitting(false);
                      setActive(!active);
                    }, 3000);
                  } catch (error) {
                    toast.error("Registration failed");
                    setSubmitting(false);
                    console.log(error);
                  }
                }}
              >
                {({ handleSubmit }) => (
                  <Form className=" w-full" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-4 max-tablet:gap-2">
                      <Inputfield
                        type="text"
                        name="name"
                        label="Username"
                        placeholder="Enter your User Name"
                      />
                      <Inputfield
                        type="email"
                        name="email"
                        label="Email address"
                        placeholder="Enter your email address"
                      />
                      <Inputfield
                        type="password"
                        name="password"
                        icon="fa-eye"
                        label="Password"
                        placeholder="Choose your Password"
                      />

                      <button
                        type="submit"
                        className="bg-[#7494ec] capitalize w-full text-white  py-2 px-4 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            <span className="text-white">
                              Creating Account...
                            </span>
                          </>
                        ) : (
                          "Register"
                        )}
                      </button>
                      <section className="flex flex-col items-center gap-4 max-tablet:gap-1 max-phoneL-gap-0">
                        <p className="text-mainblue text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px]">
                          Forgot your Password ?
                        </p>
                        <article className="flex flex-col gap-3 items-center">
                          <p className="text-black/50 text-sm font-medium max-tablet:text-[13px] max-phoneL:text-[11px]">
                            Register with social Platforms
                          </p>
                          <div className="flex gap-3">
                            <i className="fa-brands fa-google border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3 cd"></i>
                            <i className="fa-brands fa-facebook-f border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3 cd"></i>
                            <i className="fa-brands fa-linkedin-in border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3 cd"></i>
                            <i className="fa-brands fa-github border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60 max-tablet:px-4 max-tablet:py-2 max-phoneP:text-xs max-phoneP:p-2 max-phoneP:px-3 cd"></i>
                          </div>
                        </article>
                      </section>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </article>

          {/* welcome message */}
          <article
            className={clsx(
              "relative w-full h-full before:content-[''] before:absolute before:inset-0 before:w-[300%] before:h-full before:bg-[#7494ec] before:z-2 before:rounded-[150px] max-tablet:before:rounded-[100px] max-phoneL:before:rounded-[50px] max-phoneL:before:h-[300%] max-phoneL:before:w-[100%] max-phoneL:before:left-0 max-phoneL:before:top-[-270%] before:transition-all before:duration-500 before:ease-in-out",
              {
                "before:left-[50%] max-phoneL:before:top-[70%]": active,
                "before:left-[-250%]": !active,
              }
            )}
          >
            <div
              className={`${
                active ? "left-[-50%] delay-75 max-phoneL:!top-[-30%]" : ""
              } absolute z-10  left-0 w-[50%] h-full flex flex-col justify-center items-center text-white transition-all duration-500 ease-in-out max-phoneL:w-[100%] max-phoneL:h-[30%] max-phoneL:top-0 max-phoneL:left-0  `}
            >
              <h1 className="text-4xl font-bold text-center max-tablet:text-3xl max-phoneL:text-2xl">
                Hello, Welcome!
              </h1>
              <p className="text-mainblue my-2 text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px] max-tablet:my-1">
                Don’t have an account?
              </p>
              <div>
                <button
                  onClick={() => setActive(!active)}
                  className="bg-mainblue px-8 capitalize w-full text-white  border-white border py-2 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:mt-1 max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                >
                  Login
                </button>
              </div>
            </div>

            <div
              className={`${
                active ? "!right-0 !delay-75 max-phoneL:!bottom-0 " : ""
              } absolute z-10 w-[50%] right-[-50%] h-full flex flex-col justify-center items-center text-white transition-all duration-500 ease-in-out max-phoneL:w-[100%] max-phoneL:h-[30%] max-phoneL:right-0 max-phoneL:bottom-[-30%]`}
            >
              <h1 className="text-4xl font-bold text-center max-tablet:text-3xl max-phoneL:text-2xl">
                Welcome Back !
              </h1>
              <p className="text-mainblue my-2 text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px] max-tablet:my-1">
                Already have an account?
              </p>
              <div>
                <button
                  onClick={() => setActive(!active)}
                  className=" px-8 capitalize w-full text-white  border-white border py-2 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:mt-1 max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                >
                  Register
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
