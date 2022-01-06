import { useEffect, useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { getServiceTypes } from "../services/commonService";
import { addService, updateService } from "../services/userService";
import { TeacherService, TeacherServiceCategoryType, TeacherServiceType } from "../types/common";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select"

interface TeacherServiceFormProps {
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
  const {userProfile} = useUserProfile();
  const [price, setPrice] = useState(selectedService?.price || 100);
  const [duration, setDuration] = useState(selectedService?.duration || 40);
  const [selectedServiceType, setSelectedServiceType] = useState<TeacherServiceType | undefined>(selectedService?.serviceType || undefined)
  const [teacherServiceTypes, setTeacherServiceTypes] = useState<TeacherServiceType[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile || !selectedServiceType) { return; }
    
    const req = {
      serviceType: selectedServiceType,
      price,
      duration,
    } as TeacherService;

    if (selectedService) {
      await updateService(userProfile.id, {
        ...req,
        id: selectedService.id
      });
    } else {
      await addService(userProfile.id, req);
    };

    onSubmit();
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getServiceTypes();
      setTeacherServiceTypes(res);
    };

    fetchServices();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group smalls">
        <label>Hizmet Tipi*</label>
        <div className="simple-input">
          <Select
            options={
              teacherServiceTypes.map((c) => ({
                value: c.id,
                key: c.name,
              }))
            }
            selected={selectedServiceType?.id}
            onChange={(item) => {
              setSelectedServiceType(teacherServiceTypes.find(t => t.id === item.value) as TeacherServiceCategoryType);
            }}
            placeHolder="Hizmet tipi seciniz"
            block
            className="mr-2"
          />
        </div>
      </div>
      <div className="form-group smalls">
        <label>Sure*</label>
        <div className="simple-input">
          <Select
            options={
              durations.map((c) => ({
                value: c,
                key: `${c} dakika`,
              }))
            }
            selected={duration}
            onChange={(item) => setDuration(item.value as number)}
            placeHolder="Sure seciniz"
            block
            className="mr-2"
          />
        </div>
      </div>
      <div className="form-group smalls">
        <label>Ucret*</label>
        <div className="simple-input">
          <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} block />
        </div>
      </div>

      <div className="form-group smalls grid grid-cols-2">
        <Button onClick={onCancel} block>Iptal</Button>
        <Button type="submit" primary block>Kaydet</Button>
      </div>

    </form>
  )
}