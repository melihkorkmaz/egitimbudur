import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/layout/Layout";
import { useAuthentication } from "../store/authentication/useAuthentication";
import { AuthErrorType } from "../types/authentication";


export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { passwordReset } = useAuthentication();
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await passwordReset(password, router.query.code?.toString() || "");

    if (res && (res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }

    router.push("/");
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
                      <div className="Lpo09"><h4>Yeni Sifre</h4></div>
                      <div className="form-group">
                        <label>Yeni sifrenizi giriniz:</label>
                        <Input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <Button
                          type="submit"
                          className="btn full-width btn-md theme-bg text-white"
                          primary
                          block
                        >
                          Sifremi Sifirla
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
                        Bir hesabiniz yok mu?
                        <Link href="/sign-up">
                          <a className="theme-cl ml-2">Simdi Kaydol!</a>
                        </Link>
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