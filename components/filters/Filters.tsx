import React from "react";
import { useFilter } from "../../hooks/useFilter";
import { GradeType, LessonType, SearchFilterType, TeacherServiceCategoryType } from "../../types/common";
import { SelectListFilter } from './SelectListFilter';
import { SearchInput } from './SearchInput';
import { CheckListFilter } from './CheckListFilter';
import { connectNumericMenu } from 'react-instantsearch-dom';
import { RadioButton } from '../RadioButton';

type FiltersType = {
  classes: GradeType[];
  lessons: LessonType[];
  services: TeacherServiceCategoryType[];
  onChange: (filter: SearchFilterType) => void;
};

const NumericMenu = connectNumericMenu(({ items, currentRefinement, refine  }) => {
  return (<ul className="no-ul-list mb-3">
    {items.map((item) => (
      <li key={item.value} className="mb-1">
        <RadioButton 
          id={item.label} 
          group="prices"
          value={item.value}
          checked={currentRefinement === item.value}
          onChange={() => {
            refine(item.value);
          }}
        >
            {item.label}
        </RadioButton>
      </li>
    ))}
  </ul>)

});

export const Filters = ({
  classes = [],
  lessons = [],
  services = [],  
}: FiltersType) => {
  const { filter } = useFilter();

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
            <SearchInput placeHolder="Ogretmen adiyla ara..." />
          </div>

          <div className="form-group">
            <SelectListFilter
              placeHolder="Sinif Seciniz..."
              customItems={classes} 
              attribute="gradeIds" 
              defaultRefinement={filter?.gradeId}
            />
          </div>

          <div className="form-group">
            <h6>Dersler</h6>
            <CheckListFilter 
              attribute="lessonsIds" 
              customItems={lessons} 
              defaultRefinement={filter?.lessonIds}
            />
          </div>

          <div className="form-group">
            <h6>Kategori</h6>
            <CheckListFilter 
              attribute="servicesIds" 
              customItems={services} 
              defaultRefinement={filter?.teacherServiceCategoryIds}
            />
          </div>

          <div className="form-group">
            <h6>Ucret</h6>
            <NumericMenu
              attribute="basePrice"
              items={[
                { label: '<= 50 TL', end: 50 },
                { label: '50 TL - 100 TL', start: 50, end: 100 },
                { label: '100 TL - 500 TL', start: 100, end: 200 },
                { label: '>= 200 TL', start: 200 },
              ]}
              translations={{
                all: 'Tumu',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
