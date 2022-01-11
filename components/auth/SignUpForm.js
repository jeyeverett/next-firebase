import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "lib/context";
import toast from "react-hot-toast";

import Loader from "@/util/Loader";

export default function SignUpForm() {
  const { updateLoading } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [signIn, setSignIn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
  });

  const signUpWithEmail = async ({ email, password }) => {
    const auth = getAuth();

    try {
      updateLoading(true);
      if (signIn) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      reset({ email, password });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("That email is already in use.");
      }
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        toast.error("Wrong email or password.");
      }

      updateLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(signUpWithEmail)}
      className="flex flex-col items-center p-4 mb-2 mx-auto w-min border border-gray-300 rounded"
    >
      <fieldset className="flex flex-col mb-4">
        <label
          htmlFor="email"
          className={`text-sm font-medium uppercase tracking-wider ${
            errors.email ? "text-red-600" : "text-gray-700"
          }`}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue=""
          className={`border rounded-sm shadow-sm py-1 px-2 text-gray-700 ${
            errors.email ? "border-red-300" : "border-gray-300"
          }`}
          {...register("email", {
            required: { value: true, message: "Email is required." },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email.",
            },
          })}
        />
      </fieldset>
      <fieldset className="flex flex-col mb-4">
        <label
          htmlFor="password"
          className={`text-sm font-medium uppercase tracking-wider ${
            errors.password ? "text-red-600" : "text-gray-700"
          }`}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          defaultValue=""
          className={`border rounded-sm shadow-sm py-1 px-2 text-gray-700 ${
            errors.password ? "border-red-300" : "border-gray-300"
          }`}
          {...register("password", {
            pattern: {
              value: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,32})"
              ),
              message: `Password must include:  one digit, one lowercase character, one uppercase character and at least one special character.`,
            },
            maxLength: { value: 32, message: "Password is too long." },
            minLength: { value: 8, message: "Password is too short." },
            required: { value: true, message: "Password is required." },
          })}
        />
      </fieldset>

      {error && (
        <p className="text-gray-700 text-sm mb-1 self-start font-medium">
          {error}
        </p>
      )}

      {errors.email && (
        <p className="text-gray-700 text-sm mb-1 self-start font-medium">
          {errors.email.message}
        </p>
      )}

      {errors.password ? (
        errors.password.type === "pattern" ? (
          <>
            <p className="text-gray-700 text-sm mt-1 mb-1 self-start font-medium">
              Password should have at least:
            </p>
            <ol className="text-sm text-gray-700 list-decimal pl-5">
              <li>One digit</li>
              <li>One lowercase character</li>
              <li>One uppercase character</li>
              <li>One special character</li>
            </ol>
          </>
        ) : (
          <p className="text-gray-700 text-sm my-1 self-start font-medium">
            {errors.password.message}
          </p>
        )
      ) : null}
      <div className="flex">
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mx-auto mt-4 mr-4"
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>

        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="px-4 py-2 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-300 transition-all flex items-center text-gray-700 text-sm font-medium mx-auto mt-4"
        >
          Register
        </button>
      </div>
    </form>
  );
}
