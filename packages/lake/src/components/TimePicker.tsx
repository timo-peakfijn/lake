import { AsyncData, Option, Result } from "@swan-io/boxed";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Rifm } from "rifm";
import { colors } from "../constants/design";
import { identity, noop } from "../utils/function";
import { isNotNullishOrEmpty, isNullish } from "../utils/nullish";
import { getRifmProps } from "../utils/rifm";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { LakeCombobox } from "./LakeCombobox";
import { LakeLabel } from "./LakeLabel";
import { LakeText } from "./LakeText";
import { Space } from "./Space";

const styles = StyleSheet.create({
  label: {
    flex: 1,
  },
  arrowContainer: {
    height: 40, // input height
  },
});

type Time = {
  hour: number;
  minute: number;
};

const DEFAULT_START_TIME: Time = { hour: 0, minute: 0 };
const DEFAULT_END_TIME: Time = { hour: 23, minute: 59 };
const DEFAULT_INTERVAL_IN_MINUTES = 15;

const rifmTimeProps = getRifmProps({
  accept: "numeric",
  charMap: { 2: ":" },
  maxLength: 4,
});

export const parseTime = (time: string): Option<Time> => {
  const [hours, minutes] = time.split(":").map(Number);

  if (isNullish(hours) || isNaN(hours) || isNullish(minutes) || isNaN(minutes)) {
    return Option.None();
  }

  return Option.Some({ hour: hours, minute: minutes });
};

export const parseTimeRange = (value: {
  start?: string;
  end?: string;
}): { start: Option<Time>; end: Option<Time> } => {
  const start = isNotNullishOrEmpty(value.start) ? parseTime(value.start) : Option.None();
  const end = isNotNullishOrEmpty(value.end) ? parseTime(value.end) : Option.None();

  return { start, end };
};

const parseTypingHours = (time: string): Option<number> => {
  const [hours] = time.split(":");

  if (isNullish(hours) || hours?.length !== 2) {
    return Option.None();
  }

  const parsedHours = Number(hours);

  if (parsedHours < 0 || parsedHours > 23) {
    return Option.None();
  }

  if (isNaN(parsedHours)) {
    return Option.None();
  }

  return Option.Some(parsedHours);
};

const stringifyTime = (time: Time): string => {
  return `${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")}`;
};

const timeToMinutes = (time: Time): number => {
  return time.hour * 60 + time.minute;
};

const minutesToTime = (minutes: number): Time => {
  return {
    hour: Math.floor(minutes / 60),
    minute: minutes % 60,
  };
};

export const validateTime = (time: Time): boolean => {
  return time.hour >= 0 && time.hour <= 23 && time.minute >= 0 && time.minute <= 59;
};

const isTimeBefore = (time1: Time, time2: Time): boolean => {
  return timeToMinutes(time1) < timeToMinutes(time2);
};

export const validateTimeRange = (range: { start: Option<Time>; end: Option<Time> }): boolean => {
  if (range.start.isNone() || range.end.isNone()) {
    return true;
  }

  return isTimeBefore(range.start.value, range.end.value);
};

const generateTimeList = (start: Time, end: Time, intervalInMinutes: number): string[] => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  const timeList = [];
  for (let i = startMinutes; i <= endMinutes; i += intervalInMinutes) {
    const time = minutesToTime(i);
    timeList.push(stringifyTime(time));
  }

  return timeList;
};

export type TimePickerProps = {
  value?: string;
  onChangeText: (value: string) => void;
  suggestionStart?: Time;
  suggestionEnd?: Time;
  intervalInMinutes?: number;
  nbMaxSuggestions?: number;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string;
  hideErrors?: boolean;
  noSuggestionLabel: string;
};

export const TimePicker = ({
  value,
  onChangeText,
  suggestionStart = DEFAULT_START_TIME,
  suggestionEnd = DEFAULT_END_TIME,
  intervalInMinutes = DEFAULT_INTERVAL_IN_MINUTES,
  nbMaxSuggestions,
  readOnly,
  disabled,
  error,
  hideErrors,
  noSuggestionLabel,
}: TimePickerProps) => {
  const typingHour = parseTypingHours(value ?? "");

  const optionsInterval: [Time, Time] = useMemo(
    () =>
      typingHour.match({
        Some: hour => [
          { hour, minute: 0 },
          { hour, minute: 59 },
        ],
        None: () => [suggestionStart, suggestionEnd],
      }),
    [typingHour, suggestionStart, suggestionEnd],
  );

  const options = useMemo(
    () =>
      generateTimeList(optionsInterval[0], optionsInterval[1], intervalInMinutes).slice(
        0,
        nbMaxSuggestions,
      ),
    [optionsInterval, intervalInMinutes, nbMaxSuggestions],
  );

  const items = useMemo(() => AsyncData.Done(Result.Ok(options)), [options]);

  return (
    <Rifm value={value ?? ""} onChange={onChangeText} {...rifmTimeProps}>
      {({ value, onChange }) => (
        <LakeCombobox
          keyExtractor={identity}
          placeholder="HH:MM"
          value={value}
          items={items}
          renderItem={identity}
          readOnly={readOnly}
          disabled={disabled}
          error={error}
          hideErrors={hideErrors}
          emptyResultText={noSuggestionLabel}
          onChange={onChange}
          onValueChange={noop}
          onSelectItem={onChangeText}
        />
      )}
    </Rifm>
  );
};

export type TimeRangePickerProps = {
  value: { start?: string; end?: string };
  onChange: (value: { start?: string; end?: string }) => void;
  intervalInMinutes?: number;
  nbMaxSuggestions?: number;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string;
  startLabel: string;
  endLabel: string;
  noSuggestionLabel: string;
};

export const TimeRangePicker = ({
  value,
  onChange,
  intervalInMinutes = DEFAULT_INTERVAL_IN_MINUTES,
  nbMaxSuggestions,
  readOnly,
  disabled,
  error,
  startLabel,
  endLabel,
  noSuggestionLabel,
}: TimeRangePickerProps) => {
  const handleStartChange = (startValue: string) => {
    onChange({
      start: startValue,
      end: value.end,
    });
  };

  const handleEndChange = (endValue: string) => {
    onChange({
      start: value.start,
      end: endValue,
    });
  };

  return (
    <View>
      <Box direction="row" alignItems="end">
        <LakeLabel
          label={startLabel}
          style={styles.label}
          render={() => (
            <TimePicker
              value={value.start}
              intervalInMinutes={intervalInMinutes}
              nbMaxSuggestions={nbMaxSuggestions}
              error={error}
              hideErrors={true}
              disabled={disabled}
              readOnly={readOnly}
              noSuggestionLabel={noSuggestionLabel}
              onChangeText={handleStartChange}
            />
          )}
        />

        <Space width={12} />

        <Box style={styles.arrowContainer} justifyContent="center">
          <Icon name="arrow-right-filled" size={20} />
        </Box>

        <Space width={12} />

        <LakeLabel
          label={endLabel}
          style={styles.label}
          render={() => (
            <TimePicker
              value={value.end}
              intervalInMinutes={intervalInMinutes}
              nbMaxSuggestions={nbMaxSuggestions}
              error={error}
              hideErrors={true}
              disabled={disabled}
              readOnly={readOnly}
              noSuggestionLabel={noSuggestionLabel}
              onChangeText={handleEndChange}
            />
          )}
        />
      </Box>

      <Space height={4} />

      <LakeText variant="smallRegular" color={colors.negative[500]}>
        {error ?? " "}
      </LakeText>
    </View>
  );
};
