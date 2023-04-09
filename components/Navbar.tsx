import { IconExternalLink, IconBrandReact} from "@tabler/icons-react";
import Image from "next/image";
import { FC } from "react";

export const Navbar: FC = () => {  
  return (
    <div className="flex h-[60px] border-b border-gray-900 py-2 px-8 items-center justify-between bg-gray-800 text-white">
      <div className="font-bold text-2xl flex items-center">
        <a
          className="flex hover:opacity-50 items-center"
          href="/"
        >
          <div className="ml-2 flex justify-start gap-1 items-center">
            <IconBrandReact color={"#61DBFB"} size="36"/>
            ReactGPT
          </div>
        </a>
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50"
          href="https://react.dev/"
          target="_blank"
          rel="noreferrer"
        >
          <IconExternalLink
            className="ml-1"
            size={20}
            color="white"
          />
        </a>
      </div>
    </div>
  );
};
