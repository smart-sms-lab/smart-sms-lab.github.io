const toggle = document.getElementById("multiSelectToggle");
const modeLabel = document.getElementById("modeLabel");
const clearSelectionButton = document.getElementById("clearSelection");
const selectionSummary = document.getElementById("selectionSummary");
const activityCount = document.getElementById("activityCount");
const assessmentCount = document.getElementById("assessmentCount");
const ploGroups = document.getElementById("ploGroups");
const ploEmpty = document.getElementById("ploEmpty");
const ploSelectionSummary = document.getElementById("ploSelectionSummary");
let multiSelectEnabled = false;

/*
CATEGORY_DATA:
Mapping of category IDs to their learning and assessment items
- Example: category 1 highlights activity-1, activity-4, activity-7, and
  assessment-1, assessment-4, assessment-7.
*/
const CATEGORY_DATA = {
  1: {
    learning: [1, 4, 7],
    assessment: [1, 4, 7]
  },
  2: {
    learning: [10, 13, 16],
    assessment: [10, 13, 16]
  },
  
  3: {
    learning: [19, 22, 25],
    assessment: [19, 22, 25]
  },
  4: {
    learning: [2, 5, 8],
    assessment: [2, 5, 8]
  },
  5: {
    learning: [11, 14, 17],
    assessment: [11, 14, 17]
  },
  6: {
    learning: [20, 23, 26],
    assessment: [20, 23, 26]
  },
  
  7: {
    learning: [3, 6, 9],
    assessment: [3, 6, 9]
  },
  
  8: {
    learning: [12, 15, 18],
    assessment: [12, 15, 18]
  },
  
  9: {
    learning: [21, 24, 27],
    assessment: [21, 24, 27]
  },
  
  10: {
    learning: [28, 31, 34],
    assessment: [28, 31, 34]
  },
  
  11: {
    learning: [29, 32, 35],
    assessment: [29, 32, 35]
  },
  
  12: {
    learning: [30, 33, 36],
    assessment: [30, 33, 36]
  },
 
};

// This is the list of Program Learning Outcomes (PLOs) for each Graduate Attribute.
// Each PLO has a code, a title, and the activity/assessment numbers related to it.

const PLO_DATA = {
  1: [
    { code: "1.1", title: "Apply Foundational Knowledge in Engineering Contexts", learning: [1], assessment: [1] },
    { code: "1.2", title: "Integrate Foundational and Specialized Engineering Knowledge", learning: [4, 7], assessment: [4, 7] },
    { code: "1.3", title: "Cultural Competency and History", learning: [7], assessment: [7] }
  ],
  2: [
    { code: "2.1", title: "Problem Identification and Analysis", learning: [10], assessment: [10] },
    { code: "2.2", title: "Analytical Modelling and Reasoning", learning: [16], assessment: [16] },
    { code: "2.3", title: "Substantiate and Evaluate Analytical Conclusions", learning: [13], assessment: [13] },
    { code: "2.4", title: "Intersectionality and Knowledge Systems", learning: [10, 13], assessment: [10, 13] }
  ],
  3: [
    { code: "3.1", title: "Critically Evaluate Data", learning: [19, 25], assessment: [19, 25] },
    { code: "3.2", title: "Synthesize Evidence and Justify Conclusions", learning: [22, 25], assessment: [22, 25] }
  ],
  4: [
    { code: "4.1", title: "Problem Definition", learning: [2], assessment: [2] },
    { code: "4.2", title: "Design and Development of Engineering Solutions", learning: [5], assessment: [5] },
    { code: "4.3", title: "Apply Iterative and Evidence-Informed Design Processes", learning: [2, 5], assessment: [2, 5] },
    { code: "4.4", title: "Engage Stakeholders and Diverse Knowledge Systems in Design", learning: [8], assessment: [8] },
    { code: "4.5", title: "Integrate Sustainability and Systems Thinking into Design Decisions", learning: [2, 8], assessment: [2, 8] }
  ],
  5: [
    { code: "5.1", title: "Select and Apply Engineering Tools Appropriately", learning: [11], assessment: [11] },
    { code: "5.2", title: "Critically Evaluate Tool Outputs and Limitations", learning: [17], assessment: [17] },
    { code: "5.3", title: "Adapt, Extend, and Innovate Engineering Tools", learning: [14, 17], assessment: [14, 17] }
  ],
  6: [
    { code: "6.1", title: "Contribute Responsibly and Effectively Within Collaborative and Interdisciplinary Teams", learning: [20, 23], assessment: [20, 23] },
    { code: "6.2", title: "Exercise Initiative and Leadership in Teams", learning: [26], assessment: [26] }
  ],
  7: [
    { code: "7.1", title: "Communicate Engineering Knowledge Clearly and Responsibly", learning: [3, 6], assessment: [3, 6] },
    { code: "7.2", title: "Listen, Interpret and Engage", learning: [9], assessment: [9] }
  ],
  8: [
    { code: "8.1", title: "Public Protection, Professional Obligation, and Societal Trust", learning: [12, 18], assessment: [12, 18] },
    { code: "8.2", title: "Professional Judgement, Conduct, and Accountability", learning: [15, 18], assessment: [15, 18] }
  ],
  9: [
    { code: "9.1", title: "Indigenous Relationship and Intercultural Partnership in Engineering", learning: [21, 24], assessment: [21, 24] },
    { code: "9.2", title: "Systems Level and Structural Impact Analysis", learning: [21, 27], assessment: [21, 27] },
    { code: "9.3", title: "Sustainability and Intergenerational Responsibility", learning: [24, 27], assessment: [24, 27] }
  ],
  10: [
    { code: "10.1", title: "Ethical Reasoning & Professional Judgement", learning: [31], assessment: [31] },
    { code: "10.2", title: "Accountability and Responsibility", learning: [34], assessment: [34] },
    { code: "10.3", title: "Equity, Diversity, and Inclusive Practice", learning: [28], assessment: [28] },
    { code: "10.4", title: "Integrate Ethical and Equity Considerations in Engineering", learning: [28, 31], assessment: [28, 31] },
    { code: "10.5", title: "Ethical and Relational Engagement", learning: [34], assessment: [34] }
  ],
  11: [
    { code: "11.1", title: "Economic and Risk-Informed Engineering Decision Making", learning: [29], assessment: [29] },
    { code: "11.2", title: "Project Organization and Execution", learning: [35], assessment: [35] },
    { code: "11.3", title: "Enterprise and Value Creation", learning: [32], assessment: [32] },
    { code: "11.4", title: "Consultation and Relationship Building", learning: [32, 35], assessment: [32, 35] }
  ],
  12: [
    { code: "12.1", title: "Reflective Professional Self-Assessment", learning: [30, 36], assessment: [30, 36] },
    { code: "12.2", title: "Collaborative and Adaptive Knowledge Development", learning: [33, 36], assessment: [33, 36] }
  ]
};


// Background color for learning rectangles (per category)

const RECTANGLE_COLORS = {
  1: "#B9D0F5", // Light blue
  2: "#B7E4F3", // Aqua
  3: "#C2EDD8",
  4: "#DDEBC2",
  5: "#F6F0B9",
  6: "#F8E6D4",
  7: "#F8D4C2",
  8: "#F6C3A9",
  9: "#E6D5F3",
  10: "#D1B1E9",
  11: "#F5CFE6",
  12: "#F1B9D9",
  
  // Add up to category 12
};

// Text color for assessment section (per category)
const TEXT_COLORS = {
  1: "#1D53AA", // Dark blue
  2: "#1C8CAB", // Teal
  3: "#2D835B", // Deep green
  4: "#8A9A2F", // Olive green
  5: "#AC9E23",
  6: "#D79859",
  7: "#DB7C4C",
  8: "#C37953",
  9: "#9A78B4",
  10: "#70379A",
  11: "#AE3C81",
  12: "#8F2C65",
  // Add up to category 12
};

// Track which categories are currently selected
const activeCategories = new Set();
const activePLOs = new Set();
const categoryButtons = [...document.querySelectorAll(".category-icon")];
const activityElements = [...document.querySelectorAll(".rectangle.grey")];
const assessmentElements = [...document.querySelectorAll(".rectangle.white")];

// Show or hide one item on the page. The visible value decides whether it is displayed.
function showElement(element, visible) {
  element.style.display = visible ? "flex" : "none";
}

// Look through all GAs and find the PLO that matches the code provided.
function findPLO(code) {
  for (const [categoryId, outcomes] of Object.entries(PLO_DATA)) {
    const outcome = outcomes.find(item => item.code === code);
    if (outcome) return { ...outcome, categoryId: Number(categoryId) };
  }
  return null;
}


// Build or refresh the PLO selection area based on the GAs currently selected.
// The buttons shown here let the user narrow the results to specific PLOs.
function renderPLOExplorer() {
  if (activeCategories.size === 0) {
    ploEmpty.hidden = false;
    ploGroups.hidden = true;
    ploGroups.innerHTML = "";
    ploSelectionSummary.textContent = "Choose a graduate attribute to view its PLOs";
    return;
  }

  ploEmpty.hidden = true;
  ploGroups.hidden = false;
  const selectedCategoryIds = [...activeCategories].sort((a, b) => a - b);
  ploGroups.innerHTML = selectedCategoryIds.map(categoryId => {
    const categoryName = categoryButtons
      .find(button => Number(button.dataset.categoryId) === categoryId)
      .querySelector(".category-name").textContent;
    const outcomes = PLO_DATA[categoryId];
    return `
      <div class="plo-group">
        <div class="plo-group-label">
          <strong>GA ${String(categoryId).padStart(2, "0")}</strong>
          <span>${categoryName} · ${outcomes.length} PLO${outcomes.length === 1 ? "" : "s"}</span>
        </div>
        <div class="plo-button-grid">
          ${outcomes.map(outcome => `
            <button class="plo-button ${activePLOs.has(outcome.code) ? "selected" : ""}" type="button" data-plo-code="${outcome.code}" aria-pressed="${activePLOs.has(outcome.code)}">
              <span class="plo-code">PLO ${outcome.code}</span>
              <span class="plo-title">${outcome.title}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");

  // LOGIC FOR SELECTION AND ALSO POP-UP SETUP

  ploGroups.querySelectorAll(".plo-button").forEach(button => {
    button.addEventListener("click", () => {
      const code = button.dataset.ploCode;
      if (activePLOs.has(code)) activePLOs.delete(code);
      else activePLOs.add(code);
      renderSelection();
    });
  });

  ploSelectionSummary.textContent = activePLOs.size
    ? `${activePLOs.size} PLO${activePLOs.size === 1 ? "" : "s"} selected · workspace refined`
    : `${selectedCategoryIds.reduce((total, id) => total + PLO_DATA[id].length, 0)} mapped PLOs available`;
}


// Update the main page after the user selects or clears a GA or PLO.
// This controls which activity/assessment boxes are visible, their colours, and the selection counts.
function renderSelection() {
  const hasSelection = activeCategories.size > 0;
  const visibleActivities = new Set();
  const visibleAssessments = new Set();

  [...activePLOs].forEach(code => {
    const outcome = findPLO(code);
    if (!outcome || !activeCategories.has(outcome.categoryId)) activePLOs.delete(code);
  });


    // Update the visual appearance of every Graduate Attribute button.
  // This shows which buttons are currently selected.
  categoryButtons.forEach(button => {
    const categoryId = Number(button.dataset.categoryId);
    const selected = activeCategories.has(categoryId);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (hasSelection) {
    const mappings = activePLOs.size
      ? [...activePLOs].map(findPLO)
      : [...activeCategories].map(categoryId => ({ ...CATEGORY_DATA[categoryId], categoryId }));

    mappings.forEach(data => {
      const categoryId = data.categoryId;
      data.learning.forEach(id => {
        visibleActivities.add(id);
        const element = document.getElementById(`activity-${id}`);
        if (element) {
          element.style.backgroundColor = RECTANGLE_COLORS[categoryId];
          element.style.borderLeftColor = TEXT_COLORS[categoryId];
        }
      });
      data.assessment.forEach(id => {
        visibleAssessments.add(id);
        const element = document.getElementById(`assessment-${id}`);
        if (element) {
          element.style.color = TEXT_COLORS[categoryId];
          element.style.borderLeftColor = TEXT_COLORS[categoryId];
          element.style.fontWeight = "600";
        }
      });
    });
  }

  // Show only the activities that match the current selection.
  // If nothing is selected, show all activities and remove their special colours.
  activityElements.forEach(element => {
    const id = Number(element.id.replace("activity-", ""));
    showElement(element, !hasSelection || visibleActivities.has(id));
    if (!hasSelection) {
      element.style.backgroundColor = "";
      element.style.borderLeftColor = "";
    }
  });

  // Show only the assessments that match the current selection.
  // If nothing is selected, show all assessments and restore their default appearance.
  assessmentElements.forEach(element => {
    const id = Number(element.id.replace("assessment-", ""));
    showElement(element, !hasSelection || visibleAssessments.has(id));
    if (!hasSelection) {
      element.style.color = "";
      element.style.borderLeftColor = "";
      element.style.fontWeight = "";
    }
  });

  // Update the numbers displayed on the page to show how many activities and assessments are visible.
  activityCount.textContent = hasSelection ? visibleActivities.size : activityElements.length;
  assessmentCount.textContent = hasSelection ? visibleAssessments.size : assessmentElements.length;

  // Refresh the PLO explorer so it matches the current selection.
  renderPLOExplorer();

  if (!hasSelection) {
    selectionSummary.textContent = "Showing all recommendations";
    return;
  }

  // Collect the names of the selected Graduate Attributes to display in the summary.
  const selectedNames = categoryButtons
    .filter(button => activeCategories.has(Number(button.dataset.categoryId)))
    .map(button => button.querySelector(".category-name").textContent);

  // Display a summary that changes depending on whether the user selected GAs or individual PLOs.
  selectionSummary.textContent = activePLOs.size
    ? `${activePLOs.size} PLO${activePLOs.size === 1 ? "" : "s"} selected · ${visibleActivities.size} activities + ${visibleAssessments.size} assessments`
    : `${activeCategories.size} selected · ${selectedNames.join(" + ")}`;
}


// Add a click action to every Graduate Attribute button.
// Depending on the selected mode, the user can select one GA or several GAs.
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const categoryId = Number(button.dataset.categoryId);
    const isSelected = activeCategories.has(categoryId);

    if (!multiSelectEnabled) {
      activeCategories.clear();
      if (!isSelected) activeCategories.add(categoryId);
    } else if (isSelected) {
      activeCategories.delete(categoryId);
    } else {
      activeCategories.add(categoryId);
    }

    renderSelection();
  });
});

// When the selection-mode switch changes, update whether one or multiple GAs can be selected.
toggle.addEventListener("change", () => {
  multiSelectEnabled = toggle.checked;
  modeLabel.textContent = multiSelectEnabled ? "Multiple attributes enabled" : "One attribute at a time";

  // If multiple GAs were selected and the user switches back to single-selection mode,
  // keep the first selected GA and remove the others.

  if (!multiSelectEnabled && activeCategories.size > 1) {
    const firstSelection = activeCategories.values().next().value;
    activeCategories.clear();
    activeCategories.add(firstSelection);
    renderSelection();
  }
});


// The Clear button removes all selected GAs and PLOs.
clearSelectionButton.addEventListener("click", () => {
  activeCategories.clear();
  activePLOs.clear();
  renderSelection();
});

// Run the selection function once when the page first loads.
// This sets the initial appearance and counts.
renderSelection();

// Find the elements used by the pop-up workspace that opens when an activity or assessment is clicked.
const popup = document.getElementById('popup');
const popupActivity = document.getElementById('popup-activity');
const popupImage = document.getElementById('popup-image');
const closeBtn = document.getElementById('close');
const popupBanner = document.getElementById('popup-banner');
const popupAttributeCode = document.getElementById('popup-attribute-code');
const popupAttributeName = document.getElementById('popup-attribute-name');
const popupWorkspaceLabel = document.getElementById('popup-workspace-label');
const popupPLOList = document.getElementById('popup-plo-list');
const activityObjective = document.getElementById('activity-objective');
const alignedAssessments = document.getElementById('aligned-assessments');
const alignedEvidenceTitle = document.getElementById('aligned-evidence-title');
const overviewNavTitle = document.getElementById('overview-nav-title');
const overviewNavSubtitle = document.getElementById('overview-nav-subtitle');
const casesNavTitle = document.getElementById('cases-nav-title');
const casesNavSubtitle = document.getElementById('cases-nav-subtitle');
const overviewEyebrow = document.getElementById('overview-eyebrow');
const overviewTitle = document.getElementById('overview-title');
const recommendedFormat = document.getElementById('recommended-format');
const suggestedDuration = document.getElementById('suggested-duration');
const evidenceType = document.getElementById('evidence-type');
const casesEyebrow = document.getElementById('cases-eyebrow');
const casesTitle = document.getElementById('cases-title');
const casesIntro = document.getElementById('cases-intro');
const templatesIntro = document.getElementById('templates-intro');
const plannerTypeLabel = document.getElementById('planner-type-label');
const plannerTitle = document.getElementById('planner-title');
const plannerDescription = document.getElementById('planner-description');
const plannerButtonLabel = document.getElementById('planner-button-label');
const resourceNavButtons = [...document.querySelectorAll('.resource-nav-button')];
const resourcePanels = [...document.querySelectorAll('.resource-panel')];
const caseStudyList = document.getElementById('case-study-list');
const caseStudyReader = document.getElementById('case-study-reader');
const backToCases = document.getElementById('back-to-cases');
const externalTemplateCard = document.getElementById('external-template-card');
const externalTemplateTitle = document.getElementById('external-template-title');
let lastFocusedElement = null;


//CONNECTION TO ACTIVITIES, BANNERS, DOWNLOADS, CASE-STUDY INFORMATION

const ACTIVITY_IMAGES = {
  //Graduate attribute 1: Knowledge base
  "activity-1": "Images/cs-1.png",
  "activity-7": "Images/CaseStudy-ReverseEngineering.png", 
  "activity-4": "Images/cs-1.3.png",
  //Graduate attribute 2: Problem analysis
  "activity-10": "Images/cs-2.png",
  "activity-13": "Images/cs-2.1.png",
  "activity-16": "Images/cs-2.3.png",
  //Graduate attribute 3: Investigation
  "activity-19": "Images/cs-3.1.png",
  "activity-22": "Images/cs-3.png",
  "activity-25": "Images/cs-3.3.png",
  //Graduate attribute 4: Design
  "activity-2": "Images/cs-4.1.png",
  "activity-5": "Images/cs-4.png",
  "activity-8": "Images/cs-4.3.png",
  //Graduate attribute 7: Communication skills
  "activity-3": "Images/cs-7.1.png",
  "activity-6": "Images/ga7-casestudy1.png",
  "activity-9": "Images/cs-7.3.png",
  //Graduate attribute 8: Professionalism
  "activity-12": "Images/cs-8.1.png",
  "activity-15": "Images/cs-8.2.png",
  //Graduate attribute 9: Impact of engineering on society and environment
  "activity-21": "Images/ga9-casestudy1.png",
  "activity-24": "Images/cs-9.2.png",
  "activity-27": "Images/cs-9.3.png",
  //Graduate attribute 10: Ethis and equity
  "activity-28": "Images/cs-10.1.png",
  "activity-31": "Images/ga10-casestudy1.png",
  "activity-34": "Images/cs-10.3.png",
  //Graduate attribute 11: Economics and management
  "activity-29": "Images/cs-11.1.png",
  "activity-32": "Images/cs-11.2.png",
  "activity-35": "Images/cs-11.3.png",
  //Graduate attribute 12: Lifelong learning
  "activity-30": "Images/cs-12.1.png",
  "activity-33": "Images/cs-12.2.png",
  "activity-36": "Images/cs-12.3.png",

};

// NEW: MAP OF ACTIVITY IDS TO DOWNLOAD LINK AND LINK TEXT
const ACTIVITY_DOWNLOADS = {
  "activity-1": {
    url: "https://docs.google.com/document/d/1ySSiB2JSHtFZbWfc9uWaZagOa_OnEJtT0GXbC3wq5HU/edit?usp=sharing",
    text: "CAD Model Step by Step File"
  },
  "activity-5": {
    url: "https://docs.google.com/presentation/d/1ZksCumkfwFEpCZfoQI-uui-04R2pluKj/edit?usp=sharing&ouid=116558492720556286136&rtpof=true&sd=true",
    text: "Human-centered group workshop"
  },
  "activity-7": {
    url: "https://docs.google.com/document/d/1ySSiB2JSHtFZbWfc9uWaZagOa_OnEJtT0GXbC3wq5HU/edit?usp=sharing",
    text: "Reverse Engineering Worksheet"
  },
  // ADD MORE ACTIVITIES AS NEEDED
};

// GET LINK ELEMENT
const popupTemplateLink = document.getElementById('popup-template-link');

// NEW: MAP OF ACTIVITY IDS TO BANNER IMAGES


// CUSTOM BACKGROUND IMAGES FOR EXPERIENTIAL LEARNING ACTIVITIES
const ACTIVITY_BANNERS = {
  // Graduate Attribute 1
  "activity-1": "Images/Activities/activity-1.png",
  "activity-4": "Images/Activities/activity-1.png",
  "activity-7": "Images/Activities/activity-1.png",

  // Graduate Attribute 2
  "activity-10": "Images/Activities/activity-2.png",
  "activity-13": "Images/Activities/activity-2.png",
  "activity-16": "Images/Activities/activity-2.png",

  // Graduate Attribute 3
  "activity-19": "Images/Activities/activity-3.png",
  "activity-22": "Images/Activities/activity-3.png",
  "activity-25": "Images/Activities/activity-3.png",

  // Graduate Attribute 4
  "activity-2": "Images/Activities/activity-4.png",
  "activity-5": "Images/Activities/activity-4.png",
  "activity-8": "Images/Activities/activity-4.png",

  // Graduate Attribute 5
  "activity-11": "Images/Activities/activity-5.png",
  "activity-14": "Images/Activities/activity-5.png",
  "activity-17": "Images/Activities/activity-5.png",


  //REPLACE FROM HERE
  // Graduate Attribute 6
  "activity-20": "Images/Activities/activity-5.png",
  "activity-23": "Images/Activities/activity-5.png",
  "activity-26": "Images/Activities/activity-5.png",

  //Graduate attribute 7: Communication skills
  "activity-3": "Images/Activities/activity-5.png",
  "activity-6": "Images/Activities/activity-5.png",
  "activity-9": "Images/Activities/activity-5.png",
  //Graduate attribute 8: Professionalism
  "activity-12": "Images/Activities/activity-5.png",
  "activity-15": "Images/Activities/activity-5.png",
  //Graduate attribute 9: Impact of engineering on society and environment
  "activity-21": "Images/Activities/activity-5.png",
  "activity-24": "Images/Activities/activity-5.png",
  "activity-27": "Images/Activities/activity-5.png",
  //Graduate attribute 10: Ethis and equity
  "activity-28": "Images/Activities/activity-5.png",
  "activity-31": "Images/Activities/activity-5.png",
  "activity-34": "Images/Activities/activity-5.png",
  //Graduate attribute 11: Economics and management
  "activity-29": "Images/Activities/activity-5.png",
  "activity-32": "Images/Activities/activity-5.png",
  "activity-35": "Images/Activities/activity-5.png",
  //Graduate attribute 12: Lifelong learning
  "activity-30": "Images/Activities/activity-5.png",
  "activity-33": "Images/Activities/activity-5.png",
  "activity-36": "Images/Activities/activity-5.png",



  // Continue the same pattern for activities 5–12...
};


// CUSTOM BACKGROUND IMAGES FOR ASSESSMENT METHODS
const ASSESSMENT_BANNERS = {
  // Graduate Attribute 1
  "assessment-1": "Images/Activities/activity-1.png",
  "assessment-4": "Images/Activities/activity-1.png",
  "assessment-7": "Images/Activities/activity-1.png",

  // Graduate Attribute 2
  "assessment-10": "Images/Activities/activity-2.png",
  "assessment-13": "Images/Activities/activity-2.png",
  "assessment-16": "Images/Activities/activity-2.png",

  //Graduate attribute 3: Investigation
  "assessment-19": "Images/Activities/activity-3.png",
  "assessment-22": "Images/Activities/activity-3.png",
  "assessment-25": "Images/Activities/activity-3.png",
  //Graduate attribute 4: Design 
  "assessment-2": "Images/Activities/activity-4.png",
  "assessment-5": "Images/Activities/activity-4.png",
  "assessment-8": "Images/Activities/activity-4.png",
  //Graduate attribute 5: Use of engineering tools activities
  "assessment-11": "Images/Activities/activity-5.png",
  "assessment-14": "Images/Activities/activity-5.png",
  "assessment-17": "Images/Activities/activity-5.png",
  //Graduate attribute 6: Individual and teamwork activities
  "assessment-20": "Images/Activities/activity-5.png",
  "assessment-23": "Images/Activities/activity-5.png",
  "assessment-26": "Images/Activities/activity-5.png",
   //Graduate attribute 7: Communication skills activities
  "assessment-3": "Images/Activities/activity-5.png",
  "assessment-6": "Images/Activities/activity-5.png",
  "assessment-9": "Images/Activities/activity-5.png",
  ///Graduate attribute 8: Professionalism
  "assessment-12": "Images/Activities/activity-5.png",
  "assessment-15": "Images/Activities/activity-5.png",
  "assessment-18": "Images/Activities/activity-5.png",
  //Graduate attribute 9: Impact of engineering activities
  "assessment-21": "Images/Activities/activity-5.png",
  "assessment-24": "Images/Activities/activity-5.png",
  "assessment-27": "Images/Activities/activity-5.png",
  //Graduate attribute 10: Ethics and quality
  "assessment-28": "Images/Activities/activity-5.png",
  "assessment-31": "Images/Activities/activity-5.png",
  "assessment-34": "Images/Activities/activity-5.png",
  //Graduate attribute 11: Economics and project management 
  "assessment-29": "Images/Activities/activity-5.png",
  "assessment-32": "Images/Activities/activity-5.png",
  "assessment-35": "Images/Activities/activity-5.png",
  //Graduate attribute 12: Lifelong learning activities
  "assessment-30": "Images/Activities/activity-5.png",
  "assessment-33": "Images/Activities/activity-5.png",
  "assessment-36": "Images/Activities/activity-5.png",


};



// This is the main content library for each Graduate Attribute.
// It stores case studies, including their context, challenge, suggested approach, evidence, and discussion questions.

const CATEGORY_RESOURCE_DATA = {
  1: {
    name: "Knowledge base for engineering",
    cases: [
      {
        sector: "Thermal systems · Laboratory",
        title: "Diagnosing an underperforming heat exchanger",
        summary: "Students connect thermodynamics and fluid mechanics to explain why a pilot-scale heat exchanger is missing its performance target.",
        context: "A campus energy lab records an unexpected 18% drop in heat-transfer effectiveness after a system retrofit.",
        challenge: "Teams must distinguish measurement error, fouling, and flow-distribution effects using limited operating data.",
        approach: "Provide a simplified process diagram and data set. Ask teams to calculate expected performance, identify assumptions, and propose one confirmatory test before recommending corrective action.",
        evidence: ["Annotated energy balance", "Assumption log", "Diagnostic test plan", "Technical recommendation"],
        prompts: ["Which engineering principle most strongly supports your diagnosis?", "What additional measurement would reduce uncertainty most effectively?"]
      },
      {
        sector: "Mechanical systems · Reverse engineering",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  2: {
    name: "Problem analysis",
    cases: [
      {
        sector: "Infrastructure · Failure analysis",
        title: "Tracing the cause of a pedestrian bridge vibration",
        summary: "Students analyze incomplete field evidence to separate symptoms, contributing factors, and root causes.",
        context: "Users report uncomfortable lateral movement on a recently opened pedestrian bridge during peak traffic.",
        challenge: "Teams must define the problem, evaluate competing explanations, and avoid jumping directly to a preferred solution.",
        approach: "Release evidence in stages: user reports, modal data, weather records, and structural details. Require teams to update a living hypothesis table.",
        evidence: ["Problem statement", "Hypothesis matrix", "Evidence weighting", "Root-cause recommendation"],
        prompts: ["What evidence changed your initial hypothesis?", "How did you distinguish correlation from causation?"]
      },
      {
        sector: "Fluid systems · Operations",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  3: {
    name: "Investigation",
    cases: [
      {
        sector: "Materials · Experimental design",
        title: "Investigating premature fatigue in an aluminum bracket",
        summary: "Students design an investigation that can separate material, geometry, loading, and manufacturing effects.",
        context: "Prototype brackets fail earlier than predicted during repeated-load testing.",
        challenge: "Only a small number of specimens and limited laboratory time are available.",
        approach: "Teams define variables, controls, sampling strategy, and acceptance criteria before receiving simulated test results for interpretation.",
        evidence: ["Testable hypothesis", "Experimental plan", "Uncertainty analysis", "Evidence-based conclusion"],
        prompts: ["How does your design protect against confirmation bias?", "What claim is justified by this sample size?"]
      },
      {
        sector: "Smart systems · Data validation",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  4: {
    name: "Design",
    cases: [
      {
        sector: "Assistive technology · Human-centred design",
        title: "Designing a one-handed jar-opening aid",
        summary: "Students translate user observations into requirements and iteratively test a safe, manufacturable prototype.",
        context: "A community partner needs an affordable aid for users with limited grip strength and dexterity.",
        challenge: "The design must work across container sizes without creating sharp edges or excessive counter force.",
        approach: "Use stakeholder personas, measurable requirements, rapid prototypes, and structured user feedback across two design iterations.",
        evidence: ["Needs-to-requirements trace", "Concept selection matrix", "Prototype test results", "Iteration rationale"],
        prompts: ["Which requirement most constrained the design?", "How did user feedback change your engineering priorities?"]
      },
      {
        sector: "Energy systems · Retrofit",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  5: {
    name: "Use of engineering tools",
    cases: [
      {
        sector: "Digital engineering · Simulation",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      },
      {
        sector: "Advanced manufacturing · Automation",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  6: {
    name: "Individual and teamwork",
    cases: [
      {
        sector: "Product development · Multidisciplinary teams",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      },
      {
        sector: "Industry partnership · Project handoff",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  7: {
    name: "Communication skills",
    cases: [
      {
        sector: "Design review · Technical audience",
        title: "Defending a pressure-vessel concept at design review",
        summary: "Students communicate analysis, uncertainty, and design decisions to a panel acting as senior engineers.",
        context: "A concept review must determine whether the design is ready to move into detailed engineering.",
        challenge: "Students must be concise while retaining enough technical evidence for scrutiny.",
        approach: "Provide a review brief and evidence checklist. Include a timed presentation, technical questioning, and written response to actions.",
        evidence: ["Design-review slides", "Technical visualizations", "Question response log", "Revised recommendation"],
        prompts: ["Which visual made the technical argument clearest?", "How did you communicate uncertainty without weakening confidence?"]
      },
      {
        sector: "Public infrastructure · Non-technical audience",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  8: {
    name: "Professionalism",
    cases: [
      {
        sector: "Consulting · Duty of care",
        title: "Responding to an incomplete safety review",
        summary: "Students decide how a junior engineer should respond when schedule pressure conflicts with professional responsibility.",
        context: "A project manager asks for approval before a required equipment-guarding review is complete.",
        challenge: "The engineer must protect the public while communicating respectfully within organizational constraints.",
        approach: "Use role briefs for the engineer, manager, and client. Require a documented decision path tied to professional obligations.",
        evidence: ["Stakeholder analysis", "Professional duty mapping", "Escalation plan", "Decision memo"],
        prompts: ["What professional obligation is non-negotiable?", "How can the concern be raised constructively?"]
      },
      {
        sector: "Field engineering · Scope and competence",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  9: {
    name: "Impact on society and the environment",
    cases: [
      {
        sector: "Renewable energy · Life-cycle assessment",
        title: "Comparing wind-turbine blade end-of-life options",
        summary: "Students assess environmental and social trade-offs among disposal, co-processing, and emerging recycling routes.",
        context: "A regional wind operator must choose a strategy for a growing stock of retired composite blades.",
        challenge: "Data quality varies and local infrastructure limits theoretically preferred options.",
        approach: "Provide boundary definitions, inventory data, and stakeholder positions. Require sensitivity analysis and a contextual recommendation.",
        evidence: ["System boundary diagram", "Impact comparison", "Sensitivity analysis", "Stakeholder-aware recommendation"],
        prompts: ["How did system boundaries shape the result?", "Which impact cannot be reduced to a single score?"]
      },
      {
        sector: "Text holder",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  10: {
    name: "Ethics and equity",
    cases: [
      {
        sector: "Mobility · Inclusive design",
        title: "Auditing equity in an autonomous shuttle pilot",
        summary: "Students evaluate who benefits, who carries risk, and whose needs are absent from a technology pilot.",
        context: "A university plans an autonomous shuttle route using average-demand data and limited accessibility consultation.",
        challenge: "Efficiency metrics obscure unequal access and potential exclusion of users with disabilities.",
        approach: "Provide stakeholder personas, route data, and constraints. Require an equity audit and redesign recommendations.",
        evidence: ["Affected-party map", "Equity criteria", "Bias and gap analysis", "Inclusive redesign proposal"],
        prompts: ["Which users were invisible in the original data?", "How should equity be weighted against efficiency?"]
      },
      {
        sector: "Manufacturing · Ethical decision-making",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  11: {
    name: "Economics and project management",
    cases: [
      {
        sector: "Capital projects · Cost and schedule",
        title: "Recovering a delayed laboratory modernization project",
        summary: "Students rebalance scope, cost, schedule, and risk after a critical equipment delivery slips by eight weeks.",
        context: "A teaching laboratory must reopen before term while the original upgrade plan is no longer achievable.",
        challenge: "Every recovery option affects learning quality, safety validation, or project cost.",
        approach: "Give teams a schedule, budget, risk register, and change requests. Require a recovery baseline and sponsor briefing.",
        evidence: ["Critical-path analysis", "Cost forecast", "Risk response plan", "Change recommendation"],
        prompts: ["Which constraint became dominant and why?", "What information would trigger another rebaseline?"]
      },
      {
        sector: "Entrepreneurship · Feasibility",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  },
  12: {
    name: "Lifelong learning",
    cases: [
      {
        sector: "Controls · Self-directed upskilling",
        title: "Building competence in an unfamiliar control platform",
        summary: "Students plan, document, and evaluate a self-directed learning pathway for a new industrial technology.",
        context: "A project requires a control platform not covered in the formal curriculum and documentation quality varies.",
        challenge: "Students must judge source credibility and demonstrate competence rather than simply complete tutorials.",
        approach: "Ask students to define a learning goal, curate sources, complete a practical challenge, and evaluate remaining gaps.",
        evidence: ["Learning plan", "Source credibility review", "Demonstration artifact", "Gap reflection"],
        prompts: ["How did you decide a source was trustworthy?", "What evidence shows you can transfer this learning?"]
      },
      {
        sector: "Professional practice · Growth planning",
        title: "Text holder",
        summary: "Text holder",
        context: "Text holder.",
        challenge: "Text holder.",
        approach: "Text holder.",
        evidence: ["Text holder"],
        prompts: ["Text holder"]
      }
    ]
  }
};

// ASSESSMENTS SECTION

const ASSESSMENT_DESCRIPTIONS = {
  1: "Short, focused checks that measure students’ understanding of foundational engineering concepts and reveal misconceptions early enough for instructional response.",
  2: "A practical examination in which students demonstrate accurate, efficient, and responsible use of engineering software under defined conditions.",
  3: "A structured evaluation of students’ ability to interpret environmental evidence, compare impacts, and justify sustainability recommendations.",
  4: "Text holder.",
  5: "A collection of digital artifacts that demonstrates tool proficiency, design progression, verification, and reflective growth over time.",
  6: "Text holder.",
  7: "A concise oral or poster presentation that evaluates scientific reasoning, technical accuracy, visual communication, and response to questions.",
  8: "Text holder.",
  9: "An evidence-based research paper that assesses students’ ability to investigate environmental effects and synthesize technical and societal perspectives.",
  10: "Text holder.",
  11: "A combination of peer and self-rating that makes teamwork behaviours, contribution quality, reliability, and collaborative growth visible.",
  12: "Text holder.",
  13: "A guided peer critique that assesses the logic, efficiency, assumptions, and communication of another student’s problem-solving approach.",
  14: "Text holder.",
  15: "A facilitated discussion and reflection that captures how students interpret experience, integrate feedback, and revise professional judgement.",
  16: "Text holder.",
  17: "A reflective account that connects team outcomes to individual decisions, responsibilities, contributions, and areas for improvement.",
  18: "Text holder.",
  19: "A formal research report that evaluates data quality, statistical interpretation, uncertainty, and the relationship between evidence and claims.",
  20: "Text holder.",
  21: "A financial and strategic evaluation that tests whether students can connect technical choices to cost, value, risk, and organizational feasibility.",
  22: "Text holder.",
  23: "A criterion-based review of technical documentation for completeness, traceability, precision, usability, and professional quality.",
  24: "Text holder.",
  25: "Direct observation of laboratory preparation, safe practice, procedural skill, data quality, troubleshooting, and professional conduct.",
  26: "Text holder.",
  27: "A panel review of whether a proposed project is technically credible, operationally practical, economically viable, and ready for further investment.",
  28: "Text holder.",
  29: "A reflective written analysis of professional responsibility, conduct, judgement, communication, and lessons for future engineering practice.",
  30: "Text holder.",
  31: "A live demonstration that assesses whether a prototype performs its intended function and whether students can explain results and limitations.",
  32: "Text holder.",
  33: "Verified completion of a relevant certification used as evidence of defined technical or professional competence, supported by reflection on application.",
  34: "Text holder.",
  35: "A multi-source evaluation of professional performance, collaboration, reliability, communication, and contribution in an authentic practice setting.",
  36: "Text holder."
};

const caseStudySector = document.getElementById('case-study-sector');
const caseStudyTitle = document.getElementById('case-study-title');
const caseStudySummary = document.getElementById('case-study-summary');
const caseStudyContext = document.getElementById('case-study-context');
const caseStudyChallenge = document.getElementById('case-study-challenge');
const caseStudyApproach = document.getElementById('case-study-approach');
const caseStudyEvidence = document.getElementById('case-study-evidence');
const caseStudyPrompts = document.getElementById('case-study-prompts');
let currentItemId = null;
let currentCategoryId = null;
let currentResourceType = 'activity';
let currentCases = [];

function categoryForItem(itemId, dataKey, prefix) {
  const numericId = Number(itemId.replace(`${prefix}-`, ''));
  return Number(Object.keys(CATEGORY_DATA).find(categoryId => CATEGORY_DATA[categoryId][dataKey].includes(numericId)));
}

function renderPopupPLOs(itemId, type) {
  const numericId = Number(itemId.replace(`${type}-`, ""));
  const dataKey = type === "activity" ? "learning" : "assessment";
  const outcomes = PLO_DATA[currentCategoryId].filter(outcome => outcome[dataKey].includes(numericId));
  popupPLOList.innerHTML = outcomes
    .map(outcome => `<span title="${outcome.title}">PLO ${outcome.code} · ${outcome.title}</span>`)
    .join("");
}

function assessmentProfile(title) {
  const normalized = title.toLowerCase();
  if (/quiz|test|exam/.test(normalized)) return {format: 'Individual', duration: '20–60 minutes', evidence: 'Direct knowledge'};
  if (/presentation|poster|demonstration|pitch|panel/.test(normalized)) return {format: 'Individual or team', duration: '8–15 minutes', evidence: 'Performance'};
  if (/peer|self|reflection|journal|learning plan/.test(normalized)) return {format: 'Individual reflection', duration: '15–30 minutes', evidence: 'Reflective'};
  if (/lab|prototype|simulation/.test(normalized)) return {format: 'Observed practice', duration: '1 class session', evidence: 'Performance'};
  return {format: 'Individual submission', duration: '1–2 weeks', evidence: 'Documented work'};
}

function buildAssessmentExamples(assessmentTitle, categoryId) {
  const activityTitles = CATEGORY_DATA[categoryId].learning.map(id => document.getElementById(`activity-${id}`).textContent.trim());
  return [
    {
      sector: 'Course delivery · Formative use',
      title: `Using ${assessmentTitle.toLowerCase()} during applied learning`,
      summary: `A course-level example that pairs this method with ${activityTitles[0].toLowerCase()} to provide timely evidence and feedback.`,
      context: `Students complete ${activityTitles[0].toLowerCase()} as part of a sequence addressing ${CATEGORY_RESOURCE_DATA[categoryId].name.toLowerCase()}.`,
      challenge: 'The assessment must reveal student reasoning without adding excessive marking workload or interrupting the learning experience.',
      approach: `Define two or three observable criteria, collect a concise artifact through ${assessmentTitle.toLowerCase()}, and provide feedback before the next application task.`,
      evidence: ['Observable performance criteria', 'Student work sample', 'Concise feedback record', 'Instructional follow-up note'],
      prompts: ['What decision will the evidence help the instructor make?', 'How will students use the feedback in their next task?']
    },
    {
      sector: 'Program evidence · Summative use',
      title: `Documenting graduate attribute achievement`,
      summary: `A program-level example that uses ${assessmentTitle.toLowerCase()} to produce consistent, reviewable accreditation evidence.`,
      context: `Faculty need comparable evidence from ${activityTitles[1].toLowerCase()} while preserving authentic engineering judgement.`,
      challenge: 'Scoring must be reliable across sections and evaluators while still recognizing different valid engineering approaches.',
      approach: 'Use a shared rubric, anchor examples, brief evaluator calibration, and a documented sampling plan. Store de-identified evidence with the resulting improvement action.',
      evidence: ['Shared assessment rubric', 'Anchor work samples', 'Achievement summary', 'Course improvement action'],
      prompts: ['What evidence is sufficient to support an achievement claim?', 'How will consistency be checked across evaluators?']
    }
  ];
}

function showResource(resourceName) {
  resourceNavButtons.forEach(button => {
    const selected = button.dataset.resource === resourceName;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
  });
  resourcePanels.forEach(panel => {
    panel.hidden = panel.dataset.panel !== resourceName;
  });
  if (resourceName === 'cases') {
    document.getElementById('resource-cases').classList.remove('reading');
    caseStudyList.hidden = false;
    caseStudyReader.hidden = true;
  }
  document.querySelector('.resource-main').scrollTop = 0;
}

function setStep(number, title, copy) {
  document.getElementById(`step-${number}-title`).textContent = title;
  document.getElementById(`step-${number}-copy`).textContent = copy;
}

function configureWorkspace(type) {
  const isAssessment = type === 'assessment';
  popupWorkspaceLabel.textContent = isAssessment ? 'Assessment method workspace' : 'Faculty resource workspace';
  overviewNavTitle.textContent = isAssessment ? 'Assessment brief' : 'Activity brief';
  overviewNavSubtitle.textContent = isAssessment ? 'Description & purpose' : 'Implementation guidance';
  casesNavTitle.textContent = isAssessment ? 'Application examples' : 'Case studies';
  casesNavSubtitle.textContent = isAssessment ? '2 course contexts' : '2 engineering examples';
  overviewEyebrow.textContent = isAssessment ? 'Assessment method' : 'Implementation brief';
  overviewTitle.textContent = isAssessment ? 'Design this assessment for your course' : 'Bring this activity into your course';
  casesEyebrow.textContent = isAssessment ? 'Course implementation' : 'Engineering examples';
  casesTitle.textContent = isAssessment ? 'Assessment application examples' : 'Case study library';
  casesIntro.textContent = isAssessment
    ? 'Select an example to see how this method can support formative feedback or program-level graduate attribute evidence.'
    : 'Select a case study to read the scenario, teaching approach, expected evidence, and discussion prompts.';
  templatesIntro.textContent = isAssessment
    ? 'Download an assessment-design worksheet and a four-level rubric that you can customize for your course.'
    : 'Download and customize these resources for your course, learning management system, or accreditation file.';
  plannerTypeLabel.textContent = isAssessment ? 'ASSESSMENT DESIGN' : 'ACTIVITY DESIGN';
  plannerTitle.textContent = isAssessment ? 'Assessment design worksheet' : 'Faculty planning worksheet';
  plannerDescription.textContent = isAssessment
    ? 'Define evidence targets, conditions, criteria, scoring, feedback, and accessibility checks.'
    : 'Define outcomes, constraints, student tasks, timing, and evidence collection.';
  plannerButtonLabel.textContent = isAssessment ? 'Download worksheet' : 'Download template';

  if (isAssessment) {
    setStep(1, 'Define the evidence target', 'Identify the observable performance and graduate attribute indicator this method should reveal.');
    setStep(2, 'Design the task and conditions', 'Set the prompt, permitted resources, timing, authenticity, and accessibility requirements.');
    setStep(3, 'Score, feedback, and improve', 'Apply explicit criteria, give actionable feedback, and record what the evidence suggests for course improvement.');
  } else {
    setStep(1, 'Frame the engineering context', 'Introduce the authentic constraint, stakeholder need, and expected graduate attribute.');
    setStep(2, 'Guide active application', 'Have students make, test, analyze, or defend an engineering decision using course concepts.');
    setStep(3, 'Capture evidence and reflection', 'Collect an artifact and ask students to connect their process to professional practice.');
  }
}

function renderCaseCards(cases) {
  currentCases = cases;
  caseStudyList.innerHTML = cases.map((caseStudy, index) => `
    <button class="case-study-card" type="button" data-case-index="${index}">
      <span class="case-index">${currentResourceType === 'assessment' ? 'EXAMPLE' : 'CASE'} ${String(index + 1).padStart(2, '0')}</span>
      <small>${caseStudy.sector}</small>
      <h4>${caseStudy.title}</h4>
      <p>${caseStudy.summary}</p>
    </button>
  `).join('');
  caseStudyList.querySelectorAll('.case-study-card').forEach(button => {
    button.addEventListener('click', () => openCaseStudy(Number(button.dataset.caseIndex)));
  });
}

function renderActivityResources(activityId) {
  currentItemId = activityId;
  currentResourceType = 'activity';
  currentCategoryId = categoryForItem(activityId, 'learning', 'activity');
  const category = CATEGORY_RESOURCE_DATA[currentCategoryId];
  const activityTitle = document.getElementById(activityId).textContent.trim();
  configureWorkspace('activity');

  popupActivity.textContent = activityTitle;
  popupAttributeCode.textContent = `GA ${String(currentCategoryId).padStart(2, '0')}`;
  popupAttributeName.textContent = category.name;
  renderPopupPLOs(activityId, "activity");
  activityObjective.textContent = `Use ${activityTitle.toLowerCase()} to help students apply course knowledge and produce observable evidence of ${category.name.toLowerCase()}.`;
  recommendedFormat.textContent = 'Small teams';
  suggestedDuration.textContent = '1–2 sessions';
  evidenceType.textContent = 'Applied work';
  alignedEvidenceTitle.textContent = 'Aligned assessment evidence';
  const bannerSource = ACTIVITY_BANNERS[activityId] || '';
  popupBanner.src = bannerSource;
  popupBanner.style.display = bannerSource ? 'block' : 'none';
  alignedAssessments.innerHTML = CATEGORY_DATA[currentCategoryId].assessment
    .map(id => `<span>${document.getElementById(`assessment-${id}`).textContent.trim()}</span>`).join('');
  renderCaseCards(category.cases);

  const externalResource = ACTIVITY_DOWNLOADS[activityId];
  externalTemplateCard.hidden = !externalResource;
  if (externalResource) {
    externalTemplateTitle.textContent = externalResource.text;
    popupTemplateLink.href = externalResource.url;
  }
  showResource('overview');
}

//
function renderAssessmentResources(assessmentId) {
  currentItemId = assessmentId;
  currentResourceType = 'assessment';
  currentCategoryId = categoryForItem(assessmentId, 'assessment', 'assessment');
  const category = CATEGORY_RESOURCE_DATA[currentCategoryId];
  const assessmentNumber = Number(assessmentId.replace('assessment-', ''));
  const assessmentTitle = document.getElementById(assessmentId).textContent.trim();
  const profile = assessmentProfile(assessmentTitle);
  configureWorkspace('assessment');

  popupActivity.textContent = assessmentTitle;
  popupAttributeCode.textContent = `GA ${String(currentCategoryId).padStart(2, '0')}`;
  popupAttributeName.textContent = category.name;
  renderPopupPLOs(assessmentId, "assessment");
  activityObjective.textContent = ASSESSMENT_DESCRIPTIONS[assessmentNumber];
  recommendedFormat.textContent = profile.format;
  suggestedDuration.textContent = profile.duration;
  evidenceType.textContent = profile.evidence;
  alignedEvidenceTitle.textContent = 'Aligned experiential learning activities';


  
// Get the customized background image assigned to this assessment.
// Each assessment has its own image in the ASSESSMENT_BANNERS list.
const bannerSource = ASSESSMENT_BANNERS[assessmentId] || '';

// Display the selected image in the pop-up header.
popupBanner.src = bannerSource;
popupBanner.style.display = bannerSource ? 'block' : 'none';



  alignedAssessments.innerHTML = CATEGORY_DATA[currentCategoryId].learning
    .map(id => `<span>${document.getElementById(`activity-${id}`).textContent.trim()}</span>`).join('');
  renderCaseCards(buildAssessmentExamples(assessmentTitle, currentCategoryId));
  externalTemplateCard.hidden = true;
  showResource('overview');
}

function openCaseStudy(index) {
  const caseStudy = currentCases[index];
  caseStudySector.textContent = caseStudy.sector;
  caseStudyTitle.textContent = caseStudy.title;
  caseStudySummary.textContent = caseStudy.summary;
  caseStudyContext.textContent = caseStudy.context;
  caseStudyChallenge.textContent = caseStudy.challenge;
  caseStudyApproach.textContent = caseStudy.approach;
  caseStudyEvidence.innerHTML = caseStudy.evidence.map(item => `<li>${item}</li>`).join('');
  caseStudyPrompts.innerHTML = caseStudy.prompts.map(item => `<li>${item}</li>`).join('');

  const imageSource = currentResourceType === 'activity' && index === 0 ? (ACTIVITY_IMAGES[currentItemId] || '') : '';
  popupImage.src = imageSource;
  popupImage.style.display = imageSource ? 'block' : 'none';
  popupImage.alt = imageSource ? `${caseStudy.title} case study visual` : '';
  document.getElementById('resource-cases').classList.add('reading');
  caseStudyList.hidden = true;
  caseStudyReader.hidden = false;
  document.querySelector('.resource-main').scrollTop = 0;
  backToCases.focus();
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}

function downloadTemplate(type) {
  const itemTitle = document.getElementById(currentItemId).textContent.trim();
  const category = CATEGORY_RESOURCE_DATA[currentCategoryId];
  const isAssessment = currentResourceType === 'assessment';
  const relatedItems = CATEGORY_DATA[currentCategoryId][isAssessment ? 'learning' : 'assessment']
    .map(id => document.getElementById(`${isAssessment ? 'activity' : 'assessment'}-${id}`).textContent.trim());
  const safeTitle = escapeHtml(itemTitle);
  const safeCategory = escapeHtml(category.name);
  const slug = itemTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 55);

  const activityPlannerBody = `
    <h1>Faculty Activity Planning Worksheet</h1><p class="subtitle">${safeTitle}</p>
    <table class="meta"><tr><th>Graduate attribute</th><td>GA ${String(currentCategoryId).padStart(2, '0')} — ${safeCategory}</td></tr><tr><th>Course / term</th><td></td></tr><tr><th>Instructor</th><td></td></tr></table>
    <h2>1. Learning intention</h2><p>What should students know or be able to demonstrate after this activity?</p><div class="writing"></div>
    <h2>2. Engineering context and constraints</h2><p>Describe the authentic problem, stakeholders, constraints, and resources.</p><div class="writing tall"></div>
    <h2>3. Student workflow</h2><table><tr><th>Phase</th><th>Student task</th><th>Faculty support</th><th>Time</th></tr><tr><td>Prepare</td><td></td><td></td><td></td></tr><tr><td>Apply</td><td></td><td></td><td></td></tr><tr><td>Reflect</td><td></td><td></td><td></td></tr></table>
    <h2>4. Evidence collection</h2><p>Suggested aligned methods: ${relatedItems.map(escapeHtml).join('; ')}.</p><div class="writing"></div>
    <h2>5. Inclusion, safety, and accessibility</h2><div class="writing"></div><h2>6. Post-activity reflection</h2><div class="writing tall"></div>`;

  const assessmentPlannerBody = `
    <h1>Assessment Method Design Worksheet</h1><p class="subtitle">${safeTitle}</p>
    <table class="meta"><tr><th>Graduate attribute</th><td>GA ${String(currentCategoryId).padStart(2, '0')} — ${safeCategory}</td></tr><tr><th>Course / term</th><td></td></tr><tr><th>Evaluator</th><td></td></tr></table>
    <h2>1. Evidence target</h2><p>What observable knowledge, skill, or professional judgement should this assessment reveal?</p><div class="writing tall"></div>
    <h2>2. Assessment description</h2><p>${escapeHtml(ASSESSMENT_DESCRIPTIONS[Number(currentItemId.replace('assessment-', ''))])}</p>
    <h2>3. Task, conditions, and instructions</h2><table><tr><th>Prompt / task</th><td></td></tr><tr><th>Time and resources</th><td></td></tr><tr><th>Individual / team conditions</th><td></td></tr><tr><th>Submission format</th><td></td></tr></table>
    <h2>4. Criteria and scoring</h2><p>Define the criteria, performance levels, weighting, and minimum acceptable achievement.</p><div class="writing tall"></div>
    <h2>5. Feedback plan</h2><p>When and how will students receive feedback, and what will they do with it?</p><div class="writing"></div>
    <h2>6. Validity, fairness, and accessibility check</h2><div class="writing tall"></div>
    <h2>7. Evidence management</h2><p>Aligned learning contexts: ${relatedItems.map(escapeHtml).join('; ')}.</p><div class="writing"></div>`;

  const rubricBody = `
    <h1>Graduate Attribute Assessment Rubric</h1><p class="subtitle">${safeTitle}</p>
    <table class="meta"><tr><th>Graduate attribute</th><td>GA ${String(currentCategoryId).padStart(2, '0')} — ${safeCategory}</td></tr><tr><th>Student / team</th><td></td></tr><tr><th>Evaluator</th><td></td></tr></table>
    <table class="rubric"><tr><th>Criterion</th><th>Beginning</th><th>Developing</th><th>Proficient</th><th>Advanced</th></tr><tr><th>Engineering knowledge</th><td>Uses concepts inaccurately or without justification.</td><td>Applies relevant concepts with gaps.</td><td>Applies appropriate concepts accurately.</td><td>Integrates concepts insightfully across the problem.</td></tr><tr><th>Process and decisions</th><td>Process is unclear or unsupported.</td><td>Documents a partial process with limited rationale.</td><td>Uses a systematic process and explains decisions.</td><td>Adapts the process thoughtfully as evidence changes.</td></tr><tr><th>Quality of evidence</th><td>Claims lack relevant evidence.</td><td>Evidence is present but incomplete.</td><td>Evidence is relevant, sufficient, and traceable.</td><td>Evidence is critically evaluated for quality and limits.</td></tr><tr><th>Reflection and transfer</th><td>Reflection is descriptive only.</td><td>Identifies lessons with limited application.</td><td>Connects lessons to future engineering practice.</td><td>Defines specific, evidence-based improvements.</td></tr></table>
    <h2>Evaluator feedback</h2><div class="writing tall"></div><h2>Next step for learning</h2><div class="writing"></div>`;

  const content = type === 'rubric' ? rubricBody : (isAssessment ? assessmentPlannerBody : activityPlannerBody);
  const documentName = type === 'rubric' ? 'Assessment Rubric' : (isAssessment ? 'Assessment Design Worksheet' : 'Activity Planner');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${documentName} — ${safeTitle}</title><style>body{max-width:900px;margin:40px auto;padding:0 30px;color:#14243a;font:14px Arial,sans-serif;line-height:1.5}h1{margin-bottom:4px;color:#0b2b4b;font-size:28px}.subtitle{margin-top:0;color:#1769e0;font-size:18px}h2{margin-top:30px;padding-bottom:7px;border-bottom:2px solid #1f77d0;font-size:17px}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{min-height:34px;padding:10px;border:1px solid #aebdca;text-align:left;vertical-align:top}.meta th{width:180px;background:#edf4fa}.rubric th{background:#e7f0f8}.rubric th:first-child{width:150px}.writing{height:75px;border:1px solid #b9c6d2;background:repeating-linear-gradient(#fff,#fff 27px,#e4eaf0 28px)}.writing.tall{height:120px}@media print{body{margin:0;padding:0 10px}h2{break-after:avoid}.rubric{font-size:11px}}</style></head><body>${content}</body></html>`;
  const blob = new Blob([html], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slug}-${type === 'rubric' ? 'assessment-rubric' : (isAssessment ? 'assessment-design' : 'activity-planner')}.html`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function closePopup() {
  popup.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocusedElement) lastFocusedElement.focus();
}

resourceNavButtons.forEach(button => {
  button.addEventListener('click', () => showResource(button.dataset.resource));
});
backToCases.addEventListener('click', () => {
  document.getElementById('resource-cases').classList.remove('reading');
  caseStudyReader.hidden = true;
  caseStudyList.hidden = false;
  caseStudyList.querySelector('.case-study-card')?.focus();
});
document.querySelectorAll('.download-button[data-template]').forEach(button => {
  button.addEventListener('click', () => downloadTemplate(button.dataset.template));
});

//WORK IN PROGRESS


// Make activity and assessment boxes clickable.
// Only the first two assessment methods will be clickable.
document.querySelectorAll('.rectangle').forEach(rect => {

  // Identify assessment boxes.
  const isAssessment = rect.id.startsWith('assessment-');

  // Extract the assessment number from its ID.
  const assessmentNumber = isAssessment
    ? Number(rect.id.replace('assessment-', ''))
    : null;

  // Allow activities to remain clickable.
  // For assessments, only allow numbers 1 and 2.
  const isClickable = !isAssessment || assessmentNumber <= 2;

  // If this assessment is not clickable, leave it visible and skip its click actions.
  if (!isClickable) {
    rect.style.cursor = 'default';
    rect.setAttribute('aria-disabled', 'true');
    return;
  }

  // Make clickable boxes accessible using a keyboard.
  rect.setAttribute('role', 'button');
  rect.setAttribute('tabindex', '0');

  // This function opens the selected activity or assessment.
  const openPopup = () => {

    document.querySelectorAll('.rectangle').forEach(element =>
      element.classList.remove('selected')
    );

    rect.classList.add('selected');

    if (rect.classList.contains('grey')) {
      renderActivityResources(rect.id);
    } else {
      renderAssessmentResources(rect.id);
    }

    lastFocusedElement = document.activeElement;
    popup.hidden = false;
    document.body.classList.add('modal-open');
    closeBtn.focus();
  };

  // Open the pop-up when clicked.
  rect.addEventListener('click', openPopup);

  // Allow keyboard users to open the pop-up with Enter or Space.
  rect.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPopup();
    }
  });
});


closeBtn.addEventListener('click', closePopup);
popup.addEventListener('click', event => {
  if (event.target === popup) closePopup();
});
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !popup.hidden) closePopup();
});
