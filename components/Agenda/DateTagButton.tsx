import Link from "next/link";

const DateTagButton = ({
  dateTag,
  lng,
  slug,
}: {
  dateTag: string;
  lng: string;
  slug: string;
}) => {
  return (
    <Link
      href={`/${lng}/talks/dateTag/${slug}`}
      className="mb-3 mr-3 inline-flex items-center justify-center rounded-md bg-primary bg-opacity-10 px-4 py-2 text-body-color duration-300 hover:bg-opacity-100 hover:text-white"
    >
      {dateTag}
    </Link>
  );
};

export default DateTagButton;
