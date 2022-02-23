import { useEffect, useState } from "react";

// Components
import { Button, Input, Label, Select } from "../../../components";

// Services & Hooks
import { useUser } from "../../auth/useUser";
import { getServices } from "../../common/commonService";
import { addService, updateService } from "../teacherService";

// Types
import type { Service, TeacherService, TeacherServiceDTO } from "../types";

type TeacherServiceFormProps = {
  onCancel: () => void;
  onSubmit: () => void;
  selectedService?: TeacherService;
}

const durations = [15, 20, 25, 30, 35, 40, 45, 50, 60];
export const TeacherServiceForm = ({
  onCancel,
  onSubmit,
  selectedService
}: TeacherServiceFormProps) => {
  const { user } = useUser();
  const [price, setPrice] = useState(selectedService?.price || 100);
  const [duration, setDuration] = useState(selectedService?.duration || 40);
  const [selectedServiceType, setSelectedServiceType] = useState<Service | undefined>(selectedService?.service || undefined)
  const [teacherServiceTypes, setTeacherServiceTypes] = useState<Service[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedServiceType) { return; }
    
    const req = {
      typeId: selectedServiceType.id,
      typeName: selectedServiceType.name,
      price,
      duration,
    } as TeacherServiceDTO;

    if (selectedService) {
      await updateService(user.id, {
        ...req,
        id: selectedService.id
      });
    } else {
      await addService(user.id, req);
    };

    onSubmit();
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServices();
      setTeacherServiceTypes(res);
    };

    fetchServices();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group smalls">
        <Label>Hizmet Tipi*</Label>
        <div className="simple-input">
          <Select
            selectedValue={selectedServiceType?.id}
            selectedText={selectedServiceType?.name}
            onChange={(value) => {
              setSelectedServiceType(teacherServiceTypes.find(t => t.id === value) as Service);
            }}
            placeHolder="Hizmet tipi seciniz"
            block
            className="mr-2"
          >
            {teacherServiceTypes.map(c => (
              <Select.Item key={c.id} value={c.id}>
                {c.name}
              </Select.Item>
            ))}
          </Select>
        </div>
      </div>
      <div className="form-group smalls">
        <Label>Sure*</Label>
        <div className="simple-input">
          <Select
            selectedValue={duration.toString()}
            selectedText={`${duration} dakika`}
            onChange={(value) => setDuration(value as number)}
            placeHolder="Sure seciniz"
            block
            className="mr-2"
          >
            {durations.map(d => (
              <Select.Item value={d.toString()} key={d}>
                {`${d} dakika`}
              </Select.Item>
            ))}
          </Select>
        </div>
      </div>
      <div className="form-group smalls">
        <Label>Ucret*</Label>
        <div className="simple-input">
          <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} block />
        </div>
      </div>

      <div className="form-group smalls grid grid-cols-2">
        <Button onClick={onCancel} block>Iptal</Button>
        <Button type="submit" primary block>Kaydet</Button>
      </div>

    </form>
  );
};