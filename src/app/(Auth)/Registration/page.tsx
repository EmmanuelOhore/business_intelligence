"use client";
import Inputfield from "@/components/inputfields";
import { toast } from "sonner";
import { useState } from "react";
import clsx from "clsx";
import { Formik, Form } from "formik";
// import * as Yup from "yup";

const Registration = () => {
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <>
      <main className="w-full  flex items-center justify-center">
        <section className="relative overflow-hidden outline-2 w-[60%] h-[80vh] rounded-[30px] shadow-2xl">
          {/* login section of the page */}
          <article
            className={`${
              active ? "right-[50%] delay-75" : ""
            } z-1 bg-white p-8 absolute flex justify-center items-center right-0 w-[50%] h-full transition-all duration-500 ease-in-out ${
              active ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col w-full gap-6 ">
              <h2 className="text-3xl font-bold text-center text-black/80">
                Login
              </h2>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  setSubmitting(true);
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                {({ handleSubmit }) => (
                  <Form className=" w-full" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-4">
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
                          <p> Login with social Platforms</p>
                          <div className="flex gap-3">
                            <i className="fa-brands fa-google border border-black/60 p-2 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-facebook-f border border-black/60 p-2 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-linkedin-in border border-black/60 p-2 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-github border border-black/60 p-2 rounded-[8px] text-base text-black/60"></i>
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
            } p-8 absolute  justify-center items-center w-[50%] h-full right-0 transition-all duration-500 ease-in-out ${
              active ? "hidden" : "block"
            }`}
          >
            <div className="flex flex-col w-full gap-6 ">
              <h2 className="text-3xl font-bold text-center text-black/80">
                Registration
              </h2>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    setSubmitting(true);
                    localStorage.setItem("auth_user", JSON.stringify(values));
                    // Simulate a delay for the submission
                    setTimeout(() => {
                      console.log(values);
                      toast.success("Registration successful");
                      resetForm();
                      setSubmitting(false);
                      setActive(!active);
                    }, 3000);
                  } catch (error) {
                    toast.error("Registration failed");
                    setSubmitting(false);
                  }
                }}
              >
                {({ handleSubmit }) => (
                  <Form className=" w-full" onSubmit={handleSubmit}>
                    <div className=" flex flex-col gap-4">
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
                            <i className="fa-brands fa-google border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-facebook-f border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-linkedin-in border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60"></i>
                            <i className="fa-brands fa-github border border-black/60 p-2 px-4 rounded-[8px] text-base text-black/60"></i>
                          </div>
                        </article>
                      </section>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </article>

          <article
            className={clsx(
              "relative w-full h-full before:content-[''] before:absolute before:inset-0 before:w-[300%] before:h-full before:bg-[#7494ec] before:z-2 before:rounded-[150px] before:transition-all before:duration-500 before:ease-in-out",
              {
                "before:left-[50%]": active,
                "before:left-[-250%]": !active,
              }
            )}
          >
            <div
              className={`${
                active ? "left-[-50%] delay-75" : ""
              } absolute z-10  left-0 w-[50%] h-full flex flex-col justify-center items-center text-white transition-all duration-500 ease-in-out`}
            >
              <h1 className="text-4xl font-bold text-center">
                Hello, Welcome!
              </h1>
              <p className="text-mainblue my-2 text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px]">
                Don’t have an account?
              </p>
              <div>
                <button
                  onClick={() => setActive(!active)}
                  className="bg-mainblue px-8 capitalize w-full text-white  border-white border py-2 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                >
                  Register
                </button>
              </div>
            </div>

            <div
              className={`${
                active ? "!right-0 !delay-75" : ""
              } absolute z-10 w-[50%] right-[-50%] h-full flex flex-col justify-center items-center text-white transition-all duration-500 ease-in-out`}
            >
              <h1 className="text-4xl font-bold text-center">Welcome Back !</h1>
              <p className="text-mainblue my-2 text-sm font-semibold max-tablet:text-[13px] max-phoneL:text-[11px]">
                Already have an account?
              </p>
              <div>
                <button
                  onClick={() => setActive(!active)}
                  className="bg-mainblue px-8 capitalize w-full text-white  border-white border py-2 rounded-md mt-4 max-tablet:text-[15px] max-tablet:font-medium max-phoneL:font-semibold max-phoneL:text-sm max-phoneL:rounded flex justify-center items-center gap-2"
                >
                  Login
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Registration;
