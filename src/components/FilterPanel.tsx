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
  selectedStates: string[];
  onStateFilterChange: (state: string) => void;
  isNaturalOnly: boolean;
  onNaturalFilterChange: (isNatural: boolean) => void;
  selectedMassRange: [number, number] | null;
  onMassRangeChange: (range: [number, number] | null) => void;
  selectedDiscoveryPeriod: string | null;
  onDiscoveryPeriodChange: (period: string | null) => void;
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
  selectedStates = [],
  onStateFilterChange = () => {},
  isNaturalOnly = false,
  onNaturalFilterChange = () => {},
  selectedMassRange = null,
  onMassRangeChange = () => {},
  selectedDiscoveryPeriod = null,
  onDiscoveryPeriodChange = () => {},
  displayMode = 'modal',
}: FilterPanelProps) => {
  const [activeTab, setActiveTab] = useState<'category' | 'block' | 'period' | 'state' | 'other'>('category');
  
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
  
  const stateOptions = [
    { value: 'solid', label: 'Solid', emoji: '🧱' },
    { value: 'liquid', label: 'Liquid', emoji: '💧' },
    { value: 'gas', label: 'Gas', emoji: '💨' },
  ];
  
  const discoveryPeriodOptions = [
    { value: 'ancient', label: 'Ancient Times', emoji: '🏛️' },
    { value: 'pre1800', label: 'Pre-1800', emoji: '📜' },
    { value: '1800s', label: '1800s', emoji: '⚙️' },
    { value: '1900s', label: '1900s', emoji: '🔬' },
    { value: '2000s', label: 'Modern Era', emoji: '🚀' },
  ];
  
  const massRangePresets = [
    { label: 'Light (< 40 u)', value: [0, 40] as [number, number] },
    { label: 'Medium (40-100 u)', value: [40, 100] as [number, number] },
    { label: 'Heavy (100-200 u)', value: [100, 200] as [number, number] },
    { label: 'Very Heavy (> 200 u)', value: [200, 300] as [number, number] },
  ];

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
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon state-icon">🔄</span>
            Physical State
          </h4>
          <div className="filter-options">
            {stateOptions.map(({ value, label, emoji }) => (
              <label key={value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedStates.includes(value)}
                  onChange={() => onStateFilterChange(value)}
                />
                <span className="state-emoji">{emoji}</span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon discovery-icon">🔍</span>
            Discovery Period
          </h4>
          <div className="filter-options">
            {discoveryPeriodOptions.map(({ value, label, emoji }) => (
              <label key={value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedDiscoveryPeriod === value}
                  onChange={() => onDiscoveryPeriodChange(
                    selectedDiscoveryPeriod === value ? null : value
                  )}
                />
                <span className="discovery-emoji">{emoji}</span>
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon mass-icon">⚖️</span>
            Atomic Mass
          </h4>
          <div className="filter-options">
            {massRangePresets.map(({ label, value }) => (
              <label key={label} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedMassRange?.[0] === value[0] && selectedMassRange?.[1] === value[1]}
                  onChange={() => onMassRangeChange(
                    selectedMassRange?.[0] === value[0] && selectedMassRange?.[1] === value[1]
                      ? null
                      : value
                  )}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="filter-section">
          <h4 className="filter-section-title">
            <span className="section-icon natural-icon">🌱</span>
            Origin
          </h4>
          <div className="filter-options">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={isNaturalOnly}
                onChange={() => onNaturalFilterChange(!isNaturalOnly)}
              />
              <span className="natural-emoji">🌱</span>
              <span>Natural Elements Only</span>
            </label>
          </div>
        </div>
      </div>
    );
  }

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
        <button 
          className={`filter-tab ${activeTab === 'state' ? 'active' : ''}`}
          onClick={() => setActiveTab('state')}
        >
          <span className="tab-icon">💧</span> By State
        </button>
        <button 
          className={`filter-tab ${activeTab === 'other' ? 'active' : ''}`}
          onClick={() => setActiveTab('other')}
        >
          <span className="tab-icon">🔍</span> More Filters
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
      
      {activeTab === 'state' && (
        <div className="filter-options">
          {stateOptions.map(({ value, label, emoji }) => (
            <label key={value} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedStates.includes(value)}
                onChange={() => onStateFilterChange(value)}
              />
              <span className="state-emoji">{emoji}</span>
              <span>{label}</span>
            </label>
          ))}
        </div>
      )}
      
      {activeTab === 'other' && (
        <>
          <div className="filter-section special-section">
            <h4 className="special-section-title">
              <span className="section-icon discovery-icon">🔍</span>
              Discovery Period
            </h4>
            <div className="filter-options">
              {discoveryPeriodOptions.map(({ value, label, emoji }) => (
                <label key={value} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedDiscoveryPeriod === value}
                    onChange={() => onDiscoveryPeriodChange(
                      selectedDiscoveryPeriod === value ? null : value
                    )}
                  />
                  <span className="discovery-emoji">{emoji}</span>
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-section special-section">
            <h4 className="special-section-title">
              <span className="section-icon mass-icon">⚖️</span>
              Atomic Mass
            </h4>
            <div className="filter-options">
              {massRangePresets.map(({ label, value }) => (
                <label key={label} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedMassRange?.[0] === value[0] && selectedMassRange?.[1] === value[1]}
                    onChange={() => onMassRangeChange(
                      selectedMassRange?.[0] === value[0] && selectedMassRange?.[1] === value[1]
                        ? null
                        : value
                    )}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-section special-section">
            <h4 className="special-section-title">
              <span className="section-icon natural-icon">🌱</span>
              Origin
            </h4>
            <div className="filter-options">
              <label className="filter-checkbox natural-checkbox">
                <input
                  type="checkbox"
                  checked={isNaturalOnly}
                  onChange={() => onNaturalFilterChange(!isNaturalOnly)}
                />
                <span className="natural-emoji">🌱</span>
                <span>Natural Elements Only</span>
              </label>
            </div>
          </div>
        </>
      )}
      
      <button className="clear-filters-btn" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel; 