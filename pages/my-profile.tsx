import React, { useEffect, useState } from "react";
import { AuthenticatedLayout } from "../components/authenticatedLayout/AuthenticatedLayout";
import { Button } from "../components/Button";
import { GradesList, GradesListType } from "../components/GradesList";
import { Input } from "../components/Input";
import { LessonList, LessonListType } from "../components/LessonList";
import { RichTextEditor } from "../components/RichTextEditor";
import { TextArea } from "../components/TextArea";
import { GradeType, LessonType } from "../types/common";
import { getGrades } from "../modules/common/gradesService";
import { getLessons } from "../modules/common/lessonServices";
import { updateUserProfile } from '../services/userService';
import { useUserProfile, } from "../hooks/useUserProfile";
import { isTeacher, Teacher, UserProfile } from "../types/user";

interface MyProfileProps {
  grades: GradeType[];
  lessons: LessonType[];
}
export default function MyProfile({
  grades = [],
  lessons = []
}: MyProfileProps) {
  const { userProfile } = useUserProfile();
  const [userProfileModel, setUserProfileModel] = useState<UserProfile | undefined>();
  const [lessonsListItems, setLessonsListItem] = useState<LessonListType[]>(lessons.map(l => ({
    lesson: l,
    selected: false
  })));

  const [gradesListItems, setGradesListItem] = useState<GradesListType[]>(grades.map(c => ({
    grade: c,
    selected: false
  })));

  useEffect(() => {
    setUserProfileModel(userProfile);

    if (!isTeacher(userProfile)) {
      return;
    }

    const withTeacherGrades = gradesListItems.map(g => ({
      grade: g.grade,
      selected: userProfile.grades.some(grade => grade.id === g.grade.id)
    }));

    setGradesListItem(withTeacherGrades as GradesListType[]);

    const withTeacherLessons = lessonsListItems.map(l => ({
      lesson: l.lesson,
      selected: userProfile.lessons.some(lesson => lesson.id === l.lesson.id)
    }));

    setLessonsListItem(withTeacherLessons as LessonListType[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.currentTarget;

    const newState = {
      ...userProfileModel,
      [id]: value
    };

    setUserProfileModel(newState as UserProfile);
  };

  const handleAboutChange = (value: string) => {
    const newState = {
      ...userProfileModel,
      about: value
    };

    setUserProfileModel(newState as UserProfile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfileModel) {
      return;
    }
    const userProfile = {
      ...userProfileModel,
      grades: gradesListItems.filter(g => g.selected).map(g => g.grade),
      lessons: lessonsListItems.filter(l => l.selected).map(l => l.lesson)
    } as UserProfile;

    console.log("userProfile", userProfile);
    updateUserProfile(userProfile);
  };

  return (
    <AuthenticatedLayout currentPage="my-profile">
      <div className="dashboard_wrap">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
            <h6 className="m-0">Profilim</h6>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12">
            {userProfile && userProfileModel &&
              <form onSubmit={handleSubmit}>
                <div className="form-group smalls">
                  <label>Isim*</label>
                  <Input id="firstName" value={userProfileModel.firstName} onChange={handleChange} block />
                </div>
                <div className="form-group smalls">
                  <label>Soyisim*</label>
                  <Input id="lastName" value={userProfileModel.lastName} onChange={handleChange} block />
                </div>
                {isTeacher(userProfileModel) && (
                  <>
                    <div className="form-group smalls">
                      <label>Hakkinizda kisa aciklama <i>(bu alan arama sonuclarinda ogretmen kartinda gosterilecek)</i></label>
                      <TextArea id="description" value={userProfileModel.description} onChange={handleChange} />
                    </div>
                    <div className="form-group smalls">
                      <label>Hakkinizda <i>(bu alan profil sayfanizda ogrencilere gosterilecek)</i></label>
                      <RichTextEditor value={userProfileModel.about} onChange={handleAboutChange} />
                    </div>
                    <div className="form-group">
                      <label>Branslariniz</label>
                      <LessonList onUpdate={setLessonsListItem} items={lessonsListItems} />
                    </div>
                    <div className="form-group">
                      <label>Ders verdiginiz siniflar</label>
                      <GradesList onUpdate={setGradesListItem} items={gradesListItems} />
                    </div>
                    <div className="form-group smalls">
                      <label>Zoom Link <i>(Sadece sizden ders alanlar goruntuleyebilir)</i></label>
                      <Input id="zoomLink" value={userProfileModel.zoomLink || ''} onChange={handleChange} block />
                    </div>
                    <div className="form-group smalls">
                      <label>Skype Kullanici Adi <i>(Sadece sizden ders alanlar goruntuleyebilir)</i></label>
                      <Input id="skypeUserName" value={userProfileModel.skypeUserName || ''} onChange={handleChange} block />
                    </div>
                  </>
                )}

                <div className="form-group smalls">
                  <Button type="submit" primary>Kaydet</Button>
                </div>
              </form>
            }
          </div>
        </div>

      </div>
    </AuthenticatedLayout>)
}

export async function getServerSideProps(context) {
  const grades = await getGrades();
  const lessons = await getLessons();
  return {
    props: {
      grades,
      lessons,
    }
  };
}