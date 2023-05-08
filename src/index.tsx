import { ActionPanel, Action, List, closeMainWindow, showHUD } from "@raycast/api";
import { applyConfig } from "./apply-config";

const CONFIGS = {
  resume: {
    title: "↩️ Resume Presence",
    subtitle: "Unsnooze notifications and clear status",
  },
  "dnd-1h": {
    title: "🧠 Do Not Disturb - 1h",
    subtitle: "Snooze notifications and set status, clear in 1h",
  },
  "dnd-2h": { title: "🧠 Do Not Disturb - 2h", subtitle: "Snooze notifications and set status, clear in 2h" },
} as const;

export type ConfigId = keyof typeof CONFIGS;

export default function Command() {
  return (
    <List>
      {(Object.keys(CONFIGS) as ConfigId[]).map((configId) => {
        const config = CONFIGS[configId];
        return (
          <List.Item
            key={configId}
            title={config.title}
            subtitle={config.subtitle}
            accessories={[]}
            actions={
              <ActionPanel>
                <Action
                  title="Apply"
                  onAction={() => {
                    applyConfig(configId);
                    closeMainWindow();
                    showHUD(`Set Slack to: ${config.title}`);
                  }}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
