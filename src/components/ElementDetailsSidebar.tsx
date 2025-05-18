import { useState, useEffect } from 'react';
import type { Element } from '../data/elements';
import { ElementCategory } from '../data/elements';
import '../styles/ElementDetailsSidebar.css';

interface ElementDetailsSidebarProps {
  element: Element;
  onClose: () => void;
}

const ElementDetailsSidebar = ({ element, onClose }: ElementDetailsSidebarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay setting visible to true to allow for animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [element.atomicNumber]);
  
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
  
  return (
    <div className={`element-details-sidebar ${isVisible ? 'visible' : ''}`}>
      <button 
        className="close-sidebar-btn"
        onClick={onClose}
        aria-label="Close element details"
      >
        ✕
      </button>
      
      <div className="element-spotlight">
        <div 
          className="element-card-large"
          style={{ backgroundColor: getCategoryColor(element.category) }}
        >
          <div className="atomic-number">{element.atomicNumber}</div>
          <div className="symbol">{element.symbol}</div>
          <div className="name">{element.name}</div>
          <div className="atomic-mass">{element.atomicMass.toFixed(2)}</div>
          <div className="category-emoji-large">{getCategoryEmoji(element.category)}</div>
        </div>
      </div>
      
      <div className="element-full-details">
        <h2 className="element-name">
          {element.name} {getCategoryEmoji(element.category)}
        </h2>
        
        <div className="detail-section">
          <h3>Basic Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Atomic Number</span>
              <span className="detail-value">{element.atomicNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Symbol</span>
              <span className="detail-value">{element.symbol}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Atomic Mass</span>
              <span className="detail-value">{element.atomicMass.toFixed(4)} u</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <span className="detail-value category-badge" style={{ backgroundColor: getCategoryColor(element.category) }}>
                {element.category.replace(/-/g, ' ')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Periodic Table Position</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Period</span>
              <span className="detail-value">{element.period}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Group</span>
              <span className="detail-value">{element.group}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Block</span>
              <span className="detail-value">{element.block}-block</span>
            </div>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Electronic Structure</h3>
          <div className="detail-item full-width">
            <span className="detail-label">Electron Configuration</span>
            <span className="detail-value electron-config">{element.electronConfiguration}</span>
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Physical Properties</h3>
          <div className="detail-grid">
            {element.density && (
              <div className="detail-item">
                <span className="detail-label">Density</span>
                <span className="detail-value">{element.density} g/cm³</span>
              </div>
            )}
            {element.meltingPoint && (
              <div className="detail-item">
                <span className="detail-label">Melting Point</span>
                <span className="detail-value">{element.meltingPoint} K</span>
              </div>
            )}
            {element.boilingPoint && (
              <div className="detail-item">
                <span className="detail-label">Boiling Point</span>
                <span className="detail-value">{element.boilingPoint} K</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="detail-section">
          <h3>Historical</h3>
          <div className="detail-grid">
            {element.discoveryYear && (
              <div className="detail-item">
                <span className="detail-label">Discovered</span>
                <span className="detail-value">{element.discoveryYear}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="fun-facts">
          <h3>Fun Facts</h3>
          <div className="fun-fact">
            {getFunFact(element)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate fun facts based on the element
function getFunFact(element: Element): string {
  const facts: Record<number, string> = {
    1: "Hydrogen makes up 75% of all mass in the universe!",
    2: "Helium was discovered on the Sun before it was found on Earth!",
    6: "Carbon forms almost 10 million known compounds - more than all other elements combined!",
    8: "Oxygen is the most abundant element in the Earth's crust - 46% by weight!",
    11: "Sodium explodes when thrown in water!",
    79: "All the gold ever mined could fit into a cube with sides of 21 meters!",
    82: "Ancient Romans used lead for their plumbing, which may have contributed to their empire's fall!",
    92: "Uranium's half-life is so long that 50% of the uranium that existed when Earth formed still exists today!",
    94: "Plutonium is so toxic that a few millionths of a gram can kill you!",
  };
  
  return facts[element.atomicNumber] || 
    `${element.symbol} is element number ${element.atomicNumber} in the periodic table!`;
}

export default ElementDetailsSidebar; 