
type TextAreaProps = {
  id?: string,
  placeHolder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const TextArea = ({
  id,
  value = '',
  placeHolder,
  onChange,
}: TextAreaProps) => {
  return (
    <textarea
      id={id}
      onChange={onChange} 
      className="form-control ht-140" 
      placeholder={placeHolder} 
      value={value}
      />
  );
}