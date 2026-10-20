/* ================================================================
   수정 안내
   1. 아래 문자열만 바꾸면 화면의 문구가 바뀝니다.
   2. 미디어 교체: src와 poster의 assets/... 파일 경로를 바꾸세요.
   3. type은 image / gif / video 중 하나입니다.
   4. scale은 작은 미리보기의 확대 배율입니다. 확대 창은 원본 전체를 보여줍니다.
   5. tiles 배열의 순서를 바꾸면 연구 그림의 순서가 바뀝니다.
   6. 개별 축의 색상은 color, tint에서 수정합니다.
   별도 설치/빌드 없이 저장 후 index.html을 새로고침하면 됩니다.
   ================================================================ */

window.LAB_CONTENT = {
  title: "Dynamics for Mechanical Engineering",
  footer: "Hyuk Lee · 홍익대학교 기계시스템디자인공학과",
  playOnLoad: true,

  axes: [
    {
      id: "dynamics",
      number: "01",
      scale: "Component",
      action: "Design",
      title: "Dynamics",
      subtitle: "동적 거동을 고려한 기계요소 설계·해석",
      color: "#65813e",
      tint: "#f4f7ef",
      description: "기계요소와 구조물의 동적 거동을 분석하고, 진동·충격 및 파동 전달 특성을 고려한 설계·제어 기술을 연구합니다.",
      keywords: ["Mechanical Metamaterials", "Wave Physics", "Shock and Vibration"],
      rowSizes: "1.15fr 1.15fr 1fr",
      tiles: [
        {
          id: "metamaterials",
          title: "Mechanical Metamaterials",
          description: "메타구조체 설계·해석 및 3D 프린터를 활용한 제작 예시입니다.",
          columns: "1.35fr .65fr .65fr 1.35fr",
          media: [
            { type: "image", src: "assets/CMM_unit_cell.png", alt: "CMM 단위 셀 구조와 동특성 개념도", label: "CMM unit cell" },
            { type: "gif", src: "assets/metamaterial-mode-a.gif", poster: "assets/metamaterial-mode-a-poster.png", alt: "메타물질 단위 셀의 첫 번째 변형 모드", label: "Mode A", scale: 2.1 },
            { type: "gif", src: "assets/metamaterial-mode-b.gif", poster: "assets/metamaterial-mode-b-poster.png", alt: "메타물질 단위 셀의 두 번째 변형 모드", label: "Mode B", scale: 2.05 },
            { type: "image", src: "assets/Metastructure_unit_cell.png", alt: "메타구조 단위 셀 실물 사진", label: "Metastructure unit cell" }
          ]
        },
        {
          id: "wave-physics",
          title: "Wave Physics",
          description: "FEM을 활용한 파동물리 해석 예시입니다.",
          columns: "1fr 1fr 1fr",
          media: [
            { type: "gif", src: "assets/periodic-wave-a.gif", poster: "assets/periodic-wave-a-poster.png", alt: "주기 구조 A의 파동 응답", label: "Periodic wave A", scale: 1.7 },
            { type: "gif", src: "assets/periodic-wave-b.gif", poster: "assets/periodic-wave-b-poster.png", alt: "주기 구조 B의 파동 응답", label: "Periodic wave B", scale: 1.8 },
            { type: "gif", src: "assets/crack.gif", alt: "균열 주변의 파동 전달 특성", label: "Crack", scale: 1.15 }
          ]
        },
        {
          id: "shock-vibration",
          title: "Shock and Vibration",
          description: "시스템 충격 거동 in-house 코드 개발(좌) 및 메타구조체 기반 진동 shaker 시험(우) 예시입니다.",
          columns: "1fr 1fr",
          media: [
            { type: "video", src: "assets/shock_analysis_code.mp4", alt: "충격 해석 코드 실행 영상", label: "Shock analysis code" },
            { type: "video", src: "assets/Shock_metastructure.mp4", alt: "메타구조의 충격 응답 영상", label: "Shock metastructure" }
          ]
        }
      ]
    },
    {
      id: "multiphysics",
      number: "02",
      scale: "System",
      action: "Diagnose",
      title: "Multiphysics & AI",
      subtitle: "시스템 상태진단",
      color: "#a85758",
      tint: "#fbf2f1",
      description: "다중물리 해석과 센서 융합, 인공지능을 활용하여 시스템의 상태를 진단하고 이상 징후를 감지·예측하는 기술을 연구합니다.",
      keywords: ["Sensor Fusion", "Vision AI", "Multiphysics Analysis", "System Diagnosis AI"],
      rowSizes: "1fr 1fr 1fr 1fr",
      tiles: [
        {
          id: "sensor-fusion",
          title: "Sensor Fusion",
          description: "다중 비전센서 HW 설계·제작 및 취득 정보 예시입니다.",
          columns: ".65fr 1.35fr",
          media: [
            { type: "image", src: "assets/sensor-hardware.png", alt: "센서 융합 장치", label: "Sensor hardware" },
            { type: "image", src: "assets/multimodal-sensing.png", alt: "IR, RGB, LiDAR의 관측 정보", label: "IR · RGB · LiDAR" }
          ]
        },
        {
          id: "vision-ai",
          title: "Vision AI",
          description: "Vision 센서 기반 AI 알고리즘을 활용한 객체 탐지 및 추적 예시입니다.",
          media: [
            { type: "video", src: "assets/fire-detection-vision.mp4", poster: "assets/fire-detection-vision-poster.jpg", alt: "영상 기반 화재 감지 실험", label: "Fire detection" },
            { type: "video", src: "assets/AI_tracking.mp4", alt: "AI 기반 객체 추적 영상", label: "AI tracking" }
          ]
        },
        {
          id: "multiphysics-analysis",
          title: "Multiphysics Analysis",
          description: "다물리 시스템(예: 배터리) 모델링 및 열폭주 시험 결과 예시입니다.",
          media: [
            { type: "image", src: "assets/Multi-physics_battery_TR.png", alt: "배터리 다중물리 모델", label: "Multiphysics model" },
            { type: "video", src: "assets/battery_TR.mp4", alt: "배터리 과도 응답 해석 영상", label: "Transient response" }
          ]
        },
        {
          id: "diagnosis-ai",
          title: "System Diagnosis AI",
          description: "AI를 활용한 시스템(예: 배터리) 건전성 진단 예시입니다.",
          media: [
            { type: "image", src: "assets/diagnosis-ai.png", alt: "초음파 신호의 학습과 배터리 상태 추정 흐름", label: "Signal representation & learning" }
          ]
        }
      ]
    },
    {
      id: "physical-ai",
      number: "03",
      scale: "Platform",
      action: "Control / Operate",
      title: "Physical AI",
      subtitle: "플랫폼 제어·운용",
      color: "#277f9c",
      tint: "#eff7fa",
      description: "인공지능 기반 제어를 활용한 시스템의 자율 대응 및 운용 최적화 기술을 연구합니다.",
      keywords: ["Automation", "AI & Control"],
      rowSizes: "1fr 1fr",
      tiles: [
        {
          id: "automation-control",
          title: "Automation",
          description: "자동화 시스템 설계·제작 및 현장 적용 예시입니다.",
          media: [
            { type: "video", src: "assets/automated-testbed.mp4", poster: "assets/automated-testbed-poster.jpg", alt: "자동화된 실험 장치 영상", label: "Automation" },
            { type: "video", src: "assets/nozzle-control.mp4", poster: "assets/nozzle-control-poster.jpg", alt: "소화방수총 구동 및 제어 영상", label: "Control" }
          ]
        },
        {
          id: "reinforcement-learning",
          title: "AI & Control",
          description: "AI 기반 제어 알고리즘 개발 및 실험적 구현 모습 예시입니다.",
          media: [
            { type: "video", src: "assets/reinforcement-learning-simulation.mp4", poster: "assets/reinforcement-learning-simulation-poster.jpg", alt: "강화학습 제어 시뮬레이션", label: "Simulation" },
            { type: "video", src: "assets/reinforcement-learning-experiment.mp4", poster: "assets/reinforcement-learning-experiment-poster.jpg", alt: "강화학습 기반 조준 제어 실험", label: "Experiment" }
          ]
        }
      ]
    }
  ]
};
