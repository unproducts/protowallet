import { useContext } from 'react';
import { ProtoContext } from './use-proto';
import { PrefsProvider } from '@protowallet/core/dist/services/prefs';


export function usePrefs(): PrefsProvider {
  const proto = useContext(ProtoContext);
  if (proto) {
    return proto.getPrefsProviderService();
  }
  
  throw new Error('Protowallet Not Initialised');
}
