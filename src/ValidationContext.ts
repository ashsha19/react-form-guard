import { createContext, useContext } from 'react';
import { GroupValidationStatus } from './GroupValidationContext';

export interface ValidationStatus {
  [group: string]: GroupValidationStatus;
}

export interface ValidationContextType {
  validationStatus: ValidationStatus;
  setValidationStatus: (groupName: string, groupValidationStatus: GroupValidationStatus) => void;
}

export const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};
