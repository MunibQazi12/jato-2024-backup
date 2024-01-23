import Link from "next/link";

const TagAwardButton = ({
  atag,
  lng,
  slug,
}: {
  atag: string;
  lng: string;
  slug: string;
}) => {
  return (
    <Link
      href={`/${lng}/awards/atag/${slug}`}
      className="inline-flex items-center justify-center rounded-md bg-primary bg-opacity-10 px-4 py-2 text-body-color duration-300 hover:bg-opacity-100 hover:text-white"
    >
      {atag}
    </Link>
  );
};

export default TagAwardButton;
