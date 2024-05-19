import {currentUser} from "@/lib/auth-lib";
import UserInfo from "@/components/auth/user-info/UserInfo";

const ServerPage = async () => {
  const user = await currentUser()
  return (
    <UserInfo  user={user}/>
  );
};

export default ServerPage;
