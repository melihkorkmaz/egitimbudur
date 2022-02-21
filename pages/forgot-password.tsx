import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";

// Components
import { Button, Input, Label, Layout } from "../components";

export default function ForgotPassword() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const { email } = Object.fromEntries(formData) as { email: string };

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Email gönderildi. Lütfen emailde yer alan linki kullanarak sifrenizi resetleyiniz.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <Layout>
      <section>
        <div className="mb-5 max-w-[670px] mx-auto mt-8">
          <form onSubmit={handleSubmit}>
            <div className="crs_log_wrap">
              <div className="crs_log__caption">
                <div className="rcs_log_124">
                  <div className="Lpo09"><h4>Şifremi Unuttum</h4></div>
                  <div className="form-group">
                    <Label htmlFor="email">Email adresi:</Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      className="form-control"
                      placeHolder="email@gmail.com"
                    />
                  </div>
                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn full-width btn-md theme-bg text-white"
                      primary
                      block
                    >
                      Şifremi Sıfırla
                    </Button>
                  </div>
                  {error !== "" && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  {message !== "" && (
                    <div className="alert alert-success" role="message">
                      {message}
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
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};