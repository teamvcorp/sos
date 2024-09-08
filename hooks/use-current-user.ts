import { useSession } from "next-auth/react";
//for use with client componetns
export const useCurrentUser = () => {

  const session = useSession();

  console.log("What is this", session);
  
  return session.data?.user;
};
