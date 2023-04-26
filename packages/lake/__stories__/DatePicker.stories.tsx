import { Meta } from "@storybook/react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Except } from "type-fest";
import {
  DatePicker,
  DatePickerProps,
  DateRangePicker,
  DateRangePickerProps,
  isDateInRange,
  isTodayOrFutureDate,
  validateDateRangeOrder,
} from "../src/components/DatePicker";
import { WithPartnerAccentColor } from "../src/components/WithPartnerAccentColor";
import { StoryBlock, StoryPart } from "./_StoriesComponents";

const styles = StyleSheet.create({
  container: {
    width: 430,
  },
});

const FIFTEEN_DAYS_AGO = new Date();
FIFTEEN_DAYS_AGO.setDate(FIFTEEN_DAYS_AGO.getDate() - 15);

const FIFTEEN_DAYS_LATER = new Date();
FIFTEEN_DAYS_LATER.setDate(FIFTEEN_DAYS_LATER.getDate() + 15);

export default {
  title: "Forms/DatePicker",
  component: DatePicker,
} as Meta<typeof DatePicker>;

const InteractiveDatePicker = ({ ...props }: Except<DatePickerProps, "value" | "onChange">) => {
  const [value, setValue] = useState<string>();

  return <DatePicker {...props} value={value} onChange={setValue} />;
};

const InteractiveDateRangePicker = ({
  ...props
}: Except<DateRangePickerProps, "value" | "onChange">) => {
  const [value, setValue] = useState({ start: "", end: "" });
  const isRangeValid = validateDateRangeOrder(value, props.format);

  return (
    <DateRangePicker
      {...props}
      value={value}
      error={isRangeValid ? undefined : "End date can't be before start date"}
      onChange={setValue}
    />
  );
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const Default = () => {
  return (
    <WithPartnerAccentColor color="#0F6FDE">
      <StoryBlock title="DatePicker">
        <StoryPart title="Default">
          <View style={styles.container}>
            <InteractiveDatePicker
              firstWeekDay="monday"
              monthNames={monthNames}
              weekDayNames={dayNames}
              format="DD/MM/YYYY"
            />
          </View>
        </StoryPart>

        <StoryPart title="Week starting sunday">
          <View style={styles.container}>
            <InteractiveDatePicker
              firstWeekDay="sunday"
              monthNames={monthNames}
              weekDayNames={dayNames}
              format="DD/MM/YYYY"
            />
          </View>
        </StoryPart>

        <StoryPart title="Selectable only in the future">
          <View style={styles.container}>
            <InteractiveDatePicker
              firstWeekDay="sunday"
              monthNames={monthNames}
              weekDayNames={dayNames}
              format="DD/MM/YYYY"
              isSelectable={isTodayOrFutureDate}
            />
          </View>
        </StoryPart>

        <StoryPart title="Selectable only in a range (15 days before or after today)">
          <View style={styles.container}>
            <InteractiveDatePicker
              firstWeekDay="sunday"
              monthNames={monthNames}
              weekDayNames={dayNames}
              format="DD/MM/YYYY"
              isSelectable={isDateInRange(FIFTEEN_DAYS_AGO, FIFTEEN_DAYS_LATER)}
            />
          </View>
        </StoryPart>
      </StoryBlock>
    </WithPartnerAccentColor>
  );
};

export const Range = () => {
  return (
    <WithPartnerAccentColor color="#0F6FDE">
      <StoryBlock title="DateRangePicker">
        <StoryPart title="Default">
          <InteractiveDateRangePicker
            firstWeekDay="monday"
            monthNames={monthNames}
            weekDayNames={dayNames}
            format="DD/MM/YYYY"
            cancelLabel="Cancel"
            confirmLabel="Select"
          />
        </StoryPart>
      </StoryBlock>
    </WithPartnerAccentColor>
  );
};
