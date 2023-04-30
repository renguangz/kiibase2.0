import React from 'react';
import { AutoCompleteField } from './AutoCompleteField';
import { CalendarField } from './CalendarField';
import { DropdownField } from './DropDownField';
import { ImageUploadField } from './ImageUpdloadField';
import { InputTextField } from './InputTextField';
import { NotFoundField } from './NotFoundField';

const mapping = [
  { name: 'AutoCompleteComponent', component: AutoCompleteField },
  {
    name: 'InputTextComponent',
    component: InputTextField,
  },
  { name: 'CalendarComponent', component: CalendarField },
  { name: 'SingleSelectComponent', component: DropdownField },
  { name: 'ImageUploadComponent', component: ImageUploadField },
];

type MapStringToComponent = (name: string) => any;

const mapStringToComponent: MapStringToComponent = (name) =>
  mapping.find((item) => item.name === name)?.component ?? NotFoundField;

export type EnhanceFilterFieldProps = Record<'label' | string, any>;

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
