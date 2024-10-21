export interface Response {
  ok: boolean;
  status?: number;
  body?: NodeJS.ReadableStream | null;
}
