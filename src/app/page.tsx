'use client'

import { useState } from 'react'
import { Moon, Sun, Code, Layout, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(0)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleView = () => setShowCode(!showCode)

  const components = [
    { name: 'Dashboard', code: `
import React from 'react';
import { Chart, UserList, ActivityFeed, PerformanceMetrics } from './components';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Chart />
      <UserList />
      <ActivityFeed />
      <PerformanceMetrics />
    </div>
  );
};`
    },
    { name: 'User Profile', code: `
import React from 'react';
import { Avatar, UserInfo, ActivityTimeline, Settings } from './components';

export const UserProfile = () => {
  return (
    <div className="user-profile">
      <Avatar />
      <UserInfo />
      <ActivityTimeline />
      <Settings />
    </div>
  );
};`
    },
    { name: 'Analytics', code: `
import React from 'react';
import { LineChart, BarChart, PieChart, DataTable } from './components';

export const Analytics = () => {
  return (
    <div className="analytics">
      <LineChart />
      <BarChart />
      <PieChart />
      <DataTable />
    </div>
  );
};`
    },
    { name: 'E-commerce', code: `
import React from 'react';
import { ProductGrid, ShoppingCart, Checkout, OrderHistory } from './components';

export const Ecommerce = () => {
  return (
    <div className="e-commerce">
      <ProductGrid />
      <ShoppingCart />
      <Checkout />
      <OrderHistory />
    </div>
  );
};`
    }
  ]

  const nextComponent = () => {
    setCurrentComponent((prev) => (prev + 1) % components.length)
  }

  const prevComponent = () => {
    setCurrentComponent((prev) => (prev - 1 + components.length) % components.length)
  }

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
              <pre className={`h-full overflow-auto p-4 rounded ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
                <code>{components[currentComponent].code}</code>
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {components[currentComponent].name} Component
                </div>
                <Tabs defaultValue="preview" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="props">Props</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="p-4 border rounded-md mt-2">
                    Preview of {components[currentComponent].name} component
                  </TabsContent>
                  <TabsContent value="props" className="p-4 border rounded-md mt-2">
                    Props for {components[currentComponent].name} component
                  </TabsContent>
                </Tabs>
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