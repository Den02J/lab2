import React from "react";

import { changeDateMonth } from "../util";

import "./Selector.css";

export const Selector = ({shownDate, setShownDate}) => {
    const handleIconClick = (isNextMonth) => {
        return () => {
            setShownDate(changeDateMonth(shownDate, isNextMonth));
        };
    };

    return (
        <div className={"Selector"}>
            <div className={"SelectorIcon"}
                 onClick={handleIconClick(false)}>
                &#60;
            </div>

            <div className={"Selector__date"}>
                {shownDate.format("MMMM YYYY")}
            </div>

            <div className={"SelectorIcon"}
                 onClick={handleIconClick(true)}>
                &#62;
            </div>
        </div>
    );
};
