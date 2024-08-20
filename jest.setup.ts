import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder as never;
global.TextDecoder = TextDecoder as never;
