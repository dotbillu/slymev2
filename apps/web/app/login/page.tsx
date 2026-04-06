"use client";

import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Login() {
  const handleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;

    await fetch("http://localhost:3001/auth/signin/oauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  };

  return (
    <div className="flex h-screen w-screen bg-black login">
      <div className="lg:flex flex-1 hidden h-full ">
        <video
          src="/loginVideo.mp4"
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/3 h-full flex flex-col items-center justify-center gap-5 "
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <Image width={200} height={200} src="/slymelogo.png" alt="logo" />
        </motion.div>

        <div className="w-96 lg:w-80 xl:w-90  flex flex-col items-center gap-5">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl -mt-2 font-bold text-zinc-400"
          >
            Sign In
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-1"
          >
            <label className="text-zinc-400 font-bold text-sm m-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="abhaayjha"
              className="w-full p-3 px-3 rounded-md bg-zinc-800 text-white outline-none pl-3"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-1"
          >
            <label className="text-zinc-400 font-bold text-sm m-1 mt-1">
              Password
            </label>
            <input
              type="password"
              placeholder="something"
              className="w-full p-3 rounded-md bg-zinc-800 text-white outline-none pl-3"
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 1.05 }}
            className="w-full mt-3 bg-green-500 text-white p-3 rounded-md font-semibold"
          >
            Continue
          </motion.button>

          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-[1px] bg-zinc-600" />
            <span className="text-zinc-400 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-zinc-600" />
          </div>

          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
            text="signin_with"
            theme="filled_black"
            shape="circle"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-400 text-sm"
          >
            Don’t have an account?{" "}
            <span className="text-green-400 cursor-pointer">Sign up</span>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
