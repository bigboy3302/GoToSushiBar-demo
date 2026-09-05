export default function PhotoPlaceholder({ label }: { label: string }) {
  return (
    <div className="photo-placeholder" role="img" aria-label={label}>
      <svg viewBox="0 0 48 48" className="photo-placeholder-icon" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17" cy="17" r="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M6 34l11-11 7 7 8-10 10 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="photo-placeholder-label">{label}</span>
    </div>
  );
}
