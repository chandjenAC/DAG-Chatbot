import React from "react";
import ChatBot from "react-simple-chatbot";
import UploadDocument from "../components/UploadDocument";
import tallyxAvatar from "../images/tallyx.png";
import ChatbotHeader from "../components/ChatbotHeader";

const ChatBotContainer = props => {
  const {
    setParentNodeState,
    setChildNodeState,
    onFileUpload,
    authorise,
    verifyKYB,
    uploadKYB,
    verifyDirectorId,
    verifyDirectorUsername,
    uploadDirectorID,
    verifyDirectorKYC,
    sanctionScreen,
    getCreditRating,
    getUserDetails,
    getAvatar
  } = props;

  const validate = value => {
    if (value.toLowerCase() !== "yes" && value.toLowerCase() !== "no") {
      return "Please answer yes/no";
    }
    return true;
  };

  const trigger = (value, targetNode, ifYes, ifNo, func) => {
    if (value) {
      if (targetNode.type === "parent") {
        setParentNodeState(value, targetNode);
      } else if (targetNode.type === "child") {
        setChildNodeState(value, targetNode);
      }
      return ifYes;
    }
    return ifNo;
  };

  const authoriseID = (value, targetNode, ifYes, ifNo, func) => {
    if (value.toLowerCase() === "123") {
      //user who hasn't completed onboarding process
      props.setState(props.sampleState1);
      return "continueOnBoarding";
    } else if (value.toLowerCase() === "456") {
      //user who has completed onboarding and now wanna manage policy
      props.setState(props.sampleState2);
      return "managePolicies";
    }
    return "initiateOnBoarding";
  };

  const findLastStep = () => {
    let step;
    for (let key in props.sampleState1) {
      console.log(props.sampleState1[key]);
      if (props.sampleState1[key].response !== null) {
        step = key;
      }
    }
    console.log("this is the last stpe", step);
    return step
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
      placeholder: "Please select from the options.",
      options: [
        {
          value: "yes",
          label: "Yes",
          trigger: ({ value }) => {
            return findLastStep()
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
      message: "Please verify user",
      trigger: "directorVerifyResponse"
    },
    {
      id: "directorVerifyResponse",
      user: true,
      placeholder: "Enter your ID number for verification",
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
            trigger: "sponserUser",
            id: "directorKYC",
            parent: "directorUserVerify"
          }}
          callBack={verifyDirectorKYC}
        />
      ),
      waitAction: true
    },
    // {
    //   id: "sanction",
    //   message: "Sanction Screening in progress",
    //   trigger: "sanctionResponse"
    // },
    // {
    //   id: "sanctionResponse",
    //   user: true,
    //   placeholder: "Screening...",
    //   // validator: value => validate(value),
    //   trigger: ({ value }) => {
    //     return trigger(
    //       value,
    //       { id: "sanction", type: "parent" },
    //       "creditRating",
    //       "sanctionResponse",
    //       sanctionScreen
    //     );
    //   }
    // },
    // {
    //   id: "creditRating",
    //   message: "Checking your credit rating...",
    //   trigger: "creditRatingResponse"
    // },
    // {
    //   id: "creditRatingResponse",
    //   user: true,
    //   placeholder: "retrieving credit score...",
    //   // validator: value => validate(value),
    //   trigger: ({ value }) => {
    //     return trigger(
    //       value,
    //       { id: "creditRating", type: "parent" },
    //       "sponserUser",
    //       "creditRatingResponse",
    //       getCreditRating
    //     );
    //   }
    // },
    {
      id: "sponserUser",
      message: "Welcome User!..Want to check out your newly created Avatar?",
      trigger: "sponserUserResponse"
    },
    {
      id: "sponserUserResponse",
      user: true,
      placeholder: "Please make a note of the user details.",
      // validator: value => validate(value),
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
      // validator: value => validate(value),
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

  return (
    <ChatBot
      botAvatar={tallyxAvatar}
      headerComponent={<ChatbotHeader />}
      steps={steps}
    />
  );
};

export default ChatBotContainer;
