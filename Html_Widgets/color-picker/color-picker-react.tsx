import React, { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [complementaryColors, setComplementaryColors] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);

  const getComplementaryColors = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const complement = `#${(255 - r).toString(16).padStart(2, '0')}${(255 - g).toString(16).padStart(2, '0')}${(255 - b).toString(16).padStart(2, '0')}`;
    const triadic1 = `#${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}`;
    const triadic2 = `#${b.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}`;

    return [complement, triadic1, triadic2];
  };

  useEffect(() => {
    setComplementaryColors(getComplementaryColors(selectedColor));
  }, [selectedColor]);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  };

  const ColorButton = ({ color, label }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex justify-between items-center p-2"
            onClick={() => copyToClipboard(color)}
          >
            <div className="flex items-center">
              <div
                className="w-6 h-6 border border-gray-300 mr-2"
                style={{ backgroundColor: color }}
              ></div>
              <span>{label}</span>
            </div>
            {copiedColor === color ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copiedColor === color ? 'Copied!' : 'Click to copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="mr-2" />
          Color Harmony Explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Unlock the power of color harmony! Choose your base color and watch as we reveal its perfect complementary and triadic companions. Whether you're designing a website, creating art, or just exploring color theory, our Color Harmony Explorer has you covered. Click on any color to instantly copy its hex code – it's that easy!
          </p>
          <div>
            <Label htmlFor="colorPicker" className="block mb-2">Pick your color:</Label>
            <Input
              id="colorPicker"
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-20 cursor-pointer"
              style={{ padding: '0', border: '2px solid #e2e8f0', borderRadius: '0.375rem' }}
            />
          </div>
          <div>
            <Label>Your Chosen Hue:</Label>
            <ColorButton color={selectedColor} label={selectedColor} />
          </div>
          <div>
            <Label>Harmony Palette:</Label>
            <div className="space-y-2">
              {complementaryColors.map((color, index) => (
                <ColorButton key={index} color={color} label={index === 0 ? 'Complementary' : `Triadic ${index}`} />
              ))}
            </div>
          </div>
          <div>
            <Label>Harmony in Action:</Label>
            <div 
              className="mt-2 p-4 rounded"
              style={{ backgroundColor: selectedColor }}
            >
              <p className="text-center font-bold mb-2" style={{ color: complementaryColors[0] }}>
                Complementary Magic
              </p>
              <p className="text-center" style={{ color: complementaryColors[1] }}>
                Triadic Harmony 1
              </p>
              <p className="text-center" style={{ color: complementaryColors[2] }}>
                Triadic Harmony 2
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
