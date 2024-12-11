export const Input = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="p-2 rounded-md text-slate-800 w-full"
    />
  );
};
