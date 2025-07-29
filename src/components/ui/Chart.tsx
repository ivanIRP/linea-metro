'use client'

interface ChartProps {
  data: unknown[]
  type: 'line' | 'bar' | 'pie' | 'area'
  title: string
  xKey?: string
  yKey?: string
  height?: number
  color?: string
}

export default function Chart({ 
  data, 
  type, 
  title, 
  xKey = 'x', 
  yKey = 'y', 
  height = 200,
  color = '#f97316' 
}: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p className="text-gray-500">No hay datos disponibles</p>
      </div>
    )
  }

  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(item => item[yKey] || 0))
  const chartHeight = height - 40 // Leave space for labels

  if (type === 'line' || type === 'area') {
    return (
      <div className="w-full" style={{ height }}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <div className="relative" style={{ height: chartHeight }}>
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={i}
                x1="0"
                y1={`${(i * 25)}%`}
                x2="100%"
                y2={`${(i * 25)}%`}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Chart line/area */}
            {data.length > 1 && (
              <>
                {type === 'area' && (
                  <polygon
                    points={data.map((item, index) => {
                      const x = (index / (data.length - 1)) * 100
                      const y = 100 - ((item[yKey] || 0) / maxValue) * 100
                      return `${x}%,${y}%`
                    }).join(' ') + ` 100%,100% 0%,100%`}
                    fill={color}
                    fillOpacity="0.2"
                  />
                )}
                <polyline
                  points={data.map((item, index) => {
                    const x = (index / (data.length - 1)) * 100
                    const y = 100 - ((item[yKey] || 0) / maxValue) * 100
                    return `${x}%,${y}%`
                  }).join(' ')}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {data.map((item, index) => {
                  const x = (index / (data.length - 1)) * 100
                  const y = 100 - ((item[yKey] || 0) / maxValue) * 100
                  return (
                    <circle
                      key={index}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="3"
                      fill={color}
                    />
                  )
                })}
              </>
            )}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {data.map((item, index) => (
              <span key={index} className="truncate">
                {item[xKey]}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="w-full" style={{ height }}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <div className="flex items-end justify-between" style={{ height: chartHeight }}>
          {data.map((item, index) => {
            const barHeight = ((item[yKey] || 0) / maxValue) * 100
            return (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div
                  className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ 
                    height: `${barHeight}%`,
                    backgroundColor: color,
                    minHeight: '2px'
                  }}
                  title={`${item[xKey]}: ${item[yKey]}`}
                />
                <span className="text-xs text-gray-500 mt-1 truncate text-center">
                  {item[xKey]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + (item[yKey] || 0), 0)
    let cumulativePercent = 0

    return (
      <div className="w-full" style={{ height }}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              {data.map((item, index) => {
                const percent = ((item[yKey] || 0) / total) * 100
                const strokeDasharray = `${percent} ${100 - percent}`
                const strokeDashoffset = -cumulativePercent
                const hue = (index * 137.5) % 360 // Golden angle for better color distribution
                
                cumulativePercent += percent
                
                return (
                  <circle
                    key={index}
                    cx="60"
                    cy="60"
                    r="30"
                    fill="transparent"
                    stroke={`hsl(${hue}, 70%, 50%)`}
                    strokeWidth="8"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                )
              })}
            </svg>
          </div>
          
          {/* Legend */}
          <div className="ml-4 space-y-1">
            {data.map((item, index) => {
              const hue = (index * 137.5) % 360
              const percent = ((item[yKey] || 0) / total) * 100
              
              return (
                <div key={index} className="flex items-center text-xs">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: `hsl(${hue}, 70%, 50%)` }}
                  />
                  <span className="text-gray-700">
                    {item[xKey]} ({percent.toFixed(1)}%)
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return null
}