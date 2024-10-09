export interface CustomErrorI extends Error {
  response?: {
    status: number;
    json: () => Promise<{ errorDescription: string }>;
  };
}
