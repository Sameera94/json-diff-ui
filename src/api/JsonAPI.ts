export type Diff = {
  path: string;
  value1: string | number | boolean;
  value2: string | number | boolean;
};

type FirstPayloadResult = {
  success: boolean;
  sessionId: string;
}

type SecondPayloadResult = {
  success: boolean;
  differences: Diff[];
}

export class JsonAPI {
  private baseUrl: string;

  // TODO: move baseURL to env variable
  constructor(baseUrl: string = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
  }

  async sendFirstPayload(payload: object): Promise<FirstPayloadResult> {
    const response = await fetch(`${this.baseUrl}/json/first-payload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async sendSecondPayload(sessionId: string, payload: object): Promise<SecondPayloadResult> {
    const response = await fetch(`${this.baseUrl}/json/second-payload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, payload })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } 
}