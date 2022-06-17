import React, { useState } from "react";
import clsx from "clsx";

import { getCalendarRows } from "../util";

import "./Calendar.css";

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

export const Calendar = ({ type, shownDate, selectedDate, onChange }) => {
    const forceUpdate = useForceUpdate();

    const contains = (value) => {
        for (let i = 0; i < selectedDate.length; i++) {
            if (selectedDate[i].toString() === value.toString()) {
                return true;
            }
        }
        return false;
    };

    const remove = (value) => {
        if (selectedDate.length === 1) {
            return;
        }

        if (type === "range") {
            selectedDate = [value];
        } else {
            for (let i = 0; i < selectedDate.length; i++) {
                if (selectedDate[i].toString() === value.toString()) {
                    selectedDate.splice(i, 1);
                }
            }
        }
    };

    const add = (value) => {
        if (type === "single") selectedDate = [value];
        if (type === "range") {
            selectedDate = [selectedDate[0]];
            if (value > selectedDate[0]) {
                let pushValue = selectedDate[0].add(1, "day");
                while (value >= pushValue) {
                    selectedDate.push(pushValue);
                    pushValue = pushValue.add(1, "day");
                }
            }

            if (value < selectedDate[0]) {
                let pushValue = selectedDate[0].add(-1, "day");
                while (value <= pushValue) {
                    selectedDate.push(pushValue);
                    pushValue = pushValue.add(-1, "day");
                }
            }
        }
    };

    const handleSelectDate = (value) => {
        return () => {
            if (contains(value)) remove(value);
            else {
                add(value);
            }
            onChange(selectedDate);
            forceUpdate();
        };
    };

    const check = (value) => {
        for (let i = 0; i < selectedDate.length; i++) {
            if (value.toString() === selectedDate[i].toString()) {
                return true;
            }
        }
    };

    const rows = getCalendarRows(shownDate);

    return (
        <div>
            <div className={"CalendarHeader"}>
                {rows[0].map(({ value }) => (
                    <div className={"CalendarCell"}>{value.format("dd")}</div>
                ))}
            </div>

            {rows.map((cells, rowIndex) => (
                <div key={rowIndex} className={"CalendarRow"}>
                    {cells.map(({ text, value }) => (
                        <div
                            className={clsx("CalendarCell", "CalendarDayCell", {
                                CalendarDayCellSelected: check(value)
                            })}
                            onClick={handleSelectDate(value)}
                        >
                            {text}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
