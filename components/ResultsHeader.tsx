import { Select } from "./Select";

export const ResultsHeader = () => {
  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="short_wraping">
          <div className="row m-0 align-items-center justify-content-between">
            <div className="col-lg-4 col-md-5 col-sm-12 col-sm-6">
              <div className="shorting_pagination_laft">
                <h6 className="m-0">Toplam 72 sonuc</h6>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 col-sm-12 col-sm-6">
              <div className="dlks_152">
                <div className="shorting-right mr-2">
                  <label>Sirala:</label>
                  <Select options={[
                    { value: "1", key: "En cok oy olanlar"},
                    { value: "2", key: "En yeniler"}
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
