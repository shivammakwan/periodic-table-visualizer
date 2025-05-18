import { useState } from "react";
import { elements, ElementCategory } from "../data/elements";
import type { Element } from "../data/elements";
import ElementCard from "./ElementCard";
import FilterPanel from "./FilterPanel";
import "../styles/PeriodicTable.css";
import ElementDetails from "./ElementDetails";

const PeriodicTable = () => {
  const [selectedCategories, setSelectedCategories] = useState<
    ElementCategory[]
  >([]);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<number[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [isNaturalOnly, setIsNaturalOnly] = useState<boolean>(false);
  const [selectedMassRange, setSelectedMassRange] = useState<[number, number] | null>(null);
  const [selectedDiscoveryPeriod, setSelectedDiscoveryPeriod] = useState<string | null>(null);
  
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const toggleCategory = (category: ElementCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBlock = (block: string) => {
    setSelectedBlocks((prev) =>
      prev.includes(block) ? prev.filter((b) => b !== block) : [...prev, block]
    );
  };

  const togglePeriod = (period: number) => {
    setSelectedPeriods((prev) =>
      prev.includes(period)
        ? prev.filter((p) => p !== period)
        : [...prev, period]
    );
  };

  const toggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const toggleNaturalOnly = (isNatural: boolean) => {
    setIsNaturalOnly(isNatural);
  };

  const handleMassRangeChange = (range: [number, number] | null) => {
    setSelectedMassRange(range);
  };

  const handleDiscoveryPeriodChange = (period: string | null) => {
    setSelectedDiscoveryPeriod(period);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBlocks([]);
    setSelectedPeriods([]);
    setSelectedStates([]);
    setIsNaturalOnly(false);
    setSelectedMassRange(null);
    setSelectedDiscoveryPeriod(null);
  };

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const closeDetailsSidebar = () => {
    setSelectedElement(null);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const removeCategory = (category: ElementCategory) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const removeBlock = (block: string) => {
    setSelectedBlocks((prev) => prev.filter((b) => b !== block));
  };

  const removePeriod = (period: number) => {
    setSelectedPeriods((prev) => prev.filter((p) => p !== period));
  };

  const removeState = (state: string) => {
    setSelectedStates((prev) => prev.filter((s) => s !== state));
  };

  const removeNaturalFilter = () => {
    setIsNaturalOnly(false);
  };

  const removeMassRangeFilter = () => {
    setSelectedMassRange(null);
  };

  const removeDiscoveryPeriodFilter = () => {
    setSelectedDiscoveryPeriod(null);
  };

  const formatCategoryName = (category: ElementCategory): string => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get a fun emoji based on element category
  const getCategoryEmoji = (category: ElementCategory): string => {
    switch (category) {
      case ElementCategory.ALKALI_METAL:
        return "🔥"; // Fire - reactive
      case ElementCategory.ALKALINE_EARTH_METAL:
        return "💪"; // Strong
      case ElementCategory.TRANSITION_METAL:
        return "🔨"; // Malleable
      case ElementCategory.POST_TRANSITION_METAL:
        return "🔋"; // Battery-like
      case ElementCategory.METALLOID:
        return "🤖"; // Part metal, part not - robot
      case ElementCategory.NONMETAL:
        return "☁️"; // Gas-like
      case ElementCategory.HALOGEN:
        return "🧂"; // Salt-related
      case ElementCategory.NOBLE_GAS:
        return "👑"; // Royal/noble
      case ElementCategory.LANTHANIDE:
        return "✨"; // Sparkly
      case ElementCategory.ACTINIDE:
        return "☢️"; // Radioactive
      default:
        return "⚗️"; // Generic chemistry
    }
  };

  // Helper to get physical state at room temperature
  const getPhysicalState = (element: Element): string => {
    if (!element.boilingPoint || !element.meltingPoint) return "unknown";
    
    const roomTemp = 298.15; // 25°C in Kelvin
    
    if (element.meltingPoint > roomTemp) return "solid";
    if (element.boilingPoint > roomTemp) return "liquid";
    return "gas";
  };

  // Helper to determine if element is natural or synthetic
  const isNaturalElement = (element: Element): boolean => {
    // Elements with atomic numbers 1-94 are considered naturally occurring
    // (though some of the higher ones are only found in trace amounts)
    return element.atomicNumber <= 94;
  };

  // Helper to categorize discovery period
  const getDiscoveryPeriod = (element: Element): string => {
    if (!element.discoveryYear) return "ancient";
    if (element.discoveryYear < 1800) return "pre1800";
    if (element.discoveryYear < 1900) return "1800s";
    if (element.discoveryYear < 2000) return "1900s";
    return "2000s";
  };

  const isElementFiltered = (element: Element): boolean => {
    // Check if any filters are applied
    const hasFilters =
      selectedCategories.length > 0 ||
      selectedBlocks.length > 0 ||
      selectedPeriods.length > 0 ||
      selectedStates.length > 0 ||
      isNaturalOnly ||
      selectedMassRange !== null ||
      selectedDiscoveryPeriod !== null;

    // If no filters are applied, show all elements
    if (!hasFilters) return true;

    // Check if element passes all active filters
    const passesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(element.category);

    const passesBlock =
      selectedBlocks.length === 0 || selectedBlocks.includes(element.block);

    const passesPeriod =
      selectedPeriods.length === 0 || selectedPeriods.includes(element.period);
      
    // New filter checks
    const passesState =
      selectedStates.length === 0 || 
      selectedStates.includes(getPhysicalState(element));
      
    const passesNatural = 
      !isNaturalOnly || isNaturalElement(element);
      
    const passesMassRange = 
      !selectedMassRange ||
      (element.atomicMass >= selectedMassRange[0] && 
       element.atomicMass <= selectedMassRange[1]);
       
    const passesDiscoveryPeriod =
      !selectedDiscoveryPeriod ||
      getDiscoveryPeriod(element) === selectedDiscoveryPeriod;

    // Element must pass all active filter types
    return passesCategory && 
           passesBlock && 
           passesPeriod && 
           passesState && 
           passesNatural && 
           passesMassRange && 
           passesDiscoveryPeriod;
  };

  // Helper to get element position in the grid
  const getGridPosition = (element: Element) => {
    // Special case for lanthanides and actinides
    if (element.category === ElementCategory.LANTHANIDE) {
      // Place in the lanthanide row (6th period special row) with appropriate offset
      return { gridRow: 8, gridColumn: element.atomicNumber - 54 };
    }
    if (element.category === ElementCategory.ACTINIDE) {
      // Place in the actinide row (7th period special row) with appropriate offset
      return { gridRow: 9, gridColumn: element.atomicNumber - 86 };
    }

    // Handle Hydrogen and Helium specially
    if (element.atomicNumber === 1) {
      // Hydrogen
      return { gridRow: 1, gridColumn: 1 };
    }
    if (element.atomicNumber === 2) {
      // Helium
      return { gridRow: 1, gridColumn: 18 };
    }

    // Standard positioning based on group and period
    // For main group elements (s and p blocks)
    return { gridRow: element.period, gridColumn: element.group };
  };

  return (
    <div
      className={`periodic-table-container ${
        selectedElement ? "with-sidebar" : ""
      }`}
    >
      {/* App Header */}
      <header className="app-header">
        <div className="bubble bubble-1">⚗️</div>
        <div className="bubble bubble-2">🧪</div>
        <div className="bubble bubble-3">🔍</div>
        <div className="bubble bubble-4">🧫</div>
        <div className="bubble bubble-5">🔬</div>
        <div className="bubble bubble-6">🧯</div>
        <div className="bubble bubble-7">🔥</div>
        <div className="bubble bubble-8">💎</div>
        <div className="bubble bubble-9">🧠</div>
        <div className="bubble bubble-10">💡</div>
        
        <h1 className="app-title">
          <span className="title-element title-element-1">P</span>
          <span className="title-element title-element-2">e</span>
          <span className="title-element title-element-3">r</span>
          <span className="title-element title-element-4">i</span>
          <span className="title-element title-element-5">o</span>
          <span className="title-element title-element-6">d</span>
          <span className="title-element title-element-7">i</span>
          <span className="title-element title-element-8">c</span>
          <span className="title-separator"> </span>
          <span className="title-element title-element-9">T</span>
          <span className="title-element title-element-10">a</span>
          <span className="title-element title-element-11">b</span>
          <span className="title-element title-element-12">l</span>
          <span className="title-element title-element-13">e</span>
        </h1>
        <div className="header-tagline">Explore the chemical elements in a fun way!</div>
      </header>

      <div className="main-content-wrapper">
        {/* Left side filter panel (replacing legend) */}
        <div className={`left-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <button 
            className="collapse-sidebar-btn"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
          
          <div className="vertical-text">ELEMENT FILTERS</div>
          
          <div className="filter-sidebar">
            <h3 className="sidebar-title">
              <span className="filter-title-icon">🔍</span>
              Filters
            </h3>
            
            {/* Active Filters Display inside sidebar */}
            {hasActiveFilters() && (
              <div className="sidebar-active-filters">
                <div className="active-filters-header">
                  <h4 className="filter-section-title">
                    <span className="section-icon active-icon">✓</span>
                    Active Filters
                  </h4>
                  <button 
                    className="clear-filters-button"
                    onClick={clearFilters}
                    aria-label="Clear all filters"
                  >
                    🧹 Clear
                  </button>
                </div>
                
                <div className="active-filters-content">
                  {selectedCategories.map((category) => (
                    <div key={category} className="sidebar-filter-tag category-tag">
                      <span className="filter-tag-text">
                        <span className="filter-tag-emoji">
                          {getCategoryEmoji(category)}
                        </span>
                        {formatCategoryName(category)}
                      </span>
                      <button
                        className="remove-filter-btn"
                        onClick={() => removeCategory(category)}
                        aria-label={`Remove ${category} filter`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {selectedBlocks.map((block) => (
                    <div key={block} className="sidebar-filter-tag block-tag">
                      <span className="filter-tag-text">{block}-block</span>
                      <button
                        className="remove-filter-btn"
                        onClick={() => removeBlock(block)}
                        aria-label={`Remove ${block}-block filter`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {selectedPeriods.map((period) => (
                    <div key={period} className="sidebar-filter-tag period-tag">
                      <span className="filter-tag-text">Period {period}</span>
                      <button
                        className="remove-filter-btn"
                        onClick={() => removePeriod(period)}
                        aria-label={`Remove period ${period} filter`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {selectedStates.map((state) => (
                    <div key={state} className="sidebar-filter-tag state-tag">
                      <span className="filter-tag-text">
                        {state === 'solid' && '🧱'}
                        {state === 'liquid' && '💧'}
                        {state === 'gas' && '💨'}
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </span>
                      <button
                        className="remove-filter-btn"
                        onClick={() => removeState(state)}
                        aria-label={`Remove ${state} state filter`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  
                  {isNaturalOnly && (
                    <div className="sidebar-filter-tag natural-tag">
                      <span className="filter-tag-text">
                        <span className="filter-tag-emoji">🌱</span>
                        Natural Elements Only
                      </span>
                      <button
                        className="remove-filter-btn"
                        onClick={removeNaturalFilter}
                        aria-label="Remove natural elements filter"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  
                  {selectedMassRange && (
                    <div className="sidebar-filter-tag mass-tag">
                      <span className="filter-tag-text">
                        <span className="filter-tag-emoji">⚖️</span>
                        Mass: {selectedMassRange[0]}-{selectedMassRange[1]} u
                      </span>
                      <button
                        className="remove-filter-btn"
                        onClick={removeMassRangeFilter}
                        aria-label="Remove mass range filter"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  
                  {selectedDiscoveryPeriod && (
                    <div className="sidebar-filter-tag discovery-tag">
                      <span className="filter-tag-text">
                        <span className="filter-tag-emoji">
                          {selectedDiscoveryPeriod === 'ancient' && '🏛️'}
                          {selectedDiscoveryPeriod === 'pre1800' && '📜'}
                          {selectedDiscoveryPeriod === '1800s' && '⚙️'}
                          {selectedDiscoveryPeriod === '1900s' && '🔬'}
                          {selectedDiscoveryPeriod === '2000s' && '🚀'}
                        </span>
                        {selectedDiscoveryPeriod === 'ancient' && 'Ancient Times'}
                        {selectedDiscoveryPeriod === 'pre1800' && 'Pre-1800'}
                        {selectedDiscoveryPeriod === '1800s' && '1800s'}
                        {selectedDiscoveryPeriod === '1900s' && '1900s'}
                        {selectedDiscoveryPeriod === '2000s' && 'Modern Era'}
                      </span>
                      <button
                        className="remove-filter-btn"
                        onClick={removeDiscoveryPeriodFilter}
                        aria-label="Remove discovery period filter"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryToggle={toggleCategory}
              onClearFilters={clearFilters}
              onBlockFilterChange={toggleBlock}
              onPeriodFilterChange={togglePeriod}
              selectedBlocks={selectedBlocks}
              selectedPeriods={selectedPeriods}
              selectedStates={selectedStates}
              onStateFilterChange={toggleState}
              isNaturalOnly={isNaturalOnly}
              onNaturalFilterChange={toggleNaturalOnly}
              selectedMassRange={selectedMassRange}
              onMassRangeChange={handleMassRangeChange}
              selectedDiscoveryPeriod={selectedDiscoveryPeriod}
              onDiscoveryPeriodChange={handleDiscoveryPeriodChange}
              displayMode="sidebar"
            />
          </div>
        </div>

        {/* Periodic table main content */}
        <div className={`periodic-table-content ${sidebarCollapsed ? 'expanded' : ''}`}>
          <div className="periodic-table-wrapper">
            <div className="periodic-table">
              {/* Empty spaces for proper layout */}
              <div className="empty-d-block-p1"></div>
              <div className="empty-d-block-p2"></div>
              <div className="empty-d-block-p3"></div>
              <div className="empty-f-block-start"></div>
              <div className="empty-f-block-start-2"></div>

              {elements.map((element) => {
                const { gridRow, gridColumn } = getGridPosition(element);
                const position = gridColumn > 10 ? "right-side" : "left-side";
                const isSelected =
                  selectedElement?.atomicNumber === element.atomicNumber;

                return (
                  <div
                    key={element.atomicNumber}
                    className={`element-position ${position} ${
                      isSelected ? "selected" : ""
                    }`}
                    style={{ gridRow, gridColumn }}
                  >
                    <ElementCard
                      element={element}
                      isFiltered={isElementFiltered(element)}
                      onElementClick={handleElementClick}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedElement && (
        <ElementDetails
          element={selectedElement}
          onClose={closeDetailsSidebar}
        />
      )}
    </div>
  );

  function hasActiveFilters() {
    return (
      selectedCategories.length > 0 ||
      selectedBlocks.length > 0 ||
      selectedPeriods.length > 0 ||
      selectedStates.length > 0 ||
      isNaturalOnly ||
      selectedMassRange !== null ||
      selectedDiscoveryPeriod !== null
    );
  }
};

export default PeriodicTable;
