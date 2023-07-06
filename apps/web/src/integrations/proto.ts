import { Protowallet, ProtowalletOptions } from '@protowallet/core';

let proto: Protowallet | null = null;

export async function initProto(options: ProtowalletOptions) {
  proto = new Protowallet(options);
}

export function getProto(): Protowallet {
  if (proto) {
    return proto;
  }
  throw new Error("Protowallet Not Initialised")
}
