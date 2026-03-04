import { getAllPlayableClassesForRace, getPlayableClassById, getPlayableRace, getPlayableRaces } from "./api-client";

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (new URL(req.url).pathname === "/playable-race/index") {
      return new Response(JSON.stringify({ hello: "world" }), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
  routes: {
    "/": () => new Response('Bun!'),
    "/playable-race/index": async () => {
      const races = await getPlayableRaces();

      return Response.json(races);
    },
    "/playable-race/:raceId": async (req) => {
      const race = await getPlayableRace(Number(req.params.raceId));
      return Response.json(race);
    },
    "/playable-race/:raceId/playable-classes": async (req) => {
      const classes = await getAllPlayableClassesForRace(Number(req.params.raceId));
      return Response.json(classes);
    },
    "/playable-class/:classId": async (req) => {
      const playableClass = await getPlayableClassById(Number(req.params.classId));
      return Response.json(playableClass);
    }
  }
});

console.log(`Listening on ${server.url}`);
