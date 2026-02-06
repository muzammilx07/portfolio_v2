"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  BadgeCheck,
  Clock,
  Code2,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

export default function ProfileHero() {
  const [istTime, setIstTime] = useState<string>("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setIstTime(`${formatter.format(new Date())} // IST`);
    };

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="py-6 text-foreground">
      {/* OUTER CONTAINER */}
      <div className="border border-border">
        {/* ================= TOP ROW ================= */}
        <div className="flex border-b border-border">
          {/* Avatar */}
          <div className="border-r border-border">
            <div className="h-32 w-32 overflow-hidden rounded-full border border-border">
              <Image
                src="/pr.webp"
                alt="Avatar"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name block */}
          <div className="flex w-full flex-col justify-end">
            <div className="flex items-center gap-2 border-t border-border px-4 py-2">
              <h1 className="text-3xl font-semibold leading-none">
                Muzammil Shareef
              </h1>
              {/* <BadgeCheck className="h-5 w-5 text-sky-400" /> */}
            </div>

            <p className="border-t border-border px-4 py-1 text-sm text-muted-foreground">
              Full Stack Developer
            </p>
          </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {/* LEFT COLUMN */}
          <div className="space-y-0.5 p-6">
            <InfoRow icon={Code2} text="Frontend Developer" />
            <InfoRow icon={MapPin} text="Hyderabad, India" />
            <InfoRow icon={Phone} text="+91 98765 43210" />
            <InfoRow icon={User} text="new.com" />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-end space-y-0.5 p-6">
            <InfoRow icon={Clock} text={istTime} />
            <InfoRow icon={Mail} text="xyz@email" />
            <InfoRow icon={User} text="he/him" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  );
}
