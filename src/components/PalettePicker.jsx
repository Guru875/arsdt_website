'use client';

import { useTheme } from '@/contexts/ThemeContext';
import styles from './Components.module.css';

export default function PalettePicker() {
  const { palette, setPalette, palettes } = useTheme();

  return (
    <div className={styles.palettePicker} aria-label="Select Color Theme">
      {palettes.map((p) => (
        <button
          key={p.id}
          onClick={() => setPalette(p.id)}
          className={`${styles.paletteBtn} ${palette === p.id ? styles.activePalette : ''}`}
          title={p.name}
          aria-label={`Switch to ${p.name}`}
          style={{ '--palette-color': p.color }}
        >
          <span className={styles.paletteDot}></span>
        </button>
      ))}
    </div>
  );
}
