import React, { useEffect, useState } from "react";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import getDurationRange from "@/helpers/getDurationRange";
import CalenderModal from "../CustomModals/newModal/CalenderModal";
export type DurationOptionsType = "day" | "week" | "month" | "all" | "custom";

const PortfolioFilter = ({ setDateRange, refreshState }: { setDateRange: Function; refreshState: boolean }) => {
  const [duration, setDuration] = useState<DurationOptionsType>("week");
  const [showCustomDurationModal, setShowCustomDurationModal] = useState(false);

  // handler for standard duration options - day, week, month etc
  const changeDuration = (e: any, _value: DurationOptionsType) => {
    if (e.target.value !== "custom") {
      const newDateRange = getDurationRange(e.target.value);
      setDuration(e.target.value);
      setDateRange(newDateRange);
    } else {
      setShowCustomDurationModal(true);
    }
  };

  // handler for custom duration range
  const selectCustomDateRange = (dateRange: { from: any; to: any }) => {
    // condition handles "cancel" button of Calendar Modal
    if (dateRange?.to === "" && dateRange?.from === "") return;
    setDuration("custom");
    setDateRange(dateRange);
  };

  useEffect(() => {
    setDuration("week");
    setDateRange(() => {
      const initialState = getDurationRange("week");
      return initialState;
    });
  }, [refreshState]);

  return (
    <>
      <ToggleGroup
        variant={"chip"}
        value={duration}
        handleChange={changeDuration}
        values={[
          { name: "1D", value: "day" },
          { name: "1W", value: "week" },
          { name: "1M", value: "month" },
          { name: "All", value: "all-data" },
          { name: "Custom", value: "custom" }
        ]}
      />
      <CalenderModal setSelectDateRange={selectCustomDateRange} showCalender={showCustomDurationModal} setShowCalender={setShowCustomDurationModal} />
    </>
  );
};

export default PortfolioFilter;
