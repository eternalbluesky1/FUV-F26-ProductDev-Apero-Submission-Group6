import Image from "next/image";

const sources = {
  welcome: "/brand/mon-welcome.png",
  thinking: "/brand/mon-thinking.png",
  found: "/brand/mon-found-a-deal.png",
  celebrate: "/brand/mon-celebrate.png",
  shrug: "/brand/mon-shrug.png",
  guide: "/brand/mon-guide.png"
} as const;

export type MascotPose = keyof typeof sources;

export function Mascot({
  pose = "welcome",
  className = "",
  alt = "",
  priority = false
}: {
  pose?: MascotPose;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={sources[pose]}
      alt={alt}
      width={360}
      height={360}
      className={className}
      priority={priority || pose === "welcome"}
    />
  );
}
