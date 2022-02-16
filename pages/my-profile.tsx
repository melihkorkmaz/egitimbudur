import React, { useEffect, useState } from "react";

// Components
import { 
  AdminLayout,
  Button,
  Input,
  CheckboxList,
  RichTextEditor,
  TextArea,
  Label
} from "../components";

// Services & Hooks
import { getGrades } from "../modules/common/gradesService";
import { getLessons } from "../modules/common/lessonServices";
import { getUserProfile } from "../modules/auth/authService";
import { updateUserProfile } from "../modules/teacher/teacherService";
import { useUser } from "../modules/auth/useUser";

// Types
import { Grade, Lesson } from "../modules/common/types";
import { isTeacher, Teacher } from "../modules/teacher/types";
import { Student } from "../modules/student/types";

type MyProfileProps = {
  grades: Grade[];
  lessons: Lesson[];
}

export default function MyProfile({
  grades = [],
  lessons = []
}: MyProfileProps) {
  const { user } = useUser();
  const [userProfileModel, setUserProfileModel] = useState<Teacher | Student | undefined>();

  useEffect(() => {
    if (!user || !isTeacher(user)) {
      return;
    }

    const fetchUserProfile = async () => {
      const userProfile = await getUserProfile<Teacher>(user.id);
      setUserProfileModel({ ...userProfile });
    };

    fetchUserProfile();
    // setLessonsListItem(withTeacherLessons as LessonListType[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.currentTarget;

    const newState = {
      ...userProfileModel,
      [id]: value
    };

    setUserProfileModel(newState as Teacher);
  };

  const handleAboutChange = (value: string) => {
    const newState = {
      ...userProfileModel,
      about: value
    };

    setUserProfileModel(newState as Teacher);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfileModel) {
      return;
    }
    updateUserProfile(userProfileModel);
  };

  return (
    <AdminLayout currentPage="my-profile">
      <div className="dashboard_wrap">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
            <h6 className="m-0">Profilim</h6>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12 col-md-12">
            {user && userProfileModel &&
              <form onSubmit={handleSubmit}>
                <div className="form-group smalls">
                  <Label>Isim*</Label>
                  <Input id="firstName" value={userProfileModel.firstName} onChange={handleChange} block />
                </div>
                <div className="form-group smalls">
                  <Label>Soyisim*</Label>
                  <Input id="lastName" value={userProfileModel.lastName} onChange={handleChange} block />
                </div>
                {isTeacher(userProfileModel) && (
                  <>
                    <div className="form-group smalls">
                      <Label>Hakkinizda kisa aciklama <i>(bu alan arama sonuclarinda ogretmen kartinda gosterilecek)</i></Label>
                      <TextArea id="description" value={userProfileModel.description} onChange={handleChange} />
                    </div>
                    <div className="form-group smalls">
                      <Label>Hakkinizda <i>(bu alan profil sayfanizda ogrencilere gosterilecek)</i></Label>
                      <RichTextEditor value={userProfileModel.about} onChange={handleAboutChange} />
                    </div>
                    <div className="form-group">
                      <Label>Branslariniz</Label>
                      <CheckboxList 
                        items={lessons.map(l => ({ key: l.id, value: l.name }))} 
                        selectedItems={[...userProfileModel.lessons.map(l => l.id)]}
                        onUpdate={(ids) => {
                          setUserProfileModel({
                            ...userProfileModel,
                            lessons: lessons.filter(l => ids.includes(l.id))
                          });
                        }} 
                      />
                    </div>
                    <div className="form-group">
                      <Label>Ders verdiginiz siniflar</Label>
                      <CheckboxList 
                        items={grades.map(g => ({ key: g.id, value: g.name }))} 
                        selectedItems={[...userProfileModel.grades.map(g => g.id)]}
                        onUpdate={(ids) => {
                          setUserProfileModel({
                            ...userProfileModel,
                            grades: grades.filter(g => ids.includes(g.id))
                          });
                        }} 
                      />
                    </div>
                    <div className="form-group smalls">
                      <Label>Zoom Link <i>(Sadece sizden ders alanlar goruntuleyebilir)</i></Label>
                      <Input id="zoomLink" value={userProfileModel.zoomLink || ''} onChange={handleChange} block />
                    </div>
                    <div className="form-group smalls">
                      <Label>Skype Kullanici Adi <i>(Sadece sizden ders alanlar goruntuleyebilir)</i></Label>
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
    </AdminLayout>);
};

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