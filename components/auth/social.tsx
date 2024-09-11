"use client";
import {signIn} from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub, FaMicrosoft } from "react-icons/fa";

import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google"| "github"| "facebook"| "azure-ad")=>{
    signIn(provider,{callbackUrl: DEFAULT_LOGIN_REDIRECT} )
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("facebook")}>
        <FaFacebookF className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("azure-ad")}>
        <FaMicrosoft className="h-5 w-5" />
      </Button>
    </div>
  );
};
