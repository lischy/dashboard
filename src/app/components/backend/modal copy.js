"use client";
import { useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, handleOpen }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  // const onDismiss = useCallback(() => {
  //   router.back();
  // }, [router]);

  // const onClick = useCallback(
  //   (e) => {
  //     if (e.target === overlay.current || e.target === wrapper.current) {
  //       if (onDismiss) onDismiss();
  //     }
  //   },
  //   [onDismiss, overlay, wrapper]
  // );

  // const onKeyDown = useCallback(
  //   (e) => {
  //     if (e.key === "Escape") onDismiss();
  //   },
  //   [onDismiss]
  // );

  // Close modal if clicked outside
  // useEffect(() => {
  //   if (open) {
  //     const handleClickOutside = (event) => {
  //       console.log(event.target.id);

  //       console.log(!overlay.current.contains(event.target));
  //       console.log(overlay.current == event.target);

  //       if (overlay.current && !overlay.current.contains(event.target)) {
  //         console.log("first");
  //         handleClose();
  //         router.back();
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () =>
  //       document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, [open, handleClose]);

  const handleOutsideClick = (event) => {
    console.log(event.target.id);
    if (event.target.id === "modalOverlay") {
      router.back();
      closeModal();
    }
  };

  if (!open) return null;
  // useEffect(() => {
  //   document.addEventListener("keydown", onKeyDown);
  //   return () => document.removeEventListener("keydown", onKeyDown);
  // }, [onKeyDown]);
  return (
    <div
      id="modalOverlay"
      onClick={handleOutsideClick}
      className="modal-overlay"
    >
      <Modal
        // ref={overlay}
        // onClick={(e) => e.stopPropagation()}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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
