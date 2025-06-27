import initializeDbAndModels from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const db = await initializeDbAndModels();
    const {Event, User} = db

    const body = await req.json();
    const { title, start, end, userIds } = body;

    if (!userIds || !title || !start || !end) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title,
      start,
      end,
    });

    const usersInEvent = await User.findAll({
      where: { id: userIds },
    });

    await newEvent.addUsers([...usersInEvent]);

    console.log(newEvent);

    return NextResponse.json(
      { message: "Event created", event: newEvent },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in POST event route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const db = await initializeDbAndModels();
    const {Event, User} = db

    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("userId"), 10);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    const user = await User.findByPk(userId, {
      include: {
        model: Event,
        through: { attributes: [] },
      },
    });

    const events = user.Events.map((event) => ({
      ...event.toJSON(),
      start: event.start,
      end: event.end,
    }));

    return NextResponse.json({ events });
  } catch (err) {
    console.error("Error in GET events route:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
