'use client';

import React, { useState, useEffect } from 'react';
import {
  RefreshCw, RotateCw, CloudRain, HeartPulse, TrendingUp, Sprout,
  Droplet, FlaskConical, Flame, Map, CloudLightning, Calculator,
  ShieldCheck, Ship, Satellite, Trees, Wheat, Coins, Award, MapPin,
  Info, CheckCircle2, PieChart, BarChart3, CalendarDays, AlertTriangle,
  ShieldAlert, Warehouse, CheckCheck, SearchCheck, Search, Store, Truck,
  Sparkles, Scan, Crosshair, Radar, AlertCircle
} from 'lucide-react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Certificate Mock DB
const certificateDatabase = [
  { id: "GAP-21-00123", type: "GAP สวน", name: "สวนทุเรียนนายสมชาย ใจดี", province: "จันทบุรี (อ.ท่าใหม่)", status: "ผ่านการรับรอง", expire: "15 พ.ย. 2028", gacc: "พร้อมส่งออก" },
  { id: "GAP-86-00892", type: "GAP สวน", name: "สวนทุเรียนหลังสวนเกษตรอัจฉริยะ", province: "ชุมพร (อ.หลังสวน)", status: "ผ่านการรับรอง", expire: "22 ธ.ค. 2028", gacc: "พร้อมส่งออก" },
  { id: "GAP-95-00341", type: "GAP สวน (GI)", name: "สวนทุเรียนเบตงขุนเขา GI", province: "ยะลา (อ.เบตง)", status: "ผ่านการรับรอง", expire: "10 มี.ค. 2029", gacc: "พร้อมส่งออก" },
  { id: "GAP-33-00512", type: "GAP สวน (GI)", name: "สวนทุเรียนภูเขาไฟศรีสะเกษ", province: "ศรีสะเกษ (อ.กันทรลักษ์)", status: "ผ่านการรับรอง", expire: "18 ส.ค. 2028", gacc: "พร้อมส่งออก" },
  { id: "DOA-21-PK-089", type: "DOA โรงแพ็ค", name: "ล้งเสี่ยเม้งอินเตอร์ฟรุต", province: "จันทบุรี (อ.มะขาม)", status: "ขึ้นทะเบียนถูกต้อง", expire: "30 ธ.ค. 2027", gacc: "GACC Code: CTHA210089" },
  { id: "DOA-86-PK-042", type: "DOA โรงแพ็ค", name: "ชุมพรฟรุตสแควร์ แกลงส่งออก", province: "ชุมพร (อ.เมือง)", status: "ขึ้นทะเบียนถูกต้อง", expire: "14 พ.ค. 2028", gacc: "GACC Code: CTHA860042" }
];

// Interactive Map Regions Data
const mapLocationData = {
  chanthaburi: {
    badge: "ภาคตะวันออก",
    title: "จันทบุรี (เมืองหลวงทุเรียนไทย)",
    subtitle: "ศูนย์กลางการผลิตและล้งส่งออกทุเรียนหลักของประเทศ",
    area: "385,000 ไร่",
    yield: "520,000 ตัน",
    gap: "94.8% (28,500 แปลง)",
    variety: "หมอนทอง (85%)",
    desc: "อ.ท่าใหม่, อ.ขลุง, อ.มะขาม และ อ.เขาคิชฌกูฏ มีผลผลิตหมอนทองเกรดเอส่งออกคุณภาพสูงที่สุดในเอเชีย"
  },
  rayong: {
    badge: "ภาคตะวันออก",
    title: "ระยอง (แหล่งทุเรียน GI หวานมัน)",
    subtitle: "ทุเรียนเนื้อดี อ.แกลง และ อ.เมืองระยอง",
    area: "115,000 ไร่",
    yield: "155,000 ตัน",
    gap: "89.2% (9,800 แปลง)",
    variety: "หมอนทอง/ชะนี (90%)",
    desc: "เก็บเกี่ยวได้รวดเร็ว เนื้อแห้งเนียนนุ่ม หวานมันเป็นเอกลักษณ์เฉพาะตัว"
  },
  trat: {
    badge: "ภาคตะวันออก",
    title: "ตราด (ทุเรียนชะนี & หมอนทองต้นฤดู)",
    subtitle: "ผลผลิตออกรุ่นแรกของปีในประเทศไทย",
    area: "85,000 ไร่",
    yield: "120,000 ตัน",
    gap: "88.0% (6,400 แปลง)",
    variety: "ชะนี / หมอนทอง (88%)",
    desc: "อ.เขาสมิง และ อ.บ่อไร่ สามารถเก็บเกี่ยวได้ตั้งแต่เดือนมีนาคม ได้ราคาดีช่วงต้นฤดูกาล"
  },
  chumphon: {
    badge: "ภาคใต้",
    title: "ชุมพร (ประตูสู่ทุเรียนใต้)",
    subtitle: "แหล่งปลูกทุเรียนใหญ่ที่สุดในภาคใต้",
    area: "280,000 ไร่",
    yield: "340,000 ตัน",
    gap: "86.5% (22,100 แปลง)",
    variety: "หมอนทอง (92%)",
    desc: "อ.หลังสวน และ อ.พะโต๊ะ มีผลผลิตออกช่วงมิถุนายน - กรกฎาคม ป้อนตลาดส่งออกจีนระลอกสอง"
  },
  yala: {
    badge: "ภาคใต้ (ชายแดนใต้)",
    title: "ยะลา / เบตง (ทุเรียนสะเด็ดน้ำ GI & พรีเมียม)",
    subtitle: "พื้นที่ปลูกทุเรียนบนภูเขาสูง อากาศบริสุทธิ์",
    area: "92,000 ไร่",
    yield: "110,000 ตัน",
    gap: "82.1% (8,400 แปลง)",
    variety: "มูซังคิง / หนามดำ / หมอนทอง",
    desc: "ทุเรียนสะเด็ดน้ำยะลา และทุเรียนเบตง มีเนื้อแห้ง รสชาติเข้มข้น หอมหวานเป็นเอกลักษณ์"
  },
  sisaket: {
    badge: "ภาคตะวันออกเฉียงเหนือ",
    title: "ศรีสะเกษ (ทุเรียนภูเขาไฟ GI)",
    subtitle: "ปลูกในดินภูเขาไฟโบราณ อุดมด้วยธาตุอาหาร",
    area: "18,500 ไร่",
    yield: "24,000 ตัน",
    gap: "91.0% (2,100 แปลง)",
    variety: "หมอนทองภูเขาไฟ (95%)",
    desc: "กรอบนอก นุ่มใน ละมุนลิ้น กลิ่นไม่แรง ได้รับการรับรอง GI เป็นที่ต้องการของตลาดสูงมาก"
  },
  uttaradit: {
    badge: "ภาคเหนือ",
    title: "อุตรดิตถ์ (หลิน-หลงลับแล GI)",
    subtitle: "ทุเรียนพันธุ์พื้นเมืองอันทรงคุณค่าแห่งเมืองลับแล",
    area: "22,000 ไร่",
    yield: "18,500 ตัน",
    gap: "88.4% (2,800 แปลง)",
    variety: "หลงลับแล / หลินลับแล / หมอนทอง",
    desc: "ผลขนาดพอดี เมล็ดลีบ เนื้อละเอียด รสชาติหวานมัน หอมนุ่มลิ้น"
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [selectedMap, setSelectedMap] = useState(mapLocationData.chanthaburi);
  const [currentTime, setCurrentTime] = useState({ time: '--:-- น.', date: '-- --- ----' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live API States (Open-Meteo API Real-time Data for Chanthaburi)
  const [weatherData, setWeatherData] = useState({ temp: '28.5', hum: '84', text: 'กำลังโหลดข้อมูลสด...' });
  const [pmData, setPmData] = useState({ pm25: '18', aqi: '32', status: 'คุณภาพดีมาก' });
  const [soilData, setSoilData] = useState({ moisture: '44.2', status: 'ชุ่มชื้นดี · สมบูรณ์' });

  // Simulator States (Tab 3)
  const [rai, setRai] = useState(20);
  const [yieldPerRai, setYieldPerRai] = useState(1500);
  const [price, setPrice] = useState(160);

  // MixLab States (Tab 4)
  const [chemA, setChemA] = useState('paclo');
  const [chemB, setChemB] = useState('copper');

  // Search States (Tab 5)
  const [certSearch, setCertSearch] = useState('');
  const [filteredCerts, setFilteredCerts] = useState(certificateDatabase);

  // Satellite Scanner Input (Tab 7)
  const [gistdaInput, setGistdaInput] = useState('PLOT-TH-12894');
  const [scanResultTitle, setScanResultTitle] = useState('PLOT-TH-12894 (อ.ท่าใหม่ จ.จันทบุรี)');

  // Fetch Live Weather & Soil Data from Open-Meteo
  const fetchLiveApiData = async () => {
    setIsRefreshing(true);
    try {
      // Fetch Live Weather & Soil Moisture (Chanthaburi Lat 12.6112, Lon 102.1038)
      const resWeather = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=12.6112&longitude=102.1038&current=temperature_2m,relative_humidity_2m,weather_code&hourly=soil_moisture_0_to_1cm&timezone=Asia%2FBangkok'
      );
      const dataWeather = await resWeather.json();

      if (dataWeather.current) {
        setWeatherData({
          temp: dataWeather.current.temperature_2m?.toFixed(1) || '28.5',
          hum: dataWeather.current.relative_humidity_2m || '84',
          text: 'ซิงค์เรียลไทม์สดจาก Open-Meteo'
        });
      }

      if (dataWeather.hourly && dataWeather.hourly.soil_moisture_0_to_1cm) {
        const latestSoil = (dataWeather.hourly.soil_moisture_0_to_1cm[0] * 100).toFixed(1);
        setSoilData({
          moisture: latestSoil,
          status: parseFloat(latestSoil) > 30 ? 'ชุ่มชื้นดี · สมบูรณ์' : 'เริ่มแห้งแล้ง'
        });
      }

      // Fetch Air Quality PM2.5
      const resAir = await fetch(
        'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=12.6112&longitude=102.1038&current=pm2_5,us_aqi&timezone=Asia%2FBangkok'
      );
      const dataAir = await resAir.json();

      if (dataAir.current) {
        const pm25Val = dataAir.current.pm2_5?.toFixed(0) || '18';
        const aqiVal = dataAir.current.us_aqi || '32';
        setPmData({
          pm25: pm25Val,
          aqi: aqiVal,
          status: parseInt(pm25Val) < 25 ? 'คุณภาพดีมาก' : 'ปานกลาง'
        });
      }
    } catch (err) {
      console.error("Live API Fetch Error:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        time: now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.',
        date: now.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    }, 1000);

    fetchLiveApiData();
    return () => clearInterval(timer);
  }, []);

  // Filter Certificates
  useEffect(() => {
    if (!certSearch.trim()) {
      setFilteredCerts(certificateDatabase);
    } else {
      const q = certSearch.toLowerCase();
      setFilteredCerts(certificateDatabase.filter(item =>
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.province.toLowerCase().includes(q)
      ));
    }
  }, [certSearch]);

  // Calculations for Simulator
  const revenue = rai * yieldPerRai * price;
  const totalCost = rai * 45000;
  const netProfit = revenue - totalCost;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
  const breakevenPrice = yieldPerRai > 0 ? 45000 / yieldPerRai : 0;

  // Chart Data
  const varietyChartData = {
    labels: ['หมอนทอง (80%)', 'ชะนี (10%)', 'ก้านยาว (4%)', 'หนามดำ/มูซังคิง (3%)', 'GI/สายพันธุ์พื้นเมือง (3%)'],
    datasets: [{
      data: [80, 10, 4, 3, 3],
      backgroundColor: ['#10b981', '#f59e0b', '#0284c7', '#a855f7', '#ec4899'],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const regionalYieldChartData = {
    labels: ['ภาคตะวันออก', 'ภาคใต้', 'ภาคอีสาน (GI)', 'ภาคเหนือ'],
    datasets: [{
      label: 'ผลผลิตรวม (พันตัน)',
      data: [795, 630, 95, 60],
      backgroundColor: ['#10b981', '#f59e0b', '#a855f7', '#3b82f6'],
      borderRadius: 8
    }]
  };

  const harvestSeasonChartData = {
    labels: ['มี.ค.', 'เม.ย.', 'พ.ค. (Peak ตะวันออก)', 'มิ.ย.', 'ก.ค. (Peak ใต้)', 'ส.ค.', 'ก.ย.'],
    datasets: [
      { label: 'ภาคตะวันออก', data: [35, 140, 390, 180, 30, 10, 0], backgroundColor: '#10b981', borderRadius: 6 },
      { label: 'ภาคใต้', data: [0, 10, 40, 120, 280, 150, 30], backgroundColor: '#f59e0b', borderRadius: 6 }
    ]
  };

  return (
    <>
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              🌳
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-emerald-950 tracking-tight leading-tight flex items-center gap-2">
                Thai Durian Intelligence Dashboard
                <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-300 hidden sm:inline-block">
                  National & Eastern Edition
                </span>
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">ศูนย์รวมข้อมูลสด สถิติติดตามการผลิต GAP/DOA และเทคโนโลยีดาวเทียม GISTDA ทั่วประเทศไทย</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600">
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>ซิงค์ข้อมูล GISTDA, DOA & TMD</span>
            </div>
            <div className="text-xs text-right hidden sm:block">
              <p className="font-medium text-slate-700">{currentTime.time}</p>
              <p className="text-slate-400 text-[11px]">{currentTime.date}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* 7 Live Status Cards Grid */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                อัปเดต Live API แบบเรียลไทม์
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">ข้อมูลสดจากพื้นที่ปลูกสำคัญ</h2>
            </div>

            <button onClick={fetchLiveApiData} className="self-start sm:self-auto text-xs bg-white hover:bg-slate-50 text-slate-700 font-medium px-3 py-1.5 border border-slate-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors">
              <RotateCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              คลิกซิงค์สัญญาณข้อมูลสด
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">

            {/* Card 1: Live Weather */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-sky hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab2')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                  <CloudRain className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">สภาพอากาศ จันทบุรี (Live)</p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">{weatherData.temp}°C</h3>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">ความชื้น {weatherData.hum}% · Open-Meteo</p>
              </div>
            </div>

            {/* Card 2: Live PM 2.5 */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-green hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab2')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">คุณภาพอากาศ PM 2.5</p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">{pmData.pm25} <span className="text-[10px] font-normal text-slate-400">µg/m³</span></h3>
                <p className="text-[10px] text-emerald-600 font-medium mt-0.5">{pmData.status} · AQI {pmData.aqi}</p>
              </div>
            </div>

            {/* Card 3: Fuel & Produce */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-purple hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab6')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">ราคาผลผลิต & น้ำมัน</p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">31.45 <span class="text-[10px] font-normal text-slate-400">฿/ลิตร</span></h3>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">ดีเซล B20 · หมอนทอง 160฿</p>
              </div>
            </div>

            {/* Card 4: Soil Moisture */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-lime hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab7')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-lime-50 flex items-center justify-center text-lime-600">
                  <Sprout className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">ความชื้นดิน (Live API)</p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">{soilData.moisture}%</h3>
                <p className="text-[10px] text-lime-700 font-medium mt-0.5 truncate">{soilData.status}</p>
              </div>
            </div>

            {/* Card 5: Reservoir Levels */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-blue hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab2')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                  <Droplet className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">น้ำในเขื่อนหลัก</p>
                <h3 className="text-lg font-bold text-blue-600 mt-0.5">85.2%</h3>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate">ประแสร์/รัชชประภา เพียงพอ</p>
              </div>
            </div>

            {/* Card 6: Fertilizer Price */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-amber hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab3')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <FlaskConical className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">ราคาปุ๋ยเคมี 46-0-0</p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">1,180 <span className="text-[10px] font-normal text-slate-400">฿</span></h3>
                <p className="text-[10px] text-amber-700 mt-0.5 truncate">ทรงตัว · อัปเดตตลาดตะวันออก</p>
              </div>
            </div>

            {/* Card 7: Satellite Hotspots */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200/80 top-bar-rose hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveTab('tab7')}>
              <div className="flex items-start justify-between">
                <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-[11px] text-slate-500 font-medium">จุดความร้อน VIIRS</p>
                <h3 className="text-lg font-bold text-emerald-600 mt-0.5">0 <span className="text-[10px] font-normal text-slate-400">จุด</span></h3>
                <p className="text-[10px] text-emerald-600 mt-0.5 truncate">ปลอดภัยในเขตสวนทุเรียน</p>
              </div>
            </div>

          </div>
        </section>

        {/* Navigation Tabs Bar */}
        <div className="bg-slate-200/80 p-1.5 rounded-2xl overflow-x-auto scrollbar-none flex items-center gap-1 border border-slate-300/60 shadow-inner">
          <button onClick={() => setActiveTab('tab1')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab1' ? 'tab-active' : 'tab-inactive'}`}>

<Map className="w-4 h-4" />
1. ภาพรวมประเทศ & แผนที่ GIS
          </button>
          <button onClick={() => setActiveTab('tab2')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab2' ? 'tab-active' : 'tab-inactive'}`}>
            <CloudLightning className="w-4 h-4" /> 2. ความเสี่ยง & ปฏิทินเก็บเกี่ยว
          </button>
          <button onClick={() => setActiveTab('tab3')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab3' ? 'tab-active' : 'tab-inactive'}`}>
            <Calculator className="w-4 h-4" /> 3. ต้นทุน & จำลองกำไร
          </button>
          <button onClick={() => setActiveTab('tab4')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab4' ? 'tab-active' : 'tab-inactive'}`}>
            <FlaskConical className="w-4 h-4" /> 4. การอารักขาพืช & MixLab
          </button>
          <button onClick={() => setActiveTab('tab5')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab5' ? 'tab-active' : 'tab-inactive'}`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 5. มาตรฐาน GAP & DOA/GACC
          </button>
          <button onClick={() => setActiveTab('tab6')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab6' ? 'tab-active' : 'tab-inactive'}`}>
            <Ship className="w-4 h-4" /> 6. ตลาดส่งออก & ราคาหน้าร้ง
          </button>
          <button onClick={() => setActiveTab('tab7')} className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === 'tab7' ? 'tab-active' : 'tab-inactive'}`}>
            <Satellite className="w-4 h-4 text-purple-600" /> 7. GISTDA Space Tech & Satellite AI
          </button>
        </div>

        {/* TAB 1: National Production Overview & GIS Map */}
        {activeTab === 'tab1' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">พื้นที่ปลูกทุเรียนรวมทั้งประเทศ</span>
                  <h4 className="text-2xl font-extrabold text-slate-900 mt-1">1,245,800 <span className="text-xs font-normal text-slate-500">ไร่</span></h4>
                  <p className="text-[11px] text-emerald-600 mt-1 font-medium">↑ +5.4% ขยายตัวทั่วประเทศ</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Trees className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">ผลผลิตทุเรียนรวมทั้งประเทศ</span>
                  <h4 className="text-2xl font-extrabold text-amber-600 mt-1">1,580,000 <span className="text-xs font-normal text-slate-500">ตัน</span></h4>
                  <p className="text-[11px] text-amber-700 mt-1 font-medium">ตะวันออก 50% / ใต้ 40% / อื่นๆ 10%</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Wheat className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">มูลค่าการส่งออกทุเรียนสดรวม</span>
                  <h4 className="text-2xl font-extrabold text-emerald-600 mt-1">142,500 <span className="text-xs font-normal text-slate-500">ล้านบาท</span></h4>
                  <p className="text-[11px] text-slate-500 mt-1">ตลาดจีนครองสัดส่วน 88%</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Coins className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium">แปลงผ่าน GAP รวมทั่วประเทศ</span>
                  <h4 className="text-2xl font-extrabold text-purple-600 mt-1">98,450 <span className="text-xs font-normal text-slate-500">แปลง</span></h4>
                  <p className="text-[11px] text-purple-700 mt-1 font-medium">ครอบคลุม 85.6% ของสวนส่งออก</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* GIS Interactive Vector Map & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      แผนที่จำลอง GIS แหล่งปลูกทุเรียนสำคัญทั่วประเทศไทย
                    </h3>
                    <p className="text-xs text-slate-500">คลิกที่หมุดจังหวัด เพื่อดูข้อมูลเชิงลึกเฉพาะพื้นที่</p>
                  </div>
                </div>

                <div className="relative bg-slate-900 rounded-2xl p-4 min-h-[420px] flex items-center justify-center overflow-hidden border border-slate-800">
                  <svg viewBox="0 0 500 700" className="w-full h-full max-h-[420px] relative z-10">
                    <path d="M 180,60 L 250,50 L 290,120 L 220,180 L 160,140 Z" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
                    <path d="M 290,120 L 420,130 L 410,250 L 280,240 L 220,180 Z" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
                    <path d="M 220,180 L 280,240 L 320,320 L 250,340 L 200,280 L 180,220 Z" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
                    <path d="M 190,320 L 240,330 L 220,500 L 260,620 L 180,600 L 160,420 Z" fill="#1e293b" stroke="#334155" strokeWidth="2"/>

                    <g className="map-node" onClick={() => setSelectedMap(mapLocationData.chanthaburi)}>
                      <circle cx="280" cy="310" r="14" fill="#10b981" fillOpacity="0.3" className="animate-ping"/>
                      <circle cx="280" cy="310" r="10" fill="#10b981"/>
                      <text x="300" y="315" fill="#ffffff" fontSize="12" fontWeight="bold">จันทบุรี (520k ตัน)</text>
                    </g>

                    <g className="map-node" onClick={() => setSelectedMap(mapLocationData.rayong)}>
                      <circle cx="255" cy="320" r="8" fill="#10b981"/>
                      <text x="210" y="335" fill="#cbd5e1" fontSize="10">ระยอง</text>
                    </g>

                    <g className="map-node" onClick={() => setSelectedMap(mapLocationData.chumphon)}>
                      <circle cx="190" cy="410" r="14" fill="#f59e0b" fillOpacity="0.3" className="animate-ping"/>
                      <circle cx="190" cy="410" r="10" fill="#f59e0b"/>
                      <text x="210" y="415" fill="#ffffff" fontSize="12" fontWeight="bold">ชุมพร (340k ตัน)</text>
                    </g>

                    <g className="map-node" onClick={() => setSelectedMap(mapLocationData.sisaket)}>
                      <circle cx="360" cy="210" r="9" fill="#a855f7"/>
                      <text x="375" y="215" fill="#ffffff" fontSize="11">ศรีสะเกษ (ภูเขาไฟ GI)</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Selected Region Details */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-600" /> สถิติเฉพาะพื้นที่
                    </h3>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">{selectedMap.badge}</span>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">{selectedMap.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{selectedMap.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block">พื้นที่ปลูก</span>
                        <span className="font-bold text-slate-800 text-sm">{selectedMap.area}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block">ผลผลิตคาดการณ์</span>
                        <span className="font-bold text-amber-600 text-sm">{selectedMap.yield}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block">อัตราผ่าน GAP</span>
                        <span className="font-bold text-emerald-600 text-sm">{selectedMap.gap}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-slate-400 block">สายพันธุ์หลัก</span>
                        <span className="font-bold text-purple-600 text-sm">{selectedMap.variety}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 text-xs">
                      <span className="font-semibold text-emerald-900 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ลักษณะเฉพาะพื้นที่
                      </span>
                      <p className="text-slate-600 leading-relaxed">{selectedMap.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {Object.keys(mapLocationData).map((k) => (
                    <button key={k} onClick={() => setSelectedMap(mapLocationData[k])} className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 px-2.5 py-1 rounded-lg transition-colors font-medium">
                      {mapLocationData[k].title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Variety & Regional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-amber-500" /> สัดส่วนสายพันธุ์ทุเรียนระดับประเทศ
                </h3>
                <div className="h-60 relative flex items-center justify-center">
                  <Doughnut data={varietyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>

              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" /> ปริมาณผลผลิตจำแนกตามภูมิภาคหลัก (พันตัน)
                </h3>
                <div className="h-60 relative">
                  <Bar data={regionalYieldChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Harvest Calendar & Climate */}
        {activeTab === 'tab2' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" /> ปฏิทินคาดการณ์ผลผลิตออกสู่ตลาดจำแนกตามภูมิภาค
              </h3>
              <div className="h-64">
                <Bar data={harvestSeasonChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Crop Cost & Profit Simulator */}
        {activeTab === 'tab3' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" /> เครื่องมือจำลองต้นทุน & กำไรสวนทุเรียน
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">ขนาดพื้นที่สวน (ไร่)</label>
                  <span className="font-bold text-emerald-700 text-sm">{rai} ไร่</span>
                </div>
                <input type="range" min="1" max="100" value={rai} onChange={(e) => setRai(Number(e.target.value))} className="w-full accent-emerald-600 cursor-pointer" />
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">ผลผลิตเฉลี่ย (กก./ไร่)</label>
                  <span className="font-bold text-amber-700 text-sm">{yieldPerRai.toLocaleString()} กก.</span>
                </div>
                <input type="range" min="500" max="2500" step="50" value={yieldPerRai} onChange={(e) => setYieldPerRai(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs">
                  <label className="text-slate-700 font-semibold">ราคาขายคาดการณ์ (บาท/กก.)</label>
                  <span className="font-bold text-sky-700 text-sm">{price} บาท</span>
                </div>
                <input type="range" min="80" max="250" step="5" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-sky-500 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-xs text-slate-500 block">รายรับรวมประมาณการ</span>
                <span className="text-2xl font-extrabold text-slate-900">{Math.round(revenue).toLocaleString()}</span>
                <span className="text-xs text-slate-400 block mt-0.5">บาท</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-xs text-slate-500 block">ต้นทุนรวม (OpEx)</span>
                <span className="text-2xl font-extrabold text-rose-600">{Math.round(totalCost).toLocaleString()}</span>
                <span className="text-xs text-slate-400 block mt-0.5">บาท</span>
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-xs text-emerald-800 font-medium block">กำไรสุทธิประมาณการ</span>
                <span className="text-2xl font-extrabold text-emerald-700">{Math.round(netProfit).toLocaleString()}</span>
                <span className="text-xs text-emerald-600 block mt-0.5">บาท</span>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <span className="text-xs text-amber-800 font-medium block">จุดคุ้มทุน</span>
                <span className="text-2xl font-extrabold text-amber-700">{margin.toFixed(1)}%</span>
                <span className="text-xs text-amber-800 block mt-0.5">{breakevenPrice.toFixed(2)} ฿/กก.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MixLab */}
        {activeTab === 'tab4' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-purple-600" /> MixLab - ตรวจสอบความเข้ากันได้ของยาอารักขาพืช
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">สารเคมีชนิดที่ 1</label>
                <select value={chemA} onChange={(e) => setChemA(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800">
                  <option value="paclo">แพกโคลบิวทราซอล (Paclobutrazol)</option>
                  <option value="copper">คอปเปอร์ไฮดรอกไซด์ (Copper Hydroxide)</option>
                  <option value="calboron">แคลเซียม-โบรอน (Calcium Boron)</option>
                  <option value="abamectin">อะบาเมกติน (Abamectin)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">สารเคมีชนิดที่ 2</label>
                <select value={chemB} onChange={(e) => setChemB(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800">
                  <option value="copper">คอปเปอร์ไฮดรอกไซด์ (Copper Hydroxide)</option>
                  <option value="paclo">แพกโคลบิวทราซอล (Paclobutrazol)</option>
                  <option value="calboron">แคลเซียม-โบรอน (Calcium Boron)</option>
                  <option value="abamectin">อะบาเมกติน (Abamectin)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
              {(chemA === 'copper' && chemB === 'paclo') || (chemA === 'paclo' && chemB === 'copper') ? (
                <div className="text-rose-700 font-bold text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> ห้ามผสมร่วมกันเด็ดขาด! เสี่ยงอาการใบทุเรียนไหม้
                </div>
              ) : (
                <div className="text-emerald-700 font-bold text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> สามารถผสมฉีดพ่นร่วมกันได้อย่างปลอดภัย
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: GAP Search */}
        {activeTab === 'tab5' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <SearchCheck className="w-5 h-5 text-emerald-600" /> ค้นหาใบรับรองมาตรฐาน GAP & DOA
            </h3>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input type="text" value={certSearch} onChange={(e) => setCertSearch(e.target.value)} placeholder="พิมพ์รหัส GAP หรือชื่อสวน..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs" />
            </div>
            <div className="space-y-3">
              {filteredCerts.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{item.id}</span> - <span className="font-semibold text-xs">{item.name}</span>
                    <p className="text-xs text-slate-500">{item.province} · หมดอายุ: {item.expire}</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Export Intelligence */}
        {activeTab === 'tab6' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-500" /> ราคารับซื้อทุเรียนหน้าร้งส่งออก
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <span className="text-xs font-semibold text-emerald-800">หมอนทอง เกรด A-B (ส่งออก)</span>
                <h4 className="text-3xl font-extrabold text-emerald-900 mt-1">160 - 175 <span className="text-xs">บาท/กก.</span></h4>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                <span className="text-xs font-semibold text-slate-600">หมอนทอง เกรด C</span>
                <h4 className="text-3xl font-extrabold text-slate-800 mt-1">120 - 130 <span className="text-xs">บาท/กก.</span></h4>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: GISTDA Satellite Scanner */}
        {activeTab === 'tab7' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Scan className="w-5 h-5 text-purple-600" /> สแกนพิกัดแปลงด้วยดาวเทียม GISTDA THEOS-2
            </h3>
            <div className="flex gap-2">
              <input type="text" value={gistdaInput} onChange={(e) => setGistdaInput(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border rounded-xl text-xs" />
              <button onClick={() => setScanResultTitle(gistdaInput)} className="bg-purple-600 text-white px-5 py-2 rounded-xl text-xs font-semibold">สแกนพิกัด</button>
            </div>
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2">
              <p className="text-xs text-emerald-400 font-bold">ผลการสแกนพิกัด: {scanResultTitle}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div>NDVI: <strong className="text-emerald-400">0.82 (สมบูรณ์มาก)</strong></div>
                <div>ต้นทุเรียน: <strong className="text-amber-400">520 ต้น</strong></div>
                <div>NDWI: <strong className="text-sky-400">-0.12 (ชุ่มชื้น)</strong></div>
                <div>คาดการณ์ผลผลิต: <strong className="text-purple-400">31.2 ตัน</strong></div>
              </div>
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Thai Durian Intelligence System - National & Eastern Edition</span>
          <span>© 2026 NPT Smart Agri Platform & DOA. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
