/* eslint-disable @next/next/no-img-element */

export function Logo({ className }: { className?: string }) {
  return (
    <span className={className ?? 'inline-flex items-center'}>
      <img
        src="/logos/Logo - Dark.png"
        alt="Edushade"
        className="block h-6 w-auto dark:hidden"
      />
      <img
        src="/logos/Logo - Light.png"
        alt="Edushade"
        className="hidden h-6 w-auto dark:block"
      />
    </span>
  );
}
