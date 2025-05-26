import { Star } from "lucide-react";

export default function Ratting({
  ratting,
  size,
}: {
  ratting: number;
  size?: number;
}) {
  const fullStars = Math.floor(ratting);
  const partialStar = ratting % 1;
  const emptyStars = 5 - Math.ceil(ratting);

  return (
    <div
      className="flex items-center"
      aria-label={`ratting: ${ratting} out of 5 stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-${size} h-${size} fill-current text-yellow-500`}
        />
      ))}
      {partialStar > 0 && (
        <div className="relative">
          <Star className={`w-${size} h-${size} text-yellow-500`} />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}>
            <Star className="w-6 h-6 fill-current text-yellow-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`w-${size} h-${size}  text-yellow-500`}
        />
      ))}
    </div>
  );
}
