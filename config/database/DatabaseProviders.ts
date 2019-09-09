import { HTTPClient } from 'geteventstore-promise';
import { connect, Mongoose } from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Mongoose> =>
      connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true },
      ),
  },
  {
    provide: 'EVENT_STORE_HTTP_CLIENT',
    useFactory: (): HTTPClient =>
      new HTTPClient({
        hostname: process.env.EVENT_STORE_HOSTNAME,
        port: Number(process.env.EVENT_STORE_PORT),
        credentials: {
          username: process.env.EVENT_STORE_USERNAME,
          password: process.env.EVENT_STORE_PASSWORD,
        },
      }),
  },
];
