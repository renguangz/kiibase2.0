import React from 'react';

const mapping = [{ name: '', component: () => <div></div> }];

type MapStringToComponent = (name: string) => any;

const mapStringToComponent: MapStringToComponent = (name) =>
  mapping.find((item) => item.name === name)?.component ?? <div></div>;

interface IProps {
  label?: string;
}

export function enhanceFilterField(component: string) {
  const Component = mapStringToComponent(component);

  return function (props: IProps) {
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
