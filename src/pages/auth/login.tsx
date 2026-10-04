import { useTheme } from "../../context/themecontext";
import ThemeSwitcher from "../../components/themeswitcher";
import FiretechLogo from "../../assets/firetech.webp";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/auth.services";

const darkGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(185, 28, 28, 0.6) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(29, 78, 216, 0.6) 0%, transparent 50%), linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
};

const lightGradientStyle = {
  backgroundImage:
    "radial-gradient(circle at 30% 20%, rgba(248, 113, 113, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
};

export default function Auth() {
  const { darkMode } = useTheme();
  

  return (
    <div
      style={darkMode ? lightGradientStyle : darkGradientStyle}
      className="
      relative
      min-h-screen
      overflow-hidden
      text-white
    "
    >
      {/* Fixed Background decorations dengan blur gradient effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Cyan gradient blob - top left */}
        <div className="absolute left-0 top-0 h-104 w-104 rounded-full bg-cyan-500/20 blur-[160px]" />

        {/* Blue gradient blob - bottom right */}
        <div className="absolute bottom-0 right-0 h-lg w-lg rounded-full bg-blue-500/20 blur-[170px]" />

        {/* Grid pattern overlay - subtle background texture */}
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-[0.08]" : "opacity-[0.04]"}`}
          style={{
            backgroundImage: darkMode
              ? "linear-gradient(rgba(15,23,42,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(15,23,42,.25) 1px,transparent 1px)"
              : "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Theme Switcher */}
      <div
        data-aos="fade-down"
        data-aos-duration="600"
        data-aos-delay="200"
        className="absolute top-6 right-6 z-50"
      >
        <ThemeSwitcher />
      </div>
      <div
        className="
        relative
        z-10
        mx-auto
        flex
        min-h-screen
        max-w-7xl
        flex-col-reverse
        items-center
        justify-center
        gap-12
        px-6
        py-10

        lg:flex-row
        lg:justify-between
        lg:px-8
      "
      >
        {/* Left Side */}
        <div className="max-w-xl text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-delay="300"
            className={`mb-2 text-3xl font-semibold sm:text-4xl lg:text-5xl ${
              darkMode ? "text-black" : "text-white"
            }`}
          >
            Welcome To
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
            className="
            mb-8
            text-4xl
            font-black
            tracking-tight
            sm:text-5xl
            lg:text-6xl
            "
          >
            <span className={`${darkMode ? "text-red-700" : "text-blue-700"}`}>
              FIRE
            </span>

            <span className={`${darkMode ? "text-blue-700" : "text-red-700"}`}>
              TECH
            </span>

            <span
              className="
              ml-3
              bg-linear-to-r
              from-red-700
              to-blue-700
              bg-clip-text
              text-transparent
            "
            >
              2026
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "backOut" }}
            data-aos="zoom-in"
            data-aos-delay="700"
          >
            <div className="flex justify-center lg:justify-start">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    if (!credentialResponse.credential) {
                      throw new Error("Google credential tidak ditemukan");
                    }

                    const response = await googleLogin(
                      credentialResponse.credential,
                    );

                    const accessToken = response?.data?.accessToken;
                    const user = response?.data?.user;

                    if (!accessToken) {
                      throw new Error("Login response did not include an access token");
                    }

                    localStorage.setItem("accessToken", accessToken);

                    if (user) {
                      localStorage.setItem("user", JSON.stringify(user));
                      if (typeof user.role === "string") {
                        localStorage.setItem("role", user.role.toUpperCase());
                      }
                    }

                    // The server-validated AdminRoute chooses the destination
                    // for both admin and participant accounts.
                    window.location.href = "/admin";
                  } catch {
                    console.error("Google login failed.");
                  }
                }}
                onError={() => console.error("Google login failed.")}
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                width="320"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div
          className="
          relative
          flex
          justify-center

          lg:right-12
        "
        >
          <motion.img
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -8, 0],
            }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeOut",
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.08,
            }}
            src={FiretechLogo}
            alt="Firetech"
            className="
            cursor-pointer
            w-52
            sm:w-72
            lg:w-105
            object-contain
            drop-shadow-[0_0_50px_rgba(59,130,246,0.35)]
          "
          />
        </div>
      </div>
    </div>
  );
}
