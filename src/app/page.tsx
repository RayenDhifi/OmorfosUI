'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Code, Layout, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight, solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism'

type ComponentInfo = {
  name: string;
  component: React.FC;
  code: string;
};

const componentPaths = [
  'dashboard', // Ensure this path matches your actual component filenames
];

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(0)
  const [components, setComponents] = useState<ComponentInfo[]>([]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleView = () => setShowCode(!showCode)

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const loadedComponents: ComponentInfo[] = await Promise.all(componentPaths.map(async (path) => {
          const module = await import(`../components/new/${path}.tsx`);
          return { 
            name: path, 
            component: module.default as React.FC,
            code: module.code as string || "" 
          };
        }));
        setComponents(loadedComponents);
      } catch (error) {
        console.error("Error loading components:", error);
      }
    };

    loadComponents();
  }, []);

  const nextComponent = () => {
    setCurrentComponent((prev) => (prev + 1) % components.length)
  }

  const prevComponent = () => {
    setCurrentComponent((prev) => (prev - 1 + components.length) % components.length)
  }

  const CurrentComponent = components[currentComponent]?.component;

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Dotted background */}
      <div
        className="fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'}`}>
              OmorfosUI
            </span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Explore the universe of modern web components</p>
        </header>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={toggleView}>
            {showCode ? <Layout className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          </Button>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        <Card className={`w-full aspect-video ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CardContent className="p-6 h-full">
            {showCode ? (
              <SyntaxHighlighter 
                language="typescript" 
                style={isDarkMode ? solarizedDarkAtom : solarizedlight}
                customStyle={{ height: '100%', overflow: 'auto', borderRadius: '0.5rem' }}
              >
                {components[currentComponent]?.code}
              </SyntaxHighlighter>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                {CurrentComponent && <CurrentComponent />}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={prevComponent}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>Component {currentComponent + 1} of {components.length}</p>
          </div>
          <Button variant="outline" size="icon" onClick={nextComponent}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>This showcase demonstrates various complex UI components. In a real application, each component would be fully interactive and customizable.</p>
        </div>
      </div>
    </div>
  )
}
