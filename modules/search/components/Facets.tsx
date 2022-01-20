// HOOKS
import { useFilter } from "../hooks";

// COMPONENTS
import { 
  NumericFilter, 
  SelectListFilter, 
  SearchInput, 
  CheckListFilter
} from '.';

// TYPES
import type { Service } from "../../teacher/types";
import type { Grade, Lesson } from "../../common/types";

type FiltersType = {
  classes: Grade[];
  lessons: Lesson[];
  services: Service[];
};

export const Facets = ({
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
        Arama Filtresi<i className="fa fa-sliders-h ml-2"></i>
      </a>
      <div className="collapse" id="fltbox">
        <div className="sidebar-widgets p-4">
          <div className="form-group">
            <SearchInput placeHolder="Öğretmen adıyla ara..." />
          </div>

          <div className="form-group">
            <SelectListFilter
              placeHolder="Sınıf Seçiniz..."
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
            <h6>Ücret</h6>
            <NumericFilter
              attribute="basePrice"
              group="prices"
              items={[
                { label: '<= 50 TL', end: 50 },
                { label: '50 TL - 100 TL', start: 50, end: 100 },
                { label: '100 TL - 500 TL', start: 100, end: 200 },
                { label: '>= 200 TL', start: 200 },
              ]}
              translations={{
                all: 'Hepsi',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
