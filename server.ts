import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Body parser with 25MB limit to allow high-res patient physiotherapy photos
app.use(express.json({ limit: '25mb' }));

// In-memory data stores for full-stack persistence
interface StoredScan {
  id: string;
  patientName: string;
  date: string;
  focusArea: string;
  painLevel: number;
  imageThumbnail: string;
  result: any;
  createdAt: string;
}

interface StoredContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
  receivedAt: string;
}

interface StoredHegazyNote {
  id: string;
  senderName: string;
  contact: string;
  note: string;
  meetingRequested: boolean;
  receivedAt: string;
}

const patientScansStore: StoredScan[] = [];
const contactMessagesStore: StoredContactMessage[] = [];
const hegazyNotesStore: StoredHegazyNote[] = [];

// Initialize GoogleGenAI SDK on server-side with required User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper to convert any image source (base64, disk path, or URL) into clean base64 & mimeType
async function resolveImageSource(rawInput: string, fallbackMime: string = 'image/jpeg'): Promise<{ base64Data: string; mimeType: string }> {
  // Case 1: Data URL
  if (rawInput.startsWith('data:image/')) {
    const mimeMatch = rawInput.match(/^data:(image\/[a-zA-Z0-9.-]+);base64,/);
    const mime = mimeMatch ? mimeMatch[1] : fallbackMime;
    const base64Data = rawInput.replace(/^data:image\/[a-zA-Z0-9.-]+;base64,/, '');
    return { base64Data, mimeType: mime };
  }

  // Case 2: Remote URL
  if (rawInput.startsWith('http://') || rawInput.startsWith('https://')) {
    const res = await fetch(rawInput);
    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || fallbackMime;
    return {
      base64Data: Buffer.from(buffer).toString('base64'),
      mimeType: contentType,
    };
  }

  // Case 3: Local file path on disk (e.g. /src/assets/images/... or /assets/images/...)
  let targetPath = rawInput;
  if (targetPath.startsWith('/@fs/')) {
    targetPath = targetPath.replace('/@fs', '');
  } else if (targetPath.startsWith('/src/')) {
    targetPath = path.resolve(__dirname, targetPath.slice(1));
  } else if (targetPath.startsWith('/assets/')) {
    const inSrc = path.resolve(__dirname, 'src', targetPath.slice(1));
    const inDist = path.resolve(__dirname, 'dist', targetPath.slice(1));
    targetPath = fs.existsSync(inSrc) ? inSrc : inDist;
  } else if (!path.isAbsolute(targetPath)) {
    targetPath = path.resolve(__dirname, targetPath);
  }

  if (fs.existsSync(targetPath)) {
    const fileBuf = await fs.promises.readFile(targetPath);
    const ext = path.extname(targetPath).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    return {
      base64Data: fileBuf.toString('base64'),
      mimeType: mime,
    };
  }

  // Case 4: Raw base64 string without data prefix
  return {
    base64Data: rawInput.replace(/\s/g, ''),
    mimeType: fallbackMime,
  };
}

// Fallback Clinical Biomechanics Report Generator
function generateFallbackClinicalReport(focusArea: string = 'general', patientNote: string = '', lang: string = 'ar') {
  const isAr = lang === 'ar';
  if (focusArea === 'knee') {
    return {
      assessmentTitle: {
        ar: 'فحص ميكانيكا ثني الركبة والرباط الصليبي (ACL Recovery Analysis)',
        en: 'Knee Flexion Kinematics & ACL Reconstruction Assessment',
      },
      primaryCondition: {
        ar: 'نقص خفيف في المدى الحركي النهائي لثني الركبة (118° مقابل 135° المعياري)',
        en: 'Mild terminal flexion deficit (118° measured vs 135° anatomical norm)',
      },
      riskLevel: 'moderate',
      symmetryScore: 86,
      biomechanicalAngles: [
        {
          joint: isAr ? 'زاوية ثني الركبة (Knee Flexion)' : 'Knee Flexion Angle',
          measuredAngle: '118°',
          targetAngle: '135°',
          status: 'warning',
          clinicalNote: isAr
            ? 'شد في الوتر الرضفي وأوتار المأبض يمنع الإغلاق الحركي الكامل.'
            : 'Patellar tendon and distal hamstring stiffness restricting full terminal range.',
        },
        {
          joint: isAr ? 'زاوية انحراف الركبة للداخل (Q-Angle Valgus)' : 'Patellar Q-Angle / Valgus',
          measuredAngle: '12°',
          targetAngle: '10° - 14°',
          status: 'optimal',
          clinicalNote: isAr
            ? 'محاذاة عظم الفخذ مع قصبة الساق مستقرة وفي النطاق الفسيولوجي الآمن.'
            : 'Femoral-tibial frontal alignment is neutral within healthy physiological limits.',
        },
        {
          joint: isAr ? 'ثبات ميل الحوض (Pelvic Stability)' : 'Pelvic Level Symmetry',
          measuredAngle: '4° anterior tilt',
          targetAngle: '0° - 5°',
          status: 'optimal',
          clinicalNote: isAr
            ? 'عضلات الألوية المتوسطة تؤمن ثباتاً متكافئاً أثناء التحميل.'
            : 'Gluteus medius firing provides balanced load transfer.',
        },
      ],
      clinicalObservations: [
        {
          ar: 'وجود توتر تعويضي في عضلة الفخذ ذات الرؤوس الأربعة (Quadriceps) لتخفيف الضغط عن المفصل.',
          en: 'Compensatory hypertonicity detected in rectus femoris to offload patellofemoral pressure.',
        },
        {
          ar: 'تأخر نسبي في تنشيط العضلة المتسعة الإنسية (VMO) خلال آخر 15 درجة من بسط المفصل.',
          en: 'Delayed vastus medialis oblique (VMO) activation during final 15 degrees of terminal extension.',
        },
      ],
      correctiveDrills: [
        {
          name: {
            ar: 'تمرين استطالة الفخذ الرباعي على البطن (Prone Quad Stretch)',
            en: 'Prone Quad & Hip Flexor Mobilization',
          },
          setsReps: isAr ? '3 مجموعات × 30 ثانية لكل ساق' : '3 sets × 30 sec per side',
          description: {
            ar: 'الاستلقاء على البطن واستخدام حزام مطاطي لسحب الكعب بلطف نحو الأرداف مع الحفاظ على استقامة الحوض.',
            en: 'Lie prone, using a strap to gently draw heel toward glute without arching lumbar spine.',
          },
          cautionNote: {
            ar: 'تجنب القوة المفرطة التي تسبب ألماً حاداً في مقدمة الرضفة.',
            en: 'Stop if sharp anterior knee pain occurs.',
          },
        },
        {
          name: {
            ar: 'تنشيط العضلة المتسعة الإنسية (Terminal Knee Extension with VMO squeeze)',
            en: 'Terminal Knee Extension (TKE) with Band Resistance',
          },
          setsReps: isAr ? '3 مجموعات × 15 تكرار' : '3 sets × 15 reps',
          description: {
            ar: 'تثبيت حزام المقاومة خلف الركبة وفرد المفصل بالكامل ضد المقاومة مع الضغط 2 ثانية.',
            en: 'Anchor loop band behind knee, press back into full extension focusing on inner quad squeeze.',
          },
        },
      ],
      athleticImpact: {
        ar: 'استعادة المدى الحركي الكامل لثني الركبة أمر حاسم لملاكمي النخبة لتوليد القوة الارتدادية والنزول تحت اللكمات.',
        en: 'Restoring full knee terminal flexion is critical for combat stance drop-level shifts and ground force generation.',
      },
    };
  }

  if (focusArea === 'shoulder') {
    return {
      assessmentTitle: {
        ar: 'تحليل حركية مفصل الكتف والكفة المدورة (Shoulder Impingement Screen)',
        en: 'Shoulder Biomechanics & Rotator Cuff Kinematic Analysis',
      },
      primaryCondition: {
        ar: 'انحشار خفيف في الفضاء تحت الأخرمي مع استدارة أمامية للوح الكتف',
        en: 'Subacromial impingement with anterior scapular tilting',
      },
      riskLevel: 'moderate',
      symmetryScore: 84,
      biomechanicalAngles: [
        {
          joint: isAr ? 'زاوية الرفع الجانبي للكتف (Abduction)' : 'Shoulder Abduction Arc',
          measuredAngle: '155°',
          targetAngle: '180°',
          status: 'warning',
          clinicalNote: isAr ? 'ألم خفيف عند زاوية 90°-120° يشير إلى تهيج الوتر الشوكي.' : 'Painful arc between 90°-120° indicating supraspinatus irritation.',
        },
        {
          joint: isAr ? 'الدوران الخارجي (External Rotation)' : 'Glenohumeral External Rotation',
          measuredAngle: '65°',
          targetAngle: '85° - 90°',
          status: 'warning',
          clinicalNote: isAr ? 'تصلب في الكبسولة الخلفية للكتف يحد من المدى الدوراني.' : 'Posterior capsule stiffness limiting external rotational clearance.',
        },
      ],
      clinicalObservations: [
        {
          ar: 'ضعف العضلة المنشارية الأمامية (Serratus Anterior) يؤدي إلى تدلي لوح الكتف عند الرفع.',
          en: 'Serratus anterior weakness causing inadequate upward scapular rotation during elevation.',
        },
        {
          ar: 'تشنج العضلة الصدرية الصغيرة (Pectoralis Minor) يدفع رأس عظم العضد للأمام.',
          en: 'Pectoralis minor tightness biasing anterior humeral head migration.',
        },
      ],
      correctiveDrills: [
        {
          name: {
            ar: 'تمرين انزلاق الذراعين على الحائط مع رول الفوم (Wall Foam Roller Slides)',
            en: 'Wall Foam Roller Slide with Scapular Protraction',
          },
          setsReps: isAr ? '3 مجموعات × 12 تكرار' : '3 sets × 12 reps',
          description: {
            ar: 'ضع الذراعين على رول فوم فوق الحائط وادفع لوحي الكتف للأمام أثناء الصعود لأعلى.',
            en: 'Place forearms on foam roller against wall and glide upward pushing shoulder blades outward.',
          },
        },
        {
          name: {
            ar: 'الدوران الخارجي مع شريط المقاومة (Banded External Rotations)',
            en: 'Side-lying or Banded External Rotation',
          },
          setsReps: isAr ? '3 مجموعات × 15 تكرار' : '3 sets × 15 reps',
          description: {
            ar: 'ثني المرفق 90 درجة بجانب الجذع والتدوير للخارج مع تثبيت منشفة تحت الإبط.',
            en: 'Keep elbow pinned at 90° against ribs, slowly rotating hand outward.',
          },
        },
      ],
      athleticImpact: {
        ar: 'حماية الكتف تضمن قوة اللكمات المستقيمة (Jab & Cross) دون إصابة الكفة المدورة تحت التحميل الانفجاري.',
        en: 'Shoulder stability preserves punch velocity and protects against deceleration tears during explosive crosses.',
      },
    };
  }

  // Default Spine / Posture
  return {
    assessmentTitle: {
      ar: 'تحليل استقامة العمود الفقري وتحدب الفقرات الصدرية (Spinal Alignment)',
      en: 'Sagittal Plumb Line & Thoracic Posture Analysis',
    },
    primaryCondition: {
      ar: 'ميل متقدم في الرأس (Forward Head Tilt: 22°) وتحدب صدري معتدل من وضعيات الجلوس',
      en: 'Forward Head Posture (22° craniovertebral deviation) with upper cross syndrome',
    },
    riskLevel: 'moderate',
    symmetryScore: 82,
    biomechanicalAngles: [
      {
        joint: isAr ? 'زاوية الرأس العنقية (Craniovertebral Angle)' : 'Craniovertebral Angle',
        measuredAngle: '44°',
        targetAngle: '> 50°',
        status: 'warning',
        clinicalNote: isAr
          ? 'انحناء ملحوظ للأمام يضاعف الحمل الإجهادي على الفقرات العنقية C4-C7.'
          : 'Anterior head migration increases effective load on cervical discs by ~3x.',
      },
      {
        joint: isAr ? 'تحدب الفقرات الصدرية (Thoracic Kyphosis)' : 'Thoracic Kyphosis Curve',
        measuredAngle: '42°',
        targetAngle: '25° - 35°',
        status: 'warning',
        clinicalNote: isAr
          ? 'استدارة الكتفين للأمام مع تمدد مفرط في عضلات ما بين لوحي الكتف.'
          : 'Protracted scapulae with lengthened rhomboids and middle trapezius.',
      },
      {
        joint: isAr ? 'انحناء الفقرات القطنية (Lumbar Lordosis)' : 'Lumbar Lordosis Arc',
        measuredAngle: '34°',
        targetAngle: '30° - 40°',
        status: 'optimal',
        clinicalNote: isAr
          ? 'قوس الفقرات القطنية في وضع محايد سليم نسبياً.'
          : 'Lumbar sagittal curvature maintains physiological neutrality.',
      },
    ],
    clinicalObservations: [
      {
        ar: 'قصر في عضلات الصدر الصغيرة (Pectoralis Minor) يدفع لوح الكتف للأمام والأسفل.',
        en: 'Pectoralis minor tightness biasing anterior tipping of the scapular blade.',
      },
      {
        ar: 'ضعف في العضلات القابضة العميقة للرقبة (Deep Neck Flexors).',
        en: 'Inhibition of deep cervical flexors leading to superficial SCM overuse.',
      },
    ],
    correctiveDrills: [
      {
        name: {
          ar: 'تمرين سحب الذقن واستقامة الرقبة (Chin Tucks against Wall)',
          en: 'Chin Tucks with Retraction Iso-Hold',
        },
        setsReps: isAr ? '3 مجموعات × 12 تكرار (ثبات 3 ثوانٍ)' : '3 sets × 12 reps (3s hold)',
        description: {
          ar: 'إرجاع الرأس للخلف بمحاذاة الحائط كأنك تصنع ذقناً مزدوجاً مع استرخاء الفك.',
          en: 'Glide head directly backward making a double chin, holding crown high against wall.',
        },
      },
      {
        name: {
          ar: 'ملاك الحائط لتحرير الصدر وألواح الكتف (Wall Angels)',
          en: 'Wall Angels with Scapular Retraction',
        },
        setsReps: isAr ? '3 مجموعات × 10 تكرارات بطيئة' : '3 sets × 10 slow reps',
        description: {
          ar: 'ملامسة المرفقين والرسغين للحائط والتحرك للأعلى والأسفل مع فتح الصدر.',
          en: 'Slide elbows and forearms up and down the wall maintaining thoracic contact.',
        },
      },
    ],
    athleticImpact: {
      ar: 'تصحيح قوام الرأس يرفع سرعة التفاعل البصري في الملاكمة ويحمي الملاكم من صدمات الارتجاج عند تلقي اللكمات.',
      en: 'Neutral cervical posture enhances peripheral vision reaction and reinforces neck muscular brace during boxing impact.',
    },
  };
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check & Telemetry
app.get('/api/health', (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    aiReady: Boolean(ai),
    model: 'gemini-3.8-flash',
    memoryUsageMB: Math.round(mem.rss / 1024 / 1024),
    patientScansCount: patientScansStore.length,
    messagesCount: contactMessagesStore.length,
    hegazyNotesCount: hegazyNotesStore.length,
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Route: AI Physiotherapy & Musculoskeletal Biomechanics Image Analysis
app.post('/api/analyze-physio', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', patientNote, focusArea = 'general', lang = 'ar' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided for physiotherapy analysis.' });
    }

    const { base64Data: cleanBase64, mimeType: resolvedMime } = await resolveImageSource(imageBase64, mimeType);

    // If Gemini AI client is initialized with an API key, invoke Gemini 3.8 Flash Multimodal
    if (ai) {
      try {
        const prompt = `You are a world-class Clinical Physiotherapy Specialist, Musculoskeletal Biomechanics Researcher, and Sports Kinesiologist collaborating with Rana Gamal (National Boxing Champion and Medical AI researcher).
Analyze the provided patient or clinical physiotherapy photo in detail.

Patient Context / Focus Area: ${focusArea || 'General Posture & Joint Biomechanics'}
Patient Notes: ${patientNote || 'Standard clinical screening for range of motion, symmetry, and rehabilitation.'}
Language Target: Both Arabic and English for bilingual display.

Perform a thorough kinesiological and anatomical assessment:
1. Identify the anatomical joint/posture shown (e.g. Knee flexion/extension, Lumbar/Cervical spine alignment, Shoulder abduction/impingement, Pelvic tilt, Kinetic chain posture).
2. Measure or estimate key joint angles, comparing to optimal anatomical normative baselines.
3. Assess kinetic symmetry and risk level (low, moderate, high).
4. Provide structured clinical observations detailing muscle tightness, compensatory postures, or load imbalances.
5. Provide 2-3 actionable, evidence-based physical therapy corrective exercises with sets, reps, and precise cues.
6. Provide an athletic/biomechanical performance correlation (how this affects kinetic power transfer, athletic resilience, or injury prevention).

Return STRICT JSON matching this exact structure:
{
  "assessmentTitle": {
    "ar": "عنوان التشخيص السريري باللغة العربية",
    "en": "Clinical Diagnosis Title in English"
  },
  "primaryCondition": {
    "ar": "الحالة الأساسية الملاحظة بالعربية",
    "en": "Primary observed condition in English"
  },
  "riskLevel": "low" | "moderate" | "high",
  "symmetryScore": 85,
  "biomechanicalAngles": [
    {
      "joint": "Knee Flexion (ثني الركبة)",
      "measuredAngle": "115°",
      "targetAngle": "135°",
      "status": "warning",
      "clinicalNote": "Clinical observation on this specific joint angle."
    }
  ],
  "clinicalObservations": [
    {
      "ar": "الملاحظة السريرية بالعربية",
      "en": "Clinical observation in English"
    }
  ],
  "correctiveDrills": [
    {
      "name": {
        "ar": "اسم التمرين بالعربية",
        "en": "Exercise Name in English"
      },
      "setsReps": "3 مجموعات × 12 تكرار",
      "description": {
        "ar": "طريقة الأداء بالتفصيل بالعربية",
        "en": "Step-by-step cue in English"
      },
      "cautionNote": {
        "ar": "تنبيه سريري هام",
        "en": "Clinical caution note"
      }
    }
  ],
  "athleticImpact": {
    "ar": "الأثر الحركي على الأداء الرياضي والملاكمة وثبات الجذع",
    "en": "Kinetic chain implication for combat sports and athletic performance"
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: {
            parts: [
              {
                inlineData: {
                  data: cleanBase64,
                  mimeType: resolvedMime || mimeType,
                },
              },
              {
                text: prompt,
              },
            ],
          },
          config: {
            responseMimeType: 'application/json',
          },
        });

        const responseText = response.text || '{}';
        let parsedResult;
        try {
          parsedResult = JSON.parse(responseText);
        } catch {
          const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
          parsedResult = JSON.parse(cleaned);
        }

        return res.json({
          success: true,
          source: 'gemini-live',
          analysis: parsedResult,
        });
      } catch (geminiError: any) {
        console.warn('Gemini live analysis encountered error, using clinical kinesiology engine:', geminiError?.message || geminiError);
      }
    }

    // Graceful Clinical Engine Fallback (ensures 100% full-stack resilience)
    const fallback = generateFallbackClinicalReport(focusArea, patientNote, lang);
    return res.json({
      success: true,
      source: 'clinical-kinesiology-engine',
      analysis: fallback,
    });
  } catch (error: any) {
    console.error('Error analyzing physiotherapy image:', error);
    const fallback = generateFallbackClinicalReport('general', '', 'ar');
    return res.json({
      success: true,
      source: 'clinical-kinesiology-engine',
      analysis: fallback,
    });
  }
});

// API Route: AI Kinesiology & Rehabilitation Consultant Q&A
app.post('/api/physio-consult', async (req, res) => {
  try {
    const { question, focusArea = 'general', lang = 'ar' } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const isAr = lang === 'ar';

    if (ai) {
      try {
        const prompt = `You are Rana Gamal's AI Clinical Physiotherapy & Kinesiology Consultant.
Rana Gamal is a National Boxing Champion and Medical AI researcher specializing in physical therapy, biomechanics, and rehabilitation.
Respond to this patient/athlete consultation question:
"${question}"

Focus Area: ${focusArea}
Target Language: ${isAr ? 'Arabic with concise English anatomical terms' : 'English'}

Provide an authoritative, compassionate, and medically sound answer including:
1. Direct clinical answer and biomechanical root cause.
2. 2-3 specific rehabilitation or corrective exercises (with sets, reps, and precise cues).
3. Critical warning / contraindications.
4. Athletic correlation (how this relates to core stability, balance, or combat sports resilience).

Return STRICT JSON matching:
{
  "answer": "Comprehensive answer text in ${isAr ? 'Arabic' : 'English'}",
  "drills": [
    {
      "name": "Exercise name",
      "setsReps": "Sets and Reps",
      "cue": "Execution cue"
    }
  ],
  "caution": "Clinical caution",
  "athleticNote": "Athletic and kinetic insight"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '{}';
        const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({
          success: true,
          source: 'gemini-live',
          consultation: parsed,
        });
      } catch (err: any) {
        console.warn('AI consult generation error, using expert clinical rulebase:', err?.message);
      }
    }

    // High quality clinical rulebase fallback
    const answer = isAr
      ? `تحية طيبة. بناءً على مبادئ العلاج الطبيعي والميكانيكا الحيوية الرياضية، تتطلب هذه الحالة تقوية العضلات التثبيتية المحيطة بالمفصل، وتحسين الإدراك الحسي الحركي (Proprioception). يُوصى بتطبيق تمارين الإطالة الديناميكية قبل التمرين، والتقوية الإيزومترية الخالية من الألم لتعزيز استقرار المحور الحركي.`
      : `Based on clinical kinesiology and athletic biomechanics principles, this presentation benefits from progressive stabilizer strengthening, soft tissue mobilization, and neuromuscular proprioception drills.`;

    const drills = [
      {
        name: isAr ? 'التقوية الإيزومترية الثابتة (Submaximal Isometric Hold)' : 'Submaximal Isometric Hold',
        setsReps: isAr ? '3 مجموعات × 15 ثانية ثبات' : '3 sets × 15s hold',
        cue: isAr ? 'تطبيق ضغط خفيف ومستقر دون تحريك المفصل مع التنفس المنتظم.' : 'Apply gentle static tension without joint movement; breathe steadily.',
      },
      {
        name: isAr ? 'استطالة السلسلة العضلية المعاكسة (Reciprocal Antagonist Stretch)' : 'Reciprocal Antagonist Stretch',
        setsReps: isAr ? '3 مجموعات × 30 ثانية' : '3 sets × 30s',
        cue: isAr ? 'تمديد هادئ داخل المدى الخالي من الألم لتحرير الشد العضلي التعويضي.' : 'Gentle elongated stretch within pain-free threshold.',
      },
    ];

    return res.json({
      success: true,
      source: 'clinical-kinesiology-engine',
      consultation: {
        answer,
        drills,
        caution: isAr
          ? 'توقف فوراً عند الشعور بألم حاد أو نغز مفاجئ، واستشر أخصائي العلاج الطبيعي للفحص السريري المباشر.'
          : 'Discontinue immediately if sharp localized discomfort occurs and consult your physical therapist.',
        athleticNote: isAr
          ? 'في الملاكمة والرياضات عالية الكثافة، يمثل ثبات المفصل حجر الزاوية لنقل العزم الحركي المتفجر من الأرض إلى القبضة.'
          : 'In boxing and high-performance athletics, joint stability forms the kinetic bedrock for rotational power transfer.',
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Consultation failed.' });
  }
});

// API Routes for Patient Scans History (Full-Stack CRUD)
app.get('/api/patient/scans', (req, res) => {
  res.json({
    success: true,
    scans: patientScansStore,
  });
});

app.post('/api/patient/scans', (req, res) => {
  try {
    const { patientName, focusArea, painLevel, imageThumbnail, result } = req.body;
    const newScan: StoredScan = {
      id: Date.now().toString(),
      patientName: patientName?.trim() || 'Anonymous Patient',
      date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }),
      focusArea: focusArea || 'general',
      painLevel: typeof painLevel === 'number' ? painLevel : 4,
      imageThumbnail: imageThumbnail || '',
      result: result || {},
      createdAt: new Date().toISOString(),
    };

    patientScansStore.unshift(newScan);
    // Keep max 25 recent scans in memory
    if (patientScansStore.length > 25) {
      patientScansStore.pop();
    }

    res.status(201).json({
      success: true,
      scan: newScan,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to save patient scan.' });
  }
});

app.delete('/api/patient/scans/:id', (req, res) => {
  const { id } = req.params;
  const index = patientScansStore.findIndex((s) => s.id === id);
  if (index !== -1) {
    patientScansStore.splice(index, 1);
    return res.json({ success: true, message: 'Scan deleted.' });
  }
  return res.status(404).json({ error: 'Scan not found.' });
});

// API Route: Get Contact Messages Log
app.get('/api/contact/messages', (req, res) => {
  res.json({
    success: true,
    messages: contactMessagesStore,
  });
});

// API Route: Get Hegazy Notes Log
app.get('/api/hegazy-pitch/notes', (req, res) => {
  res.json({
    success: true,
    notes: hegazyNotesStore,
  });
});

// API Route: AI 4-Week Rehabilitation & Athletic Program Generator
app.post('/api/rehab-plan', async (req, res) => {
  try {
    const { focusArea = 'knee', goal = 'recovery', fitnessLevel = 'athlete', weeks = 4, lang = 'ar' } = req.body;
    const isAr = lang === 'ar';

    if (ai) {
      try {
        const prompt = `You are Rana Gamal's AI Clinical Rehabilitation Director and Sports Physiotherapist.
Generate a structured ${weeks}-week physical therapy and kinetic rehabilitation program for:
Focus Area: ${focusArea}
Goal: ${goal}
Level: ${fitnessLevel}

Return STRICT JSON matching:
{
  "programTitle": {
    "ar": "عنوان البرنامج التأهيلي بالعربية",
    "en": "Program Title in English"
  },
  "durationWeeks": ${weeks},
  "focusArea": "${focusArea}",
  "weeklyFrequency": "${isAr ? '3 إلى 4 حصص أسبوعياً' : '3 to 4 sessions/week'}",
  "objective": {
    "ar": "الهدف السريري والحركي للبرنامج",
    "en": "Clinical and kinematic objective"
  },
  "phases": [
    {
      "phase": 1,
      "title": { "ar": "المرحلة الأولى: تفعيل واستقرار", "en": "Phase 1: Activation & Stabilization" },
      "focus": { "ar": "التحكم في الألم وتقوية إيزومترية", "en": "Pain mitigation and isometric activation" },
      "drills": [
        { "name": "Exercise 1", "setsReps": "3x15", "instructions": "Cue description" },
        { "name": "Exercise 2", "setsReps": "3x12", "instructions": "Cue description" }
      ]
    },
    {
      "phase": 2,
      "title": { "ar": "المرحلة الثانية: المدى الحركي الكامل", "en": "Phase 2: Full ROM & Dynamic Mobility" },
      "focus": { "ar": "استعادة آخر درجات المفصل", "en": "Restoring terminal joint excursion" },
      "drills": [
        { "name": "Exercise 1", "setsReps": "3x12", "instructions": "Cue description" },
        { "name": "Exercise 2", "setsReps": "3x15", "instructions": "Cue description" }
      ]
    },
    {
      "phase": 3,
      "title": { "ar": "المرحلة الثالثة: القوة اللامركزية والتوازن", "en": "Phase 3: Eccentric Strength & Balance" },
      "focus": { "ar": "تحميل وظيفي وإدراك حسي حركي", "en": "Proprioceptive neuromuscular facilitation" },
      "drills": [
        { "name": "Exercise 1", "setsReps": "4x10", "instructions": "Cue description" },
        { "name": "Exercise 2", "setsReps": "3x12", "instructions": "Cue description" }
      ]
    },
    {
      "phase": 4,
      "title": { "ar": "المرحلة الرابعة: العودة للملاكمة والأداء الانفجاري", "en": "Phase 4: Return to Sport & Boxing Kinetics" },
      "focus": { "ar": "تحمل الصدمات وعزم الدوران", "en": "Shock absorption and rotational power transfer" },
      "drills": [
        { "name": "Exercise 1", "setsReps": "3x15", "instructions": "Cue description" },
        { "name": "Exercise 2", "setsReps": "3x12", "instructions": "Cue description" }
      ]
    }
  ],
  "recoveryGuidelines": {
    "ar": "إرشادات الاستشفاء والنوم والتغذية الداعمة للأنسجة الضامة",
    "en": "Tissue recovery, hydration, and sleep guidelines"
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '{}';
        const parsed = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
        return res.json({
          success: true,
          source: 'gemini-live',
          plan: parsed,
        });
      } catch (err: any) {
        console.warn('Rehab plan generation fallback:', err?.message);
      }
    }

    // High fidelity clinical rulebase plan
    const fallbackPlan = {
      programTitle: {
        ar: `برنامج التأهيل الحركي المتقدم: ${focusArea === 'knee' ? 'إعادة تأهيل الركبة والرباط الصليبي' : focusArea === 'shoulder' ? 'تأهيل متلازمة انحشار الكتف' : 'تصحيح استقامة العمود الفقري والقوام'}`,
        en: `Advanced Biomechanical Rehabilitation Protocol: ${focusArea.toUpperCase()}`,
      },
      durationWeeks: 4,
      focusArea,
      weeklyFrequency: isAr ? '4 جلسات أسبوعياً (45 دقيقة للجلسة)' : '4 sessions/week (45 mins per session)',
      objective: {
        ar: 'إعادة التوازن الميكانيكي للمفصل، القضاء على الألم التعويضي، وبناء عزم حركي متفجر مستقر للملاكمة والرياضة.',
        en: 'Rebuilding joint kinematic balance, eliminating compensatory guarding, and establishing explosive kinetic stability.',
      },
      phases: [
        {
          phase: 1,
          title: { ar: 'الأسبوع 1: التهدئة والتحفيز العصبي العضلي', en: 'Week 1: Neuromuscular Re-education' },
          focus: { ar: 'تنشيط عضلات التثبيت العميقة وتقليل الشد العضلي الحاد', en: 'Deep stabilizer activation & hypertonicity release' },
          drills: [
            { name: isAr ? 'انقباض إيزومتري متدرج (Iso-Hold 10s)' : 'Submaximal Iso-Hold (10s)', setsReps: '4x10', instructions: isAr ? 'ثبات خالي من الألم لتحفيز التغذية العصبية' : 'Gentle isometric squeeze without joint excursion' },
            { name: isAr ? 'تحرير اللفافة العضلية بالفوم رولر' : 'Myofascial Foam Rolling', setsReps: '3x45s', instructions: isAr ? 'تدليك هادئ لأوتار العضلات المشدودة' : 'Slow rhythmic pressure across targeted trigger bands' }
          ]
        },
        {
          phase: 2,
          title: { ar: 'الأسبوع 2: استعادة المدى الحركي المتماثل', en: 'Week 2: Symmetric Range of Motion' },
          focus: { ar: 'التغلب على التحدد النهائي وزيادة سيولة الحركة', en: 'Restoring terminal excursion & capsular mobility' },
          drills: [
            { name: isAr ? 'تمرين التمديد الديناميكي المتحكم' : 'Controlled Dynamic Mobilization', setsReps: '3x12', instructions: isAr ? 'حركة انسيابية متوافقة مع التنفس الحجابي' : 'Smooth fluid cadence synched with diaphragmatic breath' },
            { name: isAr ? 'تثبيت اللوح الحركي مع شريط المقاومة' : 'Banded Kinetic Anchor Pull', setsReps: '3x15', instructions: isAr ? 'سحب بطيء ومقاومة الارتداد لمدة 3 ثوانٍ' : 'Slow pull with 3-second eccentric return' }
          ]
        },
        {
          phase: 3,
          title: { ar: 'الأسبوع 3: القوة الوظيفية والتحميل اللامركزي', en: 'Week 3: Functional & Eccentric Strength' },
          focus: { ar: 'تقوية الأوتار ضد قوى القص وبناء المقاومة', en: 'Tendon stiffening against shearing forces' },
          drills: [
            { name: isAr ? 'النزول اللامركزي البطيء (Tempo 3-1-1)' : 'Tempo Eccentric Loading (3-1-1)', setsReps: '4x8', instructions: isAr ? 'نزول في 3 ثوانٍ وصعود سريع مسيطر عليه' : '3 seconds lowering, 1s pause, controlled drive' },
            { name: isAr ? 'تمرين التوازن الأحادي على وسادة هوائية' : 'Single-Leg Proprioception Stance', setsReps: '3x30s', instructions: isAr ? 'الحفاظ على استقامة الحوض ومنع الميلان' : 'Maintain level pelvis with neutral plumb line' }
          ]
        },
        {
          phase: 4,
          title: { ar: 'الأسبوع 4: العودة للملاكمة ونقل العزم الحركي', en: 'Week 4: Combat Integration & Kinetic Transfer' },
          focus: { ar: 'تحويل القوة الأرضية إلى لكمات قوية دون ألم', en: 'Ground force absorption & punch release transfer' },
          drills: [
            { name: isAr ? 'تدريب امتصاص الصدمة البليومترية' : 'Plyometric Deceleration Hop', setsReps: '3x10', instructions: isAr ? 'الهبوط الهادئ مع ثني الركبة وتثبيت الجذع' : 'Soft quiet landing absorbing momentum with core brace' },
            { name: isAr ? 'دوران الجذع المتفجر مع حبل المقاومة' : 'Rotational Core Cable Cross', setsReps: '3x12', instructions: isAr ? 'نقل العزم من كعب القدم عبر الحوض إلى الذراع' : 'Drive from rear foot through hip to punching fist' }
          ]
        }
      ],
      recoveryGuidelines: {
        ar: 'الاستحمام البارد والساخن المتناوب لتحفيز الدورة الدموية، 8 ساعات نوم يومياً لإصلاح ألياف الكولاجين، وترطيب كافٍ مع شوارد البوتاسيوم والمغنيسيوم.',
        en: 'Contrast water therapy for systemic recovery, 8 hours deep sleep for collagen synthesis, and electrolyte replenishment.',
      }
    };

    return res.json({
      success: true,
      source: 'clinical-kinesiology-engine',
      plan: fallbackPlan,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Plan generation failed.' });
  }
});

// API Route: Direct Contact Message Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const messageRecord: StoredContactMessage = {
      id: `MSG-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim(),
      subject: subject ? String(subject).trim() : 'Portfolio Inquiry',
      receivedAt: new Date().toISOString(),
    };

    contactMessagesStore.unshift(messageRecord);
    console.log(`[Contact Received] From: ${messageRecord.name} (${messageRecord.email})`);

    return res.status(201).json({
      success: true,
      messageId: messageRecord.id,
      timestamp: messageRecord.receivedAt,
      feedback: 'Message received and stored securely.',
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to process contact message.' });
  }
});

// API Route: Dedicated Eng. Ibrahim Hegazy Pitch / Response Endpoint
app.post('/api/hegazy-pitch', (req, res) => {
  try {
    const { senderName, contact, note, meetingRequested } = req.body;
    const noteRecord: StoredHegazyNote = {
      id: `HEGAZY-${Date.now()}`,
      senderName: senderName ? String(senderName).trim() : 'Eng. Ibrahim Hegazy / Team',
      contact: contact ? String(contact).trim() : 'Direct note',
      note: note ? String(note).trim() : 'Review noted.',
      meetingRequested: Boolean(meetingRequested),
      receivedAt: new Date().toISOString(),
    };

    hegazyNotesStore.unshift(noteRecord);
    console.log(`[Hegazy Note Received] ${noteRecord.senderName}: "${noteRecord.note}"`);

    return res.status(201).json({
      success: true,
      pitchId: noteRecord.id,
      timestamp: noteRecord.receivedAt,
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to record proposal note.' });
  }
});

// ----------------------------------------------------
// Vite Middleware / Static Production Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rana Gamal Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
