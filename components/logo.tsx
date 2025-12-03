import Image from "next/image";

export const ExpenseTrackerLogo = () => (
  <div className="h-10 w-25">
    <img
      src="/images/selfin-logo.png"
      alt="SelFin Logo"
      className="h-10 w-auto object-contain bg-red-500 rounded-md"
    />
  </div>
);

export const ExpenseTrackerIcon = () => (
  <div className="h-12 w-12">
    <img
      src="/images/selfin-logo.png"
      alt="SelFin"
      className="h-12 w-12 object-contain"
    />
  </div>
);
