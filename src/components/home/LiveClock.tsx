"use client";

import { useEffect, useState } from "react";

import { DigitRotate } from "../animations/DigitRotate";

export default function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [city, setCity] = useState("Detecting location...");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedDate = now.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedDay = now.toLocaleDateString(undefined, {
        weekday: "long",
      });

      setTime(formattedTime);
      setDate(formattedDate);
      setDay(formattedDay);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const detectCity = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const detectedCity = data.city || data.region || data.country_name || "India";
        setCity(detectedCity);
      } catch {
        setCity("India");
      }
    };

    detectCity();
  }, []);

  return (
    <div className="text-center select-none">
      <p className="text-sm text-muted-foreground mb-2">{city}</p>

      <DigitRotate
        value={time}
        className="font-mono text-5xl md:text-6xl font-bold tracking-widest text-foreground"
      />

      <div className="mt-2 text-muted-foreground">
        <p>{date}</p>
        <p>{day}</p>
      </div>
    </div>
  );
}
