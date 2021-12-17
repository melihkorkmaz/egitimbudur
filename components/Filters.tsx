import { useState } from "react";
import { GradeType, LessonType } from "../store/search/types";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { LessonList, LessonListType } from "./LessonList";
import { Select, SelectItem } from "./Select";

type FiltersType = {
  classes: GradeType[];
  lessons: LessonType[];
};

export const Filters = ({
  classes = [],
  lessons = [],
}: FiltersType) => {
  const [selectedClass, setSelectedClass] = useState<SelectItem | undefined>();
  const [lessonsListItems, setLessonsListItem] = useState<LessonListType[]>(lessons.map(l => ({
    lesson: l,
    selected: false
  })));
  return (
    <div className="page-sidebar stick_top p-0">
      <a
        className="filter_links"
        data-toggle="collapse"
        href="#fltbox"
        role="button"
        aria-expanded="false"
        aria-controls="fltbox"
      >
        Open Advance Filter<i className="fa fa-sliders-h ml-2"></i>
      </a>
      <div className="collapse" id="fltbox">
        <div className="sidebar-widgets p-4">
          <div className="form-group">
            <Input placeHolder="Ogretmen adiyla ara..." value={""} onChange={() => {}} block />
          </div>

          <div className="form-group">
            <div className="simple-input">
              <Select placeHolder="Sinif" options={classes.map(c => ({
                key: c.name,
                value: c.id
              }))} selected={selectedClass} onChange={setSelectedClass} block/>
            </div>
          </div>

          <div className="form-group">
            <h6>Dersler</h6>
            <LessonList onUpdate={setLessonsListItem} items={lessonsListItems} />
          </div>

          <div className="form-group">
            <h6>Kategori</h6>
            <ul className="no-ul-list mb-3">
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  1-1 Ozel Ders
                </Checkbox>
              </li>
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  Soru Cozumu
                </Checkbox>
              </li>
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  Tercih Danismanligi
                </Checkbox>
              </li>
            </ul>
          </div>

          <div className="form-group">
            <h6>Fiyat</h6>
            <ul className="no-ul-list mb-3">
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  50 TL'den az
                </Checkbox>
              </li>
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  50 TL - 100TL arası
                </Checkbox>
              </li>
              <li>
                <Checkbox id="f-1" checked={false} onChange={() => {}}>
                  100 TL - 200TL arası
                </Checkbox>
              </li>
              <li>
                <Checkbox id="f-2" checked={false} onChange={() => {}}>
                  200 TL'den fazla
                </Checkbox>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 pt-4">
              <Button primary block>
                Filtreyi Uygula
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
