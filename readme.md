# React Form Guard

A very simple and extensible form validation library for React applications.

## Installation

You can install the library using npm:

```sh
npm install react-form-guard
```

## Usage

### Rule

Use the Rule component to define validation rules for your form elements. We can use it without ValidationGroup just to display appropriate message.

```JSX
import React from 'react';
import { Rule } from 'react-form-guard';

const YourFormComponent = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [userAge, setUserAge] = React.useState('');

  return <div>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
    <Rule triggerOnLoad value={username} type="required" errorMessage="Username is required" /><br />
    <Rule value={username} type="alphanumeric" errorMessage="Enter a valid username" successMessage="Looks good!" /><br />
    
    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
    <Rule
      name="email"
      value={email}
      type="email"
      errorMessage={<p>Invalid email address</p>}
    />

    <input type="text" value={userAge} onChange={(e) => setUserAge(e.target.value)} /><br />
    <Rule triggerOnLoad value={userAge} type="required" errorMessage={<>userAge is required<br /></>} />
    <Rule value={userAge} type="numeric" errorMessage="Enter a valid age" /><br />
    <Rule name="customRule1" value={userAge} type="custom" customRule={(value) => Number(value) > 10 && Number(value) < 20}
      errorMessage="Value must be greater than 10 and less than 20" />
  </div>;
}

export default YourFormComponent;
```

### ValidationGroup

Use the ValidationGroup component to group rules related to a form element together. Each group will have its own validation status.

```JSX
import React from 'react';
import { ValidationGroup, Rule } from 'react-form-guard';

const YourFormComponent = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');

  return <ValidationGroup groupName="userDetails">
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
    <Rule triggerOnLoad value={username} type="required" errorMessage="Username is required" /><br />
    <Rule value={username} type="alphanumeric" errorMessage="Enter a valid username" successMessage="Looks good!" /><br />
    
    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
    <Rule
      name="email"
      value={email}
      type="email"
      errorMessage={<p>Invalid email address</p>}
    />
  </ValidationGroup>;
}

export default YourFormComponent;
```

### IsAllValid

Use the IsAllValid component to display a message based on the validation status of the group (all rules inside a group).

```JSX
import React from 'react';
import { IsAllValid } from 'react-form-guard';

const YourFormComponent = () => (
  <ValidationGroup groupName="userDetails">
    {/* Your form element and other rule */}
    <IsAllValid
      errorMessage="There are errors in the form"
      successMessage="All fields are valid"
    />
  </ValidationGroup>
);

export default YourFormComponent;
```

### ValidationProvider and useValidation hook

Wrap your form with the ValidationProvider component to provide validation context to your form elements. Use the useValidation hook to access the validation status of all rules which can be used while submitting form.

```JSX
import React from 'react';
import { ValidationProvider, useValidation } from 'react-form-guard';

const App = () => (
  <ValidationProvider>
    <YourFormComponent />
  </ValidationProvider>
);

const YourFormComponent = () => {
  const { validationStatus } = useValidation();

console.log('validationStatus', validationStatus);

  return <ValidationGroup groupName="userDetails">
    {/* Your form elements */}
    <IsAllValid
      errorMessage="There are errors in the form"
      successMessage="All fields are valid"
    />
  </ValidationGroup>;
}

export default App;
```
