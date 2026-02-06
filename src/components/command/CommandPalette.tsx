"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useCommandStore } from "@/lib/store/commandStore";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  keywords?: string[];
  icon?: ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  commands: CommandItem[];
  placeholder?: string;
}

export default function CommandPalette({
  commands,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) {
  const {
    isOpen,
    query,
    selectedIndex,
    open,
    close,
    reset,
    setQuery,
    setSelectedIndex,
  } = useCommandStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return commands;
    }

    return commands.filter((command) => {
      const haystack = [
        command.label,
        command.description ?? "",
        ...(command.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [commands, query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lastActiveElement.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const clampedIndex = Math.max(
      0,
      Math.min(selectedIndex, Math.max(filtered.length - 1, 0)),
    );

    if (clampedIndex !== selectedIndex) {
      setSelectedIndex(clampedIndex);
    }
  }, [filtered.length, isOpen, selectedIndex, setSelectedIndex]);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0);
    }
  }, [isOpen, setSelectedIndex, query]);

  const handleClose = useCallback(() => {
    close();
    reset();
    lastActiveElement.current?.focus();
  }, [close, reset]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === "k";
      const isMeta = event.metaKey || event.ctrlKey;

      if (isMeta && isK) {
        event.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          open();
        }
        return;
      }

      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((selectedIndex + 1) % Math.max(filtered.length, 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex(
          (selectedIndex - 1 + Math.max(filtered.length, 1)) %
            Math.max(filtered.length, 1),
        );
      }

      if (event.key === "Enter" && filtered[selectedIndex]) {
        event.preventDefault();
        filtered[selectedIndex].action();
        handleClose();
      }
    },
    [
      filtered,
      handleClose,
      isOpen,
      open,
      selectedIndex,
      setSelectedIndex,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-16"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-border bg-background shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border px-4 py-3">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search commands"
          />
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No results.
            </li>
          ) : (
            filtered.map((command, index) => (
              <li key={command.id}>
                <button
                  type="button"
                  onClick={() => {
                    command.action();
                    handleClose();
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                    index === selectedIndex
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/40",
                  )}
                >
                  {command.icon ? (
                    <span className="flex h-5 w-5 items-center justify-center">
                      {command.icon}
                    </span>
                  ) : null}
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {command.label}
                    </span>
                    {command.description ? (
                      <span className="text-xs text-muted-foreground">
                        {command.description}
                      </span>
                    ) : null}
                  </div>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
