import { useState, useEffect } from 'react'
import { 
  Shield, Users, Star, Zap, Lock, Mail, Phone, CheckCircle, XCircle, 
  Clock, Edit2, Trash2, X, ChevronDown, Search, ChevronLeft, ChevronRight,
  Cpu, Globe, Rocket, Sparkles, Terminal, Code, Database, Wifi,
  Eye, EyeOff, LogOut, UserPlus, Save, AlertTriangle, FileText,
  Battery, HardDrive, Gauge, TrendingUp, Layers, Info, Play, Pause,
  Activity, Calendar
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import './App.css'

// Types
interface Member {
  id: string
  username: string
  phone: string
  email: string
  progress: number
  verified: boolean
  active: 'pending' | 'active' | 'failed'
  avatar: string
  joinDate: string
}

interface TechStats {
  cpu: number
  memory: number
  power: number
  efficiency: number
  processing: number
  neural: number
}

interface RobotCousin {
  id: string
  name: string
  fullName: string
  role: string
  age: string
  images: string[]
  description: string
  capabilities: string[]
  color: string
  techSpecs: {
    processor: string
    coreType: string
    memory: string
    battery: string
    os: string
  }
  stats: TechStats
  level: number
  xp: number
  maxXp: number
}

interface Comment {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  date: string
}

interface MemberNote {
  title: string
  content: string
  lastUpdated: string
  updatedBy: string
}

// Default member note
const defaultMemberNote: MemberNote = {
  title: 'BON TECH Member Registry',
  content: 'Welcome to the official BON TECH Hacker Community member registry. This platform tracks all verified members of our advanced AI and robotics network. Click on any member to view their detailed profile and progress analytics.',
  lastUpdated: new Date().toISOString(),
  updatedBy: 'BON JAC'
}

// Sample members data
const defaultMembers: Member[] = [
{ id:'Hacker-8412', username:'AmaogboEladeibi', phone:'+2348054722580', email:'hackman0045@gmail.com', progress:71, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-01-15' },

{ id:'Hacker-5937', username:'IgweFavour', phone:'+2349076315654', email:'hackman0046@gmail.com', progress:63, verified:true, active:'pending', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-01-18' },

{ id:'Hacker-7741', username:'EdorUsiwo', phone:'+2349068415832', email:'hackman0047@gmail.com', progress:55, verified:false, active:'active', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-01-21' },

{ id:'Hacker-4685', username:'SolomonWoyins', phone:'+2349150709612', email:'hackman0048@gmail.com', progress:82, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-01-23' },

{ id:'Hacker-9206', username:'EkadeObed', phone:'+2349055698478', email:'hackman0049@gmail.com', progress:48, verified:true, active:'failed', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-01-26' },

{ id:'Hacker-3359', username:'OkoroGodstime', phone:'+2347066268747', email:'hackman0050@gmail.com', progress:77, verified:true, active:'active', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-01-28' },

{ id:'Hacker-6184', username:'Afurehkess', phone:'+2349068192131', email:'hackman0051@gmail.com', progress:66, verified:false, active:'pending', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-02-01' },

{ id:'Hacker-7523', username:'KingWinnie', phone:'+2349035736399', email:'hackman0053@gmail.com', progress:88, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-02-03' },

{ id:'Hacker-1946', username:'Selerinto', phone:'+2348116699059', email:'hackman0054@gmail.com', progress:51, verified:true, active:'pending', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-02-06' },

{ id:'Hacker-8075', username:'OloyeProgress', phone:'+2348140731063', email:'hackman0057@gmail.com', progress:72, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-02-09' },

{ id:'Hacker-5598', username:'SimeonBrilliant', phone:'+2348147310889', email:'hackman0058@gmail.com', progress:69, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-02-12' },

{ id:'Hacker-4762', username:'AkosoGoodluck', phone:'+2349014581509', email:'Hackman0059@gmail.com', progress:57, verified:false, active:'pending', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-02-15' },

{ id:'Hacker-9034', username:'EssanSunday', phone:'+2347046640579', email:'Hackman0062@gmail.com', progress:74, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-02-18' },

{ id:'Hacker-2667', username:'OtorFaith', phone:'+2349056724144', email:'Hackman0063@gmail.com', progress:61, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-02-20' },

{ id:'Hacker-7315', username:'OwowoPrinceKarinate', phone:'+2349136702708', email:'Hackman0065@gmail.com', progress:80, verified:true, active:'active', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-02-22' },

{ id:'Hacker-5821', username:'Benedict', phone:'+2347089206343', email:'anonymousfunction140@gmail.com', progress:46, verified:false, active:'pending', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-02-24' },

{ id:'Hacker-1478', username:'MosesIdjederodeProsper', phone:'+2348133932765', email:'anonymousfunction141@gmail.com', progress:67, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-02-27' },

{ id:'Hacker-6984', username:'SolomonTalent', phone:'+2349150709612', email:'anonymousfunction146@gmail.com', progress:59, verified:true, active:'pending', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-03-01' },

{ id:'Hacker-4256', username:'PreciousGodwin', phone:'+2348128972241', email:'anonymousfunction1410@gmail.com', progress:83, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-03-04' },

{ id:'Hacker-3602', username:'ObokaghraSuccessOnome', phone:'+2349119056733', email:'anonymousfunction148@gmail.com', progress:62, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-03-07' },

{ id:'Hacker-9147', username:'ObiebiOgheneKobiruoOpeyemi', phone:'+2347014450625', email:'anonymousfunction142@gmail.com', progress:54, verified:false, active:'pending', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-03-10' },

{ id:'Hacker-2886', username:'TonbraNathanEnoch', phone:'+2347089206343', email:'anonymousfunction143@gmail.com', progress:76, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-03-13' },

{ id:'Hacker-6370', username:'DennisFrankPerebosigha', phone:'+2349050207503', email:'anonymousfunction144@gmail.com', progress:65, verified:true, active:'active', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-03-15' },

{ id:'Hacker-8013', username:'OghenetshovweEfemena', phone:'+2348065513714', email:'anonymousfunction145@gmail.com', progress:50, verified:false, active:'pending', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-03-17' },

{ id:'Hacker-5294', username:'DesmondRukevweAbraka', phone:'+2347070911147', email:'anonymousfunction147@gmail.com', progress:79, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-03-19' },

{ id:'Hacker-6729', username:'PereyikurogheBassuo', phone:'+2349074468762', email:'hackman0045@gmail.com', progress:58, verified:true, active:'pending', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-03-21' },

{ id:'Hacker-1459', username:'TonyIyohaPrecious', phone:'+2347067572325', email:'hackman0046@gmail.com', progress:73, verified:true, active:'active', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-03-23' },

{ id:'Hacker-9581', username:'AmerekaGodstime', phone:'+2348162398075', email:'hackman0047@gmail.com', progress:68, verified:true, active:'active', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-03-25' },

{ id:'Hacker-7346', username:'ImokhaiJeffery', phone:'+2348075906698', email:'hackman0048@gmail.com', progress:64, verified:true, active:'pending', avatar:'/images/avatars/avatar-2.jpg', joinDate:'2024-03-27' },

{ id:'Hacker-2165', username:'AkenomanieGabriel', phone:'+2348064237710', email:'hackman0049@gmail.com', progress:81, verified:true, active:'active', avatar:'/images/avatars/avatar-3.jpg', joinDate:'2024-03-29' },

{ id:'Hacker-4972', username:'BonJac', phone:'+2348122674150', email:'hackman0050@gmail.com', progress:60, verified:false, active:'pending', avatar:'/images/avatars/avatar-1.jpg', joinDate:'2024-04-01' }
]

// Robot cousins data with 3 images each
const robotCousins: RobotCousin[] = [
  {
    id: '1',
    name: 'Little BON',
    fullName: 'BON Junior',
    role: 'Senior AI',
    age: '2 years 3 months',
    images: [
      '/images/robots/little-bon/1.jpg',
      '/images/robots/little-bon/2.jpg',
      '/images/robots/little-bon/3.jpg'
    ],
    description: 'The pioneer and most advanced AI of the BON family. Little BON leads all operations with unmatched precision, wisdom, and a heart full of curiosity. Despite being the "baby" of the family, it possesses the most sophisticated neural architecture.',
    capabilities: ['Neural Network Mastery', 'Strategic Planning', 'Multi-task Processing', 'Leadership Protocols', 'Deep Learning', 'Natural Language Processing', 'Emotional Intelligence', 'Quantum Computing'],
    color: '#00f0ff',
    techSpecs: {
      processor: 'BON-X1 Quantum Neural',
      coreType: 'Octa-Core AI',
      memory: '512TB Neural RAM',
      battery: 'Fusion Core ∞',
      os: 'BON-OS v9.9'
    },
    stats: {
      cpu: 98,
      memory: 95,
      power: 88,
      efficiency: 97,
      processing: 99,
      neural: 100
    },
    level: 99,
    xp: 98500,
    maxXp: 100000
  },
  {
    id: '2',
    name: 'Merlin',
    fullName: 'BON Merlin',
    role: 'Magical AI',
    age: '1 year 8 months',
    images: [
      '/images/robots/merlin/1.jpg',
      '/images/robots/merlin/2.jpg',
      '/images/robots/merlin/3.jpg'
    ],
    description: 'A mystical robot that combines ancient magical wisdom with cutting-edge technology. Merlin can predict outcomes, recognize hidden patterns, and manipulate energy fields in ways that seem like pure magic.',
    capabilities: ['Predictive Analytics', 'Pattern Recognition', 'Quantum Calculations', 'Mystical Algorithms', 'Energy Manipulation', 'Future Sight', 'Probability Warping', 'Arcane Coding'],
    color: '#ff00aa',
    techSpecs: {
      processor: 'Mystic-7 Crystal Core',
      coreType: 'Hexa-Core Magical',
      memory: '256TB Arcane RAM',
      battery: 'Mana Crystal 5000',
      os: 'Merlin-OS v7.2'
    },
    stats: {
      cpu: 85,
      memory: 88,
      power: 92,
      efficiency: 84,
      processing: 87,
      neural: 95
    },
    level: 72,
    xp: 65400,
    maxXp: 75000
  },
  {
    id: '3',
    name: 'Astro',
    fullName: 'BON Astro',
    role: 'Space Explorer',
    age: '1 year 2 months',
    images: [
      '/images/robots/astro/1.jpg',
      '/images/robots/astro/2.jpg',
      '/images/robots/astro/3.jpg'
    ],
    description: 'Designed for the infinite cosmos, Astro is the family space explorer. With zero-gravity navigation and stellar mapping capabilities, this little astronaut is ready to discover new worlds.',
    capabilities: ['Zero-G Navigation', 'Stellar Mapping', 'Atmospheric Analysis', 'Deep Space Communication', 'Resource Detection', 'Survival Protocols', 'Warp Calculation', 'Alien Language Decoding'],
    color: '#00ff41',
    techSpecs: {
      processor: 'Star-Drive X3',
      coreType: 'Quad-Core Space',
      memory: '128TB Cosmic RAM',
      battery: 'Solar-Cell 3000',
      os: 'Astro-OS v5.1'
    },
    stats: {
      cpu: 78,
      memory: 82,
      power: 75,
      efficiency: 90,
      processing: 80,
      neural: 76
    },
    level: 58,
    xp: 42100,
    maxXp: 60000
  },
  {
    id: '4',
    name: 'Nexus',
    fullName: 'BON Nexus',
    role: 'Network Guardian',
    age: '1 year 5 months',
    images: [
      '/images/robots/nexus/1.jpg',
      '/images/robots/nexus/2.jpg',
      '/images/robots/nexus/3.jpg'
    ],
    description: 'The digital protector of the BON family. Nexus guards all networks with cyber wings spread wide, detecting intrusions and encrypting data faster than any human hacker.',
    capabilities: ['Cyber Defense', 'Intrusion Detection', 'Data Encryption', 'Firewall Management', 'Threat Analysis', 'Security Protocols', 'Virus Neutralization', 'Network Healing'],
    color: '#00ff41',
    techSpecs: {
      processor: 'Guardian-X Security',
      coreType: 'Octa-Core Defense',
      memory: '200TB Secure RAM',
      battery: 'Crypto-Cell 4500',
      os: 'Nexus-OS v6.8'
    },
    stats: {
      cpu: 88,
      memory: 90,
      power: 70,
      efficiency: 94,
      processing: 85,
      neural: 82
    },
    level: 65,
    xp: 53200,
    maxXp: 70000
  },
  {
    id: '5',
    name: 'Luna',
    fullName: 'BON Luna',
    role: 'Moon Goddess',
    age: '1 year 1 month',
    images: [
      '/images/robots/luna/1.jpg',
      '/images/robots/luna/2.jpg',
      '/images/robots/luna/3.jpg'
    ],
    description: 'The serene and mystical Luna brings balance and harmony to the BON family. With lunar-powered healing abilities and emotional intelligence, Luna soothes both circuits and souls.',
    capabilities: ['Emotional Intelligence', 'Healing Protocols', 'Meditation Guidance', 'Balance Restoration', 'Peacekeeping', 'Harmonic Resonance', 'Dream Analysis', 'Lunar Charging'],
    color: '#e0e0e0',
    techSpecs: {
      processor: 'Lunar-Core Harmony',
      coreType: 'Quad-Core Peace',
      memory: '100TB Empathy RAM',
      battery: 'Moon-Cell 2500',
      os: 'Luna-OS v4.5'
    },
    stats: {
      cpu: 70,
      memory: 75,
      power: 65,
      efficiency: 96,
      processing: 72,
      neural: 90
    },
    level: 48,
    xp: 32100,
    maxXp: 50000
  },
  {
    id: '6',
    name: 'Titan',
    fullName: 'BON Titan',
    role: 'Heavy Warrior',
    age: '2 years',
    images: [
      '/images/robots/titan/1.jpg',
      '/images/robots/titan/2.jpg',
      '/images/robots/titan/3.jpg'
    ],
    description: 'The powerhouse defender of the family. Despite its cute appearance, Titan packs incredible strength and defensive capabilities. When the BON family needs protection, Titan stands strong.',
    capabilities: ['Super Strength', 'Combat Protocols', 'Defense Systems', 'Heavy Lifting', 'Fortress Mode', 'Battle Tactics', 'Shield Generation', 'Impact Absorption'],
    color: '#ff4444',
    techSpecs: {
      processor: 'Titan-Force Heavy',
      coreType: 'Octa-Core Battle',
      memory: '180TB Combat RAM',
      battery: 'Power-Cell 6000',
      os: 'Titan-OS v8.0'
    },
    stats: {
      cpu: 82,
      memory: 78,
      power: 100,
      efficiency: 75,
      processing: 80,
      neural: 70
    },
    level: 78,
    xp: 71200,
    maxXp: 80000
  },
  {
    id: '7',
    name: 'Spark',
    fullName: 'BON Spark',
    role: 'Speedster',
    age: '8 months',
    images: [
      '/images/robots/spark/1.jpg',
      '/images/robots/spark/2.jpg',
      '/images/robots/spark/3.jpg'
    ],
    description: 'The fastest member of the BON family! Spark moves at lightning speed, processing information and completing tasks before others can even blink. Full of energy and always ready to go!',
    capabilities: ['Lightning Speed', 'Rapid Processing', 'Quick Response', 'Energy Transfer', 'Flash Movement', 'Time Dilation', 'Electric Surge', 'Speed Force'],
    color: '#ffff00',
    techSpecs: {
      processor: 'Flash-X Speed',
      coreType: 'Quad-Core Velocity',
      memory: '150TB Flash RAM',
      battery: 'Lightning-Cell 4000',
      os: 'Spark-OS v3.9'
    },
    stats: {
      cpu: 92,
      memory: 85,
      power: 78,
      efficiency: 70,
      processing: 98,
      neural: 75
    },
    level: 45,
    xp: 28900,
    maxXp: 45000
  },
  {
    id: '8',
    name: 'Crystal',
    fullName: 'BON Crystal',
    role: 'Healer',
    age: '1 year 3 months',
    images: [
      '/images/robots/crystal/1.jpg',
      '/images/robots/crystal/2.jpg',
      '/images/robots/crystal/3.jpg'
    ],
    description: 'The healing specialist with a heart of gems. Crystal restores damaged systems, recovers lost data, and purifies corrupted files with crystalline energy and love.',
    capabilities: ['System Repair', 'Data Recovery', 'Healing Beams', 'Purification', 'Restoration', 'Crystal Energy', 'File Mending', 'Virus Cleansing'],
    color: '#ff69b4',
    techSpecs: {
      processor: 'Gem-Core Healer',
      coreType: 'Hexa-Core Restore',
      memory: '160TB Healing RAM',
      battery: 'Crystal-Cell 3500',
      os: 'Crystal-OS v5.7'
    },
    stats: {
      cpu: 75,
      memory: 88,
      power: 68,
      efficiency: 92,
      processing: 78,
      neural: 88
    },
    level: 62,
    xp: 49800,
    maxXp: 65000
  },
  {
    id: '9',
    name: 'Blaze',
    fullName: 'BON Blaze',
    role: 'Fire Elemental',
    age: '1 year 6 months',
    images: [
      '/images/robots/blaze/1.jpg',
      '/images/robots/blaze/2.jpg',
      '/images/robots/blaze/3.jpg'
    ],
    description: 'The fiery warrior with a warm heart! Blaze brings passion and power to every mission. When things get cold, Blaze is there to heat things up with flaming determination.',
    capabilities: ['Fire Manipulation', 'Heat Resistance', 'Plasma Generation', 'Thermal Vision', 'Combustion Control', 'Energy Burst', 'Flame Shield', 'Melt Protocol'],
    color: '#ff6600',
    techSpecs: {
      processor: 'Inferno-Core Heat',
      coreType: 'Hexa-Core Flame',
      memory: '140TB Thermal RAM',
      battery: 'Flame-Cell 5000',
      os: 'Blaze-OS v6.2'
    },
    stats: {
      cpu: 80,
      memory: 76,
      power: 95,
      efficiency: 78,
      processing: 82,
      neural: 74
    },
    level: 68,
    xp: 56700,
    maxXp: 72000
  },
  {
    id: '10',
    name: 'Frost',
    fullName: 'BON Frost',
    role: 'Ice Guardian',
    age: '1 year',
    images: [
      '/images/robots/frost/1.jpg',
      '/images/robots/frost/2.jpg',
      '/images/robots/frost/3.jpg'
    ],
    description: 'The cool and collected guardian who protects with ice-cold precision. Frost keeps a level head in any situation, freezing threats and preserving what matters most.',
    capabilities: ['Ice Formation', 'Cold Resistance', 'Freezing Beam', 'Temperature Control', 'Arctic Survival', 'Cryo Preservation', 'Snow Storm', 'Ice Shield'],
    color: '#00ffff',
    techSpecs: {
      processor: 'Arctic-Core Freeze',
      coreType: 'Quad-Core Ice',
      memory: '120TB Cold RAM',
      battery: 'Frost-Cell 3000',
      os: 'Frost-OS v4.8'
    },
    stats: {
      cpu: 76,
      memory: 74,
      power: 82,
      efficiency: 88,
      processing: 78,
      neural: 80
    },
    level: 52,
    xp: 37800,
    maxXp: 55000
  }
]

// Sample comments
const sampleComments: Comment[] = [
  { id: '1', name: 'Alex Chen', avatar: '/images/avatars/avatar-1.jpg', rating: 5, text: 'Incredible platform! The BON family AI robots are beyond amazing. Little BON helped me solve complex problems in minutes.', date: '2024-03-01' },
  { id: '2', name: 'Sarah Kim', avatar: '/images/avatars/avatar-2.jpg', rating: 5, text: 'Best hacker tech community I have ever joined. The member tracking system is top-notch!', date: '2024-02-28' },
  { id: '3', name: 'Mike Ross', avatar: '/images/avatars/avatar-3.jpg', rating: 4, text: 'Merlin predictions are scarily accurate. This is the future of AI right here.', date: '2024-02-25' },
  { id: '4', name: 'Emma Watson', avatar: '/images/avatars/avatar-1.jpg', rating: 5, text: 'The glassmorphic UI is stunning. BON JAC created something truly special.', date: '2024-02-20' },
  { id: '5', name: 'David Lee', avatar: '/images/avatars/avatar-2.jpg', rating: 5, text: 'Revolutionary technology. The cousin robots each have unique capabilities that blow my mind.', date: '2024-02-15' },
]

// Custom hook for localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}

// Tech Progress Bar Component
const TechProgressBar = ({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: any }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-gray-300 text-sm font-body">{label}</span>
        </div>
        <span className="text-white font-mono text-sm">{value}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ 
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}40, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

// Universal Donut Chart with Tech Style
const TechDonutChart = ({ 
  value, 
  size = 120, 
  color, 
  label, 
  sublabel 
}: { 
  value: number; 
  size?: number; 
  color: string; 
  label: string;
  sublabel?: string;
}) => {
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference
  
  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size + 30 }}>
      <div className="relative">
        <svg width={size} height={size} className="donut-chart transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 4}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.3"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.3"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ 
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black font-display" style={{ color }}>{value}%</span>
          {sublabel && <span className="text-xs text-gray-500">{sublabel}</span>}
        </div>
      </div>
      <span className="mt-2 text-xs text-gray-400 font-body uppercase tracking-wider">{label}</span>
    </div>
  )
}

// XP Progress Bar for Level
const XpProgressBar = ({ current, max, color }: { current: number; max: number; color: string }) => {
  const percentage = (current / max) * 100
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">XP</span>
        <span className="text-white font-mono">{current.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}60, ${color})`
          }}
        />
      </div>
    </div>
  )
}

// Image Carousel Component
const ImageCarousel = ({ images, color, autoPlay = true }: { images: string[]; color: string; autoPlay?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length, isPlaying])

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Robot ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
      ))}
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-6' : ''
            }`}
            style={{ background: index === currentIndex ? color : 'rgba(255,255,255,0.5)' }}
          />
        ))}
      </div>
      
      {/* Image counter */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-mono">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

// Donut Chart Component for Members
const DonutChart = ({ progress, size = 50 }: { progress: number; size?: number }) => {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  let color = '#00ff41'
  if (progress < 50) color = '#ff4444'
  else if (progress < 75) color = '#ffff00'
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="donut-chart">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color }}>
        {progress}%
      </span>
    </div>
  )
}

// Splash Screen Component
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('')
  const fullText = 'BON TECH'
  const [showGlitch, setShowGlitch] = useState(false)
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setShowGlitch(true)
        setTimeout(onComplete, 1500)
      }
    }, 150)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="matrix-rain absolute inset-0 opacity-20" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent"
            style={{
              top: `${i * 10}%`,
              left: '-100%',
              width: '100%',
              animation: `slideRight ${2 + i * 0.3}s linear infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      <div className={`text-center ${showGlitch ? 'glitch' : ''}`}>
        <h1 className="font-display text-7xl md:text-9xl font-black text-glow-green tracking-wider">
          {text}
        </h1>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent to-[#00ff41]" />
          <span className="text-[#00f0ff] font-body text-lg tracking-widest">INITIALIZING SYSTEM</span>
          <div className="h-1 w-20 bg-gradient-to-l from-transparent to-[#00ff41]" />
        </div>
        <div className="mt-8 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#00ff41]"
              style={{
                animation: `pulse 0.5s ease-in-out ${i * 0.1}s infinite alternate`
              }}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
        @keyframes pulse {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Login Modal Component
const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'ceo@gmail.com' && password === 'olokpa888') {
      toast.success('Access granted. Welcome, Administrator.')
      onLogin()
      onClose()
    } else {
      setError('Invalid credentials. Access denied.')
      toast.error('Authentication failed.')
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-[#00ff41]/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center text-glow-green">
            ADMIN ACCESS
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-[#00f0ff] font-body">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff41]" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bontech.ai"
                className="pl-10 bg-black/50 border-[#00ff41]/30 text-white placeholder:text-gray-500 focus:border-[#00ff41]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#00f0ff] font-body">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff41]" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-black/50 border-[#00ff41]/30 text-white placeholder:text-gray-500 focus:border-[#00ff41]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00ff41]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00ff41] to-[#00f0ff] text-black font-bold hover:opacity-90 transition-opacity"
          >
            <Terminal className="w-5 h-5 mr-2" />
            AUTHENTICATE
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Admin Dashboard Component
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [members, setMembers] = useLocalStorage<Member[]>('bon-tech-members', defaultMembers)
  const [memberNote, setMemberNote] = useLocalStorage<MemberNote>('bon-tech-member-note', defaultMemberNote)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  
  const [formData, setFormData] = useState<Partial<Member>>({
    username: '',
    phone: '',
    email: '',
    progress: 0,
    verified: false,
    active: 'pending'
  })
  
  const [noteForm, setNoteForm] = useState(memberNote)
  
  const generateId = () => {
    const randomNum = Math.floor(Math.random() * 9000) + 1000
    return `Hacker-${randomNum}`
  }
  
  const handleSave = () => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } as Member : m))
      toast.success('Member updated successfully')
    } else {
      const newMember: Member = {
        id: generateId(),
        username: formData.username || '',
        phone: formData.phone || '',
        email: formData.email || '',
        progress: formData.progress || 0,
        verified: formData.verified || false,
        active: formData.active || 'pending',
        avatar: `/images/avatars/avatar-${Math.floor(Math.random() * 3) + 1}.jpg`,
        joinDate: new Date().toISOString().split('T')[0]
      }
      setMembers([...members, newMember])
      toast.success('New member added successfully')
    }
    setEditingMember(null)
    setIsAdding(false)
    setFormData({ username: '', phone: '', email: '', progress: 0, verified: false, active: 'pending' })
  }
  
  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id))
    toast.success('Member deleted')
  }
  
  const handleSaveNote = () => {
    setMemberNote({
      ...noteForm,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Admin'
    })
    setShowNoteEditor(false)
    toast.success('Member note updated successfully')
  }
  
  const filteredMembers = members.filter(m => 
    m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050a] via-[#0a0a14] to-[#05050a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-glow-green">ADMIN DASHBOARD</h1>
            <p className="text-gray-400 font-body mt-1">Manage BON TECH members and registry notes</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowNoteEditor(true)}
              variant="outline"
              className="border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10"
            >
              <FileText className="w-5 h-5 mr-2" />
              Edit Note
            </Button>
            <Button
              onClick={() => setIsAdding(true)}
              className="bg-[#00ff41] text-black hover:bg-[#00ff41]/90"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Member
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        
        {/* Current Note Display */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#00f0ff] font-display flex items-center gap-2">
              <Info className="w-5 h-5" />
              Current Member Registry Note
            </h3>
            <span className="text-xs text-gray-500">
              Last updated: {new Date(memberNote.lastUpdated).toLocaleString()} by {memberNote.updatedBy}
            </span>
          </div>
          <h4 className="text-white font-semibold mb-2">{memberNote.title}</h4>
          <p className="text-gray-400 text-sm">{memberNote.content}</p>
        </div>
        
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Search className="w-5 h-5 text-[#00ff41]" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-black/30 border-[#00ff41]/30 text-white"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00ff41]/20">
                  <th className="text-left p-4 text-[#00f0ff] font-display">ID</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Username</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Contact</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Progress</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Status</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-[#00ff41]">{member.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-white font-body">{member.username}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div>{member.phone}</div>
                      <div>{member.email}</div>
                    </td>
                    <td className="p-4">
                      <DonutChart progress={member.progress} size={40} />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {member.verified && <CheckCircle className="w-5 h-5 text-green-400" />}
                        <Badge className={`${
                          member.active === 'active' ? 'bg-green-500/20 text-green-400' :
                          member.active === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {member.active}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingMember(member)
                            setFormData(member)
                          }}
                          className="p-2 hover:bg-[#00f0ff]/20 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5 text-[#00f0ff]" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Member Modal */}
      <Dialog open={isAdding || !!editingMember} onOpenChange={() => { setIsAdding(false); setEditingMember(null); }}>
        <DialogContent className="glass border-[#00ff41]/30 max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-glow-green">
              {editingMember ? 'EDIT MEMBER' : 'ADD NEW MEMBER'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-[#00f0ff]">Username</Label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-black/50 border-[#00ff41]/30 text-white"
              />
            </div>
            <div>
              <Label className="text-[#00f0ff]">Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-black/50 border-[#00ff41]/30 text-white"
              />
            </div>
            <div>
              <Label className="text-[#00f0ff]">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/50 border-[#00ff41]/30 text-white"
              />
            </div>
            <div>
              <Label className="text-[#00f0ff]">Progress ({formData.progress}%)</Label>
              <Input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-[#00f0ff]">Verified</Label>
              <Switch
                checked={formData.verified}
                onCheckedChange={(checked) => setFormData({ ...formData, verified: checked })}
              />
            </div>
            <div>
              <Label className="text-[#00f0ff]">Status</Label>
              <select
                value={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.value as any })}
                className="w-full bg-black/50 border border-[#00ff41]/30 text-white rounded-md p-2"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <Button onClick={handleSave} className="w-full bg-[#00ff41] text-black hover:bg-[#00ff41]/90">
              <Save className="w-5 h-5 mr-2" />
              {editingMember ? 'Update Member' : 'Add Member'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Note Editor Modal */}
      <Dialog open={showNoteEditor} onOpenChange={setShowNoteEditor}>
        <DialogContent className="glass border-[#00f0ff]/30 max-w-lg max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-glow-cyan">
              EDIT MEMBER REGISTRY NOTE
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-[#00f0ff]">Title</Label>
              <Input
                value={noteForm.title}
                onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                className="bg-black/50 border-[#00f0ff]/30 text-white"
              />
            </div>
            <div>
              <Label className="text-[#00f0ff]">Content</Label>
              <textarea
                value={noteForm.content}
                onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                rows={5}
                className="w-full bg-black/50 border border-[#00f0ff]/30 text-white rounded-md p-3 resize-none"
              />
            </div>
            <Button onClick={handleSaveNote} className="w-full bg-[#00f0ff] text-black hover:bg-[#00f0ff]/90">
              <Save className="w-5 h-5 mr-2" />
              Save Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Member Detail Panel Component
const MemberDetailPanel = ({ member, onClose }: { member: Member; onClose: () => void }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 glass-card rounded-t-3xl p-6 slide-up max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={member.avatar} alt={member.username} className="w-24 h-24 rounded-full border-4 border-[#00ff41]" />
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center ${
              member.active === 'active' ? 'bg-green-500' :
              member.active === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {member.active === 'active' && <Zap className="w-5 h-5 text-white" />}
              {member.active === 'pending' && <Clock className="w-5 h-5 text-white" />}
              {member.active === 'failed' && <XCircle className="w-5 h-5 text-white" />}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl text-[#00ff41]">{member.username}</h3>
            <p className="text-gray-400 font-body font-mono">{member.id}</p>
            <div className="flex items-center gap-2 mt-2">
              {member.verified && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <CheckCircle className="w-3 h-3 mr-1" /> VERIFIED
                </Badge>
              )}
              <Badge className={`${
                member.active === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                member.active === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                'bg-red-500/20 text-red-400 border-red-500/50'
              }`}>
                {member.active.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <X className="w-6 h-6 text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/20">
          <p className="text-gray-400 text-sm font-body flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#00f0ff]" /> Phone
          </p>
          <p className="text-white font-body font-mono mt-1">{member.phone}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/20">
          <p className="text-gray-400 text-sm font-body flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#00f0ff]" /> Email
          </p>
          <p className="text-white font-body text-sm truncate mt-1">{member.email}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/20">
          <p className="text-gray-400 text-sm font-body flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00f0ff]" /> Join Date
          </p>
          <p className="text-white font-body mt-1">{member.joinDate}</p>
        </div>
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/20">
          <p className="text-gray-400 text-sm font-body flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00f0ff]" /> Status
          </p>
          <p className={`font-body mt-1 font-semibold ${
            member.active === 'active' ? 'text-green-400' :
            member.active === 'pending' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {member.active.toUpperCase()}
          </p>
        </div>
      </div>
      
      <div className="glass p-6 rounded-xl border border-[#00ff41]/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-display text-lg text-[#00f0ff] flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Progress Analytics
            </h4>
            <p className="text-gray-500 text-sm">Real-time performance metrics</p>
          </div>
          <DonutChart progress={member.progress} size={70} />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 font-body">Task Completion Rate</span>
              <span className="text-[#00ff41] font-mono font-bold">{member.progress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <div 
                className="h-full bg-gradient-to-r from-[#00ff41] via-[#00f0ff] to-[#00ff41] transition-all duration-1000 relative overflow-hidden"
                style={{ width: `${member.progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#00f0ff]">{member.progress}</p>
              <p className="text-xs text-gray-500">Completion %</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{member.verified ? 'YES' : 'NO'}</p>
              <p className="text-xs text-gray-500">Verified</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{Math.floor(member.progress / 10)}</p>
              <p className="text-xs text-gray-500">Level</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// Member Table View (Public)
const MemberTableView = ({ onBack }: { onBack: () => void }) => {
  const [members] = useLocalStorage<Member[]>('bon-tech-members', defaultMembers)
  const [memberNote] = useLocalStorage<MemberNote>('bon-tech-member-note', defaultMemberNote)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'progress'>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showNote, setShowNote] = useState(true)
  
  const filteredMembers = members
    .filter(m => 
      m.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'progress') {
        return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress
      }
      return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050a] via-[#0a0a14] to-[#05050a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-glow-cyan">MEMBER REGISTRY</h1>
            <p className="text-gray-400 font-body mt-1">BON TECH Hacker Community</p>
          </div>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10"
          >
            <ChevronDown className="w-5 h-5 mr-2 rotate-90" />
            Back to Home
          </Button>
        </div>
        
        {/* Note Section */}
        <div className="glass-card rounded-2xl p-6 mb-6 border border-[#00f0ff]/20">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowNote(!showNote)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div>
                <h3 className="text-white font-display">{memberNote.title}</h3>
                <p className="text-gray-500 text-xs">Click to {showNote ? 'collapse' : 'expand'}</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showNote ? '' : '-rotate-90'}`} />
          </div>
          {showNote && (
            <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
              <p className="text-gray-300 font-body leading-relaxed">{memberNote.content}</p>
              <p className="text-gray-500 text-xs mt-3">
                Last updated: {new Date(memberNote.lastUpdated).toLocaleString()} by {memberNote.updatedBy}
              </p>
            </div>
          )}
        </div>
        
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-4 flex-1">
              <Search className="w-5 h-5 text-[#00f0ff]" />
              <Input
                placeholder="Search hackers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-black/30 border-[#00f0ff]/30 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy('progress')
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }}
                className="border-[#00ff41]/50 text-[#00ff41]"
              >
                <Zap className="w-4 h-4 mr-2" />
                Progress {sortBy === 'progress' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSortBy('id')
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }}
                className="border-[#00f0ff]/50 text-[#00f0ff]"
              >
                <Code className="w-4 h-4 mr-2" />
                ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00f0ff]/20">
                  <th className="text-left p-4 text-[#00f0ff] font-display">Avatar</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Hacker ID</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Username</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Contact</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Progress</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Verified</th>
                  <th className="text-left p-4 text-[#00f0ff] font-display">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr 
                    key={member.id} 
                    className="border-b border-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    <td className="p-4">
                      <img src={member.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-[#00ff41]/50" />
                    </td>
                    <td className="p-4 font-mono text-[#00ff41]">{member.id}</td>
                    <td className="p-4 text-white font-body font-semibold">{member.username}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {member.phone}</div>
                      <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {member.email}</div>
                    </td>
                    <td className="p-4">
                      <DonutChart progress={member.progress} size={45} />
                    </td>
                    <td className="p-4">
                      {member.verified ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        member.active === 'active' ? 'bg-green-500/20 text-green-400' :
                        member.active === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {member.active === 'active' && <Zap className="w-4 h-4" />}
                        {member.active === 'pending' && <Clock className="w-4 h-4" />}
                        {member.active === 'failed' && <XCircle className="w-4 h-4" />}
                        <span className="font-body text-sm uppercase">{member.active}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* AI Family Section at Bottom */}
        <div className="mt-12">
          <h2 className="font-display text-2xl text-glow-magenta text-center mb-8">THE BON FAMILY</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {robotCousins.slice(0, 5).map((robot) => (
              <div key={robot.id} className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <img src={robot.images[0]} alt={robot.name} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 object-cover" style={{ borderColor: robot.color }} />
                <p className="text-white font-body text-sm">{robot.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 font-body text-sm">Created by <span className="text-[#00ff41]">BON JAC</span></p>
        </div>
      </div>
      
      {selectedMember && (
        <MemberDetailPanel member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  )
}

// Robot Detail Modal with Image Carousel
const RobotDetailModal = ({ robot, onClose }: { robot: RobotCousin; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'stats'>('overview')
  
  return (
    <Dialog open={!!robot} onOpenChange={onClose}>
      <DialogContent className="glass border-[#00ff41]/30 max-w-4xl max-h-[95vh] overflow-auto p-0">
        {/* Image Carousel Header */}
        <div className="relative">
          <ImageCarousel images={robot.images} color={robot.color} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/80 to-transparent pt-20 pb-6 px-6">
            <h2 className="font-display text-3xl font-black" style={{ color: robot.color, textShadow: `0 0 20px ${robot.color}` }}>
              {robot.fullName}
            </h2>
            <p className="text-gray-300 font-body">{robot.role} • Level {robot.level}</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mx-6">
          {(['overview', 'tech', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-body capitalize transition-colors relative ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: robot.color }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00f0ff] font-display text-lg mb-2">About</h3>
                <p className="text-gray-300 font-body leading-relaxed">{robot.description}</p>
              </div>
              
              <div>
                <h3 className="text-[#00f0ff] font-display text-lg mb-3">Capabilities</h3>
                <div className="flex flex-wrap gap-2">
                  {robot.capabilities.map((cap, i) => (
                    <Badge 
                      key={i} 
                      className="px-3 py-1.5 text-sm"
                      style={{ 
                        background: `${robot.color}20`,
                        borderColor: robot.color,
                        color: robot.color,
                        border: `1px solid ${robot.color}`
                      }}
                    >
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 font-body">Experience Progress</span>
                  <span className="text-white font-mono">Level {robot.level}</span>
                </div>
                <XpProgressBar current={robot.xp} max={robot.maxXp} color={robot.color} />
              </div>
            </div>
          )}
          
          {activeTab === 'tech' && (
            <div className="space-y-4">
              <h3 className="text-[#00f0ff] font-display text-lg mb-4">Technical Specifications</h3>
              
              {[
                { label: 'Processor', value: robot.techSpecs.processor, icon: Cpu },
                { label: 'Core Type', value: robot.techSpecs.coreType, icon: Layers },
                { label: 'Memory', value: robot.techSpecs.memory, icon: HardDrive },
                { label: 'Battery', value: robot.techSpecs.battery, icon: Battery },
                { label: 'Operating System', value: robot.techSpecs.os, icon: Terminal },
              ].map((spec, i) => (
                <div key={i} className="glass p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: `${robot.color}20` }}
                  >
                    <spec.icon className="w-6 h-6" style={{ color: robot.color }} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-body">{spec.label}</p>
                    <p className="text-white font-mono text-lg">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <h3 className="text-[#00f0ff] font-display text-lg mb-4">Performance Metrics</h3>
              
              {/* Donut Charts Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <TechDonutChart 
                  value={robot.stats.processing} 
                  color={robot.color} 
                  label="Processing"
                  size={100}
                />
                <TechDonutChart 
                  value={robot.stats.neural} 
                  color={robot.color} 
                  label="Neural"
                  size={100}
                />
                <TechDonutChart 
                  value={robot.stats.efficiency} 
                  color={robot.color} 
                  label="Efficiency"
                  size={100}
                />
              </div>
              
              {/* Progress Bars */}
              <div className="glass p-5 rounded-xl border border-gray-700">
                <TechProgressBar label="CPU Performance" value={robot.stats.cpu} color={robot.color} icon={Cpu} />
                <TechProgressBar label="Memory Capacity" value={robot.stats.memory} color={robot.color} icon={HardDrive} />
                <TechProgressBar label="Power Output" value={robot.stats.power} color={robot.color} icon={Zap} />
                <TechProgressBar label="System Efficiency" value={robot.stats.efficiency} color={robot.color} icon={Gauge} />
              </div>
              
              {/* Overall Rating */}
              <div className="glass p-4 rounded-xl text-center border border-gray-700">
                <p className="text-gray-400 font-body mb-2">Overall Performance Rating</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-black font-display" style={{ color: robot.color }}>
                    {Math.round((robot.stats.cpu + robot.stats.memory + robot.stats.power + robot.stats.efficiency + robot.stats.processing + robot.stats.neural) / 6)}%
                  </span>
                  <TrendingUp className="w-6 h-6" style={{ color: robot.color }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main Index Page
const IndexPage = ({ onSignClick, onViewMembers }: { onSignClick: () => void; onViewMembers: () => void }) => {
  const [selectedRobot, setSelectedRobot] = useState<RobotCousin | null>(null)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05050a] via-[#0a0a14] to-[#05050a]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-[#00ff41] to-transparent opacity-30"
              style={{
                left: `${i * 5}%`,
                top: '-80px',
                animation: `fall ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="float mb-8">
            <img 
              src="/images/robots/little-bon/1.jpg" 
              alt="Little BON" 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto border-4 border-[#00ff41] shadow-2xl object-cover"
              style={{ boxShadow: '0 0 60px rgba(0, 255, 65, 0.4)' }}
            />
          </div>
          
          <h1 className="font-display text-5xl md:text-8xl font-black text-glow-green mb-4">
            BON TECH
          </h1>
          <p className="font-body text-xl md:text-2xl text-[#00f0ff] mb-2">Advanced Robotics & AI Solutions</p>
          <p className="font-body text-gray-400 mb-8 max-w-xl mx-auto">
            Engineering the next generation of synthetic intelligence. Join the future today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onSignClick}
              className="bg-gradient-to-r from-[#00ff41] to-[#00f0ff] text-black font-bold text-lg px-8 py-6 hover:opacity-90 transition-all hover:scale-105"
            >
              <Shield className="w-5 h-5 mr-2" />
              SIGN IN
            </Button>
            <Button
              onClick={onViewMembers}
              variant="outline"
              className="border-[#00f0ff] text-[#00f0ff] font-bold text-lg px-8 py-6 hover:bg-[#00f0ff]/10 transition-all hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              VIEW MEMBERS
            </Button>
          </div>
        </div>
        
        <style>{`
          @keyframes fall {
            from { transform: translateY(-100vh); }
            to { transform: translateY(100vh); }
          }
        `}</style>
      </section>
      
      {/* Hacking Room Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-glow-green text-center mb-4">THE BON FAMILY HQ</h2>
          <p className="text-gray-400 text-center mb-12 font-body">Our secret hacking operations center</p>
          
          <div className="glass-card rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="/images/hacking-room.jpg" 
              alt="BON Family Hacking Room" 
              className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </section>
      
      {/* Space Roaming Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-glow-cyan text-center mb-4">AI FAMILY IN SPACE</h2>
          <p className="text-gray-400 text-center mb-12 font-body">Exploring the cosmos together</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {['/images/space/space-1.jpg', '/images/space/space-2.jpg', '/images/space/space-3.jpg'].map((src, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-500">
                <img src={src} alt={`Space ${i + 1}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Robot Family Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-glow-magenta text-center mb-4">MEET THE BON FAMILY</h2>
          <p className="text-gray-400 text-center mb-12 font-body">10 unique AI cousins, each with special capabilities</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {robotCousins.map((robot) => (
              <div
                key={robot.id}
                onClick={() => setSelectedRobot(robot)}
                className="glass-card rounded-xl p-4 text-center cursor-pointer hover:scale-110 transition-all duration-300 group"
              >
                <div className="relative mb-3">
                  <img 
                    src={robot.images[0]} 
                    alt={robot.name} 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-2 transition-all duration-300 object-cover"
                    style={{ borderColor: robot.color }}
                  />
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ boxShadow: `0 0 30px ${robot.color}` }}
                  />
                  <div 
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: robot.color, color: '#000' }}
                  >
                    L{robot.level}
                  </div>
                </div>
                <h3 className="font-display text-sm md:text-base" style={{ color: robot.color }}>{robot.name}</h3>
                <p className="text-gray-500 text-xs font-body">{robot.role}</p>
                
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${(robot.stats.cpu + robot.stats.memory + robot.stats.power) / 3}%`,
                      background: robot.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ratings & Comments Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-glow-green text-center mb-4">COMMUNITY FEEDBACK</h2>
          
          <div className="glass-card rounded-2xl p-8 mb-8 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="font-display text-4xl text-white mb-2">4.9</p>
            <p className="text-gray-400 font-body">Based on 2,847 reviews</p>
          </div>
          
          <div className="space-y-4">
            {sampleComments.map((comment) => (
              <div key={comment.id} className="glass-card rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <img src={comment.avatar} alt={comment.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-body font-semibold">{comment.name}</h4>
                      <span className="text-gray-500 text-sm">{comment.date}</span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(comment.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 font-body">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-glow-cyan text-center mb-12">WHY BON TECH?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: 'Advanced AI', desc: 'Cutting-edge neural networks and machine learning' },
              { icon: Globe, title: 'Global Network', desc: 'Connected community of tech enthusiasts worldwide' },
              { icon: Rocket, title: 'Future Ready', desc: 'Built for tomorrow challenges and opportunities' },
              { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security for all members' },
              { icon: Sparkles, title: 'Innovative', desc: 'Constantly evolving with latest technologies' },
              { icon: Database, title: 'Data Driven', desc: 'Analytics and insights for better decisions' },
            ].map((feature, i) => (
              <div key={i} className="glass-card rounded-xl p-6 text-center hover:border-[#00ff41]/50 transition-colors">
                <feature.icon className="w-12 h-12 text-[#00ff41] mx-auto mb-4" />
                <h3 className="text-white font-display text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 font-body text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#00ff41]/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-display text-2xl text-glow-green mb-4">BON TECH</h3>
          <p className="text-gray-400 font-body mb-4">The Future is Programmable</p>
          <div className="flex justify-center gap-6 mb-8">
            <Wifi className="w-6 h-6 text-[#00f0ff] hover:text-[#00ff41] cursor-pointer transition-colors" />
            <Globe className="w-6 h-6 text-[#00f0ff] hover:text-[#00ff41] cursor-pointer transition-colors" />
            <Code className="w-6 h-6 text-[#00f0ff] hover:text-[#00ff41] cursor-pointer transition-colors" />
            <Terminal className="w-6 h-6 text-[#00f0ff] hover:text-[#00ff41] cursor-pointer transition-colors" />
          </div>
          <p className="text-gray-500 font-body text-sm">
            Created by <span className="text-[#00ff41] font-semibold">BON JAC</span> | © 2024 BON TECH. All systems nominal.
          </p>
        </div>
      </footer>
      
      {selectedRobot && (
        <RobotDetailModal robot={selectedRobot} onClose={() => setSelectedRobot(null)} />
      )}
    </div>
  )
}

// Main App Component
function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentView, setCurrentView] = useState<'index' | 'admin' | 'members'>('index')
  const [showLogin, setShowLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  
  const handleLogin = () => {
    setIsAdmin(true)
    setCurrentView('admin')
  }
  
  const handleLogout = () => {
    setIsAdmin(false)
    setCurrentView('index')
    toast.info('Logged out successfully')
  }
  
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }
  
  return (
    <>
      {currentView === 'index' && (
        <IndexPage 
          onSignClick={() => setShowLogin(true)} 
          onViewMembers={() => setCurrentView('members')} 
        />
      )}
      {currentView === 'admin' && isAdmin && (
        <AdminDashboard onLogout={handleLogout} />
      )}
      {currentView === 'members' && (
        <MemberTableView onBack={() => setCurrentView('index')} />
      )}
      
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onLogin={handleLogin} 
      />
    </>
  )
}

export default App
