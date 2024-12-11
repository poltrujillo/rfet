export const Button = ({
  label,
  primary,
  onClickEvent,
}: {
  label: string;
  primary: boolean;
  onClickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const buttonClass = primary
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-gray-200 text-black hover:bg-gray-300';

  return (
    <button
      onClick={onClickEvent}
      className={`py-2 rounded ${buttonClass} w-full`}
    >
      {label}
    </button>
  );
};
