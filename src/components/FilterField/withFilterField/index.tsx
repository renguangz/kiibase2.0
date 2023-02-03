import { Input, Select } from 'antd';
import React from 'react';
import { FilterLayoutField } from '../FilterLayoutField';

type FilterComponentType = 'Input' | 'Select';

type FilterComponentsGroupType = {
  type: FilterComponentType;
  component: React.ComponentType;
}[];

const FILTER_COMPONENTS: FilterComponentsGroupType = [
  { type: 'Input', component: Input },
  { type: 'Select', component: Select },
];

function getComponent(group: FilterComponentsGroupType, component: FilterComponentType) {
  return group.filter((item) => item.type === component)[0].component;
}

export function withFilterField(component: FilterComponentType) {
  let Component: React.ComponentType;
  Component = getComponent(FILTER_COMPONENTS, component);

  return function (componentTestId: string) {
    return function (label: string) {
      return function (props: any) {
        return (
          <FilterLayoutField label={label}>
            <Component data-testid={componentTestId} {...props} />
          </FilterLayoutField>
        );
      };
    };
  };
}
