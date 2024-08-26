import { useSession } from "next-auth/react";
//for use with client componetns
export const useCurrentUser = () => {

  const session = useSession();

  console.log(session.data?.user);
  
  return session.data?.user;
};
