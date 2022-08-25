import { MdClose } from 'react-icons/md';
import styles from './Settings.module.css'

interface Props {
  label: string;
  value: string;
  onUpdate: (color: string) => void
}

export const ColorSelector = ({ label, value, onUpdate }: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <label className={styles.settingsLabel}>{label}</label>
      <div>
        <input className={styles.colorInput} type="color" value={value} onInput={(event) => {
          onUpdate((event.target as HTMLInputElement).value)
        }} />
        <button type="button" onClick={() => {
          onUpdate('inherit')
        }}>
          <MdClose />
        </button>
      </div>
    </div>
  )
}
