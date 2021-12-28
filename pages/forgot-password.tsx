import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/layout/Layout";
import { useAuthentication } from "../store/authentication/useAuthentication";
import { AuthErrorType } from "../types/authentication";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const res = await forgotPassword(email);

    if (res && (res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }

    setMessage('Email gönderildi. Lutfen emailde yer alan linki kullanarak sifrenizi resetleyiniz.');
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
                      <div className="Lpo09"><h4>Sifremi Unuttum</h4></div>
                      <div className="form-group">
                        <label>Email adresi:</label>
                        <Input
                          type="email"
                          className="form-control"
                          placeHolder="email@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                      {message !== "" && (
                        <div className="alert alert-success" role="message">
                          {message}
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