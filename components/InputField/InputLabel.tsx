/**
 * InputLabel component
 * @param {string} props.label - Label text
 */
export default function InputLabel({
  label,
  essential = false,
}: {
  label: string;
  essential?: boolean;
}) {
  return (
    <label htmlFor={label} className="mb-pr-12 flex text-16m text-t-primary">
      {essential && (
        <span className="mr-pr-6 inline-block text-brand-tertiary">*</span>
      )}
      {label}
    </label>
  );
}
