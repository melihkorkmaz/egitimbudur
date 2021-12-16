import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/layout/Layout";
import { AuthErrorType, resetPassword } from "../services/authenticationService";
export default function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const res = await resetPassword(email);

    if((res as AuthErrorType).message) {
      setError((res as AuthErrorType).message);
      return;
    }

    router.push("/sign-in");
  }

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
                        <h4>Sifremi unuttum!</h4>
                      </div>
                      <div className="form-group">
                        <label>Email adresiniz</label>
                        <Input
                          type="email"
                          placeHolder="email@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          block
                        />
                      </div>
                      <div className="form-group">
                        <Button type="submit" block primary>
                          Sifremi Sifirla
                        </Button>
                      </div>
                      {error !== '' && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="crs_log__footer d-flex justify-content-between">
                    <div className="fhg_45">
                      <p className="musrt">
                        Henuz kayitli degil misiniz?
                        <Link href="/sign-up" >
                          <a className="theme-cl ml-2">
                            Simdi Kaydol!
                          </a>
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
