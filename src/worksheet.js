onBoarding: {
    response: null
  },
  KYB: {
    response: null,
    attachKYB: {
      response: null
    }
  },
  directorVerify: {
    response: null
  },
  directorUserVerify: {
    response: null,
    attachDirectorID: {
      response: null
    },
    directorKYC: {
      response: null
    }
  },
  sanction: {
    response: null
  },
  creditRating: {
    response: null
  },
  sponserUser: {
    response: null
  },
  createAvatar: {
    response: null
  }

  
  const renderNode = (ref, data, id, selected, hover, nodeProps) => {
 
    if (
      [
        "onBoarding",
        "KYB",
        "directorVerify",
        "directorUserVerify",
        "sanction",
        "creditRating",
        "sponserUser",
        "createAvatar"
      ].includes(id)
    ) {
      console.log("inside first condition", props.state[id]);
      if (props.state[id].response) {
        console.log("inside second condition where it should be");
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "attachKYB") {
      if (props.state.KYB.attachKYB.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "attachDirectorID") {
      if (props.state.directorUserVerify.attachDirectorID.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "directorKYC") {
      if (props.state.directorUserVerify.directorKYC.response) {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeCompleted"}
              y={-100}
            />
          </g>
        );
      } else {
        return (
          <g style={{ cursor: "pointer" }}>
            <use
              className="node"
              height={200}
              width={200}
              x={-100}
              xlinkHref={"#routerNodeIdeal"}
              y={-100}
            />
          </g>
        );
      }
    } else if (id === "alert") {
      return (
        <g style={{ cursor: "pointer" }}>
          <use
            className="node"
            height={200}
            width={200}
            x={-100}
            xlinkHref={"#eventHandlerNodeIdeal"}
            y={-146}
          />
        </g>
      );
    } else {
      return (
        <g style={{ cursor: "pointer" }}>
          <use
            className="node"
            height={200}
            width={200}
            x={-100}
            xlinkHref={"#gatewayNodeIdeal"}
            y={-110}
          />
        </g>
      );
    }
  };



  const steps = [
    {
      id: "greeting",
      message:
        "Hi!.Greetings!!. What are you looking for ?..search for avatar,asset or toki by ID",
      trigger: "userAuth"
    },
    {
      id: "userAuth",
      user: true,
      placeholder: "Please enter Identification Number",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return authoriseID(
          value,
          { id: "onBoarding", type: "parent" },
          authorise
        );
      }
    },
    //modified code
    {
      id: "initiateOnBoarding",
      message:
        "You have entered an invalid ID. Would you like to initiate the onboarding process?",
      trigger: "initiateOnBoardingResponse"
    },
    {
      id: "initiateOnBoardingResponse",
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: ({ value }) => {
            setParentNodeState(value, { id: "onBoarding", type: "parent" });
            return "KYB";
          }
        },
        {
          value: "no",
          label: "No",
          trigger: "end"
        }
      ]
    },
    {
      id: "continueOnBoarding",
      message:
        "Hi Mark!, Welcome back!!..Would you like to complete your onboarding process?",
      trigger: "continueOnBoardingResponse"
    },
    {
      id: "continueOnBoardingResponse",
      user: true,
      placeholder: "Enter your business identification number",
      validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "KYB", type: "parent" },
          "attachKYB",
          "KYBresponse",
          verifyKYB
        );
      }
    },
    {
      id: "managePolicies",
      message: "Hi John!, Welcome back!!..Would you like to manage policies?",
      trigger: "managePoliciesResponse"
    },
    {
      id: "managePoliciesResponse",
      placeholder: "Please select from the options.",
      options: [
        {
          value: "screening",
          label: "Screening",
          trigger: "screening"
        },
        {
          value: "creditRating",
          label: "Credit Rating",
          trigger: "creditRating"
        }
      ]
    },
    {
      id: "screening",
      message: "We are screening your profile..Please wait!",
      trigger: "screeningResult"
    },
    {
      id: "screeningResult",
      delay: 4000,
      message: "Your profile has been approved!",
      trigger: "end"
    },
    {
      id: "creditRating",
      message: "It will take a moment to get your credit rating..Please wait!",
      trigger: "screeningResult"
    },
    {
      id: "creditRatingResult",
      delay: 4000,
      message: "Your profile has been approved!",
      trigger: "end"
    },
    //existing code
    {
      id: "KYB",
      message: "Global or Indian Business?",
      trigger: "KYBresponse"
    },
    {
      id: "KYBresponse",
      user: true,
      placeholder: "Enter your business identification number",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "KYB", type: "parent" },
          "attachKYB",
          "KYBresponse",
          verifyKYB
        );
      }
    },
    {
      id: "attachKYB",
      message: "Please upload the relevant KYB documents",
      placeholder: "Upload File",
      trigger: "attachKYBresponse"
    },
    {
      id: "attachKYBresponse",
      placeholder: "Upload File",
      component: (
        <UploadDocument
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "directorVerify",
            parent: "KYB",
            id: "attachKYB"
          }}
          callBack={uploadKYB}
        />
      ),
      waitAction: true
    },
    {
      id: "directorVerify",
      message: "Please verify director",
      trigger: "directorVerifyResponse"
    },
    {
      id: "directorVerifyResponse",
      user: true,
      placeholder: "Enter your ID number for verification",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "directorVerify", type: "parent" },
          "directorUserVerify",
          "directorVerifyResponse",
          verifyDirectorId
        );
      }
    },
    {
      id: "directorUserVerify",
      message: "Please enter your email id or username",
      trigger: "directorUserVerifyResponse"
    },
    {
      id: "directorUserVerifyResponse",
      user: true,
      placeholder: "Please enter your email id or username",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "directorUserVerify", type: "parent" },
          "attachDirectorID",
          "directorUserVerifyResponse",
          verifyDirectorUsername
        );
      }
    },
    {
      id: "attachDirectorID",
      message: "Please upload your Director ID",
      placeholder: "Upload File",
      trigger: "attachDirectorIDResponse"
    },
    {
      id: "attachDirectorIDResponse",
      component: (
        <UploadDocument
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "directorKYC",
            id: "attachDirectorID",
            parent: "directorUserVerify"
          }}
          callBack={uploadDirectorID}
        />
      ),
      waitAction: true
    },
    {
      id: "directorKYC",
      message: "Please upload your KYC documents",
      trigger: "directorKYCResponse"
    },
    {
      id: "directorKYCResponse",
      component: (
        <UploadDocument
          onFileUpload={onFileUpload}
          targetNode={{
            type: "child",
            trigger: "sanction",
            id: "directorKYC",
            parent: "directorUserVerify"
          }}
          callBack={verifyDirectorKYC}
        />
      ),
      waitAction: true
    },
    {
      id: "sanction",
      message: "Sanction Screening in progress",
      trigger: "sanctionResponse"
    },
    {
      id: "sanctionResponse",
      user: true,
      placeholder: "Screening...",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "sanction", type: "parent" },
          "creditRating",
          "sanctionResponse",
          sanctionScreen
        );
      }
    },
    {
      id: "creditRating",
      message: "Checking your credit rating...",
      trigger: "creditRatingResponse"
    },
    {
      id: "creditRatingResponse",
      user: true,
      placeholder: "retrieving credit score...",
      // validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "creditRating", type: "parent" },
          "sponserUser",
          "creditRatingResponse",
          getCreditRating
        );
      }
    },
    {
      id: "sponserUser",
      message: "Welcome User!..Want to check out your newly created Avatar?",
      trigger: "sponserUserResponse"
    },
    {
      id: "sponserUserResponse",
      user: true,
      placeholder: "Please make a note of the user details.",
      validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "sponserUser", type: "parent" },
          "createAvatar",
          "sponserUserResponse",
          getUserDetails
        );
      }
    },
    {
      id: "createAvatar",
      message: "Avatar created!",
      trigger: "createAvatarResponse"
    },
    {
      id: "createAvatarResponse",
      user: true,
      placeholder: "Please make a note of the user details.",
      validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "createAvatar", type: "parent" },
          "end",
          "createAvatarResponse",
          getAvatar
        );
      }
    },
    {
      id: "end",
      message: "Thank you!",
      end: true
    }
  ];
