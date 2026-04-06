"use client";

import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
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
    <div className="flex lg:h-screen lg:w-screen bg-black auth">
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
        className="w-full lg:w-1/2 xl:w-1/3 3xl:w-1/5 h-screen overflow-y-auto grid place-items-center px-4 py-10"
      >
        <div className="w-full max-w-md flex flex-col items-center gap-5">
          <div className="w-96 lg:w-80 xl:w-90  flex flex-col items-center gap-5">
            <motion.div
              animate={{
                scale: [1, 1.1, 0.95, 1.05, 1],
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/slymelogo.png"
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-40 h-auto"
              />
            </motion.div>

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
                placeholder="e.g abhaayjha"
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
              <span
                onClick={() => {
                  router.push("/signup");
                }}
                className="text-green-400 cursor-pointer"
              >
                Sign up
              </span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
