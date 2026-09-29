export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export interface PhysioReferenceCase {
  id: string;
  title: { ar: string; en: string };
  category: { ar: string; en: string };
  image: string;
  condition: { ar: string; en: string };
  focusJoint: string;
  samplePrompt: { ar: string; en: string };
}

export interface BiomechanicalAngle {
  joint: string;
  measuredAngle: string;
  targetAngle: string;
  status: 'optimal' | 'warning' | 'restricted';
  clinicalNote: string;
}

export interface PhysioAnalysisResult {
  assessmentTitle: { ar: string; en: string };
  primaryCondition: { ar: string; en: string };
  riskLevel: 'low' | 'moderate' | 'high';
  symmetryScore: number;
  biomechanicalAngles: BiomechanicalAngle[];
  clinicalObservations: { ar: string; en: string }[];
  correctiveDrills: {
    name: { ar: string; en: string };
    setsReps: string;
    description: { ar: string; en: string };
    cautionNote?: { ar: string; en: string };
  }[];
  athleticImpact: { ar: string; en: string };
}

export interface ProjectItem {
  id: string;
  number: string;
  title: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  tags: string[];
  image: string;
  category: 'medical_ai' | 'physical_therapy' | 'sports_tech';
  metrics?: {
    label: { ar: string; en: string };
    value: string;
  }[];
  details: {
    problem: { ar: string; en: string };
    solution: { ar: string; en: string };
    impact: { ar: string; en: string };
    techStack: string[];
  };
}

export interface ProcessStep {
  number: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
}

export interface ToolItem {
  name: string;
  category: string;
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  quote: { ar: string; en: string };
  name: string;
  role: { ar: string; en: string };
  avatar: string;
}

export interface SavedPatientScan {
  id: string;
  patientName: string;
  date: string;
  focusArea: string;
  painLevel: number;
  imageThumbnail: string;
  result: PhysioAnalysisResult;
  createdAt?: string;
}

export interface PhysioConsultDrill {
  name: string;
  setsReps: string;
  cue: string;
}

export interface PhysioConsultResponse {
  answer: string;
  drills: PhysioConsultDrill[];
  caution: string;
  athleticNote: string;
}

export interface BackendHealthStatus {
  status: string;
  timestamp: string;
  aiReady: boolean;
  model: string;
  patientScansCount: number;
  messagesCount: number;
  hegazyNotesCount: number;
  uptime?: number;
  memoryUsageMB?: number;
  environment?: string;
}

export interface RehabPlanPhase {
  phase: number;
  title: { ar: string; en: string };
  focus: { ar: string; en: string };
  drills: {
    name: string;
    setsReps: string;
    instructions: string;
  }[];
}

export interface RehabPlan {
  programTitle: { ar: string; en: string };
  durationWeeks: number;
  focusArea: string;
  weeklyFrequency: string;
  objective: { ar: string; en: string };
  phases: RehabPlanPhase[];
  recoveryGuidelines: { ar: string; en: string };
}
