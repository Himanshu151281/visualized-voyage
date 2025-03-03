
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isActive?: boolean;
}

const SearchBar = ({ onSearch, onFocus, onBlur, isActive = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (query.trim() === '') {
      onSearch('');
    }
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Debounce the search
    const debounceTimer = setTimeout(() => {
      onSearch(newQuery);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative rounded-full border border-card-border bg-white transition-all duration-200 overflow-hidden",
        (isFocused || isActive) && "ring-2 ring-primary-blue ring-opacity-20"
      )}
    >
      <div className="flex items-center px-4 py-2">
        <Search 
          size={18} 
          className="text-gray-400 flex-shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="ml-2 w-full focus:outline-none text-sm"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
