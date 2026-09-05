import Link from "next/link";

export default function BrandMark({ className }: { className?: string }) {
  return (
    <Link className={`brand${className ? ` ${className}` : ""}`} href="/">
      <svg className="brand-icon" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="var(--pub-red)" />
        <circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" strokeWidth="2" />
        <circle cx="16" cy="16" r="5" fill="#fff" />
        <circle cx="16" cy="16" r="2" fill="var(--pub-red)" />
      </svg>
      <span className="brand-text">
        <span className="brand-name">Go To Sushi Bar</span>
        <small className="brand-tagline">CĒSU VECPILSĒTA</small>
      </span>
    </Link>
  );
}
