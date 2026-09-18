const toPersianDigits = (num: string | number): string => {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "٩"];
  return String(num)
    .split("")
    .map((d) => persian[Number(d) as number] || d)
    .join("");
};

interface TimeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function TimeField({ value, onChange }: TimeFieldProps) {
  return (
    <label className="field-label">
      ساعت
      <div className="relative">
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min="09:00"
          max="23:00"
          lang="fa"
          className="
            block w-full p-2.5 bg-neutral-secondary-medium
            border border-default-medium text-heading text-sm rounded-base
            focus:ring-brand focus:border-brand shadow-xs placeholder:text-body
            text-center
            [&::-webkit-datetime-edit]:inline-flex
            [&::-webkit-datetime-edit-fields-wrapper]:justify-center
          "
          required
        />
      </div>
    </label>
  );
}

export default TimeField;
