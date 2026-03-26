interface ShopioLogoIconProps {
  className?: string;
  size?: number;
}

export default function ShopioLogoIcon({ className = "", size = 32 }: ShopioLogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#0d1420" />

      <path
        d="M3 7 L6.5 7 Q7.5 7 7.8 8 L10 17"
        fill="none"
        stroke="#1db5bf"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 17 L23 17 L21.5 23 L11.5 23 Z"
        fill="none"
        stroke="#1db5bf"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <circle cx="13" cy="26.5" r="2" fill="#1db5bf" />
      <circle cx="20.5" cy="26.5" r="2" fill="#1db5bf" />

      <rect x="11.5" y="13" width="10" height="9" rx="1.5" fill="#f5a623" />

      <path
        d="M14 13 C14 10.5 19 10.5 19 13"
        fill="none"
        stroke="#1db5bf"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <rect x="11.5" y="13" width="10" height="3" rx="1.5" fill="#fbbf4a" opacity="0.45" />
    </svg>
  );
}