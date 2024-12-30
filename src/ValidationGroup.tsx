import React, { useContext, useRef, useState } from 'react';
import { GroupValidationContext, GroupValidationStatus } from './GroupValidationContext';
import { ValidationContext } from './ValidationContext';

interface ValidationGroupProps {
  groupName: string;
  children: React.ReactNode;
}

const ValidationGroup: React.FC<ValidationGroupProps> = ({ groupName, children }) => {
  const providerContext = useContext(ValidationContext);
  const parentGroupValidationContext = useContext(GroupValidationContext);
  const [groupValidationStatus, setGroupValidationStatus] = useState<GroupValidationStatus>({});

  const updateGroupValidationStatus = (ruleOrTypeName: string, status: boolean | GroupValidationStatus) => {
    setGroupValidationStatus(prevGroupValidationStatus => {
      const _groupValidationStatus = { ...prevGroupValidationStatus, [ruleOrTypeName]: status };
      // groupValidationStatus.current[ruleOrTypeName] = status;
      const { isValid, ...groupStatus } = _groupValidationStatus;

      _groupValidationStatus.isValid = Object.values(groupStatus).every(field => field === true ||
        (typeof field === 'object' && field.isValid === true));

      parentGroupValidationContext?.setValidationStatus(groupName, _groupValidationStatus);
      providerContext?.setValidationStatus(groupName, _groupValidationStatus);
      return _groupValidationStatus;
    });
  };

  return <GroupValidationContext.Provider value={{ validationStatus: groupValidationStatus, setValidationStatus: updateGroupValidationStatus }}>
    {children}
  </GroupValidationContext.Provider>;
};

export { ValidationGroup, ValidationGroupProps };
