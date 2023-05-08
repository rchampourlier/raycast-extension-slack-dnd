import { WebClient } from "@slack/web-api";
import { SLACK_USER_OAUTH_TOKEN } from "./secrets";
import { ConfigId } from ".";

export async function applyConfig(configId: ConfigId) {
  switch (configId) {
    case "dnd-1h":
      await dnd(60);
      break;
    case "dnd-2h":
      await dnd(120);
      break;
    case "resume":
      await resume();
      break;
  }
}

async function dnd(durationInMinutes: number) {
  const client = new WebClient(SLACK_USER_OAUTH_TOKEN);
  await client.dnd.setSnooze({ num_minutes: durationInMinutes });
  await client.users.profile.set({
    profile: JSON.stringify({
      status_text: "Deep Work - I'll check your messages later",
      status_emoji: ":brain:",
      status_expiration: Math.floor((new Date().getTime() + durationInMinutes * 60 * 1000) / 1000),
    }),
  });
}

async function resume() {
  const client = new WebClient(SLACK_USER_OAUTH_TOKEN);
  await client.dnd.endSnooze();
  await client.users.profile.set({
    profile: JSON.stringify({
      status_text: "",
      status_emoji: "",
      status_expiration: 0,
    }),
  });
}
