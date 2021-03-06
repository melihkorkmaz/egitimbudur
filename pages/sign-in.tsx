import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Components
import { Button, Input, Label, Layout } from "../components";

// Services
import { signIn } from "../modules/auth/authService";

// Types
import type { AuthErrorType } from "../modules/auth/types";

export default function SignIn() {
  const { push, query } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { redirectUrl } = query;
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData) as { email: string, password: string };
    const res = await signIn(email, password);

    if ((res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }

    if (redirectUrl && typeof redirectUrl === 'string') {
      push(redirectUrl);
      return;
    }

    push("/");
  };

  return (
    <Layout>
      <div className="mb-5 max-w-[670px] mx-auto mt-8">
        <form onSubmit={handleSubmit}>
          <div className="crs_log_wrap">
            <div className="crs_log__caption">
              <div className="rcs_log_124">
                <div className="Lpo09">
                  <h4>Hesabınıza Giriş Yapın</h4>
                </div>
                <div className="form-group">
                  <Label htmlFor="email">E-mail Adresi:</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeHolder="isim@gmail.com"
                    block
                    required
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeHolder="*******"
                    block
                    required
                  />
                </div>
                <div className="form-group">
                  <Button type="submit" primary block>
                    Giriş Yap
                  </Button>
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between w-full px-8 py-3 mt-8 border-t">
              <div className="fhg_45">
                <p className="musrt">
                  Bir hesabınız yok mu?
                  <Link href="/sign-up">
                    <a className="theme-cl ml-2">Şimdi Kaydol!</a>
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
    </Layout>
  );
};
