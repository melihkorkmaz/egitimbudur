import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { AuthenticatedLayout } from "../components/authenticatedLayout/AuthenticatedLayout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { TableAction } from "../components/TableAction";
import { TeacherServiceForm } from "../components/TeacherServiceForm";
import { TEACHER_SERVICES } from "../graphql/queries";
import { getTeacherServiceTypes } from "../services/commonService";
import { useAuthentication } from "../store/authentication/useAuthentication";
import { TeacherService, TeacherServiceType } from "../types/common";

interface MyServicesProps {
  teacherServiceTypes?: TeacherServiceType[];
}

export default function MyServices({
  teacherServiceTypes = []
}: MyServicesProps) {
  const {userId} = useAuthentication();
  const [services, setServices] = useState<TeacherService[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const {loading, error, data, refetch } = useQuery(TEACHER_SERVICES, {
    variables: {
      id: userId
    }
  });

  const handleEdit = (id: string) => {
    
  };

  const handleRemove = (id: string) => {

  };

  useEffect(() => {
    if (loading || error) {
      return;
    }

    const teacherServices = data.teacherServices.data.map(d => ({
      id: d.id,
      duration: d.attributes.duration,
      price: d.attributes.price,
      serviceTypeId: d.attributes.teacher_service_type.data.id,
      serviceTypeName: d.attributes.teacher_service_type.data.attributes.name,
    } as TeacherService));

    setServices(teacherServices);

  }, [data, error, loading]);

  return (
    <AuthenticatedLayout currentPage="my-services">
      <div className="dashboard_wrap">

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
            <h6 className="m-0 flex justify-between">
              <span>
                Hizmet ve Ucretlerim
              </span>
              {!isEditMode && <div>
                <Button primary onClick={() => setIsEditMode(true)}>Yeni hizmet ekle</Button>
              </div>}
            </h6>
          </div>
        </div>

        {isEditMode && <TeacherServiceForm 
          teacherServiceTypes={teacherServiceTypes} 
          onSubmit={() => {
            refetch();
            setIsEditMode(false);
          }}
          onCancel={() => setIsEditMode(false)}/>}

        {!isEditMode && <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 mb-2">
            <div className="table-responsive">
              <table className="table dash_list">
                <thead>
                  <tr>
                    <th scope="col">Hizmet</th>
                    <th scope="col">Sure</th>
                    <th scope="col">Ucret</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service.id}>
                      <td><span className="smalls lg">{service.serviceTypeName}</span></td>
                      <td><span className="smalls lg">{service.duration} dk</span></td>
                      <td><span className="smalls lg">{service.price} TL</span></td>
                      <td>
                        <TableAction>
                          {({ close }) => (
                            <>
                              <a className="dropdown-item" href="#" onClick={e => {
                                e.preventDefault();
                                handleEdit('1');
                                close();
                              }}>Duzenle</a>
                              <a className="dropdown-item" href="#" onClick={e => {
                                e.preventDefault();
                                handleEdit('1');
                                close();
                              }}>Sil</a>
                            </>
                          )}
                        </TableAction>
                      </td>
                    </tr>
                  ))}                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        }
      </div>
    </AuthenticatedLayout>
  )
}

export async function getServerSideProps(context) {
  const teacherServiceTypes = await getTeacherServiceTypes();
  return {
    props: {
      teacherServiceTypes
    }
  };
}