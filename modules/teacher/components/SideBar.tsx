// Components
import { CheckList } from ".";

// Types
import type { Teacher } from "../types";

type SideBarProps = {
  teacher: Teacher;
}

export const SideBar = ({ teacher }: SideBarProps) => (
  <div className="ed_view_box style_2 stick_top">
    <div className="ed_author">
      <h2 className="theme-cl m-0">{teacher.basePrice} TL</h2>
    </div>
    <div className="ed_view_features">
      <CheckList title="Branşlar" items={teacher.lessons.map(l => ({ key: l.id, value: l.name}))} />
      <CheckList title="Sınıflar" items={teacher.grades.map(l => ({ key: l.id, value: l.name}))} />
      <CheckList title="Alınabilecek Hizmetler" items={teacher.availableServiceTypes.map(l => ({ key: l.id, value: l.name}))} />
    </div>
    <div className="ed_view_link">
      <a href="#" className="btn theme-bg enroll-btn">Ders Planla<i className="ti-angle-right"></i></a>
    </div>
  </div>
);