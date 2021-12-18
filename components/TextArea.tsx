
type TextAreaProps = {
  placeHolder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const TextArea = ({
  value,
  placeHolder,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      onChange={onChange} 
      className="form-control ht-140" 
      placeholder={placeHolder} 
      value={value}
      />
  );
}