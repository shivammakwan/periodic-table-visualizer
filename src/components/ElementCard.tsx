import { useState } from 'react';
import type { Element } from '../data/elements';
import { ElementCategory } from '../data/elements';
import { Tooltip } from 'react-tooltip';
import '../styles/ElementCard.css';

interface ElementCardProps {
  element: Element;
  isFiltered: boolean;
  onElementClick: (element: Element) => void;
}

const ElementCard = ({ element, isFiltered, onElementClick }: ElementCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const getCategoryColor = (category: ElementCategory): string => {
    switch (category) {
      case ElementCategory.ALKALI_METAL:
        return 'var(--alkali-metal-color)';
      case ElementCategory.ALKALINE_EARTH_METAL:
        return 'var(--alkaline-earth-metal-color)';
      case ElementCategory.TRANSITION_METAL:
        return 'var(--transition-metal-color)';
      case ElementCategory.POST_TRANSITION_METAL:
        return 'var(--post-transition-metal-color)';
      case ElementCategory.METALLOID:
        return 'var(--metalloid-color)';
      case ElementCategory.NONMETAL:
        return 'var(--nonmetal-color)';
      case ElementCategory.HALOGEN:
        return 'var(--halogen-color)';
      case ElementCategory.NOBLE_GAS:
        return 'var(--noble-gas-color)';
      case ElementCategory.LANTHANIDE:
        return 'var(--lanthanide-color)';
      case ElementCategory.ACTINIDE:
        return 'var(--actinide-color)';
      default:
        return 'var(--default-color)';
    }
  };

  // Get a fun emoji based on element category
  const getCategoryEmoji = (category: ElementCategory): string => {
    switch (category) {
      case ElementCategory.ALKALI_METAL:
        return '🔥'; // Fire - reactive
      case ElementCategory.ALKALINE_EARTH_METAL:
        return '💪'; // Strong
      case ElementCategory.TRANSITION_METAL:
        return '🔨'; // Malleable
      case ElementCategory.POST_TRANSITION_METAL:
        return '🔋'; // Battery-like
      case ElementCategory.METALLOID:
        return '🤖'; // Part metal, part not - robot
      case ElementCategory.NONMETAL:
        return '☁️'; // Gas-like
      case ElementCategory.HALOGEN:
        return '🧂'; // Salt-related
      case ElementCategory.NOBLE_GAS:
        return '👑'; // Royal/noble
      case ElementCategory.LANTHANIDE:
        return '✨'; // Sparkly
      case ElementCategory.ACTINIDE:
        return '☢️'; // Radioactive
      default:
        return '⚗️'; // Generic chemistry
    }
  };
  
  const tooltipId = `element-${element.atomicNumber}`;

  return (
    <>
      <div 
        className={`element-card ${isFiltered ? 'filtered' : 'dimmed'}`}
        style={{ backgroundColor: getCategoryColor(element.category) }}
        data-tooltip-id={tooltipId}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => onElementClick(element)}
      >
        <div className="atomic-number">{element.atomicNumber}</div>
        <div className="symbol">{element.symbol}</div>
        <div className="name">{element.name.length > 9 ? element.name.substring(0, 8) + '.' : element.name}</div>
        <div className="atomic-mass">{element.atomicMass.toFixed(1)}</div>
        <div className="category-emoji">{getCategoryEmoji(element.category)}</div>
      </div>
      
      <Tooltip
        id={tooltipId}
        className="element-tooltip"
        place="bottom"
        variant="light"
        delayHide={50}
        delayShow={200}
        hidden={!isHovering}
        positionStrategy="fixed"
        noArrow={false}
        opacity={1}
        offset={12}
      >
        <div className="element-details-wrapper">
          <h3>{element.name} {getCategoryEmoji(element.category)}</h3>
          <div className="detail-row">
            <span className="detail-label">Atomic Number:</span> 
            <span className="detail-value">{element.atomicNumber}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Atomic Mass:</span>
            <span className="detail-value">{element.atomicMass.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{element.category.replace(/-/g, ' ')}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Electron Config:</span>
            <span className="detail-value">{element.electronConfiguration}</span>
          </div>
          {element.density && (
            <div className="detail-row">
              <span className="detail-label">Density:</span>
              <span className="detail-value">{element.density} g/cm³</span>
            </div>
          )}
          {element.meltingPoint && (
            <div className="detail-row">
              <span className="detail-label">Melting Point:</span>
              <span className="detail-value">{element.meltingPoint} K</span>
            </div>
          )}
          {element.boilingPoint && (
            <div className="detail-row">
              <span className="detail-label">Boiling Point:</span>
              <span className="detail-value">{element.boilingPoint} K</span>
            </div>
          )}
          {element.discoveryYear && (
            <div className="detail-row">
              <span className="detail-label">Discovered:</span>
              <span className="detail-value">{element.discoveryYear}</span>
            </div>
          )}
        </div>
      </Tooltip>
    </>
  );
};

export default ElementCard; 