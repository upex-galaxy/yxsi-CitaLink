import Image from "next/image";
export default function BrandLogo({ size=32 }: { size?: number }) {
  return <Image src="/logo-citalink.png" alt="CitaLink" width={size} height={size} />;
}
