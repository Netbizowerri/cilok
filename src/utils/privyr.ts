import { getPrivyrWebhookUrl, getPrivyrToken } from './env';

interface PrivyrLead {
  client_name: string;
  phone_number: string;
  email_address?: string;
  additional_client_details?: string;
  lead_source: string;
}

export async function sendToPrivyr(lead: PrivyrLead): Promise<boolean> {
  const webhookUrl = getPrivyrWebhookUrl();
  const token = getPrivyrToken();

  if (!webhookUrl) return false;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['X-TOKEN'] = token;
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
    });

    return response.ok;
  } catch {
    return false;
  }
}