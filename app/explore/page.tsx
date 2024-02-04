"use client";
import React from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";
import { logoutAction } from "@/actions/logout";
import { totalMoviesAction } from "@/actions/totalMovies";
import { totalCategoriesAction } from "@/actions/totalCategories";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function ExplorePage() {
  const user = useSession();
  const router = useRouter();

  const terminalCommands: any = React.useMemo(() => {
    return {
      whoami: {
        help: "Tells you who are you",
        action: `${user?.data?.user?.name} <${user?.data?.user?.email}>`,
      },

      home: {
        help: "Takes you to homepage",
        action: async () => router.push("/"),
      },

      "sign-out": {
        help: "Sign out the current user",
        action: logoutAction,
      },

      "total-movies": {
        help: "Total movies on website",
        action: async () => {
          const a = await totalMoviesAction();
          return `Total movies on website: ${a?.totalMovies}`;
        },
      },

      "total-categories": {
        help: "Total categories on website",
        action: async () => {
          const a = await totalCategoriesAction();
          return `Total categories on website: ${a?.totalCategories}`;
        },
      },
    };
  }, [user?.data?.user?.email, user?.data?.user?.name]);

  return (
    <div className="h-screen flex justify-center items-center scrollbar-hide">
      <Navbar />

      <div className="h-[80vh] mt-20 border mx-20 scrollbar-hide change-scrollbar">
        <TerminalContextProvider>
          <ReactTerminal
            prompt={
              user && user?.data
                ? `$ ${user?.data?.user?.name} >> `
                : "$ amangarg-dev >> "
            }
            welcomeMessage={
              <div>
                <p>
                  Welcome to my Next-Movies! Get started by typing `help`
                  command below
                </p>
              </div>
            }
            themes={{
              darkDefault: {
                themeBGColor: "",
                themeToolbarColor: "",
                themeColor: "#38CC77",
                themePromptColor: "#fff",
              },
            }}
            theme="darkDefault"
            commands={{
              ...Object.keys(terminalCommands).reduce(
                (b, key) => ({ ...b, [key]: terminalCommands[key].action }),
                {}
              ),
              help: (
                <div className="mt-2 text-gray-300 change-scrollbar">
                  <p>Available Commands:</p>
                  {Object.keys(terminalCommands).map((key) => (
                    <p key={key}>
                      <span style={{ color: "#38CC77" }}>{key}:</span>{" "}
                      {terminalCommands[key].help}
                    </p>
                  ))}
                  <p>
                    <span style={{ color: "#38CC77" }}>clear:</span> clears out
                    everything on screen!
                  </p>
                </div>
              ),
            }}
          />
        </TerminalContextProvider>
      </div>
    </div>
  );
}
