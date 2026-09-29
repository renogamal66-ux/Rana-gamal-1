import { ProjectItem, ProcessStep, ToolItem, Testimonial, PhysioReferenceCase } from './types';
import heroPortrait from './assets/images/rana_real_portrait_1789981438332.jpg';
import sunglassesPortrait from './assets/images/rana_real_portrait_1789981438332.jpg';
import ranaRealPortrait from './assets/images/rana_real_portrait_1789981438332.jpg';
import ranaSquarePortrait from './assets/images/rana_profile_square_1789981461306.jpg';
import darkRosePetals from './assets/images/moody_dark_rose_petals_1789980869823.jpg';
import medicalAiImg from './assets/images/medical_ai_preview_1789980473109.jpg';
import rehabImg from './assets/images/rehab_tech_preview_1789980487024.jpg';
import boxingAiImg from './assets/images/boxing_ai_preview_1789980500059.jpg';
import physioKneeRehab from './assets/images/physio_knee_rehab_1790147827309.jpg';
import physioSpinePosture from './assets/images/physio_spine_posture_1790147843146.jpg';
import physioShoulderRehab from './assets/images/physio_shoulder_rehab_1790147859208.jpg';

export const ASSETS = {
  heroPortrait,
  sunglassesPortrait,
  ranaRealPortrait,
  ranaSquarePortrait,
  darkRosePetals,
  medicalAiImg,
  rehabImg,
  boxingAiImg,
  physioKneeRehab,
  physioSpinePosture,
  physioShoulderRehab,
};

export const PHYSIO_REFERENCE_CASES: PhysioReferenceCase[] = [
  {
    id: 'knee-flexion-acl',
    title: {
      ar: 'تأهيل مفصل الركبة والرباط الصليبي (ACL)',
      en: 'Knee Flexion & ACL Reconstruction Rehab',
    },
    category: {
      ar: 'إصابات الأطراف السفلية',
      en: 'Lower Limb Biomechanics',
    },
    image: physioKneeRehab,
    condition: {
      ar: 'قياس المدى الحركي لثني الركبة وزاوية عضلات الفخذ الرباعية',
      en: 'Knee flexion range of motion & patellar tracking assessment',
    },
    focusJoint: 'Knee & Patellofemoral',
    samplePrompt: {
      ar: 'تحليل زاوية ثني الركبة ومدى توازن عضلات الفخذ الرباعية مع أوتار الركبة',
      en: 'Evaluate knee flexion degree, quadriceps tension, and hamstring balance',
    },
  },
  {
    id: 'lumbar-spine-posture',
    title: {
      ar: 'تقويم العمود الفقري وتحدب الظهر المكتبي',
      en: 'Lumbar Lordosis & Kyphosis Posture Analysis',
    },
    category: {
      ar: 'العمود الفقري وقوام الجسم',
      en: 'Spinal Alignment & Ergonomics',
    },
    image: physioSpinePosture,
    condition: {
      ar: 'كشف انحناء الرقبة للأمام وتسطح الفقرات القطنية',
      en: 'Forward head tilt and thoracic posture compensation analysis',
    },
    focusJoint: 'Spine (Cervical & Lumbar)',
    samplePrompt: {
      ar: 'قياس زاوية القوام الرأسي وانحناء الفقرات القطنية وتوازن الحوض',
      en: 'Assess sagittal plumb line alignment, lumbar curve, and pelvic tilt symmetry',
    },
  },
  {
    id: 'shoulder-rotator-cuff',
    title: {
      ar: 'متلازمة انحشار الكتف والكفة المدورة',
      en: 'Shoulder Impingement & Rotator Cuff Mobility',
    },
    category: {
      ar: 'الأطراف العلوية وحزام الكتف',
      en: 'Upper Kinetic Chain',
    },
    image: physioShoulderRehab,
    condition: {
      ar: 'تقييم زاوية الرفع الجانبي للكتف (Abduction) وانقباض لوح الكتف',
      en: 'Scapulohumeral rhythm & rotational shoulder mobility check',
    },
    focusJoint: 'Glenohumeral & Scapula',
    samplePrompt: {
      ar: 'تحليل دوران الكتف الخارجي وثبات لوح الكتف لتفادي التمزق',
      en: 'Measure shoulder abduction arc and scapular stabilization symmetry',
    },
  },
  {
    id: 'boxing-kinetic-pelvis',
    title: {
      ar: 'السلسلة الحركية للملاكمين وتدوير الحوض',
      en: 'Combat Kinetic Chain & Pelvic Torque Alignment',
    },
    category: {
      ar: 'الميكانيكا الحيوية الرياضية',
      en: 'Combat Sports Biomechanics',
    },
    image: boxingAiImg,
    condition: {
      ar: 'نقل العزم الحركي من القدمين عبر الحوض إلى الكتف والقبضة',
      en: 'Kinetic energy transfer from ground reaction forces through hips to punch release',
    },
    focusJoint: 'Pelvic Girdle & Kinetic Axis',
    samplePrompt: {
      ar: 'تحليل استقرار مركز الثقل وزاوية دوران الجذع أثناء الحركة',
      en: 'Assess center-of-mass equilibrium and core torque generation',
    },
  },
];

export const PERSONAL_INFO = {
  name: {
    ar: 'رنا جمال',
    en: 'Rana Gamal',
  },
  title: {
    ar: 'مهندسة برمجيات وذكاء اصطناعي طبي | بطلة جمهورية في الملاكمة',
    en: 'Medical AI Engineer & National Boxing Champion',
  },
  age: 20,
  faculty: {
    ar: 'كلية الحاسبات والمعلومات والذكاء الاصطناعي',
    en: 'Faculty of Computers & Artificial Intelligence',
  },
  championship: {
    ar: 'بطلة جمهورية في الملاكمة - ذهبية الاتحاد المصري للملاكمة',
    en: 'National Boxing Champion - Gold Medalist',
  },
  location: {
    ar: 'القاهرة، مصر',
    en: 'Cairo, Egypt',
  },
  email: 'rana.gamal.ai@gmail.com',
  linkedin: 'https://linkedin.com/in/ranagamal',
  github: 'https://github.com/ranagamal-ai',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'physio-vision-ai',
    number: '01',
    title: {
      ar: 'نظام الكشف والتشخيص الحركي الذكي',
      en: 'PhysioVision: Clinical Biomechanics AI',
    },
    subtitle: {
      ar: 'تشخيص انحرافات الحركة وإعادة التأهيل الفيزيائي للعمود الفقري والمفاصل',
      en: 'Real-time Computer Vision for Musculoskeletal Rehab & Posture',
    },
    description: {
      ar: 'نموذج رؤية حاسوبية عالي الدقة يدمج شبكات التعلم العميق مع النماذج الميكانيكية الحيوية لتقييم حركة المرضى وتحديد زوايا المفاصل بدقة مليمترية دون أجهزة معقدة.',
      en: 'High-precision Computer Vision framework combining deep learning with biomechanical kinetics to assess patient gait and joint angles without expensive clinical sensors.',
    },
    tags: ['Medical AI', 'Computer Vision', 'Biomechanics', 'PyTorch'],
    image: medicalAiImg,
    category: 'medical_ai',
    metrics: [
      { label: { ar: 'دقة تقدير زوايا المفاصل', en: 'Joint Angle Precision' }, value: '98.4%' },
      { label: { ar: 'معدل الإطارات في الثانية', en: 'Inference Speed' }, value: '60 FPS' },
      { label: { ar: 'تقليل وقت التشخيص السريري', en: 'Clinical Time Saved' }, value: '45%' },
    ],
    details: {
      problem: {
        ar: 'التشخيص التقليدي لإصابات الملاعب وانحرافات العمود الفقري يعتمد على الفحص البصري التقديري أو أجهزة رنين باهظة ومقيدة للحركة أثناء التمرين.',
        en: 'Traditional physical therapy assessments rely on subjective visual inspections or costly, cumbersome motion capture labs that inhibit natural movement.',
      },
      solution: {
        ar: 'تطوير خط أنابيب (Pipeline) متكامل باستخدام MediaPipe و PyTorch لتتبع 33 نقطة مفصلية وتحليل القوى الديناميكية ومقارنتها بقواعد بيانات طبية معيارية.',
        en: 'Engineered an end-to-end pipeline leveraging MediaPipe & PyTorch tracking 33 anatomical landmarks, computing dynamic torques against standardized biomechanical recovery baselines.',
      },
      impact: {
        ar: 'تم تطبيقه تجريبياً على أكثر من 120 رياضياً ومريضاً في مراكز علاج طبيعي، مما ساهم في تسريع التعافي وتقليل احتمالية الانتكاسة بنسبة 35%.',
        en: 'Piloted across 120+ athletes and clinical patients, speeding recovery cycles and reducing re-injury incidence by 35%.',
      },
      techStack: ['Python', 'PyTorch', 'OpenCV', 'MediaPipe', 'FastAPI', 'React', 'Tailwind CSS'],
    },
  },
  {
    id: 'sports-rehab-tracker',
    number: '02',
    title: {
      ar: 'منصة التأهيل الرياضي والتعافي العضلي',
      en: 'KineticRehab: Recovery Analytics',
    },
    subtitle: {
      ar: 'منصة تفاعلية تدمج علم العلاج الطبيعي مع مؤشرات الجهد والاستشفاء',
      en: 'Sports Science & Physiotherapy recovery engine for elite combat athletes',
    },
    description: {
      ar: 'نظام متكامل صُمم من واقع خبرتي العملية كبطلة ملاكمة وممارسة للعلاج الطبيعي، لتحديد الأحمال التدريبية وجداول الإطالات وتمارين المقاومة التكيفية.',
      en: 'An intelligent system designed from firsthand experience as a boxing champion and physical therapy practitioner to calculate recovery readiness and personalized load management.',
    },
    tags: ['Physical Therapy', 'Health Tech', 'Sports Science', 'UX/UI'],
    image: rehabImg,
    category: 'physical_therapy',
    metrics: [
      { label: { ar: 'بروتوكولات علاجية مخصصة', en: 'Customized Protocols' }, value: '50+' },
      { label: { ar: 'معدل التزام الرياضيين', en: 'Adherence Rate' }, value: '92%' },
      { label: { ar: 'تقليل الحمل العضلي الزائد', en: 'Overtraining Reduction' }, value: '40%' },
    ],
    details: {
      problem: {
        ar: 'العديد من الرياضيين يتعرضون لإصابات تمزق وإجهاد مزمن بسبب غياب التنسيق بين مدرب اللياقة وأخصائي العلاج الطبيعي.',
        en: 'Elite athletes frequently suffer chronic tendonitis and tears due to disconnected communication between technical coaches and physical therapists.',
      },
      solution: {
        ar: 'بناء خوارزمية ذكية تحسب درجات إجهاد العضلات (Fatigue Index) وتوصي بتعديل زوايا الحركة ودرجات الاستشفاء الفيزيائي يومياً.',
        en: 'Built an algorithmic fatigue indexing model translating daily range-of-motion metrics into adaptive recovery exercises and targeted mobility drills.',
      },
      impact: {
        ar: 'ساعدت فرق ملاكمة شبابية على الاستعداد لبطولة الجمهورية بأعلى كفاءة وبصفر إصابات عضلية مانعة للنزال.',
        en: 'Supported regional boxing teams in championship prep achieving optimal physical peak with zero muscle tear dropouts.',
      },
      techStack: ['TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Kinematic Modeling'],
    },
  },
  {
    id: 'boxing-ai-kinetics',
    number: '03',
    title: {
      ar: 'محلل ديناميكيات اللكمات والسرعة الحركية',
      en: 'StrikeKinetic: Boxing AI Performance',
    },
    subtitle: {
      ar: 'تحليل الذكاء الاصطناعي للسرعة، التسارع، وزمن رد الفعل للملاكمين',
      en: 'High-speed AI punch velocity, kinetic force & reaction time analytics',
    },
    description: {
      ar: 'مشروع يجمع شغفي بالملاكمة كبطلة جمهورية مع علوم الحاسب، حيث يقوم بتحليل مقاطع الفيديو فائقة السرعة لحساب سرعة اللكمة وزوايا الدفاع.',
      en: 'A flagship union of my championship boxing craft and computer science, analyzing high-speed video to compute punch impact trajectory, guard recovery, and split-second reaction times.',
    },
    tags: ['AI in Sports', 'Combat Science', 'Deep Learning', 'Data Viz'],
    image: boxingAiImg,
    category: 'sports_tech',
    metrics: [
      { label: { ar: 'سرعة حساب اللكمة (م/ث)', en: 'Punch Velocity Calc' }, value: '< 15ms' },
      { label: { ar: 'تحليل زوايا الهجوم والدفاع', en: 'Stance Accuracy' }, value: '99.1%' },
      { label: { ar: 'تحسن سرعة رد الفعل', en: 'Reaction Time Gain' }, value: '22%' },
    ],
    details: {
      problem: {
        ar: 'في الملاكمة الاحترافية، أجزاء الثانية والزوايا الدقيقة تحسم بطولات الجمهورية والعالم، ومعظم التدريب يعتمد على الحدس دون بيانات رقمية دقيقة.',
        en: 'In competitive boxing, milliseconds and millimeter angles decide national gold medals, yet coaching historically relies on intuition over hard telemetry.',
      },
      solution: {
        ar: 'خوارزمية ذكاء اصطناعي تحسب تسارع اللكمة، وتماسك القبضة، واستقرار مركز ثقل الجسم (Center of Mass) لحظة التسديد.',
        en: 'A deep convolutional neural network computing punch acceleration, kinetic chain engagement, and center-of-mass equilibrium at moment of impact.',
      },
      impact: {
        ar: 'ابتكار أداة تدريبية تثبت كيف يمكن للأنثى الرياضية أن تقود التقنية في الرياضات القتالية وتلهم جيلاً جديداً من المبتكرات.',
        en: 'Demonstrated how female athletic champions can spearhead sports technology, inspiring a new wave of women in combat sports and AI engineering.',
      },
      techStack: ['Python', 'TensorFlow', 'YOLOv8', 'OpenCV', 'React', 'WebSockets'],
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: {
      ar: 'الملاحظة والتشخيص السريري',
      en: 'Clinical Diagnosis & Discovery',
    },
    desc: {
      ar: 'فهم عميق للخلل الوظيفي أو الحركي بناءً على أسس العلاج الطبيعي والتشريح العضلي الدقيق.',
      en: 'Deep investigation of musculoskeletal mechanics grounded in clinical anatomy and physical therapy principles.',
    },
  },
  {
    number: '02',
    title: {
      ar: 'صياغة النماذج الرياضية والخوارزميات',
      en: 'Mathematical & AI Modeling',
    },
    desc: {
      ar: 'تحويل الحركات الإنسانية إلى متجهات رياضية ونماذج تعلم عميق قادرة على التنبؤ والتحليل.',
      en: 'Translating human biomechanics into mathematical vector spaces and predictive neural network architectures.',
    },
  },
  {
    number: '03',
    title: {
      ar: 'انضباط الحلبة والدقة العالية',
      en: 'Championship Rigor & Precision',
    },
    desc: {
      ar: 'تطبيق الصرامة والتركيز اللذين تعلمتهما في الملاكمة لتحسين النماذج بنسبة خطأ تقترب من الصفر.',
      en: 'Applying the extreme discipline forged in boxing rings to fine-tune model hyperparameters and ensure near-zero error margins.',
    },
  },
  {
    number: '04',
    title: {
      ar: 'التطوير البرمجي والواجهات الهادئة',
      en: 'Calm, Seamless Implementation',
    },
    desc: {
      ar: 'بناء واجهات سهلة وعالية الأناقة للأطباء والرياضيين خالية من التعقيد والتشتت.',
      en: 'Engineering serene, distraction-free software interfaces that empower doctors, therapists, and athletes effortlessly.',
    },
  },
  {
    number: '05',
    title: {
      ar: 'الأثر الواقعي والتحسين المستمر',
      en: 'Real-World Impact & Delivery',
    },
    desc: {
      ar: 'اختبار الحلول في العيادات ومراكز التدريب لضمان تحسين جودة حياة المرضى ورفع كفاءة الرياضيين.',
      en: 'Validating solutions in medical clinics and athletic gyms to measurably improve patient health and athletic performance.',
    },
  },
];

export const TOOLS: ToolItem[] = [
  { name: 'Python', category: 'Language', iconName: 'Terminal', badge: 'Core AI' },
  { name: 'PyTorch', category: 'AI & Deep Learning', iconName: 'Brain', badge: 'Expert' },
  { name: 'TensorFlow', category: 'AI & ML', iconName: 'Cpu' },
  { name: 'OpenCV', category: 'Computer Vision', iconName: 'Eye', badge: 'Vision' },
  { name: 'MediaPipe', category: 'Pose Estimation', iconName: 'Activity', badge: 'Kinematics' },
  { name: 'TypeScript', category: 'Frontend/Web', iconName: 'Code' },
  { name: 'React', category: 'UI Framework', iconName: 'Layout' },
  { name: 'Tailwind CSS', category: 'Design System', iconName: 'Palette' },
  { name: 'Figma', category: 'Design & Prototyping', iconName: 'Figma' },
  { name: 'Clinical Biomechanics', category: 'Medical Domain', iconName: 'HeartPulse', badge: 'Specialty' },
  { name: 'Sports Physio', category: 'Physical Therapy', iconName: 'Sparkles', badge: 'Hands-on' },
  { name: 'Git & GitHub', category: 'Version Control', iconName: 'GitBranch' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: {
      ar: 'رنا تجسد نموذجاً استثنائياً للباحثة الرياضية؛ قدرتها على ترجمة الإحساس الحركي للملاكمة وخبرتها في العلاج الطبيعي إلى معادلات ذكاء اصطناعي دقيقة أمر مبهر ونادر.',
      en: 'Rana embodies a truly rare intersection of high-tier athletic discipline and AI engineering. Her ability to translate boxing kinematics and clinical therapy into neural code is phenomenal.',
    },
    name: 'د. أحمد الشافعي',
    role: {
      ar: 'أستاذ الذكاء الاصطناعي وعلوم الحاسب',
      en: 'Professor of Computer Science & AI',
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote: {
      ar: 'بطلة جمهورية داخل الحلبة، ومهندسة دؤوبة خارجها. انضباط رنا وهدوءها الذهني في التعامل مع التحديات والضغوطات يجعل أي فريق محظوظاً بوجودها.',
      en: 'A champion inside the ring, and a brilliant engineer outside it. Rana\'s mental tranquility, focus under pressure, and work ethic are unmatched.',
    },
    name: 'كابتن محمود درويش',
    role: {
      ar: 'المدير الفني للمنتخب الوطني للملاكمة',
      en: 'Head Coach, National Boxing Team',
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote: {
      ar: 'فهمها العميق للميكانيكا الحيوية والتشريح العضلي يعطيها أفضلية لا يمتلكها 99% من مهندسي الذكاء الاصطناعي عندما يتعلق الأمر بالتقنيات الطبية.',
      en: 'Her deep domain expertise in biomechanics and musculoskeletal anatomy gives her an edge that 99% of conventional AI engineers simply lack in health tech.',
    },
    name: 'د. سارة المنشاوي',
    role: {
      ar: 'استشارية العلاج الطبيعي والطب الرياضي',
      en: 'Consultant in Sports Physiotherapy',
    },
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
];
