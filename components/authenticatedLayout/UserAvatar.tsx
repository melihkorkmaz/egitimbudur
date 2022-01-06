/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { useUserProfile } from "../../hooks/useUserProfile";
import { Button } from "../Button";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateUserPhoto } from "../../services/userService";
import { isTeacher } from "../../types/user";

export const UserAvatar = () => {
  const { userProfile } = useUserProfile();
  const inputRef = useRef(null);

  if (!userProfile) {
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
    const storage = getStorage();
    const uploadRef = ref(storage, `images/${userProfile.id}/${file.name}`);
    
    try {
      await uploadBytes(uploadRef, file);
      const url = await getDownloadURL(uploadRef);

      updateUserPhoto(userProfile.id, url);
    } catch (error) {
      //TODO: log error
    }
  }

  return (
    <div className="d-user-avater">
      <img
        src={userProfile.photo ? userProfile.photo : "/img/empty_profile_m.png"} 
        className="mx-auto" 
        alt="" 
      />
      <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
      <span>
        {isTeacher(userProfile) ? "Ogretmen" : "Ogrenci"}
      </span>
      <div>
        <input 
          type="file" 
          ref={inputRef} 
          className="hidden" 
          accept=".gif,.jpg,.jpeg,.png, .jfif"
          onChange={handlePhotoUpload}
        />
        <Button onClick={showFileDialog}>Fotografi Guncelle</Button>
      </div>
    </div>
  );
};