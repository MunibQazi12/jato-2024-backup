import { BrandRecord } from '@/graphql/generated';
import Image from 'next/image';

type Props = {
  brandShowcase: BrandRecord[];
};

const BrandCards = ({ brandShowcase }: Props) => {
  return (
    <div className="bg-white py-6 lg:py-8 dark:bg-dark-background">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-lg lg:grid-cols-3 md:grid-cols-2 sm:mx-4 lg:mx-12">
          {brandShowcase.map((brand) => {
            return (
              <div
                key={brand.id}
                className="relative sm:mx-8 flex h-16 items-center justify-center rounded-lg bg-primary/20 sm:p-16 p-12 text-gray-400 sm:h-32 md:mx-0"
              >
                <Image
                  className="w-6/12 md:w-9/12"
                  src={brand.brandLogo.url}
                  alt={brand.brandLogo.alt || 'Logo'}
                  width={300}
                  height={300}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandCards;
