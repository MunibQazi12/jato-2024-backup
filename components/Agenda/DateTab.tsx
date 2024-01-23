import {
    SiteLocale,
} from "@/graphql/generated";
import React from 'react';

type Props = {
    tab: any
    locale: SiteLocale;
    isSelected: boolean
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const DateTab = ({ tab, isSelected }: Props) => {

    const {
        title,
        date
    } = tab;

    const formattedDate = `${MONTHS[(new Date(date)).getMonth()]} ${(new Date(date)).getDate()}`;

    return (
        <div className="relative xl:pl-8 lg:px-3">
            <div className="relative">
                <div className={`font-mono text-lg ${isSelected ? 'text-toruquise' : 'text-primary'}`}>
                    <button
                        className="ui-not-focus-visible:outline-none"
                        id="headlessui-tabs-tab-:R6kqlaqlla:"
                        role="tab"
                        type="button"
                    >
                        <span className="absolute inset-0"></span>{title}
                    </button>
                </div>
                <time
                    dateTime="2022-04-05"
                    className={`mb-1 block xl:text-[26px] text-xl font-semibold tracking-tight w-max ${isSelected ? 'text-toruquise' : 'text-primary'}`}
                >
                    {formattedDate}
                </time>
                <div className={`h-[5px] w-full rounded ${isSelected ? 'bg-toruquise' : 'bg-transparent'}`}></div>
            </div>
        </div>
    );
};

export default DateTab;
