import { request } from 'undici';
import { HttpClient } from './http-client.class'; // adjust the import according to your file structure

jest.mock('undici', () => ({
  request: jest.fn(),
}));

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient();
    jest.clearAllMocks();
  });

  describe('#get', () => {
    it('should return a successful response when the status code is 200', (done) => {
      const mockResponse = {
        statusCode: 200,
        body: 'response body',
      };
      (request as jest.Mock).mockReturnValue(Promise.resolve(mockResponse));

      httpClient.get('http://example.com').subscribe((response) => {
        expect(response).toEqual({
          ok: true,
          status: 200,
          body: 'response body',
        });
        done();
      });
    });

    it('should return an unsuccessful response when the status code is not 2xx', (done) => {
      const mockResponse = {
        statusCode: 404,
        body: null,
      };
      (request as jest.Mock).mockReturnValue(Promise.resolve(mockResponse));

      httpClient.get('http://example.com').subscribe((response) => {
        expect(response).toEqual({
          ok: false,
          status: 404,
          body: null,
        });
        done();
      });
    });

    it('should catch errors and return { ok: false }', (done) => {
      (request as jest.Mock).mockReturnValue(Promise.reject(new Error('Network error')));

      httpClient.get('http://example.com').subscribe((response) => {
        expect(response).toEqual({ ok: false });
        done();
      });
    });
  });
});
