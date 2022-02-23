import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Component
import {
  Button,
  Input,
  Layout,
  CheckboxList,
  RadioButton,
  Select,
  Label
} from "../components";

// Services
import { getGrades } from "../modules/common/gradesService";
import { getLessons } from "../modules/common/lessonServices";
import { signUp } from "../modules/auth/authService";

// Type
import type { AuthErrorType, CreateStudentRequest, CreateTeacherRequest } from "../modules/auth/types";
import type { Grade, Lesson } from "../modules/common/types";
import { AuthRole } from '../modules/auth/types';


type SignUpProps = {
  grades: Grade[];
  lessons: Lesson[];
};

export default function SignUp({ grades, lessons = [] }: SignUpProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [role, setRole] = useState<AuthRole>(AuthRole.STUDENT);
  const [selectedGrade, setSelectedGrade] = useState<Grade>();
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObject = Object.fromEntries(formData);
    const selectedGrades = grades.filter(g => selectedGrades.include(g.id));
    const selectedLessons = lessons.filter(l => selectedLessons.include(l.id));

    let request = {
      ...dataObject,
      role,
      grades: selectedGrades,
      lessons: selectedLessons,
      grade: selectedGrade
    } as unknown;

    const res = await signUp(request as CreateTeacherRequest & CreateStudentRequest);

    if ((res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }
    router.push("/");
  };

  const handleRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as AuthRole);
  };

  return (
    <Layout>
      <section>
        <div className="mb-5 max-w-[670px] mx-auto mt-8">
          <form onSubmit={handleSubmit}>
            <div className="crs_log_wrap">
              <div className="crs_log__caption">
                <div className="rcs_log_124">
                  <div className="Lpo09">
                    <h4>Kayıt Formu</h4>
                  </div>
                  <div className="form-group flex flex-row ml-1">
                    <RadioButton
                      id="student"
                      group="role"
                      value={AuthRole.STUDENT}
                      checked={role === AuthRole.STUDENT}
                      onChange={handleRole}
                      className="mr-4"
                    >
                      <span className="bold">Öğrenci</span>
                    </RadioButton>
                    <RadioButton
                      id="teacher"
                      group="role"
                      value={AuthRole.TEACHER}
                      checked={role === AuthRole.TEACHER}
                      onChange={handleRole}
                    >
                      <span className="bold">Öğretmen</span>
                    </RadioButton>
                  </div>
                  <div className="gap-4 flex mb-0">
                      <div className="form-group flex-1">
                        <Label htmlFor="firstName">İsim</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeHolder="Adınız"
                          block
                        />
                      </div>
                      <div className="form-group flex-1">
                        <Label htmlFor="lastName">Soyisim</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeHolder="Soyadınız"
                          block
                        />
                      </div>
                  </div>
                  {role === AuthRole.STUDENT && (
                    <div className="form-group">
                      <Label htmlFor="gradeId">Sınıf Seçiniz</Label>
                      <Select
                        selectedText={selectedGrade?.name}
                        selectedValue={selectedGrade?.id}
                        onChange={(value) => setSelectedGrade(grades.find(g => g.id === value))}
                        placeHolder="Sınıf Seçiniz..."
                        block
                        className="mr-2"
                      >
                        {grades.map(g => (
                          <Select.Item key={g.id} value={g.id}>
                            {g.name}
                          </Select.Item>
                        ))}
                      </Select>
                    </div>
                  )}

                  {role === AuthRole.TEACHER && (
                    <>
                      <div className="form-group">
                        <Label htmlFor="lessons">Branşlarınızı Seçiniz</Label>
                        <CheckboxList
                          selectedItems={selectedLessons}
                          onUpdate={setSelectedLessons}
                          items={lessons.map(l => ({ key: l.id, value: l.name }))} />
                      </div>

                      <div className="form-group">
                        <Label htmlFor="grades">Sınıflarınız</Label>
                        <CheckboxList
                          selectedItems={selectedGrades}
                          onUpdate={setSelectedGrades}
                          items={grades.map(g => ({ key: g.id, value: g.name }))} />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeHolder="Email adresiniz"
                      block
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="password">Şifre</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeHolder="Şifreniz"
                      block
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn full-width btn-md theme-bg text-white"
                      primary
                      block
                    >
                      Şimdi Kaydol!
                    </Button>
                  </div>
                  {error !== "" && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between w-full px-8 py-3 mt-8 border-t">
                <div className="fhg_45">
                  <p className="musrt">
                    Zaten üye misiniz?
                    <Link href="/sign-in">
                      <a className="theme-cl ml-2">Giriş Yap!</a>
                    </Link>
                  </p>
                </div>
                <div className="fhg_45">
                  <p className="musrt">
                    <Link href="/forgot-password">
                      <a className="text-danger">Şifremi Unuttum!</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
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
