import { useState, useEffect } from 'react';
import {
  Search, Calculator, Percent, ExternalLink, Home, Heart,
  DollarSign, Calendar, Receipt, Apple, Clock, Moon, Sun,
  TrendingUp, Flame, ChevronUp, X
} from 'lucide-react';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  featured?: boolean;
  popular?: boolean;
  usageCount?: number;
  active?: boolean;
}

function App() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFavorites = localStorage.getItem('favorites');

    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    fetch('/tools.json')
      .then(response => response.json())
      .then(data => {
        const activeTools = data.filter((tool: Tool) => tool.active);
        setTools(activeTools);
        setFilteredTools(activeTools);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading tools:', error);
        setIsLoading(false);
      });

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let filtered = tools;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  }, [searchQuery, tools, selectedCategory]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleFavorite = (toolId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavorites = favorites.includes(toolId)
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (iconName: string, className: string = "w-8 h-8") => {
    const icons: { [key: string]: React.ReactElement } = {
      calculator: <Calculator className={className} />,
      percent: <Percent className={className} />,
      home: <Home className={className} />,
      heart: <Heart className={className} />,
      'dollar-sign': <DollarSign className={className} />,
      calendar: <Calendar className={className} />,
      receipt: <Receipt className={className} />,
      apple: <Apple className={className} />,
      clock: <Clock className={className} />
    };
    return icons[iconName] || <Calculator className={className} />;
  };

  const categories = ['All', ...Array.from(new Set(tools.map(tool => tool.category)))];
  // const featuredTools = tools.filter(tool => tool.featured);
  const totalUsage = tools.reduce((sum, tool) => sum + (tool.usageCount || 0), 0);

  const AdBlock = ({ position, size = 'normal' }: { position: string; size?: 'hero' | 'normal' | 'sidebar' }) => (
    <div className={`bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-2 border-dashed border-sky-300 dark:border-slate-600 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-500 hover:border-sky-400 dark:hover:border-slate-500 group ${
      size === 'hero' ? 'p-12 my-4' : size === 'sidebar' ? 'p-6 my-4' : 'p-8 my-6'
    } w-full`}>
      <div className="text-center">
        <div className={`mx-auto mb-3 bg-sky-100 dark:bg-slate-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
          size === 'hero' ? 'w-20 h-20' : size === 'sidebar' ? 'w-12 h-12' : 'w-16 h-16'
        }`}>
          <TrendingUp className={`text-sky-600 dark:text-slate-300 ${
            size === 'hero' ? 'w-10 h-10' : size === 'sidebar' ? 'w-6 h-6' : 'w-8 h-8'
          }`} />
        </div>
        <p className={`text-sky-700 dark:text-slate-300 font-semibold ${
          size === 'hero' ? 'text-2xl' : size === 'sidebar' ? 'text-sm' : 'text-lg'
        }`}>Google AdSense Ad Block</p>
        <p className={`text-sky-600 dark:text-slate-400 mt-1 ${
          size === 'hero' ? 'text-base' : 'text-sm'
        }`}>{position}</p>
      </div>
    </div>
  );

  const SkeletonCard = () => (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-slate-200 dark:border-slate-700 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mb-3"></div>
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-sky-50 via-white to-blue-50'
    }`}>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-sky-500/5 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div className={`${
              darkMode ? 'bg-slate-800/50' : 'bg-white/80'
            }  flex items-center gap-2 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md border ${
              darkMode ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <span className={`text-sm font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{tools.length} Tools</span>
              <span className={`${darkMode ? 'text-green-600' : 'text-green-300'}`}>•</span>
              <span className={`text-sm font-bold ${darkMode ? 'text-sky-300' : 'text-sky-700'}`}>{totalUsage.toLocaleString()} Uses</span>
            </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              } shadow-lg hover:shadow-xl hover:scale-110`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* <AdBlock position="Hero Banner - Premium Top Placement" size="hero" /> */}

        <div className="lg:flex lg:gap-6">
          <div className="lg:w-3/4">

            <div className="my-4 space-y-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-slate-400' : 'text-slate-400'
                } w-5 h-5`} />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-11 pr-11 py-2.5 ${
                    darkMode
                      ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400'
                      : 'bg-white/90 border-slate-200 text-slate-900'
                  } backdrop-blur-lg border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all shadow-lg`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'
                    } transition-colors`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? darkMode
                          ? 'bg-sky-500 text-white shadow-lg scale-105'
                          : 'bg-sky-600 text-white shadow-lg scale-105'
                        : darkMode
                          ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700'
                          : 'bg-white/80 text-slate-700 hover:bg-slate-100'
                    } backdrop-blur-sm border ${
                      selectedCategory === category
                        ? 'border-transparent'
                        : darkMode ? 'border-slate-700' : 'border-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <AdBlock position="Inline Small Ad" />
            </div>

            {filteredTools.length === 0 && searchQuery && !isLoading && (
              <div className="text-center py-12">
                <Search className={`w-16 h-16 mx-auto mb-4 ${
                  darkMode ? 'text-slate-600' : 'text-slate-300'
                }`} />
                <p className={`text-xl ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  No tools found matching "{searchQuery}"
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <>
                {Array.from({ length: Math.ceil(filteredTools.length / 4) }).map((_, chunkIndex) => {
                  const startIndex = chunkIndex * 4;
                  const endIndex = startIndex + 4;
                  const toolsChunk = filteredTools.slice(startIndex, endIndex);

                  return (
                    <div key={chunkIndex}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {toolsChunk.map((tool) => (
                          <a
                            key={tool.id}
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative ${
                              darkMode ? 'bg-slate-800/50' : 'bg-white/90'
                            } backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 p-4 border ${
                              darkMode ? 'border-slate-700 hover:border-blue-500' : 'border-slate-200 hover:border-blue-400'
                            } hover:-translate-y-1 overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative">
                              <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 ${
                                  darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
                                } rounded-lg ${
                                  darkMode ? 'text-blue-400' : 'text-blue-600'
                                } group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                  {getIcon(tool.icon, "w-6 h-6")}
                                </div>
                                <div className="flex gap-1">
                                  <button
                                    onClick={(e) => toggleFavorite(tool.id, e)}
                                    className={`p-1.5 rounded-lg transition-all duration-300 ${
                                      favorites.includes(tool.id)
                                        ? 'text-red-500 scale-110'
                                        : darkMode ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-500'
                                    }`}
                                  >
                                    <Heart className={`w-4 h-4 ${favorites.includes(tool.id) ? 'fill-current' : ''}`} />
                                  </button>
                                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                                      favorites.includes(tool.id)
                                        ? 'text-red-500 scale-110'
                                        : darkMode ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-500'
                                    }`}>
                                  <ExternalLink className={`w-4 h-4 ${
                                    darkMode ? 'text-slate-400 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-600'
                                  } transition-colors duration-300`} />
                                  </div>
                                </div>
                              </div>
                              <h3 className={`text-lg font-bold ${
                                darkMode ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'
                              } mb-1.5 transition-colors duration-300`}>
                                {tool.name}
                              </h3>
                              <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} text-sm mb-2 line-clamp-2`}>
                                {tool.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className={`inline-block px-2.5 py-0.5 ${
                                  darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'
                                } text-xs rounded-full font-medium`}>
                                  {tool.category}
                                </span>
                                {tool.popular && (
                                  <span className="flex items-center gap-1 text-orange-500 text-xs font-medium">
                                    <Flame className="w-3 h-3" />
                                  </span>
                                )}
                              </div>
                              {tool.usageCount && (
                                <div className={`mt-2 text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {tool.usageCount.toLocaleString()} uses
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>

                      {endIndex < filteredTools.length && (
                        <AdBlock position={`In-Feed Ad ${chunkIndex + 1}`} />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-4 space-y-4">
              <AdBlock position="Sidebar Ad 1" size="sidebar" />

              <div className={`${
                darkMode ? 'bg-slate-800/50' : 'bg-white/90'
              } backdrop-blur-lg rounded-xl shadow-lg p-4 border ${
                darkMode ? 'border-slate-700' : 'border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                  <h3 className={`text-base font-bold ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>Popular Tools</h3>
                </div>
                <div className="space-y-2">
                  {tools
                    .filter(t => t.popular)
                    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
                    .slice(0, 5)
                    .map(tool => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-2 rounded-lg transition-all duration-300 ${
                          darkMode
                            ? 'hover:bg-slate-700/50 text-slate-300'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${
                            darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {getIcon(tool.icon, "w-4 h-4")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{tool.name}</div>
                            {tool.usageCount && (
                              <div className={`text-xs ${
                                darkMode ? 'text-slate-500' : 'text-slate-400'
                              }`}>
                                {tool.usageCount.toLocaleString()} uses
                              </div>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                </div>
              </div>

              <AdBlock position="Sidebar Ad 2" size="sidebar" />
              {/* <AdBlock position="Sidebar Ad 3" size="sidebar" /> */}
            </div>
          </aside>
        </div>

        <AdBlock position="Bottom Banner - Last Ad Before Footer" />

        <footer className={`mt-6 text-center ${darkMode ? 'text-slate-400' : 'text-slate-500'} text-sm`}>
          <p>&copy; {new Date().getFullYear()} Free Tools. All rights reserved.</p>
        </footer>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 ${
            darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'
          } rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;
