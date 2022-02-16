import { ServiceTypeEnum, TeacherServiceCategoryType } from "../types/common";
import { getServiceName } from "../utils/common";
import { Checkbox } from "./";

// Type
import type { CheckedState } from './';

export type ServiceListType = {
  service: TeacherServiceCategoryType;
  selected: boolean;
}

type ServiceListProps = {
  items: ServiceListType[];
  onUpdate: (items: ServiceListType[]) => void;
}

export const ServiceList = ({
  items,
  onUpdate
}: ServiceListProps) => {

  return (
    <ul className="no-ul-list mb-3">
      {items.map((item) => (
        <li key={item.service.id}>
          <Checkbox 
            name={`service-${item.service.id}`}
            checked={item.selected}
            onCheckedChange={(e: CheckedState) => {
              onUpdate([...items].map(i => {
                if (i === item) {
                  return ({
                    service: i.service,
                    selected: e.valueOf() as boolean
                  })
                }

                return i
              }));
            }}
          >
            {getServiceName(item.service.name)}
          </Checkbox>
        </li>
      ))}
    </ul>
  );
};