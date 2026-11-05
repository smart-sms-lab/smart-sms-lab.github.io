const toggle = document.getElementById("multiSelectToggle");
const modeLabel = document.getElementById("modeLabel");
const clearSelectionButton = document.getElementById("clearSelection");
const selectionSummary = document.getElementById("selectionSummary");
const activityCount = document.getElementById("activityCount");
const assessmentCount = document.getElementById("assessmentCount");
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
const categoryButtons = [...document.querySelectorAll(".category-icon")];
const activityElements = [...document.querySelectorAll(".rectangle.grey")];
const assessmentElements = [...document.querySelectorAll(".rectangle.white")];

// ==========================================
// GRADUATE ATTRIBUTE FLOATING HOVER PREVIEW
// ==========================================

const CATEGORY_HOVER_DATA = {
  1: {
    image: "Images/ga1-hover.png",
    title: "Knowledge Base for Engineering",
    description: "Apply knowledge of mathematics, natural sciences, engineering fundamentals, and specialized engineering knowledge to solve complex engineering problems."
  },
  2: {
    image: "Images/ga2-hover.png",
    title: "Problem Analysis",
    description: "Identify, formulate, analyze, and solve complex engineering problems using engineering principles and analytical methods."
  },
  3: {
    image: "Images/ga3-hover.png",
    title: "Investigation",
    description: "Investigate complex problems through research, experimentation, data analysis, and interpretation of results."
  },
  4: {
    image: "Images/ga4-hover.png",
    title: "Design",
    description: "Design solutions for complex engineering problems while considering public health, safety, environmental, and societal factors."
  },
  5: {
    image: "Images/ga5-hover.png",
    title: "Use of Engineering Tools",
    description: "Create, select, apply, and adapt appropriate engineering techniques, resources, and modern engineering tools."
  },
  6: {
    image: "Images/ga6-hover.png",
    title: "Individual and Teamwork",
    description: "Work effectively as an individual and as a member or leader of diverse teams in multidisciplinary environments."
  },
  7: {
    image: "Images/ga7-hover.png",
    title: "Communication Skills",
    description: "Communicate complex engineering concepts effectively with technical and non-technical audiences."
  },
  8: {
    image: "Images/ga8-hover.png",
    title: "Professionalism",
    description: "Demonstrate professional responsibilities, ethical conduct, accountability, and an understanding of engineering practice."
  },
  9: {
    image: "Images/ga9-hover.png",
    title: "Impact on Society and Environment",
    description: "Understand the societal, environmental, and sustainability impacts of engineering activities and solutions."
  },
  10: {
    image: "Images/ga10-hover.png",
    title: "Ethics and Equity",
    description: "Apply ethical principles and demonstrate respect for equity, diversity, inclusion, and the public interest."
  },
  11: {
    image: "Images/ga11-hover.png",
    title: "Economics and Project Management",
    description: "Apply economic principles and project management concepts to plan, organize, and deliver engineering projects."
  },
  12: {
    image: "Images/ga12-hover.png",
    title: "Lifelong Learning",
    description: "Recognize the need for independent, continuous learning and adapt to emerging technologies and developments in engineering."
  }
};

// Get floating preview elements
const gaPreview = document.getElementById("ga-hover-preview");
const gaPreviewImage = document.getElementById("ga-preview-image");
const gaPreviewNumber = document.getElementById("ga-preview-number");
const gaPreviewTitle = document.getElementById("ga-preview-title");
const gaPreviewDescription = document.getElementById("ga-preview-description");

// Show floating preview
function showGAPreview(categoryId) {
  const data = CATEGORY_HOVER_DATA[categoryId];

  if (!data) return;

  gaPreviewImage.src = data.image;
  gaPreviewImage.alt = data.title;

  gaPreviewNumber.textContent =
    `GRADUATE ATTRIBUTE ${String(categoryId).padStart(2, "0")}`;

  gaPreviewTitle.textContent = data.title;
  gaPreviewDescription.textContent = data.description;

  gaPreview.classList.add("is-visible");
}

// Hide floating preview
function hideGAPreview() {
  gaPreview.classList.remove("is-visible");
}

// Attach hover and keyboard events
categoryButtons.forEach(button => {
  const categoryId = Number(button.dataset.categoryId);

  button.addEventListener("mouseenter", () => {
    showGAPreview(categoryId);
  });

  button.addEventListener("mouseleave", hideGAPreview);

  button.addEventListener("focus", () => {
    showGAPreview(categoryId);
  });

  button.addEventListener("blur", hideGAPreview);
});




function showElement(element, visible) {
  element.style.display = visible ? "flex" : "none";
}

function renderSelection() {
  const hasSelection = activeCategories.size > 0;
  const visibleActivities = new Set();
  const visibleAssessments = new Set();

  categoryButtons.forEach(button => {
    const categoryId = Number(button.dataset.categoryId);
    const selected = activeCategories.has(categoryId);
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (hasSelection) {
    activeCategories.forEach(categoryId => {
      const data = CATEGORY_DATA[categoryId];
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

  activityElements.forEach(element => {
    const id = Number(element.id.replace("activity-", ""));
    showElement(element, !hasSelection || visibleActivities.has(id));
    if (!hasSelection) {
      element.style.backgroundColor = "";
      element.style.borderLeftColor = "";
    }
  });

  assessmentElements.forEach(element => {
    const id = Number(element.id.replace("assessment-", ""));
    showElement(element, !hasSelection || visibleAssessments.has(id));
    if (!hasSelection) {
      element.style.color = "";
      element.style.borderLeftColor = "";
      element.style.fontWeight = "";
    }
  });

  activityCount.textContent = hasSelection ? visibleActivities.size : activityElements.length;
  assessmentCount.textContent = hasSelection ? visibleAssessments.size : assessmentElements.length;

  if (!hasSelection) {
    selectionSummary.textContent = "Showing all recommendations";
    return;
  }

  const selectedNames = categoryButtons
    .filter(button => activeCategories.has(Number(button.dataset.categoryId)))
    .map(button => button.querySelector(".category-name").textContent);
  selectionSummary.textContent = `${activeCategories.size} selected · ${selectedNames.join(" + ")}`;
}

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

toggle.addEventListener("change", () => {
  multiSelectEnabled = toggle.checked;
  modeLabel.textContent = multiSelectEnabled ? "Multiple attributes enabled" : "One attribute at a time";

  if (!multiSelectEnabled && activeCategories.size > 1) {
    const firstSelection = activeCategories.values().next().value;
    activeCategories.clear();
    activeCategories.add(firstSelection);
    renderSelection();
  }
});

clearSelectionButton.addEventListener("click", () => {
  activeCategories.clear();
  renderSelection();
});

renderSelection();

//Activities data
// Popup elements
const popup = document.getElementById('popup');
const popupActivity = document.getElementById('popup-activity');
const popupCaseStudy = document.getElementById('popup-case-study');
const popupDownloable = document.getElementById('popup-downloable');
const popupImage = document.getElementById('popup-image');
const closeBtn = document.getElementById('close');
const popupBanner = document.getElementById('popup-banner');
const popupResourceSection = document.querySelector('.popup-bottom');
let lastFocusedElement = null;


// If you want custom text per activity:
const ACTIVITY_INFO = {
  "activity-1": "Details for Activity 1: Hands-on lab experiments…",
  "activity-2": "Details for Activity 2: Capstone design projects…",
  // ...add more as needed
};

// NEW: MAP OF CASE STUDY IMAGES LINKS FOR EACH LEARNING ACTIVITY
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
const ACTIVITY_BANNERS = {
  //Graduate attribute 1: Knowledge base
  "activity-1": "Images/ga1-banner.png",
  "activity-4": "Images/ga1-banner.png",
  "activity-7": "Images/ga1-banner.png",
  // Graduate attribute 2: Problem analysis
  "activity-10": "Images/ga2-banner.png",
  "activity-13": "Images/ga2-banner.png",
  "activity-16": "Images/ga2-banner.png",
  //Graduate attribute 3: Investigation
  "activity-19": "Images/ga3-banner.png",
  "activity-22": "Images/ga3-banner.png",
  "activity-25": "Images/ga3-banner.png",
  //Graduate attribute 4: Design 
  "activity-2": "Images/ga4-banner.png",
  "activity-5": "Images/ga4-banner.png",
  "activity-8": "Images/ga4-banner.png",
  //Graduate attribute 5: Use of engineering tools activities
  "activity-11": "Images/ga5-banner.png",
  "activity-14": "Images/ga5-banner.png",
  "activity-17": "Images/ga5-banner.png",
  //Graduate attribute 6: Individual and teamwork activities
  "activity-20": "Images/ga6-banner.png",
  "activity-23": "Images/ga6-banner.png",
  "activity-26": "Images/ga6-banner.png",
   //Graduate attribute 7: Communication skills activities
  "activity-3": "Images/ga7-banner.png",
  "activity-6": "Images/ga7-banner.png",
  "activity-9": "Images/ga7-banner.png",
  ///Graduate attribute 8: Professionalism
  "activity-12": "Images/ga8-banner.png",
  "activity-15": "Images/ga8-banner.png",
  "activity-18": "Images/ga8-banner.png",
  //Graduate attribute 9: Impact of engineering activities
  "activity-21": "Images/ga9-banner.png",
  "activity-24": "Images/ga9-banner.png",
  "activity-27": "Images/ga9-banner.png",
  //Graduate attribute 10: Ethics and quality
  "activity-28": "Images/ga10-banner.png",
  "activity-31": "Images/ga10-banner.png",
  "activity-34": "Images/ga10-banner.png",
  //Graduate attribute 11: Economics and project management 
  "activity-29": "Images/ga11-banner.png",
  "activity-32": "Images/ga11-banner.png",
  "activity-35": "Images/ga11-banner.png",
  //Graduate attribute 12: Lifelong learning activities
  "activity-30": "Images/ga12-banner.png",
  "activity-33": "Images/ga12-banner.png",
  "activity-36": "Images/ga12-banner.png",

};



// NEW: MAP OF ACTIVITY IDS TO TITLE COLORS
const ACTIVITY_COLORS = {
  // Knowledge base activities
  "activity-1": "#4F89E7", 
  "activity-4": "#4F89E7", 
  "activity-7": "#4F89E7", 
  // Problem analysis activities
  "activity-10": "#10A6D8",
  "activity-13": "#10A6D8",
  "activity-16": "#10A6D8",
  //Investigation activities
  "activity-19": "#35C27F",
  "activity-22": "#35C27F",
  "activity-25": "#35C27F",
  // Design activities
  "activity-2": "#90BC35",
  "activity-5": "#90BC35",
  "activity-8": "#90BC35",
  //Use of engineering tools activities
  "activity-11": "#CDBB15",
  "activity-14": "#CDBB15",
  "activity-17": "#CDBB15",
  //Individual and teamwork activities
  "activity-20": "#E9AB72",
  "activity-23": "#E9AB72",
  "activity-26": "#E9AB72",
  //Communication skills activities
  "activity-3": "#F09D74",
  "activity-6": "#F09D74",
  "activity-9": "#F09D74",
  //Professionalism activities
  "activity-12": "#F2AA84",
  "activity-15": "#F2AA84",
  "activity-18": "#F2AA84",
  //Impact of engineering activities
  "activity-21": "#B684DC",
  "activity-24": "#B684DC",
  "activity-27": "#B684DC",
  //Ethics and equity activities
  "activity-28": "#9D58D0",
  "activity-31": "#9D58D0",
  "activity-34": "#9D58D0",
  //Economics and project management activities
  "activity-29": "#E993C6",
  "activity-32": "#E993C6",
  "activity-35": "#E993C6",
  //Lifelong learning activities
  "activity-30": "#E472B3",
  "activity-33": "#E472B3",
  "activity-36": "#E472B3",



};

// Activity resource dialog
function closePopup() {
  popup.hidden = true;
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll('.rectangle.grey').forEach(rect => {
  rect.setAttribute("role", "button");
  rect.setAttribute("tabindex", "0");

  const openPopup = () => {
    document.querySelectorAll('.rectangle.grey').forEach(element => element.classList.remove('selected'));
    rect.classList.add('selected');
    popupActivity.textContent = rect.textContent.trim();

    popupBanner.src = ACTIVITY_BANNERS[rect.id] || "";
    popupBanner.style.display = popupBanner.src ? "block" : "none";

    popupImage.src = ACTIVITY_IMAGES[rect.id] || "";
    popupImage.style.display = popupImage.src ? "block" : "none";
    popupCaseStudy.style.display = popupImage.src ? "block" : "none";

    if (ACTIVITY_DOWNLOADS[rect.id]) {
      popupTemplateLink.href = ACTIVITY_DOWNLOADS[rect.id].url;
      popupTemplateLink.textContent = ACTIVITY_DOWNLOADS[rect.id].text;
      popupResourceSection.hidden = false;
    } else {
      popupTemplateLink.removeAttribute("href");
      popupResourceSection.hidden = true;
    }

    lastFocusedElement = document.activeElement;
    popup.hidden = false;
    document.body.classList.add("modal-open");
    closeBtn.focus();
  };

  rect.addEventListener('click', openPopup);
  rect.addEventListener('keydown', event => {
    if (event.key === "Enter" || event.key === " ") {
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
  if (event.key === "Escape" && !popup.hidden) closePopup();
});
