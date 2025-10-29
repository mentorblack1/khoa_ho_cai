import favicon from "@/assets/icon.ico";
import cloudflareLogo from "@/assets/images/cloudflare-image.svg";
import type { FC } from "react";
import { useMemo, useState } from "react";

interface CloudflareCaptchaProps {
  onVerified?: () => void;
}

const CloudflareCaptcha: FC<CloudflareCaptchaProps> = ({ onVerified }) => {
  const domain = window.location.hostname;
  const [isChecking, setIsChecking] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const rayId = useMemo(() => {
    return Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("");
  }, []);

  const handleCheckboxClick = () => {
    if (isVerified) return;

    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsVerified(true);
      onVerified?.();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#2b2b2b] px-8">
      <div className="flex h-full w-full max-w-[60rem] flex-col">
        <div className="mb-8 mt-12 flex items-center gap-3">
          <img src={favicon} alt="icon" className="h-8 w-8" />
          <span className="text-2xl font-normal text-white">{domain}</span>
        </div>

        <h1 className="mb-8 text-3xl font-normal text-white">
          Verifying you are human. This may take a few seconds.
        </h1>

        <div className="mb-8 w-fit border border-gray-600 bg-[#333] p-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCheckboxClick}
                disabled={isChecking || isVerified}
                className="flex h-8 w-8 items-center justify-center rounded border-2 border-gray-500 bg-white transition-colors hover:border-gray-400 disabled:cursor-not-allowed"
              >
                {isChecking ? (
                  <div className="relative h-6 w-6 animate-[spin_2s_linear_infinite]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[135deg]">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[135deg]">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45">
                      <div className="h-1 w-1 -translate-y-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                ) : isVerified ? (
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    strokeWidth={3}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : null}
              </button>
              <span className="text-sm text-white">Verify you are human</span>
            </div>
            <img
              src={cloudflareLogo}
              alt="cloudflare"
              className="h-[25px] w-[75px]"
            />
          </div>
        </div>

        <p className="mb-8 text-base text-gray-300">
          {domain} needs to review the security of your connection before
          proceeding.
        </p>

        <div className="mb-8 mt-auto border-t border-gray-700 pt-8">
          <p className="mb-2 text-sm text-gray-400">
            Ray ID: <span className="font-mono">{rayId}</span>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Performance & security by</span>
            <span className="text-white">Cloudflare</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudflareCaptcha;
