export default function IconEdit({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="11"
        cy="11"
        r="10"
        fill="var(--b-tertiary-dark)"
        stroke="var(--b-primary-dark)"
        strokeWidth="2"
      />
      <path
        d="M11.0118 7.18948C11.1164 6.96402 11.3836 6.86677 11.6086 6.97227L13.5454 7.88027C13.7705 7.98576 13.8681 8.25405 13.7635 8.47951L11.0823 14.2603C11.0314 14.3701 10.9385 14.4546 10.8245 14.4947L9.41564 14.9904C9.18521 15.0714 8.93197 14.9527 8.84563 14.7231L8.3177 13.3195C8.27501 13.2059 8.27965 13.0801 8.33057 12.9703L11.0118 7.18948Z"
        fill="var(--icon-primary)"
      />
      <path
        d="M9.12598 7.38086L14.4896 9.89734"
        stroke="var(--b-tertiary-dark)"
        strokeWidth="0.5625"
      />
    </svg>
  );
}
