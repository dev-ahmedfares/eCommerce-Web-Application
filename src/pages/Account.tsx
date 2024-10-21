import Heading from "@components/shared/Heading/Heading";
import { useAppSelector } from "@store/hooks";


export default function Account() {
  const accountInfo = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Heading style="mt-0 mb-3" >Account Info</Heading>
      <ul>
        <li>First Name: {accountInfo?.firstName}</li>
        <li>Last Name: {accountInfo?.lastName}</li>
        <li>Email: {accountInfo?.email}</li>
      </ul>
    </>
  );
}
