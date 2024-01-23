interface Props {
    space: string,
    extraMargin: any;
}

const Spacer = ({
    space,
    extraMargin
}: Props) => {

    const spacerMapper: { [key: string]: string } = {
        '4': `my-2 xs:my-3 sm:my-3 md:my-3 lg:my-3 xl:my-3 2xl:my-4`,
        '8': `my-3 xs:my-3 sm:my-4 md:my-6 lg:my-8 xl:my-10 2xl:my-12`,
        '12': `my-4 xs:my-4 sm:my-6 md:my-9 lg:my-12 xl:my-16 2xl:my-20`,
        '16': `my-5 xs:my-5 sm:my-8 md:my-12 lg:my-16 xl:my-20 2xl:my-24`,
        '20': `my-6 xs:my-6 sm:my-10 md:my-15 lg:my-20 xl:my-24 2xl:my-28`,
        '24': `my-7 xs:my-7 sm:my-12 md:my-18 lg:my-24 xl:my-28 2xl:my-32`,
        '28': `my-8 xs:my-8 sm:my-14 md:my-21 lg:my-28 xl:my-32 2xl:my-36`,
        '32': `my-9 xs:my-9 sm:my-16 md:my-24 lg:my-32 xl:my-36 2xl:my-40`,
        '36': `my-10 xs:my-10 sm:my-18 md:my-27 lg:my-36 xl:my-40 2xl:my-44`,
        '40': `my-11 xs:my-11 sm:my-20 md:my-30 lg:my-40 xl:my-44 2xl:my-48`,
    };

    return (
        <section
            id="Spacer"
            className={`dark:bg-dark-background h-1 w-full ${spacerMapper[space]}`}
            style={{
                ...(extraMargin ? { margin: `${+extraMargin}px auto` } : {})
            }}
        >
        </section>
    );
}

export default Spacer;