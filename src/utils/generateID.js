import generate from 'nanoid/generate';
export { nanoid } from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const productID = generate.bind(null, alphabet, 9);
