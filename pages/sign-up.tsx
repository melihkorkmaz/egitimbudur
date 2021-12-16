import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/layout/Layout";
import { LessonList, LessonListType } from "../components/LessonList";
import { RadioButton } from "../components/RadioButton";
import { Select, SelectItem } from "../components/Select";
import { AuthErrorType, signUpByEmailAndPassword } from "../services/authenticationService";
import { getClassTypes, getLessons } from "../services/searchService";
import { AuthCurrentState, AuthRole } from "../store/authentication/types";
import { useAuthentication } from "../store/authentication/useAuthentication";
import { ClassType, LessonType } from "../store/search/types";

type SignUpProps = {
  classes: ClassType[];
  lessons: LessonType[];
};

export default function SignUp({ classes, lessons = [] }: SignUpProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState<AuthRole>(AuthRole.STUDENT);
  const [selectedClass, setSelectedClass] = useState<SelectItem | undefined>();
  const [lessonsListItems, setLessonsListItem] = useState<LessonListType[]>(lessons.map(l => ({
    lesson: l,
    selected: false
  })));

  const { authState, login } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signUpByEmailAndPassword({
      email,
      password,
      firstName,
      lastName,
      role,
      className: classes.find(c => c.id === selectedClass?.value),
      lessons: lessonsListItems.filter(l => l.selected).map(l => l.lesson)
    });

    if ((res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }

    login(email, password);
  };

  useEffect(() => {
    if (authState === AuthCurrentState.AUTHENTICATED) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState]);

  const handleRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as AuthRole);
  };

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
              <form onSubmit={handleSubmit}>
                <div className="crs_log_wrap">
                  <div className="crs_log__caption">
                    <div className="rcs_log_124">
                      <div className="Lpo09">
                        <h4>Kayit Formu</h4>
                      </div>
                      <div className="form-group row flex flex-row">
                        <RadioButton
                          id="student"
                          group="authRole"
                          value={AuthRole.STUDENT}
                          checked={role === AuthRole.STUDENT}
                          onChange={handleRole}
                          className="mr-4"
                        >
                          <span className="bold">Ogrenci</span>
                        </RadioButton>
                        <RadioButton
                          id="teacher"
                          group="authRole"
                          value={AuthRole.TEACHER}
                          checked={role === AuthRole.TEACHER}
                          onChange={handleRole}
                        >
                          <span className="bold">Ogretmen</span>
                        </RadioButton>
                      </div>
                      <div className="form-group row mb-0">
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Isim</label>
                            <Input
                              placeHolder="Adiniz"
                              value={firstName}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFirstName(e.target.value);
                              }}
                              block
                            />
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label>Soyisim</label>
                            <Input
                              placeHolder="Soyadiniz"
                              value={lastName}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setLastName(e.target.value);
                              }}
                              block
                            />
                          </div>
                        </div>
                      </div>
                      {role === AuthRole.STUDENT && (
                        <div className="form-group">
                          <label>Sinif Seciniz</label>
                          <Select
                            options={
                              classes
                                ? classes.map((c) => ({
                                    value: c.id,
                                    key: c.name,
                                  }))
                                : []
                            }
                            selected={selectedClass}
                            onChange={setSelectedClass}
                            placeHolder="Sınıf Seçiniz..."
                            block
                            className="mr-2"
                          />
                        </div>
                      )}

                      {role === AuthRole.TEACHER && (
                        <div className="form-group">
                          <label>Branslarinizi Seciniz</label>
                          <LessonList onUpdate={setLessonsListItem} items={lessonsListItems} />
                        </div>
                      )}
                      <div className="form-group">
                        <label>Email</label>
                        <Input
                          type="email"
                          placeHolder="Email adresiniz"
                          value={email}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setEmail(e.target.value);
                          }}
                          block
                        />
                      </div>
                      <div className="form-group">
                        <label>Sifre</label>
                        <Input
                          type="password"
                          placeHolder="Sifreniz"
                          value={password}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setPassword(e.target.value);
                          }}
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
                          Sign Up
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
                        Zaten uye misiniz?
                        <Link href="/sign-in">
                          <a className="theme-cl ml-2">Giris Yap!</a>
                        </Link>
                      </p>
                    </div>
                    <div className="fhg_45">
                      <p className="musrt">
                        <a href="forgot.html" className="text-danger">
                          Forgot Password?
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const classes = await getClassTypes();
  const lessons = await getLessons();
  return {
    props: {
      classes,
      lessons,
    }, // will be passed to the page component as props
  };
}
