import { getAllPlayableClassesForRace, getPlayableRace, getPlayableRaces } from "./api-client";

const server = Bun.serve({
  port: 3000,
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
    }
  }
});

console.log(`Listening on ${server.url}`);
