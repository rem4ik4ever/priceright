export type Element = {
  id: string;
  type: string;
}

export type SpacingValue = number | 'auto';

export type Style = {
  color: string;
  padding: [SpacingValue, SpacingValue, SpacingValue, SpacingValue],
  margin: [SpacingValue, SpacingValue, SpacingValue, SpacingValue],
}

export type InputTypes = 'email' | 'text' | 'number' | 'date' | 'datetime'

export interface Input extends Element {
  name: string;
  placeholder: string;
  type: InputTypes;
  defaultValue?: string;
  required: boolean | false;
  min: number;
  max: number;
}

export interface Text extends Element {
  text: string;
}

export type FormElement = Text | Input;
