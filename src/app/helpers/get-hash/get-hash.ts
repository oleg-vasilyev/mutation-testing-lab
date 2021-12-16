/* eslint-disable no-magic-numbers */
/* eslint-disable no-bitwise */
export const GET_HASH = (data: string): string =>
  String(data.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0));
