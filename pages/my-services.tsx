import { useEffect, useReducer } from "react";

// Components
import { 
  AdminLayout, 
  Button, 
  TableAction,
} from "../components";
import { TeacherServiceForm } from "../modules/teacher/components/TeacherServiceForm";

// Services & Hooks
import { useUser } from "../modules/auth/useUser";
import { deleteService, getTeacherServices } from "../modules/teacher/teacherService";

// Types
import type { TeacherService } from "../modules/teacher/types";

type MyServicesState = {
  isEditMode: boolean;
  services: TeacherService[];
  selectedService?: TeacherService;
};

const newServiceAction = () => ({
  type: 'NEW_SERVICE'
} as const);

const editServiceAction = (selectedService: TeacherService) => ({
  type: 'EDIT_MODE',
  payload: selectedService
} as const);

const onCompleteAction = () => ({
  type: 'ON_COMPLETE',
} as const);

const onTecherServiceFetchComplete = (services: TeacherService[]) => ({
  type: 'ON_FETCH_COMPLETE',
  payload: services
} as const);

type ActionType = ReturnType<typeof newServiceAction | typeof editServiceAction | typeof onCompleteAction | typeof onTecherServiceFetchComplete>;

const reducer = (state:MyServicesState, action: ActionType): MyServicesState => {
  switch(action.type) {
    case 'NEW_SERVICE':
      return {
        ...state,
        selectedService: undefined,
        isEditMode: true,
      };
    case 'EDIT_MODE':
      return {
        ...state,
        selectedService: action.payload,
        isEditMode: true,
      };
    case 'ON_COMPLETE': {
      return {
        ...state,
        isEditMode: false,
      }
    }
    case 'ON_FETCH_COMPLETE': {
      return {
        ...state,
        services: action.payload,
      }
    }
    default:
      return state;
  }
};

export default function MyServices() {
  const { user } = useUser();
  const [{
    isEditMode,
    services,
    selectedService
  }, dispatch] = useReducer(reducer, {
    isEditMode: false,
    services: [],
  });
  
  const handleRemove = async (id: string) => {
    if (!user ) {
      return;
    };
    await deleteService(user.id, id);
    fetchTeacherServices();
  };

  const fetchTeacherServices = async () => {
    if (!user) {
      return;
    };

    const res = await getTeacherServices(user.id);
    dispatch(onTecherServiceFetchComplete(res));
  };

  useEffect(() => {
    fetchTeacherServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  return (
    <AdminLayout currentPage="my-services">
      <div className="dashboard_wrap">

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 mb-4">
            <h6 className="m-0 flex justify-between">
              <span>
                Hizmet ve Ucretlerim
              </span>
              {!isEditMode && <div>
                <Button primary onClick={() => {
                  dispatch(newServiceAction());
                }}>Yeni hizmet ekle</Button>
              </div>}
            </h6>
          </div>
        </div>

        {isEditMode && <TeacherServiceForm
          selectedService={selectedService}
          onSubmit={() => {
            dispatch(onCompleteAction());
            fetchTeacherServices();
          }}
          onCancel={() => {
            dispatch(onCompleteAction());
          }}/>}

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
                      <td><span className="smalls lg">{service.service.name}</span></td>
                      <td><span className="smalls lg">{service.duration} dk</span></td>
                      <td><span className="smalls lg">{service.price} TL</span></td>
                      <td>
                        <TableAction>
                          {({ close }) => (
                            <>
                              <a className="dropdown-item" href="#" onClick={e => {
                                e.preventDefault();
                                dispatch(editServiceAction(service));
                                close();
                              }}>Duzenle</a>
                              <a className="dropdown-item" href="#" onClick={e => {
                                e.preventDefault();
                                handleRemove(service.id);
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
    </AdminLayout>
  )
};
