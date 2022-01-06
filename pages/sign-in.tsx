import React, { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/layout/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthErrorType } from "../types/authentication";
import { signIn } from "../services/authService";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn(email, password); 
  

    if ((res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }
    router.push("/");
  };

  return (
    <Layout>
      <section>
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-12 col-sm-12">
              <form onSubmit={handleSubmit}>
                <div className="crs_log_wrap">
                  <div className="crs_log__caption">
                    <div className="rcs_log_124">
                      <div className="Lpo09">
                        <h4>Hesabiniza Giris Yapin</h4>
                      </div>
                      <div className="form-group">
                        <label>E-mail Adresi:</label>
                        <Input
                          type="email"
                          value={email}
                          placeHolder="isim@gmail.com"
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setEmail(e.currentTarget.value)
                          }
                          block
                        />
                      </div>
                      <div className="form-group">
                        <label>Sifre</label>
                        <Input
                          type="password"
                          value={password}
                          placeHolder="*******"
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            setPassword(e.currentTarget.value)
                          }
                          block
                        />
                      </div>
                      <div className="form-group">
                        <Button type="submit" primary block>
                          Giris Yap
                        </Button>
                      </div>
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                    </div>
                    <div className="rcs_log_125">
                      <span>Or Login with Social Info</span>
                    </div>
                    {/* <div className="rcs_log_126">
                      <a href="javascript:void(0);" className="sl_btn">
                        <i className="ti-google text-danger"></i>Google
                      </a>
                    </div> */}
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
                    <div className="fhg_45">
                      <p className="musrt">
                        <Link href="/forgot-password">
                          <a className="text-danger">Sifremi Unuttum!</a>
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
