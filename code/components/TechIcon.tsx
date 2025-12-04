import Image from "next/image";
import { useState } from "react";

interface TechIconProps {
  src: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

const TechIcon = ({ src, alt, name, width = 1200, height = 1200, className = "mr-4" }: TechIconProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative ${className} mb-8 mt-2`}>
      <Image
        className="w-20 transform transition-transform duration-300 hover:scale-110"
        width={width}
        height={height}
        src={src}
        alt={alt}
        title={name}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
          {name}
        </span>
      )}
    </div>
  );
};

export default TechIcon;
