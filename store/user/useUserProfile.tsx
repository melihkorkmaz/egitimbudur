import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "../../graphql/mutations";
import { GET_USER } from "../../graphql/queries";
import { useAuthentication } from "../authentication/useAuthentication";
import { setUserProfile } from "./actions";
import { DispatchContext, StoreContext } from "./store";
import { useCallback, useContext } from "react";
import { TeacherType, UserProfile } from "../../types/user";


export const useUserProfile = () => {
  const store = useContext(StoreContext);
  const { userId } = useAuthentication();
  const [updateProfileMutation] = useMutation(UPDATE_USER_PROFILE);
  const [getUser] = useLazyQuery(GET_USER);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dispatch = useCallback(useContext(DispatchContext), []);

  const mapUserResponseToUserProfile = (user: any): UserProfile => ({
    id: user.id,
    ...user?.attributes,
    grades: user?.attributes?.grades?.data?.map(g => g.id),
    lessons: user?.attributes?.lessons?.data?.map(l => l.id),
    photo: user?.attributes?.photo?.data?.attributes?.url,
  } as UserProfile)

  const getUserProfile = async (userId: number): Promise<UserProfile> => {
    const {
      data: {
        usersPermissionsUser: {
          data
        }
      }
    } = await getUser({
      variables: {
        id: userId
      }
    });

    return mapUserResponseToUserProfile({
      id: userId,
      ...data,
    });
  };

  const handleUserProfileUpdate = async (profile: TeacherType) => {
    const { data: {
      updateUsersPermissionsUser: {
        data
      }
    } } = await updateProfileMutation({
      variables: {
        id: userId,
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          description: profile.description,
          about: profile.about,
          zoomLink: profile.zoomLink,
          skypeUserName: profile.skypeUserName,
          grades: profile.grades,
          lessons: profile.lessons,
        }
      }
    });

    const updatedProfile = mapUserResponseToUserProfile({
      id: data.id,
      ...data,
    });

    dispatch(setUserProfile(updatedProfile));
    return updatedProfile;
  };

  const updateUserPhoto = async (id: string) => {
    const { data: {
      updateUsersPermissionsUser: {
        data
      }
    } } = await updateProfileMutation({
      variables: {
        id: userId,
        data: {
          photo: id
        }
      }
    });

    const updatedProfile = mapUserResponseToUserProfile({
      id: data.id,
      ...data,
    });

    dispatch(setUserProfile(updatedProfile));
    return updatedProfile;
  };

  return {
    ...store,
    getUserProfile,
    setUserProfile: (user: UserProfile) => dispatch(setUserProfile(user)),
    updateUserProfile: handleUserProfileUpdate,
    updateUserPhoto,
  }
};