import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const db = await initializeDbAndModels();
    const Event = db.Event;

    const deleted = await Event.destroy({ where: { id: parsedId } });

    if (!deleted) {
      return NextResponse.json({ message: "Event wasn't found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted", count: deleted });
  } catch (err) {
    console.error("Error in DELETE event route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}