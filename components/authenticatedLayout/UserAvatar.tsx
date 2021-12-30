/* eslint-disable @next/next/no-img-element */
import { useAuthentication } from "../../store/authentication/useAuthentication";

export const UserAvatar = () => {
  const { user } = useAuthentication();

  if (!user) {
    return null;
  }

  return (
    <div className="d-user-avater">
      <img
        src={user.photo || "/img/empty_profile_m.png"} 
        className="mx-auto" 
        alt="" 
      />
      <h4>{`${user.firstName} ${user.lastName}`}</h4>
      <span>
        {user.role === "teacher" ? "Ogretmen" : "Ogrenci"}
      </span>
    </div>
  );
};