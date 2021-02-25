import React from "react";

const HangmanImage = (props) => {
  const sequence = props.sequence;
  const imageSequence = [
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/gallow.png",
      altTag: "none",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/head.png",
      altTag: "Head",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/body.png",
      altTag: "Body",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/left_arm.png",
      altTag: "Left Arm",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/right_arm.png",
      altTag: "Right Arm",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/right_leg.png",
      altTag: "Left Leg",
    },
    {
      image:
        "https://res.cloudinary.com/album/image/upload/v1614179194/hangman/left_leg.png",
      altTag: "Right Leg",
    },
  ];

  return (
    <div className="image-container">
      <img
        src={imageSequence[sequence].image}
        alt={imageSequence[sequence].altTag}
      />
    </div>
  );
};

export default HangmanImage;
