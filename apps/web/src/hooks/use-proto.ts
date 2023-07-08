import { Protowallet } from '@protowallet/core';
import { createContext, useContext } from 'react';

export const ProtoContext = createContext<Protowallet | null>(null);

export function useProto(): Protowallet {
  const proto = useContext(ProtoContext);
  if (proto) {
    return proto;
  }
  throw new Error("Protowallet Not Initialised");
}
