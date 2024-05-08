import React, { useState } from 'react';
import {Select} from "@/components/ui/select";
import {Slider} from "@/components/ui/slider";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const devices = [
  {
    "id": "clvo1sp6800005ihgjp0dpz00",
    "nameDevice": "Лампа",
    "kwMin": 1,
    "kwMax": 2,
    "stepKw": 0.02,
    "maxKwMonth": 15
  },
  {
    "id": "clvnfubnb0000c5tksebc3r0g",
    "nameDevice": "Телевізор",
    "kwMin": 1,
    "kwMax": 2,
    "stepKw": 0.1,
    "maxKwMonth": 100
  }
];

const EnergyCalculator = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(devices[0].id);
  const [hoursPerDay, setHoursPerDay] = useState(0);

  const selectedDevice = devices.find(device => device.id === selectedDeviceId);

  const calculateEnergy = () => {
    if (selectedDevice) {
      const dailyKw = hoursPerDay * (selectedDevice.kwMin + selectedDevice.kwMax) / 2;
      const monthlyKw = dailyKw * 30;
      return monthlyKw;
    }
    return 0;
  };

  const handleCalculate = () => {
    const energy = calculateEnergy();
    alert(`Місячне споживання енергії: ${energy.toFixed(2)} кВт`);
  };

  return (
    <div>
      <Select
        value={selectedDeviceId}
        onValueChange={(value)=>setSelectedDeviceId(value)}
      >
        {devices.map(device => (
          <option key={device.id} value={device.id}>{device.nameDevice}</option>
        ))}
      </Select>
      <Slider
        min={0}
        max={24}
        step={0.5}
        name={String(hoursPerDay)}
        onChange={()=>setHoursPerDay}
      />
      <Input
        placeholder="Введите количество часов"
        type="number"
        value={hoursPerDay}
        onChange={(e) => setHoursPerDay(Number(e.target.value))}
      />
      <Button onClick={handleCalculate}>Розрахувати</Button>
      <span>Результат буде виведений у спливаючому вікні</span>
    </div>
  );
};

export default EnergyCalculator;
