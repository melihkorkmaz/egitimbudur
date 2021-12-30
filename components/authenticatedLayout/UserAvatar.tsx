/* eslint-disable @next/next/no-img-element */
import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { UPLOAD } from "../../graphql/mutations";
import { useAuthentication } from "../../store/authentication/useAuthentication";
import { useUserProfile } from "../../store/user/useUserProfile";
import { Button } from "../Button";

export const UserAvatar = () => {
  const { role } = useAuthentication();
  const { user, updateUserPhoto } = useUserProfile();
  const [fileUploadMutation] = useMutation(UPLOAD);
  const inputRef = useRef(null);

  if (!user) {
    return null;
  }

  const showFileDialog = () => {
    if (!inputRef.current) {
      return;
    }

    (inputRef.current as HTMLInputElement).click();
  };

  const handlePhotoUpload =async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    const file = files[0];
    const { data: { upload : { data: { id }}} } = await fileUploadMutation({
      variables: {
        file
      }
    });

    updateUserPhoto(id);
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
      <div>
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          accept=".gif,.jpg,.jpeg,.png"
          onChange={handlePhotoUpload}
        />
        <Button onClick={showFileDialog}>Fotografi Guncelle</Button>
      </div>
    </div>
  );
};