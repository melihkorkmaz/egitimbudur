import { useAuthentication } from "../../store/authentication/useAuthentication";
import { AuthCurrentState } from "../../types/authentication";
import { Button } from "../Button";

export const UserTopMenu = () => {

  const { authState, logout } = useAuthentication();

  if (authState === AuthCurrentState.NOT_AUTHENTICATED) {
    return (
      <ul className="nav-menu nav-menu-social align-to-right mt-3">
        <li>
          <Button renderAs="a" href="/sign-in">
            <i className="fas fa-sign-in-alt mr-1"></i>
            <span className="dn-lg">Giriş</span>
          </Button>
        </li>
        <li>
          <Button renderAs="a" href="/sign-up" primary>Şimdi Kaydol!</Button>
        </li>
      </ul>
    );
  }

  if (authState === AuthCurrentState.AUTHENTICATED) {
    return (
      <ul className="nav-menu nav-menu-social align-to-right mt-3">
        <li>
          <Button onClick={logout} primary>Cikis Yap</Button>
        </li>
      </ul>
    )
  }


  return null;
}