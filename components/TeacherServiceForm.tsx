import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_TEACHER_SERVICE } from "../graphql/mutations";
import { useAuthentication } from "../store/authentication/useAuthentication";
import { TeacherServiceType } from "../types/common";
import { Button } from "./Button"
import { Input } from "./Input"
import { Select } from "./Select"

interface TeacherServiceFormProps {
  teacherServiceTypes?: TeacherServiceType[];
  onCancel: () => void;
  onSubmit: () => void;
}

const durations = [15, 20, 25, 30, 35, 40, 45, 50, 60];
export const TeacherServiceForm = ({
  teacherServiceTypes = [],
  onCancel,
  onSubmit
}: TeacherServiceFormProps) => {
  const {userId} = useAuthentication();
  const [price, setPrice] = useState(100);
  const [duration, setDuration] = useState(40);
  const [selectedServiceType, setSelectedServiceType] = useState<number>()
  const [createServiceMutation] = useMutation(CREATE_TEACHER_SERVICE);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");

    const { data } = await createServiceMutation({
      variables: {
        data: {
          users_permissions_user: userId,
          teacher_service_type: selectedServiceType,
          price,
          duration,
          publishedAt: new Date()
        }
      }
    });

    console.log('data', data);
    onSubmit();
  };

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
            selected={selectedServiceType}
            onChange={(item) => setSelectedServiceType(item.value as number)}
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