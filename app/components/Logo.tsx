import Image from 'next/image';

export function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="TechPilots"
      width={40}
      height={40}
      className="flex-shrink-0"
      priority
    />
  );
}
