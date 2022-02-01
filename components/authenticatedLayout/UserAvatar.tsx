/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Components
import { Button } from "../Button";

// Hooks and Services
import { updateUserPhoto } from "../../modules/auth/authService";
import { useUser } from "../../modules/auth/useUser";

// Types
import { isTeacher } from "../../modules/teacher/types";

export const UserAvatar = () => {
  const { user } = useUser();
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
    const storage = getStorage();
    const uploadRef = ref(storage, `images/${user.id}/${file.name}`);
    
    try {
      await uploadBytes(uploadRef, file);
      const url = await getDownloadURL(uploadRef);

      updateUserPhoto(user.id, url);
    } catch (error) {
      //TODO: log error
    }
  };

  return (
    <div className="d-user-avater">
      <img
        src={user.photo ? user.photo : "/img/empty_profile_m.png"} 
        className="mx-auto aspect-square" 
        alt="" 
      />
      <h4>{`${user.firstName} ${user.lastName}`}</h4>
      <span>
        {isTeacher(user) ? "Ogretmen" : "Ogrenci"}
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