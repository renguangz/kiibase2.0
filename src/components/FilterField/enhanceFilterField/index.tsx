import React from 'react';
import { AutoCompleteField } from './AutoCompleteField';
import { InputTextField } from './InputTextField';

const mapping = [
  { name: 'AutoCompleteComponent', component: AutoCompleteField },
  {
    name: 'InputTextComponent',
    component: InputTextField,
  },
];

type MapStringToComponent = (name: string) => any;

const mapStringToComponent: MapStringToComponent = (name) =>
  mapping.find((item) => item.name === name)?.component ?? null;

export interface EnhanceFilterFieldProps {
  label?: string;
}

export function enhanceFilterField(component: string) {
  const Component = mapStringToComponent(component);

  return function (props: EnhanceFilterFieldProps) {
    return (
      <div>
        {props.label && (
          <div>
            <h2 role="heading">{props.label}</h2>
          </div>
        )}
        <div>
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export const EnhanceAutoComplete = enhanceFilterField('AutoCompleteComponent');
export const EnhanceInputText = enhanceFilterField('InputTextComponent');
