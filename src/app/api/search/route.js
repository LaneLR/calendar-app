import { NextResponse } from "next/server";
import initializeDbAndModels from "@/lib/db";
import { Op } from "sequelize";

export async function GET(req) {
  const db = await initializeDbAndModels();
  const User = db.User;

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const excluded = searchParams.get("exclude");

  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }

  const results = await User.findAll({
    where: {
      username: {
        [Op.iLike]: `%${query}%`,
      },
      //set exclusion using id so user cannot find themselves in search
      id: {
        [Op.ne]: excluded,
      }
    },
    attributes: ["username"],
  });
  return NextResponse.json(results);
}
