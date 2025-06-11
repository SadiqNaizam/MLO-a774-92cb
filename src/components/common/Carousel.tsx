import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card
import { cn } from '@/lib/utils';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of slide contents (can be JSX elements)
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
  slideClassName?: string;
  containerClassName?: string;
  showDots?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
  slideClassName = "flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%]", // Default responsive slides
  containerClassName,
  showDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  console.log("Rendering Carousel with", slides.length, "slides. Selected index:", selectedIndex);

  return (
    <div className={cn("embla relative", containerClassName)}>
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div className={cn("embla__slide min-w-0 p-2", slideClassName)} key={index}>
              {/* Example: Wrap slide content in shadcn Card for consistent styling if desired */}
              {/* <Card className="h-full"><CardContent className="flex items-center justify-center p-6 h-full">{slide}</CardContent></Card> */}
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showDots && emblaApi && scrollSnaps.length > 1 && (
        <div className="embla__dots absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi.scrollTo(index)}
              className={cn(
                "embla__dot w-2 h-2 rounded-full transition-colors duration-200",
                index === selectedIndex ? "bg-orange-500" : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Carousel;