import { useEffect, useState } from "react";
import { AdminLayout, Button, Card, Select } from "../components";
import { XCircleIcon } from '@heroicons/react/solid'
import { useUser } from "../modules/auth/useUser";
import { getTeacherAvailability, updateTeacherAvailability } from "../modules/teacher/teacherService";

const days = ["Pazartesi", "Sali", "Carsamba", "Persembe", "Cuma", "Cumartesi", "Pazar"];

const hoursOfDay = (new Array(24).fill(null)).reduce((previous, current, index) => {
  const hour = index < 10 ? `0${index}` : index;

  previous.push(`${hour}:00`);
  previous.push(`${hour}:30`);

  return previous;
}, []);

const formatHour = (hour: number, minute: number) => {
  const hourFormatted = hour < 10 ? `0${hour}` : hour;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${hourFormatted}:${formattedMinute}`;
};

const getHourAndMinuteFromString = (timeSlot: string) => {
  const [hour, minute] = timeSlot.split(":");

  return {
    hour: Number(hour),
    minute: Number(minute)
  };
};

const AvailablityCard = ({
  availablity,
  onChange
}: { availablity: AvailablityType, onChange: (availablity: AvailablityType) => void }) => {

  const handleChange = (value: string, type: "start" | "end", index: number) => {
    const { hour, minute } = getHourAndMinuteFromString(value);
    const slots = [...availablity.slots];
    const currentSlot = { ...slots[index] };

    currentSlot[type] = { hour, minute };

    onChange({
      ...availablity,
      slots: slots.map((slot, i) => i === index ? currentSlot : slot)
    });
  };

  const addNewSlot = () => {
    onChange({
      ...availablity,
      slots: [
        ...availablity.slots,
        {
          start: {
            hour: 9,
            minute: 0
          },
          end: {
            hour: 17,
            minute: 0
          }
        }
      ]
    });
  };

  const handleRemoveSlot = (index: number) => {
    onChange({
      ...availablity,
      slots: availablity.slots.filter((_, i) => i !== index)
    });
  }

  return (
    <div className="px-3 pt-3 border rounded border-gray-200">
      <span className="font-bold">{availablity.day}</span>
      {availablity.slots.map(({ start, end }, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="min-w-[80px]">
            <Select size="sm"
              selectedValue={formatHour(start.hour, start.minute)}
              selectedText={formatHour(start.hour, start.minute)}
              onChange={(value) => handleChange(value, "start", index)}
            >
              {hoursOfDay.map(h => (
                <Select.Item key={h} value={h}>
                  {h}
                </Select.Item>
              ))}
            </Select>
          </div>
          <span className="text-sm">'den</span>
          <div className="min-w-[80px]">
            <Select size="sm"
              selectedValue={formatHour(end.hour, end.minute)}
              selectedText={formatHour(end.hour, end.minute)}
              onChange={(value) => handleChange(value, "end", index)}>
              {hoursOfDay.map(h => (
                <Select.Item key={h} value={h}>
                  {h}
                </Select.Item>
              ))}
            </Select>
          </div>
          <span className="text-sm">'e kadar</span>
          <div className="flex flex-1 justify-end items-center">
            <div role="button" className="cursor-pointer inline-block" onClick={() => handleRemoveSlot(index)}>
              <XCircleIcon className="h-5 w-5 text-red-700" />
            </div>
          </div>
        </div>
      ))}
      <div className="text-center my-2">
        <span 
          onClick={addNewSlot}
          role="button" 
          className="text-sm text-primary cursor-pointer hover:underline">
            Yeni Ekle
        </span>
      </div>
    </div>
  );
};

type AvailablitySlotType = {
  start: {
    hour: number;
    minute: number;
  };
  end: {
    hour: number;
    minute: number;
  };
};

type AvailablityType = {
  day: string;
  slots: AvailablitySlotType[];
};

export default function WorkingHours() {
  const { user } = useUser();
  const [availableDays, setAvailableDays] = useState<AvailablityType[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (availablity: AvailablityType) => {
    setAvailableDays(availableDays.map(a => a.day === availablity.day ? availablity : a));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateTeacherAvailability(availableDays);
    setHasChanges(false);    
  };

  useEffect(() => {
    if (!user) return;

    const getAvailablity = async () => {
      const data = await getTeacherAvailability();
      if (!data) {
        return;
      }

      setAvailableDays(Object.keys(data).map(key => {
        return {
          day: days[key],
          slots: data[key].slots
        }
      }))
    }

    getAvailablity();
  }, [user?.id]);

  return (
    <AdminLayout currentPage="working-hours">
      <Card className="px-6 py-5">
        <h1 className="text-xl text-primary p-0 m-0">Çalışma Saatleri</h1>
      </Card>

      <Card className="mt-4 px-6 py-5 grid grid-flow-row grid-cols-2 gap-4">
        {availableDays.map((availablity) => (
          <AvailablityCard key={availablity.day} availablity={availablity} onChange={handleChange} />
        ))}

        <div className="flex items-center justify-center">
          {hasChanges && <Button onClick={handleSave} primary>Degisiklikleri Kaydet</Button>}
        </div>
      </Card>
    </AdminLayout>
  );
};