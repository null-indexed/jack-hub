// Design note: state is in-memory for the prototype. localStorage attempt wrapped in try/catch.
const STORAGE_KEY = 'jack-hub-status-v1';

const subjects = {
  maths: {
    name: 'Maths',
    board: 'AQA GCSE Mathematics',
    tier: 'Foundation (Set 3)',
    teacher: 'Mr Strzelec',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Maths/Maths-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'Starting the GCSE course. Three-year programme.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'y9-a-1', name: 'Number & calculation', blurb: 'Place value, operations, factors, multiples, primes. Foundation for everything.', scaffold: true },
            { id: 'y9-a-2', name: 'Expressions & formulae', blurb: 'Algebraic notation, simplifying, substituting. Early algebra bridge from KS3.', scaffold: true },
          ]},
          { label: 'Spring', topics: [
            { id: 'y9-s-1', name: 'Angles & 2D shapes', blurb: 'Angle rules, properties of shapes, parallel lines.', scaffold: true },
            { id: 'y9-s-2', name: 'Fractions, decimals, %', blurb: 'Switching between forms, operations on fractions, percentages of amounts.', scaffold: true },
          ]},
          { label: 'Summer', topics: [
            { id: 'y9-u-1', name: 'Straight-line graphs', blurb: 'y = mx + c, plotting, gradient, intercepts. (Confirmed current topic.)', status: 'learning' },
            { id: 'y9-u-2', name: 'Ratio & proportion 1', blurb: 'Sharing in a ratio, direct proportion, scale.', scaffold: true },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Middle of the GCSE course. Topics deepen, past paper practice begins.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'y10-a-1', name: 'Equations & inequalities', blurb: 'Solving linear equations, forming equations from word problems, inequalities on a number line.', scaffold: true },
            { id: 'y10-a-2', name: 'Graphs 1', blurb: 'Linear and quadratic graphs. Interpreting real-life graphs.', scaffold: true },
          ]},
          { label: 'Spring', topics: [
            { id: 'y10-s-1', name: 'Handling data 1', blurb: 'Averages, range, frequency tables, grouped data.', scaffold: true },
            { id: 'y10-s-2', name: 'Probability 1', blurb: 'Theoretical and experimental probability, listing outcomes.', scaffold: true },
          ]},
          { label: 'Summer', topics: [
            { id: 'y10-u-1', name: 'Working in 2D', blurb: 'Area and perimeter of common 2D shapes. Transformations.' },
            { id: 'y10-u-2', name: 'End of Y10 practice exam', blurb: 'Paper 1 for all sciences-style preparation.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Final year. GCSE exam season May-June 2028.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'y11-a-1', name: 'Pythagoras, trigonometry & vectors', blurb: 'Pythagoras and trigonometry before introducing vectors.' },
            { id: 'y11-a-2', name: 'Calculations 2', blurb: 'Roots, indices and standard form combined with the four operations.' },
            { id: 'y11-a-3', name: 'Measures & accuracy', blurb: 'Converting between metric and imperial units. Estimation.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'y11-s-1', name: 'Circles & constructions', blurb: 'Key circle concepts, constructions, then circle theorems for the first time.' },
            { id: 'y11-s-2', name: 'Working in 3D', blurb: 'Volume and surface area of a range of 3D shapes.' },
            { id: 'y11-s-3', name: 'Probability of combined events', blurb: 'Combined event probability using sets, possibility spaces and tree diagrams.' },
            { id: 'y11-s-4', name: 'Sequences', blurb: 'Linear and quadratic sequences used within problem solving.' },
            { id: 'y11-s-5', name: 'Units & proportionality', blurb: 'Rates of change, growth and decay, direct and inverse proportion. Final GCSE chapter.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'y11-u-1', name: 'Graphs 2', blurb: 'Cubic, reciprocal, trigonometric and exponential graphs built on Graphs 1.' },
            { id: 'y11-u-2', name: 'Graphs 3', blurb: 'Advanced graph work.' },
            { id: 'y11-u-3', name: 'Handling data 2', blurb: 'Measures of spread revisited, then representing spread and correlation visually.' },
            { id: 'y11-u-4', name: 'Revision', blurb: 'Full recap of all chapters with additional sessions for those who need them.' },
            { id: 'y11-u-5', name: 'GCSE exams', blurb: 'May-June 2028. AQA Mathematics 8300. Foundation papers 1, 2 and 3.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'AQA GCSE Mathematics 8300 (spec)', url: 'https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300' },
      { label: 'Biddenham Maths curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Maths/Maths-Curriculum-Map.pdf' },
      { label: 'Dr Frost Maths', url: 'https://www.drfrostmaths.com' },
      { label: 'Corbettmaths', url: 'https://corbettmaths.com' },
    ],
  },
  english: {
    name: 'English',
    board: 'AQA GCSE (Language & Literature)',
    tier: 'Both papers',
    teacher: 'Mrs Bartoli Abdou',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/English/English-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'Starting the GCSE course. Language techniques and first set texts.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'eng-y9-a-1', name: 'Language techniques bank', blurb: 'Build a structured bank of techniques (metaphor, simile, pathetic fallacy, etc) with worked examples. This is Belinda\'s immediate priority.' },
            { id: 'eng-y9-a-2', name: 'Reading for Paper 1', blurb: 'Identifying language techniques used by authors in unseen fiction extracts.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'eng-y9-s-1', name: 'Romeo and Juliet (familiarisation read)', blurb: 'First read of the Shakespeare set text. Just to know the shape of the play.' },
            { id: 'eng-y9-s-2', name: 'Writing for Paper 2', blurb: 'Applying language techniques in original writing. Descriptive and narrative tasks.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'eng-y9-u-1', name: 'Jekyll and Hyde (familiarisation)', blurb: '19th-century novel. First read.' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Deepen on set texts, start the poetry anthology.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'eng-y10-a-1', name: 'An Inspector Calls', blurb: 'Modern play. Theme, character, social context.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'eng-y10-s-1', name: 'Power and Conflict poetry', blurb: 'AQA anthology cluster. 15 poems. Comparing effects.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'eng-y10-u-1', name: 'Romeo and Juliet (deep)', blurb: 'Return to Shakespeare for detailed study. Act-by-act.' },
            { id: 'eng-y10-u-2', name: 'Unseen poetry', blurb: 'Developing strategies to analyse unseen poems in depth.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Final year. Revision across all four papers.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'eng-y11-a-1', name: 'Jekyll and Hyde (deep)', blurb: 'Return to the 19th-century novel. Analysing language, form, structure for impact.' },
            { id: 'eng-y11-a-2', name: 'Spoken Language endorsement', blurb: 'Individual presentation. All students complete.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'eng-y11-s-1', name: 'Comparative Poetry', blurb: 'Analysing effects created by language, form, structure. Compare across the cluster.' },
            { id: 'eng-y11-s-2', name: 'Approaches to Language Paper 1', blurb: 'Section A. Analysing writers\' methods.' },
            { id: 'eng-y11-s-3', name: 'Approaches to Language Paper 2', blurb: 'Section B. Expressing a viewpoint clearly.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'eng-y11-u-1', name: 'Full revision', blurb: 'All four texts revisited. Timed practice. Mark scheme analysis.' },
            { id: 'eng-y11-u-2', name: 'GCSE exams', blurb: 'May-June 2028. AQA Language 8700 + Literature 8702.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'AQA GCSE English Language 8700', url: 'https://www.aqa.org.uk/subjects/english/gcse/english-language-8700' },
      { label: 'AQA GCSE English Literature 8702', url: 'https://www.aqa.org.uk/subjects/english/gcse/english-literature-8702' },
      { label: 'Biddenham English curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/English/English-Curriculum-Map.pdf' },
      { label: 'BBC Bitesize KS4 English', url: 'https://www.bbc.co.uk/bitesize/subjects/z3kw2hv' },
    ],
  },
  sciences: {
    name: 'Sciences',
    board: 'OCR Gateway (Triple)',
    tier: 'Biology + Chemistry + Physics',
    teacher: 'Mr Shakoor',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Science/Science-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'KS4 starts here. All three sciences as separate GCSEs.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'sci-y9-a-1', name: 'Biology 1.1 Organelles', blurb: 'What structures are found inside prokaryotes and eukaryotes?' },
            { id: 'sci-y9-a-2', name: 'Chemistry 1.1 Particle model', blurb: 'What does the particle model tell us about solids, liquids and gases?' },
            { id: 'sci-y9-a-3', name: 'Physics 1.1 Particle model', blurb: 'What does the particle model tell us about solids, liquids and gases?' },
          ]},
          { label: 'Spring', topics: [
            { id: 'sci-y9-s-1', name: 'Biology 1.2 DNA & proteins', blurb: 'Making proteins from DNA, using proteins in the human body. Includes career link to genetics and microbiology.' },
            { id: 'sci-y9-s-2', name: 'Chemistry 1.2 Atoms', blurb: "What is an atom and what is its structure? What are isotopes and ions?" },
            { id: 'sci-y9-s-3', name: 'Physics 1.2 Change of state', blurb: 'How do substances change state? What changes occur?' },
            { id: 'sci-y9-s-4', name: 'Biology 1.3 Respiration', blurb: 'What is respiration and does it differ in different organisms? What is anaerobic respiration?' },
          ]},
          { label: 'Summer', topics: [
            { id: 'sci-y9-u-1', name: 'Biology 1.4 Photosynthesis', blurb: 'What is the importance of photosynthesis and why is it a 2-stage process?' },
            { id: 'sci-y9-u-2', name: 'Chemistry 2.1 Acids & alkalis', blurb: 'What are acids and alkalis? How do they react?' },
            { id: 'sci-y9-u-3', name: 'Chemistry 2.2 Pure & impure', blurb: 'What is a pure and impure substance? How can an impure substance be separated?' },
            { id: 'sci-y9-u-4', name: 'Physics 1.3 Pressure', blurb: 'What is pressure and can we use it to our advantage? Career link to forensics and material sciences.' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Deep into the three sciences. End-of-year practice exam Paper 1.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'sci-y10-a-1', name: 'Biology 2.1 Movement between cells', blurb: 'Cell growth and division. (From map.)' },
            { id: 'sci-y10-a-2', name: 'Chemistry 2.3 Structures in chemistry', blurb: 'What different structures exist and why. (From map.)' },
            { id: 'sci-y10-a-3', name: 'Physics 2.2 Newton\'s laws', blurb: 'What was Newton\'s law and how can we apply them? (From map.)' },
          ]},
          { label: 'Spring', topics: [
            { id: 'sci-y10-s-1', name: 'Biology 3 Hormones and nerves', blurb: 'Nervous system, hormones, control in the human body. (From map.)' },
            { id: 'sci-y10-s-2', name: 'Chemistry 4 Chemical reactions', blurb: 'What happens in a chemical reaction. Identifying products. (From map.)' },
            { id: 'sci-y10-s-3', name: 'Physics 2.3 Forces in action', blurb: 'Forces in action and their uses in science. (From map.)' },
          ]},
          { label: 'Summer', topics: [
            { id: 'sci-y10-u-1', name: 'Biology 5 Genes and inheritance', blurb: 'What are genes and how are they inherited? Can this be predicted? (From map.)' },
            { id: 'sci-y10-u-2', name: 'Chemistry 5 Manipulating reactions', blurb: 'Speed them up or change them. Rates and equilibrium. (From map.)' },
            { id: 'sci-y10-u-3', name: 'Physics 4 Magnetism', blurb: 'Magnets and magnetic fields. (From map.)' },
            { id: 'sci-y10-u-4', name: 'End of Y10 Practice Exam', blurb: 'Paper 1 for all three sciences. (From map.)' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Final year. PPEs, revision, GCSE exams May-June 2028.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'sci-y11-a-1', name: 'Biology 4 Ecosystems', blurb: 'What happens in ecosystems? How do organisms interact? (From map.)' },
            { id: 'sci-y11-a-2', name: 'Chemistry 3 Chemical reactions', blurb: 'Different reactions and how to measure them. (From map.)' },
            { id: 'sci-y11-a-3', name: 'Physics 5 Waves and electricity', blurb: 'Waves, electromagnetic spectrum, electrical circuits.', scaffold: true },
          ]},
          { label: 'Spring', topics: [
            { id: 'sci-y11-s-1', name: 'Biology 6 Global crises', blurb: 'Food security, biodiversity loss, population growth. (From map.)' },
            { id: 'sci-y11-s-2', name: 'Chemistry 6 Earth & environment', blurb: 'Global challenges in reactions, earth and environment. (From map.)' },
            { id: 'sci-y11-s-3', name: 'Physics 6 Radioactivity', blurb: 'What is radioactivity? Dangers and uses. (From map.)' },
            { id: 'sci-y11-s-4', name: 'Year 11 PPEs', blurb: 'Practice papers 1 and 2. All three sciences. (From map.)' },
          ]},
          { label: 'Summer', topics: [
            { id: 'sci-y11-u-1', name: 'Full revision', blurb: 'Recap across all three sciences. Past paper practice.' },
            { id: 'sci-y11-u-2', name: 'GCSE exams', blurb: 'May-June 2028. OCR Gateway Biology J247, Chemistry J248, Physics J249. Six papers total for Triple.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'OCR Gateway Biology A J247', url: 'https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-biology-a-j247-from-2016/' },
      { label: 'OCR Gateway Chemistry A J248', url: 'https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-chemistry-a-j248-from-2016/' },
      { label: 'OCR Gateway Physics A J249', url: 'https://www.ocr.org.uk/qualifications/gcse/gateway-science-suite-physics-a-j249-from-2016/' },
      { label: 'Biddenham Science curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Science/Science-Curriculum-Map.pdf' },
      { label: 'Seneca Learning', url: 'https://www.senecalearning.com' },
    ],
  },
  business: {
    name: 'Business',
    board: 'Pearson Edexcel GCSE Business (1BS0)',
    tier: 'GCSE 9-1',
    teacher: 'Miss Walton',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Business-Studies/Business-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'Topic 1.1 Enterprise and entrepreneurship, into Topic 1.2 Spotting a business opportunity. GCSE course begins Y9 under the new 2023 syllabus.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'bus-y9-a-1', name: 'Introductory project', blurb: 'Familiarise with the Business course. The dynamic nature of business, the role of business enterprise.' },
            { id: 'bus-y9-a-2', name: 'Topic 1.1 Enterprise & entrepreneurship', blurb: 'The role of business enterprise, dynamic nature of business, risk and reward, business aims and objectives.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'bus-y9-s-1', name: 'Customer needs', blurb: 'Why understanding customers matters. Types of customer, how businesses meet needs.' },
            { id: 'bus-y9-s-2', name: 'Market research', blurb: 'Purpose and types of research (primary and secondary, qualitative and quantitative).' },
            { id: 'bus-y9-s-3', name: 'Market segmentation', blurb: 'How markets are divided (age, gender, income, lifestyle, location).' },
          ]},
          { label: 'Summer', topics: [
            { id: 'bus-y9-u-1', name: 'Topic 1.2 Spotting a business opportunity', blurb: 'Identifying and understanding customer needs. Market mapping. The competitive environment.' },
            { id: 'bus-y9-u-2', name: 'Risk and reward', blurb: 'Why entrepreneurs take risks. Weighing financial, strategic and personal risk against potential reward.' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Topics 1.3 to 1.5 completing Paper 1 content, then Topic 2.1 begins Paper 2.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'bus-y10-a-1', name: 'Topic 1.3 Putting a business idea into practice', blurb: 'Business aims and objectives. Business revenues, costs and profits. Cash and cash-flow.' },
            { id: 'bus-y10-a-2', name: 'Sources of business finance', blurb: 'Short-term and long-term sources: loans, overdraft, retained profit, share capital, crowdfunding.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'bus-y10-s-1', name: 'Topic 1.4 Making the business effective', blurb: 'The options for start-up and small businesses. Business location. The marketing mix. The business plan.' },
            { id: 'bus-y10-s-2', name: 'Topic 1.5 Understanding external influences on business', blurb: 'Business stakeholders. Technology and business. Legislation and business. The economy and business. External influences.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'bus-y10-u-1', name: 'Topic 2.1 Growing the business', blurb: 'Business growth. Changes in business aims and objectives. Business and globalisation. Ethics, the environment and business.' },
            { id: 'bus-y10-u-2', name: 'Y10 Mock Exams', blurb: 'Paper 1 (Topics 1.1 to 1.5) under exam conditions.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Paper 2 topics 2.2 to 2.5, then revision. GCSE exams May-June 2028.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'bus-y11-a-1', name: 'Topic 2.2 Making marketing decisions', blurb: 'Product, Price, Promotion, Place. Using the marketing mix to make business decisions.' },
            { id: 'bus-y11-a-2', name: 'Topic 2.3 Making operational decisions', blurb: 'Business operations. Working with suppliers. Managing quality. The sales process.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'bus-y11-s-1', name: 'Topic 2.4 Making financial decisions', blurb: 'Business calculations: gross profit, net profit, margins, average rate of return. Understanding business performance.' },
            { id: 'bus-y11-s-2', name: 'Topic 2.5 Making human resource decisions', blurb: 'Organisational structures. Effective recruitment. Effective training and development. Motivation.' },
            { id: 'bus-y11-s-3', name: 'Y11 Mock Exams', blurb: 'Both papers under full exam conditions.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'bus-y11-u-1', name: 'Paper 1 revision and exam technique', blurb: 'Topics 1.1 to 1.5. Investigating small business.' },
            { id: 'bus-y11-u-2', name: 'Paper 2 revision and exam technique', blurb: 'Topics 2.1 to 2.5. Building a business.' },
            { id: 'bus-y11-u-3', name: 'GCSE exams', blurb: 'May-June 2028. Pearson Edexcel Business (1BS0). Two papers, 1 hour 45 minutes each, 90 marks each.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'Pearson Edexcel GCSE Business (1BS0)', url: 'https://qualifications.pearson.com/en/qualifications/edexcel-gcses/business-2017.html' },
      { label: 'Biddenham Business curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Business-Studies/Business-Curriculum-Map.pdf' },
      { label: 'BBC Bitesize Edexcel GCSE Business', url: 'https://www.bbc.co.uk/bitesize/examspecs/zvxwwmn' },
      { label: 'Seneca Learning Edexcel GCSE Business', url: 'https://senecalearning.com' },
      { label: 'Tutor2u Business revision', url: 'https://www.tutor2u.net/business' },
    ],
  },
  rs: {
    name: 'RS',
    board: 'AQA GCSE Religious Studies (compulsory)',
    tier: 'Two lessons per week in KS4',
    teacher: 'Mrs Hussain',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Religious-Studies/Religious-Studies-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'KS3 RS. Themes of life, death, spirituality and Buddhism before GCSE starts in Y10.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'rs-y9-a-1', name: 'What happens when we die?', blurb: 'Range of reasons people give for belief in life after death: religious teachings, near-death experiences, desire for justice. Why is this belief so enduring? Comparing beliefs and teachings about death.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'rs-y9-s-1', name: 'Expressing the spiritual through arts', blurb: 'Range of definitions of spiritual and spirituality. Living a spiritual life. Music and visual arts accessing the spiritual dimension. Students create their own spiritual expression.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'rs-y9-u-1', name: 'The Buddha', blurb: 'Buddha, dharma, Sangha. Key events in the life of the Buddha and how they led to enlightenment. The dharma: key teachings. Buddhist practices of compassion, meditation and vegetarianism.' },
            { id: 'rs-y9-u-2', name: 'God and the Universe', blurb: 'Science and religion. Arguments theists offer for God as Creator. How atheists account for beauty and order. Why some believe/don\'t. Can science and religion both tell the truth about origins?' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'GCSE course begins. Paper 1 content: Christianity and Islam beliefs, teachings and practices.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'rs-y10-a-1', name: 'Christianity Beliefs and Teachings (Paper 1)', blurb: 'Beliefs about God including Trinity, Incarnation, Original Sin, crucifixion, resurrection and life after death.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'rs-y10-s-1', name: 'Christian Practices (Paper 1)', blurb: 'How beliefs impact daily life. Prayer, types of worship. Church in the community (food banks, street pastors). World poverty and Christian Aid. The growth of the Church.' },
            { id: 'rs-y10-s-2', name: 'Islamic Beliefs and Teachings (Paper 1)', blurb: 'Origins of Islam, Prophet Muhammad, other Prophets, beliefs about God and life after death, the Quran. Sunni and Shia denominations.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'rs-y10-u-1', name: 'Islamic Practices (Paper 1)', blurb: 'The five pillars: Shahadah, Salah, Zakah, Sawm, Hajj. Festivals: Eid ul Fitr, Eid ul Adha, Ashura.' },
            { id: 'rs-y10-u-2', name: 'Theme E: Crime and Punishment (Paper 2)', blurb: 'Moral/ethical issues: corporal punishment, capital punishment, reasons for crime, breaking the law, types of punishment, forgiveness.' },
            { id: 'rs-y10-u-3', name: 'Theme D: Peace and Conflict (Paper 2)', blurb: 'Reasons for war, violence, protest, terrorism. Nuclear weapons. Jihad and Just War. Reconciliation and Pacifism.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Final year. Paper 2 themes finished, then revision across both papers.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'rs-y11-a-1', name: 'Theme A: Relationships and Families (Paper 2)', blurb: 'Concept of family and family types, how families have changed. Relationships, sex outside/before marriage. Attitudes to homosexuality, contraception. Views on gender equality.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'rs-y11-s-1', name: 'Theme B: Religion and Life (Paper 2)', blurb: 'Creation, value of the world, use and abuse of animals. Euthanasia, abortion, belief in life after death.' },
            { id: 'rs-y11-s-2', name: 'Paper 1 Revision', blurb: 'Christianity and Islam beliefs, teachings and practices.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'rs-y11-u-1', name: 'Paper 2 Revision', blurb: 'All four themes. Focus on applying knowledge and mastering exam technique.' },
            { id: 'rs-y11-u-2', name: 'GCSE exams', blurb: 'May-June 2028. AQA Religious Studies A 8062. Two papers.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'AQA GCSE Religious Studies A 8062', url: 'https://www.aqa.org.uk/subjects/religious-studies/gcse/religious-studies-a-8062' },
      { label: 'Biddenham RS curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Religious-Studies/Religious-Studies-Curriculum-Map.pdf' },
      { label: 'BBC Bitesize AQA GCSE RS', url: 'https://www.bbc.co.uk/bitesize/examspecs/zb48q6f' },
    ],
  },
  dt: {
    name: 'DT',
    board: 'Pearson Edexcel GCSE Design and Technology',
    tier: 'Practical + theory, mostly practical early',
    teacher: 'Mr Loveland',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Design-Technology/Design-Technology-Curriculum-Map.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'Practical skills year: wooden boxes, metal skills, electronics and graphical drawing. Rubreka dashboard shows current unit 1.8 Metals.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'dt-y9-a-1', name: 'Wooden Boxes', blurb: 'Rebate joints, dovetail joints, laminating, vacuum bag press, finishing, laser cutter.' },
            { id: 'dt-y9-a-2', name: 'Graphical Drawing', blurb: 'Learn technical drawing techniques: rendering, graphical isometric, graphical orthographic.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'dt-y9-s-1', name: 'Metal Skills', blurb: 'Marking out, centre punching, drilling, sawing and filing, smoothing, turning, heat treatment.', status: 'learning' },
            { id: 'dt-y9-s-2', name: 'Electronics', blurb: 'Soldering, problem solving, speaker circuit, LED circuit. Learn how to solder.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'dt-y9-u-1', name: 'Trip to Silverstone Interactive Museum', blurb: 'Y9 educational trip.' },
            { id: 'dt-y9-u-2', name: 'Integrating practical skills', blurb: 'Preparation for Y10 speaker boxes: bringing wood, metal and electronics together.' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Big practical project, practice NEA and Y10 mocks.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'dt-y10-a-1', name: 'Speaker Boxes', blurb: 'Bring all practical aspects together: wooden speaker box, electronic speaker circuit, turn feet on lathe, laser cutter for lid.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'dt-y10-s-1', name: 'Practice NEA (Coursework)', blurb: 'All aspects of the NEA: Investigate, Design, Manufacture, Evaluate. Learn how to complete the paperwork.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'dt-y10-u-1', name: 'Y10 Mock Exams', blurb: 'Complete Y10 mocks to get GCSE ready.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'NEA (coursework) and exam theory. GCSE exams May-June 2028.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'dt-y11-a-1', name: 'Trip: New Designers Exhibition', blurb: 'Y11 educational trip.' },
            { id: 'dt-y11-a-2', name: 'NEA full version', blurb: 'Investigate: context, existing products, client, brief, specification. Design: initial ideas, development, modelling, plan of manufacture. Manufacture: quality, accuracy, materials, finish. Evaluate: LCA, user review, modifications.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'dt-y11-s-1', name: 'Exam Theory', blurb: 'New and emerging technologies. Energy storage and production. Systems. Smart Materials and composites. Materials: timbers, papers and boards, metals, textiles, electronics. Exam technique.' },
            { id: 'dt-y11-s-2', name: 'Y11 Mock Exams', blurb: 'Revise for and sit Y11 mocks.' },
            { id: 'dt-y11-s-3', name: 'Exam Question Technique', blurb: 'Learn how to answer DT specific exam questions. Workshop time to produce models and practical project.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'dt-y11-u-1', name: 'GCSE exams', blurb: 'May-June 2028. Pearson Edexcel Design and Technology (1DT0). Written paper plus NEA.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'Pearson Edexcel GCSE Design and Technology (1DT0)', url: 'https://qualifications.pearson.com/en/qualifications/edexcel-gcses/design-and-technology-2017.html' },
      { label: 'Biddenham DT curriculum map (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Design-Technology/Design-Technology-Curriculum-Map.pdf' },
      { label: 'Rubreka dashboard (login required)', url: 'https://rubreka.com/student-dashboard' },
    ],
  },
  it: {
    name: 'IT',
    board: 'Pearson BTEC Tech Award in Digital Information Technology',
    tier: 'Coursework-heavy, exam-light',
    teacher: 'Mrs Cadman',
    curriculumMap: 'https://biddenham.beds.sch.uk/docs/Departments/Information-Technology/ICT-Curriculum-Journey.pdf',
    years: [
      {
        name: 'Year 9',
        current: true,
        caption: 'Start KS4 BTEC. Component 2 (Excel): data, processing, dashboards.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'it-y9-a-1', name: 'Advanced spreadsheets', blurb: 'Functions, lookups, linked sheets.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'it-y9-s-1', name: 'Analyse and present', blurb: 'Charts, conclusions, review.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'it-y9-u-1', name: 'Component 2 PSA', blurb: 'Summer 1 internal assessment. Produce a project-based assessment on Excel skills.' },
          ]},
        ]
      },
      {
        name: 'Year 10',
        caption: 'Component 1 (UI design) and Component 3 Exam prep.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'it-y10-a-1', name: 'Plan and prototype', blurb: 'Project planning. PowerPoint prototyping.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'it-y10-s-1', name: 'Component 1 UI', blurb: 'Audience, design, accessibility. User interface design for a specific audience.' },
            { id: 'it-y10-s-2', name: 'Develop and review', blurb: 'Build, test, evaluate.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'it-y10-u-1', name: 'Component 1 PSA', blurb: 'April PSA, then independent UI project.' },
            { id: 'it-y10-u-2', name: 'Component 3 Exam prep', blurb: 'Planning, synoptic retrieval, mocks.' },
          ]},
        ]
      },
      {
        name: 'Year 11',
        caption: 'Component 3 external exam content. BTEC awarded by all three components.',
        terms: [
          { label: 'Autumn', topics: [
            { id: 'it-y11-a-1', name: 'Modern technologies', blurb: 'Cloud, collaboration, impact of modern technologies on individuals and organisations.' },
          ]},
          { label: 'Spring', topics: [
            { id: 'it-y11-s-1', name: 'Cyber security', blurb: 'Threats, protection, policy.' },
            { id: 'it-y11-s-2', name: 'Wider implications', blurb: 'Responsible, legal and ethical use of technology.' },
          ]},
          { label: 'Summer', topics: [
            { id: 'it-y11-u-1', name: 'Component 3 Exam', blurb: 'May-June 2028. Pearson BTEC Tech Award in DIT external component.' },
          ]},
        ]
      },
    ],
    resources: [
      { label: 'Pearson BTEC Tech Award in DIT', url: 'https://qualifications.pearson.com/en/qualifications/btec-tech-awards/digital-information-technology.html' },
      { label: 'Biddenham ICT curriculum journey (PDF)', url: 'https://biddenham.beds.sch.uk/docs/Departments/Information-Technology/ICT-Curriculum-Journey.pdf' },
    ],
  },
};

// Load persisted status
let statusMap = {};
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) statusMap = JSON.parse(raw);
} catch (e) {}

function saveStatus() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap)); } catch (e) {}
}

function getStatus(id, fallback) {
  return statusMap[id] || fallback || 'none';
}

function setStatus(id, status) {
  if (status === 'none') delete statusMap[id];
  else statusMap[id] = status;
  saveStatus();
}

// Render subject tabs
const tabsEl = document.getElementById('subjectTabs');
Object.keys(subjects).forEach((key, i) => {
  const btn = document.createElement('button');
  btn.className = 'subject-pill';
  btn.setAttribute('role', 'tab');
  btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  btn.dataset.subject = key;
  btn.textContent = subjects[key].name;
  btn.addEventListener('click', () => selectSubject(key));
  tabsEl.appendChild(btn);
});

const mainEl = document.getElementById('main');
const detailEl = document.getElementById('detail');
let currentSubject = 'maths';
let currentTopicId = null;
let currentView = 'all';
try {
  const savedView = localStorage.getItem('jack-hub-view');
  if (savedView === 'y9') currentView = 'y9';
} catch (e) {}

// Exam countdown. AQA/OCR/Edexcel GCSE exams typically start mid-May.
// Using 11 May 2028 as the first-exam anchor (adjust when timetable is published).
function updateCountdown() {
  const target = new Date('2028-05-11T09:00:00Z');
  const now = new Date();
  const diffMs = target - now;
  const days = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  const el = document.getElementById('examCountdown');
  if (el) el.textContent = days > 0 ? days + ' days to GCSEs' : 'GCSEs now';
}
updateCountdown();

// View toggle
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.setAttribute('aria-pressed', btn.dataset.view === currentView ? 'true' : 'false');
  btn.addEventListener('click', () => {
    currentView = btn.dataset.view;
    document.querySelectorAll('.view-btn').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.view === currentView ? 'true' : 'false');
    });
    try { localStorage.setItem('jack-hub-view', currentView); } catch (e) {}
    renderSubject();
  });
});

function selectSubject(key) {
  currentSubject = key;
  document.querySelectorAll('.subject-pill').forEach(p => {
    p.setAttribute('aria-selected', p.dataset.subject === key ? 'true' : 'false');
  });
  detailEl.hidden = true;
  currentTopicId = null;
  renderSubject();
}

function renderSubject() {
  const s = subjects[currentSubject];
  mainEl.innerHTML = '';

  // Meta header
  const meta = document.createElement('section');
  meta.className = 'subject-meta';
  meta.innerHTML = `
    <div class="meta-item">
      <div class="meta-label">Exam board</div>
      <div class="meta-value">${s.board}</div>
    </div>
    ${s.tier ? `<div class="meta-item"><div class="meta-label">Tier</div><div class="meta-value">${s.tier}</div></div>` : ''}
    <div class="meta-item">
      <div class="meta-label">Teacher</div>
      <div class="meta-value">${s.teacher}</div>
    </div>
    ${s.curriculumMap ? `<div class="meta-item"><div class="meta-label">School map</div><div class="meta-value"><a href="${s.curriculumMap}" target="_blank" rel="noopener">Open PDF</a></div></div>` : ''}
  `;
  mainEl.appendChild(meta);

  if (s.placeholder) {
    const ph = document.createElement('div');
    ph.className = 'placeholder';
    ph.innerHTML = `
      <div class="placeholder-title">${s.name} map coming</div>
      <div>${s.placeholder}</div>
    `;
    mainEl.appendChild(ph);
    return;
  }

  // Progress strip (scoped to currently visible years)
  const scopedYears = currentView === 'y9'
    ? s.years.filter(y => y.name === 'Year 9')
    : s.years;
  const allTopics = scopedYears.flatMap(y => y.terms.flatMap(t => t.topics));
  const total = allTopics.length;
  const done = allTopics.filter(t => getStatus(t.id, t.status) === 'done').length;
  const learning = allTopics.filter(t => getStatus(t.id, t.status) === 'learning').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const strip = document.createElement('div');
  strip.className = 'progress-strip';
  strip.innerHTML = `
    <div class="progress-stat">
      <div class="progress-num done">${done}</div>
      <div class="progress-label">Done</div>
    </div>
    <div class="progress-divider"></div>
    <div class="progress-stat">
      <div class="progress-num learning">${learning}</div>
      <div class="progress-label">Learning</div>
    </div>
    <div class="progress-divider"></div>
    <div class="progress-stat">
      <div class="progress-num">${total - done - learning}</div>
      <div class="progress-label">To do</div>
    </div>
    <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
  `;
  mainEl.appendChild(strip);

  // Years (filtered by view)
  const visibleYears = currentView === 'y9'
    ? s.years.filter(y => y.name === 'Year 9')
    : s.years;
  const yearsEl = document.createElement('div');
  yearsEl.className = 'years';
  visibleYears.forEach(year => {
    const yEl = document.createElement('section');
    yEl.className = 'year' + (year.current ? ' current' : '');
    const head = document.createElement('header');
    head.className = 'year-head';
    head.innerHTML = `
      <div class="year-name">${year.name}</div>
      <div class="year-caption">${year.caption || ''}</div>
      ${year.current ? '<div class="year-badge">You are here</div>' : ''}
    `;
    yEl.appendChild(head);

    const terms = document.createElement('div');
    terms.className = 'terms';
    year.terms.forEach(term => {
      const tEl = document.createElement('div');
      tEl.className = 'term';
      const label = document.createElement('div');
      label.className = 'term-label';
      label.textContent = term.label;
      const chips = document.createElement('div');
      chips.className = 'chips';
      term.topics.forEach(topic => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.dataset.status = getStatus(topic.id, topic.status);
        chip.innerHTML = `<span class="chip-dot"></span><span>${topic.name}</span>`;
        chip.addEventListener('click', () => openDetail(topic));
        chips.appendChild(chip);
      });
      tEl.appendChild(label);
      tEl.appendChild(chips);
      terms.appendChild(tEl);
    });
    yEl.appendChild(terms);
    yearsEl.appendChild(yEl);
  });
  mainEl.appendChild(yearsEl);
}

function openDetail(topic) {
  currentTopicId = topic.id;
  const s = subjects[currentSubject];
  const status = getStatus(topic.id, topic.status || 'none');
  detailEl.innerHTML = `
    <button class="detail-close" aria-label="Close" onclick="document.getElementById('detail').hidden=true">×</button>
    <div class="detail-eyebrow">${s.name} · Topic</div>
    <h2>${topic.name}</h2>
    <p class="detail-blurb">${topic.blurb || ''}${topic.scaffold ? ' <em style="color:var(--ink-dim)">(To confirm with teacher.)</em>' : ''}</p>
    <div class="detail-actions">
      <button class="status-btn" data-status="none" aria-pressed="${status === 'none'}">Not started</button>
      <button class="status-btn" data-status="learning" aria-pressed="${status === 'learning'}">Learning</button>
      <button class="status-btn" data-status="done" aria-pressed="${status === 'done'}">Done</button>
    </div>
    <div class="detail-resources">
      <div class="resource-label">Resources for ${s.name}</div>
      <ul class="resource-list">
        ${(s.resources || []).map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.label}</a></li>`).join('')}
      </ul>
    </div>
  `;
  detailEl.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setStatus(topic.id, btn.dataset.status);
      renderSubject();
      openDetail(topic);
    });
  });
  detailEl.hidden = false;
  detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Theme toggle
const toggleEl = document.getElementById('themeToggle');
let savedTheme = null;
try { savedTheme = localStorage.getItem('jack-hub-theme'); } catch (e) {}
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
toggleEl.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : current === 'light' ? '' : 'dark';
  if (next) document.documentElement.setAttribute('data-theme', next);
  else document.documentElement.removeAttribute('data-theme');
  try { localStorage.setItem('jack-hub-theme', next); } catch (e) {}
});

// Boot
selectSubject('maths');
