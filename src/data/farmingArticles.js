export const FARMING_CATEGORIES = [
  { id: 'All', nameEn: 'All Topics', nameHi: 'सभी विषय' },
  { id: 'Machinery Selection', nameEn: 'Machinery Selection', nameHi: 'मशीनरी चयन' },
  { id: 'Soil Management', nameEn: 'Soil & Field Preparation', nameHi: 'मृदा एवं जुताई' },
  { id: 'Sowing & Planting', nameEn: 'Sowing & Seed Drills', nameHi: 'बुवाई एवं सीड ड्रिल' },
  { id: 'Irrigation', nameEn: 'Water Management', nameHi: 'सिंचाई एवं जल प्रबंधन' },
  { id: 'Nutrient Management', nameEn: 'Nutrient & Fertilizer', nameHi: 'उर्वरक एवं पोषण प्रबंधन' },
  { id: 'Integrated Pest Management', nameEn: 'Pest & Crop Protection', nameHi: 'कीट एवं फसल सुरक्षा' },
  { id: 'Harvesting', nameEn: 'Harvest & Post-Harvest', nameHi: 'कटाई एवं भंडारण' },
  { id: 'Farm Safety', nameEn: 'Machinery Safety', nameHi: 'मशीनरी सुरक्षा' },
  { id: 'Maintenance', nameEn: 'Preventive Maintenance', nameHi: 'यंत्र रखरखाव' },
  { id: 'Government Schemes', nameEn: 'Govt Schemes & Subsidies', nameHi: 'सरकारी योजनाएं' }
];

export const ALL_FARMING_ARTICLES = [
  {
    id: 'art-1',
    slug: 'choosing-right-tractor-horsepower',
    title: 'Choosing the Right Tractor HP for Your Acreage & Soil Type',
    titleHi: 'अपनी जमीन और मिट्टी के अनुसार सही ट्रैक्टर का चयन कैसे करें',
    category: 'Machinery Selection',
    categoryHi: 'मशीनरी चयन',
    seasonContext: 'Pre-Season Planning (All Seasons)',
    seasonContextHi: 'सत्र-पूर्व तैयारी (सभी मौसम)',
    readTime: '4 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'ICAR - Central Institute of Agricultural Engineering (CIAE), Bhopal',
    summary: 'A complete breakdown of horsepower classes (35 HP to 65 HP) required for black cotton vs sandy loam soils and implement compatibility.',
    summaryHi: 'काली मिट्टी और बलुई मिट्टी के लिए 35 HP से 65 HP तक के सही ट्रैक्टर और उपकरणों की अनुकूलता की पूरी गाइड।',
    practicalSteps: [
      'Assess Soil Draft: Heavy black cotton soils of MP, Maharashtra, and Gujarat exert 40% higher resistance than alluvial soils. Choose at least 45–50 HP for 36–42 blade rotavators.',
      'Check PTO Power Rating: Standard implement speeds require 540 RPM at engine speed. Ensure PTO horsepower is at least 85% of total rated engine horsepower.',
      'Evaluate Dual Clutch & Transmission: Opt for dual-clutch transmission if you intend to run PTO-driven implements like rotavators, round balers, and thresher units without stopping the wheels.',
      'Tire Ballasting: For heavy MB ploughing and subsoiling, fill rear tires with 75% water-glycol solution or cast iron weights to minimize wheel slippage below 15%.'
    ],
    safetyPrecautions: 'Never exceed the maximum gross tractor weight rating specified on the manufacturer serial plate. Ensure PTO master shields are bolted securely.',
    content: `
### Key Guidelines for Tractor Horsepower (HP) Selection

Selecting the proper tractor horsepower is essential for diesel fuel economy, operational speed, and implement longevity.

1. **Under 25–35 HP (Small Farms, 1–5 Acres):**
   - Ideal for orchards, sugarcane inter-row tillage, horticulture, and 5–7 tine cultivators.
   - Exceptionally low fuel consumption (1.8 to 2.4 Litres per hour).

2. **35–45 HP (Medium Farms, 5–15 Acres):**
   - The most common and versatile class across Indian agriculture.
   - Efficiently operates 36-blade rotary tillers, 9-tine spring cultivators, 2-bottom mouldboard ploughs, and 5-ton haulage trailers.

3. **50–65 HP (Heavy Soil, Custom Hiring & 15+ Acres):**
   - Necessary for deep summer subsoiling in black cotton soils, 42-blade heavy rotavators, precision laser levelers, and tractor-driven combine harvesters.
   - Dual-clutch, multi-speed reverse PTO, and auxiliary spool valves are strongly advised.

> **Agronomist Advisory:** Always match the implement input gearbox rating to the tractor PTO output. Consulting your local Krishi Vigyan Kendra (KVK) will help assess specific draft resistance for your village cluster.
    `
  },
  {
    id: 'art-2',
    slug: 'summer-deep-ploughing-soil-management',
    title: 'Summer Deep Ploughing: Moisture Conservation & Pest Eradication',
    titleHi: 'ग्रीष्मकालीन गहरी जुताई: नमी संरक्षण और प्राकृतिक कीट नियंत्रण',
    category: 'Soil Management',
    categoryHi: 'मृदा एवं जुताई',
    seasonContext: 'Zaid / Summer (May - June)',
    seasonContextHi: 'ग्रीष्मकालीन (मई - जून)',
    readTime: '4 min read',
    lastReviewed: 'September 2026',
    sourceRef: 'State Agricultural Extension Services & ICAR Soil Sciences',
    summary: 'Why mouldboard (MB) ploughing during peak summer destroys weed rhizomes and insect pupae naturally using solar radiation.',
    summaryHi: 'मई-जून में मोल्डबोर्ड (MB) हल से गहरी जुताई क्यों जरूरी है और यह खरपतवार व कीटों को प्राकृतिक रूप से कैसे खत्म करती है।',
    practicalSteps: [
      'Timing: Conduct ploughing immediately following Rabi harvest (late April to May) while residual root moisture facilitates soil turning.',
      'Depth: Maintain ploughing depth between 20 cm and 25 cm using a reversible 2-bottom or 3-bottom MB Plough.',
      'Furrow Orientation: Plough across the natural field slope (along contour lines) to catch early pre-monsoon precipitation and retard surface erosion.',
      'Rest Period: Leave soil clods open to the intense sun for 20–30 days. Do not harrow immediately; let birds feed on exposed soil grubs and let ultraviolet rays sterilize weed seeds.'
    ],
    safetyPrecautions: 'Ensure stabilizer chains on the tractor 3-point linkage are pinned correctly to eliminate implement side-sway while turning at headlands.',
    content: `
### Agronomic Benefits of Summer Tillage

Conducting deep summer tillage offers irreplaceable soil conditioning advantages without chemical inputs:

1. **Solarization of Pests:**
   - Overwintering pupae of destructive pests (such as pod borer, cutworm, and white grub) are brought to the hot surface layer where ground temperatures exceed 45°C.

2. **Perennial Weed Control:**
   - Deep root systems and rhizomes of noxious weeds like Kans (Saccharum spontaneum) and Motha (Cyperus rotundus) desiccate under direct sun exposure.

3. **Moisture Infiltration Profile:**
   - Hard tractor pans created by continuous shallow rotavating are broken, allowing monsoon downpours to penetrate the subsoil rather than washing away as muddy surface runoff.
    `
  },
  {
    id: 'art-3',
    slug: 'precision-seed-drill-calibration',
    title: 'Seed-cum-Fertilizer Drill & Super Seeder Calibration',
    titleHi: 'सीड ड्रिल और सुपर सीडर: सटीक बुवाई और उर्वरक समायोजन',
    category: 'Sowing & Planting',
    categoryHi: 'बुवाई एवं सीड ड्रिल',
    seasonContext: 'Kharif & Rabi Sowing Windows',
    seasonContextHi: 'खरीफ एवं रबी बुवाई समय',
    readTime: '5 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'Punjab Agricultural University (PAU) & ICAR-IIWBR Karnal',
    summary: 'Step-by-step field calibration for fluted roller metering mechanisms to achieve uniform plant density and avoid seed wastage.',
    summaryHi: 'यूनिफॉर्म बीज दर, सही दूरी और रासायनिक खाद से बीज के बचाव के लिए सीड ड्रिल कैलिब्रेशन की संपूर्ण विधि।',
    practicalSteps: [
      'Jack Up the Drive Wheel: Jack up the ground wheel of the drill and measure its circumference in metres.',
      'Calculate Test Rotations: Determine how many wheel rotations cover 1/100th of an acre (approximately 40.5 m²).',
      'Collect and Weigh: Place catch pans under all boot tubes, turn the wheel manually for the test rotation count, and weigh the collected seed on a digital scale.',
      'Fertilizer Depth Gap: Ensure fertilizer furrow openers deposit granules 3–4 cm deeper and 2–3 cm to the side of the seed drop to prevent chemical germination burn.'
    ],
    safetyPrecautions: 'Never reach into the seed or fertilizer hopper with bare hands while the tractor engine is running or PTO is turning.',
    content: `
### Maximizing Germination Rate with Seed Drills

Proper seed placement at uniform depth and row-to-row spacing directly boosts field germination by 15–20% and prevents costly re-sowing.

1. **Zero-Till Drill & Happy Seeder:**
   - Designed for sowing wheat directly into combine-harvested paddy residue without burning stubble.
   - Retains soil moisture, prevents air pollution, and saves approximately ₹1,800–2,200/acre in diesel tillage costs.

2. **Precision Pneumatic Planters:**
   - Essential for hybrid maize and soybean where uniform plant geometry maximizes canopy sunlight interception and pod formation.
    `
  },
  {
    id: 'art-4',
    slug: 'water-management-laser-land-leveling',
    title: 'Laser Land Leveling: Saving 25% Irrigation Water & Boosting Uniformity',
    titleHi: 'लेजर लैंड लेवलर: 25% पानी की बचत और समान फसल पैदावार',
    category: 'Irrigation',
    categoryHi: 'सिंचाई एवं जल प्रबंधन',
    seasonContext: 'Pre-Sowing Field Preparation',
    seasonContextHi: 'बुवाई-पूर्व खेत तैयारी',
    readTime: '4 min read',
    lastReviewed: 'August 2026',
    sourceRef: 'Central Soil Salinity Research Institute (CSSRI) & ICAR',
    summary: 'How millimeter-accurate field leveling eliminates low waterlogged patches, speeds up irrigation advance, and cuts pumping electricity.',
    summaryHi: 'खेत को लेजर तकनीक से समतल कर जलभराव रोकना, सिंचाई का समय घटाना और बिजली व डीजल की बड़ी बचत।',
    practicalSteps: [
      'Topographic Survey: Mount the laser transmitter on a sturdy tripod in the center of the field. Drive the tractor with receiver mast across a grid to identify highs and lows.',
      'Field Moisture: Ensure soil is friable and dry; never operate a laser leveler in damp soil as heavy soil balling distorts blade scraping.',
      'Scraping Sequence: Level the highest humps first and pull surplus earth into the depressions until the control box indicates zero grade tolerance.',
      'Check Slope: For flood or furrow irrigation, maintain a mild slope of 0.05% to 0.1% to guarantee rapid drainage during heavy monsoon cloudbursts.'
    ],
    safetyPrecautions: 'Do not stare directly into the class 2/3 laser transmitter beam. Anchor the tripod legs firmly against wind gusts.',
    content: `
### The Compounding Payoff of Precision Leveling

Uneven fields result in over-watering of low spots (causing root rot and nitrogen leaching) and underwatering of mounds (causing stunted growth).

1. **Irrigation Efficiency:** Water advances across laser-leveled furrows 30% faster, cutting tubewell pumping hours significantly.
2. **Fertilizer Utilization:** Dissolved urea and micronutrients distribute evenly across the root zone rather than gathering in waterlogged corners.
3. **Re-leveling Frequency:** A professional laser leveling operation remains effective for 3 to 4 cropping cycles under normal tillage practices.
    `
  },
  {
    id: 'art-5',
    slug: 'nutrient-fertilizer-equipment-management',
    title: 'Mechanized Fertilizer Placement: Broadcasters vs Seed-Cum-Drills',
    titleHi: 'उर्वरक प्रबंधन: ब्रॉडकास्टर बनाम सीड-कम-ड्रिल का सही उपयोग',
    category: 'Nutrient Management',
    categoryHi: 'उर्वरक एवं पोषण प्रबंधन',
    seasonContext: 'Basal & Top-Dressing Schedules',
    seasonContextHi: 'बुवाई एवं टॉप ड्रेसिंग के समय',
    readTime: '4 min read',
    lastReviewed: 'September 2026',
    sourceRef: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    summary: 'Scientific placement of Nitrogen (N), Phosphorus (P), and Potassium (K) using tractor-mounted spinning disc broadcasters and sub-surface drills.',
    summaryHi: 'रासायनिक खादों की बर्बादी रोकने, संतुलित पोषण और सही गहराई पर खाद डालने के व्यावहारिक नियम।',
    practicalSteps: [
      'Soil Health Card Consultation: Base basal NPK application on your local KVK soil test report rather than generalized habits.',
      'Sub-Surface Basal Placement: Always place DAP/Single Super Phosphate at a depth of 5–7 cm below soil surface near seed zones using a drill. Surface broadcasting of phosphorus results in 40% fixation and zero root availability.',
      'Broadcaster Vane Setting: For urea top-dressing, calibrate the spreader spinner disc vanes to achieve a uniform 12–14 metre swath width without overlapping stripes.',
      'Weather Coordination: Broadcast urea in late afternoon when wind speeds are below 8 km/h and soil has adequate moisture to avert gaseous ammonia volatilization.'
    ],
    safetyPrecautions: 'Wear protective rubber gloves and mask when loading fertilizer into tractor hopper bins to avoid skin irritation.',
    content: `
### Scientific Nutrient Placement Guidelines

Excessive or improper fertilizer application inflates production costs and pollutes rural groundwater.

- **Basal Placement:** Seed-cum-fertilizer drills ensure that immobile nutrients like phosphorus remain in the moist root zone where young seedling radicles can absorb them.
- **Top Dressing:** Uniform spinner broadcasters prevent high-concentration hot spots that burn crop foliage.
    `
  },
  {
    id: 'art-6',
    slug: 'integrated-pest-management-sprayer-calibration',
    title: 'Tractor Boom Sprayer Calibration & Integrated Pest Management',
    titleHi: 'बूम स्प्रेयर कैलिब्रेशन और समन्वित कीट प्रबंधन (IPM)',
    category: 'Integrated Pest Management',
    categoryHi: 'कीट एवं फसल सुरक्षा',
    seasonContext: 'Vegetative & Flowering Crop Stages',
    seasonContextHi: 'फसल की वृद्धि एवं फूल आने के समय',
    readTime: '5 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'Directorate of Plant Protection, Quarantine & Storage (DPPQS)',
    summary: 'How to calculate spray volume per acre, select appropriate nozzle tips (flat fan vs hollow cone), and apply biological pest controls safely.',
    summaryHi: 'सही नोजल का चुनाव, पानी की मात्रा का निर्धारण, कीटनाशक की बचत और छिड़काव के दौरान जरूरी सावधानियां।',
    practicalSteps: [
      'Nozzle Selection: Use Flat-Fan nozzles for soil herbicide application; use Hollow-Cone nozzles for foliar insecticide/fungicide penetration into dense crop canopies.',
      'Spray Volume Calculation: Fill the tank with clean water, drive the tractor at operating field gear (usually 1st High or 2nd Low at 1500 RPM) for 100 metres, and calculate litres discharged per acre.',
      'Boom Height Setting: Adjust boom height to approximately 50 cm above the crop canopy to ensure 30% overlap of adjacent nozzle spray patterns.',
      'Pheromone & Sticky Traps: Install 4–5 yellow sticky traps and pheromone traps per acre as early warning indicators before deploying chemical sprays.'
    ],
    safetyPrecautions: 'Always wear complete PPE (face shield, respirator, nitrile gloves, apron). Never spray against prevailing wind direction. Keep clean water and eye-wash solution on tractor.',
    content: `
### Integrated Pest Management (IPM) Principles

IPM combines cultural, biological, and calibrated mechanical methods to keep pest populations below the Economic Threshold Level (ETL).

1. **Economic Threshold Level (ETL):** Do not apply chemical pesticides immediately upon spotting a few insects. Spray only when pest population reaches the damage threshold defined by your state agricultural university.
2. **Beneficial Predators:** Uncalibrated high-dose sprays kill friendly pollinators and predators like ladybird beetles and spiders.
3. **Nozzle Maintenance:** Clean blocked nozzle tips with an old soft toothbrush; never poke nozzle orifices with wire or pins as this destroys spray geometry.
    `
  },
  {
    id: 'art-7',
    slug: 'combine-harvester-post-harvest-loss-prevention',
    title: 'Minimizing Field Grain Losses During Combine Harvester Operation',
    titleHi: 'कंबाइन हार्वेस्टर: फसल कटाई में अनाज का नुकसान कैसे रोकें',
    category: 'Harvesting',
    categoryHi: 'कटाई एवं भंडारण',
    seasonContext: 'Harvest Windows (April - May / October - November)',
    seasonContextHi: 'फसल कटाई समय (अप्रैल-मई / अक्टूबर-नवंबर)',
    readTime: '5 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'Central Institute of Post-Harvest Engineering and Technology (CIPHET)',
    summary: 'Adjusting reel speed, concave cylinder clearance, blower RPM, and moisture testing to limit combine grain loss under 1.5%.',
    summaryHi: 'कटर बार की सही ऊंचाई, थ्रेशर ड्रम स्पीड और ब्लोअर पंखे की सेटिंग से कटाई में अनाज का नुकसान 1.5% से कम रखने की गाइड।',
    practicalSteps: [
      'Grain Moisture Check: Harvest wheat, soybean, or paddy when seed moisture is strictly between 13% and 15%. Harvesting below 12% causes grain shattering; harvesting above 17% causes choking and mechanical seed bruising.',
      'Reel Speed Ratio: Set reel index at 1.15 to 1.25 times the forward ground speed. If the reel turns too fast, it knocks ripe heads before the cutter bar engages them.',
      'Threshing Cylinder Clearance: Widen cylinder-to-concave clearance when crop straw is brittle; tighten clearance during early morning damp straw runs.',
      'Straw Management: Pair your harvester with an on-board straw management system (SMS) or follow with a rotary straw baler to convert residue into livestock fodder.'
    ],
    safetyPrecautions: 'Ensure grain tank unloading auger is retracted and locked before traversing narrow village lanes or passing under overhead power lines.',
    content: `
### Optimizing Combine Harvester Settings

Improperly adjusted combine harvesters can cause field losses in excess of 4–6 quintals per hectare.

- **Cutter Bar Height:** Maintain cutter bar 5–10 cm above ground for lodged crops to prevent blade contact with soil and stones.
- **Cleaning Shoes & Sieve Openings:** If unthreshed heads pass over the chaffer sieve into the straw walker, slightly increase concave clearance or tighten threshing drum RPM.
    `
  },
  {
    id: 'art-8',
    slug: 'machinery-field-safety-rops-pto',
    title: 'Essential Safety Guidelines: PTO Shields, ROPS & Hillside Stability',
    titleHi: 'कृषि मशीनरी सुरक्षा: PTO शाफ्ट, रोलओवर सुरक्षा और सड़क नियम',
    category: 'Farm Safety',
    categoryHi: 'मशीनरी सुरक्षा',
    seasonContext: 'Year-Round Operational Protocol',
    seasonContextHi: 'साल भर के लिए अनिवार्य सुरक्षा नियम',
    readTime: '4 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'National Safety Council of India (Agricultural Division)',
    summary: 'Preventing severe field accidents through PTO shield enforcement, rollover protective structures (ROPS), brake latching, and safe highway transit.',
    summaryHi: 'PTO शाफ्ट गार्ड, ढलान पर सुरक्षित संचालन, ब्रेक पेडल लॉकिंग और दुर्घटना से बचाव के अनिवार्य नियम।',
    practicalSteps: [
      'PTO Shield Integrity: Never operate any tractor with an unshielded Power Take-Off (PTO) shaft. A shaft rotating at 540 RPM spins 9 times every single second and will wrap loose clothing instantly.',
      'Brake Pedal Interlock: Always latch the left and right brake pedals together when transporting equipment on highways to prevent dangerous one-wheel braking skids at speeds above 15 km/h.',
      'Slope & Bund Crossing: When negotiating steep farm bunds, ascend with the heavy end uphill. Never shift gears or depress the clutch while descending steep banks.',
      'Hydraulic Lockout: When repairing cultivators or mower blades underneath, always place solid timber or steel jack stands; never rely exclusively on hydraulic pressure.'
    ],
    safetyPrecautions: 'Never permit riders or children on tractor fenders, drawbars, or implement platforms.',
    content: `
### Zero-Accident Farm Operations

Agricultural machinery accidents are completely preventable with strict adherence to basic safety discipline.

1. **Rollover Protective Structure (ROPS):** Ensure the factory ROPS frame is raised and locked in position with seatbelt fastened. Over 60% of fatal tractor accidents involve side or rear rollovers.
2. **Night Road Safety:** Equip trailers and seed drills with clean rear reflective triangles, red tail tape, and working turn indicators before entering highways after dusk.
    `
  },
  {
    id: 'art-9',
    slug: 'preventive-tractor-implement-maintenance',
    title: 'Preventive Machinery Maintenance: 50-Hour & 250-Hour Checklist',
    titleHi: 'उपकरण देखभाल: 50 घंटे और 250 घंटे की नियमित चेकलिस्ट',
    category: 'Maintenance',
    categoryHi: 'यंत्र रखरखाव',
    seasonContext: 'Routine Scheduled Maintenance',
    seasonContextHi: 'नियमित निर्धारित रखरखाव',
    readTime: '4 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'Central Farm Machinery Training & Testing Institute (CFMTTI, Budni)',
    summary: 'A simple, field-tested maintenance routine for air filters, implement grease points, hydraulic filters, and tire pressures to avoid costly in-season breakdowns.',
    summaryHi: 'सत्र के बीच अचानक खराबी से बचने के लिए एयर क्लीनर, मोबिल ऑयल, ग्रीस पॉइंट्स और हाइड्रोलिक्स की आसान जांच।',
    practicalSteps: [
      'Daily Air Cleaner Service: Clean the dry cyclonic pre-cleaner bowl every morning during dusty rotavating and harvesting operations. Replace the secondary paper element per service book.',
      '50-Hour Greasing: Pump lithium-complex multipurpose grease into PTO universal crosses, front axle kingpins, steering tie-rod ends, and 3-point hitch linkage balls.',
      '250-Hour Engine Oil Change: Replace crankcase engine oil (use 15W-40 CI-4 grade) and spin-on oil filter. Clean the fuel bowl sediment trap to eliminate water droplet carryover to the FIP pump.',
      'Tire Pressure Standards: Maintain 12–14 PSI in rear tires for field traction; inflate to 18–20 PSI when carrying heavy loads on paved highway roads.'
    ],
    safetyPrecautions: 'Allow the engine and exhaust manifold to cool completely before opening radiator pressure caps or cleaning oil strainers.',
    content: `
### The 10-Minute Morning Walkaround Routine

Performing a quick 10-minute check before heading to the field prevents 90% of sudden field breakdowns during tight sowing and harvesting windows.

- Check engine oil level on dipstick between MIN and MAX marks.
- Check coolant reservoir level; never add cold water to an overheated dry engine block.
- Inspect hydraulic fluid sight glass behind the rear differential housing.
    `
  },
  {
    id: 'art-10',
    slug: 'government-mechanization-schemes-smam-chc',
    title: 'Government Agricultural Schemes: SMAM Subsidies & Custom Hiring Centers',
    titleHi: 'सरकारी कृषि योजनाएं: SMAM सब्सिडी और कस्टम हायरिंग सेंटर (CHC)',
    category: 'Government Schemes',
    categoryHi: 'सरकारी योजनाएं',
    seasonContext: 'Fiscal Year Scheme Applications',
    seasonContextHi: 'वित्तीय वर्ष योजना आवेदन',
    readTime: '5 min read',
    lastReviewed: 'October 2026',
    sourceRef: 'Ministry of Agriculture & Farmers Welfare, agrimachinery.nic.in',
    summary: 'Overview of the Sub-Mission on Agricultural Mechanization (SMAM), Custom Hiring Center (CHC) incentives, PM-KUSUM solar pumps, and official DBT portals.',
    summaryHi: 'कृषि यंत्रीकरण उप-मिशन (SMAM), सीएचसी स्थापना, पीएम-कुसुम सोलर पंप और आधिकारिक डीबीटी पोर्टल की विश्वसनीय जानकारी।',
    practicalSteps: [
      'Understand SMAM Structure: The Sub-Mission on Agricultural Mechanization provides 40% to 50% financial assistance for individual farmers to purchase approved machinery (tractors, rotavators, seed drills).',
      'Custom Hiring Centers (CHC): Rural youth, farmer groups (FPOs), and cooperatives can access up to 40% project subsidies (up to ₹10–25 Lakhs) to establish Custom Hiring Centers that rent out equipment locally.',
      'Official Application Portal: Submit all mechanization applications through the official Government Direct Benefit Transfer (DBT) portal at agrimachinery.nic.in. Do not pay middlemen.',
      'Required Documentation: Keep Aadhaar card, land ownership records (Khatauni/Khasra), bank passbook copy, and caste certificate (for priority categories) ready in digital format.'
    ],
    safetyPrecautions: 'Never share bank OTPs or transfer upfront processing fees to unauthorized agents claiming guaranteed government machinery subsidies.',
    content: `
### Promoting Mechanization for Small & Marginal Farmers

The Government of India and State Agriculture Departments actively promote machinery access through Custom Hiring models rather than forced individual debt.

1. **Sub-Mission on Agricultural Mechanization (SMAM):**
   - Aims to reach unreached farmers in areas with low farm power availability.
   - Priority subsidy allocation for women farmers, SC/ST, and small/marginal holders (under 2 hectares).

2. **PM-KUSUM Component B & C:**
   - Subsidies for standalone solar agriculture pumps and solarization of existing grid-connected tubewells.

> **Official Notice:** Eligibility criteria, budget quotas, and lottery application windows are determined at the state and district level. Always verify current district quotas directly at your District Agriculture Office or official state portal (e.g. mpkrishi.org in MP).
    `
  }
];
