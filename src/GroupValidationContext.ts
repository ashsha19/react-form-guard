import { createContext, useContext } from 'react';

export interface GroupValidationStatus {
  isValid?: boolean;
  [name: string]: undefined | boolean | GroupValidationStatus;
}

export interface GroupValidationContextType {
  validationStatus: GroupValidationStatus;
  setValidationStatus: (name: string, status: boolean | GroupValidationStatus) => void;
}

export const GroupValidationContext = createContext<GroupValidationContextType | undefined>(undefined);
