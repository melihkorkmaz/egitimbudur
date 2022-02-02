import { useUser } from "../../modules/auth/useUser";
import { Button } from "../";

export const UserTopMenu = () => {
  const { isAuthenticated, logout } = useUser();

  if (!isAuthenticated) {
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

  return (
    <ul className="nav-menu nav-menu-social align-to-right mt-3">
      <li>
        <Button onClick={logout} primary>Cikis Yap</Button>
      </li>
    </ul>
  )

  return null;
}