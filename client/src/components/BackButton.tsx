import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const word = useSelector((state: RootState) => state.words);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  function handleClickBack() {
    setModal(true);
  }

  function handleClickYes() {
    navigate('/');
  }
  return (
    <>
      <div onClick={handleClickBack} className="back-button">
        <img src='/images/backwhite.svg' className="back-button-image" />
      </div>
      {modal && (
        <>
          <div className="back-button-overlay"></div>
          <div className="back-button-modal">
            Do you need to practice this word more?
            <div className="back-button-choice-container">
              <span className="back-button-yes" onClick={handleClickYes}>yes</span>
              <span className='back-button-no' onClick={() => setModal(false)}>no</span>
            </div>
          </div>
        </>
      )
      }
    </>
  );
}

