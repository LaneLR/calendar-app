import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await initializeDbAndModels();
    const Event = db.Event;

    const body = await req.json();
    const { title, start, end, userId } = body;

    if (!userId || !title || !start || !end) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title,
      start,
      end,
      userId,
    });

    return NextResponse.json({ message: "Event created", event: newEvent });
  } catch (err) {
    console.error("Error in POST event route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const db = await initializeDbAndModels();
    const Event = db.Event;

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const events = await Event.findAll({
      where: { userId },
      order: [["start", "ASC"]],
    });

    return NextResponse.json({ events });
  } catch (err) {
    console.error("Error in GET events route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}