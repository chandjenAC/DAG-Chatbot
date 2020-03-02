import GraphConfig, {
  COMPLEX_CIRCLE_TYPE,
  SQUARE_TYPE,
  POLY_TYPE,
  SPECIAL_CHILD_SUBTYPE,
  SPECIAL_EDGE_TYPE,
  SPECIAL_TYPE,
  SKINNY_TYPE,
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  NODE_KEY
} from "../config/graph-config";

export const rootGraph = {
  edges: [
    {
      handleText: "KYB",
      handleTooltipText: "Know Your Business",
      source: "onBoarding",
      target: "KYB",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Director Verify",
      handleTooltipText: "Director Verify Condition",
      source: "KYB",
      target: "directorVerify",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Director User Verify",
      handleTooltipText: "Director User Verify Condition",
      source: "directorVerify",
      target: "directorUserVerify",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Sponsor/Review",
      handleTooltipText: "Sponsor/Review",
      source: "directorUserVerify",
      target: "sponserUser",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Creating Avatar",
      handleTooltipText: "Avatar Creation",
      source: "sponserUser",
      target: "createAvatar",
      type: EMPTY_EDGE_TYPE
    }
  ],
  nodes: [
    {
      id: "onBoarding",
      title: "OnBoarding"
    },
    {
      id: "KYB",
      title: "KYB Verify",
      x: 0,
      y: 500
    },
    {
      id: "directorVerify",
      title: "Director Verify",
      x: 0,
      y: 1000
    },
    {
      id: "directorUserVerify",
      title: "Director User Verify",
      x: 0,
      y: 1500
    },
    {
      id: "sponserUser",
      title: "Manual Sponser User Review",
      x: 0,
      y: 2000
    },
    {
      id: "createAvatar",
      title: "Create Avatar",
      x: 0,
      y: 2500
    }
  ]
};

export const getOnBoarding = graph => {
  graph.nodes = [
    {
      id: "userAuth",
      title: "ID Discovery",
      type: SPECIAL_TYPE,
      x: 500,
      y: 0
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Discover ID",
      handleTooltipText: "Verifying",
      source: "onBoarding",
      target: "userAuth",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getKYB = graph => {
  graph.nodes = [
    {
      id: "attachKYB",
      title: "Attach KYB Documents",
      type: EMPTY_TYPE,
      x: 1000,
      y: 500
    },
    {
      id: "globalID",
      title: "Federal ID Verify",
      type: SPECIAL_TYPE,
      x: 500,
      y: 400
    },
    {
      id: "indianID",
      title: "CIN/GSTIN Verify",
      type: SPECIAL_TYPE,
      x: 500,
      y: 600
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Attach KYB Docs.",
      handleTooltipText: "KYB Document Check",
      source: "KYB",
      target: "attachKYB",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Verify Federal ID(Global)",
      handleTooltipText: "Verifying",
      source: "KYB",
      target: "globalID",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Verify CIN/GSTIN(Indian)",
      handleTooltipText: "Verifying",
      source: "KYB",
      target: "indianID",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getAttachKYB = graph => {
  graph.nodes = [
    {
      id: "browserUpload",
      title: "Upload Document via Browser",
      type: SKINNY_TYPE,
      x: 1500,
      y: 400
    },
    {
      id: "cloudUpload",
      title: "Upload Document via NextCloud-Folder-Sync",
      type: SKINNY_TYPE,
      x: 1500,
      y: 500
    },
    {
      id: "emailAttach",
      title: "Upload Document via Email Attachment",
      type: SKINNY_TYPE,
      x: 1500,
      y: 600
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "via Browser",
      handleTooltipText: "File Upload",
      source: "attachKYB",
      target: "browserUpload",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "via NextCloud",
      handleTooltipText: "File Upload",
      source: "attachKYB",
      target: "cloudUpload",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "via Email",
      handleTooltipText: "File Upload",
      source: "attachKYB",
      target: "emailAttach",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getDirectorVerify = graph => {
  graph.nodes = [
    {
      id: "globalTrulioo",
      title: "Global Director Verify",
      type: SPECIAL_TYPE,
      x: 500,
      y: 900
    },
    {
      id: "indianAadhar",
      title: "Indian Director Verify",
      type: SPECIAL_TYPE,
      x: 500,
      y: 1100
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Global Director Verification",
      handleTooltipText: "Verifying",
      source: "directorVerify",
      target: "globalTrulioo",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian Director Verification",
      handleTooltipText: "Verifying",
      source: "directorVerify",
      target: "indianAadhar",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getDirectorUserVerify = graph => {
  graph.nodes = [
    {
      id: "attachDirectorID",
      title: "Attach Director ID",
      type: EMPTY_TYPE,
      x: 1000,
      y: 1400
    },
    {
      id: "directorKYC",
      title: "Director KYC Verify",
      type: EMPTY_TYPE,
      x: 1000,
      y: 1600
    },
    {
      id: "globalEmail",
      title: "Email Verification",
      type: SPECIAL_TYPE,
      x: 500,
      y: 1200
    },
    {
      id: "globalMobile",
      title: "Mobile Verification",
      type: SPECIAL_TYPE,
      x: 500,
      y: 1800
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Attach Director ID",
      handleTooltipText: "Director Doc. Check",
      source: "directorUserVerify",
      target: "attachDirectorID",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Director KYC Verify",
      handleTooltipText: "Verifying",
      source: "directorUserVerify",
      target: "directorKYC",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Global Email Verify",
      handleTooltipText: "Verifying",
      source: "directorUserVerify",
      target: "globalEmail",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Global Mobile Verify",
      handleTooltipText: "Verifying",
      source: "directorUserVerify",
      target: "globalMobile",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getDirectorID = graph => {
  graph.nodes = [
    {
      id: "emailAttach",
      title: "Upload Document via Email Attachment",
      type: SKINNY_TYPE,
      x: 1500,
      y: 1000
    },
    {
      id: "cloudUpload",
      title: "Upload Document via Mobile Attachment",
      type: SKINNY_TYPE,
      x: 1500,
      y: 1200
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "via Email",
      handleTooltipText: "File Upload",
      source: "attachDirectorID",
      target: "emailAttach",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "via Mobile",
      handleTooltipText: "File Upload",
      source: "attachDirectorID",
      target: "cloudUpload",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getDirectorKYC = graph => {
  graph.nodes = [
    {
      id: "globalTrulioo",
      title: "Global Driving License",
      type: SPECIAL_TYPE,
      x: 1500,
      y: 1300
    },
    {
      id: "indianDL",
      title: "Indian Driving License",
      type: SPECIAL_TYPE,
      x: 1500,
      y: 1500
    },
    {
      id: "aadhar",
      title: "Indian Aadhar",
      type: SPECIAL_TYPE,
      x: 1500,
      y: 1700
    },
    {
      id: "indianPassport",
      title: "Indian Passport",
      type: SPECIAL_TYPE,
      x: 1500,
      y: 1900
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Global DL",
      handleTooltipText: "Verifying",
      source: "directorKYC",
      target: "globalTrulioo",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian DL",
      handleTooltipText: "Director User Verify Condition",
      source: "directorKYC",
      target: "indianDL",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian Aadhar",
      handleTooltipText: "Verifying",
      source: "directorKYC",
      target: "aadhar",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian Passport",
      handleTooltipText: "Verifying",
      source: "directorKYC",
      target: "indianPassport",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getSanction = graph => {
  graph.nodes = [
    {
      id: "globalScan",
      title: "Global Sanction Scanner",
      type: POLY_TYPE,
      x: 500,
      y: 2250
    },
    {
      id: "alert",
      title: "Alert if PEP or fraud!!!",
      type: COMPLEX_CIRCLE_TYPE,
      x: 1000,
      y: 2550
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Scanning",
      handleTooltipText: "Screening",
      source: "sanction",
      target: "globalScan",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Alert if PEP or Fraudulent!!",
      handleTooltipText: "Alert",
      source: "globalScan",
      target: "alert",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getCreditRating = graph => {
  graph.nodes = [
    {
      id: "globalBusiness",
      title: "Global Business Credit Rating",
      type: POLY_TYPE,
      x: 500,
      y: 2700
    },
    {
      id: "globalIndividual",
      title: "Global Individual Credit Rating",
      type: POLY_TYPE,
      x: 500,
      y: 2900
    },
    {
      id: "indianCommercial",
      title: "Indian Commercial Credit Rating",
      type: POLY_TYPE,
      x: 500,
      y: 3100
    },
    {
      id: "indianIndividual",
      title: "Indian Individual Credit Rating",
      type: POLY_TYPE,
      x: 500,
      y: 3300
    },
    {
      id: "alert",
      title: "Alert if high risk!!!",
      type: COMPLEX_CIRCLE_TYPE,
      x: 1000,
      y: 3000
    },

    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Global Business",
      handleTooltipText: "Checking",
      source: "creditRating",
      target: "globalBusiness",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Global Individual",
      handleTooltipText: "Checking",
      source: "creditRating",
      target: "globalIndividual",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian Commercial",
      handleTooltipText: "Checking",
      source: "creditRating",
      target: "indianCommercial",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Indian Individual",
      handleTooltipText: "Checking",
      source: "creditRating",
      target: "indianIndividual",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Alert if high risk!!!",
      handleTooltipText: "Alert",
      source: "globalBusiness",
      target: "alert",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Alert if high risk!!!",
      handleTooltipText: "Alert",
      source: "globalIndividual",
      target: "alert",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Alert if high risk!!!",
      handleTooltipText: "Alert",
      source: "indianCommercial",
      target: "alert",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Alert if high risk!!!",
      handleTooltipText: "Alert",
      source: "indianIndividual",
      target: "alert",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const getSponserUser = graph => {
  graph.nodes = [
    {
      id: "review",
      title: " Review",
      type: SQUARE_TYPE,
      x: 1000,
      y: 1800
    },
    {
      id: "authorise",
      title: "Authorize",
      type: SQUARE_TYPE,
      x: 1000,
      y: 2200
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "User Review",
      handleTooltipText: "Sponsor",
      source: "sponserUser",
      target: "review",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Authorize User",
      handleTooltipText: "Sponsor",
      source: "sponserUser",
      target: "authorise",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};

export const createAvatar = graph => {
  graph.nodes = [
    {
      id: "compliance",
      title: "Yogi Compliance Check",
      type: SQUARE_TYPE,
      x: 500,
      y: 2200
    },
    {
      id: "reputation",
      title: "Yogi Reputation Score",
      type: SQUARE_TYPE,
      x: 500,
      y: 2400
    },
    {
      id: "avatarQRCode",
      title: "Avatar-QR-Code-Assign",
      type: SQUARE_TYPE,
      x: 500,
      y: 2600
    },
    {
      id: "avatarCreated",
      title: "Avatar Token Activate",
      type: SQUARE_TYPE,
      x: 500,
      y: 2800
    },
    ...graph.nodes
  ];
  graph.edges = [
    {
      handleText: "Yogi Compliance Check",
      handleTooltipText: "Compliance Check",
      source: "createAvatar",
      target: "compliance",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Yogi Reputation Score",
      handleTooltipText: "Reputation Score",
      source: "createAvatar",
      target: "reputation",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Avatar-QR-Code-Assign",
      handleTooltipText: "Assigning QR-Code",
      source: "createAvatar",
      target: "avatarQRCode",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Avatar-Token-Activate",
      handleTooltipText: "Activate Token",
      source: "createAvatar",
      target: "avatarCreated",
      type: EMPTY_EDGE_TYPE
    },
    ...graph.edges
  ];
  return graph;
};
