"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useId,
  useState,
} from "react";
import { ClockIcon } from "lucide-react";
import { zhCN } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Matcher } from "react-day-picker";

export function DayTimePicker({
  selected,
  onSelect,
  disabled,
}: {
  selected: Date | undefined;
  onSelect: Dispatch<SetStateAction<Date | undefined>>;
  disabled: Matcher | Matcher[] | undefined;
}) {
  const id = useId();
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (!selected) return;
    const time = `${selected.getHours()}:${selected.getMinutes()}:${selected.getSeconds()}`;
    setTime(time);
  }, []);

  const handleChangeTime = (e: ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setTime(time);
    if (selected) {
      const [hour, minute, second] = time
        .split(":")
        .map((i) => parseInt(i, 10));
      if (hour !== undefined && minute !== undefined && second !== undefined) {
        const newDate = new Date(selected);
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        newDate.setSeconds(second);
        onSelect(newDate);
      }
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Calendar
          locale={zhCN}
          mode="single"
          className="p-2"
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
        />
        <div className="border-t p-3">
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="text-xs">
              开始时间
            </Label>
            <div className="relative grow">
              <Input
                id={id}
                type="time"
                step="1"
                className="peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                value={time}
                onChange={handleChangeTime}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ClockIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
