import React from "react";
import Icon from "@components/icon";

export default function PlpFilterClearFilterItem({selectedFilters, name,clearFilters}) {

    const clear = (name) => (e) => {
        if (clearFilters) {
            clearFilters(e, name);
        }
    }
    return (
        selectedFilters[name].filter((item) => item.state === true).length > 0 ? (
            <p className={"relative text-xs bg-gray_border rounded-full inline-flex py-3 pl-6 pr-6  items-center mb-4"}>
                {selectedFilters[name].filter((item) => item.state === true).length} selected
                <a className="cursor-pointer flex ml-4" onClick={clear(name)}>
                    <Icon icon={["fas", "times"]} className="w-4 block"
                          size={"small"}/>
                </a>
            </p>
        ) : null
    )
}
