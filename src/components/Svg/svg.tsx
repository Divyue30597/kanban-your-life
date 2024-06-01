interface SVGProps {
  src: string;
  alt: string;
}

export default function SVG({ alt, src }: SVGProps) {
  return (
    <img
      style={{ display: "block", marginRight: "0.8rem" }}
      width={16}
      height={16}
      src={src}
      alt={alt}
    />
  );
}
