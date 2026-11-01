import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import karnatakaDistricts from '../../data/karnataka_districts.json';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Compass, Layers } from 'lucide-react';

const KARNATAKA_BOUNDS = [
  [73.8, 11.3], // Southwest [lng, lat]
  [78.8, 18.6]  // Northeast [lng, lat]
];

const CARTO_API_KEY = 'cb1_4zfl_1_2aa573709f2899bde053d54e';

const CARTO_RASTER_STYLE = {
  version: 8,
  sources: {
    'carto-voyager': {
      type: 'raster',
      tiles: [
        `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`,
        `https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_API_KEY}`
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors, © CARTO'
    }
  },
  layers: [
    {
      id: 'carto-voyager-layer',
      type: 'raster',
      source: 'carto-voyager',
      minzoom: 0,
      maxzoom: 19
    }
  ]
};

const KarnatakaMap = ({ 
  selectedDistrict, 
  onSelectDistrict, 
  districtPlaceCounts = {} 
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false });
  const markersRef = useRef([]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: CARTO_RASTER_STYLE,
      center: [75.9, 14.9],
      zoom: 6.4,
      minZoom: 5.5,
      maxZoom: 12,
      maxBounds: [
        [71.5, 10.0],
        [81.0, 20.0]
      ],
      attributionControl: false
    });

    mapRef.current = map;

    // Watch container resize
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(mapContainerRef.current);

    const resizeTimer = setTimeout(() => {
      map.resize();
    }, 150);

    map.on('load', () => {
      map.resize();
      // Add Karnataka Districts GeoJSON source
      map.addSource('karnataka-districts', {
        type: 'geojson',
        data: karnatakaDistricts,
        generateId: true
      });

      // Polygon fill layer
      map.addLayer({
        id: 'districts-fill',
        type: 'fill',
        source: 'karnataka-districts',
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'district'], selectedDistrict || ''],
            '#E07A5F', // Selected Terracotta
            ['==', ['get', 'district'], ''],
            '#81B29A', // Hover
            '#3D5A80'  // Default Coastal Blue
          ],
          'fill-opacity': [
            'case',
            ['==', ['get', 'district'], selectedDistrict || ''],
            0.65,
            0.2
          ]
        }
      });

      // Polygon boundary borders layer
      map.addLayer({
        id: 'districts-line',
        type: 'line',
        source: 'karnataka-districts',
        paint: {
          'line-color': [
            'case',
            ['==', ['get', 'district'], selectedDistrict || ''],
            '#D0694E',
            '#2A363B'
          ],
          'line-width': [
            'case',
            ['==', ['get', 'district'], selectedDistrict || ''],
            3,
            1.4
          ],
          'line-opacity': 0.85
        }
      });

      // Add district centroid markers with click triggers
      karnatakaDistricts.features.forEach((feature) => {
        const districtName = feature.properties.district;
        const center = feature.properties.center;
        if (!center || !center[0]) return;

        const el = document.createElement('div');
        el.className = 'district-map-marker group';
        el.setAttribute('data-district', districtName);
        el.innerHTML = `
          <div class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-1 select-none whitespace-nowrap ${
            districtName === selectedDistrict 
              ? 'bg-[#2A363B] text-white ring-2 ring-[#E07A5F] scale-105' 
              : 'bg-white/90 backdrop-blur-xs text-[#2A363B] hover:bg-[#E07A5F] hover:text-white border border-gray-200'
          }">
            <span class="w-1.5 h-1.5 rounded-full ${
              districtName === selectedDistrict ? 'bg-[#E07A5F]' : 'bg-[#3D5A80]'
            }"></span>
            <span>${districtName}</span>
          </div>
        `;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          onSelectDistrict(districtName);
        });

        el.addEventListener('mouseenter', () => {
          setHoveredDistrict(districtName);
        });

        el.addEventListener('mouseleave', () => {
          setHoveredDistrict(null);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(center)
          .addTo(map);

        markersRef.current.push({ name: districtName, marker, el });
      });

      setMapLoaded(true);
    });

    // Hover interaction on polygons
    map.on('mousemove', 'districts-fill', (e) => {
      if (e.features.length > 0) {
        map.getCanvas().style.cursor = 'pointer';
        const feature = e.features[0];
        const name = feature.properties.district;
        setHoveredDistrict(name);
        setTooltipPos({
          x: e.point.x,
          y: e.point.y,
          visible: true
        });
      }
    });

    map.on('mouseleave', 'districts-fill', () => {
      map.getCanvas().style.cursor = '';
      setHoveredDistrict(null);
      setTooltipPos(prev => ({ ...prev, visible: false }));
    });

    // Click interaction on polygons
    map.on('click', 'districts-fill', (e) => {
      if (e.features.length > 0) {
        const districtName = e.features[0].properties.district;
        onSelectDistrict(districtName);
      }
    });

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      markersRef.current.forEach(m => m.marker.remove());
      markersRef.current = [];
      map.remove();
    };
  }, []);

  // Update styles and markers when selectedDistrict or hoveredDistrict changes
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const map = mapRef.current;

    // Update fill layer styling
    if (map.getLayer('districts-fill')) {
      map.setPaintProperty('districts-fill', 'fill-color', [
        'case',
        ['==', ['get', 'district'], selectedDistrict || ''],
        '#E07A5F', // Selected Terracotta
        ['==', ['get', 'district'], hoveredDistrict || ''],
        '#81B29A', // Hovered Sage Green
        '#3D5A80'  // Default Coastal Blue
      ]);

      map.setPaintProperty('districts-fill', 'fill-opacity', [
        'case',
        ['==', ['get', 'district'], selectedDistrict || ''],
        0.65,
        ['==', ['get', 'district'], hoveredDistrict || ''],
        0.45,
        0.2
      ]);
    }

    // Update line layer styling
    if (map.getLayer('districts-line')) {
      map.setPaintProperty('districts-line', 'line-color', [
        'case',
        ['==', ['get', 'district'], selectedDistrict || ''],
        '#D0694E',
        ['==', ['get', 'district'], hoveredDistrict || ''],
        '#2A363B',
        '#2A363B'
      ]);

      map.setPaintProperty('districts-line', 'line-width', [
        'case',
        ['==', ['get', 'district'], selectedDistrict || ''],
        3,
        ['==', ['get', 'district'], hoveredDistrict || ''],
        2.2,
        1.4
      ]);
    }

    // Update marker badges
    markersRef.current.forEach(({ name, el }) => {
      const isSelected = name === selectedDistrict;
      const isHovered = name === hoveredDistrict;
      const badge = el.querySelector('div');
      const dot = el.querySelector('span');

      if (badge && dot) {
        if (isSelected) {
          badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1 select-none whitespace-nowrap bg-[#2A363B] text-white ring-2 ring-[#E07A5F] scale-110 z-30';
          dot.className = 'w-1.5 h-1.5 rounded-full bg-[#E07A5F] animate-pulse';
        } else if (isHovered) {
          badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1 select-none whitespace-nowrap bg-[#81B29A] text-white border border-[#81B29A] scale-105 z-20';
          dot.className = 'w-1.5 h-1.5 rounded-full bg-white';
        } else {
          badge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight shadow-xs transition-all duration-200 cursor-pointer flex items-center gap-1 select-none whitespace-nowrap bg-white/90 backdrop-blur-xs text-[#2A363B] hover:bg-[#E07A5F] hover:text-white border border-gray-200';
          dot.className = 'w-1.5 h-1.5 rounded-full bg-[#3D5A80]';
        }
      }
    });
  }, [selectedDistrict, hoveredDistrict, mapLoaded]);

  // Smooth flyTo/fitBounds when a district is selected
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selectedDistrict) return;

    const feature = karnatakaDistricts.features.find(
      f => f.properties.district.toLowerCase() === selectedDistrict.toLowerCase()
    );

    if (feature && feature.properties.bbox) {
      const [minLng, minLat, maxLng, maxLat] = feature.properties.bbox;
      mapRef.current.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]], 
        {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 9.5,
          duration: 900
        }
      );
    }
  }, [selectedDistrict, mapLoaded]);

  // Controls: Reset View
  const handleResetView = () => {
    if (!mapRef.current) return;
    mapRef.current.fitBounds(KARNATAKA_BOUNDS, {
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
      duration: 1000
    });
  };

  // Controls: Zoom In
  const handleZoomIn = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomIn({ duration: 300 });
  };

  // Controls: Zoom Out
  const handleZoomOut = () => {
    if (!mapRef.current) return;
    mapRef.current.zoomOut({ duration: 300 });
  };

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[660px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-[#E8ECEF]">
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0" />

      {/* Floating Hover Tooltip */}
      {tooltipPos.visible && hoveredDistrict && (
        <div 
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full mb-3 bg-[#2A363B] text-white px-3 py-1.5 rounded-xl shadow-xl border border-white/10 text-xs font-semibold backdrop-blur-md"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F]"></span>
            <span className="font-bold">{hoveredDistrict}</span>
          </div>
          <div className="text-[10px] text-white/70 mt-0.5">
            {districtPlaceCounts[hoveredDistrict] || 0} destination{districtPlaceCounts[hoveredDistrict] === 1 ? '' : 's'} · Click to focus
          </div>
        </div>
      )}

      {/* Top Floating Map Status Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 shadow-md text-xs">
        <span className="w-2 h-2 rounded-full bg-[#81B29A] animate-pulse"></span>
        <span className="font-bold text-[#2A363B]">Karnataka Vector Map</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600 font-medium">31 Districts</span>
      </div>

      {/* Top-Right Floating Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 shadow-lg">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 text-[#2A363B] flex items-center justify-center transition-all shadow-xs"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 text-[#2A363B] flex items-center justify-center transition-all shadow-xs"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-gray-200 my-0.5"></div>
        <button
          onClick={handleResetView}
          title="Reset Karnataka View"
          className="w-8 h-8 rounded-xl bg-white hover:bg-gray-100 text-[#E07A5F] flex items-center justify-center transition-all shadow-xs"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Legend Bar */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200 shadow-md text-[11px] font-medium text-gray-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#E07A5F]"></span>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#81B29A]"></span>
          <span>Hovered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#3D5A80]/40"></span>
          <span>Explore</span>
        </div>
      </div>

      {/* Reset Map Pill Button (Mobile & Desktop) */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={handleResetView}
          className="px-3 py-1.5 bg-[#2A363B] hover:bg-[#3D5A80] text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all"
        >
          <Compass className="w-3.5 h-3.5 text-[#E07A5F]" />
          <span>Reset Karnataka</span>
        </button>
      </div>

    </div>
  );
};

export default KarnatakaMap;
