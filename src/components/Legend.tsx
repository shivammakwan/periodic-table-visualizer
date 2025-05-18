import { ElementCategory } from '../data/elements';
import '../styles/Legend.css';

const Legend = () => {
  const categoryLabels: Record<ElementCategory, {label: string, emoji: string}> = {
    [ElementCategory.ALKALI_METAL]: {
      label: 'Alkali Metals',
      emoji: '🔥'
    },
    [ElementCategory.ALKALINE_EARTH_METAL]: {
      label: 'Alkaline Earth Metals',
      emoji: '💪'
    },
    [ElementCategory.TRANSITION_METAL]: {
      label: 'Transition Metals', 
      emoji: '🔨'
    },
    [ElementCategory.POST_TRANSITION_METAL]: {
      label: 'Post-Transition Metals',
      emoji: '🔋'
    },
    [ElementCategory.METALLOID]: {
      label: 'Metalloids',
      emoji: '🤖'
    },
    [ElementCategory.NONMETAL]: {
      label: 'Nonmetals',
      emoji: '☁️'
    },
    [ElementCategory.HALOGEN]: {
      label: 'Halogens',
      emoji: '🧂'
    },
    [ElementCategory.NOBLE_GAS]: {
      label: 'Noble Gases',
      emoji: '👑'
    },
    [ElementCategory.LANTHANIDE]: {
      label: 'Lanthanides',
      emoji: '✨'
    },
    [ElementCategory.ACTINIDE]: {
      label: 'Actinides',
      emoji: '☢️'
    },
  };

  return (
    <div className="legend">
      <h3>
        <span className="legend-title-bubble">🔍</span> 
        Element Categories 
        <span className="legend-title-bubble">🧪</span>
      </h3>
      <div className="legend-items">
        {Object.entries(categoryLabels).map(([category, {label, emoji}]) => (
          <div key={category} className="legend-item">
            <span 
              className="color-box" 
              style={{ backgroundColor: `var(--${category}-color)` }}
            >
              <span className="legend-emoji">{emoji}</span>
            </span>
            <span className="legend-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend; 