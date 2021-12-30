/* eslint-disable @next/next/no-img-element */
import { useAuthentication } from "../../store/authentication/useAuthentication";
import { useUserProfile } from "../../store/user/useUserProfile";

export const UserAvatar = () => {
  const { role } = useAuthentication();
  const { user } = useUserProfile();

  if (!user) {
    return null;
  }

  return (
    <div className="d-user-avater">
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.photo}` || "/img/empty_profile_m.png"} 
        className="mx-auto" 
        alt="" 
      />
      <h4>{`${user.firstName} ${user.lastName}`}</h4>
      <span>
        {role === "teacher" ? "Ogretmen" : "Ogrenci"}
      </span>
    </div>
  );
};