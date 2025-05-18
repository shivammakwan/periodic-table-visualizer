import { useState } from 'react';
import { ElementCategory } from '../data/elements';
import '../styles/FilterPanel.css';

interface FilterPanelProps {
  selectedCategories: ElementCategory[];
  onCategoryToggle: (category: ElementCategory) => void;
  onClearFilters: () => void;
  onBlockFilterChange: (block: string) => void;
  onPeriodFilterChange: (period: number) => void;
  selectedBlocks: string[];
  selectedPeriods: number[];
  displayMode?: 'modal' | 'sidebar';
}

const FilterPanel = ({
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  onBlockFilterChange,
  onPeriodFilterChange,
  selectedBlocks,
  selectedPeriods,
  displayMode = 'modal',
}: FilterPanelProps) => {
  const [activeTab, setActiveTab] = useState<'category' | 'block' | 'period'>('category');
  
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
  
  const blockOptions = ['s', 'p', 'd', 'f'];
  const periodOptions = [1, 2, 3, 4, 5, 6, 7];

  // If in sidebar mode, show all filter sections at once
  if (displayMode === 'sidebar') {
    return (
      <div className="filter-panel filter-panel-sidebar">
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon category-icon">🧪</span>
            Element Categories
          </h4>
          <div className="filter-options">
            {Object.entries(categoryLabels).map(([category, {label, emoji}]) => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category as ElementCategory)}
                  onChange={() => onCategoryToggle(category as ElementCategory)}
                />
                <span 
                  className="category-color-box" 
                  style={{ backgroundColor: `var(--${category}-color)` }}
                >
                  <span className="category-emoji">{emoji}</span>
                </span>
                {label}
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon block-icon">⬛</span>
            Block
          </h4>
          <div className="filter-options">
            {blockOptions.map(block => (
              <label key={block} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBlocks.includes(block)}
                  onChange={() => onBlockFilterChange(block)}
                />
                <span className="block-label">{block}</span>
                <span>Block</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon period-icon">🔄</span>
            Period
          </h4>
          <div className="filter-options">
            {periodOptions.map(period => (
              <label key={period} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedPeriods.includes(period)}
                  onChange={() => onPeriodFilterChange(period)}
                />
                <span>Period {period}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default modal view with tabs
  return (
    <div className="filter-panel">      
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeTab === 'category' ? 'active' : ''}`}
          onClick={() => setActiveTab('category')}
        >
          <span className="tab-icon">🧪</span> By Category
        </button>
        <button 
          className={`filter-tab ${activeTab === 'block' ? 'active' : ''}`}
          onClick={() => setActiveTab('block')}
        >
          <span className="tab-icon">⬛</span> By Block
        </button>
        <button 
          className={`filter-tab ${activeTab === 'period' ? 'active' : ''}`}
          onClick={() => setActiveTab('period')}
        >
          <span className="tab-icon">🔄</span> By Period
        </button>
      </div>
      
      {activeTab === 'category' && (
        <div className="filter-options">
          {Object.entries(categoryLabels).map(([category, {label, emoji}]) => (
            <label key={category} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category as ElementCategory)}
                onChange={() => onCategoryToggle(category as ElementCategory)}
              />
              <span 
                className="category-color-box" 
                style={{ backgroundColor: `var(--${category}-color)` }}
              >
                <span className="category-emoji">{emoji}</span>
              </span>
              {label}
            </label>
          ))}
        </div>
      )}
      
      {activeTab === 'block' && (
        <div className="filter-options">
          {blockOptions.map(block => (
            <label key={block} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedBlocks.includes(block)}
                onChange={() => onBlockFilterChange(block)}
              />
              <span className="block-label">{block}</span>
              <span>Block</span>
            </label>
          ))}
        </div>
      )}
      
      {activeTab === 'period' && (
        <div className="filter-options">
          {periodOptions.map(period => (
            <label key={period} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedPeriods.includes(period)}
                onChange={() => onPeriodFilterChange(period)}
              />
              <span>Period {period}</span>
            </label>
          ))}
        </div>
      )}
      
      <button className="clear-filters-btn" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel; 