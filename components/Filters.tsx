import React, { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import { GradeType, LessonType, SearchFilterType, TeacherServiceCategoryType } from "../types/common";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";
import { LessonList, LessonListType } from "./LessonList";
import { Select } from "./Select";
import { ServiceList, ServiceListType } from "./ServiceList";

type FiltersType = {
  classes: GradeType[];
  lessons: LessonType[];
  services: TeacherServiceCategoryType[];
  onChange: (filter: SearchFilterType) => void;
};

export const Filters = ({
  classes = [],
  lessons = [],
  services = [],
  onChange,
}: FiltersType) => {
  const { filter, hasFilter, setFilter, clearFilter } = useFilter();
  const [searchKey, setSearchKey] = useState<string | undefined>();
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>();
  const [lessonsListItems, setLessonsListItem] = useState<LessonListType[]>(lessons.map(l => ({
    lesson: l,
    selected: false
  })));
  const [serviceListItems, setServiceListItems] = useState<ServiceListType[]>(services.map(s => ({
    service: s,
    selected: false
  })));


  useEffect(() => {
    if (!filter) {
      setSearchKey("");
      setSelectedGrade(undefined);
      setLessonsListItem(lessonsListItems.map(l => ({...l, selected: false})));
      setServiceListItems(serviceListItems.map(l => ({...l, selected: false})));
      return;
    }

    setSelectedGrade(filter.gradeId);

    if (filter.lessonIds) {
      setLessonsListItem(lessonsListItems.map(l => ({
        ...l,
        selected: (filter.lessonIds || []).includes(l.lesson.id)
      })));
    }

    if (filter.teacherServiceCategoryIds) {
      setServiceListItems(serviceListItems.map(l => ({
        ...l,
        selected: (filter.teacherServiceCategoryIds || []).includes(l.service.id)
      })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFilter = {
      ...filter,
    }

    if (selectedGrade) {
      newFilter.gradeId = selectedGrade;
    }

    const selectedLessons = lessonsListItems.filter(l => l.selected);
    const selectedServices = serviceListItems.filter(l => l.selected);

    if (selectedLessons && selectedLessons.length > 0) {
      newFilter.lessonIds = selectedLessons.map(l => l.lesson.id);
    }

    if (selectedServices && selectedServices.length > 0) {
      newFilter.teacherServiceCategoryIds = selectedServices.map(l => l.service.id);
    }

    if (searchKey && searchKey.length > 0) {
      newFilter.key = searchKey;
    }

    setFilter(newFilter);
    onChange(newFilter);
  }


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
        <form onSubmit={handleSubmit} className="sidebar-widgets p-4">
          <div className="form-group">
            <Input
              placeHolder="Ogretmen adiyla ara..."
              value={searchKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value)}
              block
            />
          </div>

          <div className="form-group">
            <div className="simple-input">
              <Select placeHolder="Sinif" options={classes.map(c => ({
                key: c.name,
                value: c.id
              }))} selected={selectedGrade} onChange={(item) => setSelectedGrade(item.value)} block />
            </div>
          </div>

          <div className="form-group">
            <h6>Dersler</h6>
            <LessonList onUpdate={setLessonsListItem} items={lessonsListItems} />
          </div>

          <div className="form-group">
            <h6>Kategori</h6>
            <ServiceList items={serviceListItems} onUpdate={setServiceListItems}/>
          </div>

          {/* <div className="form-group">
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
          </div> */}

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 pt-4">
              <Button type="submit" primary block>
                Filtreyi Uygula
              </Button>

              {hasFilter && <Button type="button" onClick={clearFilter} className="my-2" block>
                Filtreyi Temizle
              </Button>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
