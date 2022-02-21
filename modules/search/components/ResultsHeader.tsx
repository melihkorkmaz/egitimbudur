import { Stats, } from 'react-instantsearch-dom';

// COMPONENTS
import { SortBy } from '.';
import { Label, Card } from '../../../components';

export const ResultsHeader = () => (
  <Card className="mb-3 w-full flex items-center justify-between">
    <h6 className="m-0">
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
    <div className="mr-2">
      <Label className="mr-2">Sırala:</Label>
      <SortBy
        defaultRefinement="dev_teachers"
        items={[
          { value: 'dev_teachers', label: 'İlgili' },
          { value: 'teachers_basePrice_asc', label: 'Fiyat Artan' },
          { value: 'teachers_basePrice_desc', label: 'Fiyat Azalan' },
        ]}
      />
    </div>
  </Card>
);