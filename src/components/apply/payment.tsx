import QRCodePNG from "../../assets/qr.png";
import { useTheme } from "../../context/themecontext";

export default function Payment() {
  const { darkMode } = useTheme();

  const amount = 150000;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl p-8 transition-all duration-300 md:p-12">
        <div className="grid items-start gap-10 md:grid-cols-[420px_1fr]">
          {/* QR Code */}
          <div
            className="flex justify-center animate-slideInLeft"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="p-4 transition-all duration-300 cursor-pointer hover:scale-105">
              <img
                src={QRCodePNG}
                alt="QR Code"
                className="
        w-52 h-52
        sm:w-64 sm:h-64
        md:w-72 md:h-72
        lg:w-80 lg:h-80
        xl:w-85 xl:h-85
        object-contain
      "
              />
            </div>
          </div>

          {/* Payment Instructions */}
          <div
            className={`${darkMode ? "text-slate-800" : "text-white"} animate-slideInRight`}
            style={{ animationDelay: "0.2s" }}
          >
            <h2
              className="mb-6 text-4xl font-bold animate-scaleIn"
              style={{ animationDelay: "0.3s" }}
            >
              Payment Instructions
            </h2>

            <ol className="space-y-5 text-sm font-medium leading-relaxed">
              {[
                <>
                  Open your <b>Mobile Banking</b> or <b>E-Wallet</b> application
                  on your smartphone.
                </>,
                <>
                  Scan the QR Code displayed on the left using your preferred
                  payment application.
                </>,
                <>
                  Complete the payment of{" "}
                  <span
                    className={`font-bold ${darkMode ? "text-blue-600" : "text-red-600"}`}
                  >
                    Rp {amount.toLocaleString("id-ID")}
                  </span>
                  .
                </>,
                <>
                  Once the payment has been completed, click the{" "}
                  <b className={darkMode ? "text-blue-600" : "text-red-600"}>
                    Submit
                  </b>{" "}
                  button on this page.
                </>,
              ].map((content, i) => (
                <li
                  key={i}
                  className={`${darkMode ? "text-black" : "text-white"} animate-slideInUp`}
                  style={{ animationDelay: `${0.4 + i * 0.12}s` }}
                >
                  <span className="inline-flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{content}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
