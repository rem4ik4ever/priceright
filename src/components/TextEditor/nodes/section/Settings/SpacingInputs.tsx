import { Toggle } from '@components/Toggle';
import { FormEvent, FormEventHandler, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './Settings.module.css'
import InputMask from 'react-input-mask'

interface Props {
  label: string;
  value: [number, number, number, number];
  onUpdate: (position: 'left' | 'right' | 'top' | 'bottom' | 'x' | 'y', color: string) => void
}

interface SpacingInputProps {
  value: number;
  unit: string;
  onInput: (event: FormEvent) => void;
}
const SpacingInput = ({ value, onInput, unit }: SpacingInputProps) => {
  return (
    <div>
      <input className={styles.numberInput} data-unit="rem" type="number" min="0" value={value} onInput={onInput} />
    </div>
  )
}

const AdvancedSpacing = ({ value, onUpdate }: Props) => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 gap-2 border p-2">
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Top</label>
        <SpacingInput unit="rem" value={value[0]} onInput={(event) => {
          onUpdate('top', (event.target as HTMLInputElement).value)
        }} />
      </div>
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Bottom</label>
        <SpacingInput unit="rem" value={value[2]} onInput={(event) => {
          onUpdate('bottom', (event.target as HTMLInputElement).value)
        }} />
      </div>
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Left</label>
        <SpacingInput unit="rem" value={value[1]} onInput={(event) => {
          onUpdate('left', (event.target as HTMLInputElement).value)
        }} />
      </div>
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Right</label>
        <SpacingInput unit="rem" value={value[3]} onInput={(event) => {
          onUpdate('right', (event.target as HTMLInputElement).value)
        }} />
      </div>
    </div>
  )
}

const AxisSpacing = ({ value, onUpdate }: Props) => {
  return (
    <div className="grid grid-rows-2 gap-2 border p-2">
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Vertical</label>
        <SpacingInput unit="rem" value={value[0]} onInput={(event) => {
          onUpdate('x', (event.target as HTMLInputElement).value)
        }} />
      </div>
      <div className='flex gap-2 items-center justify-between'>
        <label className={styles.inputLabel}>Horizontal</label>
        <SpacingInput unit="rem" value={value[1]} onInput={(event) => {
          onUpdate('y', (event.target as HTMLInputElement).value)
        }} />
      </div>
    </div>
  )
}

export const SpacingInputs = (props: Props) => {
  const [isAdvanced, setAdvanced] = useState(false)
  const { label } = props
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <label className={styles.settingsLabel}>{label}</label>
        <label className="text-xs flex items-center gap-2">
          <span className="select-none">Advanced</span>
          <input className='w-4 h-4' type="checkbox" checked={isAdvanced} onChange={() => setAdvanced(!isAdvanced)} />
        </label>
      </div>
      {isAdvanced ? (
        <AdvancedSpacing {...props} />
      ) : (
        <AxisSpacing {...props} />
      )}
    </div>
  )
}
