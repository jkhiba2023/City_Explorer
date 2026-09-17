"use client";

import { Ticket } from "lucide-react";

interface TicketButtonProps {
  eventName: string;
}

export function TicketButton({ eventName }: TicketButtonProps) {
  return (
    <button
      type="button"
      onClick={() =>
        alert(
          `Booking details for ${eventName}: Tickets and registration available via official event partner.`
        )
      }
      className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 cursor-pointer"
    >
      <Ticket className="size-3.5" />
      <span>Get Tickets</span>
    </button>
  );
}
