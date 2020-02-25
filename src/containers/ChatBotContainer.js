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
    if (value.toLowerCase() === "yes") {
      if (targetNode.type === "parent") {
        setParentNodeState(value, targetNode);
      } else if (targetNode.type === "child") {
        setChildNodeState(value, targetNode);
      }
      return ifYes;
    }
    return ifNo;
  };

  const steps = [
    {
      id: "onBoarding",
      message:
        "Hello Mark, welcome back! What are you looking for ?..//searching for avatar,asset or toki using ID's",
      trigger: "userAuth"
    },
    {
      id: "userAuth",
      user: true,
      placeholder: "Please enter Identification Number",
      validator: value => validate(value),
      trigger: ({ value }) => {
        return trigger(
          value,
          { id: "onBoarding", type: "parent" },
          "KYB",
          "KYB",
          authorise
        );
      }
    },
    {
      id: "KYB",
      message: "Global or Indian Business?",
      trigger: "KYBresponse"
    },
    {
      id: "KYBresponse",
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
      validator: value => validate(value),
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
      validator: value => validate(value),
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
      validator: value => validate(value),
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
      validator: value => validate(value),
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

  return (
    <ChatBot
      botAvatar={tallyxAvatar}
      headerComponent={<ChatbotHeader />}
      steps={steps}
    />
  );
};

export default ChatBotContainer;
