import { useSession } from "next-auth/react";
//for use with client componetns
export const useCurrentUser = () => {

  const session = useSession();


  
  return session.data?.user;
};
