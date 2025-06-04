import React from "react";
import useTokenStore from "../../stores/tokenStore";

const languages = {
  EN: {
    code: "EN",
    name: "English",
    image: "/images/usaFlag.svg",
  },
  NP: {
    code: "NP",
    name: "नेपाली",
    image: "/images/nepaliFlag.svg",
  },
};

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTokenStore();

  return (
    <div className=" flex items-center gap-3.5 ">
      <div className="flex items-center gap-2 p-1 text-xs border-2 border-gray-200 rounded-lg ">
        {/* Nepali Language Option */}
        <span
          onClick={() => {
            setLanguage(languages.NP.code);
          }}
          className={`cursor-pointer flex flex-row items-center justify-center gap-2 rounded-lg py-1  pl-2 pr-4 w-22 ${
            language === languages.NP.code ? "bg-red-800" : ""
          }`}
        >
          <img
            src={languages.NP.image || "/defaultimage.svg"}
            alt={languages.NP.name}
            className="rounded-full object-contain w-[20px]"
          />
          <span
            className={`${
              language === languages.NP.code ? "text-white" : "text-black"
            } font-medium preeti-f`}
          >
            {languages.NP.name}
          </span>
        </span>

        {/* English Language Option */}
        <span
          onClick={() => {
            setLanguage(languages.EN.code);
          }}
          className={`cursor-pointer flex flex-row items-center justify-center gap-2 rounded-lg h-full py-1 pl-2 pr-4 w-22 ${
            language === languages.EN.code ? "bg-red-800 h-full" : ""
          }`}
        >
          <img
            src={languages.EN.image || "/defaultimage.svg"}
            alt={languages.EN.name}
            className="rounded-full object-contain h-full w-[20px]"
          />
          <span
            className={`font-medium ${
              language === languages.EN.code ? "text-white" : "text-black"
            }`}
          >
            {languages.EN.name}
          </span>
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
