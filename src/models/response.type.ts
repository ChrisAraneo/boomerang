export type Response = {
  ok: boolean;
  status?: number;
  body?: NodeJS.ReadableStream | null;
};
