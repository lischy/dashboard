"use client";
import { useState } from "react";

export default function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (event) => {
    console.log(event.target.id);
    if (event.target.id === "modalOverlay") {
      closeModal();
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isModalOpen && (
        <div
          id="modalOverlay"
          onClick={handleOutsideClick}
          className="modal-overlay"
        >
          <div className="modal">
            <h2>Modal Content</h2>
            <p>This is the modal content. Click outside to close.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }
      `}</style>
    </div>
  );
}
