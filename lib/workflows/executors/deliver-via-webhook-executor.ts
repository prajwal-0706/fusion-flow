import { IExecutionEnvironment } from "@/types/executor";

import { DeliverViaWebhookTask } from "../tasks/deliver-via-webhook";

export async function DeliverViaWebhookExecutor(
  environment: IExecutionEnvironment<typeof DeliverViaWebhookTask>,
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("Target URL is not provided.");
      return false;
    }

    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("Body is not provided.");
      return false;
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;
    if (statusCode !== 200) {
      environment.log.error(
        `Failed to deliver via webhook: ${response.statusText}`,
      );
      return false;
    }

    const responseBody = await response.json();
    environment.log.info(
      `Webhook delivered successfully. Response: ${JSON.stringify(responseBody)}`,
    );
    return true;
  } catch (error: any) {
    environment.log.error(`Error delivering via webhook: ${error.message}`);
    return false;
  }
}
