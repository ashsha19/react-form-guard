import React, { useContext } from 'react';
import { GroupValidationContext } from './GroupValidationContext';

const IsAllValid: React.FC<{
  errorMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
}> = ({
  errorMessage, successMessage
}) => {
    const groupContext = useContext(GroupValidationContext);

    if (groupContext === undefined) {
      throw new Error("IsAllValid component must be used inside a ValidationGroup component");
    }

    const isGroupValid = groupContext.validationStatus?.isValid;

    if (isGroupValid === undefined) return null;

    return isGroupValid ? successMessage : errorMessage;
  };

export { IsAllValid };
