import { Select } from "./Select";
import { Stats, connectSortBy } from 'react-instantsearch-dom';

const SortBy = connectSortBy(({ items, currentRefinement, refine }) => {
  
  return (<Select 
    options={items.map(item => ({
      key: item.label,
      value: item.value
    }))}
    selected={currentRefinement || ''}
    onChange={(selectedItem) => {
      refine(selectedItem.value);
    }}
  />)
});

export const ResultsHeader = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="short_wraping">
          <div className="row m-0 align-items-center justify-content-between">
            <div className="col-lg-4 col-md-5 col-sm-12 col-sm-6">
              <div className="shorting_pagination_laft">
                <h6 className="m-0 normal-case">
                  <Stats
                    translations={{
                      stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                        return areHitsSorted && nbHits !== nbSortedHits
                          ? `${nbSortedHits!.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                          : `Toplam ${nbHits.toLocaleString()} sonuç bulundu.`;
                      },
                    }}
                  />
                </h6>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 col-sm-12 col-sm-6">
              <div className="dlks_152">
                <div className="shorting-right mr-2">
                  <label>Sirala:</label>
                  <SortBy
                    defaultRefinement="dev_teachers"
                    items={[
                      { value: 'dev_teachers', label: 'Ilgili' },
                      { value: 'teachers_basePrice_asc', label: 'Fiyat Artan' },
                      { value: 'teachers_basePrice_desc', label: 'Fiyat Azalan' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
