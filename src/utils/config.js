import { resolve } from 'path';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(config({ path: resolve(__dirname, '../../.env') }));
