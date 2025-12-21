type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

function Checkbox({ checked, onChange, disabled, className }: Props) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="checkbox border-main disabled:border-main outline-none shadow-none checked:bg-custom-gradient"
    />
  );
}

export default Checkbox;
