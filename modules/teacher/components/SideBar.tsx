// Components
import { useRouter } from "next/router";
import { CheckList } from ".";
import { Button } from "../../../components";
import { useUser } from "../../auth/useUser";

// Types
import type { Teacher } from "../types";

type SideBarProps = {
  teacher: Teacher;
}

export const SideBar = ({ teacher }: SideBarProps) => {
  const { isAuthenticated } = useUser();
  const { asPath, push, query } = useRouter();
  const handlePlaningClick = () => {
    const { id } = query;
    if (!isAuthenticated) {
      // Redirect user to login page.
      const url = `/sign-in?redirectUrl=${asPath}`;
      push(url);
      return;
    }

    push(`/teacher/${id}/schedule`);
  };

  return (
    <div className="ed_view_box style_2 stick_top">
      <div className="ed_author">
        <h2 className="text-lg m-0">
          {teacher.basePrice} TL
          <span className="text-sm ">'den itibaren</span>
        </h2>
      </div>
      <div className="ed_view_features">
        <CheckList title="Branşlar" items={teacher.lessons.map(l => ({ key: l.id, value: l.name }))} />
        <CheckList title="Sınıflar" items={teacher.grades.map(l => ({ key: l.id, value: l.name }))} />
        <CheckList title="Alınabilecek Hizmetler" items={teacher.availableServiceTypes.map(l => ({ key: l.id, value: l.name }))} />
      </div>
      <div className="ed_view_link">
        <Button className="mt-3" onClick={handlePlaningClick} primary block>
          Ders Planla <i className="ti-angle-right"></i>
        </Button>
      </div>
    </div>
  );
};