/* eslint-disable no-magic-numbers */
export const GET_GUID = (): string =>
  Math.random().toString(36)
    .substring(2) + Date.now().toString(36);
