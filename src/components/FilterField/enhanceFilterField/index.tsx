import { COLORS } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { AutoCompleteField } from './AutoCompleteField';
import { CalendarField } from './CalendarField';
import { DropdownField } from './DropDownField';
import { EditorField } from './EditorField';
import { ImageUploadField } from './ImageUploadField';
import { InputTextField } from './InputTextField';
import { NotFoundField } from './NotFoundField';
import { TextareaField } from './TextareaField';

const mapping = [
  { name: 'AutoCompleteComponent', component: AutoCompleteField },
  {
    name: 'InputTextComponent',
    component: InputTextField,
  },
  { name: 'TextareaComponent', component: TextareaField },
  { name: 'CalendarComponent', component: CalendarField },
  { name: 'SingleSelectComponent', component: DropdownField },
  { name: 'ImageUploadComponent', component: ImageUploadField },
  { name: 'EditorComponent', component: EditorField },
];

type MapStringToComponent = (name: string) => any;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

interface TitleProps {
  danger?: boolean;
}

const Title = styled.h4<TitleProps>`
  margin: 0;
  font-size: 16px;
  color: ${(props) => (props.danger ? COLORS.danger : '#000')};
`;

export const mapStringToComponent: MapStringToComponent = (name) =>
  mapping.find((item) => item.name === name)?.component ?? NotFoundField;

export type EnhanceFilterFieldProps = Record<'label' | 'required' | string, any>;

export function enhanceFilterField(component: string) {
  const Component = mapStringToComponent(component);

  return function (props: EnhanceFilterFieldProps) {
    return (
      <Wrapper>
        {props.label && (
          <TitleWrapper>
            <Title role="heading">{props.label}</Title>
            {props.required && <Title danger>*</Title>}
          </TitleWrapper>
        )}
        <div>
          <Component {...props} />
        </div>
      </Wrapper>
    );
  };
}

export const EnhanceAutoComplete = enhanceFilterField('AutoCompleteComponent');
export const EnhanceInputText = enhanceFilterField('InputTextComponent');
