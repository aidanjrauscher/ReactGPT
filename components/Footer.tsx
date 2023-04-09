import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex w-screen min-h-12 border-t border-gray-900 items-end justify-center sm:justify-between bg-gray-800 text-white p-2">
      <div className="flex flex-col">
        <div className="hidden sm:flex italic text-sm">
          Built by
          <a
            className="hover:opacity-50 mx-1"
            href="https://twitter.com/aidanjrauscher"
            target="_blank"
            rel="noreferrer"
          >
            aidan.
          </a>
        </div>
        <div className="hidden sm:flex italic text-sm">
          Inspired by 
          <a
          className="hover:opacity-50 mx-1 underline"
          href="https://twitter.com/mckaywrigley"
          target="_blank"
          rel="noreferrer"
          >
            Mckay Wrigley
          </a>
          and
          <a
            className="hover:opacity-50 mx-1 underline"
            href="https://twitter.com/RLanceMartin"
            target="_blank"
            rel="noreferrer"
          >
            Lance Martin.
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-1 flex-wrap items-end">
        <div className="flex space-x-4 pb-1">
          <a
            className="flex items-center hover:opacity-50"
            href="https://twitter.com/aidanjrauscher"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandTwitter size={24} />
          </a>

          <a
            className="flex items-center hover:opacity-50"
            href="https://github.com/aidanjrauscher"
            target="_blank"
            rel="noreferrer"
          >
            <IconBrandGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};
