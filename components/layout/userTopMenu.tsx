import { useUser } from "../../modules/auth/useUser";
import { Button } from "..";
import { LogoutIcon } from '@heroicons/react/outline'

export const UserTopMenu = () => {
  const { isAuthenticated, logout } = useUser();

  if (!isAuthenticated) {
    return (
      <ul className="flex space-x-3 items-center">
        <li>
          <Button className="flex space-x-1" renderAs="a" href="/sign-in">
            <LogoutIcon className="h-5 w-5 font-bold" />
            <span>Giriş</span>
          </Button>
        </li>
        <li>
          <Button renderAs="a" href="/sign-up" primary>Şimdi Kaydol!</Button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="flex space-x-3 items-center">
      <li>
        <Button onClick={logout} primary>Cikis Yap</Button>
      </li>
    </ul>
  );  
}