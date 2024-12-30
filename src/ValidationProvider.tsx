import React, { useContext, useRef, useState } from 'react';
import { ValidationContext, ValidationStatus } from './ValidationContext';
import { GroupValidationStatus } from './GroupValidationContext';

export const ValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const validationStatus = useRef<ValidationStatus>({});

  const updateValidationStatus = (groupName: string, groupValidationStatus: GroupValidationStatus) => {
    validationStatus.current[groupName] = groupValidationStatus;
    // setValidationStatus(prev => ({
    //   ...prev,
    //   [groupName]: groupValidationStatus
    // }));
  };

  return <ValidationContext.Provider value={{ validationStatus: validationStatus.current, setValidationStatus: updateValidationStatus }}>
    {children}
  </ValidationContext.Provider>;
};
