import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GroupValidationContext } from './GroupValidationContext';

interface ValidationRuleProps {
  name?: string;
  value: string | number;
  type: 'required' | 'email' | 'url' | 'numeric' | 'alpha' | 'alphanumeric' | 'custom';
  customRule?: (value: string | number) => boolean;
  errorMessage: React.ReactNode;
  successMessage?: React.ReactNode;
  noTags?: boolean;
  triggerOnLoad?: boolean;
  allValid?: boolean;
}

const Rule: React.FC<ValidationRuleProps> = ({
  name,
  value,
  type,
  customRule,
  errorMessage,
  successMessage,
  noTags,
  triggerOnLoad,
  allValid
}) => {
  const groupContext = useContext(GroupValidationContext);
  // const [initialValue] = useState(value);
  const previousValueRef = useRef(value);
  const isFirstRender = useRef(true);

  const shouldTriggerValidation = triggerOnLoad || useMemo(() => previousValueRef.current !== value, [value]);

  const isValid = useMemo(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    if (!shouldTriggerValidation) return;

    let isValid = false;

    switch (type) {
      case 'required':
        isValid = Boolean(value) && String(value).trim().length > 0;
        break;
      case 'email':
        isValid = /\S+@\S+\.\S+/.test(String(value));
        break;
      case 'url':
        isValid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(String(value));
        break;
      case 'numeric':
        isValid = /^[0-9]+$/.test(String(value));
        break;
      case 'alpha':
        isValid = /^[a-z]+$/i.test(String(value));
        break;
      case 'alphanumeric':
        isValid = /^[a-z0-9]+$/i.test(String(value));
        break;
      case 'custom':
        if (customRule) {
          isValid = customRule(value);
        }
        else {
          throw new Error('customRule not provided');
        }
        break;
      default:
        throw new Error('type not supported');
    }

    previousValueRef.current = value;

    return isValid;
  }, [value]);

  useEffect(() => {
    if (isValid !== undefined) {
      groupContext?.setValidationStatus(name || type, isValid);
    }
  }, [isValid]);

  // console.log({ name, value, type, previousValueRef: previousValueRef.current, shouldTriggerValidation });

  if (!shouldTriggerValidation)
    return null;

  const message = isValid ? successMessage : errorMessage;

  return noTags ? message :
    <span className={isValid ? 'valid' : 'invalid'}>
      {message}
    </span>;
};

export { Rule, ValidationRuleProps };