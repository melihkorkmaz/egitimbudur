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
  Select
} from "../components";

// Services
import { getGrades } from "../modules/common/gradesService";
import { getLessons } from "../modules/common/lessonServices";
import { signUp } from "../modules/auth/authService";

// Type
import type { AuthErrorType, CreateStudentRequest, CreateTeacherRequest } from "../modules/auth/types";
import type { Grade, Lesson } from "../modules/common/types";
import type { SelectItem } from "../components";
import { AuthRole } from '../modules/auth/types';


type SignUpProps = {
  grades: Grade[];
  lessons: Lesson[];
};

export default function SignUp({ grades, lessons = [] }: SignUpProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [role, setRole] = useState<AuthRole>(AuthRole.STUDENT);
  const [selectedGrade, setSelectedGrade] = useState<SelectItem>();
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
        <div className="row justify-content-center mb-5">
          <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit}>
              <div className="crs_log_wrap">
                <div className="crs_log__caption">
                  <div className="rcs_log_124">
                    <div className="Lpo09">
                      <h4>Kayıt Formu</h4>
                    </div>
                    <div className="form-group row flex flex-row ml-1">
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
                    <div className="form-group row mb-0">
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="firstName">İsim</label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeHolder="Adınız"
                            block
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="lastName">Soyisim</label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeHolder="Soyadınız"
                            block
                          />
                        </div>
                      </div>
                    </div>
                    {role === AuthRole.STUDENT && (
                      <div className="form-group">
                        <label htmlFor="gradeId">Sınıf Seçiniz</label>
                        <Select
                          id="gradeId"
                          name="gradeId"
                          options={
                            grades
                              ? grades.map((c) => ({
                                value: c.id,
                                key: c.name,
                              }))
                              : []
                          }
                          selected={selectedGrade?.value}
                          onChange={(item) => setSelectedGrade(item)}
                          placeHolder="Sınıf Seçiniz..."
                          block
                          className="mr-2"
                        />
                      </div>
                    )}

                    {role === AuthRole.TEACHER && (
                      <>
                        <div className="form-group">
                          <label htmlFor="lessons">Branşlarınızı Seçiniz</label>
                          <CheckboxList 
                            name="lessons"
                            selectedItems={selectedLessons}
                            onUpdate={setSelectedLessons} 
                            items={lessons.map(l => ({ key: l.id, value: l.name }))} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="grades">Sınıflarınız</label>
                          <CheckboxList 
                            name="grades" 
                            selectedItems={selectedGrades}
                            onUpdate={setSelectedGrades} 
                            items={grades.map(g => ({ key: g.id, value: g.name }))} />
                        </div>
                      </>
                    )}
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeHolder="Email adresiniz"
                        block
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Şifre</label>
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
                <div className="crs_log__footer d-flex justify-content-between">
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
